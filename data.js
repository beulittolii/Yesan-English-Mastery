/**
 * 영어과외 관리 웹사이트 - 기본 데이터 및 저장소 관리
 *
 * 현재 구조: 모든 앱 데이터는 Firebase Cloud Firestore에 저장됩니다.
 * 기존 localStorage 데이터는 Firestore 컬렉션이 비어 있는 첫 실행 때만
 * 안전하게 이전한 뒤 제거합니다.
 *
 * Firestore 구조
 * students/
 *   1
 *   2
 *   3
 *   4
 *   5
 *   6
 */

const LEGACY_STORAGE_KEYS = {
  tests: 'eng_tutoring_tests',
  vocabSets: 'eng_tutoring_vocab_sets',
  vocabTestResults: 'eng_tutoring_vocab_test_results'
};
const ADMIN_PASSWORD = '090927';


// ========================================================
// Firebase 데이터 캐시
// ========================================================

const FirebaseStore = {
  students: [],
  tests: [],
  vocabSets: [],
  vocabTestResults: [],
  studentsLoaded: false,
  studentListenerStarted: false,
  testsListenerStarted: false,
  vocabSetsListenerStarted: false,
  vocabTestResultsListenerStarted: false
};


// ========================================================
// 기본 6명 학생 프로필
// ========================================================

const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: '김민준',
    target: '수능 1등급 & 내신 1등급'
  },
  {
    id: 2,
    name: '이서연',
    target: '내신 영어 100점 & 모의고사 1등급'
  },
  {
    id: 3,
    name: '박도현',
    target: '고등 선행 문법 & 천일문 마스터'
  },
  {
    id: 4,
    name: '최지우',
    target: '수능 어휘 완성 & 구문 독해 정복'
  },
  {
    id: 5,
    name: '정현우',
    target: '수능 연계 교재 완벽 분석'
  },
  {
    id: 6,
    name: '한유진',
    target: '내신 영문법 기초 & 필수 단어 1500'
  }
];


// ========================================================
// 기본 샘플 시험 데이터 생성
// ========================================================

function generateDefaultTests() {
  const today = new Date();

  // 날짜 헬퍼: YYYY-MM-DD
  const getDateStr = (dayOffset) => {
    const d = new Date(today);
    d.setDate(today.getDate() + dayOffset);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  return [

    // ======================================================
    // 학생 1: 김민준
    // ======================================================

    {
      id: 'test_1_1',
      studentId: 1,
      title: '수능특강 영단어 Day 1-5 누적 테스트',
      date: getDateStr(-5),
      time: '18:00',
      scope: 'Day 1~5 표제어 150개 및 파생어 (총 40문항)',
      cutoff: '90점 이상 (36/40)',
      score: '95점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '어휘 암기 상태 매우 우수함. 파생어 형태 변화 문제도 완벽하게 풀어냄! 👏'
    },

    {
      id: 'test_1_2',
      studentId: 1,
      title: '천일문 핵심 구문독해 (관계사/분사구문)',
      date: getDateStr(-2),
      time: '19:00',
      scope: 'Unit 12~15 관계사절 수식 구조 직독직해 15문장 서술형',
      cutoff: '85점 이상',
      score: '78점',
      status: 'FAIL',
      retestStatus: 'RETEST_PENDING',
      retestDate: getDateStr(2),
      teacherNote: '복합관계대명사와 전치사+관계대명사 해석에서 감점 발생. 재시험 전 개념 요약노트 복습 필수!'
    },

    {
      id: 'test_1_3',
      studentId: 1,
      title: '9월 모의고사 대비 실전 빈칸추론 5개년',
      date: getDateStr(4),
      time: '18:30',
      scope: '2021-2025 평가원 고난도 빈칸 31~34번 유형 10지문',
      cutoff: '80점 이상 (8/10)',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '패러프레이징 원리와 연결사 전후 논리 관계를 집중적으로 점검할 예정입니다.'
    },


    // ======================================================
    // 학생 2: 이서연
    // ======================================================

    {
      id: 'test_2_1',
      studentId: 2,
      title: '능률 하이퍼 보카 Day 10-15',
      date: getDateStr(-6),
      time: '17:00',
      scope: 'Day 10~15 중요 다의어 및 예문 빈칸 (총 50문항)',
      cutoff: '90점 이상',
      score: '92점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '성실하게 암기함. 다의어 문맥별 의미 파악 우수.'
    },

    {
      id: 'test_2_2',
      studentId: 2,
      title: '고1 2학기 중간고사 교과서 5과 본문 통암기',
      date: getDateStr(-1),
      time: '17:30',
      scope: '영어(능률김) 5과 본문 전체 영작 및 어법상 틀린 곳 고치기',
      cutoff: '95점 이상',
      score: '98점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '서술형 조건 영작까지 완벽하게 소화했습니다. 지금 페이스 유지하세요!'
    },

    {
      id: 'test_2_3',
      studentId: 2,
      title: '어법 끝 Start 챕터 4 (수일치 & 능동/수동)',
      date: getDateStr(3),
      time: '17:00',
      scope: '주어-동사 수일치 특수구문 및 4/5형식 수동태 실전 25제',
      cutoff: '85점 이상',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '도치구문 수일치와 사역/지각동사 수동태 주의해서 준비해오기!'
    },


    // ======================================================
    // 학생 3: 박도현
    // ======================================================

    {
      id: 'test_3_1',
      studentId: 3,
      title: '중3 내신 2학기 핵심 문법 (가정법 과거/과거완료)',
      date: getDateStr(-7),
      time: '16:00',
      scope: 'If 가정법 공식 적용 및 I wish / as if 가정법 전환 20문제',
      cutoff: '85점 이상',
      score: '88점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '시제 일치 개념을 잘 잡았습니다. 혼합가정법 예외만 한 번 더 체크!'
    },

    {
      id: 'test_3_2',
      studentId: 3,
      title: '워드마스터 중등 고난도 Day 21-25',
      date: getDateStr(-3),
      time: '16:30',
      scope: 'Day 21~25 표제어 120개 (스펠링 20 + 뜻 30)',
      cutoff: '90점 이상',
      score: '74점',
      status: 'FAIL',
      retestStatus: 'RETEST_PASS',
      retestDate: getDateStr(-1),
      teacherNote: '1차에서는 스펠링 실수가 많았으나, 재시험에서 96점으로 성실히 만회하여 통과!'
    },

    {
      id: 'test_3_3',
      studentId: 3,
      title: '천일문 기본편 Unit 31-35 구문 테스트',
      date: getDateStr(5),
      time: '16:00',
      scope: 'to부정사와 동명사의 의미상 주어 및 시제/수동 구문',
      cutoff: '80점 이상',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '동명사의 의미상 주어(목적격/소유격) 표기법 유의하여 복습해올 것.'
    },


    // ======================================================
    // 학생 4: 최지우
    // ======================================================

    {
      id: 'test_4_1',
      studentId: 4,
      title: 'EBS 수능특강 라이트 영어독해 7-8강',
      date: getDateStr(-4),
      time: '19:30',
      scope: '7~8강 전 지문 변형문제 (어법, 순서배열, 문장삽입 12문항)',
      cutoff: '85점 이상',
      score: '91점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '글의 흐름과 논리적 단서(지시사, 대명사)를 잘 파악하고 있음.'
    },

    {
      id: 'test_4_2',
      studentId: 4,
      title: '고급 수능 VOCA Day 30-33',
      date: getDateStr(1),
      time: '19:30',
      scope: '추상적 학술 어휘 100개 + 유의어 묶음 테스트',
      cutoff: '88점 이상',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '철학/인문 계열 지문에 자주 출제되는 핵심 추상어휘 집중 암기 요망.'
    },


    // ======================================================
    // 학생 5: 정현우
    // ======================================================

    {
      id: 'test_5_1',
      studentId: 5,
      title: '수능완성 영어 실전모의고사 1회',
      date: getDateStr(-8),
      time: '20:00',
      scope: '실전 70분 타임어택 모의고사 1회 전 문항',
      cutoff: '90점 이상 (1등급 컷)',
      score: '94점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '시간 관리 훌륭함! 오답 2문항(순서, 어법) 1:1 심층 피드백 완료.'
    },

    {
      id: 'test_5_2',
      studentId: 5,
      title: 'EBS 파이널 고난도 킬러 어법 50선',
      date: getDateStr(-2),
      time: '20:00',
      scope: '수능 29번 어법 유형 최근 10개년 기출 킬러 포인트',
      cutoff: '85점 이상',
      score: '80점',
      status: 'FAIL',
      retestStatus: 'RETEST_PENDING',
      retestDate: getDateStr(3),
      teacherNote: '대동사(do/be)와 형용사/부사 구별 문제 헷갈리지 않게 재시험 대비 철저히 하기!'
    },

    {
      id: 'test_5_3',
      studentId: 5,
      title: '수능완성 2회 및 6/9평 연계 지문 총정리',
      date: getDateStr(6),
      time: '20:00',
      scope: '주제/제목 및 장문독해 세트',
      cutoff: '90점 이상',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '실전 수능과 동일한 환경으로 OMR 마킹 포함 시험 진행.'
    },


    // ======================================================
    // 학생 6: 한유진
    // ======================================================

    {
      id: 'test_6_1',
      studentId: 6,
      title: '중2 필수 기초영단어 500 (1차)',
      date: getDateStr(-6),
      time: '15:00',
      scope: '교과서 단어 Day 1-3 (총 60단어)',
      cutoff: '85점 이상 (51/60)',
      score: '87점',
      status: 'PASS',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '기초 단어를 성실히 외워왔습니다. 칭찬 스티커 2장 지급!'
    },

    {
      id: 'test_6_2',
      studentId: 6,
      title: '중학 영문법 3800제 (조동사 can, must, should)',
      date: getDateStr(2),
      time: '15:00',
      scope: '조동사의 부정문/의문문 만들기 및 관용표현 20문항',
      cutoff: '80점 이상',
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: '조동사 뒤 동사원형 오는 규칙 잊지 말고 숙제 오답 정리해오기.'
    }
  ];
}


// ========================================================
// Data Storage Helper Object
// ========================================================

const AppData = {

  // ======================================================
  // Firebase 준비 확인
  // ======================================================

  isFirebaseReady() {
    return (
      typeof window !== 'undefined' &&
      !!window.firebaseDB &&
      !!window.firebaseFns
    );
  },


  // ======================================================
  // 학생 목록 가져오기
  // ======================================================

  getStudents() {
    return FirebaseStore.students;
  },


  // ======================================================
  // 학생 목록 Firestore 저장
  // ======================================================

  async saveStudents(students) {

    if (!this.isFirebaseReady()) {
      console.error('❌ Firebase가 준비되지 않았습니다.');
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    try {

      const {
        collection,
        doc,
        setDoc
      } = window.firebaseFns;

      const db = window.firebaseDB;

      // 캐시 먼저 업데이트
      FirebaseStore.students = [...students];
      FirebaseStore.studentsLoaded = true;

      // Firestore에 각각의 학생 저장
      for (const student of students) {

        await setDoc(
          doc(
            collection(db, 'students'),
            String(student.id)
          ),
          student
        );

      }

      console.log(
        `✅ Firestore 학생 데이터 저장 완료 (${students.length}명)`
      );

      return students;

    } catch (error) {

      console.error(
        '❌ Firestore 학생 데이터 저장 실패:',
        error
      );

      throw error;
    }
  },


  // ======================================================
  // Firestore에서 학생 목록 가져오기
  // ======================================================

  async loadStudentsFromFirestore() {

    if (!this.isFirebaseReady()) {
      console.error('❌ Firebase가 준비되지 않았습니다.');
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    try {

      const {
        collection,
        getDocs
      } = window.firebaseFns;

      const db = window.firebaseDB;

      console.log(
        '☁️ Firestore에서 학생 데이터를 불러오는 중...'
      );

      const snapshot = await getDocs(
        collection(db, 'students')
      );

      const students = snapshot.docs.map(
        document => document.data()
      );

      // ID를 숫자로 정리
      students.forEach(student => {
        student.id = Number(student.id);
      });

      // ID 순서대로 정렬
      students.sort(
        (a, b) => a.id - b.id
      );

      FirebaseStore.students = students;
      FirebaseStore.studentsLoaded = true;

      console.log(
        `✅ Firestore에서 학생 ${students.length}명 로드 완료`
      );

      return students;

    } catch (error) {

      console.error(
        '❌ Firestore 학생 데이터 로드 실패:',
        error
      );

      throw error;
    }
  },


  // ======================================================
  // 학생 데이터 최초 초기화
  // ======================================================

  async initializeStudents() {

    try {

      const students =
        await this.loadStudentsFromFirestore();

      // Firestore에 학생 데이터가 아직 없는 경우
      if (students.length === 0) {

        console.log(
          '📦 Firestore에 학생 데이터가 없습니다.'
        );

        console.log(
          '📤 기본 학생 6명을 Firestore에 저장합니다.'
        );

        await this.saveStudents(
          DEFAULT_STUDENTS
        );

        FirebaseStore.students =
          [...DEFAULT_STUDENTS];

        console.log(
          '✅ 기본 학생 데이터 초기 저장 완료'
        );
      }

      return FirebaseStore.students;

    } catch (error) {

      console.error(
        '❌ 학생 데이터 초기화 실패:',
        error
      );

      // Firebase 연결에 문제가 있더라도
      // 사이트 자체가 완전히 깨지지 않도록 기본 데이터 사용
      FirebaseStore.students =
        [...DEFAULT_STUDENTS];

      FirebaseStore.studentsLoaded = true;

      return FirebaseStore.students;
    }
  },


  // ======================================================
  // 학생 데이터 실시간 동기화
  // ======================================================

  startStudentListener() {

    if (FirebaseStore.studentListenerStarted) {
      return;
    }

    if (!this.isFirebaseReady()) {
      console.error(
        '❌ Firebase가 준비되지 않아 listener를 시작할 수 없습니다.'
      );

      return;
    }

    try {

      const {
        collection,
        onSnapshot
      } = window.firebaseFns;

      const db = window.firebaseDB;

      onSnapshot(
        collection(db, 'students'),

        snapshot => {

          const students =
            snapshot.docs.map(
              document => document.data()
            );

          students.forEach(student => {
            student.id = Number(student.id);
          });

          students.sort(
            (a, b) => a.id - b.id
          );

          FirebaseStore.students = students;
          FirebaseStore.studentsLoaded = true;

          console.log(
            '🔄 학생 데이터 실시간 업데이트:',
            students
          );

          // 현재 화면 갱신
          this.refreshStudentScreens();

        },

        error => {

          console.error(
            '❌ 학생 데이터 실시간 동기화 실패:',
            error
          );

        }
      );

      FirebaseStore.studentListenerStarted = true;

      console.log(
        '👂 학생 데이터 실시간 감시 시작'
      );

    } catch (error) {

      console.error(
        '❌ 학생 listener 시작 실패:',
        error
      );
    }
  },


  // ======================================================
  // 학생 관련 화면 새로고침
  // ======================================================

  refreshStudentScreens() {

    if (
      typeof App === 'undefined'
    ) {
      return;
    }

    try {

      // 메인 학생 선택 화면
      if (
        typeof App.renderLanding === 'function'
      ) {
        App.renderLanding();
      }

      // 학생 대시보드
      if (
        App.state &&
        App.state.view === 'student' &&
        typeof App.renderStudentDashboard === 'function'
      ) {
        App.renderStudentDashboard();
      }

      // 관리자 화면
      if (
        App.state &&
        App.state.view === 'admin' &&
        typeof App.renderAdminDashboard === 'function'
      ) {
        App.renderAdminDashboard();
      }

    } catch (error) {

      console.error(
        '❌ 학생 화면 새로고침 실패:',
        error
      );

    }
  },


  // ======================================================
  // 특정 학생 가져오기
  // ======================================================

  getStudentById(id) {

    const students =
      this.getStudents();

    return students.find(
      s => s.id === Number(id)
    ) || null;
  },


  // ======================================================
  // 공통 Firestore 컬렉션 도우미
  // ======================================================

  getLegacyArray(key) {
    try {
      const raw = localStorage.getItem(key);
      const value = raw ? JSON.parse(raw) : null;
      return Array.isArray(value) ? value : null;
    } catch (error) {
      console.warn(`기존 ${key} 데이터를 읽지 못했습니다.`, error);
      return null;
    }
  },

  async loadCollection(collectionName, normalize = item => item) {
    if (!this.isFirebaseReady()) {
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    const { collection, getDocs } = window.firebaseFns;
    const snapshot = await getDocs(collection(window.firebaseDB, collectionName));
    return snapshot.docs.map(document => normalize({
      ...document.data(),
      id: document.data().id || document.id
    }));
  },

  async writeDocument(collectionName, id, data) {
    if (!this.isFirebaseReady()) {
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    const { collection, doc, setDoc } = window.firebaseFns;
    await setDoc(doc(collection(window.firebaseDB, collectionName), String(id)), data);
  },

  async removeDocument(collectionName, id) {
    if (!this.isFirebaseReady()) {
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    const { collection, doc, deleteDoc } = window.firebaseFns;
    await deleteDoc(doc(collection(window.firebaseDB, collectionName), String(id)));
  },

  async replaceCollection(collectionName, items, getId) {
    if (!this.isFirebaseReady()) {
      throw new Error('Firebase가 준비되지 않았습니다.');
    }

    const { collection, doc, getDocs, setDoc, deleteDoc } = window.firebaseFns;
    const db = window.firebaseDB;
    const targetIds = new Set(items.map(item => String(getId(item))));
    const existing = await getDocs(collection(db, collectionName));

    await Promise.all([
      ...items.map(item => setDoc(
        doc(collection(db, collectionName), String(getId(item))),
        item
      )),
      ...existing.docs
        .filter(document => !targetIds.has(document.id))
        .map(document => deleteDoc(document.ref))
    ]);
  },

  startCollectionListener({ collectionName, cacheKey, listenerKey, normalize, sort }) {
    if (FirebaseStore[listenerKey] || !this.isFirebaseReady()) return;

    const { collection, onSnapshot } = window.firebaseFns;
    onSnapshot(collection(window.firebaseDB, collectionName), snapshot => {
      const items = snapshot.docs.map(document => normalize({
        ...document.data(),
        id: document.data().id || document.id
      }));
      if (sort) items.sort(sort);
      FirebaseStore[cacheKey] = items;
      this.refreshCloudScreens();
    }, error => {
      console.error(`Firestore ${collectionName} 실시간 동기화 실패:`, error);
    });

    FirebaseStore[listenerKey] = true;
  },

  refreshCloudScreens() {
    if (typeof App === 'undefined' || !App.state) return;

    if (App.state.view === 'landing') App.renderLanding?.();
    if (App.state.view === 'student') App.renderStudentDashboard?.();
    if (App.state.view === 'admin') App.renderAdminDashboard?.();
  },

  reportCloudWriteError(label, error) {
    console.error(`${label} Firestore 저장 실패:`, error);
    if (typeof App !== 'undefined' && typeof App.toast === 'function') {
      App.toast(`${label} 저장에 실패했습니다. 인터넷 연결과 Firebase 권한을 확인해주세요.`, 'error');
    }
  },


  // ======================================================
  // 시험 / 단어 데이터 최초 초기화 및 실시간 동기화
  // ======================================================

  async initializeCloudData() {
    const [tests, vocabSets, vocabTestResults] = await Promise.all([
      this.loadCollection('tests', test => ({ ...test, studentId: Number(test.studentId) })),
      this.loadCollection('vocabSets', set => ({
        ...set,
        studentIds: (set.studentIds || []).map(Number)
      })),
      this.loadCollection('vocabTestResults', result => ({
        ...result,
        studentId: Number(result.studentId),
        direction: Number(result.direction)
      }))
    ]);

    FirebaseStore.tests = tests;
    FirebaseStore.vocabSets = vocabSets;
    FirebaseStore.vocabTestResults = vocabTestResults;

    if (tests.length === 0) {
      const legacyTests = this.getLegacyArray(LEGACY_STORAGE_KEYS.tests);
      await this.saveTests(legacyTests || generateDefaultTests());
      if (legacyTests) localStorage.removeItem(LEGACY_STORAGE_KEYS.tests);
    }

    if (vocabSets.length === 0) {
      const legacySets = this.getLegacyArray(LEGACY_STORAGE_KEYS.vocabSets);
      if (legacySets) {
        await this.saveVocabSets(legacySets);
        localStorage.removeItem(LEGACY_STORAGE_KEYS.vocabSets);
      }
    }

    if (vocabTestResults.length === 0) {
      const legacyResults = this.getLegacyArray(LEGACY_STORAGE_KEYS.vocabTestResults);
      if (legacyResults) {
        await this.saveVocabTestResults(legacyResults);
        localStorage.removeItem(LEGACY_STORAGE_KEYS.vocabTestResults);
      }
    }

    // 이미 삭제된 단어 테스트에 남아 있는 고아 결과를 한 번 정리합니다.
    // testId가 없는 구형 데이터는 건드리지 않습니다.
    await this.cleanupOrphanVocabTestResults();
  },

  startCloudListeners() {
    this.startCollectionListener({
      collectionName: 'tests', cacheKey: 'tests', listenerKey: 'testsListenerStarted',
      normalize: test => ({ ...test, studentId: Number(test.studentId) }),
      sort: (a, b) => new Date(a.date) - new Date(b.date)
    });
    this.startCollectionListener({
      collectionName: 'vocabSets', cacheKey: 'vocabSets', listenerKey: 'vocabSetsListenerStarted',
      normalize: set => ({ ...set, studentIds: (set.studentIds || []).map(Number) })
    });
    this.startCollectionListener({
      collectionName: 'vocabTestResults', cacheKey: 'vocabTestResults', listenerKey: 'vocabTestResultsListenerStarted',
      normalize: result => ({ ...result, studentId: Number(result.studentId), direction: Number(result.direction) })
    });
  },


  // ======================================================
  // 시험 목록 가져오기
  // ======================================================

  getTests() {
    return FirebaseStore.tests;
  },


  // ======================================================
  // 시험 목록 저장
  // ======================================================

  async saveTests(tests) {
    FirebaseStore.tests = tests.map(test => ({ ...test, studentId: Number(test.studentId) }));
    await this.replaceCollection('tests', FirebaseStore.tests, test => test.id);
    return FirebaseStore.tests;
  },


  // ======================================================
  // 특정 학생의 시험 목록
  // ======================================================

  getTestsByStudentId(studentId) {

    const tests =
      this.getTests();

    return tests

      .filter(
        t => t.studentId === Number(studentId)
      )

      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      );

  },


  // ======================================================
  // 시험 추가 또는 수정
  // ======================================================

  async saveOrUpdateTest(testData) {

    const tests =
      this.getTests();

    if (!testData.id) {

      testData.id =
        'test_' +
        Date.now() +
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 5);

      tests.push(testData);

    } else {

      const idx =
        tests.findIndex(
          t => t.id === testData.id
        );

      if (idx >= 0) {

        tests[idx] = {
          ...tests[idx],
          ...testData
        };

      } else {

        tests.push(testData);

      }
    }

    FirebaseStore.tests = tests;
    try {
      await this.writeDocument('tests', testData.id, testData);
    } catch (error) {
      this.reportCloudWriteError('시험 일정', error);
      throw error;
    }

    return testData;
  },


  // ======================================================
  // 시험 삭제
  // ======================================================

  async deleteTest(testId) {

    const existingTest =
      this.getTests().find(t => t.id === testId);

    if (!existingTest) {
      return;
    }

    // 단어 테스트 일정이면 연결된 응시 결과도 함께 삭제합니다.
    // 결과 문서는 testId를 기준으로 연결되어 있으므로
    // 같은 단어 세트를 사용하는 다른 시험의 결과는 건드리지 않습니다.
    try {
      await this.deleteVocabTestResultsByTestId(testId);
      await this.removeDocument('tests', testId);
    } catch (error) {
      this.reportCloudWriteError('시험 일정 또는 단어 테스트 결과', error);
      throw error;
    }

    FirebaseStore.tests =
      this.getTests().filter(
        t => t.id !== testId
      );

  },


  // ======================================================
  // 학생 정보 업데이트
  // ======================================================

  async updateStudent(studentData) {

    const students =
      this.getStudents();

    const idx =
      students.findIndex(
        s => s.id === Number(studentData.id)
      );

    if (idx >= 0) {

      students[idx] = {
        ...students[idx],
        ...studentData,
        id: Number(studentData.id)
      };

      await this.saveStudents(
        students
      );

      return students[idx];
    }

    return null;
  },


  // ======================================================
  // 전체 데이터 초기화
  // ======================================================

  async resetToDefaults() {

    await this.saveStudents(
      DEFAULT_STUDENTS
    );

    const defTests =
      generateDefaultTests();

    await this.saveTests(defTests);
    await this.saveVocabSets([]);
    await this.saveVocabTestResults([]);

  },


  // ======================================================
  // 데이터 백업 내보내기
  // ======================================================

  exportData() {

    return {

      version: '1.0',

      exportedAt:
        new Date().toISOString(),

      students:
        this.getStudents(),

      tests:
        this.getTests(),

      vocabSets:
        this.getVocabSets(),

      vocabTestResults:
        this.getVocabTestResults()

    };

  },


  // ======================================================
  // 데이터 복원 가져오기
  // ======================================================

  async importData(importedObj) {

    if (
      importedObj &&
      Array.isArray(importedObj.students) &&
      Array.isArray(importedObj.tests)
    ) {

      await this.saveStudents(
        importedObj.students
      );

      await this.saveTests(importedObj.tests);

      if (
        Array.isArray(
          importedObj.vocabSets
        )
      ) {

        await this.saveVocabSets(importedObj.vocabSets);
      } else {
        await this.saveVocabSets([]);

      }

      if (
        Array.isArray(
          importedObj.vocabTestResults
        )
      ) {

        await this.saveVocabTestResults(importedObj.vocabTestResults);

      } else {

        await this.saveVocabTestResults([]);

      }

      return true;

    }

    return false;
  },


  // ======================================================
  // 단어 세트
  // ======================================================

  getVocabSets() {
    return FirebaseStore.vocabSets;
  },


  async saveVocabSets(sets) {
    FirebaseStore.vocabSets = sets.map(set => ({
      ...set,
      studentIds: (set.studentIds || []).map(Number)
    }));
    await this.replaceCollection('vocabSets', FirebaseStore.vocabSets, set => set.id);
    return FirebaseStore.vocabSets;
  },


  async saveOrUpdateVocabSet(setData) {

    const sets =
      this.getVocabSets();

    if (!setData.id) {

      setData.id =
        'vocab_' +
        Date.now() +
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 5);

      sets.push(setData);

    } else {

      const idx =
        sets.findIndex(
          s => s.id === setData.id
        );

      if (idx >= 0) {

        sets[idx] = {
          ...sets[idx],
          ...setData
        };

      } else {

        sets.push(setData);

      }
    }

    FirebaseStore.vocabSets = sets;
    try {
      await this.writeDocument('vocabSets', setData.id, setData);
    } catch (error) {
      this.reportCloudWriteError('단어 세트', error);
      throw error;
    }

    return setData;
  },


  async deleteVocabSet(setId) {

    let sets =
      this.getVocabSets();

    sets =
      sets.filter(
        s => s.id !== setId
      );

    FirebaseStore.vocabSets = sets;
    try {
      await this.removeDocument('vocabSets', setId);
    } catch (error) {
      this.reportCloudWriteError('단어 세트', error);
      throw error;
    }

  },


  getVocabSetsByStudentId(studentId) {

    return this
      .getVocabSets()
      .filter(
        s =>
          s.studentIds &&
          s.studentIds.includes(
            Number(studentId)
          )
      );

  },


  // ======================================================
  // 단어 테스트 완료 이력
  // ======================================================

  getVocabTestResults() {
    return FirebaseStore.vocabTestResults;
  },


  getVocabTestResult(
    studentId,
    setId,
    direction,
    testId = null
  ) {

    return this
      .getVocabTestResults()
      .find(result =>

        result.studentId ===
          Number(studentId) &&

        result.setId ===
          setId &&

        result.direction ===
          direction &&

        (
          testId === null ||
          result.testId === testId
        )

      ) || null;
  },


  getVocabTestResultDocumentId(result) {
    return [
      Number(result.studentId),
      encodeURIComponent(String(result.setId)),
      Number(result.direction),
      encodeURIComponent(String(result.testId || 'none'))
    ].join('_');
  },

  async saveVocabTestResults(results) {
    FirebaseStore.vocabTestResults = results.map(result => ({
      ...result,
      studentId: Number(result.studentId),
      direction: Number(result.direction)
    }));
    await this.replaceCollection(
      'vocabTestResults',
      FirebaseStore.vocabTestResults,
      result => this.getVocabTestResultDocumentId(result)
    );
    return FirebaseStore.vocabTestResults;
  },

  // 특정 단어 테스트 일정에 연결된 모든 응시 결과 삭제
  async deleteVocabTestResultsByTestId(testId) {
    const results = this.getVocabTestResults();
    const targetResults = results.filter(result => result.testId === testId);

    if (targetResults.length === 0) {
      return 0;
    }

    try {
      await Promise.all(
        targetResults.map(result =>
          this.removeDocument(
            'vocabTestResults',
            this.getVocabTestResultDocumentId(result)
          )
        )
      );
    } catch (error) {
      console.error('❌ 연결된 단어 테스트 결과 삭제 실패:', error);
      throw error;
    }

    FirebaseStore.vocabTestResults = results.filter(
      result => result.testId !== testId
    );

    return targetResults.length;
  },

  async cleanupOrphanVocabTestResults() {
    const tests = this.getTests();
    const results = this.getVocabTestResults();
    const validTestIds = new Set(tests.map(test => test.id));
    const orphanResults = results.filter(
      result => result.testId && !validTestIds.has(result.testId)
    );

    if (orphanResults.length === 0) return 0;

    try {
      await Promise.all(
        orphanResults.map(result =>
          this.removeDocument(
            'vocabTestResults',
            this.getVocabTestResultDocumentId(result)
          )
        )
      );
    } catch (error) {
      console.error('❌ 고아 단어 테스트 결과 정리 실패:', error);
      return 0;
    }

    FirebaseStore.vocabTestResults = results.filter(
      result => !(result.testId && !validTestIds.has(result.testId))
    );

    console.log(`🧹 삭제된 시험에 연결된 단어 테스트 결과 ${orphanResults.length}건 정리 완료`);
    return orphanResults.length;
  },

  async saveVocabTestResult(resultData) {

    const results =
      this.getVocabTestResults();

    const index =
      results.findIndex(result =>

        result.studentId ===
          Number(resultData.studentId) &&

        result.setId ===
          resultData.setId &&

        result.direction ===
          resultData.direction &&

        result.testId ===
          resultData.testId

      );

    const attempt = {

      score:
        resultData.score,

      correctCount:
        resultData.correctCount,

      total:
        resultData.total,

      passed:
        resultData.passed,

      wrongAnswers:
        resultData.wrongAnswers || [],

      completedAt:
        resultData.completedAt

    };


    if (index >= 0) {

      const previous =
        results[index];

      results[index] = {

        ...previous,

        ...resultData,

        attempts: [

          ...(previous.attempts || []),

          attempt

        ]

      };

    } else {

      results.push({

        ...resultData,

        attempts: [
          attempt
        ]

      });

    }


    FirebaseStore.vocabTestResults = results;
    const savedResult = results[index >= 0 ? index : results.length - 1];
    try {
      await this.writeDocument(
        'vocabTestResults',
        this.getVocabTestResultDocumentId(savedResult),
        savedResult
      );
    } catch (error) {
      this.reportCloudWriteError('단어 테스트 결과', error);
      throw error;
    }

    return resultData;

  }

};
