// Isolated rendering/data tests: no Firebase SDK or production network requests.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const inline = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
let browser;
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')); }
  else if (['/style.css', '/pace.css', '/pace-symbol.svg'].includes(pathname)) {
    res.setHeader('Content-Type', pathname.endsWith('.css') ? 'text/css' : 'image/svg+xml');
    res.end(fs.readFileSync(path.join(root, pathname.slice(1))));
  } else { res.statusCode = 404; res.end(); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
  const errors = [], externalRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') console.error(msg.text()); });
  await page.route('**/*', route => {
    if (route.request().url().startsWith('http://127.0.0.1:')) return route.continue();
    if (/firebase|firestore/.test(route.request().url())) externalRequests.push(route.request().url());
    return route.abort();
  });
  await page.goto(`http://127.0.0.1:${server.address().port}`, { waitUntil: 'domcontentloaded' });
  await page.addScriptTag({ content: fs.readFileSync(process.env.TAILWIND_SCRIPT_PATH || '/private/tmp/yem-tailwind-test.js', 'utf8') + '\n' + inline.find(code => code.includes('tailwind.config')) });
  await page.evaluate(() => document.body.classList.add('tailwind-test-ready'));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('header')).position === 'sticky' && getComputedStyle(document.getElementById('vocabTestView')).display === 'none');
  for (const file of ['weekly_review_logic.js', 'grammar_data.js', 'data.js', 'grammar_store.js', 'weekly_review_store.js', 'app.js', 'grammar.js', 'weekly_review.js']) await page.addScriptTag({ content: fs.readFileSync(path.join(root, file), 'utf8') });
  await page.addScriptTag({ content: inline.find(code => code.includes('const AcademicManager =')) });
  await page.addScriptTag({ content: fs.readFileSync(path.join(root, 'pace.js'), 'utf8') });
  await page.evaluate(() => {
    AppData.queueWeeklyReviews = () => {};
    document.getElementById('initialLoadingSkeleton')?.remove();
    FirebaseStore.students = [{ id: 501, name: '검증 학생', target: '나의 목표', loginId: 'pace-test', password: '1234' }, { id: 502, name: '빈 기록 학생', accessMode: 'CALENDAR_ONLY' }];
    FirebaseStore.studentsLoaded = true; FirebaseStore.testsLoaded = true;
    FirebaseStore.tests = [
      { id: 'v1', studentId: 501, type: 'VOCAB', title: '단어 1', date: App.getTodayDateString(), status: 'PASS', score: '객관식 80점 · 스펠링 100점' },
      { id: 'v2', studentId: 501, type: 'VOCAB', title: '단어 2', date: App.getTodayDateString(), status: 'PASS', score: '90점 (9/10)' },
      { id: 'v3', studentId: 501, type: 'VOCAB', title: '미응시', date: App.getTodayDateString(), status: 'SCHEDULED', score: '' },
      { id: 'other', studentId: 502, type: 'VOCAB', title: '다른 학생', date: App.getTodayDateString(), status: 'PASS', score: 100 }
    ];
    FirebaseStore.vocabTestResults = [
      { id: 'a0', testId: 'v1', studentId: 501, direction: 2, score: 20, completedAt: '2026-11-01T00:00:00Z' },
      { id: 'a', testId: 'v1', studentId: 501, direction: 2, score: 80, completedAt: '2026-11-02T00:00:00Z' },
      { id: 'b', testId: 'v1', studentId: 501, direction: 3, score: 100 },
      { id: 'c', testId: 'v1', studentId: 501, direction: 4, score: 10, waitingGrading: true },
      { id: 'd', testId: 'other', studentId: 502, direction: 2, score: 100 }
    ];
    FirebaseStore.vocabSets = [];
    AcademicManager.hookIntoApp();
    App.init();
  });
  assert.equal(await page.title(), 'PACE | 나만의 학습 페이스');
  assert.equal(await page.getByRole('button', { name: '학생 체험' }).count(), 0);
  await page.screenshot({ path: '/private/tmp/pace-production-login.png', fullPage: true });
  await page.getByLabel('아이디', { exact: true }).fill('pace-test');
  await page.getByLabel('비밀번호', { exact: true }).fill('1234');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await page.locator('.pace-home-panels').waitFor();
  assert.equal(await page.locator('#landingView').isVisible(), false, 'Login stays hidden after navigation');
  assert.match(await page.locator('#studentBanner').innerText(), /검증 학생/);
  assert.equal(await page.getByRole('button', { name: '아직 배정된 복습이 없어요' }).isEnabled(), false);
  assert.deepEqual(await page.evaluate(() => App.paceScoreRecords(501).map(r => r.score).sort((a,b)=>a-b)), [80,90,100]);
  await page.getByRole('button', { name: '나의 성적 살펴보기' }).click();
  await page.locator('#paceReportView:not(.hidden)').waitFor();
  assert.equal(await page.locator('.pace-report-score').innerText(), '90점');
  assert.equal(await page.locator('.pace-history>div').count(), 3);
  await page.evaluate(() => { FirebaseStore.vocabTestResults.find(r => r.id === 'c').gradedByAdmin = true; AppData.refreshCloudScreens(); });
  assert.equal(await page.locator('.pace-report-score').innerText(), '70점', 'Live grading updates report');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 950 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator('#studentSidebar').isVisible(), false);
    await page.screenshot({ path: `/private/tmp/pace-production-report-${width}.png`, fullPage: true });
    await page.locator('#paceReportView').getByRole('button', { name: '학습공간으로 돌아가기' }).click();
    await page.locator('.pace-home-panels').waitFor();
    assert.equal(await page.locator('#paceReportView').isVisible(), false);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `/private/tmp/pace-production-home-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: '나의 성적 살펴보기' }).click();
  }
  await page.evaluate(() => { App.state.isAdminLoggedIn = true; App.state.selectedStudentId = 502; FirebaseStore.tests = []; App.renderPaceReport(); });
  assert.equal(await page.locator('.pace-report-score').innerText(), '—');
  assert.match(await page.locator('.pace-history').innerText(), /아직 채점이 완료된/);
  await page.evaluate(async () => { App.state.isAdminLoggedIn = false; await App.selectStudent(502); });
  assert.equal(await page.locator('.pace-home-panels').isVisible(), true, 'English-only students see review and scores');
  assert.equal(await page.locator('#studentSidebar').isVisible(), false);
  await page.getByRole('button', { name: '나의 성적 살펴보기' }).click();
  assert.equal(await page.locator('#paceReportView').isVisible(), true);
  assert.equal(await page.locator('.pace-report-score').innerText(), '—');
  await page.evaluate(() => {
    const date = App.getTodayDateString();
    FirebaseStore.tests = [
      { id: 'other', studentId: 502, type: 'VOCAB', title: '영어 전용 학생 성적', date, status: 'PASS', score: 100 },
      { id: 'english-review', studentId: 502, type: 'VOCAB_REVIEW', date, weekStart: WeeklyReviewLogic.monday(date), reviewStage: 'LOCKED', questions: [], weekdayCompletion: [false,false,false,false,false] }
    ];
    AppData.refreshCloudScreens();
  });
  assert.equal(await page.locator('.pace-report-score').innerText(), '100점', 'English-only report uses own results');
  await page.locator('#paceReportView').getByRole('button', { name: '학습공간으로 돌아가기' }).click();
  await page.getByRole('button', { name: '복습 준비 현황 보기' }).click();
  assert.equal(await page.locator('#testDetailModal').isVisible(), true);
  assert.equal(await page.locator('[data-weekly-review-modal="english-review"]').count(), 1);
  await page.evaluate(() => App.closeAllModals());
  await page.evaluate(() => {
    const date=App.getTodayDateString(), weekStart=WeeklyReviewLogic.monday(date);
    const tests=[{id:'preview',type:'VOCAB_REVIEW',isPreview:true,date,weekStart},{id:'actual',type:'VOCAB_REVIEW',date,weekStart}];
    window.selectedReview=App.paceReview(tests).id;
  });
  assert.equal(await page.evaluate(() => selectedReview), 'actual');
  assert.deepEqual(errors, []);
  assert.deepEqual(externalRequests, []);
  console.log('PACE production checks passed: login, student identity, actual grades, pending exclusion, live update, empty state, permissions, review selection, mobile/desktop.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { if (browser) await browser.close(); server.close(); });
