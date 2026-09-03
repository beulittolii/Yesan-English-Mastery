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
const TEACHER_LOGIN_ID = 'admin';
const TEACHER_PASSWORD = '1357';


// ========================================================
// 등록 학생 기본 프로필 목록 (1~6번 및 11~14번)
// ========================================================

const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: '김단하',
    target: '내신 2등급',
    loginId: 'student1',
    password: '1234'
  },
  {
    id: 2,
    name: '김성헌',
    target: '내신 1등급',
    loginId: 'student2',
    password: '1234'
  },
  {
    id: 3,
    name: '김영빈',
    target: '내신 1등급',
    loginId: 'student3',
    password: '1234'
  },
  {
    id: 4,
    name: '백승조',
    target: '내신 2등급',
    loginId: 'student4',
    password: '1234'
  },
  {
    id: 5,
    name: '이상록',
    target: '내신 2등급',
    loginId: 'student5',
    password: '1234'
  },
  {
    id: 6,
    name: '조용준',
    target: '내신 2등급',
    loginId: 'student6',
    password: '1234'
  },
  {
    id: 11,
    name: '송규인',
    target: '내신 영어 100점',
    loginId: 'gyuin',
    password: '1012'
  },
  {
    id: 12,
    name: '강민수',
    target: '내신 영어 1등급',
    loginId: 'kangminsu',
    password: '1031'
  },
  {
    id: 13,
    name: '이현민',
    target: '내신 영어 2등급',
    loginId: 'gusals',
    password: '1006'
  },
  {
    id: 14,
    name: '테스트',
    target: '',
    loginId: 'test',
    password: '1234'
  }
];


// ========================================================
// YBM(박준언) 공통영어 2 본문 1과 (1~4문단) 실전 내신 킬러 10문항
// ========================================================

const YBM2_L1_PRACTICE_QUESTIONS = [
  {
    id: 'ybm2_l1_q1',
    type: 'CHOICE',
    question: '다음 글의 밑줄 친 ①~⑤ 중, 어법상 틀린 것은?',
    passage: `While scrolling through her social media one day, Gina was astonished when she saw the news headline, “The Heundeulbawi in Seoraksan National Park Has Fallen.” Gina immediately shared the shocking story with her close friends. Later, during the morning news on TV, a reporter ①**standing** next to the undamaged Heundeulbawi said, “Today’s Internet stories of the Heundeulbawi ②**being damaged** were fake.” Gina was embarrassed by the fact ③**which** she had spread the fake news. It reminded her of another incident of fake news that ④**had happened** a while ago. The news that a famous athlete had died became the number one issue online, but it turned out ⑤**to be** fake.`,
    choices: [
      'standing',
      'being damaged',
      'which',
      'had happened',
      'to be'
    ],
    answer: 3,
    explanation: '③번의 which 뒤에는 완전한 절(she had spread the fake news)이 이어지므로 관계대명사 which가 올 수 없으며, 추상명사 the fact와 동격을 이루는 접속사 that으로 고쳐야 합니다.\n(①은 a reporter를 수식하는 능동 분사, ②는 전치사 of의 목적어로 쓰인 수동형 동명사, ④는 과거 특정 시점 이전의 일을 나타내는 과거완료, ⑤는 turn out to be 구문으로 모두 적절합니다.)'
  },
  {
    id: 'ybm2_l1_q2',
    type: 'CHOICE',
    question: '다음 글의 밑줄 친 ①~⑤ 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?',
    passage: `The news that a famous athlete had died became the number one issue online, but it turned out to be fake. It had been made by content creators who sought people’s attention. They produced ①**provocative** false stories to make money by raising the number of views of their posts. At that time, Gina criticized those who had made and spread fake news because it had hurt the athlete and ②**confused** people. This time, however, Gina herself had ③**accidentally** contributed to the spread of fake news. Unfortunately, becoming an accidental distributor of fake news like Gina is not unusual. Fake news is a ④**deliberate** attempt to manipulate people by spreading ⑤**accurate** information.`,
    choices: [
      'provocative',
      'confused',
      'accidentally',
      'deliberate',
      'accurate'
    ],
    answer: 5,
    explanation: '가짜 뉴스는 사람들을 조종하기 위해 "부정확한 정보(inaccurate information)"를 퍼뜨리는 의도적인 시도이므로, ⑤의 accurate(정확한)는 문맥상 어색하며 inaccurate(부정확한) 또는 false로 고쳐야 합니다.\n(① provocative: 자극적인, ② confused: 혼란스럽게 한, ③ accidentally: 우발적으로, ④ deliberate: 의도적인)'
  },
  {
    id: 'ybm2_l1_q3',
    type: 'CHOICE',
    question: '다음 글의 빈칸에 들어갈 말로 가장 적절한 것은?',
    passage: `It is made by certain groups with the intention of attracting people’s attention, making profits, or gaining political benefits. It can confuse people, disturb society, and even seriously harm the public as well as all individuals involved. It is very common for fake news to spread __________________________________________________. For example, after an earthquake measuring 6.5 struck Ambon, Indonesia, in September 2019, thousands of residents did not return to their homes and were still in shelters for two weeks. This was because of fake news stories on social media that another earthquake followed by a tsunami was about to strike.`,
    choices: [
      'through official government press releases',
      'during states of emergency',
      'only among people who dislike social media',
      'when scientific facts are proven without doubt',
      'after the public has thoroughly verified the sources'
    ],
    answer: 2,
    explanation: '빈칸 뒤에 이어지는 인도네시아 암본 지진 발생 후 주민들이 대피소에 머물며 쓰나미 가짜 뉴스가 급속도로 퍼진 사례를 볼 때, 가짜 뉴스는 "비상사태 동안(during states of emergency)"에 퍼지는 것이 매우 흔하다는 내용이 가장 적절합니다.'
  },
  {
    id: 'ybm2_l1_q4',
    type: 'CHOICE',
    question: '위 글의 내용과 일치하지 않는 것은? (According to the passage, which of the following is NOT true?)',
    passage: `While scrolling through her social media one day, Gina was astonished when she saw the news headline, “The Heundeulbawi in Seoraksan National Park Has Fallen.” Gina immediately shared the shocking story with her close friends. Later, during the morning news on TV, a reporter standing next to the undamaged Heundeulbawi said, “Today’s Internet stories of the Heundeulbawi being damaged were fake.” Gina was embarrassed by the fact that she had spread the fake news. It reminded her of another incident of fake news that had happened a while ago. The news that a famous athlete had died became the number one issue online, but it turned out to be fake. It had been made by content creators who sought people’s attention. They produced provocative false stories to make money by raising the number of views of their posts. At that time, Gina criticized those who had made and spread fake news because it had hurt the athlete and confused people. This time, however, Gina herself had accidentally contributed to the spread of fake news.`,
    choices: [
      'Gina first learned about the falling of Heundeulbawi through a morning news broadcast on television.',
      'The television reporter confirmed that Heundeulbawi was completely undamaged.',
      'Content creators had created false rumors about a famous athlete’s death for financial gain through views.',
      'In the past, Gina condemned people who produced and circulated fake news.',
      'Gina felt embarrassed because she unintentionally participated in distributing misinformation.'
    ],
    answer: 1,
    explanation: '지나는 흔들바위가 떨어졌다는 소식을 TV 아침 뉴스가 아니라 소셜 미디어를 스크롤하다가 뉴스 헤드라인으로 처음 보았고(While scrolling through her social media one day, Gina was astonished when she saw the news headline...), 이후 TV 아침 뉴스에서는 해당 기사가 가짜였음을 기자가 전했습니다. 따라서 ①번은 본문 내용과 일치하지 않습니다.'
  },
  {
    id: 'ybm2_l1_q5',
    type: 'CHOICE',
    question: '위 글의 밑줄 친 [A]~[D]의 It에 대한 설명으로 가장 적절하지 않은 것은?',
    passage: `Unfortunately, becoming an accidental distributor of fake news like Gina is not unusual. Fake news is a deliberate attempt to manipulate people by spreading inaccurate information. **[A] It** is made by certain groups with the intention of attracting people’s attention, making profits, or gaining political benefits. **[B] It** can confuse people, disturb society, and even seriously harm the public as well as all individuals involved. **[C] It** is very common for fake news to spread during states of emergency. For example, after an earthquake measuring 6.5 struck Ambon, Indonesia, in September 2019, thousands of residents did not return to their homes and were still in shelters for two weeks. This was because of fake news stories on social media that another earthquake followed by a tsunami was about to strike. One of those messages said, “**[D] It**’s up to you if you want to believe me or not, but apparently Ambon is going to sink in the next few days.” Many displaced people were so anxious about aftershocks that the government had to announce that the information was fake.`,
    choices: [
      '[A]의 It은 앞 문장의 \'Fake news\'를 가리킨다.',
      '[B]의 It은 사람들을 혼란스럽게 하고 사회를 어지럽히는 \'Fake news\'를 가리킨다.',
      '[C]의 It은 형식상의 주어(가주어)이며, 진주어는 뒤에 나오는 to부정사구(to spread during states of emergency)이다.',
      '[D]의 It은 인도네시아 암본에서 발생한 \'규모 6.5의 지진\'을 직접 가리킨다.',
      '[D]의 It은 관용 표현 "It’s up to ~" (~는 당신에게 달려있다)에서 비인칭/상황을 나타내는 it이다.'
    ],
    answer: 4,
    explanation: '[D]의 "It’s up to you if you want to believe me or not"에서 \'It\'s up to ~\'는 \'~에게 달려 있다\'는 관용 표현으로, 믿고 안 믿고는 상대방의 선택에 달려있다는 의미입니다. 따라서 암본에서 발생한 6.5 지진을 가리킨다는 ④번의 설명은 옳지 않습니다.'
  },
  {
    id: 'ybm2_l1_q6',
    type: 'CHOICE',
    question: '주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?',
    passage: `While scrolling through her social media one day, Gina was astonished when she saw the news headline, “The Heundeulbawi in Seoraksan National Park Has Fallen.” Gina immediately shared the shocking story with her close friends.

<보기>
(A) It had been made by content creators who sought people’s attention. They produced provocative false stories to make money by raising the number of views of their posts.
(B) Later, during the morning news on TV, a reporter standing next to the undamaged Heundeulbawi said, “Today’s Internet stories of the Heundeulbawi being damaged were fake.” Gina was embarrassed by the fact that she had spread the fake news.
(C) This reminded her of another incident of fake news that had happened a while ago. The news that a famous athlete had died became the number one issue online, but it turned out to be fake. At that time, Gina had criticized those creators, but this time she herself had accidentally contributed to spreading false stories.`,
    choices: [
      '(A) - (C) - (B)',
      '(B) - (A) - (C)',
      '(B) - (C) - (A)',
      '(C) - (A) - (B)',
      '(C) - (B) - (A)'
    ],
    answer: 3,
    explanation: '주어진 글(지나가 흔들바위 헤드라인을 보고 친구들에게 공유함) 뒤에는 (B) TV 아침 뉴스에서 가짜 뉴스임을 알게 되고 당황했다는 내용이 와야 합니다. 그 다음 (C) 이것이 과거 유명 운동선수의 사망 가짜 뉴스 사건을 떠올리게 했다(It reminded her of another incident...)는 내용이 이어지며, 마지막으로 (A) 그 사건의 가짜 뉴스를 만든 배후(content creators who sought people\'s attention)에 대한 구체적 설명이 이어지는 것이 자연스럽습니다. 따라서 올바른 순서는 (B) - (C) - (A)입니다.'
  },
  {
    id: 'ybm2_l1_q7',
    type: 'CHOICE',
    question: '다음 글의 (A), (B), (C)의 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것은?',
    passage: `It is very common (A)[for / of] fake news to spread during states of emergency. For example, after an earthquake measuring 6.5 struck Ambon, Indonesia, in September 2019, thousands of residents did not return to their homes and were still in shelters for two weeks. This was because of fake news stories on social media (B)[that / what] another earthquake followed by a tsunami was about to strike. One of those messages said, “It’s up to you if you want to believe me or not, but apparently Ambon is going to sink in the next few days.” Many (C)[displacing / displaced] people were so anxious about aftershocks that the government had to announce that the information was fake.`,
    choices: [
      '(A) for  — (B) that — (C) displaced',
      '(A) for  — (B) what — (C) displacing',
      '(A) for  — (B) that — (C) displacing',
      '(A) of   — (B) what — (C) displaced',
      '(A) of   — (B) that — (C) displacing'
    ],
    answer: 1,
    explanation: '(A): to부정사(to spread)의 의미상 주어로 일반적인 사물/개념을 나타낼 때는 [for + 목적격]을 취하므로 for가 적절합니다.\n(B): 뒤에 완전한 절(another earthquake followed by a tsunami was about to strike)이 이어지므로 동격의 접속사 that이 올바릅니다.\n(C): 재난으로 인해 \'집을 잃고 난민이 된\' 사람들은 수동의 의미를 지니므로 과거분사 displaced가 people을 수식해야 합니다.'
  },
  {
    id: 'ybm2_l1_q8',
    type: 'SHORT',
    question: `다음 영영풀이에 해당하는 단어를 윗글에서 찾아 원형(한 단어의 영어)으로 쓰시오.

<영영풀이>
"done consciously and intentionally; on purpose rather than by accident"`,
    passage: `Unfortunately, becoming an accidental distributor of fake news like Gina is not unusual. Fake news is a deliberate attempt to manipulate people by spreading inaccurate information. It is made by certain groups with the intention of attracting people’s attention, making profits, or gaining political benefits. It can confuse people, disturb society, and even seriously harm the public as well as all individuals involved.`,
    choices: [],
    answer: 'deliberate',
    acceptableAnswers: ['deliberate', 'Deliberate'],
    explanation: '영영 풀이는 \'의도적인, 계획적인\'을 뜻하며, 윗글의 "Fake news is a deliberate attempt to manipulate people..."에서 이에 해당하는 단어는 deliberate입니다.'
  },
  {
    id: 'ybm2_l1_q9',
    type: 'ESSAY',
    question: `윗글의 빈칸 (A)에 들어갈 말을 <우리말> 뜻에 맞도록, <보기>의 단어들을 모두 한 번씩 사용하여 <조건>에 맞게 완전한 영어 문장으로 영작하시오.

<우리말>
"많은 이재민들이 여진에 대해 너무 불안해해서 정부는 그 정보가 가짜라고 발표해야만 했다."

<보기>
many / people / were / anxious / about / aftershocks / the government / to / announce / that / the information / fake / had / displaced / so / that / was

<조건>
1. '너무 ~해서 ...하다'를 나타내는 「so + 형용사 + that절」 구문을 반드시 활용할 것.
2. 주어진 17단어를 변형 없이 모두 빠짐없이 배열할 것.
3. 완전한 하나의 문장으로 작성할 것 (대소문자 및 구두점 유의).`,
    passage: `It is very common for fake news to spread during states of emergency. For example, after an earthquake measuring 6.5 struck Ambon, Indonesia, in September 2019, thousands of residents did not return to their homes and were still in shelters for two weeks. This was because of fake news stories on social media that another earthquake followed by a tsunami was about to strike. One of those messages said, “It’s up to you if you want to believe me or not, but apparently Ambon is going to sink in the next few days.”\n[ (A) ____________________________________________________________________ ]`,
    choices: [],
    answer: 'Many displaced people were so anxious about aftershocks that the government had to announce that the information was fake.',
    acceptableAnswers: [
      'Many displaced people were so anxious about aftershocks that the government had to announce that the information was fake.',
      'Many displaced people were so anxious about aftershocks that the government had to announce that the information was fake'
    ],
    keywords: ['Many displaced people', 'so anxious about aftershocks that', 'the government had to announce that', 'the information was fake'],
    explanation: '「so + 형용사 + that + 주어 + 동사」 결과 구문과 과거분사 displaced의 명사 수식을 결합한 고난도 필수 내신 영작 문제입니다.\n- 주어부: Many displaced people\n- 서술부 1: were so anxious about aftershocks\n- 접속사 that절: that the government had to announce that the information was fake.'
  },
  {
    id: 'ybm2_l1_q10',
    type: 'ESSAY',
    question: `윗글의 빈칸 (A)에 들어갈 말을 <우리말> 뜻에 맞도록, <보기>의 단어들을 활용하여 <조건>에 맞게 완전한 영어 문장으로 영작하시오.

<우리말>
"지나는 자신이 가짜 뉴스를 퍼뜨렸었다는 사실에 당황했다."

<보기>
embarrass / spread / Gina / by / the fact / the fake news / she / be

<조건>
1. 감정을 나타내는 분사 표현(수동태)과 「the fact that + 완전한 절」(동격의 that) 구조를 사용할 것.
2. 당황한 시점(과거)보다 가짜 뉴스를 퍼뜨린 시점이 더 앞선 과거임을 나타내는 시제(과거완료 had p.p.)를 반드시 적용할 것.
3. <보기>의 단어 중 필요한 단어는 어형을 변화시키고, 필요한 접속사를 추가하여 총 12단어로 작성할 것.`,
    passage: `While scrolling through her social media one day, Gina was astonished when she saw the news headline, “The Heundeulbawi in Seoraksan National Park Has Fallen.” Gina immediately shared the shocking story with her close friends. Later, during the morning news on TV, a reporter standing next to the undamaged Heundeulbawi said, “Today’s Internet stories of the Heundeulbawi being damaged were fake.”\n[ (A) ____________________________________________________________________ ]`,
    choices: [],
    answer: 'Gina was embarrassed by the fact that she had spread the fake news.',
    acceptableAnswers: [
      'Gina was embarrassed by the fact that she had spread the fake news.',
      'Gina was embarrassed by the fact that she had spread the fake news'
    ],
    keywords: ['Gina was embarrassed', 'by the fact that', 'had spread the fake news'],
    explanation: '1) Gina가 당황함을 느낀 수동태 표현: Gina was embarrassed\n2) \'~라는 사실에\': by the fact that (동격 접속사 that 추가)\n3) 당황한 과거 시점(was) 이전에 이미 가짜 뉴스를 퍼뜨렸으므로 대과거/과거완료(had p.p.): she had spread the fake news\n따라서 정답은 "Gina was embarrassed by the fact that she had spread the fake news."입니다.'
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
    // 학생 1: 김단하
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

    {
      id: 'practice_20260904_student_1',
      studentId: 1,
      title: '9/4(금) 문제풀이 테스트',
      date: '2026-09-04',
      time: '13:10',
      endTime: '13:30',
      scope: 'YBM(박준언) 공통영어 2 - Lesson 1 (1~4문단) 실전 내신 킬러 문제풀이 (총 10문항)',
      cutoff: '80점 이상',
      cutoffScore: 80,
      practiceCutoff: 80,
      score: '',
      status: 'SCHEDULED',
      retestStatus: 'NONE',
      retestDate: '',
      teacherNote: 'YBM(박준언) 공통영어 2 본문 1과 1~4문단 실전 내신 대비 테스트입니다. 어법, 어휘, 빈칸, 내용일치, 순서배열, 영영풀이 단답형 및 조건부 영작 서술형 2문항이 포함되어 있습니다. 제한시간(13:10~13:30) 내에 집중하여 풀어보세요!',
      type: 'PRACTICE',
      questions: YBM2_L1_PRACTICE_QUESTIONS,
      practiceResult: null,
      allowLate: false
    },


    // ======================================================
    // 학생 2: 김성헌
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
    // 학생 3: 김영빈
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
    // 학생 4: 백승조
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


    // ======================================================
    // 학생 5: 이상록
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
    // 학생 6: 조용준
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
// Firebase 데이터 캐시 (기본 데이터로 즉시 초기화하여 오프라인/지연 시에도 100% 동작 보장)
// ========================================================

const FirebaseStore = {
  students: [...DEFAULT_STUDENTS],
  tests: generateDefaultTests(),
  vocabSets: [],
  vocabTestResults: [],
  textMemorizeResults: [],
  studentsLoaded: false,
  studentListenerStarted: false,
  testsListenerStarted: false,
  vocabSetsListenerStarted: false,
  vocabTestResultsListenerStarted: false,
  textMemorizeResultsListenerStarted: false
};


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

  async waitForFirebase(timeoutMs = 6000) {
    if (this.isFirebaseReady()) return true;

    return new Promise(resolve => {
      const startTime = Date.now();
      let timer = null;

      const onReady = () => {
        cleanup();
        resolve(true);
      };

      const cleanup = () => {
        if (timer) clearInterval(timer);
        if (typeof window !== 'undefined') {
          window.removeEventListener('firebase-ready', onReady);
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('firebase-ready', onReady);
      }

      timer = setInterval(() => {
        if (this.isFirebaseReady()) {
          cleanup();
          resolve(true);
        } else if (Date.now() - startTime > timeoutMs) {
          cleanup();
          console.warn('⚠️ Firebase 준비 대기 타임아웃');
          resolve(false);
        }
      }, 50);
    });
  },


  // ======================================================
  // 학생 목록 가져오기
  // ======================================================

  getStudents() {
    if (Array.isArray(FirebaseStore.students) && FirebaseStore.students.length > 0) {
      return FirebaseStore.students;
    }
    return DEFAULT_STUDENTS;
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

      // 캐시 먼저 업데이트
      FirebaseStore.students = [...students];
      FirebaseStore.studentsLoaded = true;

      // 현재 학생 목록으로 Firestore 컬렉션을 동기화합니다.
      // 목록에서 제거된 학생 문서도 함께 정리되어 학생 삭제가 반영됩니다.
      await this.replaceCollection(
        'students',
        students,
        student => student.id
      );

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
    await this.waitForFirebase();

    try {
      const students = await this.loadStudentsFromFirestore();

      const dummyNames = ['김민준', '이서연', '박도현', '최지우', '정현우', '한유진'];
      const realProfileMap = {
        1: { name: '김단하', target: '내신 2등급', loginId: 'student1', password: '1234' },
        2: { name: '김성헌', target: '내신 1등급', loginId: 'student2', password: '1234' },
        3: { name: '김영빈', target: '내신 1등급', loginId: 'student3', password: '1234' },
        4: { name: '백승조', target: '내신 2등급', loginId: 'student4', password: '1234' },
        5: { name: '이상록', target: '내신 2등급', loginId: 'student5', password: '1234' },
        6: { name: '조용준', target: '내신 2등급', loginId: 'student6', password: '1234' }
      };

      let needsSync = false;
      let updatedStudents = [...students];

      // 1. Firestore에 학생 데이터가 아예 없는 경우 전체 DEFAULT_STUDENTS로 초기화
      if (updatedStudents.length === 0) {
        console.log('📦 Firestore에 학생 데이터가 없어 실제 학생 목록으로 초기화합니다.');
        await this.saveStudents(DEFAULT_STUDENTS);
        FirebaseStore.students = [...DEFAULT_STUDENTS];
        FirebaseStore.studentsLoaded = true;
        return FirebaseStore.students;
      }

      // 2. 가짜 샘플 이름(김민준, 이서연 등)이 남아있으면 실제 학생으로 보정
      //    (선생님이 추가한 11: 송규인, 12: 강민수, 13: 이현민, 14: 테스트 등은 온전히 유지)
      updatedStudents = updatedStudents.map(student => {
        const id = Number(student.id);
        if (dummyNames.includes(student.name) && realProfileMap[id]) {
          needsSync = true;
          return {
            ...student,
            name: realProfileMap[id].name,
            target: student.target && !student.target.includes('수능') ? student.target : realProfileMap[id].target,
            loginId: student.loginId || realProfileMap[id].loginId,
            password: student.password || realProfileMap[id].password
          };
        }
        return student;
      });

      // 3. 1~6번 기본 학생 중 혹시 누락된 학생이 있다면 추가 보충
      DEFAULT_STUDENTS.forEach(defStudent => {
        if (!updatedStudents.some(s => s.id === defStudent.id)) {
          updatedStudents.push({ ...defStudent });
          needsSync = true;
        }
      });

      // 4. 로그인 정보(loginId, password) 누락 방지
      updatedStudents = updatedStudents.map(student => ({
        ...student,
        loginId: student.loginId || `student${student.id}`,
        password: /^\d{4}$/.test(String(student.password || '')) ? String(student.password) : '1234'
      }));

      // ID 순 정렬
      updatedStudents.sort((a, b) => a.id - b.id);

      if (needsSync) {
        await this.saveStudents(updatedStudents);
        console.log('✅ 학생 프로필 정상화 및 Firestore 동기화 완료');
      }

      FirebaseStore.students = updatedStudents;
      FirebaseStore.studentsLoaded = true;
      return FirebaseStore.students;

    } catch (error) {
      console.error('❌ 학생 데이터 초기화 실패:', error);
      FirebaseStore.students = [...DEFAULT_STUDENTS];
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
    if (typeof App === 'undefined' || !App.state) {
      return;
    }

    try {
      // 메인 학생 선택 화면 (랜딩 뷰일 때만)
      if (App.state.view === 'landing' && typeof App.renderLanding === 'function') {
        App.renderLanding();
      }

      // 학생 대시보드
      if (App.state.view === 'student' && typeof App.renderStudentDashboard === 'function') {
        App.renderStudentDashboard();
      }

      // 관리자 화면
      if (App.state.view === 'admin' && typeof App.renderAdminDashboard === 'function') {
        App.renderAdminDashboard();
      }
    } catch (error) {
      console.error('❌ 학생 화면 새로고침 실패:', error);
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
    const cleanData = JSON.parse(JSON.stringify(data, (key, value) => value === undefined ? null : value));
    await setDoc(doc(collection(window.firebaseDB, collectionName), String(id)), cleanData);
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
    await this.waitForFirebase();

    const [tests, vocabSets, vocabTestResults] = await Promise.all([
      this.loadCollection('tests', test => ({ ...test, studentId: Number(test.studentId) })),
      this.loadCollection('vocabSets', set => ({
        ...set,
        book: set.book || '기본 단어장',
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

    // 워드마스터 수능 2000 기본 세트 자동 연동 (세트가 없거나 워드마스터가 미등록된 경우)
    if (vocabSets.length === 0) {
      const legacySets = this.getLegacyArray(LEGACY_STORAGE_KEYS.vocabSets);
      if (legacySets && legacySets.length > 0) {
        await this.saveVocabSets(legacySets);
        localStorage.removeItem(LEGACY_STORAGE_KEYS.vocabSets);
      } else if (typeof WORDMASTER_2000_SETS !== 'undefined' && Array.isArray(WORDMASTER_2000_SETS)) {
        console.log('Auto-seeding Wordmaster 2000 vocab sets...');
        FirebaseStore.vocabSets = WORDMASTER_2000_SETS;
        // background async sync
        this.replaceCollection('vocabSets', WORDMASTER_2000_SETS, set => set.id).catch(e => console.warn('Vocab seed sync notice:', e));
      }
    } else {
      // 기존에 다른 세트만 있고 워드마스터 2000이 하나도 없으면 병합 추가
      const hasWm = vocabSets.some(s => s.book === '워드마스터 수능 2000' || (s.id && s.id.startsWith('wm2000_')));
      if (!hasWm && typeof WORDMASTER_2000_SETS !== 'undefined' && Array.isArray(WORDMASTER_2000_SETS)) {
        console.log('Merging Wordmaster 2000 sets into existing vocab sets...');
        FirebaseStore.vocabSets = [...vocabSets, ...WORDMASTER_2000_SETS];
        this.replaceCollection('vocabSets', FirebaseStore.vocabSets, set => set.id).catch(e => console.warn('Vocab merge sync notice:', e));
      }
    }

    // 기존에 로드된 모든 단어 세트에 대해 워드마스터 교재 발음기호(ipa)가 누락되어 있다면 자동 보강
    if (typeof WORDMASTER_2000_SETS !== 'undefined' && Array.isArray(WORDMASTER_2000_SETS)) {
      const wmIpaLookup = new Map();
      WORDMASTER_2000_SETS.forEach(s => {
        (s.words || []).forEach(w => {
          if (w.en && w.ipa) wmIpaLookup.set(w.en.trim().toLowerCase(), w.ipa);
        });
      });
      let enriched = false;
      (FirebaseStore.vocabSets || []).forEach(s => {
        (s.words || []).forEach(w => {
          if (w.en && !w.ipa) {
            const foundIpa = wmIpaLookup.get(w.en.trim().toLowerCase());
            if (foundIpa) {
              w.ipa = foundIpa;
              enriched = true;
            }
          }
        });
      });
      if (enriched) {
        console.log('기존 단어장에 워드마스터 교재 발음기호(IPA)가 성공적으로 자동 보강되었습니다.');
      }
    }

    // 2026 고1 9모 대비 특별 단어 세트 자동 연동 (최우선 상단 배치)
    if (typeof MOCK_EXAM_VOCAB_SETS !== 'undefined' && Array.isArray(MOCK_EXAM_VOCAB_SETS)) {
      let updatedMock = false;
      const currentVocabSets = FirebaseStore.vocabSets || [];
      // 구형 6모/9모 세트 ID가 남아있다면 정리
      const cleanedVocabSets = currentVocabSets.filter(s => !s.id.startsWith('mock2026_g1_sep_part') && s.id !== 'mock2026_g1_sep_all');
      MOCK_EXAM_VOCAB_SETS.forEach(mockSet => {
        const existingIdx = cleanedVocabSets.findIndex(s => s.id === mockSet.id);
        if (existingIdx === -1) {
          cleanedVocabSets.unshift(mockSet);
          updatedMock = true;
        } else {
          cleanedVocabSets[existingIdx] = { ...cleanedVocabSets[existingIdx], ...mockSet };
          updatedMock = true;
        }
      });
      if (updatedMock || cleanedVocabSets.length !== currentVocabSets.length) {
        FirebaseStore.vocabSets = cleanedVocabSets;
        console.log('2026 고1 9모 대비 특별 단어 세트가 성공적으로 동기화되었습니다.');
        this.replaceCollection('vocabSets', FirebaseStore.vocabSets, set => set.id).catch(e => console.warn('Mock vocab sync notice:', e));
      }
    }

    // 9/2 모의고사 D-Day: 기존 9/2 단어 시험 일정을 삭제하고, 모든 학생에게 [9모 킬러] 시험 일괄 등록
    try {
      const targetExamDate = '2026-09-02';
      const students = this.getStudents();
      let currentTests = this.getTests();
      let testsModified = false;

      // 1. 9/2 날짜에 있던 기존 단어 시험(VOCAB) 또는 'VOCA' 관련 구형 시험 삭제
      const filteredTests = currentTests.filter(t => {
        const isTargetDate = t.date === targetExamDate;
        const isOldVocab = isTargetDate && (t.type === 'VOCAB' || (t.title && t.title.includes('VOCA'))) && !t.id.startsWith('mock2026_final_student_');
        if (isOldVocab) {
          testsModified = true;
          return false;
        }
        return true;
      });

      // 2. 모든 학생(1번~6번 및 추가 등록된 전체 학생)에게 9/2 파이널 단어 시험 일괄 등록/갱신
      students.forEach(student => {
        const existingFinal = filteredTests.find(t => t.studentId === student.id && t.date === targetExamDate && t.id.startsWith('mock2026_final_student_'));
        const mockTestConfig = {
          id: `mock2026_final_student_${student.id}`,
          studentId: student.id,
          title: '[9모 킬러] 반전 다의어 60선',
          date: targetExamDate,
          time: '08:00',
          endTime: '23:59',
          scope: '2026 고1 9모 대비 1등급 필수 반전 다의어 60선 (Part 1 통과 후 ➔ Part 2 최종 합격)',
          cutoff: '객관식 90점 이상',
          cutoffScore: 90,
          vocabCutoff: 90,
          vocabCutoffs: { 2: 90 },
          vocabSetId: 'mock2026_g1_sep_9mo',
          vocabSetIds: ['mock2026_g1_sep_9mo'],
          score: existingFinal?.score || '',
          status: existingFinal?.status || 'SCHEDULED',
          retestStatus: 'NONE',
          retestDate: '',
          teacherNote: '🔥 9모 직전 필출 다의어 60선! Part 1 합격 후 Part 2까지 통과하여 1등급 대박 행운을 잡으세요!',
          isMockSpecial: true,
          type: 'VOCAB',
          allowLate: true,
          mockPart1Passed: existingFinal?.mockPart1Passed || false,
          mockPart1Score: existingFinal?.mockPart1Score || null,
          mockPart2Passed: existingFinal?.mockPart2Passed || false,
          mockPart2Score: existingFinal?.mockPart2Score || null
        };

        if (!existingFinal) {
          filteredTests.push(mockTestConfig);
          testsModified = true;
        } else if (existingFinal.title !== mockTestConfig.title || existingFinal.vocabSetId !== mockTestConfig.vocabSetId || existingFinal.cutoffScore !== 90 || existingFinal.vocabCutoff !== 90) {
          existingFinal.title = mockTestConfig.title;
          existingFinal.cutoff = '객관식 90점 이상';
          existingFinal.cutoffScore = 90;
          existingFinal.vocabCutoff = 90;
          existingFinal.vocabCutoffs = { 2: 90 };
          testsModified = true;
        }
      });

      if (testsModified) {
        FirebaseStore.tests = filteredTests;
        await this.replaceCollection('tests', FirebaseStore.tests, t => t.id).catch(e => console.warn('Tests sync notice:', e));
        console.log('9/2 기존 단어세트 정리 완료 및 전체 학생 대상 [9모 킬러] 시험 일정이 성공적으로 일괄 등록되었습니다.');
      }
    } catch (err) {
      console.warn('9/2 파이널 시험 일괄 등록 동기화 안내:', err);
    }

    // 9/4(금) 문제풀이 테스트: 전체 학생 대상 일괄 등록 및 동기화 (13:10 ~ 13:30)
    try {
      const practiceExamDate = '2026-09-04';
      const students = this.getStudents();
      let currentTests = this.getTests();
      let practiceModified = false;

      students.forEach(student => {
        const existingTest = currentTests.find(t => t.studentId === student.id && t.date === practiceExamDate && (t.id === `practice_20260904_student_${student.id}` || (t.type === 'PRACTICE' && t.title && t.title.includes('문제풀이'))));
        const practiceTestConfig = {
          id: `practice_20260904_student_${student.id}`,
          studentId: student.id,
          title: '9/4(금) 문제풀이 테스트',
          date: practiceExamDate,
          time: '13:10',
          endTime: '13:30',
          scope: 'YBM(박준언) 공통영어 2 - Lesson 1 (1~4문단) 실전 내신 킬러 문제풀이 (총 10문항)',
          cutoff: '80점 이상',
          cutoffScore: 80,
          practiceCutoff: 80,
          score: existingTest?.score || '',
          status: existingTest?.status || 'SCHEDULED',
          retestStatus: existingTest?.retestStatus || 'NONE',
          retestDate: existingTest?.retestDate || '',
          teacherNote: 'YBM(박준언) 공통영어 2 본문 1과 1~4문단 실전 내신 대비 테스트입니다. 어법, 어휘, 빈칸, 내용일치, 순서배열, 영영풀이 단답형 및 조건부 영작 서술형 2문항이 포함되어 있습니다. 제한시간(13:10~13:30) 내에 집중하여 풀어보세요!',
          type: 'PRACTICE',
          questions: YBM2_L1_PRACTICE_QUESTIONS,
          practiceResult: existingTest?.practiceResult || null,
          allowLate: false
        };

        if (!existingTest) {
          currentTests.push(practiceTestConfig);
          practiceModified = true;
        } else if (
          existingTest.title !== practiceTestConfig.title ||
          existingTest.time !== '13:10' ||
          existingTest.endTime !== '13:30' ||
          existingTest.allowLate !== false ||
          !existingTest.questions ||
          existingTest.questions.length !== 10 ||
          (existingTest.questions[0] && existingTest.questions[0].question && existingTest.questions[0].question.includes('[1과')) ||
          (existingTest.questions[7] && existingTest.questions[7].question && existingTest.questions[7].question.includes('영영 풀이')) ||
          (existingTest.questions[8] && existingTest.questions[8].passage && existingTest.questions[8].passage.includes('**[많은'))
        ) {
          existingTest.title = practiceTestConfig.title;
          existingTest.time = '13:10';
          existingTest.endTime = '13:30';
          existingTest.scope = practiceTestConfig.scope;
          existingTest.questions = practiceTestConfig.questions;
          existingTest.type = 'PRACTICE';
          existingTest.cutoff = '80점 이상';
          existingTest.cutoffScore = 80;
          existingTest.practiceCutoff = 80;
          existingTest.teacherNote = practiceTestConfig.teacherNote;
          existingTest.allowLate = false;
          practiceModified = true;
        }
      });

      if (practiceModified) {
        FirebaseStore.tests = currentTests;
        await this.replaceCollection('tests', FirebaseStore.tests, t => t.id).catch(e => console.warn('Practice tests sync notice:', e));
        console.log('9/4(금) YBM(박준언) 1과 실전 문제풀이 테스트가 전체 학생에게 성공적으로 일괄 등록되었습니다.');
      }
    } catch (err) {
      console.warn('9/4 문제풀이 테스트 일괄 등록 동기화 안내:', err);
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
    this.startCollectionListener({
      collectionName: 'textMemorizeResults', cacheKey: 'textMemorizeResults', listenerKey: 'textMemorizeResultsListenerStarted',
      normalize: result => ({ ...result, studentId: Number(result.studentId) })
    });
  },


  // ======================================================
  // 시험 목록 가져오기
  // ======================================================

  getTests() {
    if (Array.isArray(FirebaseStore.tests) && FirebaseStore.tests.length > 0) {
      return FirebaseStore.tests;
    }
    return generateDefaultTests();
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
          new Date(b.date) -
          new Date(a.date)
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
  // 학생 계정 추가 / 삭제
  // ======================================================

  async addStudent(studentData) {
    const students = this.getStudents();
    const nextId = students.reduce(
      (maxId, student) => Math.max(maxId, Number(student.id) || 0),
      0
    ) + 1;
    const newStudent = {
      id: nextId,
      name: studentData.name,
      target: studentData.target || '',
      loginId: studentData.loginId,
      password: studentData.password
    };

    await this.saveStudents([...students, newStudent]);
    return newStudent;
  },

  async deleteStudent(studentId) {
    const normalizedStudentId = Number(studentId);
    const students = this.getStudents();
    if (!students.some(student => student.id === normalizedStudentId)) {
      return false;
    }

    const remainingStudents = students.filter(
      student => student.id !== normalizedStudentId
    );
    const remainingTests = this.getTests().filter(
      test => Number(test.studentId) !== normalizedStudentId
    );
    const remainingVocabSets = this.getVocabSets().map(set => ({
      ...set,
      studentIds: (set.studentIds || []).filter(
        id => Number(id) !== normalizedStudentId
      )
    }));
    const remainingVocabResults = this.getVocabTestResults().filter(
      result => Number(result.studentId) !== normalizedStudentId
    );

    await Promise.all([
      this.saveStudents(remainingStudents),
      this.saveTests(remainingTests),
      this.saveVocabSets(remainingVocabSets),
      this.saveVocabTestResults(remainingVocabResults)
    ]);
    return true;
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
      book: (set.book || '기본 단어장').trim(),
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

        Number(result.studentId) ===
          Number(studentId) &&

        Number(result.direction) ===
          Number(direction) &&

        (
          testId !== null
            ? result.testId === testId
            : result.setId === setId
        )

      ) || null;
  },


  getVocabTestResultDocumentId(result) {
    return [
      Number(result.studentId),
      encodeURIComponent(String(result.setId || 'set')),
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

        Number(result.studentId) ===
          Number(resultData.studentId) &&

        Number(result.direction) ===
          Number(resultData.direction) &&

        (
          resultData.testId
            ? result.testId === resultData.testId
            : result.setId === resultData.setId
        )

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

      startedAt:
        resultData.startedAt ||
        resultData.completedAt,

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

  },

  // ── 본문 암기 테스트 결과 ───────────────────────────────

  getTextMemorizeResults() {
    return FirebaseStore.textMemorizeResults || [];
  },

  getTextMemorizeResult(studentId, testId) {
    return this.getTextMemorizeResults()
      .find(r => r.studentId === Number(studentId) && r.testId === testId)
      || null;
  },

  getTextMemorizeResultDocId(result) {
    return `tm_${Number(result.studentId)}_${encodeURIComponent(String(result.testId || 'free'))}`;
  },

  async saveTextMemorizeResult(studentId, testId, { score, correct, total, passed, completedAt }) {
    const results = this.getTextMemorizeResults().filter(
      r => !(r.studentId === Number(studentId) && r.testId === testId)
    );
    const newResult = {
      studentId: Number(studentId),
      testId,
      score: Math.round(score),
      correct,
      total,
      passed,
      completedAt: completedAt || new Date().toISOString()
    };
    results.push(newResult);
    FirebaseStore.textMemorizeResults = results;

    // 연결된 시험 일정이 있으면 status 업데이트
    if (testId && passed) {
      const tests = this.getTests();
      const idx = tests.findIndex(t => t.id === testId && t.studentId === Number(studentId));
      if (idx >= 0) {
        tests[idx] = { ...tests[idx], status: 'PASS' };
        await this.saveTests(tests);
      }
    }

    try {
      await this.writeDocument(
        'textMemorizeResults',
        this.getTextMemorizeResultDocId(newResult),
        newResult
      );
    } catch (error) {
      this.reportCloudWriteError('본문 암기 결과', error);
      throw error;
    }
    return newResult;
  },

  async deleteTextMemorizeResultsByTestId(testId) {
    const results = this.getTextMemorizeResults().filter(r => r.testId !== testId);
    FirebaseStore.textMemorizeResults = results;
    // Firestore doc deletion handled elsewhere when test is deleted
  }

};

