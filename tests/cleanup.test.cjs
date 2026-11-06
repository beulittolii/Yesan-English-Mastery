const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function fixture() {
  const context = vm.createContext({ console, Date, Math, setTimeout, clearTimeout, localStorage: { getItem: () => null, setItem() {} } });
  const run = code => vm.runInContext(code, context);
  run(fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8'));
  return run;
}
test('text result deletion removes cloud documents and preserves other tests', async () => {
  const run = fixture();
  run(`const removed=[]; AppData.loadCollection=async()=>[{id:'real-doc',studentId:1,testId:'gone'},{id:'keep',studentId:2,testId:'live'}]; AppData.removeDocument=async(c,id)=>removed.push(c+'/'+id);`);
  await run(`AppData.deleteTextMemorizeResultsByTestId('gone')`);
  assert.equal(run(`removed.join(',')`), 'textMemorizeResults/real-doc');
  assert.equal(run('FirebaseStore.textMemorizeResults[0].id'), 'keep');
});
test('failed cloud result deletion retains cached results for retry', async () => {
  const run = fixture();
  run(`FirebaseStore.textMemorizeResults=[{id:'old',testId:'gone'}]; AppData.loadCollection=async()=>FirebaseStore.textMemorizeResults; AppData.removeDocument=async()=>{throw Error('offline')};`);
  await assert.rejects(run(`AppData.deleteTextMemorizeResultsByTestId('gone')`), /offline/);
  assert.equal(run('FirebaseStore.textMemorizeResults.length'), 1);
});
test('orphan cleanup never deletes using unverified source cache', async () => {
  const run = fixture();
  run(`FirebaseStore.tests=[]; FirebaseStore.vocabTestResults=[{testId:'live'}]; AppData.removeDocument=async()=>{throw Error('must not delete')};`);
  assert.equal(await run('AppData.cleanupOrphanVocabTestResults()'), 0);
});
test('default vocabulary retains Wordmaster but never restores retired special sets', () => {
  const run = fixture();
  run(`const WORDMASTER_2000_SETS=[{id:'wm2000_day_01',words:[]}];
    const MOCK_EXAM_VOCAB_SETS=[{id:'retired-special',words:[]}];`);
  assert.equal(run(`getDefaultVocabSets().some(s=>s.id==='wm2000_day_01')`), true);
  assert.equal(run(`getDefaultVocabSets().some(s=>s.id==='retired-special')`), false);
});
test('vocabulary cutoffs respect teacher settings for ordinary mock exam titles', () => {
  const run = fixture();
  run(`const window={}; const document={addEventListener(){}};`);
  run(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'));
  assert.equal(run(`App.getBaseVocabCutoffScore({title:'모의고사 단어',vocabCutoffs:{2:75}},2)`), 75);
  assert.equal(run(`App.getAllTextMemorizePassages().length`), 0);
});
