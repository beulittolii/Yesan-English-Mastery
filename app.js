/**
 * 영어과외 학습 관리 & 캘린더 시스템 - 메인 애플리케이션 로직 (app.js)
 */
console.log("Firebase DB:", window.firebaseDB);

const App = {
  // 상태 관리 (State)
  state: {
    view: 'landing', // 'landing' | 'student' | 'admin' | 'vocabTest'
    selectedStudentId: 1,
    adminSelectedStudentId: 1,
    isAdminLoggedIn: false,
    calendarDate: new Date(),
    studentViewTab: 'calendar', // 'calendar' | 'list'
    studentListFilter: 'ALL', // 'ALL' | 'SCHEDULED' | 'PASS' | 'RETEST'
    adminTab: 'tests', // 'tests' | 'overview' | 'students' | 'backup' | 'vocab'
    // 단어 테스트 상태
    vocabTest: {
      setId: null,
      direction: 1,    // 1 = 한글→영어, 2 = 영어→한글
      questions: [],   // [{word, choices, answered, correct}]
      currentIndex: 0,
      score: 0,
      timerId: null,
      timeRemaining: 5
    },
    vocabSetReturnToTestForm: false
  },

  // 초기화 (Init)
  init() {
    this.renderLanding();
    this.bindEvents();
  },

  bindEvents() {
    // 키보드 ESC로 모달 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // 모달 배경 클릭 시 닫기
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });
  },

  // ========================================================
  // 1. 네비게이션 & 뷰 전환 (Navigation & Views)
  // ========================================================
  showLanding() {
    this.clearVocabQuestionTimer();
    this.state.view = 'landing';
    document.getElementById('landingView').classList.remove('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');
    this.renderLanding();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  selectStudent(studentId) {
    this.clearVocabQuestionTimer();
    this.state.selectedStudentId = Number(studentId);
    this.state.view = 'student';
    this.state.calendarDate = new Date(); // 오늘 기준으로 캘린더 초기화
    this.state.studentViewTab = 'calendar';
    this.state.studentListFilter = 'ALL';

    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.remove('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');

    this.renderStudentDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showAdminDashboard() {
    this.clearVocabQuestionTimer();
    this.state.view = 'admin';
    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.remove('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');

    this.renderAdminDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showVocabTestView() {
    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ========================================================
  // 2. 랜딩 화면 렌더링 (Profile Selection Grid)
  // ========================================================
  renderLanding() {
    const grid = document.getElementById('studentCardsGrid');
    if (!grid) return;

    const students = AppData.getStudents();
    const allTests = AppData.getTests();
    const todayStr = this.getTodayDateString();

    grid.innerHTML = students.map(student => {
      const studentTests = allTests.filter(t => t.studentId === student.id);
      const totalTests = studentTests.length;
      const passCount = studentTests.filter(t => t.status === 'PASS' || t.retestStatus === 'RETEST_PASS').length;
      const retestPendingCount = studentTests.filter(t => t.retestStatus === 'RETEST_PENDING' || (t.status === 'FAIL' && t.retestStatus !== 'RETEST_PASS')).length;
      
      // 다가오는 가장 빠른 시험
      const upcomingTests = studentTests
        .filter(t => t.date >= todayStr && t.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      const nextTest = upcomingTests[0];

      let nextTestHtml = '';
      if (nextTest) {
        const dDay = this.calculateDDay(nextTest.date);
        const dDayBadgeClass = dDay === 'D-Day' ? 'bg-rose-500 text-white animate-pulse' : 'bg-indigo-100 text-indigo-700';
        nextTestHtml = `
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="truncate mr-2">
              <span class="text-slate-400 block text-[11px]">다음 예정 시험</span>
              <span class="font-bold text-slate-800 truncate block">${this.escapeHtml(nextTest.title)}</span>
            </div>
            <span class="px-2 py-0.5 rounded-full font-extrabold text-[11px] whitespace-nowrap ${dDayBadgeClass}">${dDay}</span>
          </div>
        `;
      } else {
        nextTestHtml = `
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>예정된 시험이 없습니다.</span>
            <span class="text-emerald-600 font-semibold"><i class="fa-solid fa-circle-check"></i> 완료</span>
          </div>
        `;
      }

      return `
        <div onclick="App.selectStudent(${student.id})" class="glass-card rounded-2xl p-6 cursor-pointer profile-card relative group border hover:border-indigo-300">
          <!-- Top Tag & Avatar -->
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3.5">
              <div class="w-14 h-14 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center text-white shadow-inner flex-shrink-0 border border-slate-200/80">
                <i class="fa-solid fa-user text-xl text-white/90"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">${this.escapeHtml(student.name)}</h3>
                <span class="text-xs text-slate-400 font-medium">학생 #${student.id}</span>
              </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition">
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </div>

          <!-- Target / Goal -->
          <p class="text-xs text-slate-500 mt-3 font-medium flex items-center gap-1.5">
            <i class="fa-solid fa-bullseye text-indigo-500"></i>
            <span class="truncate">${this.escapeHtml(student.target)}</span>
          </p>

          <!-- Badges Summary -->
          <div class="flex items-center gap-2 mt-4 flex-wrap">
            <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
              전체 <strong class="text-indigo-600">${totalTests}</strong>
            </span>
            <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              통과 <strong class="text-emerald-700">${passCount}</strong>
            </span>
            ${retestPendingCount > 0 ? `
              <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 pulse-badge">
                ⚠️ 재시험 ${retestPendingCount}
              </span>
            ` : ''}
          </div>

          <!-- Next Test Footer -->
          ${nextTestHtml}
        </div>
      `;
    }).join('');
  },

  // ========================================================
  // 3. 학생 전용 대시보드 (Student Dashboard & Calendar)
  // ========================================================
  renderStudentDashboard() {
    const student = AppData.getStudentById(this.state.selectedStudentId);
    if (!student) return;

    const tests = AppData.getTestsByStudentId(student.id);
    const todayStr = this.getTodayDateString();

    // 1. 학생 배너 렌더링
    const banner = document.getElementById('studentBanner');
    banner.innerHTML = `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center text-white shadow-md flex-shrink-0 border-2 border-white">
            <i class="fa-solid fa-user text-2xl text-white/90"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-2xl font-extrabold text-slate-900">${this.escapeHtml(student.name)} 학생의 학습 공간</h2>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-bullseye text-indigo-500"></i>
              <span>목표: <strong>${this.escapeHtml(student.target)}</strong></span>
            </p>
          </div>
        </div>

        <button onclick="App.showLanding()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition flex items-center gap-2">
          <i class="fa-solid fa-users"></i>
          <span>다른 학생 선택</span>
        </button>
      </div>
    `;

    // 2. 통계 위젯 렌더링
    const totalTests = tests.length;
    const passedTests = tests.filter(t => t.status === 'PASS' || t.retestStatus === 'RETEST_PASS').length;
    const retestNeeded = tests.filter(t => t.retestStatus === 'RETEST_PENDING' || (t.status === 'FAIL' && t.retestStatus !== 'RETEST_PASS')).length;
    const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    const upcomingTests = tests
      .filter(t => t.date >= todayStr && t.status === 'SCHEDULED')
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextTest = upcomingTests[0];
    const nextDDay = nextTest ? this.calculateDDay(nextTest.date) : '-';

    const statsGrid = document.getElementById('studentStatsGrid');
    statsGrid.innerHTML = `
      <div class="glass-card rounded-2xl p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>다음 시험 일정</span>
          <i class="fa-solid fa-hourglass-half text-indigo-500"></i>
        </div>
        <div class="mt-2">
          <div class="text-xl sm:text-2xl font-black text-indigo-600">${nextDDay}</div>
          <p class="text-[11px] text-slate-500 truncate mt-0.5">${nextTest ? this.escapeHtml(nextTest.title) : '예정 시험 없음'}</p>
        </div>
      </div>

      <div class="glass-card rounded-2xl p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>통과율</span>
          <i class="fa-solid fa-chart-pie text-emerald-500"></i>
        </div>
        <div class="mt-2">
          <div class="text-xl sm:text-2xl font-black text-emerald-600">${passRate}%</div>
          <p class="text-[11px] text-slate-500 mt-0.5">${passedTests}개 통과 / 총 ${totalTests}개</p>
        </div>
      </div>

      <div class="glass-card rounded-2xl p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>재시험 대기</span>
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
        </div>
        <div class="mt-2">
          <div class="text-xl sm:text-2xl font-black ${retestNeeded > 0 ? 'text-amber-600' : 'text-slate-700'}">${retestNeeded}건</div>
          <p class="text-[11px] text-slate-500 mt-0.5">${retestNeeded > 0 ? '재시험 대비 필수!' : '재시험 없음 ✨'}</p>
        </div>
      </div>

      <div class="glass-card rounded-2xl p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>전체 시험 수</span>
          <i class="fa-solid fa-file-lines text-slate-500"></i>
        </div>
        <div class="mt-2">
          <div class="text-xl sm:text-2xl font-black text-slate-800">${totalTests}회</div>
          <p class="text-[11px] text-slate-500 mt-0.5">누적 기록된 테스트</p>
        </div>
      </div>
    `;

    // 3. 현재 탭 렌더링
    if (this.state.studentViewTab === 'calendar') {
      this.renderCalendar();
    } else {
      this.renderStudentTestsList();
    }

    const existingVocabSection = document.getElementById('studentVocabSection');
    if (existingVocabSection) existingVocabSection.remove();
  },

  switchStudentViewTab(tab) {
    this.state.studentViewTab = tab;
    const calTabBtn = document.getElementById('viewTabCalendar');
    const listTabBtn = document.getElementById('viewTabList');
    const calContainer = document.getElementById('studentCalendarContainer');
    const listContainer = document.getElementById('studentListContainer');

    if (tab === 'calendar') {
      calTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      listTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition text-slate-600 hover:text-slate-900 flex items-center gap-1.5';
      calContainer.classList.remove('hidden');
      listContainer.classList.add('hidden');
      this.renderCalendar();
    } else {
      listTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      calTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition text-slate-600 hover:text-slate-900 flex items-center gap-1.5';
      calContainer.classList.add('hidden');
      listContainer.classList.remove('hidden');
      this.renderStudentTestsList();
    }
  },

  // 캘린더 네비게이션
  prevMonth() {
    this.state.calendarDate.setMonth(this.state.calendarDate.getMonth() - 1);
    this.renderCalendar();
  },

  nextMonth() {
    this.state.calendarDate.setMonth(this.state.calendarDate.getMonth() + 1);
    this.renderCalendar();
  },

  goToToday() {
    this.state.calendarDate = new Date();
    this.renderCalendar();
  },

  // 캘린더 월간 그리드 렌더링
  renderCalendar() {
    const calGrid = document.getElementById('calendarDaysGrid');
    const title = document.getElementById('calendarMonthTitle');
    if (!calGrid || !title) return;

    const currYear = this.state.calendarDate.getFullYear();
    const currMonth = this.state.calendarDate.getMonth(); // 0-11
    title.innerText = `${currYear}년 ${currMonth + 1}월`;

    const firstDayIndex = new Date(currYear, currMonth, 1).getDay(); // 0(Sun) - 6(Sat)
    const lastDate = new Date(currYear, currMonth + 1, 0).getDate();
    const prevLastDate = new Date(currYear, currMonth, 0).getDate();

    const studentTests = AppData.getTestsByStudentId(this.state.selectedStudentId);
    const todayStr = this.getTodayDateString();

    let gridHtml = '';

    // 1. 이전 달 날짜들 채우기
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevLastDate - i;
      const prevDate = new Date(currYear, currMonth - 1, dayNum);
      const dateStr = this.formatDate(prevDate);
      gridHtml += this.buildCalendarCell(dayNum, dateStr, true, studentTests, todayStr);
    }

    // 2. 이번 달 날짜들 채우기
    for (let dayNum = 1; dayNum <= lastDate; dayNum++) {
      const curDate = new Date(currYear, currMonth, dayNum);
      const dateStr = this.formatDate(curDate);
      gridHtml += this.buildCalendarCell(dayNum, dateStr, false, studentTests, todayStr);
    }

    // 3. 다음 달 날짜들 채우기 (7열 그리드 마감)
    const totalCells = firstDayIndex + lastDate;
    const nextDaysNeeded = (7 - (totalCells % 7)) % 7;
    for (let dayNum = 1; dayNum <= nextDaysNeeded; dayNum++) {
      const nextDate = new Date(currYear, currMonth + 1, dayNum);
      const dateStr = this.formatDate(nextDate);
      gridHtml += this.buildCalendarCell(dayNum, dateStr, true, studentTests, todayStr);
    }

    calGrid.innerHTML = gridHtml;
  },

  // 캘린더 개별 날짜 셀 생성 헬퍼
  buildCalendarCell(dayNum, dateStr, isOtherMonth, studentTests, todayStr) {
    const isToday = dateStr === todayStr;
    const cellClass = `calendar-day-cell p-1.5 sm:p-2 bg-white flex flex-col justify-start relative ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today !bg-indigo-50/70 ring-1 ring-inset ring-indigo-400' : ''}`;

    // 해당 날짜에 있는 시험 필터링 (본시험 날짜이거나 재시험 날짜인 경우)
    const dayTests = studentTests.filter(t => t.date === dateStr || t.retestDate === dateStr);

    let testsHtml = '';
    dayTests.forEach(test => {
      if (test.type === 'VOCAB') {
        if (test.date === dateStr) {
          const badgeStyle = this.getTestBadgeStyle(test, false);
          testsHtml += `
            <div onclick="App.openVocabTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center justify-between gap-1 shadow-xs ${badgeStyle.class}" title="단어장 확인 및 단어 테스트 시작">
              <div class="truncate flex items-center gap-1"><span><i class="fa-solid fa-spell-check"></i></span><span class="truncate">단어 테스트</span></div>
              <span class="text-[10px] font-bold opacity-80 whitespace-nowrap">${badgeStyle.tag}</span>
            </div>`;
        }
        return;
      }
      const isRetestDay = test.retestDate === dateStr && test.date !== dateStr;
      const badgeStyle = this.getTestBadgeStyle(test, isRetestDay);
      
      testsHtml += `
        <div onclick="App.openTestDetailModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center justify-between gap-1 shadow-xs ${badgeStyle.class}" title="클릭하여 상세 정보 확인">
          <div class="truncate flex items-center gap-1">
            <span>${badgeStyle.icon}</span>
            <span class="truncate">${this.escapeHtml(test.title)}</span>
          </div>
          <span class="text-[10px] font-bold opacity-80 whitespace-nowrap">${badgeStyle.tag}</span>
        </div>
      `;
    });

    return `
      <div class="${cellClass}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs sm:text-sm font-bold ${isToday ? 'text-indigo-600' : isOtherMonth ? 'text-slate-300' : 'text-slate-700'}">
            ${dayNum}
          </span>
          ${isToday ? '<span class="text-[10px] font-black text-indigo-600 uppercase">Today</span>' : ''}
        </div>
        <div class="space-y-1 overflow-y-auto max-h-[80px]">
          ${testsHtml}
        </div>
      </div>
    `;
  },

  // 시험 상태에 따른 스타일/배지 반환
  getTestBadgeStyle(test, isRetestDay = false) {
    if (isRetestDay) {
      if (test.retestStatus === 'RETEST_PASS') {
        return { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', icon: '✨', tag: '재시험 통과' };
      } else if (test.retestStatus === 'RETEST_FAIL') {
        return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '❌', tag: '재시험 불합격' };
      } else {
        return { class: 'bg-amber-100 text-amber-800 border border-amber-300', icon: '🔄', tag: '재시험 예정' };
      }
    }

    if (test.status === 'PASS') {
      return { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', icon: '✅', tag: '통과' };
    } else if (test.status === 'FAIL') {
      if (test.retestStatus === 'RETEST_PASS') {
        return { class: 'bg-emerald-50 text-emerald-700 border border-emerald-200', icon: '✨', tag: '재시험합격' };
      } else if (test.retestStatus === 'RETEST_PENDING') {
        return { class: 'bg-amber-100 text-amber-800 border border-amber-300', icon: '⚠️', tag: '재시험대기' };
      } else {
        return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '❌', tag: '불합격' };
      }
    } else {
      return { class: 'bg-blue-100 text-blue-800 border border-blue-200', icon: '📅', tag: '예정' };
    }
  },

  // 학생 리스트형 뷰 필터 및 렌더링
  filterStudentTests(filterType) {
    this.state.studentListFilter = filterType;
    ['ALL', 'SCHEDULED', 'PASS', 'RETEST'].forEach(f => {
      const btn = document.getElementById(`filterBtn${f}`);
      if (btn) {
        if (f === filterType) {
          btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white shadow-sm transition';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition';
        }
      }
    });
    this.renderStudentTestsList();
  },

  renderStudentTestsList() {
    const container = document.getElementById('studentTestsListContent');
    if (!container) return;

    let tests = AppData.getTestsByStudentId(this.state.selectedStudentId);
    const filter = this.state.studentListFilter;

    if (filter === 'SCHEDULED') {
      tests = tests.filter(t => t.status === 'SCHEDULED');
    } else if (filter === 'PASS') {
      tests = tests.filter(t => t.status === 'PASS' || t.retestStatus === 'RETEST_PASS');
    } else if (filter === 'RETEST') {
      tests = tests.filter(t => t.status === 'FAIL' || t.retestStatus === 'RETEST_PENDING');
    }

    if (tests.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center text-slate-400">
          <i class="fa-regular fa-folder-open text-4xl mb-3"></i>
          <p class="text-sm font-semibold">해당 조건의 시험 일정이 없습니다.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = tests.map(test => {
      const dDay = this.calculateDDay(test.date);
      const badge = this.getTestBadgeStyle(test);
      const detailHandler = test.type === 'VOCAB'
        ? `App.openVocabTestScheduleModal('${test.id}')`
        : `App.openTestDetailModal('${test.id}')`;

      return `
        <div onclick="${detailHandler}" class="glass-card rounded-2xl p-5 hover:border-indigo-300 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.class}">
                ${badge.icon} ${badge.tag}
              </span>
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <i class="fa-regular fa-calendar"></i> ${test.date} ${test.time ? `(${test.time})` : ''}
              </span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${dDay}</span>
            </div>
            <h4 class="text-base font-bold text-slate-900">${this.escapeHtml(test.title)}</h4>
            <p class="text-xs text-slate-600 line-clamp-1">${this.escapeHtml(test.scope || '시험 범위 미기재')}</p>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div class="text-left sm:text-right">
              <div class="text-xs text-slate-400">커트라인: <strong class="text-slate-700">${this.escapeHtml(test.cutoff)}</strong></div>
              <div class="text-xs text-slate-400">본인 점수: <strong class="${test.score ? 'text-indigo-600 font-bold' : 'text-slate-400'}">${test.score || '미응시'}</strong></div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // ========================================================
  // 4. 시험 상세 모달 (Test Detail Modal)
  // ========================================================
  openTestDetailModal(testId) {
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === testId);
    if (!test) return;

    const student = AppData.getStudentById(test.studentId);
    const dDay = this.calculateDDay(test.date);

    document.getElementById('detailModalStudentBadge').innerText = student ? `${student.name} 학생` : '학생 시험 상세';
    document.getElementById('detailModalTitle').innerText = test.title;

    // 본시험 상태 포맷팅
    let statusBadge = '';
    if (test.status === 'PASS') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ 1차 본시험 통과 (PASS)</span>';
    } else if (test.status === 'FAIL') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">❌ 1차 본시험 불합격 (FAIL)</span>';
    } else {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">📅 시험 예정 (대기)</span>';
    }

    // 재시험 상태 포맷팅
    let retestBadge = '';
    if (test.retestStatus === 'RETEST_PASS') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✨ 재시험 통과 완료</span>';
    } else if (test.retestStatus === 'RETEST_FAIL') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">❌ 재시험 불합격</span>';
    } else if (test.retestStatus === 'RETEST_PENDING') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">⚠️ 재시험 대기 중</span>';
    } else {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">해당없음</span>';
    }

    const modalBody = document.getElementById('detailModalBody');
    modalBody.innerHTML = `
      <!-- Schedule & D-Day Card -->
      <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg">
            <i class="fa-regular fa-calendar-check"></i>
          </div>
          <div>
            <div class="text-xs text-slate-500 font-medium">시험 일정</div>
            <div class="text-sm font-bold text-slate-900">${test.date} ${test.time ? `(${test.time})` : ''}</div>
          </div>
        </div>
        <span class="px-3 py-1 rounded-full font-black text-xs ${dDay === 'D-Day' ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'}">${dDay}</span>
      </div>

      <!-- Scope Section -->
      <div class="space-y-1.5">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <i class="fa-solid fa-book-open text-indigo-500"></i>
          <span>시험 범위 및 상세 설명</span>
        </h4>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
          ${this.escapeHtml(test.scope || '별도의 시험 범위 설명이 등록되지 않았습니다.')}
        </div>
      </div>

      <!-- Cutoff vs Score Grid -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
          <div class="text-xs font-semibold text-indigo-700 flex items-center gap-1">
            <i class="fa-solid fa-flag-checkered"></i>
            <span>커트라인 (기준점)</span>
          </div>
          <div class="text-base font-extrabold text-slate-900 mt-1">${this.escapeHtml(test.cutoff || '미설정')}</div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-100 border border-slate-200">
          <div class="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <i class="fa-solid fa-award"></i>
            <span>학생 획득 점수</span>
          </div>
          <div class="text-base font-extrabold ${test.score ? 'text-indigo-600' : 'text-slate-400'} mt-1">
            ${test.score ? this.escapeHtml(test.score) : '미응시'}
          </div>
        </div>
      </div>

      <!-- Pass/Fail Status Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span class="text-xs font-bold text-slate-500 block">1차 본시험 결과</span>
          <div>${statusBadge}</div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span class="text-xs font-bold text-slate-500 block">재시험 결과 ${test.retestDate ? `(${test.retestDate})` : ''}</span>
          <div>${retestBadge}</div>
        </div>
      </div>

      <!-- Teacher Feedback Section -->
      <div class="space-y-1.5">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <i class="fa-solid fa-comment-dots text-indigo-500"></i>
          <span>선생님 피드백 & 복습 가이드</span>
        </h4>
        <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
          ${this.escapeHtml(test.teacherNote || '선생님의 코멘트가 아직 등록되지 않았습니다.')}
        </div>
      </div>
    `;

    this.showModal('testDetailModal');
  },

  closeTestDetailModal() {
    this.hideModal('testDetailModal');
  },

  openVocabTestScheduleModal(testId) {
    const test = AppData.getTests().find(item => item.id === testId);
    const set = test && AppData.getVocabSets().find(item => item.id === test.vocabSetId);
    if (!test || !set) { this.toast('연결된 단어 세트를 찾을 수 없습니다.', 'error'); return; }

    document.getElementById('detailModalStudentBadge').innerText = '단어 테스트';
    document.getElementById('detailModalTitle').innerText = '단어 테스트';
    document.getElementById('detailModalBody').innerHTML = `
      <div class="p-4 rounded-2xl bg-violet-50 border border-violet-200">
        <p class="text-xs font-bold text-violet-700">${this.escapeHtml(set.title)}</p>
        <p class="text-xs text-slate-600 mt-1">${set.words.length}개 단어 · ${set.words.length >= 40 ? '매 응시 40개 무작위 출제 · ' : ''}문제당 제한시간 5초 · 커트라인 ${this.escapeHtml(test.cutoff)}</p>
      </div>
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-600 flex items-center gap-1.5"><i class="fa-solid fa-book-open text-violet-600"></i> 단어장</h4>
        <div class="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white">
          ${set.words.map((word, index) => `<div class="grid grid-cols-[2rem_1fr_1fr] gap-2 p-3 text-xs"><span class="font-bold text-slate-400">${index + 1}</span><strong class="text-slate-800 break-words">${this.escapeHtml(word.en)}</strong><span class="text-slate-600 break-words">${this.escapeHtml(word.ko)}</span></div>`).join('')}
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        ${this.renderVocabTestButton(set, test.studentId, 1, '한글 → 영어', 'bg-blue-600 hover:bg-blue-700 shadow-blue-200', test.id)}
        ${this.renderVocabTestButton(set, test.studentId, 2, '영어 → 한글', 'bg-violet-600 hover:bg-violet-700 shadow-violet-200', test.id)}
      </div>`;
    this.showModal('testDetailModal');
  },

  // ========================================================
  // 5. 관리자 인증 & 관리자 대시보드 (Admin Management)
  // ========================================================
  openAdminAuthModal() {
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminAuthError').classList.add('hidden');
    this.showModal('adminAuthModal');
    setTimeout(() => {
      document.getElementById('adminPasswordInput').focus();
    }, 150);
  },

  closeAdminAuthModal() {
    this.hideModal('adminAuthModal');
  },

  handleAdminAuth(e) {
    e.preventDefault();
    const input = document.getElementById('adminPasswordInput').value.trim();
    const errorEl = document.getElementById('adminAuthError');

    if (input === ADMIN_PASSWORD) {
      this.state.isAdminLoggedIn = true;
      this.closeAdminAuthModal();
      this.toast('선생님 관리자 모드로 인증되었습니다.', 'success');
      this.showAdminDashboard();
    } else {
      errorEl.classList.remove('hidden');
      document.getElementById('adminPasswordInput').classList.add('border-rose-500', 'bg-rose-50');
      this.toast('비밀번호가 일치하지 않습니다.', 'error');
    }
  },

  logoutAdmin() {
    this.state.isAdminLoggedIn = false;
    this.toast('관리자 모드를 종료했습니다.', 'info');
    this.showLanding();
  },

  switchAdminTab(tabName) {
    this.state.adminTab = tabName;
    ['Tests', 'Overview', 'Students', 'Backup', 'Vocab'].forEach(t => {
      const btn = document.getElementById(`adminTabBtn${t}`);
      const content = document.getElementById(`adminTabContent${t}`);
      if (t.toLowerCase() === tabName) {
        if (btn) btn.className = 'pb-3 px-2 border-b-2 border-indigo-600 font-bold text-xs sm:text-sm text-indigo-600 flex items-center gap-2 whitespace-nowrap';
        if (content) content.classList.remove('hidden');
      } else {
        if (btn) btn.className = 'pb-3 px-2 border-b-2 border-transparent font-medium text-xs sm:text-sm text-slate-500 hover:text-slate-800 flex items-center gap-2 whitespace-nowrap';
        if (content) content.classList.add('hidden');
      }
    });

    this.renderAdminDashboard();
  },

  renderAdminDashboard() {
    if (this.state.adminTab === 'tests') {
      this.renderAdminTestsTab();
    } else if (this.state.adminTab === 'overview') {
      this.renderAdminOverviewTab();
    } else if (this.state.adminTab === 'students') {
      this.renderAdminStudentsTab();
    } else if (this.state.adminTab === 'vocab') {
      this.renderAdminVocabTab();
    }
  },


  // 관리자 탭 1: 학생별 시험 목록 & CRUD
  renderAdminTestsTab() {
    const students = AppData.getStudents();
    const pills = document.getElementById('adminStudentPills');
    
    // 학생 선택 필 렌더링
    pills.innerHTML = students.map(s => {
      const isSelected = s.id === this.state.adminSelectedStudentId;
      return `
        <button onclick="App.setAdminSelectedStudent(${s.id})" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${isSelected ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
          <span class="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center text-[10px] text-white inline-flex"><i class="fa-solid fa-user"></i></span>
          <span>${this.escapeHtml(s.name)}</span>
        </button>
      `;
    }).join('');

    const currentStudent = AppData.getStudentById(this.state.adminSelectedStudentId);
    if (!currentStudent) return;

    // 선택된 학생 정보 바
    const infoBar = document.getElementById('adminSelectedStudentInfo');
    infoBar.innerHTML = `
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center text-lg shadow flex-shrink-0 border border-slate-200">
            <i class="fa-solid fa-user text-white/90"></i>
          </div>
          <div>
            <h4 class="font-extrabold text-slate-900 text-base">${this.escapeHtml(currentStudent.name)} 학생 시험 관리</h4>
            <p class="text-xs text-slate-500">목표: ${this.escapeHtml(currentStudent.target)}</p>
          </div>
        </div>
        <button onclick="App.selectStudent(${currentStudent.id})" class="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5">
          <i class="fa-solid fa-eye text-indigo-600"></i>
          <span>학생 캘린더 뷰 미리보기</span>
        </button>
      </div>
    `;

    // 테이블 렌더링
    const tests = AppData.getTestsByStudentId(currentStudent.id);
    document.getElementById('adminTableTitle').innerText = `${currentStudent.name} 학생의 시험 일정 (${tests.length}건)`;
    document.getElementById('adminTestCountBadge').innerText = `총 ${tests.length}개`;

    const tbody = document.getElementById('adminTestsTableBody');
    if (tests.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-slate-400">
            등록된 시험 일정이 없습니다. 우측 상단의 '새 시험 일정 추가' 버튼을 눌러보세요!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = tests.map(test => {
      return `
        <tr class="hover:bg-slate-50/80 transition">
          <!-- 일시 -->
          <td class="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
            <div>${test.date}</div>
            <div class="text-[11px] font-normal text-slate-400">${test.time || '시간 미지정'}</div>
          </td>

          <!-- 시험명 & 범위 -->
          <td class="py-3.5 px-4 max-w-xs">
            <div class="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer" onclick="App.openTestDetailModal('${test.id}')">
              ${this.escapeHtml(test.title)}
            </div>
            <div class="text-xs text-slate-500 truncate mt-0.5">${this.escapeHtml(test.scope || '-')}</div>
          </td>

          <!-- 커트라인 / 점수 -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <div class="text-xs text-slate-600">컷: <strong class="text-slate-800">${this.escapeHtml(test.cutoff)}</strong></div>
            <div class="text-xs">점수: <strong class="${test.score ? 'text-indigo-600 font-bold' : 'text-slate-400'}">${test.score || '-'}</strong></div>
          </td>

          <!-- 1차 본시험 결과 (빠른 상태 변경 토글 버튼) -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs">
              <button onclick="App.quickUpdateTestStatus('${test.id}', 'SCHEDULED')" class="px-2 py-1 rounded-md font-semibold transition ${test.status === 'SCHEDULED' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">대기</button>
              <button onclick="App.quickUpdateTestStatus('${test.id}', 'PASS')" class="px-2 py-1 rounded-md font-semibold transition ${test.status === 'PASS' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">통과</button>
              <button onclick="App.quickUpdateTestStatus('${test.id}', 'FAIL')" class="px-2 py-1 rounded-md font-semibold transition ${test.status === 'FAIL' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">불합격</button>
            </div>
          </td>

          <!-- 재시험 결과 (빠른 상태 변경 토글) -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs">
              <button onclick="App.quickUpdateRetestStatus('${test.id}', 'NONE')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'NONE' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">없음</button>
              <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_PENDING')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_PENDING' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">대기</button>
              <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_PASS')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_PASS' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">통과</button>
              <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_FAIL')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_FAIL' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">탈락</button>
            </div>
            ${test.retestDate ? `<div class="text-[11px] text-slate-400 mt-1 font-medium">재시험일: ${test.retestDate}</div>` : ''}
          </td>

          <!-- 관리 버튼 -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <div class="flex items-center justify-center space-x-1.5">
              <button onclick="App.openEditTestModal('${test.id}')" class="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition" title="수정">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onclick="App.confirmDeleteTest('${test.id}')" class="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition" title="삭제">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  setAdminSelectedStudent(studentId) {
    this.state.adminSelectedStudentId = Number(studentId);
    this.renderAdminTestsTab();
  },

  // 빠른 상태 업데이트
  async quickUpdateTestStatus(testId, newStatus) {
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === testId);
    if (!test) return;

    test.status = newStatus;
    // 불합격 선택 시 재시험 대기로 자동 편의 설정
    if (newStatus === 'FAIL' && test.retestStatus === 'NONE') {
      test.retestStatus = 'RETEST_PENDING';
    } else if (newStatus === 'PASS') {
      test.retestStatus = 'NONE';
    }

    try {
      await AppData.saveOrUpdateTest(test);
      this.renderAdminTestsTab();
      this.toast(`'${test.title}' 상태가 업데이트되었습니다.`, 'success');
    } catch (error) {
      console.error(error);
    }
  },

  async quickUpdateRetestStatus(testId, newRetestStatus) {
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === testId);
    if (!test) return;

    test.retestStatus = newRetestStatus;
    try {
      await AppData.saveOrUpdateTest(test);
      this.renderAdminTestsTab();
      this.toast(`'${test.title}' 재시험 상태가 업데이트되었습니다.`, 'success');
    } catch (error) {
      console.error(error);
    }
  },

  // 관리자 탭 2: 전체 6명 현황판 (Overview Matrix)
  renderAdminOverviewTab() {
    const container = document.getElementById('adminOverviewCards');
    if (!container) return;

    const students = AppData.getStudents();
    const allTests = AppData.getTests();
    const todayStr = this.getTodayDateString();

    container.innerHTML = students.map(student => {
      const tests = allTests.filter(t => t.studentId === student.id);
      const total = tests.length;
      const passed = tests.filter(t => t.status === 'PASS' || t.retestStatus === 'RETEST_PASS').length;
      const pendingRetests = tests.filter(t => t.retestStatus === 'RETEST_PENDING' || (t.status === 'FAIL' && t.retestStatus !== 'RETEST_PASS')).length;
      const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

      const upcoming = tests
        .filter(t => t.date >= todayStr && t.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

      return `
        <div class="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center text-lg shadow flex-shrink-0 border border-slate-200">
                  <i class="fa-solid fa-user text-white/90"></i>
                </div>
                <div>
                  <h4 class="font-extrabold text-slate-900">${this.escapeHtml(student.name)}</h4>
                  <span class="text-xs font-medium text-slate-400">학생 #${student.id}</span>
                </div>
              </div>
              <span class="text-sm font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700">${passRate}%</span>
            </div>

            <!-- Stats Mini Grid -->
            <div class="grid grid-cols-3 gap-2 mt-4 text-center">
              <div class="p-2 rounded-xl bg-slate-50">
                <span class="text-[11px] text-slate-400 block">전체</span>
                <span class="text-xs font-bold text-slate-800">${total}회</span>
              </div>
              <div class="p-2 rounded-xl bg-emerald-50">
                <span class="text-[11px] text-emerald-600 block">통과</span>
                <span class="text-xs font-bold text-emerald-700">${passed}회</span>
              </div>
              <div class="p-2 rounded-xl bg-amber-50">
                <span class="text-[11px] text-amber-600 block">재시험</span>
                <span class="text-xs font-bold text-amber-700">${pendingRetests}건</span>
              </div>
            </div>

            <!-- Next Schedule -->
            <div class="mt-4 pt-3 border-t border-slate-100 text-xs">
              <span class="text-slate-400 block text-[11px]">다음 일정</span>
              ${upcoming ? `
                <div class="font-bold text-slate-800 mt-0.5 truncate">${this.escapeHtml(upcoming.title)}</div>
                <div class="text-slate-500 text-[11px]">${upcoming.date} (${this.calculateDDay(upcoming.date)})</div>
              ` : `
                <div class="text-slate-400 mt-0.5">예정된 시험 없음</div>
              `}
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <button onclick="App.setAdminSelectedStudent(${student.id}); App.switchAdminTab('tests');" class="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
              시험 관리하기
            </button>
            <button onclick="App.selectStudent(${student.id})" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition" title="학생 캘린더 이동">
              <i class="fa-regular fa-calendar"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  // 관리자 탭 3: 학생 프로필 정보 수정
  renderAdminStudentsTab() {
    const container = document.getElementById('adminStudentsEditGrid');
    if (!container) return;

    const students = AppData.getStudents();
    container.innerHTML = students.map(student => {
      return `
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center text-sm shadow-sm flex-shrink-0 border border-slate-200">
              <i class="fa-solid fa-user text-white/90"></i>
            </div>
            <div>
              <span class="text-xs font-bold text-indigo-600">학생 #${student.id}</span>
              <h4 class="font-bold text-slate-900">${this.escapeHtml(student.name)}</h4>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <div>
              <label class="block font-bold text-slate-600 mb-0.5">학생 이름</label>
              <input type="text" id="editStudentName_${student.id}" value="${this.escapeHtml(student.name)}" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
            <div>
              <label class="block font-bold text-slate-600 mb-0.5">학습 목표</label>
              <input type="text" id="editStudentTarget_${student.id}" value="${this.escapeHtml(student.target)}" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <button onclick="App.handleSaveStudentProfile(${student.id})" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-sm">
              프로필 저장
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  async handleSaveStudentProfile(studentId) {
    const name = document.getElementById(`editStudentName_${studentId}`).value.trim();
    const target = document.getElementById(`editStudentTarget_${studentId}`).value.trim();

    if (!name) {
      this.toast('학생 이름을 입력해주세요.', 'error');
      return;
    }

    try {
      await AppData.updateStudent({ id: studentId, name, target });
      this.toast(`학생 #${studentId} 프로필이 저장되었습니다.`, 'success');
    } catch (error) {
      console.error(error);
      this.toast('학생 프로필 저장에 실패했습니다.', 'error');
    }
  },

  // ========================================================
  // 6. 시험 등록 / 수정 모달 (Test Form Modal)
  // ========================================================
  renderStudentCheckboxes(selectedStudentIds = []) {
    const grid = document.getElementById('formStudentCheckboxGrid');
    if (!grid) return;
    const students = AppData.getStudents();
    grid.innerHTML = students.map(s => {
      const isChecked = selectedStudentIds.includes(s.id);
      return `
        <label class="flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none ${isChecked ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
          <input type="checkbox" name="formStudentCheckbox" value="${s.id}" ${isChecked ? 'checked' : ''} onchange="App.onFormStudentCheckboxChange()" class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
          <div class="w-6 h-6 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center text-[10px] flex-shrink-0">
            <i class="fa-solid fa-user"></i>
          </div>
          <span class="text-xs font-bold truncate">${this.escapeHtml(s.name)}</span>
        </label>
      `;
    }).join('');
    this.updateFormStudentSelectCount();
  },

  onFormStudentCheckboxChange() {
    this.updateFormStudentSelectCount();
    const checkboxes = document.querySelectorAll('input[name="formStudentCheckbox"]');
    checkboxes.forEach(cb => {
      const label = cb.closest('label');
      if (cb.checked) {
        label.className = 'flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none bg-indigo-50/90 border-indigo-500 text-indigo-950 shadow-xs';
      } else {
        label.className = 'flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
      }
    });
  },

  updateFormStudentSelectCount() {
    const countEl = document.getElementById('formStudentSelectCount');
    if (!countEl) return;
    const selectedCount = document.querySelectorAll('input[name="formStudentCheckbox"]:checked').length;
    countEl.innerText = `${selectedCount}명 선택됨`;
  },

  toggleAllFormStudents(select) {
    const checkboxes = document.querySelectorAll('input[name="formStudentCheckbox"]');
    checkboxes.forEach(cb => {
      cb.checked = select;
    });
    this.onFormStudentCheckboxChange();
  },

  openAddTestModal() {
    document.getElementById('adminFormModalTitle').innerText = '새 시험 일정 등록';
    document.getElementById('formTestId').value = '';
    
    // 다중 선택 모드 활성화 (체크박스 그리드 노출, 단일 셀렉트 숨김)
    document.getElementById('formStudentSelectAllActions').classList.remove('hidden');
    document.getElementById('formStudentCheckboxGrid').classList.remove('hidden');
    document.getElementById('formStudentSingleSelectContainer').classList.add('hidden');

    // 현재 관리자 선택 학생을 기본 체크 (원하는 경우 1클릭으로 전체 선택 가능)
    this.renderStudentCheckboxes([this.state.adminSelectedStudentId]);

    // 기본 폼 값 초기화
    document.getElementById('formTitle').value = '';
    document.getElementById('formDate').value = this.getTodayDateString();
    document.getElementById('formTime').value = '18:00';
    document.getElementById('formScope').value = '';
    document.getElementById('formCutoff').value = '90점 이상';
    document.getElementById('formVocabCutoff').value = '';
    document.getElementById('formScore').value = '';
    document.getElementById('formRetestDate').value = '';
    document.getElementById('formTeacherNote').value = '';
    this.renderFormVocabSetSelect();

    // 라디오 버튼 초기화
    document.querySelector('input[name="formStatus"][value="SCHEDULED"]').checked = true;
    document.querySelector('input[name="formRetestStatus"][value="NONE"]').checked = true;
    document.querySelector('input[name="formTestType"][value="REGULAR"]').checked = true;
    this.toggleTestFormType();

    this.showModal('adminTestFormModal');
  },

  openEditTestModal(testId) {
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === testId);
    if (!test) return;

    document.getElementById('adminFormModalTitle').innerText = '시험 일정 및 성적 수정';
    document.getElementById('formTestId').value = test.id;
    
    // 수정 모드: 단일 선택 셀렉트 노출, 체크박스 그리드 숨김
    document.getElementById('formStudentSelectAllActions').classList.add('hidden');
    document.getElementById('formStudentCheckboxGrid').classList.add('hidden');
    document.getElementById('formStudentSingleSelectContainer').classList.remove('hidden');
    document.getElementById('formStudentSelectCount').innerText = '개별 시험 수정';

    this.populateStudentSelect(test.studentId);

    document.getElementById('formTitle').value = test.title || '';
    document.getElementById('formDate').value = test.date || '';
    document.getElementById('formTime').value = test.time || '';
    document.getElementById('formScope').value = test.scope || '';
    document.getElementById('formCutoff').value = test.cutoff || '';
    document.getElementById('formVocabCutoff').value = test.vocabCutoff ?? this.getVocabCutoffScore(test);
    document.getElementById('formScore').value = test.score || '';
    document.getElementById('formRetestDate').value = test.retestDate || '';
    document.getElementById('formTeacherNote').value = test.teacherNote || '';
    this.renderFormVocabSetSelect(test.vocabSetId || '');

    // 라디오 버튼 설정
    const statusRadio = document.querySelector(`input[name="formStatus"][value="${test.status || 'SCHEDULED'}"]`);
    if (statusRadio) statusRadio.checked = true;

    const retestRadio = document.querySelector(`input[name="formRetestStatus"][value="${test.retestStatus || 'NONE'}"]`);
    if (retestRadio) retestRadio.checked = true;
    const typeRadio = document.querySelector(`input[name="formTestType"][value="${test.type === 'VOCAB' ? 'VOCAB' : 'REGULAR'}"]`);
    if (typeRadio) typeRadio.checked = true;
    this.toggleTestFormType();

    this.showModal('adminTestFormModal');
  },

  populateStudentSelect(selectedStudentId) {
    const select = document.getElementById('formStudentId');
    const students = AppData.getStudents();
    select.innerHTML = students.map(s => {
      return `<option value="${s.id}" ${s.id === Number(selectedStudentId) ? 'selected' : ''}>${s.name} (학생 #${s.id})</option>`;
    }).join('');
  },

  renderFormVocabSetSelect(selectedSetId = '') {
    const select = document.getElementById('formVocabSetId');
    if (!select) return;
    const sets = AppData.getVocabSets();
    select.innerHTML = `<option value="">단어 테스트 미연결</option>${sets.map(set => `<option value="${set.id}" ${set.id === selectedSetId ? 'selected' : ''}>${this.escapeHtml(set.title)} (${set.words.length}개)</option>`).join('')}`;
  },

  openVocabSetFromTestForm() {
    this.state.vocabSetReturnToTestForm = true;
    this.openVocabSetModal(null, true);
  },

  toggleTestFormType() {
    const isVocab = document.querySelector('input[name="formTestType"]:checked')?.value === 'VOCAB';
    document.querySelectorAll('.form-regular-only').forEach(element => element.classList.toggle('hidden', isVocab));
    document.getElementById('formVocabSetSection').classList.toggle('hidden', !isVocab);
    document.getElementById('formVocabCutoffSection').classList.toggle('hidden', !isVocab);
    document.getElementById('formTimeSection').classList.toggle('hidden', isVocab);
    const title = document.getElementById('formTitle');
    const regularCutoff = document.getElementById('formCutoff');
    const vocabCutoff = document.getElementById('formVocabCutoff');
    title.required = !isVocab;
    regularCutoff.required = !isVocab;
    vocabCutoff.required = isVocab;
  },

  closeAdminTestFormModal() {
    this.hideModal('adminTestFormModal');
  },

  async handleSaveTestForm(e) {
    e.preventDefault();

    const id = document.getElementById('formTestId').value.trim();
    const testType = document.querySelector('input[name="formTestType"]:checked')?.value || 'REGULAR';
    const isVocabTest = testType === 'VOCAB';
    const title = isVocabTest ? '단어 테스트' : document.getElementById('formTitle').value.trim();
    const date = document.getElementById('formDate').value;
    const time = isVocabTest ? '' : document.getElementById('formTime').value.trim();
    const scope = isVocabTest ? '단어 세트 기반 5지선다 테스트' : document.getElementById('formScope').value.trim();
    const regularCutoff = document.getElementById('formCutoff').value.trim();
    const vocabCutoff = Number(document.getElementById('formVocabCutoff').value);
    const cutoff = isVocabTest ? `${vocabCutoff}점` : regularCutoff;
    const score = isVocabTest ? '' : document.getElementById('formScore').value.trim();
    const retestDate = isVocabTest ? '' : document.getElementById('formRetestDate').value;
    const teacherNote = isVocabTest ? '' : document.getElementById('formTeacherNote').value.trim();
    const vocabSetId = document.getElementById('formVocabSetId').value;

    const status = isVocabTest ? 'SCHEDULED' : (document.querySelector('input[name="formStatus"]:checked')?.value || 'SCHEDULED');
    const retestStatus = isVocabTest ? 'NONE' : (document.querySelector('input[name="formRetestStatus"]:checked')?.value || 'NONE');

    if (!title || !date || !cutoff || (isVocabTest && !vocabSetId)) {
      this.toast(isVocabTest ? '단어 세트, 날짜, 커트라인은 필수 입력 항목입니다.' : '시험 제목, 날짜, 커트라인은 필수 입력 항목입니다.', 'error');
      return;
    }

    if (isVocabTest && (!Number.isInteger(vocabCutoff) || vocabCutoff < 1 || vocabCutoff > 100)) {
      this.toast('단어 시험 커트라인은 1~100점 사이의 정수로 입력해주세요.', 'error');
      return;
    }

    if (id) {
      // 1. 기존 시험 단일 수정 모드
      const studentId = Number(document.getElementById('formStudentId').value);
      const testData = {
        id,
        studentId,
        title,
        date,
        time,
        scope,
        cutoff,
        score,
        status,
        retestStatus,
        retestDate,
        teacherNote,
        vocabSetId,
        vocabCutoff: isVocabTest ? vocabCutoff : null,
        type: testType
      };
      try {
        await AppData.saveOrUpdateTest(testData);
      } catch (error) {
        console.error(error);
        return;
      }
      this.closeAdminTestFormModal();
      this.toast(`'${title}' 일정이 성공적으로 수정되었습니다!`, 'success');
      this.state.adminSelectedStudentId = studentId;
    } else {
      // 2. 새 시험 등록 모드 (다중 학생 지원)
      const checkedBoxes = document.querySelectorAll('input[name="formStudentCheckbox"]:checked');
      const selectedStudentIds = Array.from(checkedBoxes).map(cb => Number(cb.value));

      if (selectedStudentIds.length === 0) {
        this.toast('시험을 배정할 학생을 최소 1명 이상 선택해주세요.', 'error');
        return;
      }

      const newTests = selectedStudentIds.map(sId => {
        const newTest = {
          studentId: sId,
          title,
          date,
          time,
          scope,
          cutoff,
          score,
          status,
          retestStatus,
          retestDate,
          teacherNote,
          vocabSetId,
          vocabCutoff: isVocabTest ? vocabCutoff : null,
          type: testType
        };
        return AppData.saveOrUpdateTest(newTest);
      });

      try {
        await Promise.all(newTests);
      } catch (error) {
        console.error(error);
        return;
      }

      this.closeAdminTestFormModal();

      if (selectedStudentIds.length === 1) {
        this.toast(`'${title}' 일정이 성공적으로 등록되었습니다!`, 'success');
        this.state.adminSelectedStudentId = selectedStudentIds[0];
      } else {
        this.toast(`선택한 ${selectedStudentIds.length}명의 학생에게 '${title}' 일정이 일괄 등록되었습니다! ✨`, 'success');
      }
    }

    // 탭 및 테이블 새로고침
    this.renderAdminTestsTab();
  },

  async confirmDeleteTest(testId) {
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === testId);
    if (!test) return;

    if (confirm(`'${test.title}' 시험 일정을 정말 삭제하시겠습니까?`)) {
      try {
        await AppData.deleteTest(testId);
        this.toast('시험 일정이 삭제되었습니다.', 'info');
        this.renderAdminTestsTab();
      } catch (error) {
        console.error(error);
      }
    }
  },

  // ========================================================
  // 7. 백업 & 데이터 관리 (Export / Import / Reset)
  // ========================================================
  exportDataFile() {
    const data = AppData.exportData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english_tutoring_backup_${this.getTodayDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.toast('데이터 백업 JSON 파일이 다운로드되었습니다.', 'success');
  },

  handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const ok = await AppData.importData(json);
        if (ok) {
          this.toast('데이터가 성공적으로 복원되었습니다!', 'success');
          this.renderAdminDashboard();
        } else {
          this.toast('올바르지 않은 백업 파일 형식입니다.', 'error');
        }
      } catch (err) {
        console.error(err);
        this.toast('데이터 복원 중 오류가 발생했습니다.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  },

  async confirmResetData() {
    if (confirm('모든 시험 일정 및 학생 프로필을 기본 샘플 데이터로 초기화하시겠습니까? (이 작업은 되돌릴 수 없습니다)')) {
      try {
        await AppData.resetToDefaults();
        this.toast('기본 샘플 데이터로 초기화되었습니다.', 'success');
        this.renderAdminDashboard();
      } catch (error) {
        console.error(error);
        this.toast('기본 데이터 초기화에 실패했습니다.', 'error');
      }
    }
  },

  // ========================================================
  // 8. 모달 & 유틸리티 (Modals & Utilities)
  // ========================================================
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    // 부드러운 애니메이션
    setTimeout(() => {
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
      modal.querySelector('.modal-content')?.classList.add('scale-100', 'opacity-100');
    }, 10);
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.classList.remove('scale-100', 'opacity-100');
      content.classList.add('scale-95', 'opacity-0');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  },

  closeAllModals() {
    ['adminAuthModal', 'testDetailModal', 'adminTestFormModal', 'vocabSetModal'].forEach(id => {
      this.hideModal(id);
    });
  },

  toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastEl = document.createElement('div');
    let bg = 'bg-slate-900 text-white';
    let icon = '<i class="fa-solid fa-circle-info text-blue-400"></i>';

    if (type === 'success') {
      bg = 'bg-emerald-800 text-white border border-emerald-600';
      icon = '<i class="fa-solid fa-circle-check text-emerald-300"></i>';
    } else if (type === 'error') {
      bg = 'bg-rose-800 text-white border border-rose-600';
      icon = '<i class="fa-solid fa-triangle-exclamation text-rose-300"></i>';
    }

    toastEl.className = `toast-item py-3 px-4 rounded-xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${bg}`;
    toastEl.innerHTML = `${icon}<span>${this.escapeHtml(message)}</span>`;

    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(-8px)';
      setTimeout(() => toastEl.remove(), 250);
    }, 3000);
  },

  calculateDDay(dateStr) {
    if (!dateStr) return '-';
    const target = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'D-Day';
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  },

  getTodayDateString() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  },

  formatDate(dateObj) {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  },

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // ========================================================
  // 9. 단어 세트 관리 (Admin) & 단어 테스트 (Student)
  // ========================================================

  // ── 관리자: 단어 세트 탭 렌더링 ──────────────────────────
  renderAdminVocabTab() {
    const container = document.getElementById('adminVocabSetsList');
    if (!container) return;
    const sets = AppData.getVocabSets();
    const students = AppData.getStudents();

    if (sets.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center text-slate-400">
          <i class="fa-solid fa-spell-check text-4xl mb-3 opacity-30"></i>
          <p class="text-sm font-semibold">등록된 단어 세트가 없습니다.</p>
          <p class="text-xs mt-1">위의 '새 단어 세트 추가' 버튼을 눌러 만들어보세요.</p>
        </div>`;
      return;
    }

    container.innerHTML = sets.map(set => {
      const assignedNames = (set.studentIds || [])
        .map(id => { const s = students.find(st => st.id === id); return s ? s.name : ''; })
        .filter(Boolean).join(', ');
      const resultsHtml = (set.studentIds || []).map(studentId => {
        const student = students.find(s => s.id === studentId);
        const studentResults = AppData.getVocabTestResults().filter(result => result.setId === set.id && result.studentId === studentId);
        if (!student) return '';
        if (studentResults.length === 0) {
          return `<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500"><strong class="text-slate-700">${this.escapeHtml(student.name)}</strong> · 미응시</div>`;
        }
        return studentResults.map(result => {
          const directionLabel = result.direction === 1 ? '한글 → 영어' : '영어 → 한글';
          const wrongAnswers = result.wrongAnswers || [];
          return `
            <div class="p-3 rounded-xl border ${result.passed ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} space-y-2">
              <div class="flex items-center justify-between gap-3 text-xs">
                <span class="font-bold text-slate-800">${this.escapeHtml(student.name)} · ${directionLabel}</span>
                <span class="font-black ${result.passed ? 'text-emerald-700' : 'text-amber-700'}">${result.score}점 (${result.correctCount ?? '-'} / ${result.total}) · ${result.passed ? '완료' : '재응시 가능'}</span>
              </div>
              <p class="text-[11px] text-slate-500">응시 ${result.attempts ? result.attempts.length : 1}회 · ${new Date(result.completedAt).toLocaleString('ko-KR')}</p>
              ${wrongAnswers.length ? `
                <details class="text-xs">
                  <summary class="cursor-pointer font-semibold text-rose-600">오답 ${wrongAnswers.length}개 보기</summary>
                  <div class="mt-2 space-y-1.5 text-slate-700">
                    ${wrongAnswers.map((wrong, index) => `<div class="rounded-lg bg-white/80 p-2 border border-rose-100"><strong>${index + 1}. ${this.escapeHtml(wrong.question)}</strong><br><span class="text-rose-600">학생 답: ${this.escapeHtml(wrong.answer)}</span><br><span class="text-emerald-700">정답: ${this.escapeHtml(wrong.correct)}</span></div>`).join('')}
                  </div>
                </details>` : '<p class="text-xs font-semibold text-emerald-700">오답 없음</p>'}
            </div>`;
        }).join('');
      }).join('');
      return `
        <div class="glass-card rounded-2xl p-5 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                <i class="fa-solid fa-book mr-1"></i>${this.escapeHtml(set.title)}
              </span>
              <span class="text-xs text-slate-500">${(set.words || []).length}개 단어</span>
            </div>
            <p class="text-xs text-slate-600">
              <i class="fa-solid fa-users text-slate-400 mr-1"></i>
              배정: <strong>${assignedNames || '없음'}</strong>
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="App.openVocabSetModal('${set.id}')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1">
              <i class="fa-solid fa-pen"></i> 수정
            </button>
            <button onclick="App.confirmDeleteVocabSet('${set.id}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition flex items-center gap-1 border border-rose-200">
              <i class="fa-solid fa-trash"></i> 삭제
            </button>
          </div>
          </div>
          <div class="border-t border-slate-100 pt-4 space-y-2">
            <p class="text-xs font-bold text-slate-700"><i class="fa-solid fa-chart-simple text-indigo-500 mr-1"></i>학생별 테스트 결과</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">${resultsHtml || '<p class="text-xs text-slate-400">배정된 학생이 없습니다.</p>'}</div>
          </div>
        </div>`;
    }).join('');
  },

  // ── 관리자: 단어 세트 모달 열기 ──────────────────────────
  openVocabSetModal(setId = null, returnToTestForm = false) {
    this.state.vocabSetReturnToTestForm = returnToTestForm;
    const students = AppData.getStudents();
    document.getElementById('vocabModalTitle').innerText = setId ? '단어 세트 수정' : '새 단어 세트 등록';
    document.getElementById('vocabSetId').value = setId || '';
    document.getElementById('vocabWordRows').innerHTML = '';

    let existingSet = null;
    if (setId) {
      existingSet = AppData.getVocabSets().find(s => s.id === setId);
    }

    // 제목
    document.getElementById('vocabSetTitle').value = existingSet ? existingSet.title : '';

    // 학생 체크박스
    const preselectedStudents = returnToTestForm && !existingSet
      ? (document.getElementById('formTestId').value ? [Number(document.getElementById('formStudentId').value)] : Array.from(document.querySelectorAll('input[name="formStudentCheckbox"]:checked')).map(cb => Number(cb.value)))
      : [];
    const grid = document.getElementById('vocabStudentCheckboxGrid');
    grid.innerHTML = students.map(s => {
      const checked = existingSet ? (existingSet.studentIds || []).includes(s.id) : preselectedStudents.includes(s.id);
      return `
        <label class="flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none ${checked ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
          <input type="checkbox" name="vocabStudentCb" value="${s.id}" ${checked ? 'checked' : ''} onchange="App.onVocabStudentCbChange(this)" class="w-4 h-4 rounded text-indigo-600 border-slate-300" />
          <div class="w-6 h-6 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center text-[10px] flex-shrink-0">
            <i class="fa-solid fa-user"></i>
          </div>
          <span class="text-xs font-bold truncate">${this.escapeHtml(s.name)}</span>
        </label>`;
    }).join('');

    // 기존 단어 행 채우기
    if (existingSet && existingSet.words) {
      existingSet.words.forEach(w => this.addVocabWordRow(w.en, w.ko));
    } else {
      // 기본 5개 빈 행
      for (let i = 0; i < 5; i++) this.addVocabWordRow();
    }
    this.updateVocabWordCount();
    this.showModal('vocabSetModal');
  },

  closeVocabSetModal() {
    this.hideModal('vocabSetModal');
  },

  onVocabStudentCbChange(cb) {
    const label = cb.closest('label');
    if (cb.checked) {
      label.className = 'flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none bg-indigo-50/90 border-indigo-500 text-indigo-950';
    } else {
      label.className = 'flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
    }
  },

  toggleAllVocabStudents(select) {
    document.querySelectorAll('input[name="vocabStudentCb"]').forEach(cb => {
      cb.checked = select;
      this.onVocabStudentCbChange(cb);
    });
  },

  addVocabWordRow(enVal = '', koVal = '') {
    const container = document.getElementById('vocabWordRows');
    const idx = Date.now() + Math.random();
    const div = document.createElement('div');
    div.className = 'grid grid-cols-[1fr_1fr_auto] gap-2 items-center vocab-word-row';
    div.innerHTML = `
      <input type="text" placeholder="영어 단어" value="${this.escapeHtml(enVal)}" class="vocab-en py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-xs" oninput="App.updateVocabWordCount()" />
      <input type="text" placeholder="한국어 뜻" value="${this.escapeHtml(koVal)}" class="vocab-ko py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-xs" />
      <button type="button" onclick="this.closest('.vocab-word-row').remove(); App.updateVocabWordCount();" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition text-sm">
        <i class="fa-solid fa-xmark"></i>
      </button>`;
    container.appendChild(div);
    this.updateVocabWordCount();
  },

  updateVocabWordCount() {
    const rows = document.querySelectorAll('.vocab-word-row');
    const filled = Array.from(rows).filter(r => r.querySelector('.vocab-en').value.trim()).length;
    const el = document.getElementById('vocabWordCount');
    if (el) el.innerText = `(${filled}개)`;
  },

  async handleSaveVocabSet() {
    const setId = document.getElementById('vocabSetId').value.trim();
    const title = document.getElementById('vocabSetTitle').value.trim();
    if (!title) { this.toast('세트 제목을 입력해주세요.', 'error'); return; }

    const checkedStudents = Array.from(document.querySelectorAll('input[name="vocabStudentCb"]:checked')).map(cb => Number(cb.value));
    if (checkedStudents.length === 0) { this.toast('대상 학생을 최소 1명 선택해주세요.', 'error'); return; }

    const rows = document.querySelectorAll('.vocab-word-row');
    const words = Array.from(rows)
      .map(r => ({ en: r.querySelector('.vocab-en').value.trim(), ko: r.querySelector('.vocab-ko').value.trim() }))
      .filter(w => w.en && w.ko);

    if (words.length < 5) { this.toast('5지선다 시험을 위해 단어를 최소 5개 입력해주세요.', 'error'); return; }

    let savedSet;
    try {
      savedSet = await AppData.saveOrUpdateVocabSet({ id: setId || undefined, title, studentIds: checkedStudents, words, createdAt: new Date().toISOString().split('T')[0] });
    } catch (error) {
      console.error(error);
      return;
    }
    this.closeVocabSetModal();
    this.toast(`'${title}' 세트가 저장되었습니다! (${words.length}개 단어)`, 'success');
    if (this.state.vocabSetReturnToTestForm) {
      this.renderFormVocabSetSelect(savedSet.id);
      this.state.vocabSetReturnToTestForm = false;
    } else {
      this.renderAdminVocabTab();
    }
  },

  async confirmDeleteVocabSet(setId) {
    const set = AppData.getVocabSets().find(s => s.id === setId);
    if (!set) return;
    if (confirm(`'${set.title}' 단어 세트를 삭제하시겠습니까?`)) {
      try {
        await AppData.deleteVocabSet(setId);
        this.toast('단어 세트가 삭제되었습니다.', 'info');
        this.renderAdminVocabTab();
      } catch (error) {
        console.error(error);
      }
    }
  },

  // ── 학생 대시보드: 단어 테스트 섹션 렌더링 ──────────────
  renderStudentVocabSection(studentId) {
    const sets = AppData.getVocabSetsByStudentId(studentId);
    if (sets.length === 0) return '';
    return `
      <div class="glass-card rounded-2xl p-5 space-y-4">
        <h3 class="font-bold text-slate-900 flex items-center gap-2">
          <i class="fa-solid fa-spell-check text-indigo-600"></i>
          단어 테스트
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${sets.map(set => `
            <div class="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex flex-col gap-3">
              <div>
                <p class="font-bold text-slate-900 text-sm">${this.escapeHtml(set.title)}</p>
                <p class="text-xs text-slate-500 mt-0.5">${set.words.length}개 단어 · 방향별 5지선다</p>
              </div>
              <div class="grid grid-cols-1 gap-2">
                ${this.renderVocabTestButton(set, studentId, 1, '한글 → 영어', 'bg-blue-600 hover:bg-blue-700 shadow-blue-200')}
                ${this.renderVocabTestButton(set, studentId, 2, '영어 → 한글', 'bg-violet-600 hover:bg-violet-700 shadow-violet-200')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  renderVocabTestButton(set, studentId, direction, label, colorClass, testId = null) {
    const result = AppData.getVocabTestResult(studentId, set.id, direction, testId);
    if (result && result.passed) {
      return `
        <div class="w-full py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2">
          <i class="fa-solid fa-circle-check"></i> ${label} · 완료
        </div>`;
    }
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);
    if (scheduledTest && this.isVocabTestExpired(scheduledTest)) {
      return `
        <button onclick="App.notifyExpiredVocabTest()" class="w-full py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-clock"></i> ${label} · 응시 시간 종료
        </button>`;
    }
    if (result && result.retryAvailableAt && new Date(result.retryAvailableAt) > new Date()) {
      const minutes = Math.ceil((new Date(result.retryAvailableAt) - new Date()) / 60000);
      return `<div class="w-full py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold text-center"><i class="fa-solid fa-clock mr-1"></i>${label} · ${minutes}분 후 재응시</div>`;
    }
    const buttonLabel = result ? `${label} 다시 도전하기` : `${label} 테스트 시작`;
    return `
      <button onclick="App.startVocabTest('${set.id}', ${studentId}, ${direction}, ${testId ? `'${testId}'` : 'null'})" class="w-full py-2 rounded-xl ${colorClass} text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
        <i class="fa-solid ${result ? 'fa-rotate-right' : 'fa-play'}"></i> ${buttonLabel}
      </button>`;
  },

  isVocabTestExpired(test) {
    return Boolean(test?.date) && test.date < this.getTodayDateString();
  },

  notifyExpiredVocabTest() {
    this.toast('시험일이 지나 응시 시간이 종료되었습니다. 단어장은 계속 확인할 수 있습니다.', 'info');
  },

  // ── 학생: 단어 테스트 시작 ──────────────────────────────
  startVocabTest(setId, studentId, direction, testId = null) {
    const set = AppData.getVocabSets().find(s => s.id === setId);
    if (!set || set.words.length < 5) { this.toast('단어가 부족합니다. (최소 5개)', 'error'); return; }
    if (![1, 2].includes(direction)) { this.toast('올바른 테스트 방향이 아닙니다.', 'error'); return; }
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);
    if (scheduledTest && this.isVocabTestExpired(scheduledTest)) {
      this.notifyExpiredVocabTest();
      return;
    }
    const existingResult = AppData.getVocabTestResult(studentId, setId, direction, testId);
    if (existingResult?.passed) {
      this.toast('완료된 테스트는 다시 볼 수 없습니다.', 'info');
      this.selectStudent(studentId);
      return;
    }
    if (existingResult?.retryAvailableAt && new Date(existingResult.retryAvailableAt) > new Date()) {
      this.toast('불합격 후 10분이 지나면 다시 응시할 수 있습니다.', 'info');
      return;
    }

    const testWords = this.selectVocabTestWords(set.words);
    this.state.vocabTest = {
      setId,
      studentId: Number(studentId),
      setTitle: set.title,
      testId,
      allWords: testWords,
      sourceWordCount: set.words.length,
      direction,
      questions: this.buildVocabQuestions(testWords, direction, set.words),
      currentIndex: 0,
      score: 0,
      timerId: null,
      timeRemaining: 5
    };

    this.closeTestDetailModal();
    this.showVocabTestView();
    this.renderVocabQuestion();
  },

  shuffleItems(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  },

  selectVocabTestWords(words) {
    return this.shuffleItems(words).slice(0, Math.min(words.length, 40));
  },

  buildVocabQuestions(words, direction, choicePool = words) {
    const shuffled = this.shuffleItems(words);
    return shuffled.map(word => {
      // 이 단어를 제외한 나머지에서 오답 4개 추출
      const others = this.shuffleItems(choicePool.filter(w => w !== word)).slice(0, 4);
      const correctChoice = direction === 1 ? word.en : word.ko;
      const wrongChoices = others.map(w => direction === 1 ? w.en : w.ko);
      const allChoices = this.shuffleItems([correctChoice, ...wrongChoices]);
      return {
        question: direction === 1 ? word.ko : word.en,
        correct: correctChoice,
        choices: allChoices,
        answered: null
      };
    });
  },

  renderVocabQuestion() {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    const total = vt.questions.length;

    // Top info
    document.getElementById('vocabTestTopInfo').innerHTML = `
      <div class="flex items-center gap-3 flex-wrap">
        <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(vt.setTitle)}</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${vt.direction === 1 ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}">
          ${vt.direction === 1 ? '한글 → 영어' : '영어 → 한글'}
        </span>
        <span class="text-xs text-slate-500">${vt.currentIndex + 1} / ${total} 문제</span>
        <span id="vocabTestTimer" class="ml-auto px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-base sm:text-lg font-black"><i class="fa-regular fa-clock mr-1"></i>5초</span>
      </div>`;

    // Content
    const progressPct = ((vt.currentIndex) / total) * 100;
    document.getElementById('vocabTestContent').innerHTML = `
      <div class="space-y-6">
        <!-- Progress Bar -->
        <div class="w-full bg-slate-200 rounded-full h-2">
          <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width:${progressPct}%"></div>
        </div>

        <!-- Question Card -->
        <div class="glass-card rounded-2xl p-8 text-center">
          <p class="text-xs font-semibold text-slate-400 mb-3">
            ${vt.direction === 1 ? '다음 한국어 뜻에 해당하는 영어 단어를 고르세요' : '다음 영어 단어의 한국어 뜻을 고르세요'}
          </p>
          <div class="text-3xl sm:text-4xl font-black text-slate-900 mb-8 py-4 px-6 bg-indigo-50 rounded-2xl border border-indigo-100 inline-block min-w-[200px]">
            ${this.escapeHtml(q.question)}
          </div>

          <!-- 5 Choices -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left mt-2">
            ${q.choices.map((choice, i) => `
              <button
                id="vocabChoice_${i}"
                onclick="App.selectVocabAnswer(${i})"
                class="vocab-choice-btn w-full p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-sm font-semibold text-slate-800 transition text-left flex items-center gap-3"
              >
                <span class="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0">${['①','②','③','④','⑤'][i]}</span>
                <span>${this.escapeHtml(choice)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>`;
    this.startVocabQuestionTimer();
  },

  startVocabQuestionTimer() {
    const vt = this.state.vocabTest;
    this.clearVocabQuestionTimer();
    vt.timeRemaining = 5;
    const timer = document.getElementById('vocabTestTimer');
    if (timer) timer.innerHTML = '<i class="fa-regular fa-clock mr-1"></i>5초';
    vt.timerId = setInterval(() => {
      vt.timeRemaining--;
      const timerEl = document.getElementById('vocabTestTimer');
      if (timerEl) timerEl.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>${vt.timeRemaining}초`;
      if (vt.timeRemaining <= 0) this.submitVocabAnswer(null, true);
    }, 1000);
  },

  clearVocabQuestionTimer() {
    if (this.state.vocabTest.timerId) {
      clearInterval(this.state.vocabTest.timerId);
      this.state.vocabTest.timerId = null;
    }
  },

  selectVocabAnswer(choiceIndex) {
    this.submitVocabAnswer(choiceIndex, false);
  },

  submitVocabAnswer(choiceIndex, timedOut) {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    if (q.answered !== null) return; // 이미 답변함
    this.clearVocabQuestionTimer();

    const chosen = timedOut ? '시간 초과' : q.choices[choiceIndex];
    q.answered = chosen;
    const isCorrect = !timedOut && chosen === q.correct;

    // 선택지 스타일 업데이트
    q.choices.forEach((choice, i) => {
      const btn = document.getElementById(`vocabChoice_${i}`);
      if (!btn) return;
      btn.disabled = true;
      if (choice === q.correct) {
        btn.className = 'vocab-choice-btn w-full p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-sm font-semibold text-emerald-900 transition text-left flex items-center gap-3';
      } else if (!timedOut && i === choiceIndex) {
        btn.className = 'vocab-choice-btn w-full p-4 rounded-xl border-2 border-rose-500 bg-rose-50 text-sm font-semibold text-rose-900 transition text-left flex items-center gap-3';
      }
    });

    if (isCorrect) vt.score++;

    // 잠시 후 다음 문제 or 결과
    setTimeout(() => {
      vt.currentIndex++;
      if (vt.currentIndex < vt.questions.length) {
        this.renderVocabQuestion();
      } else {
        this.renderVocabResult();
      }
    }, 900);
  },

  async renderVocabResult() {
    const vt = this.state.vocabTest;
    this.clearVocabQuestionTimer();
    const total = vt.allWords.length;
    const score = Math.round((vt.score / total) * 100);
    const directionLabel = vt.direction === 1 ? '한글 → 영어' : '영어 → 한글';
    const test = vt.testId && AppData.getTests().find(item => item.id === vt.testId);
    const cutoffScore = this.getVocabCutoffScore(test);
    const passed = score >= cutoffScore;
    const wrongAnswers = vt.questions.filter(q => q.answered !== q.correct).map(q => ({
      question: q.question,
      answer: q.answered || '시간 초과',
      correct: q.correct
    }));
    try {
      await AppData.saveVocabTestResult({
        studentId: vt.studentId,
        setId: vt.setId,
        testId: vt.testId,
        direction: vt.direction,
        score,
        correctCount: vt.score,
        total,
        passed,
        wrongAnswers,
        retryAvailableAt: passed ? null : new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        completedAt: new Date().toISOString()
      });
      if (test) await this.updateVocabScheduleStatus(test.id);
    } catch (error) {
      console.error(error);
      return;
    }

    document.getElementById('vocabTestTopInfo').innerHTML = `
      <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(vt.setTitle)} — 테스트 완료</span>`;

    document.getElementById('vocabTestContent').innerHTML = `
      <div class="glass-card rounded-2xl p-8 space-y-8 text-center">
        <div class="mx-auto w-24 h-24 rounded-full flex items-center justify-center text-5xl ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}">
          <i class="fa-solid ${passed ? 'fa-circle-check' : 'fa-rotate-left'}"></i>
        </div>

        <div>
          <h3 class="text-2xl font-black ${passed ? 'text-emerald-700' : 'text-amber-700'}">${passed ? '완료!' : '다시 한번 도전해보세요!'}</h3>
          <p class="text-slate-500 text-sm mt-2">${directionLabel}</p>
        </div>

        <div class="p-4 rounded-xl ${passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-amber-50 border border-amber-200 text-amber-800'} text-sm font-semibold">
          ${passed ? `${cutoffScore}점 이상으로 완료되었습니다. 완료된 테스트는 다시 응시할 수 없습니다.` : `${cutoffScore}점 이상이 되면 완료됩니다. 10분 후 다시 도전해보세요!`}
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          ${passed ? '' : `<button disabled class="px-6 py-3 rounded-xl bg-slate-200 text-slate-500 font-bold flex items-center justify-center gap-2"><i class="fa-solid fa-clock"></i> 10분 후 재응시 가능</button>`}
          <button onclick="App.exitVocabTest()" class="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-arrow-left"></i> 대시보드로
          </button>
        </div>
      </div>`;
  },

  exitVocabTest() {
    this.clearVocabQuestionTimer();
    const studentId = this.state.vocabTest.studentId || this.state.selectedStudentId;
    this.selectStudent(studentId);
  },

  getVocabCutoffScore(test) {
    const configuredCutoff = Number(test?.vocabCutoff);
    if (Number.isInteger(configuredCutoff) && configuredCutoff >= 1 && configuredCutoff <= 100) {
      return configuredCutoff;
    }

    const match = String(test?.cutoff || '').match(/(\d+)/);
    const legacyCutoff = match ? Number(match[1]) : null;
    return Number.isInteger(legacyCutoff) && legacyCutoff >= 1 && legacyCutoff <= 100 ? legacyCutoff : 80;
  },

  async updateVocabScheduleStatus(testId) {
    const test = AppData.getTests().find(item => item.id === testId);
    if (!test || test.type !== 'VOCAB') return;
    const results = AppData.getVocabTestResults().filter(result => result.testId === testId);
    const passedDirections = [1, 2].every(direction => results.some(result => result.direction === direction && result.passed));
    const hasFailedDirection = results.some(result => !result.passed);
    test.status = passedDirections ? 'PASS' : (hasFailedDirection ? 'FAIL' : 'SCHEDULED');
    test.score = results
      .sort((a, b) => a.direction - b.direction)
      .map(result => `${result.direction === 1 ? '한→영' : '영→한'} ${result.score}점`)
      .join(' · ');
    test.retestStatus = 'NONE';
    await AppData.saveOrUpdateTest(test);
  },


};

document.addEventListener('DOMContentLoaded', async () => {

  console.log('🚀 사이트 초기화 시작');

  try {

    // 1. Firestore에서 학생 데이터 불러오기
    await AppData.initializeStudents();

    console.log('👨‍🎓 학생 데이터 준비 완료');
    console.log('학생 목록:', AppData.getStudents());

    // 2. 시험 / 단어 데이터도 Firestore에서 준비
    await AppData.initializeCloudData();

    // 3. Firestore 실시간 감시 시작
    AppData.startStudentListener();
    AppData.startCloudListeners();

    // 4. 기존 앱 시작
    App.init();

    console.log('✅ 사이트 초기화 완료');

  } catch (error) {

    console.error('❌ 사이트 초기화 실패:', error);

    // Firebase 오류가 발생하더라도
    // 기존 사이트 화면은 실행
    App.init();
  }

});
