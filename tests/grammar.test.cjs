const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture() {
  const documents = new Map();
  const context = vm.createContext({ console, Date, Math, setTimeout, clearTimeout });
  vm.runInContext(`
    const FirebaseStore = { tests: [] };
    const LOCAL_CACHE_KEYS = { tests: 'tests' };
    function setLocalCache() {}
    function shouldKeepTest(t) { return t.date >= '2026-11-01'; }
    const App = { state: { isAdminLoggedIn: true } };
    const AppData = {
      isFirebaseReady() { return true; },
      getTests() { return FirebaseStore.tests; },
      refreshCloudScreens() {}
    };
    const window = { firebaseDB: {} };
  `, context);
  const fakeFns = {
    doc: (_, collection, id) => `${collection}/${id}`,
    runTransaction: async (_, callback) => {
      const pending = [];
      const value = await callback({
        get: async ref => ({ exists: () => documents.has(ref), data: () => documents.has(ref) ? JSON.parse(JSON.stringify(documents.get(ref))) : undefined }),
        set: (ref, data) => pending.push([ref, JSON.parse(JSON.stringify(data))])
      });
      pending.forEach(([ref, data]) => documents.set(ref, data));
      return value;
    }
  };
  context.fakeFns = fakeFns;
  vm.runInContext('window.firebaseFns = fakeFns;', context);
  for (const file of ['grammar_data.js', 'grammar_store.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  return { context, documents, run: code => vm.runInContext(code, context), plain: code => JSON.parse(JSON.stringify(vm.runInContext(code, context))) };
}

const assignment = `{ studentId: 1, date: '2026-11-06', time: '00:00', endTime: '23:59', parts: ['concept', 'practice'] }`;

test('concept blanks cover every template token with stable unique IDs and count whitespace as missing', () => {
  const f = fixture();
  const blanks = f.plain('GrammarLogic.blanks(GRAMMAR_UNIT)');
  assert.ok(blanks.length >= 30);
  assert.equal(new Set(blanks.map(b => b.id)).size, blanks.length);
  assert.equal(f.run('GrammarLogic.missing(GRAMMAR_UNIT, {})'), blanks.length);
  f.run("const a = Object.fromEntries(GrammarLogic.blanks(GRAMMAR_UNIT).map(b => [b.id, '  ']));");
  assert.equal(f.run('GrammarLogic.missing(GRAMMAR_UNIT, a)'), blanks.length);
  assert.equal(f.run('GrammarLogic.missing(GRAMMAR_UNIT, Object.fromEntries(GrammarLogic.blanks(GRAMMAR_UNIT).map(b => [b.id, b.answer])))'), 0);
});

test('practical has ten five-choice questions and correctly grades 70/80/100', () => {
  const f = fixture();
  const questions = f.plain('GRAMMAR_UNIT.questions');
  assert.equal(questions.length, 10);
  assert.ok(questions.every(q => q.choices.length === 5 && q.answer >= 1 && q.answer <= 5 && q.explanation));
  for (const count of [7, 8, 10]) {
    const result = f.plain(`GrammarLogic.gradePractice(GRAMMAR_UNIT, Object.fromEntries(GRAMMAR_UNIT.questions.map((q, i) => [i, i < ${count} ? q.answer : q.answer % 5 + 1])))`);
    assert.equal(result.score, count * 10);
    assert.equal(result.passed, count >= 8);
  }
  assert.throws(() => f.run('GrammarLogic.gradePractice(GRAMMAR_UNIT, {})'), /10문제/);
  assert.throws(() => f.run('GrammarLogic.gradePractice(GRAMMAR_UNIT, Object.fromEntries(GRAMMAR_UNIT.questions.map((q, i) => [i, "1"])))'), /10문제/);
});

test('manual concept grading requires all filled answers to be marked and includes empty answers in denominator', () => {
  const f = fixture();
  f.run("const blanks = GrammarLogic.blanks(GRAMMAR_UNIT); const answers = Object.fromEntries(blanks.map(b => [b.id, b.answer]));");
  assert.throws(() => f.run("GrammarLogic.gradeConcept(GRAMMAR_UNIT, Object.fromEntries(blanks.map(b => [b.id, '다른 답안'])), {})"), /모든 빈칸/);
  assert.equal(f.plain('GrammarLogic.gradeConcept(GRAMMAR_UNIT, answers, {})').score, 100);
  const result = f.plain('GrammarLogic.gradeConcept(GRAMMAR_UNIT, {}, Object.fromEntries(blanks.map(b => [b.id, true])))');
  assert.equal(result.score, 0);
  assert.equal(result.totalCount, f.run('blanks.length'));
  assert.ok(Object.values(result.marks).every(v => !v));
  const passed = f.plain('GrammarLogic.gradeConcept(GRAMMAR_UNIT, answers, Object.fromEntries(blanks.map(b => [b.id, true])))');
  assert.equal(passed.score, 100);
  assert.equal(passed.passed, true);
});

test('first assignment requires both parts, snapshots content and blocks unattempted/pending retests', async () => {
  const f = fixture();
  await assert.rejects(f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['concept'] })`), /최초 시험/);
  const first = await f.run(`AppData.assignGrammarTest(${assignment})`);
  assert.equal(first.grammarParts.length, 2);
  const rootId = first.id;
  await assert.rejects(f.run(`AppData.assignGrammarTest(${assignment})`), /미달이 확정/);
  f.context.rootId = rootId;
  await f.run("AppData.updateGrammarTest(rootId, t => { t.grammarResults.concept = { waitingGrading: true }; t.grammarStage = 'practice'; })");
  await assert.rejects(f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['concept'] })`), /미달이 확정/);
  f.run('GRAMMAR_UNIT.questions[0].answer = 5;');
  assert.equal(f.documents.get(`tests/${rootId}`).grammarContent.questions[0].answer, 2);
});

test('only failed areas may be reassigned and the newest assignment prevents duplicates', async () => {
  const f = fixture();
  const first = await f.run(`AppData.assignGrammarTest(${assignment})`);
  f.context.rootId = first.id;
  await f.run("AppData.updateGrammarTest(rootId, t => { t.grammarResults = { concept: { score: 70, passed: false }, practice: { score: 80, passed: true } }; t.grammarStage = 'done'; })");
  assert.deepEqual(f.plain("GrammarLogic.eligible(AppData.getTests(), 1, 'subjunctive')"), ['concept']);
  await assert.rejects(f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['practice'] })`), /미달이 확정/);
  const retest = await f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['concept'] })`);
  assert.equal(retest.grammarRootId, first.id);
  assert.equal(retest.grammarStage, 'concept');
  assert.equal(retest.grammarSequence, 1);
  assert.deepEqual(f.plain("GrammarLogic.eligible(AppData.getTests(), 1, 'subjunctive')"), []);
  await assert.rejects(f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['concept'] })`), /미달이 확정/);
  assert.equal(f.documents.get(`tests/${first.id}`).grammarResults.practice.score, 80);
});

test('transaction failures do not mutate local state or lock concept answers', async () => {
  const f = fixture();
  const first = await f.run(`AppData.assignGrammarTest(${assignment})`);
  f.context.rootId = first.id;
  f.run("window.firebaseFns.runTransaction = async () => { throw new Error('offline'); };");
  await assert.rejects(f.run("AppData.updateGrammarTest(rootId, t => { t.grammarStage = 'practice'; })"), /offline/);
  assert.equal(f.plain('AppData.getTests()[0]').grammarStage, 'concept');
});

test('both failed areas may be reassigned together, and a practical-only retest starts directly in practice', async () => {
  const f = fixture();
  const first = await f.run(`AppData.assignGrammarTest(${assignment})`);
  f.context.rootId = first.id;
  await f.run("AppData.updateGrammarTest(rootId, t => { t.grammarResults = { concept: { score: 50, passed: false }, practice: { score: 70, passed: false } }; t.grammarStage = 'done'; })");
  assert.deepEqual(f.plain("GrammarLogic.eligible(AppData.getTests(), 1, 'subjunctive')"), ['concept', 'practice']);
  const practical = await f.run(`AppData.assignGrammarTest({ ...${assignment}, parts: ['practice'] })`);
  assert.equal(practical.grammarStage, 'practice');
  assert.deepEqual(f.plain("GrammarLogic.eligible(AppData.getTests(), 1, 'subjunctive')"), ['concept']);
  await assert.rejects(f.run(`AppData.assignGrammarTest(${assignment})`), /미달이 확정/);
  assert.equal(f.run('AppData.getTests().length'), 2, 'a rejected multi-part reassignment must not partially create a concept test');
  f.context.practicalId = practical.id;
  await f.run("AppData.updateGrammarTest(practicalId, t => { t.grammarResults.practice = { score: 70, passed: false }; t.grammarStage = 'done'; })");
  const both = await f.run(`AppData.assignGrammarTest(${assignment})`);
  assert.equal(both.grammarParts.length, 2);
  assert.equal(both.grammarStage, 'concept');
  assert.equal(both.grammarRootId, first.id);
});

test('manual score conversion rounds scores and preserves the 80-point inclusive cutoff', () => {
  const f = fixture();
  f.run("const blanks = GrammarLogic.blanks(GRAMMAR_UNIT); const answers = Object.fromEntries(blanks.map(b => [b.id, '검토 답안']));");
  for (const count of [0, 27, 28, 34]) {
    const result = f.plain(`GrammarLogic.gradeConcept(GRAMMAR_UNIT, answers, Object.fromEntries(blanks.map((b, i) => [b.id, i < ${count}])))`);
    assert.equal(result.score, Math.round(count / result.totalCount * 100));
    assert.equal(result.passed, result.score >= 80);
  }
});
