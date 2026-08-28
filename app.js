/**
 * 영어과외 학습 관리 & 캘린더 시스템 - 메인 애플리케이션 로직 (app.js)
 */
console.log("Firebase DB:", window.firebaseDB);

const App = {
  // 상태 관리 (State)
  state: {
    view: 'landing', // 'landing' | 'student' | 'admin' | 'vocabTest' | 'practiceTest'
    selectedStudentId: 1,
    adminSelectedStudentId: 1,
    isAdminLoggedIn: false,
    isStudentLoggedIn: false,
    calendarDate: new Date(),
    studentViewTab: 'calendar', // 'calendar' | 'list'
    studentListFilter: 'ALL', // 'ALL' | 'SCHEDULED' | 'PASS' | 'RETEST'
    adminTab: 'tests', // 'tests' | 'overview' | 'students' | 'backup' | 'vocab'
    vocabTest: null,
    vocabSetReturnToTestForm: false,
    vocabResultSelectedDate: null,
    practiceTest: null,
    editingPracticeQuestions: []
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
        // 시험 등록/수정 모달은 작성 중 날아가는 것을 방지하기 위해 ESC로 닫지 않음
        const testFormModal = document.getElementById('adminTestFormModal');
        if (testFormModal && !testFormModal.classList.contains('hidden')) {
          return;
        }
        this.closeAllModals();
      }
    });

    // 시험 진행 중 페이지 이탈(새로고침, 탭 닫기) 시 경고 및 포기 처리 (시험 진행 중일 때만 동작)
    window.addEventListener('beforeunload', (e) => {
      const vt = this.state.vocabTest;
      if (this.state.view === 'vocabTest' && vt && vt.setId && !vt.isCompleted) {
        this.forfeitVocabTest();
        e.preventDefault();
        e.returnValue = '시험 진행 중 페이지를 벗어나면 불합격(0점) 처리됩니다.';
      }
      const pt = this.state.practiceTest;
      if (this.state.view === 'practiceTest' && pt && pt.testId) {
        this.forceFailPracticeTest();
        e.preventDefault();
        e.returnValue = '시험 진행 중 페이지를 벗어나면 0점 불합격 처리됩니다.';
      }
    });

    // 모달 배경 클릭 시 닫기
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          // 시험 등록/수정 모달은 여백(배경) 클릭으로 꺼지지 않도록 방지 (X 버튼 또는 취소 버튼으로만 닫힘)
          if (overlay.id === 'adminTestFormModal') {
            return;
          }
          this.hideModal(overlay.id);
        }
      });
    });
  },

  // ========================================================
  // 1. 네비게이션 & 뷰 전환 (Navigation & Views)
  // ========================================================
  handleLogoClick() {
    if (this.state.isAdminLoggedIn) {
      this.showAdminDashboard();
    } else if (this.state.isStudentLoggedIn) {
      this.selectStudent(this.state.selectedStudentId);
    } else {
      this.showLanding();
    }
  },

  showLanding() {
    // 실제 단어 테스트 응시 화면에서 나가는 경우에만 경고
    if (this.state.view === 'vocabTest' && this.state.vocabTest && this.state.vocabTest.setId && !this.state.vocabTest.isCompleted) {
      const confirmExit = confirm('⚠️ 시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 나가시겠습니까?');
      if (!confirmExit) return;
      try {
        this.forfeitVocabTest();
      } catch (err) {
        console.error(err);
      }
    }
    this.clearVocabQuestionTimer();
    this.state.vocabTest = null;
    this.state.practiceTest = null;
    this.state.isStudentLoggedIn = false;
    this.state.isAdminLoggedIn = false;
    this.state.view = 'landing';
    document.getElementById('landingView').classList.remove('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');
    document.getElementById('practiceTestView')?.classList.add('hidden');
    this.updateHeaderActions();
    this.renderLanding();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  logoutStudent() {
    this.state.isStudentLoggedIn = false;
    this.toast('로그아웃되었습니다.', 'info');
    this.showLanding();
  },

  selectStudent(studentId) {
    const normalizedStudentId = Number(studentId);
    if (!this.state.isAdminLoggedIn && !this.state.isStudentLoggedIn) {
      this.toast('로그인한 후 이용해주세요.', 'info');
      this.showLanding();
      return;
    }

    this.clearVocabQuestionTimer();
    this.state.selectedStudentId = normalizedStudentId;
    this.state.view = 'student';
    this.state.calendarDate = new Date(); // 오늘 기준으로 캘린더 초기화
    this.state.studentViewTab = 'calendar';
    this.state.studentListFilter = 'ALL';

    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.remove('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');
    document.getElementById('practiceTestView')?.classList.add('hidden');
    this.updateHeaderActions();

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
    document.getElementById('practiceTestView')?.classList.add('hidden');
    this.updateHeaderActions();

    this.renderAdminDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showVocabTestView() {
    this.state.view = 'vocabTest';
    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.remove('hidden');
    document.getElementById('practiceTestView')?.classList.add('hidden');
    this.updateHeaderActions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showPracticeTestView() {
    this.clearVocabQuestionTimer();
    this.state.view = 'practiceTest';
    document.getElementById('landingView').classList.add('hidden');
    document.getElementById('studentDashboardView').classList.add('hidden');
    document.getElementById('adminDashboardView').classList.add('hidden');
    document.getElementById('vocabTestView').classList.add('hidden');
    document.getElementById('practiceTestView')?.classList.remove('hidden');
    this.updateHeaderActions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateHeaderActions() {
    const container = document.getElementById('headerNavActions');
    if (!container) return;

    if (this.state.isAdminLoggedIn) {
      container.innerHTML = `
        <div class="flex items-center gap-2">
          ${this.state.view !== 'admin' ? `
            <button onclick="App.showAdminDashboard()" class="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-gauge-high"></i>
              <span>선생님 관리자</span>
            </button>
          ` : ''}
          <button onclick="App.logoutAdmin()" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>관리자 로그아웃</span>
          </button>
        </div>
      `;
    } else if (this.state.isStudentLoggedIn) {
      container.innerHTML = `
        <button onclick="App.logoutStudent()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>로그아웃</span>
        </button>
      `;
    } else {
      container.innerHTML = '';
    }
  },

  // ========================================================
  // 2. 랜딩 화면 렌더링 (Unified Login)
  // ========================================================
  renderLanding() {
    const errorEl = document.getElementById('loginError');
    if (errorEl) errorEl.classList.add('hidden');

    const idInput = document.getElementById('studentLoginId');
    const pwInput = document.getElementById('studentLoginPassword');
    if (idInput) idInput.value = '';
    if (pwInput) pwInput.value = '';

    this.focusLoginInput();
  },

  focusLoginInput() {
    setTimeout(() => {
      const idInput = document.getElementById('studentLoginId');
      if (idInput && (this.state.view === 'landing' || !this.state.view)) {
        idInput.focus();
      }
    }, 50);
  },

  handleLogin(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const loginIdInput = document.getElementById('studentLoginId');
    const passwordInput = document.getElementById('studentLoginPassword');
    const loginId = (loginIdInput?.value || '').trim();
    const password = passwordInput?.value || '';
    const errorEl = document.getElementById('loginError');
    const normalizedLoginId = loginId.toLocaleLowerCase('en-US');

    if (!/^\d{4}$/.test(password)) {
      errorEl?.classList.remove('hidden');
      this.toast('비밀번호는 숫자 4자리를 입력해주세요.', 'error');
      return false;
    }

    if (
      normalizedLoginId === TEACHER_LOGIN_ID.toLocaleLowerCase('en-US') &&
      password === TEACHER_PASSWORD
    ) {
      this.state.isAdminLoggedIn = true;
      this.state.isStudentLoggedIn = false;
      this.toast('선생님 관리자 모드로 로그인되었습니다.', 'success');
      this.showAdminDashboard();
      return false;
    }

    const students = AppData.getStudents();
    const student = students.find(item =>
      String(item.loginId || '').toLocaleLowerCase('en-US') === normalizedLoginId &&
      String(item.password || '') === password
    );

    if (!student) {
      errorEl?.classList.remove('hidden');
      this.toast('아이디 또는 비밀번호를 확인해주세요.', 'error');
      return false;
    }

    this.state.isStudentLoggedIn = true;
    this.state.isAdminLoggedIn = false;
    this.state.selectedStudentId = Number(student.id);
    this.toast(`${student.name} 학생, 환영합니다!`, 'success');
    this.selectStudent(student.id);
    return false;
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
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center text-white shadow-md flex-shrink-0 border-2 border-white">
            <i class="fa-solid fa-user text-2xl text-white/90"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-2xl font-extrabold text-slate-900">${this.escapeHtml(student.name)} 학생의 학습 공간</h2>
              ${this.state.isAdminLoggedIn ? '<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200"><i class="fa-solid fa-eye mr-1"></i>선생님 미리보기</span>' : ''}
            </div>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-bullseye text-indigo-500"></i>
              <span>목표: <strong>${this.escapeHtml(student.target)}</strong></span>
            </p>
          </div>
        </div>
        ${this.state.isAdminLoggedIn ? `
          <button onclick="App.showAdminDashboard()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-md shadow-indigo-200">
            <i class="fa-solid fa-gauge-high"></i>
            <span>관리자 대시보드로 돌아가기</span>
          </button>
        ` : ''}
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

    // 3. 탭 컨테이너 visible 상태 동기화 (계정 전환 시 스테일 목록 버그 방지)
    const calContainer = document.getElementById('studentCalendarContainer');
    const listContainer = document.getElementById('studentListContainer');
    const calTabBtn = document.getElementById('viewTabCalendar');
    const listTabBtn = document.getElementById('viewTabList');
    if (calContainer && listContainer) {
      if (this.state.studentViewTab === 'calendar') {
        calContainer.classList.remove('hidden');
        listContainer.classList.add('hidden');
        if (calTabBtn) calTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
        if (listTabBtn) listTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition text-slate-600 hover:text-slate-900 flex items-center gap-1.5';
        this.renderCalendar();
      } else {
        calContainer.classList.add('hidden');
        listContainer.classList.remove('hidden');
        if (listTabBtn) listTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
        if (calTabBtn) calTabBtn.className = 'px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition text-slate-600 hover:text-slate-900 flex items-center gap-1.5';
        this.renderStudentTestsList();
      }
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
          const vocabCalendarLabel = '단어 테스트';
          testsHtml += `
            <div onclick="App.openVocabTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center justify-between gap-1 shadow-xs ${badgeStyle.class}" title="단어 테스트 · ${badgeStyle.tag}">
              <div class="truncate flex items-center gap-1"><span><i class="fa-solid fa-spell-check"></i></span><span class="truncate">${vocabCalendarLabel}</span></div>
            </div>`;
        }
        return;
      }
      if (test.type === 'PRACTICE') {
        if (test.date === dateStr) {
          const badgeStyle = this.getTestBadgeStyle(test, false);
          testsHtml += `
            <div onclick="App.openPracticeTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center justify-between gap-1 shadow-xs ${badgeStyle.class}" title="문제풀이 시험 확인 및 응시">
              <div class="truncate flex items-center gap-1"><span><i class="fa-solid fa-pen-to-square"></i></span><span class="truncate">${this.escapeHtml(test.title || '문제풀이 시험')}</span></div>
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

    // 단어 테스트를 끝내지 못한 채 마감된 경우에는 예정/불합격 대신
    // 달력에서도 명확히 '마감' 상태를 표시한다.
    if (test.type === 'VOCAB' && test.status !== 'PASS' && this.getTestTimeStatus(test).status === 'EXPIRED') {
      return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '⏰', tag: '마감' };
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
        : (test.type === 'PRACTICE'
            ? `App.openPracticeTestScheduleModal('${test.id}')`
            : `App.openTestDetailModal('${test.id}')`);

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

    if (test.type === 'VOCAB') {
      this.openVocabTestScheduleModal(testId);
      return;
    }
    if (test.type === 'PRACTICE') {
      this.openPracticeTestScheduleModal(testId);
      return;
    }

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

      ${Boolean(this.state.isAdminLoggedIn) ? `
        <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button onclick="App.openExtendTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-clock-rotate-left"></i> 시험 시간 연장
          </button>
          <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-pen-to-square"></i> 일정 & 성적 수정
          </button>
        </div>
      ` : ''}
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

    const isAdmin = Boolean(this.state.isAdminLoggedIn);
    const student = AppData.getStudentById(test.studentId);
    const timeStatus = this.getTestTimeStatus(test);
    const statusBadge = test.allowLate
      ? { class: 'bg-emerald-100 text-emerald-800', label: '⚡ 상시 응시 허용됨' }
      : (timeStatus.status === 'EXPIRED'
          ? { class: 'bg-rose-100 text-rose-800', label: '마감' }
          : (timeStatus.status === 'NOT_STARTED'
              ? { class: 'bg-blue-100 text-blue-800', label: '시작 전' }
              : (timeStatus.status === 'COMPLETED'
                  ? { class: 'bg-emerald-100 text-emerald-800', label: '완료됨' }
                  : { class: 'bg-emerald-100 text-emerald-800', label: test.extendedDate ? '연장 진행 중' : '응시 가능' })));
    const baseTimeStr = test.time ? (test.endTime ? `${test.time} ~ ${test.endTime}` : `${test.time}`) : (test.endTime ? `~ ${test.endTime}까지` : '23:59까지');
    const timeDisplay = test.extendedDate ? `${baseTimeStr} (연장: ~${test.extendedDate} ${test.extendedEndTime || '23:59'})` : baseTimeStr;

    document.getElementById('detailModalStudentBadge').innerText = student ? `${student.name} 학생 · 단어 테스트` : '단어 테스트';
    document.getElementById('detailModalTitle').innerText = test.title || set.title;
    document.getElementById('detailModalBody').innerHTML = `
      <div class="p-4 rounded-2xl bg-violet-50 border border-violet-200">
        <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
          <p class="text-xs font-bold text-violet-900">${this.escapeHtml(set.title)}</p>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-extrabold ${statusBadge.class}">
            ${statusBadge.label}
          </span>
        </div>
        <p class="text-xs text-slate-600 mt-1">
          시험일: <strong>${test.date}</strong>${
            test.extendedDate
              ? ` · 마감: <strong>${test.extendedDate} ${test.extendedEndTime || '23:59'} (연장됨)</strong>`
              : (test.endTime ? ` · 마감: <strong>${test.endTime}</strong>` : '')
          } · ${set.words.length}개 단어 · 커트라인 <strong>${this.escapeHtml(test.cutoff || '미지정')}</strong>
        </p>
      </div>

      ${isAdmin ? `
      <!-- 관리자 전용 시간 연장 카드 -->
      <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm shadow-xs">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
              <h4 class="text-xs font-bold text-amber-950">시험 시간 / 마감 연장 설정</h4>
              <p class="text-[11px] text-amber-800">
                ${test.allowLate ? '✅ 상시 응시 허용 중 (마감 없음)' : `원래 시험일: ${test.date}${test.extendedDate ? ` · 마감: ${test.extendedDate} ${test.extendedEndTime || '23:59'} (연장)` : (test.endTime ? ` · 마감: ${test.endTime}` : '')}`}
              </p>
            </div>
          </div>
          <button onclick="App.openExtendTestModal('${test.id}')" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>시간 연장하기</span>
          </button>
        </div>
        <div class="flex items-center gap-2 flex-wrap pt-1 border-t border-amber-200/60">
          <span class="text-[11px] font-bold text-amber-900">빠른 연장:</span>
          <button onclick="App.quickExtendTestDirect('${test.id}', 'today_midnight')" class="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition">
            오늘 자정까지
          </button>
          <button onclick="App.quickExtendTestDirect('${test.id}', 'plus_1hour')" class="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition">
            +1시간
          </button>
          <button onclick="App.quickExtendTestDirect('${test.id}', 'tomorrow_midnight')" class="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition">
            내일 자정까지
          </button>
        </div>
      </div>` : ''}

      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-600 flex items-center gap-1.5"><i class="fa-solid fa-book-open text-violet-600"></i> 단어장</h4>
        <div class="max-h-52 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white">
          ${set.words.map((word, index) => `<div class="grid grid-cols-[2rem_1fr_1fr] gap-2 p-3 text-xs"><span class="font-bold text-slate-400">${index + 1}</span><strong class="text-slate-800 break-words">${this.escapeHtml(word.en)}</strong><span class="text-slate-600 break-words">${this.escapeHtml(word.ko)}</span></div>`).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        ${this.renderVocabTestButton(set, test.studentId, 1, '한글 → 영어', 'bg-blue-600 hover:bg-blue-700 shadow-blue-200', test.id)}
        ${this.renderVocabTestButton(set, test.studentId, 2, '영어 → 한글', 'bg-violet-600 hover:bg-violet-700 shadow-violet-200', test.id)}
      </div>

      ${isAdmin ? `
        <div class="pt-2 border-t border-slate-100">
          <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-pen-to-square"></i> 시험 일정 & 단어 설정 수정
          </button>
        </div>
      ` : ''}
    `;
    this.showModal('testDetailModal');
  },

  // ── 시험 시간 연장 모달 컨트롤러 ────────────────────────
  openExtendTestModal(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) { this.toast('시험을 찾을 수 없습니다.', 'error'); return; }

    const student = AppData.getStudentById(test.studentId);
    const timeStatus = this.getTestTimeStatus(test);

    document.getElementById('extendTestId').value = test.id;
    document.getElementById('extendTestStudentName').innerText = student ? `${student.name} 학생` : '';
    document.getElementById('extendTestTitle').innerText = test.title || (test.type === 'VOCAB' ? '단어 테스트' : '시험');
    document.getElementById('extendModalSubtitle').innerText = `${student ? student.name : '학생'} 시험의 마감 시간 연장 (원래 시험일: ${test.date})`;
    
    const deadlineText = test.allowLate
      ? '상시 응시 허용 (마감 없음)'
      : (test.extendedDate
          ? `시험일: ${test.date} (연장 마감: ${test.extendedDate} ${test.extendedEndTime || '23:59'})`
          : `${test.date} ${test.endTime || '23:59'}`);
    document.getElementById('extendCurrentDeadline').innerText = deadlineText;

    const badge = document.getElementById('extendCurrentStatusBadge');
    if (test.allowLate) {
      badge.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800';
      badge.innerText = '상시 허용';
    } else if (timeStatus.status === 'EXPIRED') {
      badge.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800';
      badge.innerText = '시간 종료됨';
    } else if (timeStatus.status === 'NOT_STARTED') {
      badge.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800';
      badge.innerText = '시작 전';
    } else {
      badge.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800';
      badge.innerText = '진행 중';
    }

    // 기본 타겟 날짜 & 시간 채우기 (원래 날짜는 건드리지 않고 연장일시만 세팅)
    const today = this.getTodayDateString();
    document.getElementById('extendTargetDate').value = test.extendedDate || (test.date >= today ? test.date : today);
    document.getElementById('extendTargetEndTime').value = test.extendedEndTime || test.endTime || '23:59';

    // 연장 일시 또는 상시 응시 허용이 설정된 경우에만 취소 버튼을 노출한다.
    const cancelButton = document.getElementById('cancelTestExtensionButton');
    if (cancelButton) {
      const hasExtension = Boolean(test.extendedDate || test.extendedEndTime || test.allowLate);
      cancelButton.classList.toggle('hidden', !hasExtension);
    }

    this.showModal('extendTestModal');
  },

  closeExtendTestModal() {
    this.hideModal('extendTestModal');
  },

  async quickExtendTest(preset) {
    const testId = document.getElementById('extendTestId').value;
    await this.quickExtendTestDirect(testId, preset);
    this.closeExtendTestModal();
  },

  async quickExtendTestDirect(testId, preset) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) return;

    const today = this.getTodayDateString();
    let extendedDate = test.extendedDate || today;
    let extendedEndTime = test.extendedEndTime || test.endTime || '23:59';
    let allowLate = false;

    const now = new Date();

    if (preset === 'today_midnight') {
      extendedDate = today;
      extendedEndTime = '23:59';
      allowLate = false;
    } else if (preset === 'plus_1hour') {
      const future = new Date(now.getTime() + 60 * 60 * 1000);
      const y = future.getFullYear();
      const m = String(future.getMonth() + 1).padStart(2, '0');
      const d = String(future.getDate()).padStart(2, '0');
      const hh = String(future.getHours()).padStart(2, '0');
      const mm = String(future.getMinutes()).padStart(2, '0');
      extendedDate = `${y}-${m}-${d}`;
      extendedEndTime = `${hh}:${mm}`;
      allowLate = false;
    } else if (preset === 'tomorrow_midnight') {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const y = tomorrow.getFullYear();
      const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const d = String(tomorrow.getDate()).padStart(2, '0');
      extendedDate = `${y}-${m}-${d}`;
      extendedEndTime = '23:59';
      allowLate = false;
    } else if (preset === 'unlimited') {
      allowLate = true;
    }

    try {
      await AppData.writeDocument('tests', testId, {
        ...test,
        // 원래 test.date는 보존하고 연장 일시만 별도 필드로 저장
        extendedDate: extendedDate,
        extendedEndTime: extendedEndTime,
        allowLate: allowLate
      });
      await AppData.loadCollection('tests');

      this.toast(`✅ '${test.title || '시험'}' 시험일(${test.date})은 유지되며 마감이 ${allowLate ? '상시 응시 가능으로' : `${extendedDate} ${extendedEndTime}까지`} 연장되었습니다!`, 'success');
      
      // 화면 갱신
      if (this.state.isAdminLoggedIn) {
        this.renderAdminTestsTab();
      }
      if (this.state.selectedStudentId) {
        this.renderStudentDashboard(this.state.selectedStudentId);
      }
      
      // 모달이 열려있다면 새로고침
      const detailModal = document.getElementById('testDetailModal');
      if (detailModal && !detailModal.classList.contains('hidden')) {
        if (test.type === 'VOCAB') {
          this.openVocabTestScheduleModal(testId);
        } else if (test.type === 'PRACTICE') {
          this.openPracticeTestScheduleModal(testId);
        }
      }
    } catch (err) {
      console.error(err);
      this.toast('시간 연장에 실패했습니다.', 'error');
    }
  },

  async applyCustomExtendTest() {
    const testId = document.getElementById('extendTestId').value;
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) return;

    const targetDate = document.getElementById('extendTargetDate').value;
    const targetEndTime = document.getElementById('extendTargetEndTime').value;

    if (!targetDate) {
      this.toast('마감 날짜를 선택해주세요.', 'error');
      return;
    }

    try {
      await AppData.writeDocument('tests', testId, {
        ...test,
        // 원래 test.date는 보존
        extendedDate: targetDate,
        extendedEndTime: targetEndTime || '23:59',
        allowLate: false
      });
      await AppData.loadCollection('tests');

      this.toast(`✅ '${test.title || '시험'}' 시험일(${test.date})은 유지되며 마감이 ${targetDate} ${targetEndTime || '23:59'}까지 연장되었습니다.`, 'success');
      this.closeExtendTestModal();

      if (this.state.isAdminLoggedIn) {
        this.renderAdminTestsTab();
      }
      if (this.state.selectedStudentId) {
        this.renderStudentDashboard(this.state.selectedStudentId);
      }

      const detailModal = document.getElementById('testDetailModal');
      if (detailModal && !detailModal.classList.contains('hidden')) {
        if (test.type === 'VOCAB') {
          this.openVocabTestScheduleModal(testId);
        } else if (test.type === 'PRACTICE') {
          this.openPracticeTestScheduleModal(testId);
        }
      }
    } catch (err) {
      console.error(err);
      this.toast('시간 연장 저장에 실패했습니다.', 'error');
    }
  },

  async cancelTestExtension() {
    const testId = document.getElementById('extendTestId').value;
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) return;

    const hasExtension = Boolean(test.extendedDate || test.extendedEndTime || test.allowLate);
    if (!hasExtension) {
      this.toast('취소할 연장 설정이 없습니다.', 'info');
      return;
    }

    if (!confirm(`'${test.title || '시험'}'의 연장을 취소하고 원래 마감(${test.date} ${test.endTime || '23:59'})으로 되돌릴까요?`)) {
      return;
    }

    try {
      await AppData.writeDocument('tests', testId, {
        ...test,
        extendedDate: null,
        extendedEndTime: null,
        allowLate: false
      });
      await AppData.loadCollection('tests');

      this.toast(`'${test.title || '시험'}'의 연장이 취소되어 원래 마감(${test.date} ${test.endTime || '23:59'})이 적용되었습니다.`, 'success');
      this.closeExtendTestModal();

      if (this.state.isAdminLoggedIn) {
        this.renderAdminTestsTab();
      }
      if (this.state.selectedStudentId) {
        this.renderStudentDashboard(this.state.selectedStudentId);
      }

      const detailModal = document.getElementById('testDetailModal');
      if (detailModal && !detailModal.classList.contains('hidden')) {
        if (test.type === 'VOCAB') {
          this.openVocabTestScheduleModal(testId);
        } else if (test.type === 'PRACTICE') {
          this.openPracticeTestScheduleModal(testId);
        }
      }
    } catch (err) {
      console.error(err);
      this.toast('연장 취소에 실패했습니다.', 'error');
    }
  },

  // ========================================================
  // 시험 시간 범위 및 응시 가능 여부 판별 헬퍼
  // ========================================================
  parseDateTime(dateStr, timeStr, isEnd = false) {
    if (!dateStr) return null;
    const cleanDate = String(dateStr).trim();
    let cleanTime = timeStr ? String(timeStr).trim() : (isEnd ? '23:59:59' : '00:00:00');
    // 콜론 개수 파싱 (HH:MM 또는 HH:MM:SS)
    const parts = cleanTime.split(':');
    const hh = parts[0].padStart(2, '0');
    const mm = (parts[1] || '00').padStart(2, '0');
    const ss = (parts[2] || (isEnd ? '59' : '00')).padStart(2, '0');
    const isoString = `${cleanDate}T${hh}:${mm}:${ss}`;
    const parsed = new Date(isoString);
    return isNaN(parsed.getTime()) ? null : parsed;
  },

  getTestTimeStatus(test) {
    if (!test || !test.date) {
      return { status: 'IN_PROGRESS', label: '응시 가능', canStart: true, message: '' };
    }

    const now = new Date();
    const testDate = String(test.date).trim();

    // 시작 시간
    const startDateTime = this.parseDateTime(testDate, test.time, false) || new Date(`${testDate}T00:00:00`);

    // 종료 시간 (연장일시가 있으면 연장일시 우선, 없으면 기본 마감일시)
    const effectiveEndDate = (test.extendedDate && String(test.extendedDate).trim()) ? String(test.extendedDate).trim() : testDate;
    const effectiveEndTime = (test.extendedEndTime && String(test.extendedEndTime).trim()) ? String(test.extendedEndTime).trim() : (test.endTime || '23:59:59');
    const endDateTime = this.parseDateTime(effectiveEndDate, effectiveEndTime, true) || new Date(`${effectiveEndDate}T23:59:59`);

    if (test.allowLate) {
      return { status: 'IN_PROGRESS', label: '응시 가능 (상시 허용)', canStart: true, message: '' };
    }

    // 마감이 지난 경우 (어제 시험 등)
    if (now > endDateTime) {
      return {
        status: 'EXPIRED',
        label: '응시 시간 종료',
        canStart: false,
        message: '응시 시간이 종료되었습니다.'
      };
    }

    if (test.status === 'PASS' || test.practiceResult?.passed) {
      return { status: 'COMPLETED', label: '통과 완료 (PASS)', canStart: false, message: '이미 통과한 시험입니다.' };
    }

    if (now < startDateTime) {
      const timeStr = test.time ? `${test.time}` : '시험 당일';
      return {
        status: 'NOT_STARTED',
        label: `시작 전 (${timeStr}부터 가능)`,
        canStart: false,
        message: `시험 시작 시간이 아닙니다. ${test.date} ${test.time || ''}부터 응시할 수 있습니다.`
      };
    }

    return {
      status: 'IN_PROGRESS',
      label: '응시 가능',
      canStart: true,
      message: ''
    };
  },

  openPracticeTestScheduleModal(testId) {
    const test = AppData.getTests().find(item => item.id === testId);
    if (!test) { this.toast('시험 정보를 찾을 수 없습니다.', 'error'); return; }

    const student = AppData.getStudentById(test.studentId);
    const questions = test.questions || [];
    const timeStatus = this.getTestTimeStatus(test);
    const result = test.practiceResult;
    const isCompleted = test.status === 'PASS' || result?.passed;
    const timeDisplay = test.time ? (test.endTime ? `${test.time} ~ ${test.endTime}` : `${test.time}`) : '시간 미지정';
    const isAdmin = this.state.isAdminLoggedIn;

    document.getElementById('detailModalStudentBadge').innerText = student ? `${student.name} 학생 · 문제풀이 시험` : '문제풀이 시험';
    document.getElementById('detailModalTitle').innerText = test.title;

    let actionButtonHtml = '';
    if (isAdmin) {
      actionButtonHtml = `
        <div class="space-y-2.5 pt-2">
          ${result ? `
            <div class="p-3.5 rounded-xl ${result.passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-amber-50 border border-amber-200 text-amber-800'} text-xs font-semibold flex items-center justify-between">
              <span>학생 점수: <strong>${result.score}점 (${result.correctCount}/${result.totalCount} 정답)</strong></span>
              <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${result.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">${result.passed ? 'PASS 통과' : '불합격'}</span>
            </div>

            <!-- 관리자 재시험 허용 토글 카드 (불합격 시) -->
            ${!result.passed ? `
              <div class="p-3 rounded-xl border flex items-center justify-between gap-3 ${test.allowRetest ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}">
                <div>
                  <span class="text-xs font-bold ${test.allowRetest ? 'text-indigo-900' : 'text-slate-700'}">
                    <i class="fa-solid fa-rotate-right mr-1"></i>재시험 응시 허용
                  </span>
                  <p class="text-[11px] ${test.allowRetest ? 'text-indigo-700 font-semibold' : 'text-slate-400'}">
                    ${test.allowRetest ? '✅ 허용 중 — 학생이 재시험을 풀 수 있습니다.' : '현재 비허용 — 학생이 다시 풀 수 없습니다.'}
                  </p>
                </div>
                <button onclick="App.togglePracticeTestAllowRetest('${test.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${test.allowRetest ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}">
                  ${test.allowRetest ? '허용 취소' : '재시험 허용하기'}
                </button>
              </div>
            ` : ''}

            <button onclick="App.viewPracticeTestResultDetail('${test.id}')" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
              <i class="fa-solid fa-file-circle-check"></i> 학생 풀이 답안 & 채점 결과 보기
            </button>
          ` : (isCompleted ? `
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
              <i class="fa-solid fa-circle-check mr-1"></i>본시험 통과 처리됨 · 완료
            </div>
          ` : `
            <div class="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold text-center">
              <i class="fa-solid fa-clock mr-1"></i>아직 학생이 시험에 응시하지 않았습니다. (${timeStatus.label})
            </div>
          `)}
          <div class="flex items-center gap-2">
            <button onclick="App.openExtendTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-clock-rotate-left"></i> 시험 시간 연장
            </button>
            <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-pen-to-square"></i> 문제/설정 수정
            </button>
          </div>
        </div>
      `;
    } else {
      if (result) {
        actionButtonHtml = `
          <div class="space-y-2.5 pt-2">
            <div class="p-3.5 rounded-xl ${result.passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'} text-xs font-semibold flex items-center justify-between">
              <span>내 점수: <strong>${result.score}점 (${result.correctCount}/${result.totalCount} 정답)</strong></span>
              <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${result.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">${result.passed ? 'PASS 통과' : '불합격'}</span>
            </div>

            ${!result.passed ? `
              <div class="p-3 rounded-xl border ${test.allowRetest ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-500'} text-xs text-center font-medium">
                ${test.allowRetest
                  ? '<strong class="text-indigo-700 font-bold">✨ 선생님이 재시험을 허용했습니다. 다시 도전해보세요!</strong>'
                  : '<i class="fa-solid fa-lock mr-1"></i>커트라인 미달로 불합격하였습니다. 빽빽이 검사 후 다시 풀 수 있습니다.'}
              </div>
            ` : ''}

            ${!result.passed && test.allowRetest ? `
              <button onclick="App.startPracticeTest('${test.id}')" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
                <i class="fa-solid fa-rotate-right"></i> 재시험 응시하기
              </button>
            ` : ''}
          </div>
        `;
      } else if (isCompleted) {
        actionButtonHtml = `
          <div class="pt-2">
            <div class="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
              <i class="fa-solid fa-circle-check"></i> 문제풀이 시험 완료
            </div>
          </div>
        `;
      } else if (timeStatus.status === 'NOT_STARTED') {
        actionButtonHtml = `
          <div class="space-y-2 pt-2">
            <button disabled class="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
              <i class="fa-solid fa-lock"></i> ${timeStatus.label}
            </button>
            <p class="text-[11px] text-center text-slate-400">시험 시작 시간 이후에 응시 버튼이 활성화됩니다.</p>
          </div>
        `;
      } else if (timeStatus.status === 'EXPIRED') {
        actionButtonHtml = `
          <div class="space-y-2 pt-2">
            <button disabled class="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
              <i class="fa-solid fa-clock"></i> 응시 시간이 종료되었습니다
            </button>
            <p class="text-[11px] text-center text-slate-400">지정된 시험 종료 시각(${test.endTime || test.date})이 지났습니다.</p>
          </div>
        `;
      } else {
        actionButtonHtml = `
          <div class="pt-2">
            <button onclick="App.startPracticeTest('${test.id}')" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black transition flex items-center justify-center gap-2 shadow-md shadow-emerald-200">
              <i class="fa-solid fa-pencil"></i> 문제풀이 시험 시작하기
            </button>
          </div>
        `;
      }
    }

    document.getElementById('detailModalBody').innerHTML = `
      <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-900"><i class="fa-solid fa-file-lines mr-1 text-emerald-600"></i>${this.escapeHtml(test.title)}</span>
          <div class="flex items-center gap-1.5">
            ${isCompleted ? '<span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">완료</span>' : ''}
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">총 ${questions.length}문항</span>
          </div>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">${this.escapeHtml(test.scope || '선생님이 출제한 5지선다 객관식 문제입니다.')}</p>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span class="text-slate-400 font-bold block mb-0.5">응시 가능 일시</span>
          <strong class="text-slate-800 font-extrabold">${test.date} (${timeDisplay})</strong>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span class="text-slate-400 font-bold block mb-0.5">통과 커트라인</span>
          <strong class="text-slate-800 font-extrabold">${this.escapeHtml(test.cutoff || '80점 이상')}</strong>
        </div>
      </div>

      ${questions.length > 0 && isAdmin ? `
        <details class="text-xs border border-slate-200 rounded-xl p-3 bg-slate-50">
          <summary class="cursor-pointer font-bold text-slate-700 flex items-center justify-between">
            <span>출제된 문제 목록 미리보기 (${questions.length}문항)</span>
            <span class="text-[11px] text-indigo-600">열기/닫기</span>
          </summary>
          <div class="mt-2 space-y-2 pt-2 border-t border-slate-200 max-h-48 overflow-y-auto pr-1">
            ${questions.map((q, idx) => `
              <div class="p-2 rounded-lg bg-white border border-slate-200 text-[11px] leading-snug">
                <strong>${idx + 1}. ${this.renderRichText(q.question)}</strong>
                <div class="text-slate-500 mt-0.5">정답: ${q.answer}번 (${this.renderRichText(q.choices?.[q.answer - 1] || '')})</div>
              </div>
            `).join('')}
          </div>
        </details>
      ` : ''}

      ${actionButtonHtml}
    `;

    this.showModal('testDetailModal');
  },

  async togglePracticeTestAllowRetest(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) return;
    const newVal = !test.allowRetest;
    test.allowRetest = newVal;
    try {
      await AppData.saveOrUpdateTest(test);
      this.toast(newVal ? '✅ 학생의 재시험 응시가 허용되었습니다.' : '재시험 허용이 취소되었습니다.', newVal ? 'success' : 'info');
      
      const detailModal = document.getElementById('testDetailModal');
      if (detailModal && !detailModal.classList.contains('hidden')) {
        this.openPracticeTestScheduleModal(testId);
      }
      if (this.state.isAdminLoggedIn) {
        this.renderAdminTestsTab();
      }
      if (this.state.selectedStudentId) {
        this.renderStudentDashboard(this.state.selectedStudentId);
      }
    } catch (err) {
      console.error(err);
      this.toast('재시험 설정 변경에 실패했습니다.', 'error');
    }
  },

  // ── 학생: 문제풀이 시험 응시 엔진 ──────────────────────────
  startPracticeTest(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) { this.toast('시험 정보를 찾을 수 없습니다.', 'error'); return; }

    const questions = test.questions || [];
    if (questions.length === 0) {
      this.toast('출제된 문제가 없습니다.', 'error');
      return;
    }

    const timeStatus = this.getTestTimeStatus(test);
    if (!timeStatus.canStart && !test.practiceResult) {
      this.toast(timeStatus.message || '현재 응시할 수 없는 시간입니다.', 'error');
      return;
    }

    if (test.practiceResult?.passed) {
      this.toast('이미 통과 완료된 시험입니다.', 'info');
      this.viewPracticeTestResultDetail(testId);
      return;
    }

    // 불합격 후 선생님의 재시험 허용이 없는 경우 차단
    if (test.practiceResult && !test.practiceResult.passed && !test.allowRetest) {
      this.toast('빽빽이 검사 후 다시 응시할 수 있습니다.', 'info');
      return;
    }

    this.closeTestDetailModal();
    const cutoffScore = Math.min(100, Math.max(1, Number(test.practiceCutoff || test.cutoffScore || (test.cutoff ? parseInt(test.cutoff, 10) : 80) || 80)));
    this.state.practiceTest = {
      testId: test.id,
      studentId: Number(test.studentId),
      title: test.title,
      questions: questions,
      cutoffScore: cutoffScore,
      currentIndex: 0,
      answers: {},
      startedAt: new Date().toISOString()
    };

    this.showPracticeTestView();
    this.renderPracticeQuestion(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderPracticeQuestion(index) {
    const pt = this.state.practiceTest;
    if (!pt || !pt.questions || pt.questions.length === 0) return;

    if (index < 0) index = 0;
    if (index >= pt.questions.length) index = pt.questions.length - 1;
    pt.currentIndex = index;

    const total = pt.questions.length;
    const q = pt.questions[index];
    const choices = q.choices || ['', '', '', '', ''];
    const currentAnswer = pt.answers[index] || null;
    const choiceLabels = ['①', '②', '③', '④', '⑤'];

    document.getElementById('practiceTestTopInfo').innerHTML = `
      <div class="flex items-center justify-between gap-4 flex-wrap w-full">
        <div>
          <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(pt.title)}</span>
          <span class="text-xs text-slate-500 ml-2">문항 ${index + 1} / ${total}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-500 font-semibold">커트라인: <strong>${pt.cutoffScore}점 이상</strong></span>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 mt-3">
        ${pt.questions.map((_, i) => {
          const isCurrent = i === index;
          const isAnswered = pt.answers[i] != null;
          const btnClass = isCurrent
            ? 'bg-slate-900 text-white border-slate-900 font-black ring-2 ring-slate-400'
            : isAnswered
              ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
              : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50';
          return `<button onclick="App.goToPracticeQuestion(${i})" class="w-8 h-8 rounded-lg border text-xs transition ${btnClass}">${i + 1}</button>`;
        }).join('')}
      </div>
    `;


    // 문제 뷰 본문
    document.getElementById('practiceTestContent').innerHTML = `
      <div class="space-y-6 max-w-3xl mx-auto">
        <!-- Question Progress Bar -->
        <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width: ${Math.round(((index + 1) / total) * 100)}%"></div>
        </div>

        <!-- Question Card -->
        <div class="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">문제 ${index + 1}</span>
            <span class="text-xs text-slate-400 font-medium">${Object.keys(pt.answers).length} / ${total}문제 작성 완료</span>
          </div>

          <!-- Question Text -->
          <div class="space-y-2">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">${this.renderRichText(q.question)}</h3>
          </div>

          <!-- Passage (제시문) 있을 경우만 노출 -->
          ${q.passage && q.passage.trim() ? `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line">${this.renderRichText(q.passage.trim())}</div>
          ` : ''}

          <!-- 5 Choices -->
          <div class="space-y-2.5 pt-2">
            ${choices.map((choice, cIdx) => {
              const choiceNum = cIdx + 1;
              const isSelected = currentAnswer === choiceNum;
              return `
                <button type="button" onclick="App.selectPracticeChoice(${choiceNum})" class="w-full text-left p-3.5 rounded-xl border transition flex items-center space-x-3 ${isSelected ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}">
                    ${choiceLabels[cIdx]}
                  </span>
                  <span class="flex-1">${this.renderRichText(choice)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              onclick="App.goToPracticeQuestion(${index - 1})"
              ${index === 0 ? 'disabled' : ''}
              class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <i class="fa-solid fa-arrow-left"></i> 이전 문제
            </button>

            ${index < total - 1 ? `
              <button
                onclick="App.goToPracticeQuestion(${index + 1})"
                class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                다음 문제 <i class="fa-solid fa-arrow-right"></i>
              </button>
            ` : `
              <button
                onclick="App.submitPracticeTest()"
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-200"
              >
                <i class="fa-solid fa-check"></i> 답안 최종 제출하기
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  selectPracticeChoice(choiceNum) {
    const pt = this.state.practiceTest;
    if (!pt) return;
    pt.answers[pt.currentIndex] = choiceNum;
    this.renderPracticeQuestion(pt.currentIndex);
  },

  goToPracticeQuestion(index) {
    this.renderPracticeQuestion(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },


  async submitPracticeTest() {
    const pt = this.state.practiceTest;
    if (!pt) return;

    const total = pt.questions.length;
    const answeredCount = Object.keys(pt.answers).length;
    const unAnsweredCount = total - answeredCount;

    if (unAnsweredCount > 0) {
      if (!confirm(`아직 풀지 않은 문제가 ${unAnsweredCount}개 남아있습니다.\n그대로 시험을 제출하시겠습니까?`)) {
        return;
      }
    } else {
      if (!confirm('모든 문제를 다 푸셨습니까?\n답안을 제출하고 채점을 진행하시겠습니까?')) {
        return;
      }
    }

    // 채점 진행
    let correctCount = 0;
    const reviewItems = pt.questions.map((q, idx) => {
      const studentAnswer = pt.answers[idx] || null;
      const isCorrect = studentAnswer === Number(q.answer);
      if (isCorrect) correctCount++;
      return {
        questionNumber: idx + 1,
        question: q.question,
        passage: q.passage || '',
        choices: q.choices || [],
        studentAnswer,
        correctAnswer: Number(q.answer),
        isCorrect,
        explanation: q.explanation || ''
      };
    });

    const score = Math.round((correctCount / total) * 100);
    const passed = score >= pt.cutoffScore;
    const completedAt = new Date().toISOString();

    const practiceResult = {
      studentId: pt.studentId,
      testId: pt.testId,
      score,
      correctCount,
      totalCount: total,
      passed,
      cutoffScore: pt.cutoffScore,
      answers: pt.answers,
      reviewItems,
      startedAt: pt.startedAt || completedAt,
      completedAt
    };

    // 시험 객체 업데이트
    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === pt.testId);
    if (test) {
      test.practiceResult = practiceResult;
      test.status = passed ? 'PASS' : 'FAIL';
      test.score = `${score}점 (${correctCount}/${total})`;
      test.allowRetest = false;
      try {
        await AppData.saveOrUpdateTest(test);
      } catch (error) {
        console.error(error);
        this.toast('결과 저장에 실패했습니다. 다시 시도해주세요.', 'error');
        return;
      }
    }

    this.renderPracticeResult(practiceResult, test);
  },

  renderPracticeResult(result, test) {
    const passed = result.passed;
    const reviewItems = result.reviewItems || [];
    const choiceLabels = ['①', '②', '③', '④', '⑤'];

    document.getElementById('practiceTestTopInfo').innerHTML = `
      <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(test?.title || '문제풀이 시험')} — 시험 완료</span>
    `;

    document.getElementById('practiceTestContent').innerHTML = `
      <div class="space-y-6">
        <!-- Result Summary Card -->
        <div class="glass-card rounded-2xl p-8 text-center space-y-4">
          <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">
            <i class="fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
          </div>

          <div>
            <h3 class="text-2xl font-black ${passed ? 'text-emerald-700' : 'text-rose-700'}">
              ${passed ? '축하합니다! 시험에 통과하였습니다 🎉' : '아쉽게도 커트라인에 도달하지 못했습니다.'}
            </h3>
            <p class="text-slate-500 text-xs mt-1">커트라인: ${result.cutoffScore || 80}점 이상</p>
          </div>

          <div class="flex items-center justify-center gap-4 pt-2">
            <div class="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[11px] text-slate-400 font-bold block">획득 점수</span>
              <strong class="text-2xl font-black ${passed ? 'text-emerald-600' : 'text-rose-600'}">${result.score}점</strong>
            </div>
            <div class="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[11px] text-slate-400 font-bold block">정답 수</span>
              <strong class="text-2xl font-black text-slate-800">${result.correctCount} / ${result.totalCount}</strong>
            </div>
          </div>

          <div class="pt-2">
            <button onclick="App.exitPracticeTest()" class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition inline-flex items-center gap-2">
              <i class="fa-solid fa-arrow-left"></i> 학습 대시보드로 돌아가기
            </button>
          </div>
        </div>

        <!-- Detailed Review / Answer Key Card -->
        <div class="glass-card rounded-2xl p-6 space-y-4">
          <h4 class="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-list-check text-indigo-600"></i>
            문항별 정답 및 오답노트 해설
          </h4>

          <div class="space-y-4">
            ${reviewItems.map((item, idx) => {
              return `
                <div class="p-4 rounded-xl border ${item.isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'} space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full ${item.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'} text-xs font-black flex items-center justify-center">${idx + 1}</span>
                      <span class="font-bold text-xs ${item.isCorrect ? 'text-emerald-900' : 'text-rose-900'}">${item.isCorrect ? '정답' : '오답'}</span>
                    </div>
                    <span class="text-xs font-bold ${item.isCorrect ? 'text-emerald-700' : 'text-rose-600'}">
                      학생 선택: ${item.studentAnswer ? `${choiceLabels[item.studentAnswer - 1]} (${item.studentAnswer}번)` : '미응답'} · 정답: ${choiceLabels[item.correctAnswer - 1]} (${item.correctAnswer}번)
                    </span>
                  </div>

                  <!-- 1. 문제 -->
                  <p class="text-xs sm:text-sm font-bold text-slate-900 leading-snug">${this.renderRichText(item.question)}</p>

                  <!-- 2. 제시문 (있을 때만) -->
                  ${item.passage && item.passage.trim() ? `
                    <div class="py-2 px-3 rounded-lg bg-white/90 border border-slate-200 text-xs text-slate-700 leading-snug font-serif break-words">
                      ${this.renderRichText(item.passage)}
                    </div>
                  ` : ''}

                  <div class="space-y-1 text-xs">
                    ${(item.choices || []).map((ch, cIdx) => {
                      const cNum = cIdx + 1;
                      const isCorrectChoice = cNum === item.correctAnswer;
                      const isStudentChoice = cNum === item.studentAnswer;
                      let choiceStyle = 'bg-white text-slate-700 border-slate-200';
                      if (isCorrectChoice) choiceStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                      else if (isStudentChoice && !item.isCorrect) choiceStyle = 'bg-rose-100 text-rose-900 border-rose-300 line-through';

                      return `
                        <div class="p-2 rounded-lg border flex items-center gap-2 ${choiceStyle}">
                          <span class="font-bold flex-shrink-0">${choiceLabels[cIdx]}</span>
                          <span class="flex-1">${this.renderRichText(ch)}</span>
                          ${isCorrectChoice ? '<span class="text-[10px] font-black text-emerald-700">★ 정답</span>' : ''}
                          ${isStudentChoice && !item.isCorrect ? '<span class="text-[10px] font-black text-rose-600">내 오답</span>' : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  ${item.explanation ? `
                    <div class="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 space-y-0.5">
                      <strong class="font-bold text-indigo-700 flex items-center gap-1"><i class="fa-solid fa-lightbulb"></i> 선생님 해설:</strong>
                      <p>${this.renderRichText(item.explanation)}</p>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  viewPracticeTestResultDetail(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test || !test.practiceResult) {
      this.toast('응시 결과가 없습니다.', 'info');
      return;
    }
    this.closeTestDetailModal();
    this.showPracticeTestView();
    this.renderPracticeResult(test.practiceResult, test);
  },

  // 시험 도중 나가기/창닫기 시 0점 불합격 강제 처리
  forceFailPracticeTest() {
    const pt = this.state.practiceTest;
    if (!pt || !pt.testId) return;

    const total = pt.questions.length;
    const completedAt = new Date().toISOString();
    const practiceResult = {
      studentId: pt.studentId,
      testId: pt.testId,
      score: 0,
      correctCount: 0,
      totalCount: total,
      passed: false,
      cutoffScore: pt.cutoffScore,
      answers: pt.answers,
      reviewItems: pt.questions.map((q, idx) => ({
        questionNumber: idx + 1,
        question: q.question,
        passage: q.passage || '',
        choices: q.choices || [],
        studentAnswer: pt.answers[idx] || null,
        correctAnswer: Number(q.answer),
        isCorrect: false,
        explanation: q.explanation || ''
      })),
      startedAt: pt.startedAt || completedAt,
      completedAt,
      forceFailed: true
    };

    const allTests = AppData.getTests();
    const test = allTests.find(t => t.id === pt.testId);
    if (test) {
      test.practiceResult = practiceResult;
      test.status = 'FAIL';
      test.score = `0점 (0/${total}) — 시험 중 이탈`;
      test.allowRetest = false;
      AppData.saveOrUpdateTest(test).catch(e => console.error('강제 불합격 저장 실패:', e));
    }
  },

  exitPracticeTest() {
    const pt = this.state.practiceTest;
    if (pt && pt.testId) {
      if (!confirm('시험을 종료하면 0점 불합격 처리됩니다.\n정말 나가시겠습니까?')) return;
      this.forceFailPracticeTest();
    }

    const studentId = Number(pt?.studentId || this.state.selectedStudentId || this.state.adminSelectedStudentId || 1);
    this.state.practiceTest = {
      testId: null,
      studentId: null,
      title: '',
      questions: [],
      cutoffScore: 80,
      currentIndex: 0,
      answers: {},
      startedAt: null
    };
    if (this.state.isStudentLoggedIn) {
      this.selectStudent(studentId);
    } else if (this.state.isAdminLoggedIn) {
      this.selectStudent(studentId);
    } else {
      if (studentId && AppData.getStudentById(studentId)) {
        this.state.isStudentLoggedIn = true;
        this.selectStudent(studentId);
      } else {
        this.showLanding();
      }
    }
  },



  // ========================================================
  // 5. 관리자 대시보드 (Admin Management)
  // ========================================================
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
    if (!students || students.length === 0) {
      if (pills) pills.innerHTML = '<p class="text-xs text-slate-400">등록된 학생이 없습니다.</p>';
      return;
    }

    let currentStudent = AppData.getStudentById(this.state.adminSelectedStudentId);
    if (!currentStudent) {
      this.state.adminSelectedStudentId = students[0].id;
      currentStudent = students[0];
    }
    
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
      const timeStatus = this.getTestTimeStatus(test);
      const timeStr = test.time ? (test.endTime ? `${test.time}~${test.endTime}` : `${test.time}`) : (test.endTime ? `~${test.endTime}` : '');

      return `
        <tr class="hover:bg-slate-50/80 transition">
          <!-- 일시 -->
          <td class="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
            <div class="flex items-center gap-1.5">
              <span>${test.date}</span>
              ${test.allowLate ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">상시</span>' : (timeStatus.status === 'EXPIRED' ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">마감</span>' : '')}
            </div>
            <div class="text-[11px] font-normal text-slate-400 flex items-center gap-1">
              <span>${test.extendedDate ? `<span class="text-amber-700 font-bold">~${test.extendedDate} ${test.extendedEndTime || '23:59'} (연장)</span>` : (timeStr || '23:59까지')}</span>
              <button onclick="App.openExtendTestModal('${test.id}')" class="text-amber-600 hover:text-amber-800 font-bold hover:underline ml-1" title="마감 시간 연장">
                [연장]
              </button>
            </div>
          </td>

          <!-- 시험명 & 범위 -->
          <td class="py-3.5 px-4 max-w-xs">
            <div class="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer flex items-center gap-1.5" onclick="App.openTestDetailModal('${test.id}')">
              ${test.type === 'VOCAB' ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-800">단어</span>' : (test.type === 'PRACTICE' ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">문제풀이</span>' : '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">일반</span>')}
              <span>${this.escapeHtml(test.title)}</span>
            </div>
            <div class="text-xs text-slate-500 truncate mt-0.5">${this.escapeHtml(test.scope || '-')}</div>
          </td>

          <!-- 커트라인 / 점수 -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            <div class="text-xs text-slate-600">컷: <strong class="text-slate-800">${this.escapeHtml(test.cutoff || '-')}</strong></div>
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

          <!-- 재시험 결과 / 허용 관리 -->
          <td class="py-3.5 px-4 whitespace-nowrap">
            ${test.type === 'PRACTICE' ? `
              <div class="flex items-center gap-1.5">
                <button onclick="App.togglePracticeTestAllowRetest('${test.id}')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${test.allowRetest ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}">
                  <i class="fa-solid ${test.allowRetest ? 'fa-check' : 'fa-rotate-right'} mr-1"></i>${test.allowRetest ? '재시험 허용중' : '재시험 허용하기'}
                </button>
              </div>
            ` : `
              <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs">
                <button onclick="App.quickUpdateRetestStatus('${test.id}', 'NONE')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'NONE' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">없음</button>
                <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_PENDING')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_PENDING' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">대기</button>
                <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_PASS')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_PASS' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">통과</button>
                <button onclick="App.quickUpdateRetestStatus('${test.id}', 'RETEST_FAIL')" class="px-2 py-1 rounded-md font-semibold transition ${test.retestStatus === 'RETEST_FAIL' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">탈락</button>
              </div>
              ${test.retestDate ? `<div class="text-[11px] text-slate-400 mt-1 font-medium">재시험일: ${test.retestDate}</div>` : ''}
            `}
          </td>

          <!-- 관리 버튼 -->
          <td class="py-3.5 px-4 text-center whitespace-nowrap">
            <div class="flex items-center justify-center space-x-1.5">
              <button onclick="App.openExtendTestModal('${test.id}')" class="p-1.5 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-50 transition" title="마감 시간 연장">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </button>
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

    try {
      let resetVocabResultCount = 0;

      // 대기로 되돌릴 때는 이전 결과가 새 시험에 남지 않도록 초기화한다.
      // 단어 테스트는 방향별 응시 이력도 함께 지워야 다시 처음부터 응시할 수 있다.
      if (newStatus === 'SCHEDULED') {
        if (test.type === 'VOCAB') {
          resetVocabResultCount = await AppData.deleteVocabTestResultsByTestId(testId);
        }
        test.score = '';
        test.retestStatus = 'NONE';
        test.retestDate = '';
        test.practiceResult = null;
        test.allowRetest = false;
      }

      test.status = newStatus;
      // 불합격 선택 시 재시험 대기로 자동 편의 설정
      if (newStatus === 'FAIL' && test.retestStatus === 'NONE') {
        test.retestStatus = 'RETEST_PENDING';
      } else if (newStatus === 'PASS') {
        test.retestStatus = 'NONE';
      }

      await AppData.saveOrUpdateTest(test);
      this.renderAdminTestsTab();
      const resetMessage = newStatus === 'SCHEDULED'
        ? ` 대기로 되돌리고${resetVocabResultCount > 0 ? ` 단어 응시 기록 ${resetVocabResultCount}건을` : ' 이전 결과를'} 초기화했습니다.`
        : ' 상태가 업데이트되었습니다.';
      this.toast(`'${test.title}'${resetMessage}`, 'success');
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

  // 관리자 탭 2: 전체 학생 현황판 (Overview Matrix)
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
    container.innerHTML = `
      <div class="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm flex-shrink-0">
            <i class="fa-solid fa-user-plus"></i>
          </div>
          <div>
            <span class="text-xs font-bold text-indigo-600">새 학생 계정</span>
            <h4 class="font-bold text-slate-900">학생 추가</h4>
          </div>
        </div>
        <div class="space-y-2 text-xs">
          <div>
            <label class="block font-bold text-slate-600 mb-0.5">학생 이름</label>
            <input type="text" id="newStudentName" placeholder="예: 홍길동" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>
          <div>
            <label class="block font-bold text-slate-600 mb-0.5">학습 목표</label>
            <input type="text" id="newStudentTarget" placeholder="예: 내신 영어 1등급" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold text-slate-600 mb-0.5">로그인 아이디</label>
              <input type="text" id="newStudentLoginId" autocomplete="off" placeholder="영문/숫자" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
            <div>
              <label class="block font-bold text-slate-600 mb-0.5">비밀번호</label>
              <input type="password" id="newStudentPassword" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" autocomplete="new-password" placeholder="숫자 4자리" oninput="this.value=this.value.replace(/[^0-9]/g, '').slice(0, 4)" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
            </div>
          </div>
        </div>
        <div class="pt-2 flex justify-end">
          <button onclick="App.handleAddStudentProfile()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-sm">
            학생 계정 추가
          </button>
        </div>
      </div>
      ${students.map(student => {
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
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block font-bold text-slate-600 mb-0.5">로그인 아이디</label>
                <input type="text" id="editStudentLoginId_${student.id}" value="${this.escapeHtml(student.loginId || '')}" autocomplete="off" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-600 mb-0.5">비밀번호</label>
                <input type="password" id="editStudentPassword_${student.id}" value="${this.escapeHtml(student.password || '')}" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" autocomplete="new-password" oninput="this.value=this.value.replace(/[^0-9]/g, '').slice(0, 4)" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white" />
              </div>
            </div>
          </div>

          <div class="pt-2 flex items-center justify-between gap-3">
            <button onclick="App.confirmDeleteStudentProfile(${student.id})" class="px-3 py-2 rounded-xl text-rose-600 border border-rose-200 bg-white font-bold text-xs hover:bg-rose-50 transition">
              <i class="fa-solid fa-trash-can mr-1"></i>삭제
            </button>
            <button onclick="App.handleSaveStudentProfile(${student.id})" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-sm">
              프로필 저장
            </button>
          </div>
        </div>
      `;
      }).join('')}
    `;
  },

  async handleSaveStudentProfile(studentId) {
    const name = document.getElementById(`editStudentName_${studentId}`).value.trim();
    const target = document.getElementById(`editStudentTarget_${studentId}`).value.trim();
    const loginId = document.getElementById(`editStudentLoginId_${studentId}`).value.trim();
    const password = document.getElementById(`editStudentPassword_${studentId}`).value;

    if (!this.validateStudentAccount({ name, loginId, password }, studentId)) {
      return;
    }

    try {
      await AppData.updateStudent({ id: studentId, name, target, loginId, password });
      this.toast(`학생 #${studentId} 프로필이 저장되었습니다.`, 'success');
    } catch (error) {
      console.error(error);
      this.toast('학생 프로필 저장에 실패했습니다.', 'error');
    }
  },

  validateStudentAccount({ name, loginId, password }, excludingStudentId = null) {
    if (!name || !loginId || !password) {
      this.toast('학생 이름, 로그인 아이디, 비밀번호를 모두 입력해주세요.', 'error');
      return false;
    }
    if (!/^\d{4}$/.test(password)) {
      this.toast('비밀번호는 숫자 4자리로 설정해주세요.', 'error');
      return false;
    }
    const normalizedLoginId = loginId.toLocaleLowerCase('en-US');
    if (normalizedLoginId === TEACHER_LOGIN_ID.toLocaleLowerCase('en-US')) {
      this.toast('선생님 계정 아이디는 학생 계정으로 사용할 수 없습니다.', 'error');
      return false;
    }
    const duplicated = AppData.getStudents().some(student =>
      student.id !== Number(excludingStudentId) &&
      String(student.loginId || '').toLocaleLowerCase('en-US') === normalizedLoginId
    );
    if (duplicated) {
      this.toast('이미 사용 중인 로그인 아이디입니다.', 'error');
      return false;
    }
    return true;
  },

  async handleAddStudentProfile() {
    const name = document.getElementById('newStudentName').value.trim();
    const target = document.getElementById('newStudentTarget').value.trim();
    const loginId = document.getElementById('newStudentLoginId').value.trim();
    const password = document.getElementById('newStudentPassword').value;
    if (!this.validateStudentAccount({ name, loginId, password })) return;

    try {
      const student = await AppData.addStudent({ name, target, loginId, password });
      this.state.adminSelectedStudentId = student.id;
      this.toast(`${student.name} 학생 계정이 추가되었습니다.`, 'success');
      this.renderAdminStudentsTab();
    } catch (error) {
      console.error(error);
      this.toast('학생 계정 추가에 실패했습니다.', 'error');
    }
  },

  async confirmDeleteStudentProfile(studentId) {
    const student = AppData.getStudentById(studentId);
    if (!student) return;
    if (!confirm(`'${student.name}' 학생 계정을 삭제할까요?\n해당 학생의 시험 일정과 단어 시험 결과도 함께 삭제되며 되돌릴 수 없습니다.`)) return;

    try {
      await AppData.deleteStudent(studentId);
      const remainingStudents = AppData.getStudents();
      this.state.adminSelectedStudentId = remainingStudents[0]?.id || null;
      this.toast(`${student.name} 학생 계정과 관련 기록이 삭제되었습니다.`, 'info');
      this.renderAdminStudentsTab();
    } catch (error) {
      console.error(error);
      this.toast('학생 계정 삭제에 실패했습니다.', 'error');
    }
  },

  // ========================================================
  // 6. 시험 등록 / 수정 모달 (Test Form Modal)
  // ========================================================
  renderStudentCheckboxes(selectedStudentIds = []) {
    const grid = document.getElementById('formStudentCheckboxGrid');
    if (!grid) return;

    const students = AppData.getStudents();
    const allBtn = document.getElementById('formStudentSelectAllBtn');
    if (allBtn) {
      allBtn.innerHTML = `<i class="fa-solid fa-check-double mr-1"></i>전체 선택 (${students.length}명)`;
    }

    if (!students || students.length === 0) {
      grid.innerHTML = `<p class="col-span-full text-xs text-slate-400 text-center py-3">등록된 학생이 없습니다.</p>`;
      this.updateFormStudentSelectCount();
      return;
    }

    const normalizedSelectedIds = (Array.isArray(selectedStudentIds) ? selectedStudentIds : [selectedStudentIds])
      .map(id => Number(id))
      .filter(id => Number.isFinite(id) && id > 0);

    grid.innerHTML = students.map(s => {
      const isChecked = normalizedSelectedIds.includes(Number(s.id));
      return `
        <label class="flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none ${isChecked ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
          <input type="checkbox" name="formStudentCheckbox" value="${s.id}" ${isChecked ? 'checked' : ''} onchange="App.onFormStudentCheckboxChange()" class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer" />
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
      if (!label) return;
      if (cb.checked) {
        label.className = 'flex items-center space-x-2 p-2.5 rounded-xl border transition cursor-pointer select-none bg-indigo-50 border-indigo-500 text-indigo-950 font-bold';
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
    
    // 다중 선택 모드 활성화 (체크박스 그리드 노출)
    const selectAllActions = document.getElementById('formStudentSelectAllActions');
    const checkboxGrid = document.getElementById('formStudentCheckboxGrid');
    if (selectAllActions) selectAllActions.classList.remove('hidden');
    if (checkboxGrid) checkboxGrid.classList.remove('hidden');

    // 현재 관리자 선택 학생을 기본 체크
    this.renderStudentCheckboxes([this.state.adminSelectedStudentId || 1]);

    // 기본 폼 값 초기화
    document.getElementById('formTitle').value = '';
    document.getElementById('formDate').value = this.getTodayDateString();
    document.getElementById('formTime').value = '18:00';
    document.getElementById('formEndTime').value = '19:00';
    document.getElementById('formScope').value = '';
    document.getElementById('formCutoff').value = '90점 이상';
    document.getElementById('formVocabCutoff').value = '';
    document.getElementById('formPracticeCutoff').value = '80';
    document.getElementById('formScore').value = '';
    document.getElementById('formRetestDate').value = '';
    document.getElementById('formTeacherNote').value = '';
    this.renderFormVocabSetSelect();
    this.initPracticeQuestionsForm([]);

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
    if (!test) {
      this.toast('수정할 시험을 찾을 수 없습니다.', 'error');
      return;
    }

    // 모달 제목 & hidden 필드
    document.getElementById('adminFormModalTitle').innerText = '시험 일정 및 성적 수정';
    document.getElementById('formTestId').value = test.id;

    // 체크박스 섹션 항상 표시
    const selectAllActions = document.getElementById('formStudentSelectAllActions');
    const checkboxGrid = document.getElementById('formStudentCheckboxGrid');
    if (selectAllActions) selectAllActions.classList.remove('hidden');
    if (checkboxGrid) checkboxGrid.classList.remove('hidden');

    // 이 시험과 같은 제목+날짜+타입(또는 단어세트)을 가진 모든 학생의 시험을 자동 탐색 → 복수 체크
    const relatedTests = allTests.filter(t => {
      if (test.type === 'VOCAB' && test.vocabSetId) {
        return t.type === 'VOCAB' && t.vocabSetId === test.vocabSetId && t.date === test.date;
      }
      if (test.type === 'PRACTICE') {
        return t.type === 'PRACTICE' && t.title === test.title && t.date === test.date;
      }
      // REGULAR
      return (t.type === 'REGULAR' || !t.type) && t.title === test.title && t.date === test.date;
    });

    const preselectedIds = relatedTests.length > 0
      ? [...new Set(relatedTests.map(t => Number(t.studentId)))]
      : [Number(test.studentId)];

    // 체크박스 렌더링 (복수 선택)
    this.renderStudentCheckboxes(preselectedIds);

    // 폼 필드 채우기
    document.getElementById('formTitle').value = test.title || '';
    document.getElementById('formDate').value = test.date || '';
    document.getElementById('formTime').value = test.time || '';
    document.getElementById('formEndTime').value = test.endTime || '';
    document.getElementById('formScope').value = test.scope || '';
    document.getElementById('formCutoff').value = test.cutoff || '';
    document.getElementById('formVocabCutoff').value = test.vocabCutoff ?? this.getVocabCutoffScore(test);
    document.getElementById('formPracticeCutoff').value = test.cutoffScore || test.practiceCutoff || 80;
    document.getElementById('formScore').value = test.score || '';
    document.getElementById('formRetestDate').value = test.retestDate || '';
    document.getElementById('formTeacherNote').value = test.teacherNote || '';
    this.renderFormVocabSetSelect(test.vocabSetId || '');
    this.initPracticeQuestionsForm(test.questions || []);

    // 라디오 버튼 설정
    const statusVal = test.status || 'SCHEDULED';
    const retestVal = test.retestStatus || 'NONE';
    const typeVal = ['VOCAB', 'PRACTICE'].includes(test.type) ? test.type : 'REGULAR';

    const statusRadio = document.querySelector(`input[name="formStatus"][value="${statusVal}"]`);
    if (statusRadio) statusRadio.checked = true;
    const retestRadio = document.querySelector(`input[name="formRetestStatus"][value="${retestVal}"]`);
    if (retestRadio) retestRadio.checked = true;
    const typeRadio = document.querySelector(`input[name="formTestType"][value="${typeVal}"]`);
    if (typeRadio) typeRadio.checked = true;

    this.toggleTestFormType();
    this.showModal('adminTestFormModal');
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
    const testType = document.querySelector('input[name="formTestType"]:checked')?.value || 'REGULAR';
    const isVocab = testType === 'VOCAB';
    const isPractice = testType === 'PRACTICE';
    const isRegular = testType === 'REGULAR';

    document.querySelectorAll('.form-regular-only').forEach(element => element.classList.toggle('hidden', !isRegular));
    document.querySelectorAll('.form-regular-or-practice').forEach(element => element.classList.toggle('hidden', isVocab));
    document.querySelectorAll('.form-time-applicable').forEach(element => element.classList.remove('hidden'));
    
    document.getElementById('formVocabSetSection').classList.toggle('hidden', !isVocab);
    document.getElementById('formVocabCutoffSection').classList.toggle('hidden', !isVocab);
    document.getElementById('formPracticeCutoffSection').classList.toggle('hidden', !isPractice);
    document.getElementById('formPracticeSection').classList.toggle('hidden', !isPractice);

    const title = document.getElementById('formTitle');
    const regularCutoff = document.getElementById('formCutoff');
    const vocabCutoff = document.getElementById('formVocabCutoff');
    const practiceCutoff = document.getElementById('formPracticeCutoff');

    title.required = !isVocab;
    if (regularCutoff) regularCutoff.required = isRegular;
    if (vocabCutoff) vocabCutoff.required = isVocab;
    if (practiceCutoff) practiceCutoff.required = isPractice;
  },

  initPracticeQuestionsForm(questions = []) {
    this.state.editingPracticeQuestions = Array.isArray(questions) && questions.length > 0
      ? JSON.parse(JSON.stringify(questions))
      : [];
    if (this.state.editingPracticeQuestions.length === 0) {
      this.addPracticeQuestionRow();
    } else {
      this.renderPracticeQuestionsForm();
    }
  },

  addPracticeQuestionRow(data = null) {
    const newQuestion = data || {
      id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      question: '',
      passage: '',
      choices: ['', '', '', '', ''],
      answer: 1,
      explanation: ''
    };
    this.state.editingPracticeQuestions.push(newQuestion);
    this.renderPracticeQuestionsForm();
  },

  removePracticeQuestionRow(index) {
    if (this.state.editingPracticeQuestions.length <= 1) {
      this.toast('문제풀이 시험은 최소 1개 이상의 문제가 필요합니다.', 'info');
      return;
    }
    this.state.editingPracticeQuestions.splice(index, 1);
    this.renderPracticeQuestionsForm();
  },

  updatePracticeQuestionField(qIndex, field, value) {
    const q = this.state.editingPracticeQuestions[qIndex];
    if (!q) return;
    q[field] = value;
  },

  updatePracticeChoice(qIndex, choiceIndex, value) {
    const q = this.state.editingPracticeQuestions[qIndex];
    if (!q) return;
    if (!Array.isArray(q.choices)) q.choices = ['', '', '', '', ''];
    q.choices[choiceIndex] = value;
  },

  updatePracticeAnswer(qIndex, answerNumber) {
    const q = this.state.editingPracticeQuestions[qIndex];
    if (!q) return;
    q.answer = Number(answerNumber);
    this.renderPracticeQuestionsForm();
  },

  // ── 서식 파서 및 텍스트 편집 툴바 헬퍼 ────────────────────────
  renderRichText(text) {
    if (!text) return '';
    let trimmed = String(text).trim();
    let escaped = this.escapeHtml(trimmed);
    // 1. 볼드: **text**
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="font-black text-slate-950">$1</strong>');
    // 2. 밑줄: __text__ → 일반 밑줄
    escaped = escaped.replace(/__(.+?)__/g, '<u>$1</u>');
    // 3. 이탤릭: *text* (단, **는 제외)
    escaped = escaped.replace(/(?<!\*)\*(?!\*)([^\*\n]+?)(?<!\*)\*(?!\*)/g, '<em class="italic text-slate-800">$1</em>');
    // 4. 형광펜: ==text==
    escaped = escaped.replace(/==(.+?)==/g, '<mark class="bg-amber-200/90 text-amber-950 px-1 py-0.5 rounded font-medium">$1</mark>');
    // 5. 지문 내 줄바꿈 지원
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  },

  renderTextFormatToolbar(qIndex, field) {
    return `
      <div class="flex items-center gap-1 mb-1.5 flex-wrap">
        <span class="text-[10px] font-bold text-slate-400 mr-1 flex items-center gap-1"><i class="fa-solid fa-pen-nib"></i> 서식:</span>
        <button type="button" onmousedown="event.preventDefault(); App.applyFormatToField(${qIndex}, '${field}', 'bold')" class="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-black border border-slate-200 transition active:scale-95" title="굵게 (**굵은글씨**)">
          <strong class="font-black">B</strong> 굵게
        </button>
        <button type="button" onmousedown="event.preventDefault(); App.applyFormatToField(${qIndex}, '${field}', 'underline')" class="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition active:scale-95" title="밑줄 (__밑줄__)">
          <u class="underline decoration-2">U</u> 밑줄
        </button>
        <button type="button" onmousedown="event.preventDefault(); App.applyFormatToField(${qIndex}, '${field}', 'italic')" class="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition active:scale-95" title="기울임 (*기울임*)">
          <em class="italic">I</em> 기울임
        </button>
        <button type="button" onmousedown="event.preventDefault(); App.applyFormatToField(${qIndex}, '${field}', 'blank')" class="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200 transition active:scale-95" title="빈칸 만들기">
          <span class="font-mono tracking-tight">( __ )</span> 빈칸
        </button>
        <button type="button" onmousedown="event.preventDefault(); App.applyFormatToField(${qIndex}, '${field}', 'highlight')" class="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 transition active:scale-95" title="형광펜 강조 (==강조==)">
          <i class="fa-solid fa-highlighter text-[10px]"></i> 형광펜
        </button>
      </div>
    `;
  },

  applyFormatToField(qIndex, field, formatType) {
    const inputEl = document.getElementById(`practice_${field}_${qIndex}`);
    if (!inputEl) return;

    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;
    const val = inputEl.value || '';
    const selected = val.substring(start, end);

    let before = '', after = '', insertText = '';
    switch (formatType) {
      case 'bold':
        before = '**';
        after = '**';
        insertText = selected || '굵은글씨';
        break;
      case 'underline':
        before = '__';
        after = '__';
        insertText = selected || '밑줄';
        break;
      case 'italic':
        before = '*';
        after = '*';
        insertText = selected || '기울임';
        break;
      case 'blank':
        before = '';
        after = '';
        insertText = selected ? `(${selected})` : '(          )';
        break;
      case 'highlight':
        before = '==';
        after = '==';
        insertText = selected || '강조';
        break;
    }

    const newVal = val.substring(0, start) + before + insertText + after + val.substring(end);
    inputEl.value = newVal;
    this.updatePracticeQuestionField(qIndex, field, newVal);

    // 커서 위치 재설정 & 포커스 유지
    inputEl.focus();
    if (selected) {
      inputEl.setSelectionRange(start + before.length, start + before.length + insertText.length);
    } else {
      inputEl.setSelectionRange(start + before.length, start + before.length + insertText.length);
    }
  },

  renderPracticeQuestionsForm() {
    const container = document.getElementById('formPracticeQuestionsList');
    const badge = document.getElementById('formPracticeQuestionCountBadge');
    if (!container) return;

    const questions = this.state.editingPracticeQuestions;
    if (badge) badge.innerText = `${questions.length}문항`;

    container.innerHTML = questions.map((q, qIndex) => {
      const choices = Array.isArray(q.choices) && q.choices.length === 5 ? q.choices : ['', '', '', '', ''];
      const qAnswer = Number(q.answer) || 1;

      return `
        <div class="p-4 rounded-xl border border-emerald-200 bg-white shadow-xs space-y-3">
          <div class="flex items-center justify-between gap-2 border-b border-emerald-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">${qIndex + 1}</span>
              <span class="text-xs font-bold text-slate-800">문제 ${qIndex + 1}</span>
            </div>
            <button type="button" onclick="App.removePracticeQuestionRow(${qIndex})" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition text-xs flex items-center gap-1">
              <i class="fa-solid fa-trash-can"></i> 문제 삭제
            </button>
          </div>

          <!-- 문제 질문 (Question) -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-[11px] font-bold text-slate-700">문제 질문 <span class="text-rose-500">*</span></label>
              <span class="text-[10px] text-slate-400 font-medium">드래그 후 서식 버튼 클릭 가능</span>
            </div>
            ${this.renderTextFormatToolbar(qIndex, 'question')}
            <input id="practice_question_${qIndex}" type="text" placeholder="예: 다음 글의 밑줄 친 __8__이 가리키는 것으로 알맞은 것은?" value="${this.escapeHtml(q.question || '')}" oninput="App.updatePracticeQuestionField(${qIndex}, 'question', this.value)" class="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs font-semibold" />
          </div>

          <!-- 지문 / 본문 (선택) -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-[11px] font-bold text-slate-600">지문 / 제시문 (선택사항)</label>
              <span class="text-[10px] text-slate-400 font-medium">지문이 없는 문항은 비워두세요</span>
            </div>
            ${this.renderTextFormatToolbar(qIndex, 'passage')}
            <textarea id="practice_passage_${qIndex}" rows="3" placeholder="예: In 1990, she **was born** in London. She wanted to __study__ math." oninput="App.updatePracticeQuestionField(${qIndex}, 'passage', this.value)" class="w-full py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-xs bg-slate-50 font-mono leading-relaxed">${this.escapeHtml(q.passage || '')}</textarea>
          </div>

          <!-- 5지선다 보기 및 정답 선택 -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-[11px] font-bold text-slate-700">5지선다 보기 입력 & 정답 체크 <span class="text-rose-500">*</span></label>
              <span class="text-[10px] text-emerald-700 font-semibold">정답인 번호의 라디오를 선택하세요</span>
            </div>
            <div class="space-y-1.5">
              ${choices.map((choice, cIndex) => {
                const choiceNum = cIndex + 1;
                const isCorrect = qAnswer === choiceNum;
                const choiceLabels = ['①', '②', '③', '④', '⑤'];
                return `
                  <div class="flex items-center gap-2 p-1.5 rounded-lg border transition ${isCorrect ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white'}">
                    <label class="flex items-center gap-1.5 cursor-pointer flex-shrink-0 px-1">
                      <input type="radio" name="practiceAnswer_${qIndex}" value="${choiceNum}" ${isCorrect ? 'checked' : ''} onchange="App.updatePracticeAnswer(${qIndex}, ${choiceNum})" class="text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer" />
                      <span class="text-xs font-bold ${isCorrect ? 'text-emerald-800' : 'text-slate-600'}">${choiceLabels[cIndex]} 정답</span>
                    </label>
                    <input type="text" placeholder="${choiceNum}번 보기 입력 (서식 지원: **굵게**, __밑줄__)" value="${this.escapeHtml(choice || '')}" oninput="App.updatePracticeChoice(${qIndex}, ${cIndex}, this.value)" class="flex-1 py-1.5 px-2.5 rounded-md border border-slate-200 focus:ring-1 focus:ring-emerald-500 text-xs bg-white" />
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 해설 / 오답노트 코멘트 -->
          <div>
            <label class="block text-[11px] font-bold text-slate-600 mb-1">선생님 문제 해설 / 풀이 팁 (선택사항)</label>
            <input type="text" placeholder="예: 관계대명사 뒤에는 불완전한 절이 와야 하므로 that이 적절합니다." value="${this.escapeHtml(q.explanation || '')}" oninput="App.updatePracticeQuestionField(${qIndex}, 'explanation', this.value)" class="w-full py-2 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-xs bg-slate-50" />
          </div>
        </div>
      `;
    }).join('');
  },

  closeAdminTestFormModal() {
    this.hideModal('adminTestFormModal');
  },

  async handleSaveTestForm(e) {
    e.preventDefault();

    const id = document.getElementById('formTestId').value.trim();
    const testType = document.querySelector('input[name="formTestType"]:checked')?.value || 'REGULAR';
    const isVocabTest = testType === 'VOCAB';
    const isPracticeTest = testType === 'PRACTICE';
    const isRegularTest = testType === 'REGULAR';

    const title = isVocabTest ? '단어 테스트' : document.getElementById('formTitle').value.trim();
    const date = document.getElementById('formDate').value;
    const time = document.getElementById('formTime').value.trim();
    const endTime = document.getElementById('formEndTime').value.trim();
    const scope = isVocabTest
      ? '단어 세트 기반 5지선다 테스트'
      : (isPracticeTest ? (document.getElementById('formScope').value.trim() || '선생님 출제 5지선다 객관식 문제풀이') : document.getElementById('formScope').value.trim());

    const regularCutoff = document.getElementById('formCutoff').value.trim();
    const vocabCutoff = Number(document.getElementById('formVocabCutoff').value);
    const practiceCutoff = Number(document.getElementById('formPracticeCutoff').value);

    let cutoff = regularCutoff;
    let cutoffScore = null;
    if (isVocabTest) {
      cutoff = `${vocabCutoff}점`;
      cutoffScore = vocabCutoff;
    } else if (isPracticeTest) {
      cutoff = `${practiceCutoff}점 이상`;
      cutoffScore = practiceCutoff;
    }

    const score = isRegularTest ? document.getElementById('formScore').value.trim() : '';
    const retestDate = isRegularTest ? document.getElementById('formRetestDate').value : '';
    const teacherNote = isRegularTest ? document.getElementById('formTeacherNote').value.trim() : '';
    const vocabSetId = isVocabTest ? document.getElementById('formVocabSetId').value : null;

    const status = isRegularTest ? (document.querySelector('input[name="formStatus"]:checked')?.value || 'SCHEDULED') : 'SCHEDULED';
    const retestStatus = isRegularTest ? (document.querySelector('input[name="formRetestStatus"]:checked')?.value || 'NONE') : 'NONE';

    // 공통 검사
    if (!title || !date) {
      this.toast('시험 제목과 날짜는 필수 입력 항목입니다.', 'error');
      return;
    }

    if (isVocabTest) {
      if (!vocabSetId || !Number.isInteger(vocabCutoff) || vocabCutoff < 1 || vocabCutoff > 100) {
        this.toast('단어 세트를 선택하고 1~100점 사이의 커트라인을 입력해주세요.', 'error');
        return;
      }
    }

    if (isPracticeTest) {
      if (!Number.isInteger(practiceCutoff) || practiceCutoff < 1 || practiceCutoff > 100) {
        this.toast('문제풀이 커트라인은 1~100점 사이의 정수로 입력해주세요.', 'error');
        return;
      }

      const questions = this.state.editingPracticeQuestions;
      if (!Array.isArray(questions) || questions.length === 0) {
        this.toast('최소 1개 이상의 문제를 출제해야 합니다.', 'error');
        return;
      }

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question || !q.question.trim()) {
          this.toast(`${i + 1}번 문제의 질문 내용을 입력해주세요.`, 'error');
          return;
        }
        if (!Array.isArray(q.choices) || q.choices.some(c => !String(c).trim())) {
          this.toast(`${i + 1}번 문제의 1~5번 보기를 모두 입력해주세요.`, 'error');
          return;
        }
        if (!q.answer || q.answer < 1 || q.answer > 5) {
          this.toast(`${i + 1}번 문제의 정답 번호를 선택해주세요.`, 'error');
          return;
        }
      }
    }

    const practiceQuestions = isPracticeTest ? JSON.parse(JSON.stringify(this.state.editingPracticeQuestions)) : null;

    // 대상 학생 체크박스 확인
    const checkedBoxes = document.querySelectorAll('input[name="formStudentCheckbox"]:checked');
    const selectedStudentIds = Array.from(checkedBoxes).map(cb => Number(cb.value));

    if (selectedStudentIds.length === 0) {
      this.toast('시험을 배정할 학생을 최소 1명 이상 선택해주세요.', 'error');
      return;
    }

    const allTests = AppData.getTests();

    if (id) {
      // 1. 기존 시험 수정 및 다중 학생 일괄 수정/추가 모드
      const existingTest = allTests.find(t => t.id === id);
      const originalStudentId = existingTest ? existingTest.studentId : null;
      const primaryStudentId = selectedStudentIds.includes(originalStudentId) ? originalStudentId : selectedStudentIds[0];

      const savePromises = selectedStudentIds.map(async (studentId) => {
        if (studentId === primaryStudentId) {
          // 기존 원본 시험 정보 수정
          const testData = {
            id,
            studentId,
            title,
            date,
            time,
            endTime,
            scope,
            cutoff,
            cutoffScore,
            score: isPracticeTest ? (existingTest?.score || '') : score,
            status: isPracticeTest ? (existingTest?.status || 'SCHEDULED') : status,
            retestStatus,
            retestDate,
            teacherNote,
            vocabSetId,
            vocabCutoff: isVocabTest ? vocabCutoff : null,
            practiceCutoff: isPracticeTest ? practiceCutoff : null,
            questions: isPracticeTest ? practiceQuestions : null,
            practiceResult: isPracticeTest ? existingTest?.practiceResult : null,
            extendedDate: existingTest?.extendedDate || null,
            extendedEndTime: existingTest?.extendedEndTime || null,
            allowLate: existingTest?.allowLate || false,
            type: testType
          };
          return AppData.saveOrUpdateTest(testData);
        } else {
          // 다른 학생: 동일한 시험(단어세트ID 또는 제목, 날짜)이 이미 있는지 탐색
          const matchingExistingTest = allTests.find(t => {
            if (t.studentId !== studentId) return false;
            if (isVocabTest) {
              return t.type === 'VOCAB' && t.vocabSetId === vocabSetId && (t.date === date || (existingTest && t.date === existingTest.date));
            }
            if (isPracticeTest) {
              return t.type === 'PRACTICE' && t.title === (existingTest?.title || title) && (t.date === date || (existingTest && t.date === existingTest.date));
            }
            return (t.type || 'REGULAR') === 'REGULAR' && t.title === (existingTest?.title || title) && (t.date === date || (existingTest && t.date === existingTest.date));
          });

          if (matchingExistingTest) {
            // 이미 동일한 시험이 있으면 해당 학생의 시험 정보 업데이트
            const testData = {
              ...matchingExistingTest,
              title,
              date,
              time,
              endTime,
              scope,
              cutoff,
              cutoffScore,
              vocabSetId,
              vocabCutoff: isVocabTest ? vocabCutoff : null,
              practiceCutoff: isPracticeTest ? practiceCutoff : null,
              questions: isPracticeTest ? practiceQuestions : null,
              type: testType
            };
            if (isRegularTest) {
              if (score) testData.score = score;
              if (status !== 'SCHEDULED' || matchingExistingTest.status === 'SCHEDULED') testData.status = status;
              if (retestStatus !== 'NONE' || matchingExistingTest.retestStatus === 'NONE') testData.retestStatus = retestStatus;
              if (retestDate) testData.retestDate = retestDate;
              if (teacherNote) testData.teacherNote = teacherNote;
            }
            return AppData.saveOrUpdateTest(testData);
          } else {
            // 해당 학생에게 시험이 없으면 새로 추가
            const newTest = {
              studentId,
              title,
              date,
              time,
              endTime,
              scope,
              cutoff,
              cutoffScore,
              score: isRegularTest ? score : '',
              status: isRegularTest ? status : 'SCHEDULED',
              retestStatus: isRegularTest ? retestStatus : 'NONE',
              retestDate: isRegularTest ? retestDate : '',
              teacherNote: isRegularTest ? teacherNote : '',
              vocabSetId,
              vocabCutoff: isVocabTest ? vocabCutoff : null,
              practiceCutoff: isPracticeTest ? practiceCutoff : null,
              questions: isPracticeTest ? practiceQuestions : null,
              practiceResult: null,
              type: testType
            };
            return AppData.saveOrUpdateTest(newTest);
          }
        }
      });

      try {
        await Promise.all(savePromises);
      } catch (error) {
        console.error(error);
        return;
      }
      this.closeAdminTestFormModal();
      if (selectedStudentIds.length === 1) {
        this.toast(`'${title}' 일정이 성공적으로 수정되었습니다!`, 'success');
        this.state.adminSelectedStudentId = selectedStudentIds[0];
      } else {
        this.toast(`선택한 ${selectedStudentIds.length}명의 학생에게 '${title}' 일정이 일괄 수정/적용되었습니다! ✨`, 'success');
      }
    } else {
      // 2. 새 시험 등록 모드 (다중 학생 지원)
      const newTests = selectedStudentIds.map(sId => {
        const newTest = {
          studentId: sId,
          title,
          date,
          time,
          endTime,
          scope,
          cutoff,
          cutoffScore,
          score,
          status,
          retestStatus,
          retestDate,
          teacherNote,
          vocabSetId,
          vocabCutoff: isVocabTest ? vocabCutoff : null,
          practiceCutoff: isPracticeTest ? practiceCutoff : null,
          questions: isPracticeTest ? practiceQuestions : null,
          practiceResult: null,
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

    this.renderAdminDashboard();
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
    ['testDetailModal', 'adminTestFormModal', 'vocabSetModal'].forEach(id => {
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

    const results = AppData.getVocabTestResults();
    const tests = AppData.getTests().filter(test => test.type === 'VOCAB');
    const students = AppData.getStudents();
    const sets = AppData.getVocabSets();

    // 결과의 실제 응시 시작일(startedAt)을 기준으로 날짜별로 묶습니다.
    // 아직 결과가 없는 일정도 날짜 위젯에서 확인할 수 있도록 시험일도 포함합니다.
    const dateSet = new Set();

    tests.forEach(test => {
      if (test.date) dateSet.add(test.date);
    });

    results.forEach(result => {
      const date = this.getVocabResultDate(result);
      if (date) dateSet.add(date);
    });

    const dates = Array.from(dateSet).sort((a, b) => b.localeCompare(a));

    if (dates.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center text-slate-400">
          <i class="fa-solid fa-calendar-days text-4xl mb-3 opacity-30"></i>
          <p class="text-sm font-semibold">아직 등록된 단어 테스트 일정이나 결과가 없습니다.</p>
          <p class="text-xs mt-1">시험 일정에서 단어 테스트를 추가하면 날짜별 결과가 여기에 표시됩니다.</p>
        </div>`;
      return;
    }

    if (!this.state.vocabResultSelectedDate || !dates.includes(this.state.vocabResultSelectedDate)) {
      this.state.vocabResultSelectedDate = dates[0];
    }

    const selectedDate = this.state.vocabResultSelectedDate;

    const dateCardsHtml = dates.map(date => {
      const dateResults = results.filter(result => this.getVocabResultDate(result) === date);
      const dateTests = tests.filter(test => test.date === date);
      const uniqueStudentIds = new Set([
        ...dateResults.map(result => Number(result.studentId)),
        ...dateTests.map(test => Number(test.studentId))
      ]);
      const passed = dateResults.filter(result => result.passed).length;
      const resultCount = dateResults.length;
      const isSelected = date === selectedDate;
      const [, month, day] = date.split('-');

      return `
        <button onclick="App.selectVocabResultDate('${date}')"
          class="text-left rounded-2xl border-2 p-4 transition ${isSelected
            ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">시험 결과</p>
              <p class="text-2xl font-black text-slate-900 mt-0.5">${Number(month)}/${Number(day)}</p>
            </div>
            <span class="w-9 h-9 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center">
              <i class="fa-solid fa-calendar-check"></i>
            </span>
          </div>
          <div class="mt-3 flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">학생 ${uniqueStudentIds.size}명</span>
            <span class="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">통과 ${passed}명</span>
            <span class="px-2 py-1 rounded-lg bg-violet-50 text-violet-700 text-[11px] font-bold">결과 ${resultCount}건</span>
          </div>
        </button>`;
    }).join('');

    const selectedTests = tests.filter(test => test.date === selectedDate);
    const selectedResults = results.filter(result => this.getVocabResultDate(result) === selectedDate);

    // 선택 날짜에 실제로 존재하는 학생/시험을 기준으로 카드 생성합니다.
    // 결과가 없는 학생은 미응시로 표시합니다.
    const studentCards = students.map(student => {
      const studentTests = selectedTests.filter(test => Number(test.studentId) === Number(student.id));
      const studentResults = selectedResults.filter(result => Number(result.studentId) === Number(student.id));

      if (studentTests.length === 0 && studentResults.length === 0) return '';

      if (studentResults.length === 0) {
        const testNames = studentTests.map(test => this.escapeHtml(test.title || '단어 테스트')).join(', ');
        return `
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-extrabold text-slate-900">${this.escapeHtml(student.name)}</p>
                <p class="text-[11px] text-slate-500 mt-0.5">${testNames || '단어 테스트'}</p>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold">미응시</span>
            </div>
          </div>`;
      }

      const resultHtml = studentResults.map(result => {
        const test = tests.find(item => item.id === result.testId);
        const set = sets.find(item => item.id === result.setId);
        const directionLabel = Number(result.direction) === 1 ? '한글 → 영어' : '영어 → 한글';
        const wrongAnswers = result.wrongAnswers || [];
        const attemptCount = result.attempts ? result.attempts.length : 1;
        const completedTime = this.getVocabResultTimeString(result);

        return `
          <div class="rounded-xl border ${result.passed ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'} p-3.5 space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p class="font-bold text-slate-900 text-sm">${this.escapeHtml(test?.title || '단어 테스트')}</p>
                <p class="text-[11px] text-slate-500 mt-0.5">${this.escapeHtml(set?.title || '연결된 단어 세트')} · ${directionLabel}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-black ${result.passed ? 'text-emerald-700' : 'text-amber-700'}">${result.score}점</p>
                <span class="text-[11px] font-bold ${result.passed ? 'text-emerald-700' : 'text-amber-700'}">${result.passed ? 'PASS' : '재응시 가능'}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
              <span>정답 ${result.correctCount ?? '-'} / ${result.total ?? '-'}문제</span>
              <span>·</span>
              <span>${attemptCount}회 응시</span>
              <span>·</span>
              <span>${completedTime}</span>
            </div>
            ${wrongAnswers.length ? `
              <details class="text-xs pt-1">
                <summary class="cursor-pointer font-bold text-rose-600">오답 ${wrongAnswers.length}개 보기</summary>
                <div class="mt-2 space-y-1.5">
                  ${wrongAnswers.map((wrong, index) => `
                    <div class="rounded-lg bg-white/80 p-2 border border-rose-100">
                      <strong>${index + 1}. ${this.escapeHtml(wrong.question)}</strong><br>
                      <span class="text-rose-600">학생 답: ${this.escapeHtml(wrong.answer)}</span><br>
                      <span class="text-emerald-700">정답: ${this.escapeHtml(wrong.correct)}</span>
                    </div>`).join('')}
                </div>
              </details>` : '<p class="text-xs font-semibold text-emerald-700">오답 없음</p>'}
          </div>`;
      }).join('');

      return `
        <div class="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <p class="font-extrabold text-slate-900">${this.escapeHtml(student.name)}</p>
              <p class="text-[11px] text-slate-400">학생 #${student.id}</p>
            </div>
          </div>
          <div class="space-y-2">${resultHtml}</div>
        </div>`;
    }).filter(Boolean).join('');

    container.innerHTML = `
      <div class="glass-card rounded-2xl p-5 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-calendar-days text-indigo-600"></i>
              날짜별 단어 테스트 결과
            </h3>
            <p class="text-xs text-slate-500 mt-1">날짜를 선택하면 해당 날짜의 각 학생 시험 결과를 확인할 수 있습니다.</p>
          </div>
          <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">${dates.length}개 날짜</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">${dateCardsHtml}</div>
      </div>

      <div class="glass-card rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-bold text-indigo-600">선택한 날짜</p>
            <h3 class="text-xl font-black text-slate-900 mt-0.5">${this.formatVocabResultDateLong(selectedDate)}</h3>
          </div>
          <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">${selectedResults.length}건 결과</span>
        </div>
        ${studentCards || `
          <div class="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center text-slate-400">
            <i class="fa-solid fa-user-clock text-3xl mb-2 opacity-30"></i>
            <p class="text-sm font-semibold">이 날짜에는 표시할 학생 결과가 없습니다.</p>
          </div>`}
      </div>

      <div class="glass-card rounded-2xl p-5 space-y-3">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-book text-violet-600"></i>
              단어 세트
            </h3>
            <p class="text-xs text-slate-500 mt-1">단어 세트 자체의 수정/삭제는 여기서 계속 관리합니다.</p>
          </div>
          <button onclick="App.openVocabSetModal()" class="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition">
            <i class="fa-solid fa-plus mr-1"></i> 새 단어 세트
          </button>
        </div>
        ${sets.length ? `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            ${sets.map(set => {
              const assignedNames = (set.studentIds || [])
                .map(id => students.find(st => st.id === id)?.name || '')
                .filter(Boolean).join(', ');
              return `
                <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-bold text-slate-900 text-sm">${this.escapeHtml(set.title)}</p>
                      <p class="text-[11px] text-slate-500 mt-1">${(set.words || []).length}개 단어 · ${this.escapeHtml(assignedNames || '배정 학생 없음')}</p>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button onclick="App.openVocabSetModal('${set.id}')" class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-bold hover:bg-slate-100">수정</button>
                      <button onclick="App.confirmDeleteVocabSet('${set.id}')" class="px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-bold hover:bg-rose-100">삭제</button>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>` : `
          <div class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">등록된 단어 세트가 없습니다.</div>`}
      </div>`;
  },

  selectVocabResultDate(date) {
    this.state.vocabResultSelectedDate = date;
    this.renderAdminVocabTab();
  },

  getVocabResultDate(result) {
    // 1. 배정된 시험 일정이 있는 경우 해당 시험의 날짜(test.date)를 최우선 기준일로 사용
    if (result?.testId) {
      const test = AppData.getTests().find(item => item.id === result.testId);
      if (test?.date) return test.date;
    }

    // 2. 시험 일정이 없는 자율 테스트의 경우 응시 시작(startedAt) 또는 완료(completedAt) 시점 기준
    const targetTimestamp = result?.startedAt || result?.completedAt;
    if (targetTimestamp) {
      const date = new Date(targetTimestamp);
      if (!Number.isNaN(date.getTime())) {
        return this.formatDate(date);
      }
    }

    return '';
  },

  getVocabResultTimeString(result) {
    const resultTime = result?.startedAt || result?.completedAt;
    if (!resultTime) return '-';
    const resultDateObj = new Date(resultTime);
    if (Number.isNaN(resultDateObj.getTime())) return '-';

    const timeStr = resultDateObj.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const resultTargetDate = this.getVocabResultDate(result);
    const actualDateStr = this.formatDate(resultDateObj);

    if (resultTargetDate && actualDateStr > resultTargetDate) {
      return `다음날 ${timeStr}`;
    }
    return timeStr;
  },

  formatVocabResultDateLong(dateString) {
    const [year, month, day] = String(dateString).split('-').map(Number);
    if (!year || !month || !day) return dateString;
    return `${year}년 ${month}월 ${day}일`;
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
      ? Array.from(document.querySelectorAll('input[name="formStudentCheckbox"]:checked')).map(cb => Number(cb.value))
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
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);
    const result = AppData.getVocabTestResult(studentId, set.id, direction, testId);
    // 관리자가 본시험 결과를 통과로 처리한 일정은 두 방향 모두 완료로 표시한다.
    if (scheduledTest?.status === 'PASS' || result?.passed) {
      return `
        <div class="w-full py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2">
          <i class="fa-solid fa-circle-check"></i> ${label} · 완료
        </div>`;
    }
    const timeStatus = scheduledTest && this.getTestTimeStatus(scheduledTest);
    if (scheduledTest && !timeStatus.canStart) {
      const unavailableLabel = timeStatus.status === 'EXPIRED'
        ? '응시 시간 종료'
        : (timeStatus.status === 'NOT_STARTED' ? '응시 시작 전' : '응시 불가');
      return `
        <button onclick="App.notifyUnavailableVocabTest('${timeStatus.status}')" class="w-full py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-clock"></i> ${label} · ${unavailableLabel}
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

  notifyExpiredVocabTest() {
    this.toast('응시 시간이 종료되었습니다. 단어장은 계속 확인할 수 있습니다.', 'info');
  },

  notifyUnavailableVocabTest(status) {
    if (status === 'EXPIRED') {
      this.notifyExpiredVocabTest();
      return;
    }
    if (status === 'NOT_STARTED') {
      this.toast('아직 응시 시작 시간이 아닙니다.', 'info');
      return;
    }
    this.toast('이미 완료되어 응시할 수 없습니다.', 'info');
  },

  // ── 학생: 단어 테스트 시작 ──────────────────────────────
  startVocabTest(setId, studentId, direction, testId = null) {
    const set = AppData.getVocabSets().find(s => s.id === setId);
    if (!set || set.words.length < 5) { this.toast('단어가 부족합니다. (최소 5개)', 'error'); return; }
    if (![1, 2].includes(direction)) { this.toast('올바른 테스트 방향이 아닙니다.', 'error'); return; }
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);
    if (scheduledTest) {
      const timeStatus = this.getTestTimeStatus(scheduledTest);
      if (!timeStatus.canStart) {
        this.notifyUnavailableVocabTest(timeStatus.status);
        return;
      }
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

    const startedAt = new Date().toISOString();
    const testWords = this.selectVocabTestWords(set.words);
    this.state.vocabTest = {
      setId,
      studentId: Number(studentId),
      setTitle: set.title,
      testId,
      startedAt,
      allWords: testWords,
      sourceWordCount: set.words.length,
      direction,
      questions: this.buildVocabQuestions(testWords, direction, set.words),
      currentIndex: 0,
      score: 0,
      timerId: null,
      timeRemaining: 7,
      isCompleted: false
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
        <span id="vocabTestTimer" class="ml-auto px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-base sm:text-lg font-black"><i class="fa-regular fa-clock mr-1"></i>7초</span>
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
    vt.timeRemaining = 7;
    const timer = document.getElementById('vocabTestTimer');
    if (timer) timer.innerHTML = '<i class="fa-regular fa-clock mr-1"></i>7초';
    vt.timerId = setInterval(() => {
      vt.timeRemaining--;
      const timerEl = document.getElementById('vocabTestTimer');
      if (timerEl) timerEl.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>${vt.timeRemaining}초`;
      if (vt.timeRemaining <= 0) this.submitVocabAnswer(null, true);
    }, 1000);
  },

  clearVocabQuestionTimer() {
    if (this.state.vocabTest && this.state.vocabTest.timerId) {
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
    if (isCorrect) vt.score++;

    // 정답/오답을 알려주지 않고 선택한 버튼만 살짝 표시 후 즉시 다음 문제로 전환
    q.choices.forEach((choice, i) => {
      const btn = document.getElementById(`vocabChoice_${i}`);
      if (!btn) return;
      btn.disabled = true;
      if (!timedOut && i === choiceIndex) {
        btn.className = 'vocab-choice-btn w-full p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 text-sm font-bold text-indigo-900 transition text-left flex items-center gap-3';
      }
    });

    // 딜레이 없이 빠르게 다음 문제로 이동 (150ms 부드러운 전환)
    setTimeout(() => {
      vt.currentIndex++;
      if (vt.currentIndex < vt.questions.length) {
        this.renderVocabQuestion();
      } else {
        this.renderVocabResult();
      }
    }, 120);
  },

  async renderVocabResult() {
    const vt = this.state.vocabTest;
    this.clearVocabQuestionTimer();
    vt.isCompleted = true;
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
    const completedAt = new Date().toISOString();
    const startedAt = vt.startedAt || completedAt;
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
        startedAt,
        completedAt
      });
      if (test) await this.updateVocabScheduleStatus(test.id);
    } catch (error) {
      console.error('단어 테스트 결과 저장 오류:', error);
    }

    document.getElementById('vocabTestTopInfo').innerHTML = `
      <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(vt.setTitle)} — 테스트 완료</span>`;

    document.getElementById('vocabTestContent').innerHTML = `
      <div class="glass-card rounded-2xl p-6 sm:p-8 space-y-6 text-center max-w-2xl mx-auto">
        <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">
          <i class="fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        </div>

        <div>
          <h3 class="text-2xl font-black ${passed ? 'text-emerald-700' : 'text-rose-700'}">${passed ? '테스트 통과 (PASS)!' : '불합격 (FAIL)'}</h3>
          <p class="text-slate-500 text-sm mt-1">${directionLabel} · ${vt.score} / ${total} 정답</p>
          <div class="text-4xl font-black text-slate-900 mt-3">${score}점</div>
        </div>

        <div class="p-4 rounded-xl ${passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-amber-50 border border-amber-200 text-amber-800'} text-xs sm:text-sm font-semibold">
          ${passed ? `축하합니다! 커트라인(${cutoffScore}점)을 통과하여 테스트가 완료되었습니다.` : `커트라인(${cutoffScore}점)에 미달하였습니다. 10분 후 다시 도전할 수 있습니다.`}
        </div>

        <!-- 오답 노트 섹션 -->
        ${wrongAnswers.length > 0 ? `
          <div class="text-left space-y-3 pt-2">
            <h4 class="text-xs font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-wider">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>틀린 단어 오답 노트 (${wrongAnswers.length}개)</span>
            </h4>
            <div class="max-h-60 overflow-y-auto rounded-xl border border-rose-100 divide-y divide-slate-100 bg-rose-50/30 text-xs">
              ${wrongAnswers.map((item, idx) => `
                <div class="p-3 grid grid-cols-[auto_1fr_1fr] gap-2 items-center">
                  <span class="font-bold text-slate-400 w-6">${idx + 1}</span>
                  <div>
                    <span class="font-bold text-slate-800">${this.escapeHtml(item.question)}</span>
                    <div class="text-[11px] text-rose-600 mt-0.5">내가 고른 답: <strong>${this.escapeHtml(item.answer)}</strong></div>
                  </div>
                  <div class="text-right sm:text-left">
                    <span class="text-[11px] text-slate-500">정답:</span>
                    <span class="font-bold text-emerald-700 ml-1">${this.escapeHtml(item.correct)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold">
            🎉 모든 문제를 맞혔습니다! 완벽합니다.
          </div>
        `}

        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          ${passed ? '' : `<button disabled class="px-6 py-3 rounded-xl bg-slate-200 text-slate-500 font-bold flex items-center justify-center gap-2"><i class="fa-solid fa-clock"></i> 10분 후 재응시 가능</button>`}
          <button onclick="App.exitVocabTest()" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center justify-center gap-2 shadow-sm">
            <i class="fa-solid fa-arrow-left"></i> 학습공간으로 돌아가기
          </button>
        </div>
      </div>`;
  },

  async exitVocabTest() {
    const vt = this.state.vocabTest;
    if (vt && !vt.isCompleted) {
      const confirmExit = confirm('⚠️ 시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 시험을 종료하고 나가시겠습니까?');
      if (!confirmExit) return;
      try {
        await this.forfeitVocabTest();
      } catch (err) {
        console.error(err);
      }
    }
    this.clearVocabQuestionTimer();
    const studentId = Number(vt?.studentId || this.state.selectedStudentId || this.state.adminSelectedStudentId || 1);
    this.state.vocabTest = null;
    
    if (this.state.isStudentLoggedIn) {
      this.selectStudent(studentId);
    } else if (this.state.isAdminLoggedIn) {
      this.selectStudent(studentId);
    } else {
      if (studentId && AppData.getStudentById(studentId)) {
        this.state.isStudentLoggedIn = true;
        this.selectStudent(studentId);
      } else {
        this.showLanding();
      }
    }
  },

  async forfeitVocabTest() {
    const vt = this.state.vocabTest;
    if (!vt || vt.isCompleted) return;
    this.clearVocabQuestionTimer();
    vt.isCompleted = true;

    const total = vt.allWords.length;
    const test = vt.testId && AppData.getTests().find(item => item.id === vt.testId);
    const completedAt = new Date().toISOString();
    const startedAt = vt.startedAt || completedAt;

    const wrongAnswers = vt.questions.map(q => ({
      question: q.question,
      answer: q.answered || '중도 이탈',
      correct: q.correct
    }));

    try {
      await AppData.saveVocabTestResult({
        studentId: vt.studentId,
        setId: vt.setId,
        testId: vt.testId,
        direction: vt.direction,
        score: 0,
        correctCount: 0,
        total,
        passed: false,
        wrongAnswers,
        retryAvailableAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        startedAt,
        completedAt
      });
      if (test) await this.updateVocabScheduleStatus(test.id);
      this.toast('시험 중도 이탈로 0점(불합격) 처리되었습니다. (10분 후 재응시 가능)', 'error');
    } catch (error) {
      console.error(error);
    }
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
