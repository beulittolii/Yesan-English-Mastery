/** 일반 단어 시험과 독립된 복습 화면. 미제출 회차에는 불합격/대기시간을 부여하지 않는다. */
Object.assign(App, {
  openWeeklyReviewModal(id) {
    const test = AppData.getTests().find(t => t.id === id);
    if (!test || test.type !== 'VOCAB_REVIEW') return;
    const result = AppData.getWeeklyReviewResult(id), e = value => this.escapeHtml(String(value));
    document.getElementById('detailModalStudentBadge').textContent = 'WEEKLY REVIEW · 주간 복습';
    document.getElementById('detailModalTitle').textContent = '이번 주 단어, 확실하게 마무리';
    document.getElementById('detailModalBody').innerHTML = `<div class="space-y-4"><p class="text-sm text-slate-500">${e(test.weekStart)} ~ ${e(test.weekEnd)}</p>${test.status === 'REVIEW_DATA_NEEDED' ? `<div class="p-4 rounded-xl bg-amber-50 text-amber-800 font-bold">자료 확인 필요 · ${e(test.blockedReason || '원본 단어장과 응시 기록을 확인해주세요.')}</div>` : `<div class="grid grid-cols-2 gap-3"><div class="p-4 bg-slate-50 rounded-xl">출제 단어<strong class="block text-2xl">${test.questions.length}개</strong></div><div class="p-4 bg-slate-50 rounded-xl">남은 단어<strong class="block text-2xl">${result ? result.remainingIds.length : test.questions.length}개</strong></div></div><p class="text-sm text-slate-500">${result?.completed ? '모든 오답을 해결했습니다.' : '오답만 다시 풀며 모든 단어를 익히는 복습입니다. 제한시간과 통과 커트라인이 없습니다.'}</p>${test.unresolvedCount ? `<p class="text-xs text-amber-700">원본을 확인할 수 없는 오답 ${test.unresolvedCount}건은 출제에서 제외했습니다.</p>` : ''}<button ${!result && !WeeklyReviewLogic.available(test) ? 'disabled' : ''} onclick="App.${result ? 'showWeeklyReviewResult' : 'startWeeklyReview'}('${id}')" class="w-full py-4 rounded-xl bg-indigo-600 disabled:bg-slate-300 text-white font-bold">${result ? '복습 결과 확인' : WeeklyReviewLogic.available(test) ? '복습 시작' : `${e(test.date)} 00:00부터 응시 가능`}</button>`}</div>`;
    this.showModal('testDetailModal');
  },
  showWeeklyReviewView() {
    this.hideModal('testDetailModal');
    this.clearVocabQuestionTimer();
    for (const id of ['landingView','studentDashboardView','adminDashboardView','vocabTestView','practiceTestView','textMemorizePaperView','grammarTestView','grammarCompletionView']) document.getElementById(id)?.classList.add('hidden');
    this.state.view = 'weeklyReview';
    this.updateHeaderActions();
    window.scrollTo({ top: 0 });
  },
  leaveWeeklyReview() {
    this.state.weeklyReview = null;
    if (this.state.isAdminLoggedIn) this.showAdminDashboard();
    else this.selectStudent(this.state.selectedStudentId);
  },
  startWeeklyReview(id) {
    const test = AppData.getTests().find(t => t.id === id), result = AppData.getWeeklyReviewResult(id);
    if (!test || !WeeklyReviewLogic.available(test) || test.status === 'REVIEW_DATA_NEEDED') return;
    if (result?.completed) return this.showWeeklyReviewResult(id);
    const ids = result?.remainingIds || test.questions.map(q => q.id);
    this.state.weeklyReview = { id, questions: WeeklyReviewLogic.shuffle(test.questions.filter(q => ids.includes(q.id))), answers: {}, index: 0, round: (result?.rounds.length || 0) + 1 };
    this.showWeeklyReviewView();
    this.renderWeeklyReviewQuestion();
  },
  setWeeklyReviewAnswer(id, value) { if (!this._weeklyReviewSubmitting) this.state.weeklyReview.answers[id] = value; },
  moveWeeklyReview(index) {
    if (this._weeklyReviewSubmitting) return;
    this.state.weeklyReview.index = index;
    this.renderWeeklyReviewQuestion();
  },
  renderWeeklyReviewQuestion() {
    const state = this.state.weeklyReview, q = state.questions[state.index], e = v => this.escapeHtml(String(v));
    const answer = state.answers[q.id] || '';
    document.getElementById('weeklyReviewView').innerHTML = `<div class="weekly-review-exam"><div class="grammar-result-heading"><div><div class="grammar-result-eyebrow">WEEKLY REVIEW · ROUND ${state.round}</div><h1>단어 복습</h1><p class="grammar-result-subtitle">${state.index + 1} / ${state.questions.length} 문항</p></div><button onclick="App.leaveWeeklyReview()" class="grammar-result-back">나가기</button></div><div class="weekly-review-progress"><div style="width:${(state.index + 1) / state.questions.length * 100}%"></div></div><div class="weekly-review-question"><span class="text-xs font-bold text-indigo-500">${q.mode === 'CHOICE' ? '알맞은 뜻을 선택하세요' : '영어 단어를 입력하세요'}</span><h2>${e(q.mode === 'CHOICE' ? q.word.en : q.word.ko)}</h2>${q.mode === 'CHOICE' ? `<div class="space-y-3">${q.choices.map((choice,i) => `<button data-review-choice="${i}" onclick="App.setWeeklyReviewAnswer('${q.id}', App.state.weeklyReview.questions[App.state.weeklyReview.index].choices[${i}]); App.renderWeeklyReviewQuestion()" class="weekly-review-choice ${answer === choice ? 'selected' : ''}"><span>${['①','②','③','④','⑤'][i]}</span> ${e(choice)}</button>`).join('')}</div>` : `<input id="weeklyReviewInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="영어 입력" value="${e(answer)}" oninput="App.setWeeklyReviewAnswer('${q.id}', this.value)" class="weekly-review-input">`}</div><div class="flex justify-between gap-3 mt-5"><button ${!state.index ? 'disabled' : ''} onclick="App.moveWeeklyReview(${state.index - 1})" class="weekly-review-secondary">이전</button>${state.index < state.questions.length - 1 ? `<button onclick="App.moveWeeklyReview(${state.index + 1})" class="grammar-result-back">다음</button>` : `<button id="weeklyReviewSubmit" onclick="App.submitWeeklyReview()" class="grammar-result-back">회차 제출</button>`}</div><nav class="weekly-review-nav" aria-label="복습 문항 이동">${state.questions.map((item,i) => `<button class="${String(state.answers[item.id] || '').trim() ? 'answered' : ''} ${state.index === i ? 'current' : ''}" onclick="App.moveWeeklyReview(${i})" aria-label="${i+1}번 문항">${i+1}</button>`).join('')}</nav></div>`;
  },
  async submitWeeklyReview() {
    if (this._weeklyReviewSubmitting) return;
    const state = this.state.weeklyReview;
    const blanks = state.questions.filter(q => !String(state.answers[q.id] || '').trim()).length;
    if (blanks && !window.confirm(`아직 풀지 않은 문제가 ${blanks}문제 있습니다. 제출하시겠습니까?`)) return;
    this._weeklyReviewSubmitting = true;
    const button = document.getElementById('weeklyReviewSubmit');
    if (button) { button.disabled = true; button.textContent = '저장 중…'; }
    try {
      await AppData.submitWeeklyReviewRound(state.id, state.round, state.answers);
      if (this.state.view === 'weeklyReview' && this.state.weeklyReview === state) this.showWeeklyReviewResult(state.id);
    } catch (error) {
      this.toast(error.message || '저장에 실패했습니다. 다시 제출해주세요.', 'error');
      if (button) { button.disabled = false; button.textContent = '다시 제출'; }
    } finally { this._weeklyReviewSubmitting = false; }
  },
  showWeeklyReviewResult(id) {
    const test = AppData.getTests().find(t => t.id === id), result = AppData.getWeeklyReviewResult(id);
    if (!test || !result) return;
    this.state.weeklyReview = { id, result: true };
    this.showWeeklyReviewView();
    const e = v => this.escapeHtml(String(v)), latest = result.rounds[result.rounds.length - 1];
    const review = round => round.details.filter(d => !d.correct).map(d => {
      const q = test.questions.find(q => q.id === d.questionId);
      return `<div class="weekly-review-answer"><strong>${e(q.word.en)} <span>${e(q.word.ko)}</span></strong><p>내 답안: ${e(d.answer || '(미입력)')}</p><p class="text-emerald-700">모범답안: ${e(q.mode === 'CHOICE' ? q.word.ko : q.word.en)}</p></div>`;
    }).join('') || '<p class="text-emerald-700 font-bold">모두 맞혔습니다.</p>';
    document.getElementById('weeklyReviewView').innerHTML = `<div class="grammar-result-page"><div class="grammar-result-heading"><div><div class="grammar-result-eyebrow">WEEKLY REVIEW · ${e(test.weekStart)} — ${e(test.weekEnd)}</div><h1>${result.completed ? '이번 주 복습 완료' : '한 번 더, 확실하게'}</h1><p class="grammar-result-subtitle">틀렸던 단어가 익숙해지는 시간</p></div><button onclick="App.leaveWeeklyReview()" class="grammar-result-back">캘린더로 돌아가기</button></div><section class="grammar-result-panel grammar-result-practice vocab-single-result ${result.completed ? 'is-pass' : 'weekly-review-in-progress'}"><div class="grammar-result-panel-top"><span class="grammar-result-tag">주간 복습</span><span>${result.rounds.length}회차 제출 완료</span></div><div class="grammar-result-main"><div class="grammar-completion-verdict weekly-review-verdict">${result.completed ? 'COMPLETE' : 'KEEP GOING'}</div><p>${result.completed ? '모든 단어를 해결했습니다.' : '남은 오답만 다시 풀어보세요.'}</p><div class="grammar-completion-score">${result.firstScore}<span>점 · 첫 점수</span></div><div class="vocab-result-stats"><div><strong>${result.initialWrongCount}</strong><span>처음 틀린 단어</span></div><div><strong>${result.remainingIds.length}</strong><span>현재 남은 단어</span></div><div><strong>${result.rounds.length}</strong><span>진행 회차</span></div></div></div><div class="grammar-result-panel-bottom"><span>이번 회차 ${latest.score}점 · ${test.questions.length}개 단어</span>${!result.completed ? `<button id="weeklyReviewRetry" onclick="App.startWeeklyReview('${id}')" class="grammar-result-action">오답 다시 풀기 <i class="fa-solid fa-arrow-right"></i></button>` : '<span>복습 완료 <i class="fa-solid fa-check"></i></span>'}</div></section><section class="vocab-result-review mt-6"><h2 class="font-bold text-lg mb-4">${latest.number}회차 오답 · 모범답안</h2>${review(latest)}</section>${result.rounds.length > 1 ? `<details class="vocab-result-review mt-4"><summary class="font-bold cursor-pointer">이전 회차 오답 기록</summary>${result.rounds.slice(0,-1).map(round => `<h3 class="font-bold my-4">${round.number}회차 · ${round.score}점</h3>${review(round)}`).join('')}</details>` : ''}</div>`;
  },
  renderWeeklyReviewAdminRow(test) {
    const result = AppData.getWeeklyReviewResult(test.id), blocked = test.status === 'REVIEW_DATA_NEEDED';
    return `<tr class="border-b border-slate-100"><td class="p-4 text-xs">${this.escapeHtml(test.date)}</td><td class="p-4 font-bold">주간 복습<p class="text-xs font-normal text-slate-500">${this.escapeHtml(test.scope)}</p></td><td class="p-4 text-xs">${blocked ? '<span class="text-amber-700 font-bold">자료 확인 필요</span>' : result?.completed ? '복습 완료' : '복습 예정 / 진행 중'}</td><td class="p-4 text-xs">${result ? `첫 점수 ${result.firstScore}점 · 남은 ${result.remainingIds.length}개` : `${test.questions.length}개 단어`}</td><td class="p-4 text-xs">${result?.rounds.length || 0}회차</td><td class="p-4"><button class="text-indigo-600 text-xs font-bold" onclick="App.openWeeklyReviewModal('${test.id}')">상세 확인</button></td></tr>`;
  }
});
