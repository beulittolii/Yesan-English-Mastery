const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function fixture() {
  const documents = new Map();
  const context = vm.createContext({ console, setTimeout, clearTimeout, Date, Math });
  vm.runInContext(`
    const FirebaseStore = { tests: [], vocabTestResults: [], vocabSets: [], vocabReviewResults: [] };
    const App = { state: { isAdminLoggedIn: true, selectedStudentId: 1 }, convertKorToEng: v => v === 'ㅁㅔㅔㅣㄷ' ? 'apple' : v };
    const AppData = {
      getTests: () => FirebaseStore.tests, getVocabTestResults: () => FirebaseStore.vocabTestResults, getVocabSets: () => FirebaseStore.vocabSets,
      isFirebaseReady: () => true, getVocabTestResultDocumentId: r => r.id,
      cacheGrammarTests(records) { FirebaseStore.tests = [...FirebaseStore.tests.filter(t => !records.some(r => r.id === t.id)), ...records]; }
    };
    const window = { firebaseDB: {} };
  `, context);
  let transactionTail = Promise.resolve();
  context.fakeFns = { doc: (_, col, id) => `${col}/${id}`, runTransaction: (_, callback) => {
    // Serial commits emulate Firestore's conflict retry outcome for concurrent callers.
    const task = transactionTail.then(async () => {
      const pending = [];
      const result = await callback({ get: async ref => ({ exists: () => documents.has(ref), data: () => structuredClone(documents.get(ref)) }), set: (ref, value) => pending.push([ref, structuredClone(value)]) });
      pending.forEach(([ref,value]) => documents.set(ref,value));
      return result;
    });
    transactionTail = task.catch(() => {});
    return task;
  } };
  vm.runInContext('window.firebaseFns = fakeFns', context);
  for (const file of ['weekly_review_logic.js','weekly_review_store.js']) vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
  const run = code => vm.runInContext(code,context);
  const plain = code => JSON.parse(JSON.stringify(run(code)));
  run(`
    const words = Array.from({length:60}, (_,i) => ({en:i === 0 ? 'apple' : 'word'+i, ko:'뜻'+i}));
    const tests = Array.from({length:5},(_,i) => ({id:'source'+i,studentId:1,type:'VOCAB',date:'2026-11-0'+(i+2),status:'PASS',vocabSetIds:['set']}));
    const detail = (i, correct) => ({word:words[i],isCorrect:correct,spellingCorrect:correct});
    const results = [{id:'result',testId:'source0',studentId:1,direction:2,startedAt:'2026-11-02T01:00:00Z',completedAt:'2026-11-02T01:10:00Z',questionDetails:[detail(0,false),detail(1,true),detail(2,true),detail(3,true)],wrongAnswers:[]}];
    const sets = [{id:'set',words}];
    const build = () => WeeklyReviewLogic.build({tests,results,sets,studentId:1,monday:'2026-11-02'});
    FirebaseStore.tests=tests; FirebaseStore.vocabTestResults=results; FirebaseStore.vocabSets=sets;
  `);
  function persist() { for (const [collection,array] of [['tests',plain('tests')],['vocabTestResults',plain('results')],['vocabSets',plain('sets')]]) array.forEach(value => documents.set(`${collection}/${value.id}`,value)); }
  return { run, plain, documents, persist };
}
test('requires all five weekdays and every test final PASS including integrated admin grading', () => {
  const f=fixture(); assert.ok(f.run('build()'));
  f.run("tests.push({...tests[0],id:'extra',status:'FAIL'})"); assert.equal(f.run('build()'),null);
  f.run('tests.pop(); tests.pop()'); assert.equal(f.run('build()'),null);
  f.run("tests.push({id:'last',type:'VOCAB',studentId:1,date:'2026-11-06',status:'PASS',vocabSetIds:['set']}); results.push({...results[0],id:'integrated',direction:4,passed:true,waitingGrading:true})");
  assert.equal(f.run('build()'),null);
  f.run('results[1].waitingGrading=false'); assert.equal(f.run('build()'),null);
  f.run('results[1].gradedByAdmin=true'); assert.ok(f.run('build()'));
});
test('Korea Saturday midnight is the sole opening boundary, without a closing deadline', () => {
  const f=fixture();
  for (const [time,want] of [['2026-11-06T14:59:59Z',false],['2026-11-06T15:00:00Z',true],['2026-11-15T00:00:00Z',true]]) assert.equal(f.run(`WeeklyReviewLogic.available(build(),new Date('${time}'))`),want);
  assert.equal(f.run("WeeklyReviewLogic.monday('2026-11-08')"),'2026-11-02');
});
test('no wrong answers skips the review; unresolved old errors request admin repair', () => {
  const f=fixture(); f.run('results[0].questionDetails=[detail(0,true)]'); assert.equal(f.run('build()'),null);
  f.run("results[0].questionDetails=[]; results[0].wrongAnswers=[{question:'app',correct:'틀린 원본'}]");
  assert.equal(f.run('build().status'),'REVIEW_DATA_NEEDED'); assert.equal(f.run('build().questions.length'),0);
});
test('legacy exact recovery, deduped attempts, prior errors despite subsequent pass, spelling priority', () => {
  const f=fixture();
  f.run(`results[0].attempts=[{startedAt:'old',completedAt:'oldend',wrongAnswers:[{question:'apple (뜻0)',answer:'x',correct:'뜻0'}]}, {startedAt:'old',completedAt:'oldend',wrongAnswers:[{question:'apple (뜻0)',answer:'x',correct:'뜻0'}]}];
    results[0].questionDetails=[detail(0,true),detail(1,true)];
    results.push({...results[0],id:'spell',direction:3,attempts:[],questionDetails:[detail(0,false)]});`);
  assert.equal(f.run("build().questions.find(q=>q.word.en==='apple').mistakeCount"),2);
  assert.equal(f.run("build().questions.find(q=>q.word.en==='apple').mode"),'SPELLING');
  f.run("results.push({...results[0],id:'new',direction:4,passed:true,gradedByAdmin:true,attempts:[],questionDetails:[{...detail(4,false),spellingCorrect:true}]})");
  assert.equal(f.run("build().questions.find(q=>q.word.en==='word4').mode"),'CHOICE');
});
test('30 error cap plus ten truly correct words; frequency then recency; distinct English words', () => {
  const f=fixture(); f.run(`results[0].questionDetails=words.map((w,i)=>detail(i,i>=45));
    results[0].attempts=[{startedAt:'old',completedAt:'old',questionDetails:[detail(44,false)]}];`);
  assert.equal(f.run('build().questions.length'),40);
  assert.equal(f.run('build().questions[0].word.en'),'word44');
  assert.equal(f.run('build().questions.filter(q=>!q.mistakeCount).length'),10);
  assert.equal(f.run('build().questions.filter(q=>q.mode==="CHOICE").every(q=>q.choices.length===5 && new Set(q.choices).size===5)'),true);
  f.run("sets.push({id:'set2',words:[{en:'APPLE',ko:'사과'}]}); tests[0].vocabSetIds.push('set2'); results[0].questionDetails.push({word:{en:'APPLE',ko:'사과'},isCorrect:false})");
  assert.equal(f.run("build().questions.filter(q=>q.word.en.toLowerCase()==='apple').length"),1);
});
test('few correct words are not padded; missing choice materials request repair', () => {
  const f=fixture(); assert.equal(f.run('build().questions.length'),4);
  f.run('sets[0].words=words.slice(0,2)'); assert.equal(f.run('build().status'),'REVIEW_DATA_NEEDED');
});
test('automatic marking follows existing spelling trim/case/Korean keyboard rules', () => {
  const f=fixture(); f.run("const qs=[{id:'s',mode:'SPELLING',word:words[0]},{id:'c',mode:'CHOICE',word:words[1]}]");
  assert.equal(f.run("WeeklyReviewLogic.grade(qs,{s:'  APPLE ',c:'뜻1'}).score"),100);
  assert.equal(f.run("WeeklyReviewLogic.grade(qs,{s:'ㅁㅔㅔㅣㄷ',c:'뜻1'},App.convertKorToEng).score"),100);
  assert.equal(f.run("WeeklyReviewLogic.grade(qs,{s:'  ',c:'x'}).remainingIds.length"),2);
});
test('concurrent generation uses one frozen student/week document; live server pending blocks stale client', async () => {
  const f=fixture(); f.persist();
  const [a,b]=await Promise.all([f.run("AppData.createWeeklyReview({studentId:1,monday:'2026-11-02'})"),f.run("AppData.createWeeklyReview({studentId:1,monday:'2026-11-02'})")]);
  assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b))); assert.equal([...f.documents.keys()].filter(k=>k.startsWith('tests/weekly_review')).length,1);
  f.run('results[0].questionDetails=[]'); f.persist();
  const frozen=await f.run("AppData.createWeeklyReview({studentId:1,monday:'2026-11-02'})"); assert.deepEqual(JSON.parse(JSON.stringify(frozen.questions)),JSON.parse(JSON.stringify(a.questions)));
  const g=fixture();g.persist();g.documents.get('tests/source4').status='SCHEDULED';
  assert.equal(await g.run("AppData.createWeeklyReview({studentId:1,monday:'2026-11-02'})"),null);
});
test('round transaction retains initial score, resumes only errors, dedupes double submit, never writes source grades', async () => {
  const f=fixture();f.persist(); const original=JSON.stringify(f.documents.get('vocabTestResults/result'));
  const review=f.plain('build()'); review.date='2026-11-01'; f.documents.set('tests/'+review.id,review);
  f.run(`FirebaseStore.tests.push(${JSON.stringify(review)}); const id='${review.id}'; const answers=Object.fromEntries(${JSON.stringify(review.questions)}.map(q=>[q.id,q.mode==='CHOICE'?q.word.ko:q.word.en])); delete answers.w1;`);
  const first=await f.run('AppData.submitWeeklyReviewRound(id,1,answers)');assert.equal(first.firstScore,75);assert.equal(first.remainingIds.length,1);
  const duplicate=await f.run('AppData.submitWeeklyReviewRound(id,1,{})'); assert.equal(duplicate.rounds.length,1);
  const second=await f.run("AppData.submitWeeklyReviewRound(id,2,{w1:'뜻0'})"); assert.equal(second.completed,true); assert.equal(second.firstScore,75);assert.equal(second.initialWrongCount,1);assert.equal(second.rounds.length,2);
  assert.equal(f.documents.get('tests/'+review.id).status,'PASS'); assert.equal(JSON.stringify(f.documents.get('vocabTestResults/result')),original);
  await assert.rejects(f.run('AppData.submitWeeklyReviewRound(id,3,{})'),/변경/);
});
test('first perfect round completes immediately; unavailable rounds and skipped round numbers reject', async () => {
  const f=fixture(); const review=f.plain('build()'); review.date='2099-01-03';f.documents.set('tests/'+review.id,review); f.run(`const id='${review.id}'`);
  await assert.rejects(f.run('AppData.submitWeeklyReviewRound(id,1,{})'),/응시/);
  review.date='2026-11-01';f.documents.set('tests/'+review.id,review);
  await assert.rejects(f.run('AppData.submitWeeklyReviewRound(id,2,{})'),/변경/);
  f.run(`const answers=Object.fromEntries(${JSON.stringify(review.questions)}.map(q=>[q.id,q.mode==='CHOICE'?q.word.ko:q.word.en]))`);
  const perfect=await f.run('AppData.submitWeeklyReviewRound(id,1,answers)');assert.equal(perfect.completed,true);assert.equal(perfect.firstScore,100);
});
test('actual vocabulary save preserves pre-rollout detailed history without changing existing attempt counts; backup includes progress', async () => {
  const context=vm.createContext({console,Date,Math,setTimeout,clearTimeout,localStorage:{getItem:()=>null,setItem:()=>{}}});
  const run=code=>vm.runInContext(code,context);
  for(const file of ['data.js','weekly_review_logic.js']) run(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));
  run(`AppData.writeDocument=async()=>{};
    const old={studentId:1,setId:'s',testId:'source0',direction:3,score:0,correctCount:0,total:1,passed:false,startedAt:'old',completedAt:'oldend',questionDetails:[{word:{en:'apple',ko:'사과'},isCorrect:false}],wrongAnswers:[]};
    FirebaseStore.vocabTestResults=[{...old,attempts:[{startedAt:'old',completedAt:'oldend',wrongAnswers:[]}]}];`);
  await run(`AppData.saveVocabTestResult({...old,score:100,passed:true,startedAt:'new',completedAt:'newend',questionDetails:[{word:{en:'apple',ko:'사과'},isCorrect:true}]})`);
  assert.equal(run('FirebaseStore.vocabTestResults[0].attempts.length'),2);
  assert.equal(run('WeeklyReviewLogic.attempts(FirebaseStore.vocabTestResults[0]).filter(a=>a.questionDetails?.some(q=>!q.isCorrect)).length'),1);
  run('FirebaseStore.vocabTestResults=[old]');
  await run(`AppData.saveVocabTestResult({...old,score:100,passed:true,startedAt:'new',completedAt:'newend',questionDetails:[{word:{en:'apple',ko:'사과'},isCorrect:true}]})`);
  assert.equal(run('FirebaseStore.vocabTestResults[0].attempts.length'),1,'legacy attempt counter behavior retained');
  assert.equal(run('WeeklyReviewLogic.attempts(FirebaseStore.vocabTestResults[0]).length'),2,'legacy detailed result still available for review');
  run("FirebaseStore.tests=[{id:'review',type:'VOCAB_REVIEW',date:'2026-11-07',weeklyReviewResult:{id:'review',firstScore:70}}]");
  assert.equal(run('AppData.exportData().vocabReviewResults[0].firstScore'),70);
});
test('same legacy word repeated across sets is restored once; equal mistake counts rank by recency', () => {
  const f=fixture(); f.run(`
    sets.push({id:'duplicate',words:[words[0]]});tests[0].vocabSetIds.push('duplicate');
    results[0].questionDetails=[];
    results[0].attempts=[{startedAt:'a',completedAt:'2026-11-03T00:00:00Z',wrongAnswers:[{question:'apple (뜻0)',correct:'뜻0'}]}, {startedAt:'b',completedAt:'2026-11-05T00:00:00Z',wrongAnswers:[{question:'word1 (뜻1)',correct:'뜻1'}]}];
  `);
  assert.equal(f.run('build().questions.length'),2);
  assert.equal(f.run('build().questions[0].word.en'),'word1');
  assert.equal(f.run('build().questions[1].word.en'),'apple');
});
