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
    this.bindEvents();
    if (!this.restoreSession()) {
      this.renderLanding();
    }
  },

  saveSession(sessionData) {
    try {
      localStorage.setItem('yem_auth_session', JSON.stringify(sessionData));
    } catch (e) {
      console.warn('세션 저장 실패:', e);
    }
  },

  clearSession() {
    try {
      localStorage.removeItem('yem_auth_session');
    } catch (e) {
      console.warn('세션 삭제 실패:', e);
    }
  },

  restoreSession() {
    try {
      const raw = localStorage.getItem('yem_auth_session');
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (session && session.role === 'admin') {
        this.state.isAdminLoggedIn = true;
        this.state.isStudentLoggedIn = false;
        this.showAdminDashboard();
        return true;
      }
      if (session && session.role === 'student' && session.studentId) {
        const studentId = Number(session.studentId);
        this.state.isStudentLoggedIn = true;
        this.state.isAdminLoggedIn = false;
        this.state.selectedStudentId = studentId;
        this.selectStudent(studentId);
        return true;
      }
    } catch (e) {
      console.warn('세션 복원 실패:', e);
    }
    return false;
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
        // 단어 시험 진행 중 ESC로 나갈 때 경고 및 0점 불합격 포기 처리
        const vt = this.state.vocabTest;
        if (this.state.view === 'vocabTest' && vt && !vt.isCompleted) {
          if (confirm('시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 시험을 종료하고 나가시겠습니까?')) {
            this.forfeitVocabTest().then(() => {
              this.state.vocabTest = null;
              if (this.state.isStudentLoggedIn) {
                this.selectStudent(this.state.selectedStudentId);
              } else {
                this.showLanding();
              }
            });
          }
          return;
        }
        // 본문 암기 시험 진행 중에는 ESC로 닫히지 않고 경고
        const tmModal = document.getElementById('textMemorizeExamModal');
        if (tmModal && !tmModal.classList.contains('hidden') && this.state.textMemorizeExam && !this.state.textMemorizeExam.isCompleted) {
          if (confirm('시험 진행 중에 나가면 0점(불합격) 처리됩니다.\n\n정말 시험을 포기하고 나가시겠습니까?')) {
            this.forfeitTextMemorizeTest();
          }
          return;
        }
        this.closeAllModals();
      }
    });

    // 브라우저 뒤로가기(popstate) 감지: 단어시험 진행 중 뒤로가기 시 포기 confirm 처리
    window.addEventListener('popstate', async (e) => {
      const vt = this.state.vocabTest;
      if (this.state.view === 'vocabTest' && vt && !vt.isCompleted) {
        const confirmExit = confirm('시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 시험을 종료하고 나가시겠습니까?');
        if (confirmExit) {
          await this.forfeitVocabTest();
          this.state.vocabTest = null;
          if (this.state.isStudentLoggedIn) {
            this.selectStudent(this.state.selectedStudentId);
          } else {
            await this.showLanding();
          }
        } else {
          // 뒤로가기 취소 -> 시험 상태 유지
          history.pushState({ inVocabTest: true }, '');
        }
      }
    });

    // 본문암기 모달 배경 스크롤 차단 (휠/터치 이벤트 체이닝 방지)
    const tmModalEl = document.getElementById('textMemorizeExamModal');
    if (tmModalEl) {
      tmModalEl.addEventListener('wheel', (e) => {
        const bodyEl = document.getElementById('tmExamBody');
        if (!bodyEl || !bodyEl.contains(e.target)) {
          e.preventDefault();
          return;
        }
        const isAtTop = bodyEl.scrollTop <= 0;
        const isAtBottom = bodyEl.scrollTop + bodyEl.clientHeight >= bodyEl.scrollHeight - 1;
        if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
          e.preventDefault();
        }
      }, { passive: false });
    }

    // 시험 진행 중 페이지 이탈(새로고침, 탭 닫기) 시 경고 및 포기 처리 (시험 진행 중일 때만 동작)
    window.addEventListener('beforeunload', (e) => {
      const vt = this.state.vocabTest;
      if (this.state.view === 'vocabTest' && vt && vt.setId && !vt.isCompleted) {
        this.forfeitVocabTest();
        e.preventDefault();
        e.returnValue = '시험 진행 중 페이지를 벗어나면 불합격(0점) 처리됩니다.';
      }
      const pt = this.state.practiceTest;
      if (this.state.view === 'practiceTest' && pt && pt.testId && !pt.isCompleted) {
        this.forceFailPracticeTest();
        e.preventDefault();
        e.returnValue = '시험 진행 중 페이지를 벗어나면 0점 불합격 처리됩니다.';
      }
      const tm = this.state.textMemorizeExam;
      if (tm && tm.testId && !tm.isCompleted) {
        this.forfeitTextMemorizeTest();
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
          // 본문 암기 시험 진행 중 배경 클릭 → 포기 confirm
          if (overlay.id === 'textMemorizeExamModal' && this.state.textMemorizeExam && !this.state.textMemorizeExam.isCompleted) {
            if (confirm('시험 진행 중에 나가면 0점(불합격) 처리됩니다.\n\n정말 시험을 포기하고 나가시겠습니까?')) {
              this.forfeitTextMemorizeTest();
            }
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
  async checkAndConfirmVocabTestExit() {
    const vt = this.state.vocabTest;
    if (this.state.view === 'vocabTest' && vt && !vt.isCompleted) {
      const confirmExit = confirm('시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 시험을 종료하고 나가시겠습니까?');
      if (!confirmExit) return false;
      try {
        await this.forfeitVocabTest();
      } catch (err) {
        console.error(err);
      }
      this.state.vocabTest = null;
    }
    return true;
  },

  async handleLogoClick() {
    if (!(await this.checkAndConfirmVocabTestExit())) return;
    if (this.state.isAdminLoggedIn) {
      this.showAdminDashboard();
    } else if (this.state.isStudentLoggedIn) {
      this.selectStudent(this.state.selectedStudentId);
    } else {
      await this.showLanding();
    }
  },

  async showLanding() {
    if (!(await this.checkAndConfirmVocabTestExit())) return;
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

  async logoutStudent() {
    if (!(await this.checkAndConfirmVocabTestExit())) return;
    this.clearSession();
    this.state.isStudentLoggedIn = false;
    this.toast('로그아웃되었습니다.', 'info');
    await this.showLanding();
  },

  async selectStudent(studentId) {
    const normalizedStudentId = Number(studentId);
    if (!this.state.isAdminLoggedIn && !this.state.isStudentLoggedIn) {
      this.toast('로그인한 후 이용해주세요.', 'info');
      await this.showLanding();
      return;
    }

    if (this.state.view === 'vocabTest' && this.state.vocabTest && !this.state.vocabTest.isCompleted) {
      if (!(await this.checkAndConfirmVocabTestExit())) return;
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

  async showAdminDashboard() {
    if (!(await this.checkAndConfirmVocabTestExit())) return;
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
    const password = (passwordInput?.value || '').trim();
    const errorEl = document.getElementById('loginError');
    const normalizedLoginId = loginId.toLocaleLowerCase('en-US');

    if (!loginId) {
      if (errorEl) errorEl.classList.remove('hidden');
      this.toast('아이디(또는 이름)를 입력해주세요.', 'error');
      return false;
    }

    if (!password) {
      if (errorEl) errorEl.classList.remove('hidden');
      this.toast('비밀번호 숫자 4자리를 입력해주세요.', 'error');
      return false;
    }

    // 선생님 관리자 로그인 확인 (admin / 1357 또는 선생님 / 1357)
    const isTeacherId = (
      normalizedLoginId === TEACHER_LOGIN_ID.toLocaleLowerCase('en-US') ||
      loginId === '선생님' ||
      loginId === '관리자' ||
      loginId === '교사'
    );

    if (isTeacherId && password === TEACHER_PASSWORD) {
      this.state.isAdminLoggedIn = true;
      this.state.isStudentLoggedIn = false;
      this.saveSession({ role: 'admin' });
      if (errorEl) errorEl.classList.add('hidden');
      this.toast('선생님 관리자 모드로 로그인되었습니다.', 'success');
      this.showAdminDashboard();
      return false;
    }

    // 학생 목록에서 아이디 또는 이름으로 검색
    const students = AppData.getStudents();
    const student = students.find(item => {
      const matchId = String(item.loginId || '').trim().toLocaleLowerCase('en-US') === normalizedLoginId;
      const matchName = String(item.name || '').trim() === loginId;
      return (matchId || matchName) && String(item.password || '').trim() === password;
    });

    if (!student) {
      if (errorEl) {
        errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i>아이디 또는 비밀번호가 일치하지 않습니다.';
        errorEl.classList.remove('hidden');
      }
      this.toast('아이디(이름) 또는 비밀번호를 다시 확인해주세요.', 'error');
      return false;
    }

    if (errorEl) errorEl.classList.add('hidden');
    this.state.isStudentLoggedIn = true;
    this.state.isAdminLoggedIn = false;
    this.state.selectedStudentId = Number(student.id);
    this.saveSession({ role: 'student', studentId: Number(student.id), name: student.name });
    this.toast(`${student.name} 학생, 환영합니다! 👋`, 'success');
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
          <p class="text-[11px] text-slate-500 mt-0.5">${retestNeeded > 0 ? '재시험 대비 필수' : '재시험 없음'}</p>
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

    // 무조건 일반 시험 -> 문제풀이 시험 -> 단어 시험 순서로 정렬
    const typeOrder = { 'REGULAR': 1, 'PRACTICE': 2, 'VOCAB': 3 };
    dayTests.sort((a, b) => {
      const orderA = typeOrder[a.type] || 1;
      const orderB = typeOrder[b.type] || 1;
      return orderA - orderB;
    });

    let testsHtml = '';
    dayTests.forEach(test => {
      if (test.type === 'VOCAB') {
        if (test.date === dateStr) {
          const isMockSpecial = Boolean(test.isMockSpecial || (test.title && (test.title.includes('9모') || test.title.includes('모의고사'))));
          const badgeStyle = this.getTestBadgeStyle(test, false);
          const isCompleted = badgeStyle.tag === '완료';

          if (isMockSpecial) {
            // 🔥 2026 9모 대비 특별 단어 시험: 눈에 확 띄는 화려한 불꽃 그라데이션 뱃지
            testsHtml += `
              <div onclick="App.openVocabTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-black flex items-center justify-between gap-1 shadow-sm ${isCompleted ? 'bg-emerald-600 text-white border border-emerald-400' : 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white border border-amber-300 ring-1 ring-amber-300/80 animate-pulse'}" title="2026 고1 9모 대비 특별 단어 테스트">
                <div class="truncate flex items-center gap-1">
                  <span><i class="fa-solid fa-fire-flame-curved text-amber-200"></i></span>
                  <span class="truncate font-black">[9모대비] ${this.escapeHtml(test.title || '단어 테스트')}</span>
                </div>
                <span class="text-[9px] bg-white/30 px-1 rounded font-black flex-shrink-0">${isCompleted ? '완료' : '필출'}</span>
              </div>`;
          } else {
            const vocabCalendarLabel = '단어 테스트';
            testsHtml += `
              <div onclick="App.openVocabTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center gap-1 shadow-xs ${badgeStyle.class}" title="단어 테스트">
                <div class="truncate flex items-center gap-1"><span><i class="fa-solid fa-spell-check"></i></span><span class="truncate">${vocabCalendarLabel}</span></div>
              </div>`;
          }
        }
        return;
      }
      if (test.type === 'PRACTICE') {
        if (test.date === dateStr) {
          const badgeStyle = this.getTestBadgeStyle(test, false);
          testsHtml += `
            <div onclick="App.openPracticeTestScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center gap-1 shadow-xs ${badgeStyle.class}" title="문제풀이 시험 확인 및 응시">
              <div class="truncate flex items-center gap-1"><span><i class="fa-solid fa-pen-to-square"></i></span><span class="truncate">${this.escapeHtml(test.title || '문제풀이 시험')}</span></div>
            </div>`;
        }
        return;
      }
      if (test.type === 'TEXT_MEMORIZE') {
        if (test.date === dateStr) {
          const badgeStyle = this.getTestBadgeStyle(test, false);
          let bookIconColor = 'text-blue-600';
          if (badgeStyle.tag === '완료' || test.status === 'PASS') {
            bookIconColor = 'text-emerald-600';
          } else if (test.allowRetest || badgeStyle.tag === '재시험대기' || test.retestStatus === 'RETEST_PENDING') {
            bookIconColor = 'text-amber-600';
          } else if (badgeStyle.tag === '불합격' || test.status === 'FAIL') {
            bookIconColor = 'text-rose-600';
          }
          testsHtml += `
            <div onclick="App.openTextMemorizeScheduleModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center gap-1 shadow-xs ${badgeStyle.class}" title="본문암기 시험">
              <div class="truncate flex items-center gap-1">
                <span><i class="fa-solid fa-book-open ${bookIconColor}"></i></span>
                <span class="truncate">${this.escapeHtml(test.title || '본문암기')}</span>
              </div>
            </div>`;
        }
        return;
      }
      const isRetestDay = test.retestDate === dateStr && test.date !== dateStr;
      const badgeStyle = this.getTestBadgeStyle(test, isRetestDay);
      
      testsHtml += `
        <div onclick="App.openTestDetailModal('${test.id}')" class="test-event-pill px-1.5 py-1 rounded-md mb-1 font-semibold flex items-center gap-1 shadow-xs ${badgeStyle.class}" title="클릭하여 상세 정보 확인">
          <div class="truncate flex items-center gap-1">
            <span>${badgeStyle.icon}</span>
            <span class="truncate">${this.escapeHtml(test.title)}</span>
          </div>
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
        return { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', icon: '', tag: '재시험 통과' };
      } else if (test.retestStatus === 'RETEST_FAIL') {
        return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '', tag: '재시험 불합격' };
      } else {
        return { class: 'bg-amber-100 text-amber-800 border border-amber-300', icon: '', tag: '재시험 예정' };
      }
    }

    // 1. 통과/완료된 시험은 응시 가능 시간 여부와 무관하게 무조건 '완료'
    const tmResult = (test.type === 'TEXT_MEMORIZE') ? AppData.getTextMemorizeResult(test.studentId, test.id) : null;
    if (test.status === 'PASS' || test.retestStatus === 'RETEST_PASS' || test.practiceResult?.passed || tmResult?.passed) {
      return { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', icon: '', tag: '완료' };
    }

    // 단어 테스트 마감 처리
    if (test.type === 'VOCAB') {
      if (this.getTestTimeStatus(test).status === 'EXPIRED') {
        return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '', tag: '마감' };
      }
    }

    // 본문 암기 또는 일반 시험 불합격/재시험 처리
    if (test.status === 'FAIL' || (tmResult && !tmResult.passed)) {
      if (test.retestStatus === 'RETEST_PENDING' || test.allowRetest) {
        return { class: 'bg-amber-100 text-amber-800 border border-amber-300', icon: '', tag: '재시험 허용' };
      } else {
        return { class: 'bg-rose-100 text-rose-800 border border-rose-300', icon: '', tag: '불합격' };
      }
    } else {
      return { class: 'bg-blue-100 text-blue-800 border border-blue-200', icon: '', tag: '예정' };
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
      const dDayBadge = this.getTestDDayBadge(test);
      const badge = this.getTestBadgeStyle(test);
      const detailHandler = test.type === 'VOCAB'
        ? `App.openVocabTestScheduleModal('${test.id}')`
        : (test.type === 'PRACTICE'
            ? `App.openPracticeTestScheduleModal('${test.id}')`
            : (test.type === 'TEXT_MEMORIZE'
                ? `App.openTextMemorizeScheduleModal('${test.id}')`
                : `App.openTestDetailModal('${test.id}')`));

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
              <span class="text-xs font-bold px-2 py-0.5 rounded ${dDayBadge.class}">${dDayBadge.text}</span>
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
    if (test.type === 'TEXT_MEMORIZE') {
      this.openTextMemorizeScheduleModal(testId);
      return;
    }

    const student = AppData.getStudentById(test.studentId);
    const dDayBadge = this.getTestDDayBadge(test);

    document.getElementById('detailModalStudentBadge').innerText = student ? `${student.name} 학생` : '학생 시험 상세';
    document.getElementById('detailModalTitle').innerText = test.title;

    // 본시험 상태 포맷팅
    let statusBadge = '';
    if (test.status === 'PASS') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">1차 본시험 통과 (PASS)</span>';
    } else if (test.status === 'FAIL') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">1차 본시험 불합격 (FAIL)</span>';
    } else {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">시험 예정</span>';
    }

    // 재시험 상태 포맷팅
    let retestBadge = '';
    if (test.retestStatus === 'RETEST_PASS') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">재시험 통과 완료</span>';
    } else if (test.retestStatus === 'RETEST_FAIL') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">재시험 불합격</span>';
    } else if (test.retestStatus === 'RETEST_PENDING') {
      retestBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">재시험 대기 중</span>';
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
        <span class="px-3 py-1 rounded-full text-xs ${dDayBadge.class}">${dDayBadge.text}</span>
      </div>

      <!-- Scope Section -->
      <div class="space-y-1.5">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <i class="fa-solid fa-book-open text-indigo-500"></i>
          <span>시험 범위 및 상세 설명</span>
        </h4>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">${this.escapeHtml((test.scope || '별도의 시험 범위 설명이 등록되지 않았습니다.').trim())}</div>
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

      ${Boolean(this.state.isAdminLoggedIn) ? `
        <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button onclick="App.openRescheduleModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-calendar-days"></i> 일정 이동
          </button>
          <button onclick="App.openExtendTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-clock-rotate-left"></i> 시간 연장
          </button>
          <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-pen-to-square"></i> 전체 수정
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
    if (!test) { this.toast('시험 정보를 찾을 수 없습니다.', 'error'); return; }

    const setIds = Array.isArray(test.vocabSetIds) && test.vocabSetIds.length > 0
      ? test.vocabSetIds
      : (test.vocabSetId ? [test.vocabSetId] : []);
    const allSets = AppData.getVocabSets();
    const matchingSets = setIds.map(id => allSets.find(s => s.id === id)).filter(Boolean);

    if (matchingSets.length === 0) { this.toast('연결된 단어 세트를 찾을 수 없습니다.', 'error'); return; }

    // 단어 병합
    const combinedWords = [];
    matchingSets.forEach(s => {
      if (Array.isArray(s.words)) combinedWords.push(...s.words);
    });

    const primaryBook = matchingSets[0]?.book || '기본 단어장';
    const setTitles = matchingSets.map(s => s.title).join(' + ');
    const set = {
      id: matchingSets.map(s => s.id).join(','),
      book: primaryBook,
      title: setTitles,
      words: combinedWords
    };

    const isAdmin = Boolean(this.state.isAdminLoggedIn);
    const student = AppData.getStudentById(test.studentId);
    const timeStatus = this.getTestTimeStatus(test);
    const isPassed = test.status === 'PASS';
    const isFailed = test.status === 'FAIL';
    const statusBadge = isPassed
      ? { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', label: '완료' }
      : (isFailed
          ? { class: 'bg-rose-100 text-rose-800 border border-rose-300', label: '불합격 (FAIL)' }
          : (test.allowLate
              ? { class: 'bg-emerald-100 text-emerald-800', label: '상시 응시 허용됨' }
              : (timeStatus.status === 'EXPIRED'
                  ? { class: 'bg-rose-100 text-rose-800', label: '마감' }
                  : (timeStatus.status === 'NOT_STARTED'
                      ? { class: 'bg-blue-100 text-blue-800', label: '시작 전' }
                      : { class: 'bg-emerald-100 text-emerald-800', label: test.extendedDate ? '연장 진행 중' : '응시 가능' }))));
    const baseTimeStr = test.time ? (test.endTime ? `${test.time} ~ ${test.endTime}` : `${test.time}`) : (test.endTime ? `~ ${test.endTime}까지` : '23:59까지');
    const timeDisplay = test.extendedDate ? `${baseTimeStr} (연장: ~${test.extendedDate} ${test.extendedEndTime || '23:59'})` : baseTimeStr;

    const bookName = (primaryBook || '').trim();
    const hasSpecialBook = bookName && bookName !== '기본 단어장';

    document.getElementById('detailModalStudentBadge').innerText = student ? `${student.name} 학생 · 단어 테스트` : '단어 테스트';
    document.getElementById('detailModalTitle').innerText = test.title || (hasSpecialBook ? `[${bookName}] ${set.title}` : set.title);
    document.getElementById('detailModalBody').innerHTML = `
      ${isFailed ? `
        <div class="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs flex items-center justify-between gap-2 flex-wrap mb-1">
          <div class="flex items-center gap-2 text-rose-900 font-bold">
            <i class="fa-solid fa-circle-exclamation text-rose-600 text-sm"></i>
            <span>이 시험은 불합격 (FAIL) 처리되었습니다. 아래에서 재시험에 도전하세요.</span>
          </div>
          ${test.score ? `<span class="px-2 py-0.5 rounded-md bg-white text-rose-700 font-bold border border-rose-200 text-[11px]">${this.escapeHtml(test.score)}</span>` : ''}
        </div>
      ` : ''}

      <div class="p-4 rounded-2xl bg-violet-50 border border-violet-200">
        <div class="flex items-center justify-between gap-2 flex-wrap mb-1.5">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${hasSpecialBook ? `
              <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-600 text-white shadow-2xs inline-flex items-center gap-1">
                <i class="fa-solid fa-book text-[9px]"></i> ${this.escapeHtml(bookName)}
              </span>
            ` : ''}
            <p class="text-xs sm:text-sm font-black text-violet-950">${this.escapeHtml(set.title)}</p>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-extrabold ${statusBadge.class}">
            ${statusBadge.label}
          </span>
        </div>
        <p class="text-xs text-slate-600 mt-1">
          시험일: <strong>${test.date}</strong>${
            test.extendedDate
              ? ` · 마감: <strong>${test.extendedDate} ${test.extendedEndTime || '23:59'} (연장됨)</strong>`
              : (test.endTime ? ` · 마감: <strong>${test.endTime}</strong>` : '')
          } · <strong>${matchingSets.length > 1 ? `총 ${matchingSets.length}개 세트 · ${set.words.length}단어 (40단어 랜덤 출제)` : (set.words.length > 40 ? `${set.words.length}단어 (40단어 랜덤 출제)` : `${set.words.length}개 단어`)}</strong>
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
                ${test.allowLate ? '상시 응시 허용 중 (마감 없음)' : `원래 시험일: ${test.date}${test.extendedDate ? ` · 마감: ${test.extendedDate} ${test.extendedEndTime || '23:59'} (연장)` : (test.endTime ? ` · 마감: ${test.endTime}` : '')}`}
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
          ${set.words.map((word, index) => `
            <div class="grid grid-cols-[2rem_1fr_1fr_auto] items-center gap-2 p-2.5 sm:p-3 text-xs hover:bg-slate-50 transition">
              <span class="font-bold text-slate-400">${index + 1}</span>
              <strong class="text-slate-800 break-words">${this.escapeHtml(word.en)}</strong>
              <span class="text-slate-600 break-words">${this.escapeHtml(word.ko)}</span>
              <button type="button" onclick="App.playDictionaryAudio('${this.escapeHtml(word.en)}'); event.stopPropagation();" class="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition flex-shrink-0" title="발음 듣기">
                <i class="fa-solid fa-volume-high text-[11px]"></i>
              </button>
            </div>`).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        ${this.renderVocabTestButton(set, test.studentId, 2, '객관식', 'bg-violet-600 hover:bg-violet-700 shadow-violet-200', test.id)}
        ${this.renderVocabTestButton(set, test.studentId, 3, '스펠링', 'bg-blue-600 hover:bg-blue-700 shadow-blue-200', test.id)}
        ${this.renderVocabTestButton(set, test.studentId, 4, '통합', 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200', test.id)}
      </div>

      ${isAdmin ? `
        <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button onclick="App.openRescheduleModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-calendar-days"></i> 일정 이동
          </button>
          <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-pen-to-square"></i> 전체 수정
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
    if (test.status === 'PASS' || test.retestStatus === 'RETEST_PASS' || test.practiceResult?.passed) {
      badge.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800';
      badge.innerText = '완료';
    } else if (test.allowLate) {
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
      badge.innerText = '응시 가능';
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

      this.toast(`'${test.title || '시험'}' 시험일(${test.date})은 유지되며 마감이 ${allowLate ? '상시 응시 가능으로' : `${extendedDate} ${extendedEndTime}까지`} 연장되었습니다!`, 'success');
      
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

      this.toast(`'${test.title || '시험'}' 시험일(${test.date})은 유지되며 마감이 ${targetDate} ${targetEndTime || '23:59'}까지 연장되었습니다.`, 'success');
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

  // ── 시험 일정 이동 모달 컨트롤러 (관리자용) ───────────────
  openRescheduleModal(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) {
      this.toast('시험을 찾을 수 없습니다.', 'error');
      return;
    }

    const student = AppData.getStudentById(test.studentId);
    document.getElementById('rescheduleTestId').value = test.id;
    document.getElementById('rescheduleStudentName').innerText = student ? `${student.name} 학생` : '학생 시험';
    document.getElementById('rescheduleTestTitle').innerText = test.title || (test.type === 'VOCAB' ? '단어 테스트' : '시험');
    document.getElementById('rescheduleModalSubtitle').innerText = `${student ? student.name : '학생'}의 시험 일정을 원하는 날짜로 이동합니다.`;

    const badgeEl = document.getElementById('rescheduleTestTypeBadge');
    if (badgeEl) {
      const typeLabel = test.type === 'VOCAB' ? '단어 테스트' : (test.type === 'TEXT_MEMORIZE' ? '본문 암기' : (test.type === 'PRACTICE' ? '문제 풀이' : '일반 시험'));
      badgeEl.innerText = typeLabel;
    }

    const currentScheduleText = `${test.date}${test.time ? ` (${test.time} ~ ${test.endTime || '23:59'})` : (test.endTime ? ` (~ ${test.endTime})` : '')}`;
    document.getElementById('rescheduleCurrentSchedule').innerText = currentScheduleText;

    // 인풋 기본값 세팅
    document.getElementById('rescheduleTargetDate').value = test.date || this.formatDate(new Date());
    document.getElementById('rescheduleTargetTime').value = test.time || '';
    document.getElementById('rescheduleTargetEndTime').value = test.endTime || '';

    this.showModal('rescheduleTestModal');
  },

  closeRescheduleModal() {
    this.hideModal('rescheduleTestModal');
  },

  setQuickRescheduleDate(daysFromNow) {
    const target = new Date();
    target.setDate(target.getDate() + Number(daysFromNow));
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const dateInput = document.getElementById('rescheduleTargetDate');
    if (dateInput) dateInput.value = dateStr;
  },

  async confirmRescheduleTest() {
    const testId = document.getElementById('rescheduleTestId')?.value;
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) {
      this.toast('시험 정보를 찾을 수 없습니다.', 'error');
      return;
    }

    const newDate = document.getElementById('rescheduleTargetDate')?.value;
    if (!newDate) {
      this.toast('이동할 새 시험 날짜를 선택해주세요.', 'warning');
      return;
    }

    const newTime = document.getElementById('rescheduleTargetTime')?.value || '';
    const newEndTime = document.getElementById('rescheduleTargetEndTime')?.value || '';

    const oldDate = test.date;
    test.date = newDate;
    if (newTime) test.time = newTime;
    if (newEndTime) test.endTime = newEndTime;

    // 만약 연장 날짜가 원래 날짜보다 이전이 되면 연장 정보 초기화
    if (test.extendedDate && test.extendedDate < newDate) {
      test.extendedDate = null;
      test.extendedEndTime = null;
    }

    try {
      await AppData.saveOrUpdateTest(test);
      this.toast(`'${test.title || '시험'}' 일정이 ${oldDate}에서 ${newDate}(으)로 이동되었습니다!`, 'success');
      this.closeRescheduleModal();

      // 열려있는 시험 상세 모달 닫기
      this.closeTestDetailModal();
      this.hideModal('textMemorizeExamModal');

      // 화면 갱신
      if (this.state.isAdminLoggedIn) {
        this.renderAdminTestsTab();
      }
      if (this.state.selectedStudentId) {
        this.renderStudentDashboard(this.state.selectedStudentId);
      }
    } catch (err) {
      console.error(err);
      this.toast('일정 이동 저장 중 오류가 발생했습니다.', 'error');
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

    // 1. 이미 통과(PASS)한 경우 시간과 무관하게 무조건 '완료' (COMPLETED)
    if (test.status === 'PASS' || test.retestStatus === 'RETEST_PASS' || test.practiceResult?.passed) {
      return { status: 'COMPLETED', label: '완료', canStart: false, message: '이미 통과한 시험입니다.' };
    }

    // 2. 재시험 허용된 문제풀이 시험은 본시험 종료시간이 지나도 언제든 재응시 가능
    if (test.type === 'PRACTICE' && test.allowRetest && test.practiceResult && !test.practiceResult.passed) {
      return { status: 'IN_PROGRESS', label: '재시험 응시 가능', canStart: true, message: '' };
    }

    if (test.allowLate) {
      return { status: 'IN_PROGRESS', label: '응시 가능 (상시 허용)', canStart: true, message: '' };
    }

    // 3. 마감이 지난 경우 (미통과 상태에서 시간 종료)
    if (now > endDateTime) {
      return {
        status: 'EXPIRED',
        label: '마감',
        canStart: false,
        message: '응시 시간이 마감되었습니다.'
      };
    }

    // 4. 단어 테스트(VOCAB)는 시험 날짜 이전이라도 언제든 사전 응시 가능
    if (test.type === 'VOCAB') {
      return {
        status: 'IN_PROGRESS',
        label: '응시 가능 (사전 응시 가능)',
        canStart: true,
        message: ''
      };
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
                    ${test.allowRetest ? '허용 중 — 학생이 재시험을 풀 수 있습니다.' : '현재 비허용 — 학생이 다시 풀 수 없습니다.'}
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
            <button onclick="App.openRescheduleModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-calendar-days"></i> 일정 이동
            </button>
            <button onclick="App.openExtendTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-clock-rotate-left"></i> 시간 연장
            </button>
            <button onclick="App.closeTestDetailModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-pen-to-square"></i> 전체 수정
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

            ${!result.passed ? (test.allowRetest ? `
              <!-- 재시험 허용 시 즉시 재시험 응시하기 버튼 노출 -->
              <button onclick="App.startPracticeTest('${test.id}')" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
                <i class="fa-solid fa-rotate-right"></i> 재시험 응시하기
              </button>
            ` : `
              <div class="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 text-xs text-center font-medium">
                <i class="fa-solid fa-book-open mr-1"></i>불합격 처리되었습니다. 아래에서 오답과 해설을 확인하고 복습하세요.
              </div>
            `) : ''}

            <!-- 풀이 답안 및 오답 해설 보기 (합격/불합격/재시험 관계없이 항상 확인 가능) -->
            <button onclick="App.viewPracticeTestResultDetail('${test.id}')" class="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
              <i class="fa-solid fa-file-circle-check text-indigo-400"></i> ${result.passed ? '풀이 답안 및 해설 보기' : '오답노트 및 정답·해설 보기'}
            </button>
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
      this.toast(newVal ? '학생의 재시험 응시가 허용되었습니다.' : '재시험 허용이 취소되었습니다.', newVal ? 'success' : 'info');
      
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

    const isRetest = Boolean(test.practiceResult && !test.practiceResult.passed && test.allowRetest);
    const timeStatus = this.getTestTimeStatus(test);

    // 재시험이 아닌 일반 최초 응시일 때만 본시험 시간 체크 (재시험은 종료 시간 무관하게 응시 가능)
    if (!isRetest && !timeStatus.canStart && !test.practiceResult) {
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

    // 재시험으로 응시하는 경우, 일회성 허용이므로 시작 즉시 allowRetest = false로 소진 처리
    if (test.allowRetest) {
      test.allowRetest = false;
      AppData.saveOrUpdateTest(test).catch(err => console.error('재시험 권한 일회성 소진 저장 오류:', err));
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
      startedAt: new Date().toISOString(),
      isCompleted: false
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

    pt.isCompleted = true;
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
              ${passed ? '축하합니다! 시험에 통과하였습니다.' : '아쉽게도 커트라인에 도달하지 못했습니다.'}
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
    this.state.practiceTest = {
      testId: test.id,
      studentId: Number(test.studentId),
      isCompleted: true
    };
    this.showPracticeTestView();
    this.renderPracticeResult(test.practiceResult, test);
  },

  // 시험 도중 나가기/창닫기 시 0점 불합격 강제 처리 (진행 중일 때만)
  forceFailPracticeTest() {
    const pt = this.state.practiceTest;
    if (!pt || !pt.testId || pt.isCompleted) return;

    const total = pt.questions?.length || 0;
    const completedAt = new Date().toISOString();
    const practiceResult = {
      studentId: pt.studentId,
      testId: pt.testId,
      score: 0,
      correctCount: 0,
      totalCount: total,
      passed: false,
      cutoffScore: pt.cutoffScore,
      answers: pt.answers || {},
      reviewItems: (pt.questions || []).map((q, idx) => ({
        questionNumber: idx + 1,
        question: q.question,
        passage: q.passage || '',
        choices: q.choices || [],
        studentAnswer: pt.answers?.[idx] || null,
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
    pt.isCompleted = true;
  },

  exitPracticeTest() {
    const pt = this.state.practiceTest;
    if (pt && pt.testId && !pt.isCompleted) {
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
      startedAt: null,
      isCompleted: false
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
    this.clearSession();
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
              <button onclick="App.openRescheduleModal('${test.id}')" class="text-indigo-600 hover:text-indigo-800 font-bold hover:underline ml-1" title="시험 일정 이동">
                [이동]
              </button>
              <button onclick="App.openExtendTestModal('${test.id}')" class="text-amber-600 hover:text-amber-800 font-bold hover:underline ml-0.5" title="마감 시간 연장">
                [연장]
              </button>
            </div>
          </td>

          <!-- 시험명 & 범위 -->
          <td class="py-3.5 px-4 max-w-xs">
            <div class="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer flex items-center gap-1.5" onclick="App.openTestDetailModal('${test.id}')">
              ${test.type === 'VOCAB' ? (test.isMockSpecial ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white">🔥 9모단어</span>' : '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-800">단어</span>') : (test.type === 'PRACTICE' ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">문제풀이</span>' : (test.type === 'TEXT_MEMORIZE' ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">본문암기</span>' : '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">일반</span>'))}
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
            ${test.type === 'PRACTICE' || test.type === 'TEXT_MEMORIZE' ? `
              <div class="flex items-center gap-1.5">
                <button onclick="App.${test.type === 'TEXT_MEMORIZE' ? 'toggleTextMemorizeAllowRetest' : 'togglePracticeTestAllowRetest'}('${test.id}')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${test.allowRetest ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}">
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
              <button onclick="App.openRescheduleModal('${test.id}')" class="p-1.5 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition" title="시험 일정 이동">
                <i class="fa-solid fa-calendar-days"></i>
              </button>
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

    // 처음엔 모두 해제 상태로 시작
    this.renderStudentCheckboxes([]);

    // 기본 폼 값 초기화
    document.getElementById('formTitle').value = '';
    document.getElementById('formDate').value = this.getTodayDateString();
    document.getElementById('formTime').value = '18:00';
    document.getElementById('formEndTime').value = '19:00';
    document.getElementById('formScope').value = '';
    document.getElementById('formCutoff').value = '90점 이상';
    if (document.getElementById('formVocabCutoff_2')) document.getElementById('formVocabCutoff_2').value = '80';
    if (document.getElementById('formVocabCutoff_3')) document.getElementById('formVocabCutoff_3').value = '80';
    if (document.getElementById('formVocabCutoff_4')) document.getElementById('formVocabCutoff_4').value = '80';
    if (document.getElementById('formIsMockSpecial')) document.getElementById('formIsMockSpecial').checked = false;
    document.getElementById('formPracticeCutoff').value = '80';
    document.getElementById('formScore').value = '';
    document.getElementById('formRetestDate').value = '';
    document.getElementById('formTeacherNote').value = '';
    this.renderFormVocabSetSelect('', '');
    this.initPracticeQuestionsForm([]);
    this.renderTextMemorizePassages('YBM(박준언) 공통영어 2', []);

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
    const testSetIds = Array.isArray(test.vocabSetIds) && test.vocabSetIds.length > 0 ? test.vocabSetIds : (test.vocabSetId ? [test.vocabSetId] : []);
    const relatedTests = allTests.filter(t => {
      if (test.type === 'VOCAB') {
        const tSetIds = Array.isArray(t.vocabSetIds) && t.vocabSetIds.length > 0 ? t.vocabSetIds : (t.vocabSetId ? [t.vocabSetId] : []);
        const isSameSet = (testSetIds.length > 0 && tSetIds.length > 0 && testSetIds.slice().sort().join(',') === tSetIds.slice().sort().join(',')) ||
                          (test.vocabSetId && t.vocabSetId === test.vocabSetId);
        return t.type === 'VOCAB' && isSameSet && t.date === test.date;
      }
      if (test.type === 'PRACTICE') {
        return t.type === 'PRACTICE' && t.title === test.title && t.date === test.date;
      }
      if (test.type === 'TEXT_MEMORIZE') {
        return t.type === 'TEXT_MEMORIZE' && t.title === test.title && t.date === test.date;
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
    if (document.getElementById('formVocabCutoff_2')) document.getElementById('formVocabCutoff_2').value = this.getBaseVocabCutoffScore(test, 2);
    if (document.getElementById('formVocabCutoff_3')) document.getElementById('formVocabCutoff_3').value = this.getBaseVocabCutoffScore(test, 3);
    if (document.getElementById('formVocabCutoff_4')) document.getElementById('formVocabCutoff_4').value = this.getBaseVocabCutoffScore(test, 4);
    if (document.getElementById('formIsMockSpecial')) {
      document.getElementById('formIsMockSpecial').checked = Boolean(test.isMockSpecial || (test.title && (test.title.includes('9모') || test.title.includes('모의고사'))));
    }
    document.getElementById('formPracticeCutoff').value = test.cutoffScore || test.practiceCutoff || 80;
    if (document.getElementById('formTextMemorizeCutoff')) {
      document.getElementById('formTextMemorizeCutoff').value = test.textMemorizeCutoff || test.cutoffScore || 80;
    }
    if (document.getElementById('formTextMemorizeMaxWrong')) {
      document.getElementById('formTextMemorizeMaxWrong').value = test.textMemorizeMaxWrong ?? 3;
    }
    const cutoffType = test.textMemorizeCutoffType || 'SCORE';
    this.toggleTextMemorizeCutoffType(cutoffType);

    const tmMode = test.textMemorizeMode || 'CLOZE';
    const tmModeRadio = document.querySelector(`input[name="formTextMemorizeMode"][value="${tmMode}"]`);
    if (tmModeRadio) tmModeRadio.checked = true;

    document.getElementById('formScore').value = test.score || '';
    document.getElementById('formRetestDate').value = test.retestDate || '';
    document.getElementById('formTeacherNote').value = test.teacherNote || '';
    this.renderFormVocabSetSelect(testSetIds[0] || '', testSetIds[1] || '');
    this.initPracticeQuestionsForm(test.questions || []);

    // 본문 암기 범위 체크박스 복원
    const passageBook = test.passageBook || 'YBM(박준언) 공통영어 2';
    const bookSelect = document.getElementById('formTextMemorizeBookSelect');
    if (bookSelect) bookSelect.value = passageBook;
    this.renderTextMemorizePassages(passageBook, test.passageIds || []);

    // 라디오 버튼 설정
    const statusVal = test.status || 'SCHEDULED';
    const retestVal = test.retestStatus || 'NONE';
    const typeVal = ['VOCAB', 'PRACTICE', 'TEXT_MEMORIZE'].includes(test.type) ? test.type : 'REGULAR';

    const statusRadio = document.querySelector(`input[name="formStatus"][value="${statusVal}"]`);
    if (statusRadio) statusRadio.checked = true;
    const retestRadio = document.querySelector(`input[name="formRetestStatus"][value="${retestVal}"]`);
    if (retestRadio) retestRadio.checked = true;
    const typeRadio = document.querySelector(`input[name="formTestType"][value="${typeVal}"]`);
    if (typeRadio) typeRadio.checked = true;

    this.toggleTestFormType();
    this.showModal('adminTestFormModal');
  },

  renderFormVocabSetSelect(selectedSetId = '', selectedSetId2 = '') {
    const select1 = document.getElementById('formVocabSetId');
    const select2 = document.getElementById('formVocabSetId2');
    if (!select1) return;
    const sets = AppData.getVocabSets();

    // 교재(폴더)별 그룹화
    const booksMap = {};
    sets.forEach(set => {
      const bookName = (set.book || '기본 단어장').trim();
      if (!booksMap[bookName]) booksMap[bookName] = [];
      booksMap[bookName].push(set);
    });

    let options1Html = '<option value="">단어 테스트 미연결</option>';
    let options2Html = '<option value="">(선택 안 함 - 1개 세트만 출제)</option>';

    Object.keys(booksMap).forEach(bookName => {
      // 자연어 숫자 정렬 (Day 01, Day 02, ... Day 10 ...)
      const bookSets = booksMap[bookName].slice().sort((a, b) => 
        (a.title || '').localeCompare(b.title || '', undefined, { numeric: true, sensitivity: 'base' })
      );
      const optgroupLabel = `📁 ${this.escapeHtml(bookName)} (${bookSets.length}개 세트)`;

      options1Html += `<optgroup label="${optgroupLabel}">`;
      options2Html += `<optgroup label="${optgroupLabel}">`;

      bookSets.forEach(set => {
        const wordCount = (set.words || []).length;
        const optText = `${this.escapeHtml(set.title)} (${wordCount}단어)`;
        options1Html += `<option value="${set.id}" ${set.id === selectedSetId ? 'selected' : ''}>${optText}</option>`;
        options2Html += `<option value="${set.id}" ${set.id === selectedSetId2 ? 'selected' : ''}>${optText}</option>`;
      });

      options1Html += `</optgroup>`;
      options2Html += `</optgroup>`;
    });

    select1.innerHTML = options1Html;
    if (select2) select2.innerHTML = options2Html;

    this.onVocabSetSelectionChange();
  },

  onVocabSetSelectionChange() {
    const select1 = document.getElementById('formVocabSetId');
    const select2 = document.getElementById('formVocabSetId2');
    if (!select1) return;

    const id1 = select1.value;
    const id2 = select2 ? select2.value : '';
    const allSets = AppData.getVocabSets();

    const selectedIds = [id1, id2].filter(Boolean);
    const uniqueIds = [...new Set(selectedIds)];
    const matchingSets = uniqueIds.map(id => allSets.find(s => s.id === id)).filter(Boolean);

    const badgeEl = document.getElementById('formVocabSummaryBadge');
    const totalWordsEl = document.getElementById('formVocabTotalWordsCount');
    const listTextEl = document.getElementById('formVocabSelectedListText');

    if (matchingSets.length === 0) {
      if (badgeEl) badgeEl.innerText = '단어 세트 미선택';
      if (totalWordsEl) totalWordsEl.innerText = '0단어';
      if (listTextEl) listTextEl.innerText = '선택된 단어 세트가 없습니다.';
    } else {
      const totalWords = matchingSets.reduce((sum, s) => sum + (s.words?.length || 0), 0);
      const setTitles = matchingSets.map(s => s.title).join(' + ');
      const bookName = matchingSets[0]?.book || '기본 단어장';
      const isRandom40 = totalWords > 40;

      if (badgeEl) badgeEl.innerText = `${matchingSets.length}개 세트 연결됨`;
      if (totalWordsEl) totalWordsEl.innerText = isRandom40 ? `총 ${totalWords}단어 중 40단어 랜덤 출제` : `총 ${totalWords}단어 출제`;
      if (listTextEl) {
        listTextEl.innerHTML = matchingSets.map(s => 
          `<span class="inline-flex items-center gap-1 bg-violet-100/80 text-violet-900 px-2 py-0.5 rounded-md font-bold text-[11px] mr-1 mb-0.5 border border-violet-200">
            <i class="fa-solid fa-file-lines text-[10px] text-violet-600"></i> ${this.escapeHtml(s.title)} (${(s.words || []).length}단어)
          </span>`
        ).join('');
      }

      // 출제 범위 및 시험 제목 자동 안내
      const testType = document.querySelector('input[name="formTestType"]:checked')?.value;
      if (testType === 'VOCAB') {
        const formTitle = document.getElementById('formTitle');
        const formScope = document.getElementById('formScope');
        const combinedTitle = bookName && bookName !== '기본 단어장' ? `[${bookName}] ${setTitles} 단어 테스트` : `${setTitles} 단어 테스트`;
        const wordsText = isRandom40 ? `(총 ${totalWords}단어 / 40단어 랜덤 출제)` : `(총 ${totalWords}단어)`;
        const combinedScope = bookName && bookName !== '기본 단어장' ? `[${bookName}] ${matchingSets.map(s => s.title).join(', ')} ${wordsText}` : `${matchingSets.map(s => s.title).join(', ')} ${wordsText}`;
        
        if (formTitle && (!formTitle.value || formTitle.value === '단어 테스트' || formTitle.value.endsWith('단어 테스트'))) {
          formTitle.value = combinedTitle;
        }
        if (formScope) {
          formScope.value = combinedScope;
        }
      }
    }
  },

  autoSelectNextVocabDay() {
    const select1 = document.getElementById('formVocabSetId');
    const select2 = document.getElementById('formVocabSetId2');
    if (!select1 || !select2) return;

    const allSets = AppData.getVocabSets();
    if (allSets.length === 0) {
      this.toast('등록된 단어 세트가 없습니다.', 'warning');
      return;
    }

    let id1 = select1.value;

    // 만약 1번째 세트가 선택되어 있지 않다면 첫 번째 세트와 두 번째 세트를 기본 선택
    if (!id1) {
      const firstBook = (allSets[0].book || '기본 단어장').trim();
      const firstBookSets = allSets.filter(s => (s.book || '기본 단어장').trim() === firstBook).sort((a, b) => 
        (a.title || '').localeCompare(b.title || '', undefined, { numeric: true, sensitivity: 'base' })
      );
      select1.value = firstBookSets[0].id;
      id1 = select1.value;
      if (firstBookSets.length >= 2) {
        select2.value = firstBookSets[1].id;
        this.onVocabSetSelectionChange();
        this.toast(`'${firstBookSets[0].title}' + '${firstBookSets[1].title}' 2개 세트가 자동 지정되었습니다!`, 'success');
        return;
      }
    }

    const currentSet = allSets.find(s => s.id === id1);
    if (!currentSet) return;

    const book = (currentSet.book || '기본 단어장').trim();
    const bookSets = allSets.filter(s => (s.book || '기본 단어장').trim() === book).sort((a, b) => 
      (a.title || '').localeCompare(b.title || '', undefined, { numeric: true, sensitivity: 'base' })
    );
    const currentIndex = bookSets.findIndex(s => s.id === id1);

    if (currentIndex >= 0 && currentIndex < bookSets.length - 1) {
      const nextSet = bookSets[currentIndex + 1];
      select2.value = nextSet.id;
      this.onVocabSetSelectionChange();
      this.toast(`2번째 세트로 '${nextSet.title}'이(가) 자동 선택되었습니다!`, 'success');
    } else {
      this.toast(`'${book}' 교재의 마지막 세트입니다. 다음 Day가 없습니다.`, 'info');
    }
  },

  openVocabSetFromTestForm() {
    this.state.vocabSetReturnToTestForm = true;
    this.openVocabSetModal(null, true);
  },

  toggleTextMemorizeCutoffType(type) {
    const isScore = type === 'SCORE';
    const btnScore = document.getElementById('btnCutoffTypeScore');
    const btnWrong = document.getElementById('btnCutoffTypeWrong');
    const wrapScore = document.getElementById('formTmCutoffScoreWrap');
    const wrapWrong = document.getElementById('formTmCutoffWrongWrap');
    const hiddenType = document.getElementById('formTextMemorizeCutoffType');

    if (hiddenType) hiddenType.value = type;

    if (btnScore && btnWrong) {
      if (isScore) {
        btnScore.className = 'px-2.5 py-1 rounded-md text-xs font-bold transition bg-indigo-600 text-white shadow-2xs';
        btnWrong.className = 'px-2.5 py-1 rounded-md text-xs font-bold transition text-slate-600 hover:bg-slate-100';
      } else {
        btnWrong.className = 'px-2.5 py-1 rounded-md text-xs font-bold transition bg-indigo-600 text-white shadow-2xs';
        btnScore.className = 'px-2.5 py-1 rounded-md text-xs font-bold transition text-slate-600 hover:bg-slate-100';
      }
    }

    if (wrapScore) wrapScore.classList.toggle('hidden', !isScore);
    if (wrapWrong) wrapWrong.classList.toggle('hidden', isScore);
  },

  onTextMemorizeModeChange() {
    const mode = document.querySelector('input[name="formTextMemorizeMode"]:checked')?.value || 'CLOZE';
    const labelCloze = document.getElementById('labelTmModeCloze');
    const labelFull = document.getElementById('labelTmModeFull');

    if (labelCloze && labelFull) {
      if (mode === 'CLOZE') {
        labelCloze.className = 'flex items-center justify-center p-2 rounded-lg border border-indigo-300 bg-indigo-50/80 cursor-pointer text-xs font-bold text-indigo-950';
        labelFull.className = 'flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white cursor-pointer text-xs font-bold text-slate-700 hover:bg-slate-50';
      } else {
        labelFull.className = 'flex items-center justify-center p-2 rounded-lg border border-indigo-300 bg-indigo-50/80 cursor-pointer text-xs font-bold text-indigo-950';
        labelCloze.className = 'flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white cursor-pointer text-xs font-bold text-slate-700 hover:bg-slate-50';
      }
    }
  },

  toggleTestFormType() {
    const testType = document.querySelector('input[name="formTestType"]:checked')?.value || 'REGULAR';
    const isVocab = testType === 'VOCAB';
    const isPractice = testType === 'PRACTICE';
    const isTextMemorize = testType === 'TEXT_MEMORIZE';
    const isRegular = testType === 'REGULAR';

    document.querySelectorAll('.form-regular-only').forEach(element => element.classList.toggle('hidden', !isRegular));
    document.querySelectorAll('.form-regular-or-practice').forEach(element => element.classList.toggle('hidden', isVocab || isTextMemorize));
    document.querySelectorAll('.form-time-applicable').forEach(element => element.classList.remove('hidden'));

    // 본문 암기 및 단어 테스트는 제목 입력창 숨김 및 자동 고정
    const formTitleSection = document.getElementById('formTitleSection');
    if (formTitleSection) {
      formTitleSection.classList.toggle('hidden', isVocab || isTextMemorize);
    }

    document.getElementById('formVocabSetSection').classList.toggle('hidden', !isVocab);
    document.getElementById('formVocabCutoffSection').classList.toggle('hidden', !isVocab);
    const mockSpecialSection = document.getElementById('formMockSpecialSection');
    if (mockSpecialSection) mockSpecialSection.classList.toggle('hidden', !isVocab);
    document.getElementById('formPracticeCutoffSection').classList.toggle('hidden', !isPractice);
    document.getElementById('formPracticeSection').classList.toggle('hidden', !isPractice);
    document.getElementById('formTextMemorizeSection').classList.toggle('hidden', !isTextMemorize);
    document.getElementById('formTextMemorizeCutoffSection').classList.toggle('hidden', !isTextMemorize);

    const title = document.getElementById('formTitle');
    if (title) {
      if (isTextMemorize) {
        title.value = '본문암기 테스트';
        title.required = false;
      } else if (isVocab) {
        title.value = '단어 테스트';
        title.required = false;
      } else {
        title.required = true;
        if (title.value === '본문암기 테스트' || title.value === '본문 암기 테스트' || title.value === '단어 테스트') {
          title.value = '';
        }
      }
    }

    if (isTextMemorize) {
      const bookVal = document.getElementById('formTextMemorizeBookSelect')?.value || 'YBM(박준언) 공통영어 2';
      const currentSelected = Array.from(document.querySelectorAll('input[name="formPassageCheckbox"]:checked')).map(cb => cb.value);
      this.renderTextMemorizePassages(bookVal, currentSelected);
      this.onTextMemorizeModeChange();
    }

    const regularCutoff = document.getElementById('formCutoff');
    const practiceCutoff = document.getElementById('formPracticeCutoff');

    if (regularCutoff) regularCutoff.required = isRegular;
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
    const isTextMemorize = testType === 'TEXT_MEMORIZE';

    const vocabSetId1 = isVocabTest ? document.getElementById('formVocabSetId')?.value : null;
    const vocabSetId2 = isVocabTest ? document.getElementById('formVocabSetId2')?.value : null;
    const vocabSetIds = isVocabTest ? [...new Set([vocabSetId1, vocabSetId2].filter(Boolean))] : [];
    const vocabSetId = vocabSetIds[0] || null;

    let title = (isVocabTest) ? (document.getElementById('formTitle')?.value?.trim() || '단어 테스트') : (isTextMemorize ? '본문암기 테스트' : document.getElementById('formTitle').value.trim());
    const date = document.getElementById('formDate').value;
    const time = document.getElementById('formTime').value.trim();
    const endTime = document.getElementById('formEndTime').value.trim();

    const regularCutoff = document.getElementById('formCutoff')?.value.trim() || '80점 이상';
    const vocabCutoff2 = Number(document.getElementById('formVocabCutoff_2')?.value ?? 80);
    const vocabCutoff3 = Number(document.getElementById('formVocabCutoff_3')?.value ?? 80);
    const vocabCutoff4 = Number(document.getElementById('formVocabCutoff_4')?.value ?? 80);
    const vocabCutoffs = isVocabTest ? { 2: vocabCutoff2, 3: vocabCutoff3, 4: vocabCutoff4 } : null;
    const practiceCutoff = Number(document.getElementById('formPracticeCutoff')?.value ?? 80);

    const textMemorizeMode = isTextMemorize ? (document.querySelector('input[name="formTextMemorizeMode"]:checked')?.value || 'CLOZE') : null;
    const textMemorizeCutoffType = isTextMemorize ? (document.getElementById('formTextMemorizeCutoffType')?.value || 'SCORE') : null;
    const textMemorizeCutoff = Number(document.getElementById('formTextMemorizeCutoff')?.value ?? 80);
    const textMemorizeMaxWrong = Number(document.getElementById('formTextMemorizeMaxWrong')?.value ?? 3);

    // TEXT_MEMORIZE: collect selected passage IDs
    const selectedPassageCheckboxes = document.querySelectorAll('input[name="formPassageCheckbox"]:checked');
    const selectedPassageIds = Array.from(selectedPassageCheckboxes).map(cb => cb.value);
    const passageBook = document.getElementById('formTextMemorizeBookSelect')?.value || '';

    let scope = document.getElementById('formScope').value.trim();
    if (isVocabTest) {
      const allSets = AppData.getVocabSets();
      const matchingSets = vocabSetIds.map(sId => allSets.find(s => s.id === sId)).filter(Boolean);
      if (matchingSets.length > 0) {
        const setTitles = matchingSets.map(s => s.title).join(', ');
        const totalWords = matchingSets.reduce((sum, s) => sum + (s.words?.length || 0), 0);
        const bookName = matchingSets[0]?.book || '';
        scope = bookName && bookName !== '기본 단어장' ? `[${bookName}] ${setTitles} (총 ${totalWords}단어)` : `${setTitles} (총 ${totalWords}단어)`;
        if (!title || title === '단어 테스트' || title.endsWith('단어 테스트')) {
          title = bookName && bookName !== '기본 단어장' ? `[${bookName}] ${matchingSets.map(s => s.title).join(' + ')} 단어 테스트` : `${matchingSets.map(s => s.title).join(' + ')} 단어 테스트`;
        }
      } else {
        scope = '단어 세트 기반 5지선다 테스트';
      }
    } else if (isPracticeTest) {
      scope = scope || '선생님 출제 5지선다 객관식 문제풀이';
    } else if (isTextMemorize) {
      const allPassages = (typeof YBM_ENGLISH2_PASSAGES !== 'undefined') ? YBM_ENGLISH2_PASSAGES : [];
      const matched = allPassages.filter(p => selectedPassageIds.includes(p.id));
      if (matched.length > 0) {
        const parts = matched.map(p => p.partTitle.replace(/\s*\(\d+문장\)/, '')).join(', ');
        const totalSentences = matched.reduce((sum, p) => sum + (p.sentences?.length || 0), 0);
        scope = `${parts} (총 ${matched.length}개 문단 / ${totalSentences}문장)`;
      } else {
        scope = textMemorizeMode === 'FULL_SENTENCE' ? '본문암기 문장 전체 영작(서술형) 테스트' : '본문암기 빈칸 채우기 테스트';
      }
    }

    let cutoff = regularCutoff;
    let cutoffScore = null;
    if (isVocabTest) {
      cutoff = `객관식 ${vocabCutoff2}점 · 스펠링 ${vocabCutoff3}점 · 통합 ${vocabCutoff4}점`;
      cutoffScore = Math.min(vocabCutoff2, vocabCutoff3, vocabCutoff4);
    } else if (isPracticeTest) {
      cutoff = `${practiceCutoff}점 이상`;
      cutoffScore = practiceCutoff;
    } else if (isTextMemorize) {
      if (textMemorizeCutoffType === 'WRONG_COUNT') {
        cutoff = `오답 ${textMemorizeMaxWrong}개 이하 허용`;
        cutoffScore = textMemorizeMaxWrong;
      } else {
        cutoff = `${textMemorizeCutoff}점 이상`;
        cutoffScore = textMemorizeCutoff;
      }
    } else {
      const match = String(regularCutoff).match(/(\d+)/);
      cutoffScore = match ? Number(match[1]) : null;
    }

    const score = isRegularTest ? document.getElementById('formScore').value.trim() : '';
    const retestDate = isRegularTest ? document.getElementById('formRetestDate').value : '';
    const teacherNote = isRegularTest ? document.getElementById('formTeacherNote').value.trim() : '';

    const status = isRegularTest ? (document.querySelector('input[name="formStatus"]:checked')?.value || 'SCHEDULED') : 'SCHEDULED';
    const retestStatus = isRegularTest ? (document.querySelector('input[name="formRetestStatus"]:checked')?.value || 'NONE') : 'NONE';
    const isMockSpecial = isVocabTest ? Boolean(document.getElementById('formIsMockSpecial')?.checked) : false;

    // 공통 검사
    if (!title || !date) {
      this.toast('시험 제목과 날짜는 필수 입력 항목입니다.', 'error');
      return;
    }

    if (isVocabTest) {
      const allValid = [vocabCutoff2, vocabCutoff3, vocabCutoff4].every(v => Number.isInteger(v) && v >= 1 && v <= 100);
      if (vocabSetIds.length === 0 || !allValid) {
        this.toast('단어 세트를 최소 1개 이상 선택하고 각 유형별 커트라인을 1~100점 사이로 입력해주세요.', 'error');
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

    if (isTextMemorize) {
      if (textMemorizeCutoffType === 'SCORE') {
        if (!Number.isInteger(textMemorizeCutoff) || textMemorizeCutoff < 1 || textMemorizeCutoff > 100) {
          this.toast('본문암기 커트라인 점수는 1~100점 사이의 정수로 입력해주세요.', 'error');
          return;
        }
      } else {
        if (!Number.isInteger(textMemorizeMaxWrong) || textMemorizeMaxWrong < 0 || textMemorizeMaxWrong > 100) {
          this.toast('본문암기 허용 오답 개수는 0 이상의 정수로 입력해주세요.', 'error');
          return;
        }
      }
      if (selectedPassageIds.length === 0) {
        this.toast('본문암기 출제 범위로 문단을 최소 1개 이상 선택해주세요.', 'error');
        return;
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
            status: (isPracticeTest || isTextMemorize) ? (existingTest?.status || 'SCHEDULED') : status,
            retestStatus,
            retestDate,
            teacherNote,
            vocabSetId,
            vocabSetIds,
            vocabCutoff: isVocabTest ? Math.min(vocabCutoff2, vocabCutoff3, vocabCutoff4) : null,
            vocabCutoffs: isVocabTest ? vocabCutoffs : null,
            practiceCutoff: isPracticeTest ? practiceCutoff : null,
            questions: isPracticeTest ? practiceQuestions : null,
            practiceResult: isPracticeTest ? existingTest?.practiceResult : null,
            passageIds: isTextMemorize ? selectedPassageIds : (existingTest?.passageIds || null),
            passageBook: isTextMemorize ? passageBook : (existingTest?.passageBook || null),
            textMemorizeCutoff: isTextMemorize ? textMemorizeCutoff : null,
            textMemorizeCutoffType: isTextMemorize ? textMemorizeCutoffType : null,
            textMemorizeMaxWrong: isTextMemorize ? textMemorizeMaxWrong : null,
            textMemorizeMode: isTextMemorize ? textMemorizeMode : null,
            extendedDate: existingTest?.extendedDate || null,
            extendedEndTime: existingTest?.extendedEndTime || null,
            allowLate: existingTest?.allowLate || false,
            type: testType,
            isMockSpecial
          };
          return AppData.saveOrUpdateTest(testData);
        } else {
          // 다른 학생: 동일한 시험(단어세트ID 또는 제목, 날짜)이 이미 있는지 탐색
          const matchingExistingTest = allTests.find(t => {
            if (t.studentId !== studentId) return false;
            if (isVocabTest) {
              const tSetIds = Array.isArray(t.vocabSetIds) && t.vocabSetIds.length > 0 ? t.vocabSetIds : (t.vocabSetId ? [t.vocabSetId] : []);
              const isSameSet = (vocabSetIds.length > 0 && tSetIds.length > 0 && vocabSetIds.slice().sort().join(',') === tSetIds.slice().sort().join(',')) ||
                                (vocabSetId && t.vocabSetId === vocabSetId);
              return t.type === 'VOCAB' && isSameSet && (t.date === date || (existingTest && t.date === existingTest.date));
            }
            if (isPracticeTest) {
              return t.type === 'PRACTICE' && t.title === (existingTest?.title || title) && (t.date === date || (existingTest && t.date === existingTest.date));
            }
            if (isTextMemorize) {
              return t.type === 'TEXT_MEMORIZE' && t.title === (existingTest?.title || title) && (t.date === date || (existingTest && t.date === existingTest.date));
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
              vocabSetIds,
              vocabCutoff: isVocabTest ? Math.min(vocabCutoff2, vocabCutoff3, vocabCutoff4) : null,
              vocabCutoffs: isVocabTest ? vocabCutoffs : null,
              practiceCutoff: isPracticeTest ? practiceCutoff : null,
              questions: isPracticeTest ? practiceQuestions : null,
              passageIds: isTextMemorize ? selectedPassageIds : (matchingExistingTest.passageIds || null),
              passageBook: isTextMemorize ? passageBook : (matchingExistingTest.passageBook || null),
              textMemorizeCutoff: isTextMemorize ? textMemorizeCutoff : null,
              textMemorizeCutoffType: isTextMemorize ? textMemorizeCutoffType : null,
              textMemorizeMaxWrong: isTextMemorize ? textMemorizeMaxWrong : null,
              textMemorizeMode: isTextMemorize ? textMemorizeMode : null,
              type: testType,
              isMockSpecial
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
              vocabSetIds,
              vocabCutoff: isVocabTest ? Math.min(vocabCutoff2, vocabCutoff3, vocabCutoff4) : null,
              vocabCutoffs: isVocabTest ? vocabCutoffs : null,
              practiceCutoff: isPracticeTest ? practiceCutoff : null,
              questions: isPracticeTest ? practiceQuestions : null,
              practiceResult: null,
              passageIds: isTextMemorize ? selectedPassageIds : null,
              passageBook: isTextMemorize ? passageBook : null,
              textMemorizeCutoff: isTextMemorize ? textMemorizeCutoff : null,
              textMemorizeCutoffType: isTextMemorize ? textMemorizeCutoffType : null,
              textMemorizeMaxWrong: isTextMemorize ? textMemorizeMaxWrong : null,
              textMemorizeMode: isTextMemorize ? textMemorizeMode : null,
              type: testType,
              isMockSpecial
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
        this.toast(`선택한 ${selectedStudentIds.length}명의 학생에게 '${title}' 일정이 일괄 수정/적용되었습니다.`, 'success');
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
          score: isRegularTest ? score : '',
          status: isRegularTest ? status : 'SCHEDULED',
          retestStatus: isRegularTest ? retestStatus : 'NONE',
          retestDate: isRegularTest ? retestDate : '',
          teacherNote: isRegularTest ? teacherNote : '',
          vocabSetId,
          vocabSetIds,
          vocabCutoff: isVocabTest ? Math.min(vocabCutoff2, vocabCutoff3, vocabCutoff4) : null,
          vocabCutoffs: isVocabTest ? vocabCutoffs : null,
          practiceCutoff: isPracticeTest ? practiceCutoff : null,
          questions: isPracticeTest ? practiceQuestions : null,
          practiceResult: null,
          passageIds: isTextMemorize ? selectedPassageIds : null,
          passageBook: isTextMemorize ? passageBook : null,
          textMemorizeCutoff: isTextMemorize ? textMemorizeCutoff : null,
          textMemorizeCutoffType: isTextMemorize ? textMemorizeCutoffType : null,
          textMemorizeMaxWrong: isTextMemorize ? textMemorizeMaxWrong : null,
          textMemorizeMode: isTextMemorize ? textMemorizeMode : null,
          type: testType,
          isMockSpecial
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
        this.toast(`선택한 ${selectedStudentIds.length}명의 학생에게 '${title}' 일정이 일괄 등록되었습니다.`, 'success');
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
  _activeModals: new Set(),

  updateBodyScrollLock() {
    const modalIds = [
      'textMemorizeExamModal', 'textMemorizeResultModal', 'testDetailModal',
      'adminTestFormModal', 'vocabSetModal', 'extendTestModal', 'textMemorizeScheduleModal'
    ];
    const anyModalVisible = modalIds.some(id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains('hidden') && el.style.display !== 'none';
    }) || this._activeModals.size > 0;

    if (anyModalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('overflow-hidden');
    }
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    this._activeModals.add(modalId);
    modal.classList.remove('hidden');
    this.updateBodyScrollLock();
    // 부드러운 애니메이션
    setTimeout(() => {
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
      modal.querySelector('.modal-content')?.classList.add('scale-100', 'opacity-100');
    }, 10);
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    this._activeModals.delete(modalId);
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.classList.remove('scale-100', 'opacity-100');
      content.classList.add('scale-95', 'opacity-0');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      this.updateBodyScrollLock();
    }, 200);
  },

  closeAllModals() {
    this._activeModals.clear();
    ['testDetailModal', 'adminTestFormModal', 'vocabSetModal', 'textMemorizeExamModal', 'textMemorizeResultModal', 'textMemorizeScheduleModal', 'extendTestModal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('hidden');
    });
    this.updateBodyScrollLock();
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

  getTestDDayBadge(test) {
    if (!test || !test.date) return { text: '-', class: 'bg-slate-100 text-slate-600' };

    const target = new Date(test.date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { text: 'D-Day', class: 'bg-rose-500 text-white font-black' };
    }
    if (diffDays > 0) {
      return { text: `D-${diffDays}`, class: 'bg-indigo-600 text-white font-black' };
    }

    // D+1부터는 관리자가 결과를 설정했거나(응시했으면) '응시 완료', 아니면 '미응시'
    const isTaken = (test.status === 'PASS' || test.status === 'FAIL') ||
                    (test.score && test.score !== '미응시' && test.score.trim() !== '') ||
                    Boolean(test.practiceResult) ||
                    (test.retestStatus && test.retestStatus !== 'NONE');

    if (isTaken) {
      return { text: '응시 완료', class: 'bg-emerald-600 text-white font-bold' };
    } else {
      return { text: '미응시', class: 'bg-slate-500 text-white font-bold' };
    }
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
  setVocabBookFilter(bookName) {
    this.state.selectedVocabBookFilter = bookName;
    // 특정 교재를 클릭한 경우 자동으로 해당 교재를 펼침
    if (bookName !== 'ALL') {
      if (!this.state.expandedVocabBooks) this.state.expandedVocabBooks = {};
      this.state.expandedVocabBooks[bookName] = true;
    }
    this.renderAdminVocabTab();
  },

  toggleVocabBookExpanded(bookName) {
    if (!this.state.expandedVocabBooks) this.state.expandedVocabBooks = {};
    this.state.expandedVocabBooks[bookName] = !this.state.expandedVocabBooks[bookName];
    this.renderAdminVocabTab();
  },

  renderAdminVocabTab() {
    const container = document.getElementById('adminVocabSetsList');
    if (!container) return;

    const results = AppData.getVocabTestResults();
    const tests = AppData.getTests().filter(test => test.type === 'VOCAB');
    const students = AppData.getStudents();
    const sets = AppData.getVocabSets();

    if (!this.state.expandedVocabBooks) {
      this.state.expandedVocabBooks = {};
    }

    // 교재(폴더)별 세트 그룹화
    const booksMap = {};
    sets.forEach(s => {
      const b = (s.book || '기본 단어장').trim();
      if (!booksMap[b]) booksMap[b] = [];
      booksMap[b].push(s);
    });
    const bookNames = Object.keys(booksMap);

    const activeFilter = this.state.selectedVocabBookFilter || 'ALL';
    const displayedBookNames = activeFilter === 'ALL'
      ? bookNames
      : bookNames.filter(b => b === activeFilter);

    // ── 1. 단어 세트 관리 섹션 HTML ───────────────────
    const vocabSetsHtml = `
      <div class="glass-card rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <i class="fa-solid fa-book-bookmark text-indigo-600"></i>
              <span>단어장 교재 & 세트 관리</span>
              <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">${sets.length}개 세트</span>
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">교재 표지를 클릭하여 하위 Day 세트를 열고 닫을 수 있습니다.</p>
          </div>
          <button onclick="App.openVocabSetModal()" class="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm flex items-center gap-1.5">
            <i class="fa-solid fa-plus"></i> 새 단어 세트 만들기
          </button>
        </div>

        <!-- 교재(폴더) 분류 필터 탭 바 -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100 scrollbar-none">
          <button type="button" onclick="App.setVocabBookFilter('ALL')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 ${activeFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            <i class="fa-solid fa-layer-group text-[11px]"></i>
            <span>전체 교재</span>
            <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeFilter === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}">${sets.length}</span>
          </button>
          ${bookNames.map(bName => `
            <button type="button" onclick="App.setVocabBookFilter('${this.escapeHtml(bName)}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 ${activeFilter === bName ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              <i class="fa-solid fa-folder text-[11px] ${activeFilter === bName ? 'text-indigo-200' : 'text-amber-500'}"></i>
              <span>${this.escapeHtml(bName)}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeFilter === bName ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}">${booksMap[bName].length}</span>
            </button>
          `).join('')}
        </div>

        <!-- 교재(책)별 표지 아코디언 목록 -->
        ${displayedBookNames.length > 0 ? `
          <div class="space-y-3.5">
            ${displayedBookNames.map(bName => {
              const bookSets = (booksMap[bName] || []).slice().sort((a, b) => 
                (a.title || '').localeCompare(b.title || '', undefined, { numeric: true, sensitivity: 'base' })
              );
              const totalWordsInBook = bookSets.reduce((sum, s) => sum + (s.words || []).length, 0);
              const isExpanded = activeFilter === bName ? (this.state.expandedVocabBooks[bName] !== false) : !!this.state.expandedVocabBooks[bName];
              const isWordmaster = bName.includes('워드마스터');

              return `
                <div class="rounded-2xl border ${isExpanded ? 'border-indigo-300 ring-2 ring-indigo-50 shadow-sm' : 'border-slate-200 hover:border-indigo-200'} bg-white overflow-hidden transition">
                  <!-- 교재 표지 헤더 카드 (클릭 시 토글) -->
                  <div onclick="App.toggleVocabBookExpanded('${this.escapeHtml(bName)}')" class="p-4 cursor-pointer flex items-center justify-between gap-3 ${isExpanded ? 'bg-indigo-50/60' : 'bg-slate-50/70 hover:bg-slate-100/70'} transition">
                    <div class="flex items-center gap-3.5 min-w-0">
                      <div class="w-11 h-12 rounded-xl ${isWordmaster ? 'bg-gradient-to-br from-indigo-600 to-violet-700' : 'bg-gradient-to-br from-slate-700 to-slate-900'} text-white flex items-center justify-center text-lg flex-shrink-0 shadow-xs border border-white/20">
                        <i class="fa-solid ${isWordmaster ? 'fa-book-open' : 'fa-folder-closed'}"></i>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-black text-slate-900 text-sm sm:text-base truncate">${this.escapeHtml(bName)}</h4>
                          <span class="text-[11px] font-bold ${isWordmaster ? 'text-indigo-700 bg-indigo-100' : 'text-slate-700 bg-slate-200'} px-2 py-0.5 rounded-full">
                            총 ${bookSets.length}개 세트 · ${totalWordsInBook.toLocaleString()}단어
                          </span>
                        </div>
                        <p class="text-xs text-slate-500 mt-0.5 truncate">
                          ${isExpanded ? '클릭하면 세트 목록을 접습니다.' : '클릭하여 세트 목록 및 단어 보기 (접힘 상태)'}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0">
                      <span class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${isExpanded ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}">
                        <span>${isExpanded ? '접기' : `Day 세트 열기 (${bookSets.length}개)`}</span>
                        <i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
                      </span>
                    </div>
                  </div>

                  <!-- 펼쳐졌을 때의 하위 세트 그리드 -->
                  ${isExpanded ? `
                    <div class="p-4 bg-white border-t border-slate-100">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${bookSets.map(set => {
                          const wordCount = (set.words || []).length;

                          return `
                            <div class="rounded-xl border border-slate-200 bg-white p-3.5 hover:border-indigo-200 transition space-y-2.5 shadow-2xs">
                              <div class="flex items-start justify-between gap-2">
                                <div class="space-y-0.5">
                                  <h5 class="font-black text-slate-900 text-sm flex items-center gap-1.5">
                                    <i class="fa-solid fa-file-lines text-indigo-500 text-xs"></i>
                                    <span>${this.escapeHtml(set.title)}</span>
                                  </h5>
                                  <p class="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                                    <span class="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">${wordCount}단어</span>
                                  </p>
                                </div>
                                <div class="flex items-center gap-1 flex-shrink-0">
                                  <button onclick="App.openVocabSetModal('${set.id}')" class="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition">
                                    <i class="fa-solid fa-pen-to-square text-[10px]"></i> 수정
                                  </button>
                                  <button onclick="App.confirmDeleteVocabSet('${set.id}')" class="px-2 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-100 transition">
                                    <i class="fa-solid fa-trash-can text-[10px]"></i>
                                  </button>
                                </div>
                              </div>

                              ${wordCount > 0 ? `
                                <details class="text-xs pt-1 border-t border-slate-100">
                                  <summary class="cursor-pointer font-semibold text-slate-500 hover:text-indigo-600 text-[11px] flex items-center justify-between py-0.5">
                                    <span>단어 미리보기 (${wordCount}개)</span>
                                    <span class="text-[10px] text-slate-400">펼치기</span>
                                  </summary>
                                  <div class="mt-2 max-h-36 overflow-y-auto space-y-1 pr-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                    ${set.words.map((w, idx) => `
                                      <div class="flex items-center justify-between text-[11px] py-0.5 px-1 rounded hover:bg-white transition gap-2">
                                        <div class="flex items-center gap-1.5 min-w-0">
                                          <button type="button" onclick="App.playDictionaryAudio('${this.escapeHtml(w.en)}'); event.stopPropagation();" class="text-indigo-600 hover:text-indigo-800 flex-shrink-0" title="발음 듣기">
                                            <i class="fa-solid fa-volume-high text-[10px]"></i>
                                          </button>
                                          <span class="font-bold text-slate-800 truncate">${idx + 1}. ${this.escapeHtml(w.en)}</span>
                                        </div>
                                        <span class="text-slate-500 font-medium text-right flex-shrink-0">${this.escapeHtml(w.ko)}</span>
                                      </div>
                                    `).join('')}
                                  </div>
                                </details>
                              ` : ''}
                            </div>`;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>`;
            }).join('')}
          </div>
        ` : `
          <div class="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
            <i class="fa-solid fa-book-open text-3xl text-slate-300 mb-2"></i>
            <p class="text-xs font-bold text-slate-600">${activeFilter !== 'ALL' ? `'${activeFilter}' 교재에 등록된 세트가 없습니다.` : '등록된 단어 세트가 없습니다.'}</p>
            <p class="text-[11px] text-slate-400 mt-0.5">새 단어 세트를 만들어 학생들에게 배정해보세요.</p>
            <button onclick="App.openVocabSetModal()" class="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition">
              <i class="fa-solid fa-plus mr-1"></i> 새 단어 세트 만들기
            </button>
          </div>
        `}
      </div>`;

    // ── 2. 날짜별 단어 테스트 결과 및 채점 섹션 ───────────
    const dateSet = new Set();
    tests.forEach(test => {
      if (test.date) dateSet.add(test.date);
    });
    results.forEach(result => {
      const date = this.getVocabResultDate(result);
      if (date) dateSet.add(date);
    });

    const dates = Array.from(dateSet).sort((a, b) => b.localeCompare(a));
    let resultsSectionHtml = '';

    if (dates.length === 0) {
      resultsSectionHtml = `
        <div class="glass-card rounded-2xl p-8 text-center text-slate-400 space-y-2">
          <i class="fa-solid fa-calendar-days text-3xl opacity-30"></i>
          <p class="text-sm font-bold text-slate-700">아직 등록된 단어 테스트 일정이나 응시 결과가 없습니다.</p>
          <p class="text-xs text-slate-500">학생 시험 일정에서 단어 테스트를 등록하면 학생별 시험 결과와 채점 버튼이 여기에 표시됩니다.</p>
        </div>`;
    } else {
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
            class="text-left rounded-2xl border-2 p-3.5 transition ${isSelected
              ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
              : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}">
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">시험 날짜</p>
                <p class="text-xl font-black text-slate-900 mt-0.5">${Number(month)}/${Number(day)}</p>
              </div>
              <span class="w-8 h-8 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-xs">
                <i class="fa-solid fa-calendar-check"></i>
              </span>
            </div>
            <div class="mt-2.5 flex items-center gap-1 flex-wrap">
              <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">학생 ${uniqueStudentIds.size}명</span>
              <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">통과 ${passed}명</span>
              <span class="px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-[10px] font-bold">결과 ${resultCount}건</span>
            </div>
          </button>`;
      }).join('');

      const selectedTests = tests.filter(test => test.date === selectedDate);
      const selectedResults = results.filter(result => this.getVocabResultDate(result) === selectedDate);

      const studentCards = students.map(student => {
        const studentTests = selectedTests.filter(test => String(test.studentId) === String(student.id));
        const studentResults = selectedResults.filter(result => String(result.studentId) === String(student.id));

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
          const test = tests.find(item => String(item.id) === String(result.testId));
          const set = sets.find(item => String(item.id) === String(result.setId));
          const directionLabel = this.getVocabDirectionLabel(result.direction);
          const wrongAnswers = result.wrongAnswers || [];
          const attemptCount = result.attempts ? result.attempts.length : 1;
          const completedTime = this.getVocabResultTimeString(result);
          const canGrade = result.direction === 4;
          const isPending = result.direction === 4 && result.waitingGrading && !result.gradedByAdmin;
          const gradedBadge = result.gradedByAdmin ? `<span class="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 ml-1">채점 완료</span>` : '';

          const statusText = result.passed ? 'PASS' : (isPending ? '채점 대기' : '불합격');
          const statusColor = result.passed ? 'text-emerald-700' : (isPending ? 'text-amber-700' : 'text-rose-700');
          const cardBorder = result.passed ? 'border-emerald-200 bg-emerald-50/70' : (isPending ? 'border-amber-300 bg-amber-50/80 shadow-xs' : 'border-slate-200 bg-slate-50/70');
          let retestBadge = '';

          if (!result.passed && !isPending) {
            if (result.retryAvailableAt) {
              const diffMs = new Date(result.retryAvailableAt).getTime() - Date.now();
              if (diffMs > 0) {
                const remainMinutes = Math.ceil(diffMs / 60000);
                const remainSeconds = Math.ceil(diffMs / 1000);
                const timeText = remainSeconds < 60 ? `${remainSeconds}초 남음` : `${remainMinutes}분 남음`;
                retestBadge = `
                  <span class="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 ml-1 inline-flex items-center gap-1">
                    <i class="fa-solid fa-clock text-[9px]"></i>재시험까지 ${timeText}
                  </span>
                  <button type="button" onclick="App.resetVocabRetryCooldown('${result.studentId}', '${result.setId}', ${result.direction}, '${result.testId || ''}')" class="text-[10px] font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 px-2 py-0.5 rounded-full border border-amber-300 transition shadow-2xs ml-1 inline-flex items-center gap-1 cursor-pointer" title="10분 대기 시간을 즉시 없애고 바로 응시할 수 있게 합니다">
                    <i class="fa-solid fa-bolt text-[9px]"></i>재시험 허용
                  </button>
                `;
              } else {
                retestBadge = `<span class="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 ml-1 inline-flex items-center gap-1"><i class="fa-solid fa-rotate-right text-[9px]"></i>재시험 응시 가능</span>`;
              }
            } else {
              retestBadge = `<span class="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 ml-1 inline-flex items-center gap-1"><i class="fa-solid fa-rotate-right text-[9px]"></i>재시험 응시 가능</span>`;
            }
          }

          return `
            <div class="rounded-xl border ${cardBorder} p-3.5 space-y-2">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <p class="font-bold text-slate-900 text-sm">${this.escapeHtml(test?.title || '단어 테스트')}</p>
                    ${isPending ? `<span class="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">채점 대기</span>` : ''}
                    ${gradedBadge}
                    ${retestBadge}
                  </div>
                  <p class="text-[11px] text-slate-500 mt-0.5">${this.escapeHtml(set?.title || '연결된 단어 세트')} · ${directionLabel}</p>
                </div>
                <div class="flex items-center gap-2">
                  ${canGrade ? `<button type="button" onclick="App.openVocabGradingModal('${result.studentId}', '${result.testId || ''}', ${result.direction}, '${result.completedAt || ''}')" class="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 transition flex items-center gap-1 shadow-xs"><i class="fa-solid fa-clipboard-check text-[10px]"></i> ${result.gradedByAdmin ? '다시 채점하기' : '채점하기'}</button>` : ''}
                  <div class="text-right">
                    <p class="text-lg font-black ${statusColor}">${result.score}점</p>
                    <span class="text-[11px] font-bold ${statusColor}">${statusText}</span>
                  </div>
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
          <div class="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
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

      resultsSectionHtml = `
        <div class="glass-card rounded-2xl p-5 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-calendar-days text-indigo-600"></i>
                <span>날짜별 단어 테스트 결과 & 채점</span>
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">날짜를 선택하여 각 학생의 시험 결과 확인 및 [채점하기]를 진행하세요.</p>
            </div>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">${dates.length}개 날짜</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">${dateCardsHtml}</div>
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
        </div>`;
    }

    container.innerHTML = `
      ${vocabSetsHtml}
      ${resultsSectionHtml}
    `;
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
    document.getElementById('vocabModalTitle').innerText = setId ? '단어 세트 수정' : '새 단어 세트 등록';
    document.getElementById('vocabSetId').value = setId || '';
    document.getElementById('vocabWordRows').innerHTML = '';

    let existingSet = null;
    if (setId) {
      existingSet = AppData.getVocabSets().find(s => s.id === setId);
    }

    // 교재(폴더)명 및 제목
    const defaultBook = (this.state.selectedVocabBookFilter && this.state.selectedVocabBookFilter !== 'ALL')
      ? this.state.selectedVocabBookFilter
      : '워드마스터 수능 2000';
    const bookInput = document.getElementById('vocabSetBook');
    if (bookInput) bookInput.value = existingSet ? (existingSet.book || '기본 단어장') : defaultBook;
    document.getElementById('vocabSetTitle').value = existingSet ? existingSet.title : '';

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

  vocabIpaCache: {},

  // 단어 세트의 모든 단어 발음기호를 사전에 병렬 로드하여 렉/지연 완전 제거
  async prefetchVocabPhonetics(words) {
    if (!Array.isArray(words)) return;
    const fetchPromises = words.map(w => {
      const clean = (w.en || '').trim().toLowerCase();
      if (!clean || this.vocabIpaCache[clean] !== undefined) return Promise.resolve();
      return this.fetchWordPhonetic(clean).catch(() => {});
    });
    await Promise.allSettled(fetchPromises);
  },

  async fetchWordPhonetic(word) {
    if (!word) return '';
    const clean = word.trim().toLowerCase();
    if (this.vocabIpaCache[clean] !== undefined) {
      return this.vocabIpaCache[clean];
    }

    // 0순위: 등록된 단어 세트(워드마스터 2000 등) 내 내장된 교재 발음기호(ipa) 직접 조회
    try {
      const allSets = AppData.getVocabSets();
      for (const set of allSets) {
        if (Array.isArray(set.words)) {
          const found = set.words.find(w => (w.en || '').trim().toLowerCase() === clean);
          if (found && (found.ipa || found.phonetic)) {
            const direct = (found.ipa || found.phonetic).trim();
            this.vocabIpaCache[clean] = direct;
            return direct;
          }
        }
      }
    } catch (e) {}

    // 1차: Free Dictionary API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        let ipa = '';
        if (Array.isArray(data) && data[0]) {
          if (data[0].phonetic) {
            ipa = data[0].phonetic;
          } else if (Array.isArray(data[0].phonetics)) {
            const p = data[0].phonetics.find(item => item.text && item.text.trim());
            if (p) ipa = p.text;
          }
        }
        if (ipa) {
          const formatted = ipa.startsWith('[') || ipa.startsWith('/') ? ipa : `[${ipa}]`;
          this.vocabIpaCache[clean] = formatted;
          return formatted;
        }
      }
    } catch (e) {
      // 1차 실패 시 2차 시도
    }

    // 2차: Datamuse IPA API (초고속 사전 발음기호 DB)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}&qe=sp&md=r&ipa=1&max=1`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data[0] && data[0].tags) {
          const ipaTag = data[0].tags.find(t => t.startsWith('ipa_pron:'));
          if (ipaTag) {
            const rawIpa = ipaTag.replace('ipa_pron:', '').trim();
            if (rawIpa) {
              const formatted = `[${rawIpa}]`;
              this.vocabIpaCache[clean] = formatted;
              return formatted;
            }
          }
        }
      }
    } catch (e) {
      // 2차 실패
    }

    // Fallback: 단어 정답 유출 방지 (발음 듣기 유도)
    const fallback = `[발음 듣기]`;
    this.vocabIpaCache[clean] = fallback;
    return fallback;
  },

  closeVocabSetModal() {
    this.hideModal('vocabSetModal');
  },

  addVocabWordRow(enVal = '', koVal = '') {
    const container = document.getElementById('vocabWordRows');
    const idx = Date.now() + Math.random();
    const div = document.createElement('div');
    div.className = 'grid grid-cols-[1fr_1fr_auto_auto] gap-1.5 items-center vocab-word-row';
    div.innerHTML = `
      <input type="text" placeholder="영어 단어" value="${this.escapeHtml(enVal)}" class="vocab-en py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-xs" oninput="App.updateVocabWordCount()" />
      <input type="text" placeholder="한국어 뜻" value="${this.escapeHtml(koVal)}" class="vocab-ko py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-xs" />
      <button type="button" onclick="App.playDictionaryAudio(this.closest('.vocab-word-row').querySelector('.vocab-en').value)" class="w-7 h-7 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 flex items-center justify-center transition text-xs" title="발음 듣기">
        <i class="fa-solid fa-volume-high"></i>
      </button>
      <button type="button" onclick="this.closest('.vocab-word-row').remove(); App.updateVocabWordCount();" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition text-sm" title="삭제">
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
    const book = (document.getElementById('vocabSetBook')?.value || '기본 단어장').trim();
    const title = document.getElementById('vocabSetTitle').value.trim();
    if (!title) { this.toast('세트 제목을 입력해주세요.', 'error'); return; }

    const rows = document.querySelectorAll('.vocab-word-row');
    const words = Array.from(rows)
      .map(r => ({ en: r.querySelector('.vocab-en').value.trim(), ko: r.querySelector('.vocab-ko').value.trim() }))
      .filter(w => w.en && w.ko);

    if (words.length < 5) { this.toast('5지선다 시험을 위해 단어를 최소 5개 입력해주세요.', 'error'); return; }

    let savedSet;
    try {
      savedSet = await AppData.saveOrUpdateVocabSet({ id: setId || undefined, book, title, studentIds: [], words, createdAt: new Date().toISOString().split('T')[0] });
    } catch (error) {
      console.error(error);
      return;
    }
    this.closeVocabSetModal();
    this.toast(`'[${book}] ${title}' 세트가 저장되었습니다! (${words.length}개 단어)`, 'success');
    if (this.state.vocabSetReturnToTestForm) {
      const currentSet2 = document.getElementById('formVocabSetId2')?.value || '';
      this.renderFormVocabSetSelect(savedSet.id, currentSet2);
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
          ${sets.map(set => {
            const bookName = (set.book || '기본 단어장').trim();
            const isMockSpecial = Boolean(set.isMockSpecial || bookName.includes('9모') || bookName.includes('모의고사') || set.title.includes('9모'));
            return `
            <div class="p-4 rounded-2xl ${isMockSpecial ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-50/50 via-white to-rose-50/30 shadow-md ring-1 ring-amber-300/60' : 'border border-indigo-100 bg-white/90 shadow-2xs'} flex flex-col gap-3">
              <div>
                <div class="flex items-center gap-1.5 flex-wrap mb-1">
                  <span class="text-[10px] font-bold ${isMockSpecial ? 'text-amber-900 bg-amber-100 border border-amber-300' : 'text-indigo-700 bg-indigo-50 border border-indigo-200/80'} px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                    <i class="fa-solid fa-folder text-[9px] ${isMockSpecial ? 'text-amber-600' : 'text-amber-500'}"></i> ${this.escapeHtml(bookName)}
                  </span>
                  ${isMockSpecial ? `
                    <span class="text-[10px] font-black text-white bg-gradient-to-r from-amber-500 to-rose-500 px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                      <i class="fa-solid fa-fire-flame-curved text-[9px]"></i> 9모대비 특별단어
                    </span>
                  ` : ''}
                </div>
                <p class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <i class="fa-solid ${isMockSpecial ? 'fa-star text-amber-500' : 'fa-file-lines text-indigo-500'} text-xs"></i>
                  <span class="${isMockSpecial ? 'text-amber-950 font-black' : ''}">${this.escapeHtml(set.title)}</span>
                </p>
                <p class="text-xs ${isMockSpecial ? 'text-amber-800 font-semibold' : 'text-slate-500'} mt-0.5">${set.words.length}개 단어 · 객관식, 스펠링, 통합</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                ${this.renderVocabTestButton(set, studentId, 2, '객관식', 'bg-violet-600 hover:bg-violet-700 shadow-violet-200')}
                ${this.renderVocabTestButton(set, studentId, 3, '스펠링', 'bg-blue-600 hover:bg-blue-700 shadow-blue-200')}
                ${this.renderVocabTestButton(set, studentId, 4, '통합', 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200')}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  isVocabTestUnlocked(studentId, setId, direction, testId = null) {
    const dir = Number(direction);
    if (dir === 2) return { unlocked: true };
    if (dir === 3) {
      const prevResult = AppData.getVocabTestResult(studentId, setId, 2, testId);
      if (!prevResult?.passed) {
        return { unlocked: false, requiredLabel: '객관식' };
      }
      return { unlocked: true };
    }
    if (dir === 4) {
      const prevResult = AppData.getVocabTestResult(studentId, setId, 3, testId);
      if (!prevResult?.passed) {
        return { unlocked: false, requiredLabel: '스펠링' };
      }
      return { unlocked: true };
    }
    return { unlocked: true };
  },

  renderVocabTestButton(set, studentId, direction, label, colorClass, testId = null) {
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);
    const result = AppData.getVocabTestResult(studentId, set.id, direction, testId);

    // 1. 통과 완료 상태: 통과 당시의 커트라인(기본 커트라인)을 고정 노출 (다음 회차 +2점 가산점 노출 버그 완벽 방지)
    if (result?.passed) {
      const passedCutoff = result.cutoffScore || this.getBaseVocabCutoffScore(scheduledTest, direction);
      return `
        <div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 flex flex-col justify-between gap-2 shadow-2xs">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-black text-emerald-950">${label}</span>
            <span class="text-[10px] font-bold text-emerald-700 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              ${passedCutoff}점 이상 통과
            </span>
          </div>
          <div class="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-circle-check"></i>
            <span>${result.score}점 · 통과 완료</span>
          </div>
        </div>`;
    }

    // 2. 미통과/재시험 상태일 때만 다음 회차 커트라인 계산
    const attemptCount = this.getVocabAttemptCount(studentId, set.id, direction, testId);
    const nextRound = attemptCount + 1;
    const cutoffScore = this.getVocabCutoffScore(scheduledTest, direction, nextRound);

    // 3. 순차 잠금 검사 (객관식 통과 -> 스펠링 통과 -> 통합)
    const unlockCheck = this.isVocabTestUnlocked(studentId, set.id, direction, testId);
    if (!unlockCheck.unlocked) {
      return `
        <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 flex flex-col justify-between gap-2.5 shadow-2xs opacity-85">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-black text-slate-500">${label}</span>
            <span class="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
              커트라인 ${cutoffScore}점
            </span>
          </div>
          <button type="button" onclick="App.toast('이전 단계인 \\'${unlockCheck.requiredLabel}\\' 시험을 먼저 통과해야 합니다.', 'info')" class="w-full py-2.5 rounded-xl bg-slate-200/90 hover:bg-slate-300/80 text-slate-600 text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-lock text-[11px] text-slate-400"></i>
            <span>${unlockCheck.requiredLabel} 통과 후 가능</span>
          </button>
        </div>`;
    }

    // 3. 주관식 채점 대기중 상태
    if (result?.direction === 4 && result?.waitingGrading && !result?.gradedByAdmin) {
      return `
        <div class="rounded-2xl border border-amber-300 bg-amber-50/80 p-3 flex flex-col justify-between gap-2 shadow-2xs">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-black text-amber-950">${label}</span>
            <span class="text-[10px] font-bold text-amber-800 bg-white/90 px-2 py-0.5 rounded-full border border-amber-200">
              커트라인 <strong>${cutoffScore}점</strong>
            </span>
          </div>
          <div class="w-full py-2 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
            <i class="fa-solid fa-hourglass-half text-amber-100 animate-pulse"></i>
            <span>채점 대기중 (${result.spellingScore ?? result.score}점)</span>
          </div>
        </div>`;
    }

    // 4. 10분 재응시 대기 중 (불합격 명확히 표출)
    if (result && result.retryAvailableAt && new Date(result.retryAvailableAt) > new Date()) {
      const minutes = Math.ceil((new Date(result.retryAvailableAt) - new Date()) / 60000);
      return `
        <div class="rounded-2xl border border-rose-200 bg-rose-50/70 p-3 flex flex-col justify-between gap-2 shadow-2xs">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-black text-rose-950">${label}</span>
            <span class="text-[10px] font-extrabold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
              불합격 (${result.score ?? 0}점)
            </span>
          </div>
          <div class="space-y-1">
            <div class="text-[11px] text-rose-800 font-semibold flex items-center justify-between">
              <span>다음: ${nextRound}회차 (커트라인 ${cutoffScore}점)</span>
              <span class="text-rose-600 font-bold"><i class="fa-solid fa-clock mr-1"></i>${minutes}분 후 재응시</span>
            </div>
            <div class="w-full py-1.5 rounded-xl bg-rose-100/90 text-rose-700 text-[11px] font-bold flex items-center justify-center gap-1.5">
              <span>재시험 대기 중</span>
            </div>
          </div>
          ${this.state.isAdminLoggedIn ? `
            <button type="button" onclick="App.resetVocabRetryCooldown('${studentId}', '${set.id}', ${direction}, ${testId ? `'${testId}'` : 'null'})" class="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-2xs">
              <i class="fa-solid fa-bolt text-[10px]"></i> 대기시간 즉시 해제 (바로 응시)
            </button>
          ` : ''}
        </div>`;
    }

    // 5. 시험 시간 불가 (종료 / 시작 전)
    const timeStatus = scheduledTest && this.getTestTimeStatus(scheduledTest);
    if (scheduledTest && !timeStatus.canStart) {
      const unavailableLabel = timeStatus.status === 'EXPIRED'
        ? '응시 시간 종료'
        : (timeStatus.status === 'NOT_STARTED' ? '응시 시작 전' : '응시 불가');
      return `
        <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 flex flex-col justify-between gap-2">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-black text-slate-600">${label}</span>
            <span class="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
              커트라인 ${cutoffScore}점
            </span>
          </div>
          <button onclick="App.notifyUnavailableVocabTest('${timeStatus.status}')" class="w-full py-2 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-lock text-[11px]"></i>
            <span>${unavailableLabel}</span>
          </button>
        </div>`;
    }

    // 6. 응시 가능 상태 (시작 / 재응시 명확 분기)
    const isRetest = Boolean(result && !result.passed);
    const roundBadge = nextRound > 1 ? `${nextRound}회차 ` : '';
    const buttonText = isRetest ? `${nextRound}회차 재시험 응시` : '테스트 시작';
    const buttonIcon = isRetest ? 'fa-rotate-right' : 'fa-play';
    return `
      <div class="rounded-2xl border ${isRetest ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/90 bg-white'} p-3 flex flex-col justify-between gap-2.5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition group">
        <div class="flex items-center justify-between gap-1">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition">${label}</span>
            ${isRetest ? `
              <span class="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                불합격 (${result.score ?? 0}점)
              </span>
            ` : ''}
          </div>
          <span class="text-[10px] font-bold ${isRetest ? 'text-rose-700 bg-rose-50 border border-rose-200' : 'text-indigo-700 bg-indigo-50 border border-indigo-100'} px-2 py-0.5 rounded-full">
            ${roundBadge}커트라인 <strong>${cutoffScore}점</strong>
          </span>
        </div>
        <button onclick="App.startVocabTest('${set.id}', ${studentId}, ${direction}, ${testId ? `'${testId}'` : 'null'})" class="w-full py-2.5 rounded-xl ${colorClass} text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
          <i class="fa-solid ${buttonIcon} text-[11px]"></i>
          <span>${buttonText}</span>
        </button>
      </div>`;
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

  // ── 단어 테스트 10분 재응시 대기시간 즉시 해제 (선생님 관리자 권한 일회성 허용) ──
  async resetVocabRetryCooldown(studentId, setId, direction, testId = null) {
    if (!this.state.isAdminLoggedIn) {
      this.toast('관리자 권한이 필요합니다.', 'error');
      return;
    }

    const results = AppData.getVocabTestResults();
    const result = results.find(r => 
      String(r.studentId) === String(studentId) &&
      String(r.setId) === String(setId) &&
      Number(r.direction) === Number(direction) &&
      (!testId || String(r.testId) === String(testId))
    );

    if (result) {
      result.retryAvailableAt = null;
      await AppData.saveVocabTestResults(results);
    }

    if (testId) {
      const tests = AppData.getTests();
      const test = tests.find(t => String(t.id) === String(testId));
      if (test) {
        test.allowLate = true;
        test.allowRetest = true;
        await AppData.saveOrUpdateTest(test);
      }
    }

    this.toast('단어 테스트 대기시간(10분)이 즉시 해제되었습니다. 학생이 바로 재응시할 수 있습니다.', 'success');

    // 모달이 열려있다면 모달 갱신
    if (testId) {
      const currentModal = document.getElementById('testDetailModal');
      if (currentModal && !currentModal.classList.contains('hidden')) {
        this.openVocabTestScheduleModal(testId);
      }
    }

    this.renderAdminVocabTab();
    this.renderCalendar();
    this.renderAdminTestsTab();
  },

  // ── 한글 2벌식 -> 영문 알파벳 자동 변환 (한영 오타 실시간 교정) ──
  convertKorToEng(text) {
    if (!text) return '';
    const CHO_MAP = ['r', 'R', 's', 'e', 'E', 'f', 'a', 'q', 'Q', 't', 'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g'];
    const JUNG_MAP = ['k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'hk', 'ho', 'hl', 'y', 'n', 'nj', 'np', 'nl', 'b', 'm', 'ml', 'l'];
    const JONG_MAP = ['', 'r', 'R', 'rt', 's', 'sw', 'sg', 'e', 'f', 'fr', 'fa', 'fq', 'ft', 'fx', 'fv', 'fg', 'a', 'q', 'qt', 't', 'T', 'd', 'w', 'c', 'z', 'x', 'v', 'g'];
    const JAMO_MAP = {
      'ㄱ':'r','ㄲ':'R','ㄳ':'rt','ㄴ':'s','ㄵ':'sw','ㄶ':'sg','ㄷ':'e','ㄸ':'E','ㄹ':'f','ㄺ':'fr','ㄻ':'fa','ㄼ':'fq','ㄽ':'ft','ㄾ':'fx','ㄿ':'fv','ㅀ':'fg','ㅁ':'a','ㅂ':'q','ㅃ':'Q','ㅄ':'qt','ㅅ':'t','ㅆ':'T','ㅇ':'d','ㅈ':'w','ㅉ':'W','ㅊ':'c','ㅋ':'z','ㅌ':'x','ㅍ':'v','ㅎ':'g',
      'ㅏ':'k','ㅐ':'o','ㅑ':'i','ㅒ':'O','ㅓ':'j','ㅔ':'p','ㅕ':'u','ㅖ':'P','ㅗ':'h','ㅘ':'hk','ㅙ':'ho','ㅚ':'hl','ㅛ':'y','ㅜ':'n','ㅝ':'nj','ㅞ':'np','ㅟ':'nl','ㅠ':'b','ㅡ':'m','ㅢ':'ml','ㅣ':'l'
    };

    let result = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const code = ch.charCodeAt(0);
      if (code >= 0xAC00 && code <= 0xD7A3) {
        const sIdx = code - 0xAC00;
        const cho = Math.floor(sIdx / (21 * 28));
        const jung = Math.floor((sIdx % (21 * 28)) / 28);
        const jong = sIdx % 28;
        result += CHO_MAP[cho] + JUNG_MAP[jung] + JONG_MAP[jong];
      } else if (JAMO_MAP[ch]) {
        result += JAMO_MAP[ch];
      } else {
        result += ch;
      }
    }
    return result;
  },

  // ── 영문 2벌식 -> 한글 음절 자동 변환 및 조합 (영한 오타 실시간 교정) ──
  convertEngToKor(text) {
    if (!text) return '';
    const ENG_TO_JAMO = {
      'r':'ㄱ', 'R':'ㄲ', 's':'ㄴ', 'e':'ㄷ', 'E':'ㄸ', 'f':'ㄹ', 'a':'ㅁ', 'q':'ㅂ', 'Q':'ㅃ', 't':'ㅅ', 'T':'ㅆ', 'd':'ㅇ', 'w':'ㅈ', 'W':'ㅉ', 'c':'ㅊ', 'z':'ㅋ', 'x':'ㅌ', 'v':'ㅍ', 'g':'ㅎ',
      'k':'ㅏ', 'o':'ㅐ', 'i':'ㅑ', 'O':'ㅒ', 'j':'ㅓ', 'p':'ㅔ', 'u':'ㅕ', 'P':'ㅖ', 'h':'ㅗ', 'y':'ㅛ', 'n':'ㅜ', 'b':'ㅠ', 'm':'ㅡ', 'l':'ㅣ'
    };
    const CHO_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const JUNG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const JONG_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const COMPLEX_JUNG = {
      'ㅗㅏ':'ㅘ', 'ㅗㅐ':'ㅙ', 'ㅗㅣ':'ㅚ',
      'ㅜㅓ':'ㅝ', 'ㅜㅔ':'ㅞ', 'ㅜㅣ':'ㅟ',
      'ㅡㅣ':'ㅢ'
    };
    const COMPLEX_JONG = {
      'ㄱㅅ':'ㄳ', 'ㄴㅈ':'ㄵ', 'ㄴㅎ':'ㄶ',
      'ㄹㄱ':'ㄺ', 'ㄹㅁ':'ㄻ', 'ㄹㅂ':'ㄼ', 'ㄹㅅ':'ㄽ', 'ㄹㅌ':'ㄾ', 'ㄹㅍ':'ㄿ', 'ㄹㅎ':'ㅀ',
      'ㅂㅅ':'ㅄ'
    };

    const jamos = [];
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      jamos.push(ENG_TO_JAMO[ch] || ch);
    }

    const out = [];
    let i = 0;
    const n = jamos.length;

    while (i < n) {
      const c1 = jamos[i];

      if (!CHO_LIST.includes(c1) && !JUNG_LIST.includes(c1)) {
        out.push(c1);
        i++;
        continue;
      }

      if (!CHO_LIST.includes(c1)) {
        if (i + 1 < n && COMPLEX_JUNG[c1 + jamos[i + 1]]) {
          out.push(COMPLEX_JUNG[c1 + jamos[i + 1]]);
          i += 2;
        } else {
          out.push(c1);
          i++;
        }
        continue;
      }

      const cho = c1;
      if (i + 1 >= n || !JUNG_LIST.includes(jamos[i + 1])) {
        out.push(cho);
        i++;
        continue;
      }

      let jung = jamos[i + 1];
      let step = 2;

      if (i + 2 < n && COMPLEX_JUNG[jung + jamos[i + 2]]) {
        jung = COMPLEX_JUNG[jung + jamos[i + 2]];
        step = 3;
      }

      let jong = '';
      if (i + step < n && JONG_LIST.includes(jamos[i + step]) && jamos[i + step] !== '') {
        const cand1 = jamos[i + step];
        if (i + step + 1 < n && JUNG_LIST.includes(jamos[i + step + 1])) {
          // 뒤에 모음이 오면 다음 음절의 초성으로 넘김
        } else {
          if (i + step + 1 < n && COMPLEX_JONG[cand1 + jamos[i + step + 1]]) {
            const cand2 = COMPLEX_JONG[cand1 + jamos[i + step + 1]];
            if (i + step + 2 < n && JUNG_LIST.includes(jamos[i + step + 2])) {
              jong = cand1;
              step += 1;
            } else {
              jong = cand2;
              step += 2;
            }
          } else {
            jong = cand1;
            step += 1;
          }
        }
      }

      const choIdx = CHO_LIST.indexOf(cho);
      const jungIdx = JUNG_LIST.indexOf(jung);
      const jongIdx = JONG_LIST.indexOf(jong);
      const syllable = String.fromCharCode(0xAC00 + (choIdx * 21 + jungIdx) * 28 + jongIdx);
      out.push(syllable);
      i += step;
    }

    return out.join('');
  },

  // ── 영어 스펠링 / 한글 뜻 입력 필터 (실시간 DOM 치환 제거: 한글 IME 조합 및 받침 유실 완벽 방지) ──
  filterSpellingEnglishOnly(inputEl) {
    // 실시간 DOM 치환을 수행하지 않고 브라우저/OS 네이티브 키보드 입력 완벽 보존
  },

  filterMeaningKoreanOnly(inputEl) {
    // 실시간 DOM 치환을 수행하지 않고 한글 받침 및 자모 조합 완벽 보존
  },

  // ── 사전식 실제 원어민 녹음 MP3 재생 & 발음기호(IPA) 헬퍼 ──────────────
  playDictionaryAudio(word) {
    if (!word) return;
    const clean = word.trim().toLowerCase();

    // 1. 고음질 사전 원어민 녹음 MP3 자동 1회 재생
    try {
      const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&type=2`;
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // 브라우저 자동재생 정책 또는 네트워크 이슈 시 fallback
          this.speakWordFallback(clean);
        });
      }
    } catch (e) {
      this.speakWordFallback(clean);
    }
  },

  speakWordFallback(word) {
    if (!word || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS Fallback Error:', e);
    }
  },

  // ── 스마트 AI / 시맨틱 한국어 뜻 채점 엔진 ──────────────────
  evaluateKoreanMeaningAI(studentMeaning, targetMeaning) {
    if (!studentMeaning || !targetMeaning) {
      return { match: false, score: 0, reason: '입력값 없음' };
    }
    const sClean = studentMeaning.trim().toLowerCase().replace(/[.,~!?]/g, '');
    const tClean = targetMeaning.trim().toLowerCase().replace(/[.,~!?]/g, '');
    if (!sClean || !tClean) {
      return { match: false, score: 0, reason: '유효한 텍스트 없음' };
    }

    // 1. 단순 일치 및 후보별 일치 검사
    const targetCandidates = targetMeaning
      .split(/[,;\/\n]/)
      .map(s => s.trim().toLowerCase().replace(/[.,~!?]/g, ''))
      .filter(Boolean);

    if (targetCandidates.some(c => c === sClean)) {
      return { match: true, score: 1.0, reason: '완벽 일치' };
    }

    // 2. 포함 관계 (예: "버리다, 포기하다"에서 "버리다" 또는 "포기")
    if (targetCandidates.some(c => c.includes(sClean) || sClean.includes(c))) {
      return { match: true, score: 0.95, reason: '핵심 의미 일치' };
    }

    // 3. 한국어 조사 및 어미 정규화 (어간 비교)
    const normalizeStem = (text) => {
      return text
        .replace(/(하다|되다|시키다|받다|거리다|이다|롭다|스럽다|맞다)$/g, '')
        .replace(/(을|를|이|가|에|의|로|으로|에서|와|과|도)$/g, '')
        .trim();
    };

    const sStem = normalizeStem(sClean);
    if (sStem && sStem.length >= 2) {
      const stemMatched = targetCandidates.some(c => {
        const cStem = normalizeStem(c);
        return cStem && (cStem.includes(sStem) || sStem.includes(cStem));
      });
      if (stemMatched) {
        return { match: true, score: 0.9, reason: '어간/활용형 일치' };
      }
    }

    // 4. 자주 쓰이는 유의어/동의어 매핑
    const synonymDictionary = {
      '포기': ['버리다', '단념', '체념', '그만두다', '손을떼다', '내버려두다'],
      '버리다': ['포기', '유기', '내버리다', '단념'],
      '획득': ['얻다', '취득', '구하다', '차지하다', '얻음'],
      '얻다': ['획득', '취득', '구하다', '받다'],
      '성공': ['이루다', '달성', '완수', '해내다'],
      '실패': ['그르치다', '낙방', '패배', '틀리다'],
      '돕다': ['도움', '원조', '지원', '협력', '거들다', '보조'],
      '중요한': ['핵심', '필수', '중대한', '주요한', '귀중한'],
      '시작': ['착수', '출발', '개시', '시작하다', '열다'],
      '끝': ['종료', '완료', '마침', '결말'],
      '거절': ['거부', '물리치다', '사양', '퇴짜'],
      '수락': ['받아들이다', '승낙', '동의', '인정']
    };

    for (const [key, syns] of Object.entries(synonymDictionary)) {
      const matchS = sClean.includes(key) || syns.some(syn => sClean.includes(syn));
      const matchT = tClean.includes(key) || syns.some(syn => tClean.includes(syn));
      if (matchS && matchT) {
        return { match: true, score: 0.85, reason: '유의어/동의어 판정' };
      }
    }

    return { match: false, score: 0.2, reason: '의미 불일치' };
  },

  checkKoreanMeaningMatch(input, targetKo) {
    const evalResult = this.evaluateKoreanMeaningAI(input, targetKo);
    return evalResult.match;
  },

  getVocabDirectionLabel(direction) {
    const dir = Number(direction);
    if (dir === 2) return '객관식';
    if (dir === 3) return '스펠링';
    if (dir === 4) return '통합';
    return '단어 테스트';
  },

  getVocabDirectionShortLabel(direction) {
    const dir = Number(direction);
    if (dir === 2) return '객관식';
    if (dir === 3) return '스펠링';
    if (dir === 4) return '통합';
    return '단어';
  },

  // ── 학생: 단어 테스트 시작 ──────────────────────────────
  startVocabTest(setId, studentId, direction, testId = null) {
    let set = null;
    const scheduledTest = testId && AppData.getTests().find(test => test.id === testId);

    if (scheduledTest) {
      const setIds = Array.isArray(scheduledTest.vocabSetIds) && scheduledTest.vocabSetIds.length > 0
        ? scheduledTest.vocabSetIds
        : (scheduledTest.vocabSetId ? [scheduledTest.vocabSetId] : []);
      const allSets = AppData.getVocabSets();
      const matchingSets = setIds.map(id => allSets.find(s => s.id === id)).filter(Boolean);
      if (matchingSets.length > 0) {
        const combinedWords = [];
        matchingSets.forEach(s => {
          if (Array.isArray(s.words)) combinedWords.push(...s.words);
        });
        set = {
          id: matchingSets.map(s => s.id).join(','),
          book: matchingSets[0]?.book || '기본 단어장',
          title: matchingSets.map(s => s.title).join(' + '),
          words: combinedWords
        };
      }
    }
    if (!set) {
      set = AppData.getVocabSets().find(s => s.id === setId);
    }

    if (!set || set.words.length < 5) { this.toast('단어가 부족합니다. (최소 5개)', 'error'); return; }
    if (![2, 3, 4].includes(direction)) { this.toast('올바른 테스트 모드가 아닙니다.', 'error'); return; }
    
    // 순차 잠금 검사 (객관식 통과 -> 스펠링 통과 -> 통합)
    const unlockCheck = this.isVocabTestUnlocked(studentId, set.id, direction, testId);
    if (!unlockCheck.unlocked) {
      this.toast(`이전 단계인 '${unlockCheck.requiredLabel}' 시험을 먼저 통과해야 합니다.`, 'error');
      return;
    }

    if (scheduledTest) {
      const timeStatus = this.getTestTimeStatus(scheduledTest);
      if (!timeStatus.canStart) {
        this.notifyUnavailableVocabTest(timeStatus.status);
        return;
      }
    }
    const existingResult = AppData.getVocabTestResult(studentId, set.id, direction, testId);
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
    const initialTime = direction === 2 ? 7 : (direction === 3 ? 15 : 20);

    const attemptCount = this.getVocabAttemptCount(studentId, set.id, direction, testId);
    const currentRound = attemptCount + 1;
    const baseCutoff = this.getBaseVocabCutoffScore(scheduledTest, direction);
    const cutoffScore = this.getVocabCutoffScore(scheduledTest, direction, currentRound);

    // 모드 3, 4인 경우 사전에 모든 단어의 발음기호를 즉시 백그라운드 프리페치하여 렉 완전 제거
    if (direction === 3 || direction === 4) {
      this.prefetchVocabPhonetics(testWords);
    }

    const bookName = (set.book || '').trim();
    const formattedTitle = (bookName && bookName !== '기본 단어장') ? `[${bookName}] ${set.title}` : set.title;

    this.state.vocabTest = {
      setId: set.id,
      studentId: Number(studentId),
      setTitle: formattedTitle,
      bookName: bookName || '기본 단어장',
      testId,
      startedAt,
      allWords: testWords,
      sourceWordCount: set.words.length,
      direction,
      questions: this.buildVocabQuestions(testWords, direction, set.words),
      currentIndex: 0,
      score: 0,
      currentRound,
      baseCutoff,
      cutoffScore,
      timerId: null,
      timeRemaining: initialTime,
      initialTimeLimit: initialTime,
      isCompleted: false
    };

    try {
      history.pushState({ inVocabTest: true }, '');
    } catch (e) {}

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
      if (direction === 2) {
        const others = this.shuffleItems(choicePool.filter(w => w !== word)).slice(0, 4);
        const correctChoice = word.ko;
        const wrongChoices = others.map(w => w.ko);
        const allChoices = this.shuffleItems([correctChoice, ...wrongChoices]);
        return {
          word,
          question: word.en,
          correct: correctChoice,
          choices: allChoices,
          answered: null,
          isCorrect: false
        };
      } else if (direction === 3) {
        return {
          word,
          question: word.en,
          correct: word.en,
          answered: null,
          isCorrect: false
        };
      } else {
        return {
          word,
          question: word.en,
          correct: `${word.en} / ${word.ko}`,
          answered: null,
          isCorrect: false
        };
      }
    });
  },

  async renderVocabQuestion() {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    const total = vt.questions.length;
    const dir = vt.direction;

    // Top info bar
    document.getElementById('vocabTestTopInfo').innerHTML = `
      <div class="flex items-center gap-2 sm:gap-3 flex-wrap w-full">
        <div>
          <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(vt.setTitle)}</span>
          <span class="text-xs text-slate-500 ml-2">문항 ${vt.currentIndex + 1} / ${total}</span>
        </div>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${dir === 2 ? 'bg-violet-100 text-violet-700' : (dir === 3 ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700')}">
          ${this.getVocabDirectionLabel(dir)}
        </span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-black ${vt.currentRound > 1 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
          ${vt.currentRound ? `${vt.currentRound}회차 · ` : ''}커트라인 ${vt.cutoffScore || 80}점
        </span>
        <span id="vocabTestTimer" class="ml-auto px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm sm:text-base font-black flex items-center gap-1.5">
          <i class="fa-regular fa-clock"></i>${vt.timeRemaining}초
        </span>
      </div>`;

    const progressPct = ((vt.currentIndex) / total) * 100;
    const contentEl = document.getElementById('vocabTestContent');

    if (dir === 2) {
      // ── 모드 2: 영어 → 한글 (5지선다) ──────────────────────
      contentEl.innerHTML = `
        <div class="space-y-6 max-w-2xl mx-auto">
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width:${progressPct}%"></div>
          </div>

          <div class="glass-card rounded-2xl p-6 sm:p-8 text-center space-y-6">
            <p class="text-xs font-bold text-slate-400">
              다음 영어 단어의 올바른 한국어 뜻을 고르세요
            </p>
            <div class="flex items-center justify-center gap-3 py-4 px-6 bg-indigo-50/80 rounded-2xl border border-indigo-100 inline-flex min-w-[220px] shadow-inner">
              <span class="text-3xl sm:text-4xl font-black text-slate-900">${this.escapeHtml(q.word.en)}</span>
              <button type="button" onclick="App.playDictionaryAudio('${this.escapeHtml(q.word.en)}')" class="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-sm transition flex-shrink-0 cursor-pointer" title="발음 다시 듣기">
                <i class="fa-solid fa-volume-high text-sm"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
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
    } else if (dir === 3) {
      // ── 모드 3: 발음/발음기호 → 영어 스펠링 쓰기 ────────────
      const directIpa = q.word.ipa || q.word.phonetic;
      const cachedIpa = directIpa || this.vocabIpaCache[q.word.en.trim().toLowerCase()] || '';
      contentEl.innerHTML = `
        <div class="space-y-6 max-w-2xl mx-auto">
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width:${progressPct}%"></div>
          </div>

          <div class="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-6 border border-slate-200/80 shadow-md">
            <!-- 심플 대형 발음기호 (유형 배지 없이 깔끔하게) -->
            <div class="py-8 px-6 bg-slate-50 border border-slate-200/80 rounded-3xl text-center flex items-center justify-center min-h-[96px]">
              <div id="vocabPhoneticBadge" class="font-ipa text-4xl sm:text-5xl font-bold text-slate-900 tracking-wider select-none">
                ${cachedIpa ? this.escapeHtml(cachedIpa) : '<i class="fa-solid fa-spinner fa-spin text-slate-400 text-2xl"></i>'}
              </div>
            </div>

            <!-- Input Box -->
            <div class="pt-1">
              <input
                type="text"
                id="vocabSpellingInput"
                class="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-center text-xl sm:text-2xl font-black text-slate-900 outline-none transition shadow-inner placeholder:text-slate-300 placeholder:font-normal"
                placeholder="영어 단어 입력"
                autofocus
                autocomplete="off"
                autocorrect="off"
                autocapitalize="none"
                spellcheck="false"
                lang="en"
                inputmode="latin"
                onkeydown="if(event.key==='Enter') App.submitVocabSpellingAnswer(false)"
              />
            </div>

            <button
              type="button"
              onclick="App.submitVocabSpellingAnswer(false)"
              class="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>답안 제출 및 다음 문제 (Enter)</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>`;
    } else if (dir === 4) {
      // ── 모드 4: 발음/발음기호 → 스펠링 + 한글 뜻 쓰기 (일체형 가운데 정렬) ──────────
      const directIpa = q.word.ipa || q.word.phonetic;
      const cachedIpa = directIpa || this.vocabIpaCache[q.word.en.trim().toLowerCase()] || '';
      contentEl.innerHTML = `
        <div class="space-y-6 max-w-2xl mx-auto">
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div class="bg-emerald-600 h-2 rounded-full transition-all duration-300" style="width:${progressPct}%"></div>
          </div>

          <div class="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-6 border border-slate-200/80 shadow-md">
            <!-- 심플 대형 발음기호 (유형 배지 없이 깔끔하게) -->
            <div class="py-8 px-6 bg-slate-50 border border-slate-200/80 rounded-3xl text-center flex items-center justify-center min-h-[96px]">
              <div id="vocabPhoneticBadge" class="font-ipa text-4xl sm:text-5xl font-bold text-slate-900 tracking-wider select-none">
                ${cachedIpa ? this.escapeHtml(cachedIpa) : '<i class="fa-solid fa-spinner fa-spin text-slate-400 text-2xl"></i>'}
              </div>
            </div>

            <!-- Inputs Box: 위/아래 일체형 연결 & 가운데 정렬 -->
            <div class="pt-1">
              <div class="rounded-2xl border-2 border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 overflow-hidden bg-white shadow-inner transition divide-y divide-slate-200">
                <input
                  type="text"
                  id="vocabSpellingInput"
                  class="w-full p-4 text-center text-xl sm:text-2xl font-black text-slate-900 outline-none bg-transparent placeholder:text-slate-300 placeholder:font-normal transition"
                  placeholder="영어 스펠링 입력"
                  autofocus
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="none"
                  spellcheck="false"
                  lang="en"
                  inputmode="latin"
                  onkeydown="if(event.key==='Enter'){event.preventDefault();document.getElementById('vocabMeaningInput')?.focus();}"
                />
                <input
                  type="text"
                  id="vocabMeaningInput"
                  class="w-full p-4 text-center text-xl sm:text-2xl font-black text-slate-900 outline-none bg-transparent placeholder:text-slate-300 placeholder:font-normal transition"
                  placeholder="한국어 뜻 입력"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  lang="ko"
                  onkeydown="if(event.key==='Enter'){event.preventDefault();App.submitVocabComprehensiveAnswer(false);}"
                />
              </div>
            </div>

            <button
              type="button"
              onclick="App.submitVocabComprehensiveAnswer(false)"
              class="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>답안 제출 및 다음 문제 (Enter)</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>`;
    }

    // 모든 시험(객관식, 스펠링, 통합): 사전식 MP3 자동 1회 재생
    setTimeout(() => {
      this.playDictionaryAudio(q.word.en);
      const inputEl = document.getElementById('vocabSpellingInput');
      if (inputEl) inputEl.focus();
    }, 50);

    // 스펠링/통합 시험인 경우: 대형 발음기호 비동기 주입 (직접 발음기호 우선)
    if (dir === 3 || dir === 4) {
      const directIpa = q.word.ipa || q.word.phonetic;
      if (directIpa) {
        const badgeEl = document.getElementById('vocabPhoneticBadge');
        if (badgeEl) {
          badgeEl.innerHTML = `<span class="tracking-wider">${this.escapeHtml(directIpa)}</span>`;
        }
      } else {
        this.fetchWordPhonetic(q.word.en).then(ipa => {
          const badgeEl = document.getElementById('vocabPhoneticBadge');
          if (badgeEl) {
            badgeEl.innerHTML = ipa
              ? `<span class="tracking-wider">${this.escapeHtml(ipa)}</span>`
              : `<span class="text-xl font-mono text-slate-500 font-bold">[${this.escapeHtml(q.word.en)}]</span>`;
          }
        });
      }
    }

    this.startVocabQuestionTimer();
  },

  startVocabQuestionTimer() {
    const vt = this.state.vocabTest;
    this.clearVocabQuestionTimer();
    vt.timeRemaining = vt.initialTimeLimit || (vt.direction === 2 ? 7 : (vt.direction === 3 ? 15 : 20));
    const timer = document.getElementById('vocabTestTimer');
    if (timer) timer.innerHTML = `<i class="fa-regular fa-clock"></i>${vt.timeRemaining}초`;
    vt.timerId = setInterval(() => {
      vt.timeRemaining--;
      const timerEl = document.getElementById('vocabTestTimer');
      if (timerEl) timerEl.innerHTML = `<i class="fa-regular fa-clock"></i>${vt.timeRemaining}초`;
      if (vt.timeRemaining <= 0) {
        if (vt.direction === 2) {
          this.submitVocabAnswer(null, true);
        } else if (vt.direction === 3) {
          this.submitVocabSpellingAnswer(true);
        } else {
          this.submitVocabComprehensiveAnswer(true);
        }
      }
    }, 1000);
  },

  clearVocabQuestionTimer() {
    if (this.state.vocabTest && this.state.vocabTest.timerId) {
      clearInterval(this.state.vocabTest.timerId);
      this.state.vocabTest.timerId = null;
    }
  },

  // ── 모드 2 답안 제출 (5지선다) ──────────────────────────
  selectVocabAnswer(choiceIndex) {
    this.submitVocabAnswer(choiceIndex, false);
  },

  submitVocabAnswer(choiceIndex, timedOut) {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    if (q.answered !== null) return;
    this.clearVocabQuestionTimer();

    const chosen = timedOut ? '시간 초과' : q.choices[choiceIndex];
    q.answered = chosen;
    const isCorrect = !timedOut && chosen === q.correct;
    q.isCorrect = isCorrect;
    if (isCorrect) vt.score++;

    q.choices.forEach((choice, i) => {
      const btn = document.getElementById(`vocabChoice_${i}`);
      if (!btn) return;
      btn.disabled = true;
      if (!timedOut && i === choiceIndex) {
        btn.className = 'vocab-choice-btn w-full p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 text-sm font-bold text-indigo-900 transition text-left flex items-center gap-3';
      }
    });

    setTimeout(() => {
      vt.currentIndex++;
      if (vt.currentIndex < vt.questions.length) {
        this.renderVocabQuestion();
      } else {
        this.renderVocabResult();
      }
    }, 120);
  },

  // ── 모드 3 답안 제출 (스펠링 주관식) ────────────────────
  submitVocabSpellingAnswer(timedOut) {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    if (q.answered !== null) return;
    this.clearVocabQuestionTimer();

    let inputVal = timedOut ? '' : (document.getElementById('vocabSpellingInput')?.value || '').trim();
    // 한글 자모로 영단어를 친 경우 (제출 시점에만 안전 변환 체크)
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(inputVal)) {
      const converted = this.convertKorToEng(inputVal);
      if (converted.toLowerCase() === q.word.en.trim().toLowerCase()) {
        inputVal = converted;
      }
    }
    const isCorrect = !timedOut && Boolean(inputVal) && inputVal.toLowerCase() === q.word.en.trim().toLowerCase();
    q.answered = timedOut ? '시간 초과' : (inputVal || '(미입력)');
    q.isCorrect = isCorrect;
    if (isCorrect) vt.score++;

    const inputEl = document.getElementById('vocabSpellingInput');
    if (inputEl) {
      inputEl.disabled = true;
    }

    setTimeout(() => {
      vt.currentIndex++;
      if (vt.currentIndex < vt.questions.length) {
        this.renderVocabQuestion();
      } else {
        this.renderVocabResult();
      }
    }, 120);
  },

  // ── 모드 4 답안 제출 (스펠링 + 뜻 종합) ──────────────────
  submitVocabComprehensiveAnswer(timedOut) {
    const vt = this.state.vocabTest;
    const q = vt.questions[vt.currentIndex];
    if (q.answered !== null) return;
    this.clearVocabQuestionTimer();

    let spelling = timedOut ? '' : (document.getElementById('vocabSpellingInput')?.value || '').trim();
    // 한글 자모로 영단어 스펠링을 친 경우 (제출 시점에만 안전 변환 체크)
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(spelling)) {
      const converted = this.convertKorToEng(spelling);
      if (converted.toLowerCase() === q.word.en.trim().toLowerCase()) {
        spelling = converted;
      }
    }

    let meaning = timedOut ? '' : (document.getElementById('vocabMeaningInput')?.value || '').trim();
    // 영문 키보드로 한글 뜻을 친 경우 (제출 시점에만 안전 변환 체크)
    if (/[a-zA-Z]/.test(meaning)) {
      const convertedMeaning = this.convertEngToKor(meaning);
      if (this.checkKoreanMeaningMatch(convertedMeaning, q.word.ko)) {
        meaning = convertedMeaning;
      }
    }

    // 1단계: 스펠링 우선 검증 (틀리면 즉시 오답)
    const spellingCorrect = !timedOut && Boolean(spelling) && spelling.toLowerCase() === q.word.en.trim().toLowerCase();
    
    // 2단계: 스펠링이 맞았을 때 한국어 뜻 검증
    const meaningCorrect = spellingCorrect ? this.checkKoreanMeaningMatch(meaning, q.word.ko) : false;
    const isCorrect = spellingCorrect && meaningCorrect;

    q.spellingInput = spelling;
    q.meaningInput = meaning;
    q.spellingCorrect = spellingCorrect;
    q.meaningCorrect = meaningCorrect;
    q.answered = timedOut ? '시간 초과' : `${spelling || '(스펠링 미입력)'} / ${meaning || '(뜻 미입력)'}`;
    q.isCorrect = isCorrect;
    if (isCorrect) vt.score++;

    const spellingEl = document.getElementById('vocabSpellingInput');
    const meaningEl = document.getElementById('vocabMeaningInput');
    if (spellingEl) spellingEl.disabled = true;
    if (meaningEl) meaningEl.disabled = true;

    setTimeout(() => {
      vt.currentIndex++;
      if (vt.currentIndex < vt.questions.length) {
        this.renderVocabQuestion();
      } else {
        this.renderVocabResult();
      }
    }, 120);
  },

  // ── 단어 테스트 결과 렌더링 ──────────────────────────────
  async renderVocabResult() {
    const vt = this.state.vocabTest;
    this.clearVocabQuestionTimer();
    vt.isCompleted = true;
    const total = vt.allWords.length;
    const directionLabel = this.getVocabDirectionLabel(vt.direction);
    const test = vt.testId && AppData.getTests().find(item => item.id === vt.testId);
    const currentRound = vt.currentRound || 1;
    const cutoffScore = vt.cutoffScore || this.getVocabCutoffScore(test, vt.direction, currentRound);

    const questionDetails = vt.questions.map((q, idx) => ({
      index: idx,
      word: q.word || { en: q.question, ko: q.correct },
      question: q.word ? q.word.en : q.question,
      correct: q.word ? (vt.direction === 4 ? `${q.word.en} : ${q.word.ko}` : (vt.direction === 2 ? q.word.ko : q.word.en)) : q.correct,
      answered: q.answered || '시간 초과',
      spellingInput: q.spellingInput ?? (vt.direction === 3 ? q.answered : ''),
      meaningInput: q.meaningInput ?? '',
      spellingCorrect: q.spellingCorrect ?? (vt.direction === 3 ? q.isCorrect : null),
      meaningCorrect: q.meaningCorrect ?? (vt.direction === 2 ? q.isCorrect : null),
      isCorrect: Boolean(q.isCorrect)
    }));

    let score = 0;
    let correctCount = 0;
    let passed = false;
    let waitingGrading = false;
    let retryAvailableAt = null;

    if (vt.direction === 4) {
      // ── 모드 4 (스펠링, 뜻): 스펠링으로 먼저 1차 채점 ──
      const spellingCorrectCount = questionDetails.filter(q => q.spellingCorrect).length;
      const spellingScore = Math.round((spellingCorrectCount / total) * 100);
      score = spellingScore;
      correctCount = spellingCorrectCount;

      if (spellingScore < cutoffScore) {
        // 스펠링 점수가 커트라인 미달 -> 바로 불합격 & 10분 후 재응시
        passed = false;
        waitingGrading = false;
        retryAvailableAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      } else {
        // 스펠링 점수가 커트라인 이상 -> 채점 대기중!
        passed = false;
        waitingGrading = true;
        retryAvailableAt = null;
      }
    } else {
      // ── 모드 2 (객관식), 모드 3 (스펠링) ──
      correctCount = vt.score;
      score = Math.round((correctCount / total) * 100);
      passed = score >= cutoffScore;
      waitingGrading = false;
      retryAvailableAt = passed ? null : new Date(Date.now() + 10 * 60 * 1000).toISOString();
    }

    const wrongAnswers = vt.direction === 4
      ? questionDetails.filter(q => !q.spellingCorrect).map(q => ({
          question: q.word ? `${q.word.en} (${q.word.ko})` : q.question,
          answer: q.spellingInput || '시간 초과 / 미입력',
          correct: q.word ? q.word.en : q.correct
        }))
      : questionDetails.filter(q => !q.isCorrect).map(q => ({
          question: q.word ? `${q.word.en} (${q.word.ko})` : q.question,
          answer: q.answered || '시간 초과',
          correct: q.word ? (vt.direction === 2 ? q.word.ko : q.word.en) : q.correct
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
        correctCount,
        total,
        passed,
        waitingGrading,
        spellingScore: score,
        round: currentRound,
        cutoffScore,
        questionDetails,
        wrongAnswers,
        retryAvailableAt,
        startedAt,
        completedAt
      });
      if (test) await this.updateVocabScheduleStatus(test.id);
    } catch (error) {
      console.error('단어 테스트 결과 저장 오류:', error);
    }

    document.getElementById('vocabTestTopInfo').innerHTML = `
      <span class="font-bold text-slate-800 text-sm">${this.escapeHtml(vt.setTitle)} — ${currentRound}회차 결과</span>`;

    let statusHeaderHtml = '';
    let statusBannerHtml = '';
    const nextCutoff = this.getVocabCutoffScore(test, vt.direction, currentRound + 1);

    if (waitingGrading) {
      statusHeaderHtml = `
        <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-amber-100 text-amber-600 animate-pulse">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
            채점 대기중 (${currentRound}회차)
          </span>
          <h3 class="text-2xl font-black text-slate-900 mt-2">선생님 채점 대기중</h3>
          <p class="text-slate-500 text-sm mt-1">${directionLabel} · 스펠링 1차 정답 ${correctCount} / ${total}개 (커트라인 ${cutoffScore}점)</p>
          <div class="text-4xl font-black text-indigo-600 mt-3">${score}점 <span class="text-xs font-bold text-slate-400 font-normal">(스펠링 1차 점수)</span></div>
        </div>`;
      statusBannerHtml = `
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold space-y-1 text-left">
          <p class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-amber-600"></i> 스펠링 1차 채점 통과 (기준: ${cutoffScore}점 이상)</p>
          <p class="text-xs text-amber-700">선생님이 작성하신 한국어 뜻을 검토 및 채점한 후 최종 합격(PASS) 여부가 반영됩니다.</p>
        </div>`;
    } else if (passed) {
      statusHeaderHtml = `
        <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-emerald-100 text-emerald-600">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ${currentRound}회차 합격
          </span>
          <h3 class="text-2xl font-black text-emerald-700 mt-2">테스트 통과 (PASS)</h3>
          <p class="text-slate-500 text-sm mt-1">${directionLabel} · ${correctCount} / ${total} 정답 (커트라인 ${cutoffScore}점)</p>
          <div class="text-4xl font-black text-slate-900 mt-3">${score}점</div>
        </div>`;
      statusBannerHtml = `
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold">
          축하합니다! ${currentRound}회차 커트라인(${cutoffScore}점)을 통과하여 ${directionLabel} 테스트가 완료되었습니다.
        </div>`;
    } else {
      statusHeaderHtml = `
        <div class="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-rose-100 text-rose-600">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
            ${currentRound}회차 불합격
          </span>
          <h3 class="text-2xl font-black text-rose-700 mt-2">불합격 (FAIL)</h3>
          <p class="text-slate-500 text-sm mt-1">${directionLabel} · ${vt.direction === 4 ? `스펠링 ${correctCount} / ${total} 정답` : `${correctCount} / ${total} 정답`} (커트라인 ${cutoffScore}점)</p>
          <div class="text-4xl font-black text-slate-900 mt-3">${score}점 ${vt.direction === 4 ? '<span class="text-xs font-normal text-slate-400">(스펠링 점수)</span>' : ''}</div>
        </div>`;
      statusBannerHtml = `
        <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-semibold text-left space-y-1">
          <p class="font-bold text-rose-800 flex items-center gap-1.5"><i class="fa-solid fa-circle-exclamation text-rose-600"></i> ${currentRound}회차 커트라인(${cutoffScore}점)에 미달하였습니다.</p>
          <p class="text-xs text-rose-700">다음 <strong>${currentRound + 1}회차 재시험 커트라인은 ${nextCutoff}점</strong>으로 올라갑니다. 10분 후 다시 도전할 수 있습니다.</p>
        </div>`;
    }

    document.getElementById('vocabTestContent').innerHTML = `
      <div class="glass-card rounded-2xl p-6 sm:p-8 space-y-6 text-center max-w-2xl mx-auto">
        ${statusHeaderHtml}
        ${statusBannerHtml}

        <!-- 오답 노트 섹션 -->
        ${wrongAnswers.length > 0 ? `
          <div class="text-left space-y-3 pt-2">
            <h4 class="text-xs font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-wider">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>${vt.direction === 4 ? '틀린 단어 목록' : '틀린 단어 오답 노트'} (${wrongAnswers.length}개)</span>
            </h4>
            <div class="max-h-60 overflow-y-auto rounded-xl border border-rose-100 divide-y divide-slate-100 bg-rose-50/30 text-xs">
              ${wrongAnswers.map((item, idx) => `
                <div class="p-3 grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] gap-2 items-center">
                  <span class="font-bold text-slate-400 w-6">${idx + 1}</span>
                  <div>
                    <span class="font-bold text-slate-800">${this.escapeHtml(item.question)}</span>
                    <div class="text-[11px] text-rose-600 mt-0.5">내가 적은 답: <strong>${this.escapeHtml(item.answer)}</strong></div>
                  </div>
                  <div class="text-left sm:text-right">
                    <span class="text-[11px] text-slate-500">정답:</span>
                    <span class="font-bold text-emerald-700 ml-1">${this.escapeHtml(item.correct)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold">
            ${vt.direction === 3 ? '모든 스펠링 문제를 완벽하게 맞혔습니다! (100점)' : (vt.direction === 2 ? '모든 객관식 문제를 완벽하게 맞혔습니다! (100점)' : '모든 단어 문제를 완벽하게 맞혔습니다! (100점)')}
          </div>
        `}

        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          ${!passed && retryAvailableAt ? `<button disabled class="px-6 py-3 rounded-xl bg-slate-200 text-slate-500 font-bold flex items-center justify-center gap-2 text-xs"><i class="fa-solid fa-clock"></i> 10분 후 재응시 가능</button>` : ''}
          <button onclick="App.exitVocabTest()" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center justify-center gap-2 shadow-sm text-xs">
            <i class="fa-solid fa-arrow-left"></i> 학습공간으로 돌아가기
          </button>
        </div>
      </div>`;
  },

  async exitVocabTest() {
    const vt = this.state.vocabTest;
    if (vt && !vt.isCompleted) {
      const confirmExit = confirm('시험 진행 중에 나가면 0점(불합격) 처리되며 10분 동안 다시 응시할 수 없습니다.\n\n정말 시험을 종료하고 나가시겠습니까?');
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
        await this.showLanding();
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
      question: q.word ? `${q.word.en} (${q.word.ko})` : q.question,
      answer: q.answered || '중도 이탈',
      correct: q.word ? `${q.word.en} : ${q.word.ko}` : q.correct
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
        round: vt.currentRound || 1,
        cutoffScore: vt.cutoffScore || 80,
        wrongAnswers,
        retryAvailableAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        startedAt,
        completedAt
      });
      if (test) {
        test.status = 'FAIL';
        await this.updateVocabScheduleStatus(test.id);
      }
      this.toast('시험 중도 이탈로 0점(불합격) 처리되었습니다. (10분 후 재응시 가능)', 'error');
    } catch (error) {
      console.error(error);
    }
  },

  getBaseVocabCutoffScore(test, direction = null) {
    if (!test) return 80;

    // 1. 유형별 개별 커트라인 우선 조회
    if (direction) {
      if (test.vocabCutoffs && typeof test.vocabCutoffs === 'object') {
        const dirVal = Number(test.vocabCutoffs[direction] ?? test.vocabCutoffs[String(direction)]);
        if (Number.isInteger(dirVal) && dirVal >= 1 && dirVal <= 100) {
          return dirVal;
        }
      }
      if (test[`vocabCutoff_${direction}`] !== undefined) {
        const dirVal = Number(test[`vocabCutoff_${direction}`]);
        if (Number.isInteger(dirVal) && dirVal >= 1 && dirVal <= 100) {
          return dirVal;
        }
      }
    }

    // 2. 단일 vocabCutoff fallback
    const configuredCutoff = Number(test?.vocabCutoff);
    if (Number.isInteger(configuredCutoff) && configuredCutoff >= 1 && configuredCutoff <= 100) {
      return configuredCutoff;
    }

    // 3. 기존 legacy cutoff 문자열 파싱
    const match = String(test?.cutoff || '').match(/(\d+)/);
    const legacyCutoff = match ? Number(match[1]) : null;
    return Number.isInteger(legacyCutoff) && legacyCutoff >= 1 && legacyCutoff <= 100 ? legacyCutoff : 80;
  },

  getVocabCutoffScore(test, direction = null, round = 1) {
    const baseCutoff = this.getBaseVocabCutoffScore(test, direction);
    const r = Math.max(1, Number(round) || 1);
    let extra = 0;
    if (r === 2) {
      extra = 2; // 2회차: +2점
    } else if (r >= 3) {
      extra = 4; // 3회차: +4점, 4회차부터 +4점 고정
    }
    return Math.min(100, baseCutoff + extra);
  },

  getVocabAttemptCount(studentId, setId, direction, testId = null) {
    const result = AppData.getVocabTestResult(studentId, setId, direction, testId);
    if (!result) return 0;
    if (Array.isArray(result.attempts) && result.attempts.length > 0) {
      return result.attempts.length;
    }
    return (result.score !== undefined || result.completedAt) ? 1 : 0;
  },

  async updateVocabScheduleStatus(testId) {
    const test = AppData.getTests().find(item => item.id === testId);
    if (!test || test.type !== 'VOCAB') return;
    const results = AppData.getVocabTestResults().filter(result => result.testId === testId);
    const requiredDirections = [2, 3, 4];
    // 3가지 종목(2: 객관식, 3: 스펠링, 4: 스펠링, 뜻)이 모두 응시 완료되고 모두 통과해야만 전체 PASS!
    const allPassed = requiredDirections.every(dir => results.some(r => r.direction === dir && r.passed));
    const hasWaitingGrading = results.some(r => r.direction === 4 && r.waitingGrading && !r.gradedByAdmin);
    const anyFailed = results.some(r => !r.passed && !r.waitingGrading);

    test.status = allPassed ? 'PASS' : (hasWaitingGrading ? 'SCHEDULED' : (results.length > 0 ? (anyFailed ? 'FAIL' : 'SCHEDULED') : 'SCHEDULED'));
    test.score = results
      .sort((a, b) => a.direction - b.direction)
      .map(result => {
        if (result.direction === 4 && result.waitingGrading && !result.gradedByAdmin) {
          return `${this.getVocabDirectionShortLabel(result.direction)} ${result.score}점(채점대기)`;
        }
        return `${this.getVocabDirectionShortLabel(result.direction)} ${result.score}점`;
      })
      .join(' · ');
    test.retestStatus = 'NONE';
    await AppData.saveOrUpdateTest(test);
  },


  // ── 관리자 단어 채점 모달 ──────────────────────────────────
  _vocabGradingState: null,

  async openVocabGradingModal(studentIdOrResult, testId, direction, completedAt) {
    let result = null;

    if (typeof studentIdOrResult === 'object' && studentIdOrResult !== null) {
      result = studentIdOrResult;
    } else {
      const studentId = studentIdOrResult;
      const allResults = AppData.getVocabTestResults();
      
      // 1. 정확한 매칭 시도
      result = allResults.find(r => 
        String(r.studentId) === String(studentId) &&
        String(r.testId || '') === String(testId || '') &&
        Number(r.direction) === Number(direction) &&
        (!completedAt || r.completedAt === completedAt)
      );

      // 2. 시간 제외 매칭
      if (!result) {
        result = allResults.find(r => 
          String(r.studentId) === String(studentId) &&
          String(r.testId || '') === String(testId || '') &&
          Number(r.direction) === Number(direction)
        );
      }

      // 3. ID 매칭 시도
      if (!result) {
        result = allResults.find(r => r.id === studentId);
      }
    }

    if (!result) {
      this.toast('채점 대상을 찾을 수 없습니다.', 'error');
      return;
    }

    const student = AppData.getStudents().find(s => String(s.id) === String(result.studentId));
    const test = AppData.getTests().find(t => String(t.id) === String(result.testId));
    let matchingSets = [];
    if (test) {
      const setIds = Array.isArray(test.vocabSetIds) && test.vocabSetIds.length > 0
        ? test.vocabSetIds
        : (test.vocabSetId ? [test.vocabSetId] : []);
      matchingSets = setIds.map(id => AppData.getVocabSets().find(s => String(s.id) === String(id))).filter(Boolean);
    }
    const set = matchingSets[0] || AppData.getVocabSets().find(s => String(s.id) === String(result.setId));
    if (matchingSets.length === 0 && set) {
      matchingSets = [set];
    }
    const combinedSetWords = [];
    matchingSets.forEach(s => {
      if (Array.isArray(s.words)) combinedSetWords.push(...s.words);
    });
    const setTitles = matchingSets.map(s => s.title).join(' + ') || set?.title || '단어 세트';

    // questionDetails가 없는 이전 기록인 경우 세트 단어로부터 기본 구성
    if (!result.questionDetails || result.questionDetails.length === 0) {
      const wrongList = result.wrongAnswers || [];
      if (combinedSetWords.length > 0) {
        result.questionDetails = combinedSetWords.map((w, idx) => {
          const wrongItem = wrongList.find(wr => 
            (wr.question && wr.question.includes(w.en)) || 
            (wr.correct && wr.correct.includes(w.en))
          );
          const isCorrect = !wrongItem;
          return {
            index: idx,
            word: w,
            question: w.en,
            correct: `${w.en} : ${w.ko}`,
            answered: wrongItem ? wrongItem.answer : `${w.en} / ${w.ko}`,
            spellingInput: wrongItem ? (wrongItem.answer?.split('/')[0]?.trim() || '') : w.en,
            meaningInput: wrongItem ? (wrongItem.answer?.split('/')[1]?.trim() || '') : w.ko,
            spellingCorrect: isCorrect,
            meaningCorrect: isCorrect,
            isCorrect: isCorrect
          };
        });
      } else {
        this.toast('이 시험 기록의 단어 정보를 불러올 수 없습니다.', 'warning');
        return;
      }
    }

    // 채점 상태를 클론해서 메모리에서 수정
    this._vocabGradingState = {
      result,
      student,
      test,
      set,
      items: result.questionDetails.map((q, i) => ({ ...q, _gradingCorrect: Boolean(q.isCorrect) }))
    };

    // 헤더/서브타이틀
    document.getElementById('vocabGradingTitle').textContent = `${student?.name || '학생'} — 통합 채점`;
    document.getElementById('vocabGradingSubtitle').textContent =
      `${test?.title || '단어 테스트'} · ${setTitles} · ${this.getVocabResultTimeString(result)}`;

    this._renderVocabGradingSummary();
    this._renderVocabGradingItems();

    const modal = document.getElementById('vocabGradingModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeVocabGradingModal() {
    const modal = document.getElementById('vocabGradingModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    this._vocabGradingState = null;
  },

  _renderVocabGradingSummary() {
    const gs = this._vocabGradingState;
    if (!gs) return;
    const items = gs.items;
    const correctCount = items.filter(q => q._gradingCorrect).length;
    const total = items.length;
    const test = gs.test;
    const cutoffScore = this.getVocabCutoffScore(test, 4);
    const score = Math.round((correctCount / total) * 100);
    const passed = score >= cutoffScore;
    const pendingCount = items.filter(q => q.spellingCorrect && !q.meaningCorrect).length;

    document.getElementById('vocabGradingSummaryBar').innerHTML = `
      <div class="flex items-center gap-1.5">
        <span class="font-bold text-indigo-900">정답</span>
        <span class="font-black text-indigo-700 text-sm">${correctCount} / ${total}</span>
      </div>
      <div class="w-px h-4 bg-indigo-200"></div>
      <div class="flex items-center gap-1.5">
        <span class="font-bold text-indigo-900">점수</span>
        <span class="font-black text-sm ${passed ? 'text-emerald-700' : 'text-rose-700'}">${score}점</span>
        <span class="font-bold text-xs ${passed ? 'text-emerald-600 bg-emerald-100 border-emerald-200' : 'text-rose-600 bg-rose-100 border-rose-200'} px-2 py-0.5 rounded-full border">${passed ? 'PASS' : 'FAIL'}</span>
      </div>
      ${pendingCount > 0 ? `
        <div class="w-px h-4 bg-indigo-200"></div>
        <div class="flex items-center gap-1 text-amber-700">
          <i class="fa-solid fa-triangle-exclamation text-amber-500 text-[10px]"></i>
          <span>뜻 검토 필요 ${pendingCount}개</span>
        </div>
      ` : ''}
      <div class="ml-auto text-[10px] text-indigo-400">합격 기준: ${cutoffScore}점</div>
    `;
  },

  _renderVocabGradingItems() {
    const gs = this._vocabGradingState;
    if (!gs) return;
    const items = gs.items;

    const html = items.map((q, i) => {
      const isSpellingWrong = !q.spellingCorrect;
      const spellingOk = q.spellingCorrect;
      const isMeaningPending = spellingOk && !q.isCorrect; // 스펠링은 맞지만 원래 오답(뜻 오류) -> 검토 대상
      const isMeaningManuallyOverridden = spellingOk && q._gradingCorrect !== q.isCorrect;

      let statusBadge = '';
      let cardBg = 'bg-white border-slate-200';

      if (isSpellingWrong) {
        cardBg = 'bg-rose-50/60 border-rose-200';
        statusBadge = `<span class="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1"><i class="fa-solid fa-times-circle"></i> 스펠링 오답</span>`;
      } else if (q._gradingCorrect) {
        cardBg = 'bg-emerald-50/60 border-emerald-200';
        statusBadge = `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1"><i class="fa-solid fa-check-circle"></i> 정답</span>`;
      } else {
        cardBg = 'bg-amber-50/60 border-amber-200';
        statusBadge = `<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1"><i class="fa-solid fa-exclamation-circle"></i> 뜻 오답</span>`;
      }

      const wordEn = q.word?.en || q.question || '';
      const wordKo = q.word?.ko || '';
      const spellingIn = q.spellingInput || '';
      const meaningIn = q.meaningInput || '';

      const toggleBtn = !isSpellingWrong ? `
        <button onclick="App._toggleVocabGradingItem(${i})"
          class="text-[11px] font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${q._gradingCorrect
            ? 'border-rose-200 bg-white text-rose-600 hover:bg-rose-50'
            : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}">
          ${q._gradingCorrect
            ? '<i class="fa-solid fa-xmark"></i> 오답으로 변경'
            : '<i class="fa-solid fa-check"></i> 정답 인정'}
        </button>` : '';

      return `
        <div class="rounded-xl border ${cardBg} p-3.5 space-y-2.5" id="grading-item-${i}">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold text-slate-400 bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">${i + 1}</span>
              <div>
                <span class="font-extrabold text-slate-800 text-sm">${this.escapeHtml(wordEn)}</span>
                <span class="text-slate-400 text-xs ml-1.5">${this.escapeHtml(wordKo)}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              ${statusBadge}
              ${toggleBtn}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="rounded-lg p-2 ${spellingOk ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}">
              <p class="text-[10px] font-bold ${spellingOk ? 'text-emerald-600' : 'text-rose-500'} mb-0.5">스펠링 입력</p>
              <p class="font-mono font-bold ${spellingOk ? 'text-emerald-800' : 'text-rose-700'}">${this.escapeHtml(spellingIn) || '(미입력)'}</p>
              ${!spellingOk ? `<p class="text-[10px] text-slate-500 mt-0.5">정답: <strong>${this.escapeHtml(wordEn)}</strong></p>` : ''}
            </div>
            <div class="rounded-lg p-2 ${q._gradingCorrect && spellingOk ? 'bg-emerald-50 border border-emerald-200' : spellingOk ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 border border-slate-200'}">
              <p class="text-[10px] font-bold ${q._gradingCorrect && spellingOk ? 'text-emerald-600' : spellingOk ? 'text-amber-600' : 'text-slate-400'} mb-0.5">뜻 입력</p>
              <p class="font-bold ${q._gradingCorrect && spellingOk ? 'text-emerald-800' : spellingOk ? 'text-amber-800' : 'text-slate-400'}">${this.escapeHtml(meaningIn) || '(미입력)'}</p>
              ${spellingOk ? `<p class="text-[10px] text-slate-500 mt-0.5">정답 뜻: <strong>${this.escapeHtml(wordKo)}</strong></p>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    document.getElementById('vocabGradingQuestionsList').innerHTML = html;
  },

  _toggleVocabGradingItem(index) {
    const gs = this._vocabGradingState;
    if (!gs) return;
    const item = gs.items[index];
    if (!item || !item.spellingCorrect) return; // 스펠링 오답은 토글 불가
    item._gradingCorrect = !item._gradingCorrect;
    this._renderVocabGradingSummary();
    this._renderVocabGradingItems();
  },

  autoGradeWithAI() {
    const gs = this._vocabGradingState;
    if (!gs) return;
    let autoGrantedCount = 0;
    gs.items.forEach(item => {
      if (!item.spellingCorrect) return; // 스펠링 오답은 건드리지 않음
      if (item.isCorrect) return; // 이미 정답인 항목은 그냥 유지
      // AI 시맨틱 분석
      const evalResult = this.evaluateKoreanMeaningAI(item.meaningInput || '', item.word?.ko || '');
      if (evalResult.match) {
        item._gradingCorrect = true;
        item._aiGranted = true;
        item._aiReason = evalResult.reason;
        autoGrantedCount++;
      }
    });
    this._renderVocabGradingSummary();
    this._renderVocabGradingItems();
    if (autoGrantedCount > 0) {
      this.toast(`AI가 ${autoGrantedCount}개 문항의 뜻을 유의어/동의어로 자동 인정했습니다. 검토 후 저장해주세요.`, 'success');
    } else {
      this.toast('AI가 추가로 인정할 수 있는 뜻이 없습니다.', 'info');
    }
  },

  async saveVocabGradingChanges() {
    const gs = this._vocabGradingState;
    if (!gs) return;
    const items = gs.items;
    const total = items.length;
    const correctCount = items.filter(q => q._gradingCorrect).length;
    const score = Math.round((correctCount / total) * 100);
    const test = gs.test;
    const cutoffScore = this.getVocabCutoffScore(test, 4);
    const passed = score >= cutoffScore;

    const updatedDetails = items.map(q => ({
      ...q,
      isCorrect: q._gradingCorrect
    }));
    const updatedWrongAnswers = updatedDetails.filter(q => !q.isCorrect).map(q => ({
      question: q.word ? `${q.word.en} (${q.word.ko})` : q.question,
      answer: q.answered || '',
      correct: q.word ? `${q.word.en} : ${q.word.ko}` : q.correct
    }));

    const updatedResult = {
      ...gs.result,
      score,
      correctCount,
      total,
      passed,
      waitingGrading: false,
      questionDetails: updatedDetails,
      wrongAnswers: updatedWrongAnswers,
      retryAvailableAt: passed ? null : new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      gradedByAdmin: true,
      gradedAt: new Date().toISOString()
    };

    try {
      await AppData.saveVocabTestResult(updatedResult);
      if (test) await this.updateVocabScheduleStatus(test.id);
      this.toast(`채점 저장 완료! (${score}점, ${passed ? 'PASS 통과' : 'FAIL 불합격'})`, passed ? 'success' : 'error');
      this.closeVocabGradingModal();
      // 관리자 탭 새로고침
      if (this.state.adminTab === 'vocab') this.renderAdminVocabTab?.();
    } catch (error) {
      console.error('채점 저장 오류:', error);
      this.toast('저장 중 오류가 발생했습니다.', 'error');
    }
  },

  // ── 본문 암기 출제 범위 설정 및 문단 렌더링 ───────────────────
  onTextMemorizeBookChange(bookName) {
    this.renderTextMemorizePassages(bookName);
  },

  renderTextMemorizePassages(bookName = 'YBM(박준언) 공통영어 2', selectedPassageIds = []) {
    const container = document.getElementById('formTextMemorizePassageList');
    if (!container) return;

    const allPassages = (typeof YBM_ENGLISH2_PASSAGES !== 'undefined') ? YBM_ENGLISH2_PASSAGES : [];
    const filtered = allPassages.filter(p => !bookName || p.book === bookName);

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-xs text-slate-400 py-3 text-center">선택한 교재의 본문 데이터가 없습니다.</p>';
      this.updateTextMemorizeCountBadge();
      return;
    }

    // 단원(lesson)별 그룹화
    const lessonMap = {};
    filtered.forEach(p => {
      if (!lessonMap[p.lesson]) {
        lessonMap[p.lesson] = {
          lessonTitle: p.lessonTitle,
          passages: []
        };
      }
      lessonMap[p.lesson].passages.push(p);
    });

    let html = '';
    Object.keys(lessonMap).sort((a, b) => Number(a) - Number(b)).forEach(lessonNum => {
      const group = lessonMap[lessonNum];
      const allSelectedInLesson = group.passages.every(p => selectedPassageIds.includes(p.id));

      html += `
        <div class="p-3 rounded-xl bg-white border border-indigo-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between gap-2 border-b border-indigo-100 pb-1.5">
            <h5 class="text-xs font-black text-indigo-950 flex items-center gap-1.5">
              <i class="fa-solid fa-bookmark text-indigo-500"></i> ${this.escapeHtml(group.lessonTitle)}
            </h5>
            <button type="button" onclick="App.toggleAllPassagesInLesson(${lessonNum}, ${!allSelectedInLesson})" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
              ${allSelectedInLesson ? '단원 전체 해제' : '단원 전체 선택'}
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            ${group.passages.map(p => {
              const isChecked = selectedPassageIds.includes(p.id);
              const sentenceCount = p.sentences.length;
              return `
                <label class="flex items-start gap-2 p-2.5 rounded-lg border ${isChecked ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold' : 'bg-slate-50/50 border-slate-200 text-slate-700 font-medium'} hover:bg-indigo-50 transition cursor-pointer text-xs">
                  <input type="checkbox" name="formPassageCheckbox" value="${p.id}" data-lesson="${p.lesson}" ${isChecked ? 'checked' : ''} onchange="App.onPassageCheckboxChange(this)" class="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                  <div class="flex-1 min-w-0">
                    <p class="font-bold leading-tight">${this.escapeHtml(p.partTitle)}</p>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.updateTextMemorizeCountBadge();
  },

  onPassageCheckboxChange(checkbox) {
    const parentLabel = checkbox.closest('label');
    if (parentLabel) {
      if (checkbox.checked) {
        parentLabel.className = 'flex items-start gap-2 p-2.5 rounded-lg border bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold hover:bg-indigo-50 transition cursor-pointer text-xs';
      } else {
        parentLabel.className = 'flex items-start gap-2 p-2.5 rounded-lg border bg-slate-50/50 border-slate-200 text-slate-700 font-medium hover:bg-indigo-50 transition cursor-pointer text-xs';
      }
    }
    this.updateTextMemorizeCountBadge();
  },

  toggleAllPassagesInLesson(lessonNum, checked) {
    const checkboxes = document.querySelectorAll(`input[name="formPassageCheckbox"][data-lesson="${lessonNum}"]`);
    checkboxes.forEach(cb => {
      cb.checked = checked;
      this.onPassageCheckboxChange(cb);
    });
    this.updateTextMemorizeCountBadge();
  },

  updateTextMemorizeCountBadge() {
    const checked = Array.from(document.querySelectorAll('input[name="formPassageCheckbox"]:checked')).map(cb => cb.value);
    const badge = document.getElementById('formTextMemorizeCountBadge');
    if (badge) {
      const allPassages = (typeof YBM_ENGLISH2_PASSAGES !== 'undefined') ? YBM_ENGLISH2_PASSAGES : [];
      const matched = allPassages.filter(p => checked.includes(p.id));
      const totalSentences = matched.reduce((acc, p) => acc + p.sentences.length, 0);
      badge.innerText = `${checked.length}개 문단 선택됨 (총 ${totalSentences}문장)`;
    }
  },

  // ── 스마트 빈칸 자동 추출 엔진 (시험 볼 때마다 랜덤으로 다른 위치 빈칸 생성) ──
  generateClozeBlanks(sentenceEn, sentIndex = 0) {
    const stopwords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
      'of', 'in', 'on', 'at', 'to', 'for', 'with', 'as', 'by', 'that',
      'this', 'it', 'its', 'they', 'them', 'their', 'he', 'his', 'him',
      'she', 'her', 'we', 'us', 'our', 'you', 'your', 'i', 'my', 'me',
      'so', 'if', 'not', 'no', 'do', 'does', 'did', 'have', 'has', 'had',
      'will', 'would', 'can', 'could', 'may', 'might', 'should', 'be',
      'been', 'being', 'than', 'into', 'who', 'which', 'from', 'when',
      'where', 'what', 'how', 'there', 'here', 'all', 'any', 'some',
      'up', 'out', 'off', 'down', 'over', 'under', 'again', 'then', 'once'
    ]);

    // 토큰 분리 (공백 기준)
    const tokens = sentenceEn.split(/\s+/);
    const blanks = [];
    
    // 빈칸 후보군 찾기
    const candidates = [];
    tokens.forEach((token, tokenIdx) => {
      const match = token.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9'-]+)([^a-zA-Z0-9]*)$/);
      if (match) {
        const prefix = match[1];
        const word = match[2];
        const suffix = match[3];
        const lower = word.toLowerCase();

        // 3글자 이상이고 불용어가 아닌 핵심 단어
        if (word.length >= 3 && !stopwords.has(lower) && !/^\d+$/.test(word)) {
          candidates.push({ tokenIdx, prefix, word, suffix });
        }
      }
    });

    // 문장당 빈칸 개수 계산 (단어 수의 약 35~45%, 최소 1개, 최대 4개)
    let targetCount = Math.max(1, Math.min(candidates.length, Math.round(candidates.length * 0.4)));
    if (candidates.length <= 2) targetCount = candidates.length;

    // 매 시험마다 다른 빈칸을 뚫기 위해 랜덤 셔플 (Fisher-Yates) 후 targetCount개 선택
    const shuffled = [...candidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }

    const selectedIndices = new Set(shuffled.slice(0, targetCount).map(c => c.tokenIdx));

    let blankSeq = 0;
    const tokenObjects = tokens.map((token, tokenIdx) => {
      const match = token.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9'-]+)([^a-zA-Z0-9]*)$/);
      if (match && selectedIndices.has(tokenIdx)) {
        const prefix = match[1];
        const word = match[2];
        const suffix = match[3];
        const blankId = `blank_${sentIndex}_${blankSeq++}`;
        const blankObj = {
          id: blankId,
          sentIndex,
          prefix,
          word,
          cleanWord: word.toLowerCase(),
          suffix,
          firstChar: word.charAt(0),
          length: word.length
        };
        blanks.push(blankObj);
        return { isBlank: true, blankObj };
      } else {
        return { isBlank: false, text: token };
      }
    });

    return { tokens: tokenObjects, blanks };
  },

  // ── 캘린더/목록에서 본문암기 시험 상세 모달 ──────────────────
  openTextMemorizeScheduleModal(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) { this.toast('시험 정보를 찾을 수 없습니다.', 'error'); return; }

    const student = AppData.getStudentById(test.studentId);
    const timeStatus = this.getTestTimeStatus(test);
    const existingResult = AppData.getTextMemorizeResult(test.studentId, test.id);
    const isPassed = test.status === 'PASS' || existingResult?.passed;
    const isAdmin = this.state.isAdminLoggedIn;

    const allPassages = (typeof YBM_ENGLISH2_PASSAGES !== 'undefined') ? YBM_ENGLISH2_PASSAGES : [];
    let passageIds = test.passageIds || [];
    if ((!Array.isArray(passageIds) || passageIds.length === 0) && allPassages.length > 0) {
      passageIds = [allPassages[0].id];
    }
    const matchedPassages = allPassages.filter(p => passageIds.includes(p.id));
    const totalSentences = matchedPassages.reduce((acc, p) => acc + (p.sentences?.length || 0), 0);

    document.getElementById('tmScheduleStudentBadge').innerText = student ? `${student.name} 학생 · 본문암기` : '본문암기 테스트';
    document.getElementById('tmScheduleTitle').innerText = test.title || '본문암기 테스트';

    let statusBadge = { class: 'bg-blue-100 text-blue-800 border border-blue-200', label: '시험 대기' };
    if (isPassed) {
      statusBadge = { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', label: '완료 (PASS)' };
    } else if (existingResult && !existingResult.passed) {
      if (test.allowRetest) {
        statusBadge = { class: 'bg-amber-100 text-amber-800 border border-amber-300', label: '재시험 응시 가능' };
      } else {
        statusBadge = { class: 'bg-rose-100 text-rose-800 border border-rose-300', label: '불합격 (FAIL)' };
      }
    } else if (test.allowLate) {
      statusBadge = { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', label: '상시 응시 가능' };
    } else if (timeStatus.status === 'EXPIRED') {
      statusBadge = { class: 'bg-rose-100 text-rose-800 border border-rose-300', label: '마감' };
    } else if (timeStatus.status === 'NOT_STARTED') {
      statusBadge = { class: 'bg-blue-100 text-blue-800 border border-blue-200', label: '시작 전' };
    } else {
      statusBadge = { class: 'bg-emerald-100 text-emerald-800 border border-emerald-300', label: '응시 가능' };
    }

    let actionButtonHtml = '';
    if (isAdmin) {
      actionButtonHtml = `
        <div class="space-y-2.5 pt-2">
          ${existingResult ? `
            <div class="p-3.5 rounded-xl ${existingResult.passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-amber-50 border border-amber-200 text-amber-800'} text-xs font-semibold flex items-center justify-between">
              <span>학생 점수: <strong>${existingResult.score}점 (${existingResult.correct}/${existingResult.total} 정답)</strong></span>
              <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${existingResult.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">${existingResult.passed ? 'PASS 통과' : '불합격'}</span>
            </div>

            <!-- 관리자 재시험 허용 토글 카드 (불합격 시 - 주황색) -->
            ${!existingResult.passed ? `
              <div class="p-3 rounded-xl border flex items-center justify-between gap-3 ${test.allowRetest ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}">
                <div>
                  <span class="text-xs font-bold ${test.allowRetest ? 'text-amber-900' : 'text-slate-700'}">
                    <i class="fa-solid fa-rotate-right mr-1"></i>재시험 응시 허용
                  </span>
                  <p class="text-[11px] ${test.allowRetest ? 'text-amber-700 font-semibold' : 'text-slate-400'}">
                    ${test.allowRetest ? '허용 중 — 학생이 재시험에 응시할 수 있습니다.' : '현재 비허용 — 학생이 다시 응시할 수 없습니다.'}
                  </p>
                </div>
                <button onclick="App.toggleTextMemorizeAllowRetest('${test.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${test.allowRetest ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}">
                  ${test.allowRetest ? '허용 취소' : '재시험 허용하기'}
                </button>
              </div>
            ` : ''}
          ` : (isPassed ? `
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
              <i class="fa-solid fa-circle-check mr-1"></i>본시험 통과 처리됨 · 완료
            </div>
          ` : `
            <div class="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold text-center">
              <i class="fa-solid fa-clock mr-1"></i>아직 학생이 시험에 응시하지 않았습니다. (${timeStatus.label})
            </div>
          `)}
          <div class="flex items-center gap-2">
            <button onclick="App.openRescheduleModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-calendar-days"></i> 일정 이동
            </button>
            <button onclick="App.openExtendTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-clock-rotate-left"></i> 시험 시간 연장
            </button>
            <button onclick="App.closeTextMemorizeScheduleModal(); App.openEditTestModal('${test.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-pen-to-square"></i> 전체 수정
            </button>
          </div>
        </div>
      `;
    } else {
      if (existingResult) {
        actionButtonHtml = `
          <div class="space-y-2.5 pt-2">
            <div class="p-3.5 rounded-xl ${existingResult.passed ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'} text-xs font-semibold flex items-center justify-between">
              <span>내 점수: <strong>${existingResult.score}점 (${existingResult.correct}/${existingResult.total} 정답)</strong></span>
              <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${existingResult.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">${existingResult.passed ? 'PASS 통과' : '불합격'}</span>
            </div>

            ${existingResult.passed ? `
              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                <i class="fa-solid fa-circle-check mr-1"></i>축하합니다! 본문암기 테스트를 통과했습니다.
              </div>
            ` : (test.allowRetest ? `
              <!-- 재시험 허용 시 즉시 재시험 응시하기 버튼 노출 -->
              <button onclick="App.closeTextMemorizeScheduleModal(); App.startTextMemorizeExam('${test.id}', ${test.studentId})" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm">
                <i class="fa-solid fa-rotate-right"></i> 본문암기 재시험 응시하기
              </button>
            ` : `
              <div class="p-3.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-600 text-xs text-center font-medium leading-relaxed">
                <i class="fa-solid fa-lock text-slate-400 mr-1"></i>불합격 처리되었습니다.<br>빽빽이 검사 후 다시 시도해주세요.
              </div>
            `)}
          </div>
        `;
      } else if (isPassed) {
        actionButtonHtml = `
          <div class="pt-2">
            <div class="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
              <i class="fa-solid fa-circle-check"></i> 본문암기 테스트 완료
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
            <button onclick="App.closeTextMemorizeScheduleModal(); App.startTextMemorizeExam('${test.id}', ${test.studentId})" class="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <i class="fa-solid fa-play"></i> 본문암기 테스트 시작하기 (${totalSentences}문장)
            </button>
          </div>
        `;
      }
    }

    const isFullSentence = test.textMemorizeMode === 'FULL_SENTENCE';
    const cutoffText = test.textMemorizeCutoffType === 'WRONG_COUNT'
      ? `오답 ${test.textMemorizeMaxWrong ?? 3}개 이하 허용`
      : `${test.textMemorizeCutoff || test.cutoffScore || 80}점 이상`;

    const body = document.getElementById('tmScheduleBody');
    body.innerHTML = `
      <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
        <div class="flex items-center justify-between gap-2 flex-wrap mb-1.5">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-600 text-white shadow-2xs inline-flex items-center gap-1">
              <i class="fa-solid fa-book text-[9px]"></i> ${this.escapeHtml(test.passageBook || 'YBM(박준언) 공통영어 2')}
            </span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${isFullSentence ? 'bg-violet-100 text-violet-800 border border-violet-200' : 'bg-indigo-100 text-indigo-800 border border-indigo-200'} inline-flex items-center gap-1">
              <i class="fa-solid ${isFullSentence ? 'fa-pen-clip' : 'fa-align-left'} text-[9px]"></i> ${isFullSentence ? '문장 전체 영작 (서술형)' : '빈칸 채우기'}
            </span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-extrabold ${statusBadge.class}">
            ${statusBadge.label}
          </span>
        </div>
        <p class="text-xs text-slate-600 mt-1">
          시험일: <strong>${test.date}</strong> · 통과 기준: <strong class="text-indigo-900">${cutoffText}</strong>
        </p>
        <p class="text-xs text-slate-600 mt-0.5">
          출제 범위: <strong>총 ${matchedPassages.length}개 문단 · ${totalSentences}개 문장</strong>
        </p>
      </div>

      <!-- 문단 목록 -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <i class="fa-solid fa-list-check text-indigo-600"></i> 출제 문단 범위
        </h4>
        <div class="max-h-48 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white">
          ${matchedPassages.length > 0 ? matchedPassages.map((p, idx) => `
            <div class="p-3 text-xs flex items-center justify-between hover:bg-slate-50 transition">
              <div>
                <span class="font-bold text-indigo-900">${this.escapeHtml(p.lessonTitle)}</span>
                <p class="text-slate-600 font-medium mt-0.5">${this.escapeHtml(p.partTitle)}</p>
              </div>
              <span class="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap">${p.sentences.length}문장</span>
            </div>
          `).join('') : '<div class="p-3 text-xs text-slate-400 text-center">선택된 본문 범위가 없습니다.</div>'}
        </div>
      </div>

      ${actionButtonHtml}
    `;

    this.showModal('textMemorizeScheduleModal');
  },

  closeTextMemorizeScheduleModal() {
    this.hideModal('textMemorizeScheduleModal');
  },

  // ── 학생 본문암기 시험 응시 엔진 ────────────────────────────
  startTextMemorizeExam(testId, studentId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) { this.toast('시험 정보를 찾을 수 없습니다.', 'error'); return; }

    const existingResult = AppData.getTextMemorizeResult(test.studentId, test.id);
    const isPassed = test.status === 'PASS' || existingResult?.passed;
    if (isPassed && !this.state.isAdminLoggedIn) {
      this.toast('이미 통과(PASS)한 본문암기 시험입니다.', 'info');
      return;
    }
    if (existingResult && !existingResult.passed && !test.allowRetest && !this.state.isAdminLoggedIn) {
      this.toast('선생님(관리자)의 재시험 허용 후 다시 응시할 수 있습니다.', 'warning');
      return;
    }

    // 재시험으로 응시하는 경우, 일회성 허용이므로 시작 즉시 allowRetest = false로 소진 처리
    if (test.allowRetest) {
      test.allowRetest = false;
      AppData.saveOrUpdateTest(test).catch(err => console.error('재시험 권한 일회성 소진 저장 오류:', err));
    }

    const allPassages = (typeof YBM_ENGLISH2_PASSAGES !== 'undefined') ? YBM_ENGLISH2_PASSAGES : [];
    const passageIds = test.passageIds || [];
    let matchedPassages = allPassages.filter(p => passageIds.includes(p.id));

    // 만약 passageIds가 구버전이거나 일치하지 않을 경우 안전하게 기본 본문 매칭
    if (matchedPassages.length === 0 && allPassages.length > 0) {
      if (test.title && test.title.includes('2과') || (test.scope && test.scope.includes('2과'))) {
        matchedPassages = allPassages.filter(p => p.id === 'ybm2_l2_all');
      } else {
        matchedPassages = allPassages.filter(p => p.id === 'ybm2_l1_all');
      }
      if (matchedPassages.length === 0) matchedPassages = [allPassages[0]];
    }

    if (matchedPassages.length === 0) {
      this.toast('출제된 본문 데이터가 없습니다.', 'error');
      return;
    }

    const isFullSentence = test.textMemorizeMode === 'FULL_SENTENCE';
    const cutoffType = test.textMemorizeCutoffType || 'SCORE';
    const maxWrong = test.textMemorizeMaxWrong ?? 3;
    const cutoffScore = test.textMemorizeCutoff || test.cutoffScore || 80;

    // 시험 상태 생성
    const examSentences = [];
    const allBlanks = [];
    let globalSentIdx = 0;

    matchedPassages.forEach(passage => {
      passage.sentences.forEach(s => {
        if (isFullSentence) {
          examSentences.push({
            sentIndex: globalSentIdx,
            passageId: passage.id,
            lessonTitle: passage.lessonTitle,
            partTitle: passage.partTitle,
            en: s.en,
            ko: s.ko
          });
        } else {
          const cloze = this.generateClozeBlanks(s.en, globalSentIdx);
          examSentences.push({
            sentIndex: globalSentIdx,
            passageId: passage.id,
            lessonTitle: passage.lessonTitle,
            partTitle: passage.partTitle,
            en: s.en,
            ko: s.ko,
            tokens: cloze.tokens,
            blanks: cloze.blanks
          });
          cloze.blanks.forEach(b => allBlanks.push(b));
        }
        globalSentIdx++;
      });
    });

    this.state.textMemorizeExam = {
      testId,
      studentId: Number(studentId),
      testTitle: test.title || '본문암기 테스트',
      bookName: test.passageBook || 'YBM(박준언) 공통영어 2',
      cutoffScore,
      cutoffType,
      maxWrong,
      textMemorizeMode: isFullSentence ? 'FULL_SENTENCE' : 'CLOZE',
      passages: matchedPassages,
      sentences: examSentences,
      allBlanks: allBlanks,
      userAnswers: {}
    };

    document.getElementById('tmExamTitle').innerText = isFullSentence ? '본문암기 테스트 (문장 전체 영작)' : '본문암기 테스트 (빈칸 채우기)';
    document.getElementById('tmExamSubtitle').innerText = isFullSentence
      ? `${this.state.textMemorizeExam.bookName} · 총 ${matchedPassages.length}개 문단 · ${examSentences.length}개 문장 영작`
      : `${this.state.textMemorizeExam.bookName} · 총 ${matchedPassages.length}개 문단 · ${allBlanks.length}개 빈칸`;
    document.getElementById('tmExamProgressBadge').innerText = isFullSentence
      ? `0 / ${examSentences.length}`
      : `0 / ${allBlanks.length}`;

    this.renderTextMemorizeExamBody();
    this.showModal('textMemorizeExamModal');

    // 첫 번째 인풋/텍스트에어리어에 자동 포커스
    setTimeout(() => {
      if (isFullSentence) {
        const firstTextarea = document.querySelector('#tmExamBody textarea.tm-sentence-input');
        if (firstTextarea) firstTextarea.focus();
      } else {
        const firstInput = document.querySelector('#tmExamBody input.tm-blank-input');
        if (firstInput) firstInput.focus();
      }
    }, 200);
  },

  renderTextMemorizeExamBody() {
    const exam = this.state.textMemorizeExam;
    if (!exam) return;

    const container = document.getElementById('tmExamBody');
    if (!container) return;

    const isFullSentence = exam.textMemorizeMode === 'FULL_SENTENCE';

    // 문단별 렌더링
    let currentPartTitle = '';
    let html = '';

    exam.sentences.forEach((s, sIdx) => {
      if (s.partTitle !== currentPartTitle) {
        currentPartTitle = s.partTitle;
        html += `
          <div class="pt-4 first:pt-0">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900 text-xs font-black mb-3">
              <i class="fa-solid fa-book-open text-indigo-600"></i> ${this.escapeHtml(s.lessonTitle)} - ${this.escapeHtml(s.partTitle)}
            </div>
          </div>
        `;
      }

      if (isFullSentence) {
        const val = exam.userAnswers['sent_' + s.sentIndex] || '';
        html += `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition space-y-2.5">
            <!-- 한글 해석 (메인 가이드) -->
            <div class="flex items-start gap-2">
              <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                ${sIdx + 1}
              </span>
              <p class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                ${this.escapeHtml(s.ko)}
              </p>
            </div>

            <!-- 영어 문장 전체 입력 Textarea -->
            <div class="relative pl-8">
              <textarea
                id="tm_sent_${s.sentIndex}"
                data-sent-index="${s.sentIndex}"
                rows="2"
                placeholder="한글 해석을 보고 올바른 영어 문장 전체를 입력하세요 (한영 자동 변환 지원)"
                oninput="App.onTmSentenceInput(this, ${s.sentIndex})"
                onkeydown="App.onTmSentenceKeydown(event, this)"
                class="tm-sentence-input w-full p-3 text-xs sm:text-sm font-semibold rounded-xl border-2 border-indigo-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden bg-white text-slate-900 resize-none transition shadow-2xs leading-relaxed"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              >${this.escapeHtml(val)}</textarea>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition space-y-2">
            <!-- 영어 본문 + 빈칸 인풋들 -->
            <div class="text-sm sm:text-base leading-relaxed text-slate-900 font-medium flex flex-wrap items-center gap-x-1.5 gap-y-2">
              ${s.tokens.map(token => {
                if (!token.isBlank) {
                  return `<span>${this.escapeHtml(token.text)}</span>`;
                }
                const b = token.blankObj;
                const val = exam.userAnswers[b.id] || '';
                const placeholder = `${'_'.repeat(Math.max(3, b.length))}`;
                const widthCh = Math.max(5, b.length + 2);

                return `
                  ${b.prefix ? `<span>${this.escapeHtml(b.prefix)}</span>` : ''}
                  <input
                    type="text"
                    id="${b.id}"
                    data-blank-id="${b.id}"
                    value="${this.escapeHtml(val)}"
                    placeholder="${placeholder}"
                    style="width: ${widthCh}ch;"
                    oninput="App.onTmBlankInput(this, '${b.id}')"
                    onkeydown="App.onTmBlankKeydown(event, this)"
                    class="tm-blank-input inline-block text-center font-bold px-2 py-1 text-xs sm:text-sm bg-white border-2 border-indigo-300 rounded-lg text-indigo-950 focus:bg-indigo-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-hidden transition shadow-2xs"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                  />
                  ${b.suffix ? `<span>${this.escapeHtml(b.suffix)}</span>` : ''}
                `;
              }).join(' ')}
            </div>

            <!-- 한글 해석 -->
            <p class="text-xs text-slate-500 font-normal pt-1 border-t border-slate-200/60 leading-normal">
              ${this.escapeHtml(s.ko)}
            </p>
          </div>
        `;
      }
    });

    container.innerHTML = html;
  },

  onTmBlankInput(inputElem, blankId) {
    // 한글 입력 시 영문으로 자동 변환 (한영 오타 실시간 교정 및 앞 글자 보존)
    if (this.state.textMemorizeExam) {
      this.state.textMemorizeExam.userAnswers[blankId] = inputElem.value;
      this.updateTmExamProgress();
    }
  },

  onTmBlankKeydown(event, inputElem) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (event.key === 'Enter') event.preventDefault();
      const allInputs = Array.from(document.querySelectorAll('#tmExamBody input.tm-blank-input'));
      const currentIndex = allInputs.indexOf(inputElem);
      if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
        allInputs[currentIndex + 1].select();
      }
    }
  },

  onTmSentenceInput(inputElem, sentIndex) {
    if (this.state.textMemorizeExam) {
      this.state.textMemorizeExam.userAnswers['sent_' + sentIndex] = inputElem.value;
      this.updateTmExamProgress();
    }
  },

  onTmSentenceKeydown(event, inputElem) {
    if ((event.key === 'Enter' && !event.shiftKey) || event.key === 'Tab') {
      event.preventDefault();
      const allInputs = Array.from(document.querySelectorAll('#tmExamBody textarea.tm-sentence-input'));
      const currentIndex = allInputs.indexOf(inputElem);
      if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
        allInputs[currentIndex + 1].select();
      }
    }
  },

  updateTmExamProgress() {
    const exam = this.state.textMemorizeExam;
    if (!exam) return;
    const isFullSentence = exam.textMemorizeMode === 'FULL_SENTENCE';
    const totalCount = isFullSentence ? exam.sentences.length : exam.allBlanks.length;
    const filledCount = Object.values(exam.userAnswers).filter(v => v && v.trim().length > 0).length;
    const badge = document.getElementById('tmExamProgressBadge');
    if (badge) badge.innerText = `${filledCount} / ${totalCount}`;
  },

  closeTextMemorizeExam() {
    this.hideModal('textMemorizeExamModal');
    this.state.textMemorizeExam = null;
  },

  // 문장 비교용 정규화 헬퍼 (구두점/공백/대소문자 정리)
  normalizeSentence(str) {
    if (!str) return '';
    return str
      .trim()
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ');
  },

  // ── 제출 및 실시간 채점 ──────────────────────────────────────
  async submitTextMemorizeExam() {
    const exam = this.state.textMemorizeExam;
    if (!exam) return;

    const isFullSentence = exam.textMemorizeMode === 'FULL_SENTENCE';
    let correctCount = 0;
    const wrongList = [];
    const totalCount = isFullSentence ? exam.sentences.length : exam.allBlanks.length;

    if (isFullSentence) {
      exam.sentences.forEach(s => {
        let userAns = (exam.userAnswers['sent_' + s.sentIndex] || '').trim();
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(userAns)) {
          const converted = this.convertKorToEng(userAns);
          if (this.normalizeSentence(converted) === this.normalizeSentence(s.en)) {
            userAns = converted;
          }
        }
        const normUser = this.normalizeSentence(userAns);
        const normCorrect = this.normalizeSentence(s.en);
        const isCorrect = normUser === normCorrect && normUser.length > 0;

        if (isCorrect) {
          correctCount++;
        } else {
          wrongList.push({
            sentIndex: s.sentIndex,
            ko: s.ko,
            correctEn: s.en,
            userAns: userAns || '(미입력)'
          });
        }
      });
    } else {
      exam.allBlanks.forEach(b => {
        let userAns = (exam.userAnswers[b.id] || '').trim().toLowerCase();
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(userAns)) {
          const converted = this.convertKorToEng(userAns).toLowerCase();
          if (converted === b.cleanWord) {
            userAns = converted;
          }
        }
        const isCorrect = userAns === b.cleanWord;

        if (isCorrect) {
          correctCount++;
        } else {
          wrongList.push({
            blank: b,
            userAns: exam.userAnswers[b.id] || '(미입력)',
            correctWord: b.word
          });
        }
      });
    }

    const wrongCount = totalCount - correctCount;
    const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passed = exam.cutoffType === 'WRONG_COUNT'
      ? (wrongCount <= exam.maxWrong)
      : (score >= exam.cutoffScore);

    // 제출 완료 표시
    exam.isCompleted = true;

    const resultData = {
      score,
      correct: correctCount,
      total: totalCount,
      wrongCount,
      passed,
      wrongList,
      mode: exam.textMemorizeMode,
      cutoffType: exam.cutoffType,
      cutoffScore: exam.cutoffScore,
      maxWrong: exam.maxWrong,
      completedAt: new Date().toISOString()
    };

    try {
      await AppData.saveTextMemorizeResult(exam.studentId, exam.testId, resultData);
      
      // tests 컬렉션의 test 상태와 점수도 함께 업데이트
      const test = AppData.getTests().find(t => t.id === exam.testId);
      if (test) {
        test.status = passed ? 'PASS' : 'FAIL';
        test.score = `${score}점`;
        test.allowRetest = false; // 재응시는 관리자 허용 필요
        await AppData.saveOrUpdateTest(test);
      }

      this.toast(`본문암기 테스트 제출 완료! ${score}점 (${passed ? 'PASS 통과' : '불합격'})`, passed ? 'success' : 'info');
    } catch (e) {
      console.error(e);
    }

    this.closeTextMemorizeExam();
    this.renderTextMemorizeResult(resultData, exam.testId, exam.studentId);
    
    // 화면 새로고침
    if (this.state.isAdminLoggedIn) {
      this.renderAdminDashboard();
    } else {
      this.renderStudentDashboard();
    }
  },

  renderTextMemorizeResult(result, testId, studentId) {
    this.state.lastTmResult = { result, testId, studentId };

    const iconElem = document.getElementById('tmResultIcon');
    const titleElem = document.getElementById('tmResultTitle');
    const subElem = document.getElementById('tmResultSubtitle');
    const scoreElem = document.getElementById('tmResultScore');
    const correctElem = document.getElementById('tmResultCorrect');
    const cutoffBadgeElem = document.getElementById('tmResultCutoffBadge');
    const wrongContainer = document.getElementById('tmResultWrongList');
    const footerElem = document.getElementById('tmResultFooter');

    const isFullSentence = result.mode === 'FULL_SENTENCE';
    const isWrongCountType = result.cutoffType === 'WRONG_COUNT';
    const wrongCount = result.wrongCount ?? (result.total - result.correct);

    if (result.passed) {
      iconElem.className = 'w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg';
      iconElem.innerHTML = '<i class="fa-solid fa-crown"></i>';
      titleElem.innerText = '통과 (PASS)';
      subElem.innerText = '축하합니다! 본문암기 테스트를 통과했습니다.';
      scoreElem.className = 'text-5xl font-black text-emerald-600';
    } else {
      iconElem.className = 'w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg';
      iconElem.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
      titleElem.innerText = '불합격 (FAIL)';
      subElem.innerText = '빽빽이 검사 후 다시 시도해주세요.';
      scoreElem.className = 'text-5xl font-black text-rose-600';
    }

    scoreElem.innerText = `${result.score}점`;
    correctElem.innerText = isFullSentence
      ? `${result.correct} / ${result.total}개 문장 정답 (오답 ${wrongCount}개)`
      : `${result.correct} / ${result.total}개 빈칸 정답 (오답 ${wrongCount}개)`;

    // 커트라인 따로 밑에 표시
    if (cutoffBadgeElem) {
      if (isWrongCountType) {
        cutoffBadgeElem.innerHTML = `
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-950 font-bold text-xs shadow-2xs">
            <i class="fa-solid fa-sliders text-indigo-600"></i> 커트라인: 최대 오답 <strong>${result.maxWrong ?? 3}개 이하</strong> 허용
          </span>
        `;
      } else {
        cutoffBadgeElem.innerHTML = `
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-950 font-bold text-xs shadow-2xs">
            <i class="fa-solid fa-sliders text-indigo-600"></i> 커트라인: <strong>${result.cutoffScore ?? 80}점 이상</strong>
          </span>
        `;
      }
    }

    // 오답 리스트 렌더링
    if (result.wrongList && result.wrongList.length > 0) {
      wrongContainer.innerHTML = `
        <h5 class="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-circle-exclamation text-rose-500"></i> 오답 복습 (${result.wrongList.length}개)
        </h5>
        <div class="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          ${isFullSentence ? result.wrongList.map((w, idx) => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div class="flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">${idx + 1}번 문장</span>
                <p class="font-bold text-slate-800">${this.escapeHtml(w.ko)}</p>
              </div>
              <div class="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-relaxed">
                <span class="font-bold text-rose-600 mr-1">[내 작성]:</span>${this.escapeHtml(w.userAns)}
              </div>
              <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold leading-relaxed">
                <span class="font-black text-emerald-700 mr-1">[정답 원문]:</span>${this.escapeHtml(w.correctEn)}
              </div>
            </div>
          `).join('') : result.wrongList.map(w => `
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2">
              <div>
                <span class="text-rose-600 font-bold line-through mr-2">${this.escapeHtml(w.userAns)}</span>
                <span class="text-emerald-700 font-black">➜ ${this.escapeHtml(w.correctWord)}</span>
              </div>
              <span class="text-[10px] text-slate-400">${w.blank ? w.blank.length : ''}글자</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      wrongContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
          <i class="fa-solid fa-circle-check mr-1"></i>모든 문제를 완벽하게 맞혔습니다! (오답 0개)
        </div>
      `;
    }

    if (footerElem) {
      footerElem.innerHTML = `
        <button onclick="App.closeTextMemorizeResult()" class="w-full py-3 rounded-2xl ${result.passed ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'} font-bold text-sm transition shadow-sm">
          확인 및 닫기
        </button>
      `;
    }

    this.showModal('textMemorizeResultModal');
  },

  closeTextMemorizeResult() {
    this.hideModal('textMemorizeResultModal');
  },

  // 관리자: 본문암기 재시험 허용 토글
  async toggleTextMemorizeAllowRetest(testId) {
    const test = AppData.getTests().find(t => t.id === testId);
    if (!test) return;
    const newVal = !test.allowRetest;
    test.allowRetest = newVal;
    try {
      await AppData.saveOrUpdateTest(test);
      this.toast(newVal ? '학생의 본문암기 재시험 응시가 허용되었습니다.' : '본문암기 재시험 허용이 취소되었습니다.', newVal ? 'success' : 'info');
      
      const scheduleModal = document.getElementById('textMemorizeScheduleModal');
      if (scheduleModal && !scheduleModal.classList.contains('hidden')) {
        this.openTextMemorizeScheduleModal(testId);
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

  // 시험 중간 포기 → 0점(불합격) 강제 저장
  async forfeitTextMemorizeTest() {
    const exam = this.state.textMemorizeExam;
    if (!exam || exam.isCompleted) return;

    exam.isCompleted = true; // 재진입 방지

    const resultData = {
      score: 0,
      correct: 0,
      total: exam.sentences ? exam.sentences.length : (exam.allBlanks ? exam.allBlanks.length : 0),
      passed: false,
      wrongList: [],
      cutoffScore: exam.cutoffScore,
      forfeit: true,
      completedAt: new Date().toISOString()
    };

    try {
      await AppData.saveTextMemorizeResult(exam.studentId, exam.testId, resultData);
      
      const test = AppData.getTests().find(t => t.id === exam.testId);
      if (test) {
        test.status = 'FAIL';
        test.score = '0점';
        test.allowRetest = false;
        await AppData.saveOrUpdateTest(test);
      }

      this.toast('시험을 포기하여 0점(불합격) 처리되었습니다.', 'error');
    } catch (e) {
      console.error(e);
    }

    this.hideModal('textMemorizeExamModal');
    this.state.textMemorizeExam = null;

    if (this.state.isAdminLoggedIn) {
      this.renderAdminDashboard();
    } else if (this.state.isStudentLoggedIn) {
      this.selectStudent(this.state.selectedStudentId);
    } else {
      this.showLanding();
    }
  }

};
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 사이트 초기화 시작');

  // 1. DOM이 준비되는 즉시 동기적으로 세션 복원 및 UI 렌더링 (새로고침 시 로그인 풀림 방지)
  App.init();

  try {
    // 2. Firestore에서 학생 데이터 불러오기
    await AppData.initializeStudents();
    console.log('👨‍🎓 학생 데이터 준비 완료');

    // 3. 시험 / 단어 데이터도 Firestore에서 준비
    await AppData.initializeCloudData();

    // 4. Firestore 실시간 감시 시작
    AppData.startStudentListener();
    AppData.startCloudListeners();

    // 5. 클라우드 최신 데이터가 로드된 후 현재 활성 세션 화면 다시 갱신
    if (App.state.isStudentLoggedIn && App.state.selectedStudentId) {
      App.renderStudentDashboard();
    } else if (App.state.isAdminLoggedIn) {
      App.renderAdminDashboard();
    }

    console.log('사이트 초기화 및 클라우드 동기화 완료');
  } catch (error) {
    console.error('클라우드 동기화 실패 (오프라인 모드로 동작):', error);
  }
});
