/**
 * 영어과외 관리 웹사이트 - 기본 데이터 및 저장소 관리
 */

const STORAGE_KEY_STUDENTS = 'eng_tutoring_students';
const STORAGE_KEY_TESTS = 'eng_tutoring_tests';
const STORAGE_KEY_VOCAB = 'eng_tutoring_vocab_sets';
const STORAGE_KEY_VOCAB_TEST_RESULTS = 'eng_tutoring_vocab_test_results';
const ADMIN_PASSWORD = '090927';

// 기본 6명 학생 프로필
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

// 기본 샘플 시험 데이터 생성 (현재 날짜 기준 풍부한 샘플 데이터)
function generateDefaultTests() {
  const today = new Date();

  // 날짜 헬퍼: 같은 달 내 특정 일자 포맷 (YYYY-MM-DD)
  const getDateStr = (dayOffset) => {
    const d = new Date(today);
    d.setDate(today.getDate() + dayOffset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return [
    // 학생 1: 김민준
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

    // 학생 2: 이서연
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

    // 학생 3: 박도현
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

    // 학생 4: 최지우
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

    // 학생 5: 정현우
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

    // 학생 6: 한유진
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

// Data Storage Helper Object
const AppData = {
  // 학생 목록 가져오기
  getStudents() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse students from localStorage', e);
    }
    this.saveStudents(DEFAULT_STUDENTS);
    return DEFAULT_STUDENTS;
  },

  // 학생 목록 저장
  saveStudents(students) {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  },

  // 특정 학생 가져오기
  getStudentById(id) {
    const students = this.getStudents();
    return students.find(s => s.id === Number(id)) || null;
  },

  // 시험 목록 가져오기
  getTests() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_TESTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse tests from localStorage', e);
    }
    const defaultTests = generateDefaultTests();
    this.saveTests(defaultTests);
    return defaultTests;
  },

  // 시험 목록 저장
  saveTests(tests) {
    localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(tests));
  },

  // 특정 학생의 시험 목록 가져오기
  getTestsByStudentId(studentId) {
    const tests = this.getTests();
    return tests
      .filter(t => t.studentId === Number(studentId))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  // 시험 추가 또는 수정
  saveOrUpdateTest(testData) {
    const tests = this.getTests();
    if (!testData.id) {
      testData.id = 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      tests.push(testData);
    } else {
      const idx = tests.findIndex(t => t.id === testData.id);
      if (idx >= 0) {
        tests[idx] = { ...tests[idx], ...testData };
      } else {
        tests.push(testData);
      }
    }
    this.saveTests(tests);
    return testData;
  },

  // 시험 삭제
  deleteTest(testId) {
    let tests = this.getTests();
    tests = tests.filter(t => t.id !== testId);
    this.saveTests(tests);
  },

  // 학생 정보 업데이트
  updateStudent(studentData) {
    const students = this.getStudents();
    const idx = students.findIndex(s => s.id === Number(studentData.id));
    if (idx >= 0) {
      students[idx] = { ...students[idx], ...studentData };
      this.saveStudents(students);
      return students[idx];
    }
    return null;
  },

  // 전체 데이터 초기화
  resetToDefaults() {
    this.saveStudents(DEFAULT_STUDENTS);
    const defTests = generateDefaultTests();
    this.saveTests(defTests);
    localStorage.removeItem(STORAGE_KEY_VOCAB_TEST_RESULTS);
  },

  // 데이터 백업 내보내기 (JSON 객체 반환)
  exportData() {
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      students: this.getStudents(),
      tests: this.getTests(),
      vocabSets: this.getVocabSets(),
      vocabTestResults: this.getVocabTestResults()
    };
  },

  // 데이터 복원 가져오기
  importData(importedObj) {
    if (importedObj && Array.isArray(importedObj.students) && Array.isArray(importedObj.tests)) {
      this.saveStudents(importedObj.students);
      this.saveTests(importedObj.tests);
      if (Array.isArray(importedObj.vocabSets)) {
        this.saveVocabSets(importedObj.vocabSets);
      }
      if (Array.isArray(importedObj.vocabTestResults)) {
        localStorage.setItem(STORAGE_KEY_VOCAB_TEST_RESULTS, JSON.stringify(importedObj.vocabTestResults));
      } else {
        localStorage.removeItem(STORAGE_KEY_VOCAB_TEST_RESULTS);
      }
      return true;
    }
    return false;
  },

  // ─── 단어 세트 (Vocab Sets) ───────────────────────────────
  getVocabSets() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_VOCAB);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse vocab sets', e);
    }
    return [];
  },

  saveVocabSets(sets) {
    localStorage.setItem(STORAGE_KEY_VOCAB, JSON.stringify(sets));
  },

  saveOrUpdateVocabSet(setData) {
    const sets = this.getVocabSets();
    if (!setData.id) {
      setData.id = 'vocab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      sets.push(setData);
    } else {
      const idx = sets.findIndex(s => s.id === setData.id);
      if (idx >= 0) {
        sets[idx] = { ...sets[idx], ...setData };
      } else {
        sets.push(setData);
      }
    }
    this.saveVocabSets(sets);
    return setData;
  },

  deleteVocabSet(setId) {
    let sets = this.getVocabSets();
    sets = sets.filter(s => s.id !== setId);
    this.saveVocabSets(sets);
  },

  getVocabSetsByStudentId(studentId) {
    return this.getVocabSets().filter(s => s.studentIds && s.studentIds.includes(Number(studentId)));
  },

  // ─── 단어 테스트 완료 이력 ───────────────────────────────
  getVocabTestResults() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_VOCAB_TEST_RESULTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse vocab test results', e);
    }
    return [];
  },

  getVocabTestResult(studentId, setId, direction, testId = null) {
    return this.getVocabTestResults().find(result =>
      result.studentId === Number(studentId) &&
      result.setId === setId &&
      result.direction === direction &&
      (testId === null || result.testId === testId)
    ) || null;
  },

  saveVocabTestResult(resultData) {
    const results = this.getVocabTestResults();
    const index = results.findIndex(result =>
      result.studentId === Number(resultData.studentId) &&
      result.setId === resultData.setId &&
      result.direction === resultData.direction &&
      result.testId === resultData.testId
    );
    const attempt = {
      score: resultData.score,
      correctCount: resultData.correctCount,
      total: resultData.total,
      passed: resultData.passed,
      wrongAnswers: resultData.wrongAnswers || [],
      completedAt: resultData.completedAt
    };
    if (index >= 0) {
      const previous = results[index];
      results[index] = {
        ...previous,
        ...resultData,
        attempts: [...(previous.attempts || []), attempt]
      };
    } else {
      results.push({ ...resultData, attempts: [attempt] });
    }
    localStorage.setItem(STORAGE_KEY_VOCAB_TEST_RESULTS, JSON.stringify(results));
    return resultData;
  }
};
