/** 일반 단어 시험과 독립된 복습 화면. 미제출 회차에는 불합격/대기시간을 부여하지 않는다. */
Object.assign(App, {
  openWeeklyReviewModal(id) {
    const test = AppData.getTests().find(t => t.id === id);
    if (!test || test.type !== 'VOCAB_REVIEW') return;
    const result = AppData.getWeeklyReviewResult(id), e = value => this.escapeHtml(String(value));
    const student = AppData.getStudentById(test.studentId);
    const blocked = test.status === 'REVIEW_DATA_NEEDED';
    const locked = test.reviewStage === 'LOCKED', noErrors = test.reviewStage === 'NO_ERRORS';
    const available = WeeklyReviewLogic.available(test);
    const actionClass = 'w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-violet-200 cursor-pointer';
    document.getElementById('detailModalStudentBadge').textContent = `${student?.name || ''} 학생 · 주간 복습`;
    document.getElementById('detailModalTitle').textContent = test.title;
    document.getElementById('detailModalBody').innerHTML = `
      <span hidden data-weekly-review-modal="${e(id)}"></span>
      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400 font-bold block mb-0.5">응시 가능 일자</span><strong class="text-slate-800 font-extrabold">${e(test.date)}부터</strong></div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><span class="text-slate-400 font-bold block mb-0.5">복습 완료 기준</span><strong class="text-slate-800 font-extrabold">모든 오답 해결</strong></div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"><span class="text-slate-400 font-bold block mb-0.5">주간 복습 범위</span><strong class="text-slate-800 font-extrabold">${e(test.weekStart)} ~ ${e(test.weekEnd)}</strong></div>
      ${blocked ? `<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-bold">자료 확인 필요 · ${e(test.blockedReason || '원본 단어장과 응시 기록을 확인해주세요.')}</div>` : `
      <div class="space-y-2"><h4 class="text-xs font-bold text-slate-700 flex items-center gap-1.5"><i aria-hidden="true" class="fa-solid fa-chart-simple text-violet-600"></i>최신 복습 결과</h4>
        <div class="grammar-latest-card"><div><h5>주간 복습</h5></div><span class="grammar-latest-status ${result?.completed || noErrors ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'}">${noErrors ? '오답 없음 · 복습 완료' : locked ? '응시 잠김' : result?.completed ? '복습 완료' : result ? `${result.rounds.length}회차 · 복습 중` : '미응시'}</span>
          <div class="weekly-review-modal-stats"><div><span>출제 단어</span><strong>${locked ? '완수 후 출제' : `${test.questions.length}개`}</strong></div><div><span>남은 단어</span><strong>${result ? `${result.remainingIds.length}개` : noErrors ? '0개' : '미응시'}</strong></div><div><span>현재 점수</span><strong>${result ? `${result.rounds[result.rounds.length - 1].score}점` : '—'}</strong></div></div>
          ${result ? `<button type="button" onclick="App.showWeeklyReviewResult('${id}')" class="w-full py-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold transition flex items-center justify-center gap-2 border border-violet-200"><i aria-hidden="true" class="fa-solid fa-file-circle-check"></i>결과 확인</button>` : ''}
        </div>
      </div>
      ${locked ? `<div class="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-800"><strong>월~금 단어 시험 ${test.completedDays || 0}/5일 완료</strong><p class="mt-1">월~금 매일 배정된 단어 시험을 모두 최종 통과하면 응시할 수 있습니다. 통합 시험은 선생님 채점까지 완료되어야 합니다.</p></div>` : noErrors ? '<div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">이번 주 오답이 없어 복습을 완료했습니다.</div>' : ''}
      ${test.unresolvedCount ? `<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">원본을 확인할 수 없는 오답 ${test.unresolvedCount}건은 출제에서 제외했습니다.</div>` : ''}
      <div class="space-y-2.5 pt-2">${!result?.completed && !noErrors ? available ? `<button type="button" onclick="App.startWeeklyReview('${id}')" class="${actionClass}"><i aria-hidden="true" class="fa-solid fa-pencil"></i>${result ? '오답 다시 풀기' : '테스트 응시'}</button>` : `<button disabled class="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed"><i aria-hidden="true" class="fa-solid fa-clock"></i>${locked ? '월~금 5일치 단어 시험 완료 후 응시 가능' : `${e(test.date)} 00:00부터 응시 가능`}</button>` : ''}</div>`}`;
    this.showModal('testDetailModal');
  },
  refreshWeeklyReviewModal() {
    if (!this._activeModals?.has('testDetailModal')) return;
    const marker = document.querySelector('#detailModalBody [data-weekly-review-modal]');
    if (marker) this.openWeeklyReviewModal(marker.dataset.weeklyReviewModal);
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
    this.state.weeklyReview = { id, questions: WeeklyReviewLogic.shuffle(test.questions.filter(q => ids.includes(q.id))), answers: {}, round: (result?.rounds.length || 0) + 1 };
    this.showWeeklyReviewView();
    this.renderWeeklyReviewPaper();
  },
  setWeeklyReviewAnswer(id, value) {
    const state = this.state.weeklyReview;
    if (this._weeklyReviewSubmitting || !state?.answers) return;
    state.answers[id] = value;
    const count = state.questions.filter(q => String(state.answers[q.id] || '').trim()).length;
    const counter = document.getElementById('weeklyReviewAnsweredCount');
    if (counter) counter.textContent = `${count} / ${state.questions.length}문항 작성`;
    const progress = document.getElementById('weeklyReviewProgressFill');
    if (progress) progress.style.width = `${count / state.questions.length * 100}%`;
  },
  renderWeeklyReviewPaper() {
    const state = this.state.weeklyReview, e = value => this.escapeHtml(String(value));
    document.getElementById('weeklyReviewView').innerHTML = `
      <div class="weekly-review-exam">
        <div class="grammar-result-heading"><div><div class="grammar-result-eyebrow">WEEKLY REVIEW · ROUND ${state.round}</div><h1>단어 복습</h1><p class="grammar-result-subtitle">총 ${state.questions.length}문항</p></div><button type="button" onclick="App.leaveWeeklyReview()" class="grammar-result-back">나가기</button></div>
        <div class="weekly-review-paper-progress"><span id="weeklyReviewAnsweredCount" aria-live="polite">0 / ${state.questions.length}문항 작성</span><div class="weekly-review-progress"><div id="weeklyReviewProgressFill" style="width:0%"></div></div></div>
        <form data-review-paper onsubmit="event.preventDefault()" class="weekly-review-paper">
          ${state.questions.map((q, index) => `<fieldset class="weekly-review-question" id="weeklyReviewQuestion_${e(q.id)}"><legend class="weekly-review-question-number">${String(index + 1).padStart(2, '0')}</legend><span class="text-xs font-bold text-indigo-500">${q.mode === 'CHOICE' ? '알맞은 뜻을 선택하세요' : '영어 단어를 입력하세요'}</span><h2 id="weeklyReviewPrompt_${e(q.id)}">${e(q.mode === 'CHOICE' ? q.word.en : q.word.ko)}</h2>
            ${q.mode === 'CHOICE' ? `<div class="space-y-3">${q.choices.map((choice, i) => `<label class="weekly-review-option"><input type="radio" name="weeklyReview_${e(q.id)}" value="${e(choice)}" data-review-choice="${i}" onchange="App.setWeeklyReviewAnswer('${e(q.id)}', this.value)"><span class="weekly-review-choice"><span>${['①','②','③','④','⑤'][i]}</span> ${e(choice)}</span></label>`).join('')}</div>` : `<input id="weeklyReviewInput_${e(q.id)}" aria-labelledby="weeklyReviewPrompt_${e(q.id)}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="영어 입력" oninput="App.setWeeklyReviewAnswer('${e(q.id)}', this.value)" class="weekly-review-input">`}
          </fieldset>`).join('')}
          <div class="weekly-review-paper-submit"><button type="button" id="weeklyReviewSubmit" onclick="App.submitWeeklyReview()" class="grammar-result-back">답안 제출</button></div>
        </form>
      </div>`;
  },
  async submitWeeklyReview() {
    if (this._weeklyReviewSubmitting) return;
    const state = this.state.weeklyReview;
    const blanks = state.questions.filter(q => !String(state.answers[q.id] || '').trim()).length;
    if (blanks && !window.confirm(`아직 풀지 않은 문제가 ${blanks}문제 있습니다. 제출하시겠습니까?`)) return;
    this._weeklyReviewSubmitting = true;
    const fields = [...document.querySelectorAll('[data-review-paper] fieldset')];
    fields.forEach(field => { field.disabled = true; });
    const button = document.getElementById('weeklyReviewSubmit');
    if (button) { button.disabled = true; button.textContent = '저장 중…'; }
    try {
      await AppData.submitWeeklyReviewRound(state.id, state.round, state.answers);
      if (this.state.view === 'weeklyReview' && this.state.weeklyReview === state) this.showWeeklyReviewResult(state.id);
    } catch (error) {
      this.toast(error.message || '저장에 실패했습니다. 다시 제출해주세요.', 'error');
      if (button) { button.disabled = false; button.textContent = '다시 제출'; }
    } finally { this._weeklyReviewSubmitting = false; fields.forEach(field => { field.disabled = false; }); }
  },
  showWeeklyReviewResult(id) {
    const test = AppData.getTests().find(t => t.id === id), result = AppData.getWeeklyReviewResult(id);
    if (!test || !result) return;
    this.state.weeklyReview = { id, result: true };
    this.showWeeklyReviewView();
    const e = v => this.escapeHtml(String(v)), latest = result.rounds[result.rounds.length - 1];
    const review = round => {
      const wrongAnswers = round.details.filter(d => !d.correct).map(d => {
        const q = test.questions.find(q => q.id === d.questionId);
        return { question: `${q.word.en} (${q.word.ko})`, answer: d.answer || '(미입력)', correct: q.mode === 'CHOICE' ? q.word.ko : q.word.en, desc: q.word.desc };
      });
      return wrongAnswers.length ? this.renderVocabWrongAnswerList(wrongAnswers) : '<div class="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold">모두 맞혔습니다.</div>';
    };
    document.getElementById('weeklyReviewView').innerHTML = `<div class="grammar-result-page"><div class="grammar-result-heading"><div><div class="grammar-result-eyebrow">WEEKLY REVIEW · ${e(test.weekStart)} — ${e(test.weekEnd)}</div><h1>${result.completed ? '이번 주 복습 완료' : '한 번 더, 확실하게'}</h1></div><button type="button" class="grammar-result-back" onclick="App.leaveWeeklyReview()">학습공간으로 돌아가기 <span aria-hidden="true">→</span></button></div><section class="grammar-result-panel grammar-result-practice vocab-single-result ${result.completed ? 'is-pass' : 'weekly-review-in-progress'}"><div class="grammar-result-panel-top"><span class="grammar-result-tag">주간 복습</span><span>${result.rounds.length}회차 제출 완료</span></div><div class="grammar-result-main"><div class="grammar-completion-verdict weekly-review-verdict">${result.completed ? 'COMPLETE' : 'KEEP GOING'}</div><p>${result.completed ? '모든 단어를 해결했습니다.' : '남은 오답만 다시 풀어보세요.'}</p><div class="grammar-completion-score weekly-review-current-score">${latest.score}<span>점</span></div><div class="vocab-result-stats"><div><strong>${result.initialWrongCount}</strong><span>처음 틀린 단어</span></div><div><strong>${result.remainingIds.length}</strong><span>현재 남은 단어</span></div><div><strong>${result.rounds.length}</strong><span>진행 회차</span></div></div></div><div class="grammar-result-panel-bottom"><span>이번 회차 ${latest.score}점 · ${latest.details.length}개 단어</span>${!result.completed ? `<button id="weeklyReviewRetry" onclick="App.startWeeklyReview('${id}')" class="grammar-result-action">오답 다시 풀기 <i class="fa-solid fa-arrow-right"></i></button>` : '<span>복습 완료 <i class="fa-solid fa-check"></i></span>'}</div></section><section class="vocab-result-review mt-6"><h2 class="text-xs font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-wider mb-3"><i aria-hidden="true" class="fa-solid fa-triangle-exclamation"></i>${latest.number}회차 틀린 단어 오답 노트 (${latest.remainingIds.length}개)</h2>${review(latest)}</section>${result.rounds.length > 1 ? `<details class="vocab-result-review mt-4"><summary class="font-bold cursor-pointer">이전 회차 오답 기록</summary>${result.rounds.slice(0,-1).map(round => `<h3 class="font-bold my-4">${round.number}회차 · ${round.score}점</h3>${review(round)}`).join('')}</details>` : ''}</div>`;
  },
  renderWeeklyReviewAdminRow(test) {
    const result = AppData.getWeeklyReviewResult(test.id), blocked = test.status === 'REVIEW_DATA_NEEDED';
    return `<tr class="border-b border-slate-100"><td class="p-4 text-xs">${this.escapeHtml(test.date)}</td><td class="p-4 font-bold">주간 복습<p class="text-xs font-normal text-slate-500">${this.escapeHtml(test.scope)}</p></td><td class="p-4 text-xs">${blocked ? '<span class="text-amber-700 font-bold">자료 확인 필요</span>' : test.reviewStage === 'LOCKED' ? `응시 잠김 (${test.completedDays || 0}/5일 완료)` : test.reviewStage === 'NO_ERRORS' ? '오답 없음 · 복습 완료' : result?.completed ? '복습 완료' : '복습 예정 / 진행 중'}</td><td class="p-4 text-xs">${result ? `현재 점수 ${result.rounds[result.rounds.length - 1].score}점 · 남은 ${result.remainingIds.length}개` : test.reviewStage === 'LOCKED' ? '완수 후 출제' : `${test.questions.length}개 단어`}</td><td class="p-4 text-xs">${result?.rounds.length || 0}회차</td><td class="p-4"><button class="text-indigo-600 text-xs font-bold" onclick="App.openWeeklyReviewModal('${test.id}')">상세 확인</button></td></tr>`;
  }
});
