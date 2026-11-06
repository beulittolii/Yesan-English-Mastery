// Run with NODE_PATH pointing to a Playwright installation. All cloud writes are
// replaced by an in-memory transaction store; no production Firebase is loaded.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const errors = [];
let browser;
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/') {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } else if (pathname === '/style.css') {
    res.setHeader('Content-Type', 'text/css');
    res.end(fs.readFileSync(path.join(root, 'style.css')));
  } else { res.statusCode = 404; res.end(); }
});

async function loadApp(page) {
  for (const file of ['weekly_review_logic.js', 'grammar_data.js', 'data.js', 'grammar_store.js', 'weekly_review_store.js', 'app.js', 'grammar.js', 'weekly_review.js']) await page.addScriptTag({ content: fs.readFileSync(path.join(root, file), 'utf8') });
  await page.evaluate(() => {
    document.getElementById('initialLoadingSkeleton')?.remove();
    window.testDocuments = new Map(JSON.parse(localStorage.getItem('test_documents') || '[]'));
    window.failNextTransaction = false;
    window.transactionCount = 0;
    window.firebaseDB = {};
    window.firebaseFns = {
      doc: (_, collection, id) => `${collection}/${id}`,
      runTransaction: async (_, update) => {
        window.transactionCount++;
        if (window.holdNextTransaction) {
          window.holdNextTransaction = false;
          await new Promise(resolve => { window.releaseTestTransaction = resolve; });
        }
        if (window.failNextTransaction) { window.failNextTransaction = false; throw new Error('테스트 저장 실패'); }
        const pending = [];
        const result = await update({
          get: async ref => ({ exists: () => testDocuments.has(ref), data: () => testDocuments.has(ref) ? structuredClone(testDocuments.get(ref)) : undefined }),
          delete: ref => pending.push([ref, null]),
          set: (ref, data) => pending.push([ref, structuredClone(data)])
        });
        pending.forEach(([ref, data]) => data === null ? testDocuments.delete(ref) : testDocuments.set(ref, data));
        localStorage.setItem('test_documents', JSON.stringify([...testDocuments]));
        return result;
      }
    };
    FirebaseStore.students = [{ id: 501, name: '문법 테스트 학생', target: '가정법 이해' }];
    FirebaseStore.tests = [...testDocuments].filter(([key]) => key.startsWith('tests/')).map(([,value]) => value);
    FirebaseStore.vocabReviewResults = [...testDocuments].filter(([key]) => key.startsWith('vocabReviewResults/')).map(([,value]) => value);
    App.state.isAdminLoggedIn = true;
    App.state.isStudentLoggedIn = false;
    App.state.adminSelectedStudentId = 501;
    App.state.selectedStudentId = 501;
    App.bindEvents();
  });
}

(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true });
  const page = await browser.newPage({ viewport:{width:1280,height:950} });
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route => route.request().url().startsWith('http://127.0.0.1:') ? route.continue() : route.abort());
  const url = `http://127.0.0.1:${server.address().port}`;
  async function setup() {
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.addStyleTag({content:'.hidden{display:none!important}'});
    await page.addScriptTag({content:fs.readFileSync(process.env.TAILWIND_SCRIPT_PATH || '/tmp/yem-tailwind-test.js','utf8')});
    await page.evaluate(()=>document.body.classList.add('tailwind-test-ready'));
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('header')).position==='sticky');
    await loadApp(page);
  }
  await setup();
  await page.evaluate(() => {
    FirebaseStore.vocabSets=[{id:'reviewset',title:'복습 원본',words:[{en:'apple',ko:'사과'},{en:'banana',ko:'바나나'},{en:'orange',ko:'오렌지'},{en:'grape',ko:'포도'},{en:'melon',ko:'멜론'},{en:'peach',ko:'복숭아'}]}];
    FirebaseStore.tests=Array.from({length:5},(_,i)=>({id:'source'+i,type:'VOCAB',studentId:501,date:`2026-11-0${i+2}`,status:'PASS',vocabSetIds:['reviewset'],title:'평일 단어'}));
    FirebaseStore.vocabTestResults=[{id:'source_result',testId:'source0',studentId:501,direction:2,completedAt:'2026-11-06T01:00:00Z',questionDetails:FirebaseStore.vocabSets[0].words.slice(0,4).map((word,i)=>({word,isCorrect:i>=2}))}];
    for(const [collection,items] of [['tests',FirebaseStore.tests],['vocabSets',FirebaseStore.vocabSets],['vocabTestResults',FirebaseStore.vocabTestResults]]) items.forEach(item=>testDocuments.set(`${collection}/${item.id}`,structuredClone(item)));
    FirebaseStore.reviewSourcesReady={tests:true,vocabSets:true,vocabTestResults:false};
    AppData.queueWeeklyReviews();
  });
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>AppData.getTests().some(t=>t.type==='VOCAB_REVIEW')),false,'partial cloud loading cannot create review');
  await page.evaluate(()=>{ FirebaseStore.reviewSourcesReady.vocabTestResults=true;AppData.queueWeeklyReviews(); });
  await page.waitForFunction(()=>AppData.getTests().some(t=>t.type==='VOCAB_REVIEW'));
  const id=await page.evaluate(()=>AppData.getTests().find(t=>t.type==='VOCAB_REVIEW').id);
  await page.evaluate(id=>App.openWeeklyReviewModal(id),id);
  assert.ok(await page.locator('#detailModalBody').innerText().then(t=>t.includes('2026-11-07 00:00부터')));
  // Calendar badge is the exact same renderer and dimensions as regular vocabulary.
  for(const width of [1280,390]) {
    await page.setViewportSize({width,height:950});
    const boxes=await page.evaluate(id=>{
      const review=AppData.getTests().find(t=>t.id===id), host=document.createElement('div');host.style.width='160px';
      host.innerHTML=App.renderCalendarLearningTest(review,'주간 복습','fa-rotate','openWeeklyReviewModal')+App.renderCalendarLearningTest({...review,type:'VOCAB'},'단어 테스트','fa-spell-check','openVocabTestScheduleModal');document.body.appendChild(host);
      const metrics=[...host.children].map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return [r.width,r.height,s.backgroundColor,s.color];});host.remove();return metrics;
    },id);
    assert.deepEqual(boxes[0],boxes[1]);
  }
  // Open after Saturday, exercising actual transaction grading against frozen questions.
  await page.clock.install({time:new Date('2026-11-07T03:00:00Z')});
  await page.evaluate(id=>App.startWeeklyReview(id),id);
  assert.equal(await page.locator('#weeklyReviewView').isVisible(),true);
  assert.equal(await page.evaluate(()=>App.state.weeklyReview.questions.length),4);
  const spellingIndex=await page.evaluate(()=>App.state.weeklyReview.questions.findIndex(q=>q.mode==='SPELLING'));
  await page.evaluate(index=>App.moveWeeklyReview(index),spellingIndex);
  await page.locator('#weeklyReviewInput').fill('temporary answer');
  assert.equal(await page.evaluate(()=>Object.values(App.state.weeklyReview.answers)[0]),'temporary answer');
  await page.evaluate(()=>App.leaveWeeklyReview());
  assert.equal(await page.evaluate(id=>AppData.getWeeklyReviewResult(id),id),null,'leaving an unfinished round has no result or penalty');
  await page.evaluate(id=>App.startWeeklyReview(id),id);
  assert.equal(await page.evaluate(()=>Object.keys(App.state.weeklyReview.answers).length),0);
  await page.screenshot({path:'/tmp/yem-weekly-review-question-mobile.png',fullPage:true});
  await page.evaluate(()=>App.moveWeeklyReview(3));
  let dialogText='';
  page.once('dialog',async dialog=>{dialogText=dialog.message();await dialog.dismiss();});
  await page.locator('#weeklyReviewSubmit').click();
  assert.match(dialogText,/4문제/);assert.equal(await page.evaluate(()=>AppData.getWeeklyReviewResult(App.state.weeklyReview.id)),null);
  // Fail-save preserves screen and answers, and is retryable.
  await page.evaluate(()=>{
    App.state.weeklyReview.questions.slice(0,2).forEach(q=>App.setWeeklyReviewAnswer(q.id,q.mode==='CHOICE'?q.word.ko:q.word.en));
    window.failNextTransaction=true;
  });
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#weeklyReviewSubmit').click();
  await page.waitForFunction(()=>document.getElementById('weeklyReviewSubmit')?.textContent==='다시 제출');
  assert.equal(await page.evaluate(()=>Object.keys(App.state.weeklyReview.answers).length),2);
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#weeklyReviewSubmit').click();
  await page.waitForSelector('#weeklyReviewRetry');
  let result=await page.evaluate(id=>AppData.getWeeklyReviewResult(id),id);
  assert.equal(result.firstScore,50);assert.equal(result.remainingIds.length,2);
  await page.screenshot({path:'/tmp/yem-weekly-review-mobile.png',fullPage:true});
  // Real reload discards unfinished round answers and restores last committed result.
  await setup();
  await page.evaluate(id=>App.openWeeklyReviewModal(id),id);
  assert.match(await page.locator('#detailModalBody').innerText(),/남은 단어/);
  await page.evaluate(id=>App.showWeeklyReviewResult(id),id);
  await page.locator('#weeklyReviewRetry').click();
  assert.equal(await page.evaluate(()=>App.state.weeklyReview.questions.length),2);
  await page.evaluate(()=>{ const q=App.state.weeklyReview.questions[0];App.setWeeklyReviewAnswer(q.id,q.mode==='CHOICE'?q.word.ko:q.word.en); App.moveWeeklyReview(1); });
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#weeklyReviewSubmit').click();
  await page.waitForSelector('#weeklyReviewRetry');
  result=await page.evaluate(id=>AppData.getWeeklyReviewResult(id),id);
  assert.equal(result.firstScore,50);assert.equal(result.remainingIds.length,1);
  await page.locator('#weeklyReviewRetry').click();
  await page.evaluate(()=>{const q=App.state.weeklyReview.questions[0];App.setWeeklyReviewAnswer(q.id,q.mode==='CHOICE'?q.word.ko:q.word.en)});
  await page.locator('#weeklyReviewSubmit').click();
  await page.waitForFunction(()=>document.getElementById('weeklyReviewView').innerText.includes('COMPLETE'));
  result=await page.evaluate(id=>AppData.getWeeklyReviewResult(id),id);
  assert.equal(result.completed,true);assert.equal(result.firstScore,50);assert.equal(result.rounds.length,3);
  assert.equal(await page.evaluate(()=>testDocuments.get('vocabTestResults/source_result').questionDetails.filter(q=>!q.isCorrect).length),2,'original score unchanged');
  for(const width of [390,1280]) {
    await page.setViewportSize({width,height:950});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`no overflow at ${width}`);
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`/tmp/yem-weekly-review-complete-${width}.png`,fullPage:true});
  }
  assert.deepEqual(errors,[]);
  console.log('Weekly review browser checks passed: readiness, generation, KST opening, calendar layout, blank confirmation/cancel, save retry, reload, 3 rounds, score preservation, mobile/desktop.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser) await browser.close();server.close();});
