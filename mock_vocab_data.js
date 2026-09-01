/**
 * 2026학년도 고1 9월 모의고사 대비 특별 단어 세트
 * "아는 단어인데 전혀 몰랐던 뜻" — 1등급 빈출 반전 다의어 60선
 * 직관적인 2줄 초고가독성 해설 (기존뜻 ➔ 9모 출제뜻 + 기출 예문)
 */

const MOCK_PART1_WORDS = [
  {
    en: "count",
    ipa: "[káunt]",
    ko: "중요하다, 가치가 있다",
    baseKo: "세다",
    mockKo: "중요하다 (=matter)",
    exampleEn: "Every second counts.",
    exampleKo: "매 1초가 중요하다.",
    desc: "기존뜻: 세다 ➔ 9모뜻: 중요하다 (=matter) | Every second counts.(매 1초가 중요하다.)"
  },
  {
    en: "matter",
    ipa: "[mǽtər]",
    ko: "중요하다, 문제가 되다",
    baseKo: "물질, 문제",
    mockKo: "중요하다 (=be important)",
    exampleEn: "It matters little what they think.",
    exampleKo: "그들이 뭘 생각하든 중요치 않다.",
    desc: "기존뜻: 물질 ➔ 9모뜻: 중요하다 (=be important) | It matters little.(별로 중요하지 않다.)"
  },
  {
    en: "appreciate",
    ipa: "[əpríːʃièit]",
    ko: "진가를 인정하다, (가치가) 오르다",
    baseKo: "감사하다",
    mockKo: "진가를 인정하다 / 가치가 오르다",
    exampleEn: "His talents were not fully appreciated.",
    exampleKo: "그의 재능은 온전히 진가를 인정받지 못했다.",
    desc: "기존뜻: 감사하다 ➔ 9모뜻: 진가를 인정하다 / (가치가) 오르다"
  },
  {
    en: "observe",
    ipa: "[əbzə́ːrv]",
    ko: "(법·규칙을) 준수하다, 지키다",
    baseKo: "관찰하다",
    mockKo: "준수하다, 지키다",
    exampleEn: "Drivers must observe the traffic rules.",
    exampleKo: "운전자는 교통 법규를 반드시 준수해야 한다.",
    desc: "기존뜻: 관찰하다 ➔ 9모뜻: (법·규칙을) 준수하다"
  },
  {
    en: "address",
    ipa: "[ədrés]",
    ko: "(문제를) 다루다, 해결하다",
    baseKo: "주소",
    mockKo: "다루다, 해결하다 (=tackle)",
    exampleEn: "We must address the climate problem.",
    exampleKo: "우리는 기후 문제를 다루고 해결해야 한다.",
    desc: "기존뜻: 주소 ➔ 9모뜻: (문제를) 다루다, 해결하다 (=tackle)"
  },
  {
    en: "compromise",
    ipa: "[kámprəmàiz]",
    ko: "(원칙·안전을) 훼손하다, 위태롭게 하다",
    baseKo: "타협하다",
    mockKo: "훼손하다, 위태롭게 하다",
    exampleEn: "Stress compromises the immune system.",
    exampleKo: "스트레스는 면역 체계를 훼손한다.",
    desc: "기존뜻: 타협하다 ➔ 9모뜻: (안전·건강을) 훼손하다, 위태롭게 하다"
  },
  {
    en: "spell",
    ipa: "[spél]",
    ko: "(나쁜 결과를) 초래하다, 가져오다",
    baseKo: "철자를 쓰다",
    mockKo: "초래하다, 가져오다 (=cause)",
    exampleEn: "The drought spells disaster for crops.",
    exampleKo: "가뭄은 농작물에 재앙을 초래한다.",
    desc: "기존뜻: 철자를 쓰다 ➔ 9모뜻: (나쁜 결과를) 초래하다 (=cause)"
  },
  {
    en: "accommodate",
    ipa: "[əkámədèit]",
    ko: "(요구·조건을) 수용하다, 맞추다",
    baseKo: "숙박시키다",
    mockKo: "수용하다, 맞추다",
    exampleEn: "Schools must accommodate students' needs.",
    exampleKo: "학교는 학생들의 요구를 수용하고 맞춰야 한다.",
    desc: "기존뜻: 숙박시키다 ➔ 9모뜻: (요구·변화를) 수용하다, 맞추다"
  },
  {
    en: "tell",
    ipa: "[tél]",
    ko: "구별하다, 분간하다",
    baseKo: "말하다",
    mockKo: "구별하다, 분간하다 (=distinguish)",
    exampleEn: "It is hard to tell the twins apart.",
    exampleKo: "그 쌍둥이를 서로 구별하기란 어렵다.",
    desc: "기존뜻: 말하다 ➔ 9모뜻: 구별하다, 분간하다 (=distinguish)"
  },
  {
    en: "check",
    ipa: "[tʃék]",
    ko: "억제하다, 저지하다",
    baseKo: "확인하다",
    mockKo: "억제하다, 저지하다",
    exampleEn: "Government must check rising prices.",
    exampleKo: "정부는 치솟는 물가를 억제해야 한다.",
    desc: "기존뜻: 확인하다 ➔ 9모뜻: 억제하다, 저지하다 (checks and balances: 견제와 균형)"
  },
  {
    en: "entertain",
    ipa: "[èntərtéin]",
    ko: "(생각·의심을) 품다, 고려하다",
    baseKo: "즐겁게 하다",
    mockKo: "품다, 진지하게 고려하다",
    exampleEn: "He refused to entertain the doubt.",
    exampleKo: "그는 의심을 마음에 품는 것을 거부했다.",
    desc: "기존뜻: 즐겁게 하다 ➔ 9모뜻: (생각·아이디어를) 마음에 품다"
  },
  {
    en: "sound",
    ipa: "[sáund]",
    ko: "건전한, 타당한, 믿을 만한",
    baseKo: "소리",
    mockKo: "건전한, 타당한 (=valid)",
    exampleEn: "The doctor gave me sound advice.",
    exampleKo: "의사는 내게 매우 타당하고 건전한 조언을 해주었다.",
    desc: "기존뜻: 소리 ➔ 9모뜻: 건전한, 타당한 (=valid) | sound sleep(깊은 잠)"
  },
  {
    en: "fast",
    ipa: "[fǽst]",
    ko: "단단히, 굳게, 고정된",
    baseKo: "빠른",
    mockKo: "단단히, 굳게",
    exampleEn: "Hold fast to your dreams.",
    exampleKo: "당신의 꿈을 단단히 붙들어라.",
    desc: "기존뜻: 빠른 ➔ 9모뜻: 단단히, 굳게 | fast asleep(깊이 잠든)"
  },
  {
    en: "bear",
    ipa: "[bɛ́ər]",
    ko: "견디다, (마음에) 품다, 결실을 맺다",
    baseKo: "곰",
    mockKo: "견디다, 품다",
    exampleEn: "I cannot bear this pain any longer.",
    exampleKo: "나는 이 고통을 더 이상 견딜 수 없다.",
    desc: "기존뜻: 곰 ➔ 9모뜻: 견디다, 품다 | bear in mind(명심하다)"
  },
  {
    en: "grave",
    ipa: "[gréiv]",
    ko: "심각한, 중대한, 근엄한",
    baseKo: "무덤",
    mockKo: "심각한, 중대한 (=serious)",
    exampleEn: "The war poses a grave threat to peace.",
    exampleKo: "전쟁은 평화에 중대한 위협이 된다.",
    desc: "기존뜻: 무덤 ➔ 9모뜻: 심각한, 중대한 (=serious)"
  },
  {
    en: "yield",
    ipa: "[jíːld]",
    ko: "산출하다, 생산하다; 굴복하다",
    baseKo: "양보하다",
    mockKo: "산출하다 / 굴복하다",
    exampleEn: "The research yielded positive results.",
    exampleKo: "그 연구는 긍정적인 결과를 산출했다.",
    desc: "기존뜻: 양보하다 ➔ 9모뜻: 산출하다 / 굴복하다(yield to)"
  },
  {
    en: "plant",
    ipa: "[plǽnt]",
    ko: "(생각을) 심다; 공장 설비",
    baseKo: "식물",
    mockKo: "(의심 등을) 심다 / 공장",
    exampleEn: "He planted suspicion in her mind.",
    exampleKo: "그는 그녀의 마음에 의심을 심어놓았다.",
    desc: "기존뜻: 식물 ➔ 9모뜻: (의심 등을) 심다 / 공장(power plant)"
  },
  {
    en: "novel",
    ipa: "[nɑ́vəl]",
    ko: "새로운, 참신한, 기발한",
    baseKo: "소설",
    mockKo: "새로운, 참신한 (=innovative)",
    exampleEn: "Scientists proposed a novel method.",
    exampleKo: "과학자들은 참신하고 새로운 방식을 제안했다.",
    desc: "기존뜻: 소설 ➔ 9모뜻: 새로운, 참신한 (=innovative)"
  },
  {
    en: "draw",
    ipa: "[drɔ́ː]",
    ko: "(결론을) 도출하다, 이끌어내다",
    baseKo: "그리다",
    mockKo: "도출하다, 이끌어내다",
    exampleEn: "We can draw a conclusion from the data.",
    exampleKo: "우리는 그 자료에서 결론을 도출할 수 있다.",
    desc: "기존뜻: 그리다 ➔ 9모뜻: (결론 등을) 도출하다, 이끌어내다"
  },
  {
    en: "charge",
    ipa: "[tʃɑ́ːrdʒ]",
    ko: "책임을 맡기다; 기소하다, 고발하다",
    baseKo: "요금",
    mockKo: "책임 / 기소하다",
    exampleEn: "She is in charge of the project.",
    exampleKo: "그녀가 그 프로젝트를 전적으로 책임지고 있다.",
    desc: "기존뜻: 요금 ➔ 9모뜻: 책임(in charge of) / 기소하다"
  },
  {
    en: "credit",
    ipa: "[krédit]",
    ko: "(공로·성과를) ~의 탓으로 돌리다",
    baseKo: "신용",
    mockKo: "~의 공로로 돌리다 (=attribute to)",
    exampleEn: "Credit the success to teamwork.",
    exampleKo: "그 성공을 팀워크의 공로로 돌리다.",
    desc: "기존뜻: 신용 ➔ 9모뜻: (성과를) ~의 덕분/공로로 돌리다"
  },
  {
    en: "fine",
    ipa: "[fáin]",
    ko: "미세한, 촘촘한; 벌금",
    baseKo: "좋은",
    mockKo: "미세한 / 벌금",
    exampleEn: "Fine dust enters our lungs easily.",
    exampleKo: "미세먼지는 우리 폐 속으로 쉽게 들어간다.",
    desc: "기존뜻: 좋은 ➔ 9모뜻: 미세한(fine dust) / 벌금(pay a fine)"
  },
  {
    en: "subject",
    ipa: "[sʌ́bdʒikt]",
    ko: "피실험자; ~의 영향을 받기 쉬운",
    baseKo: "과목, 주제",
    mockKo: "피실험자 / 종속된",
    exampleEn: "Subjects were tested in a quiet room.",
    exampleKo: "피실험자들은 조용한 방에서 테스트를 받았다.",
    desc: "기존뜻: 과목 ➔ 9모뜻: 피실험자 / ~의 영향을 받기 쉬운(be subject to)"
  },
  {
    en: "object",
    ipa: "[ɑ́bdʒikt]",
    ko: "반대하다, 이의를 제기하다",
    baseKo: "물건, 대상",
    mockKo: "반대하다 (to)",
    exampleEn: "Many people objected to the new law.",
    exampleKo: "많은 사람들이 그 새로운 법에 반대했다.",
    desc: "기존뜻: 물건, 대상 ➔ 9모뜻: 반대하다(object to = oppose)"
  },
  {
    en: "firm",
    ipa: "[fə́ːrm]",
    ko: "확고한, 단호한, 단단한",
    baseKo: "회사",
    mockKo: "확고한, 단단한",
    exampleEn: "She has a firm belief in justice.",
    exampleKo: "그녀는 정의에 대한 확고한 신념을 가지고 있다.",
    desc: "기존뜻: 회사 ➔ 9모뜻: 확고한, 단호한 (=resolute)"
  },
  {
    en: "scale",
    ipa: "[skéil]",
    ko: "(가파른 곳을) 기어오르다; 규모",
    baseKo: "저울, 비늘",
    mockKo: "기어오르다 / 규모",
    exampleEn: "They scaled the steep mountain cliff.",
    exampleKo: "그들은 가파른 절벽을 기어올랐다.",
    desc: "기존뜻: 저울 ➔ 9모뜻: 기어오르다(=climb) / 규모"
  },
  {
    en: "current",
    ipa: "[kə́ːrənt]",
    ko: "흐름, 해류, 기류, 경향",
    baseKo: "현재의",
    mockKo: "흐름, 해류, 경향",
    exampleEn: "The boat was carried by a strong current.",
    exampleKo: "배가 강한 해류에 휩쓸려 떠내려갔다.",
    desc: "기존뜻: 현재의 ➔ 9모뜻: (물·공기·생각의) 도도한 흐름, 해류"
  },
  {
    en: "figure",
    ipa: "[fígjər]",
    ko: "생각하다, 판단하다; 중요 인물",
    baseKo: "숫자",
    mockKo: "생각하다 / 중요 인물",
    exampleEn: "He is an important figure in history.",
    exampleKo: "그는 역사에서 대단히 중요한 인물이다.",
    desc: "기존뜻: 숫자 ➔ 9모뜻: 중요 인물 / 생각하다(figure out)"
  },
  {
    en: "court",
    ipa: "[kɔ́ːrt]",
    ko: "(재난·위험을) 자초하다; 환심을 사다",
    baseKo: "법원, 코트",
    mockKo: "자초하다, 환심을 사다",
    exampleEn: "Speeding will court disaster.",
    exampleKo: "과속 운전은 재앙을 자초할 것이다.",
    desc: "기존뜻: 법원 ➔ 9모뜻: (위험을) 자초하다, 환심을 사려 하다"
  },
  {
    en: "game",
    ipa: "[géim]",
    ko: "사냥감; 기꺼이 응하는, 용기 있는",
    baseKo: "놀이, 게임",
    mockKo: "사냥감 / 기꺼이 응하는",
    exampleEn: "Big game like lions and tigers.",
    exampleKo: "사자와 호랑이 같은 대형 야생 사냥감.",
    desc: "기존뜻: 놀이 ➔ 9모뜻: 사냥감(big game) / 기꺼이 응하는"
  }
];

const MOCK_PART2_WORDS = [
  {
    en: "even",
    ipa: "[íːvən]",
    ko: "평평한, 대등한, 침착한",
    baseKo: "심지어",
    mockKo: "평평한 / 대등한",
    exampleEn: "The two teams fought an even match.",
    exampleKo: "두 팀은 막상막하의 대등한 경기를 펼쳤다.",
    desc: "기존뜻: 심지어 ➔ 9모뜻: 대등한, 평평한, 침착한"
  },
  {
    en: "meet",
    ipa: "[míːt]",
    ko: "(요구·조건·마감을) 충족시키다",
    baseKo: "만나다",
    mockKo: "충족시키다 (=satisfy)",
    exampleEn: "The plan failed to meet our expectations.",
    exampleKo: "그 계획은 우리의 기대치를 충족시키지 못했다.",
    desc: "기존뜻: 만나다 ➔ 9모뜻: (요구·조건을) 충족시키다 (=satisfy)"
  },
  {
    en: "last",
    ipa: "[lǽst]",
    ko: "지속되다, 견디다",
    baseKo: "마지막의",
    mockKo: "지속되다, 견디다",
    exampleEn: "The battery lasts for ten hours.",
    exampleKo: "그 배터리는 10시간 동안 지속된다.",
    desc: "기존뜻: 마지막 ➔ 9모뜻: 지속되다, 견디다"
  },
  {
    en: "spring",
    ipa: "[spríŋ]",
    ko: "튀어오르다, 샘솟다, 싹트다",
    baseKo: "봄",
    mockKo: "튀어오르다, 샘솟다",
    exampleEn: "Tears sprang from her eyes.",
    exampleKo: "그녀의 두 눈에서 눈물이 왈칵 솟구쳤다.",
    desc: "기존뜻: 봄 ➔ 9모뜻: 튀어오르다, 샘솟다(spring from)"
  },
  {
    en: "custom",
    ipa: "[kʌ́stəm]",
    ko: "관세, 세관(customs); 맞춤형의",
    baseKo: "관습",
    mockKo: "세관, 관세 / 맞춤 제작한",
    exampleEn: "We had to go through airport customs.",
    exampleKo: "우리는 공항 세관 검사대를 통과해야 했다.",
    desc: "기존뜻: 관습 ➔ 9모뜻: 세관, 관세(customs) / 맞춤형의"
  },
  {
    en: "second",
    ipa: "[sékənd]",
    ko: "(제안·의견을) 지지하다, 재청하다",
    baseKo: "두 번째",
    mockKo: "지지하다, 재청하다 (=support)",
    exampleEn: "I second your proposal.",
    exampleKo: "나는 당신의 제안을 전적으로 지지합니다.",
    desc: "기존뜻: 두 번째 ➔ 9모뜻: 지지하다, 재청하다 (=support)"
  },
  {
    en: "minute",
    ipa: "[mainjúːt]",
    ko: "극미한, 대단히 정밀한",
    baseKo: "분 (시간)",
    mockKo: "극미한, 대단히 정밀한",
    exampleEn: "Look at the minute details of the leaf.",
    exampleKo: "나뭇잎의 극도로 미세하고 정밀한 세부구조를 보라.",
    desc: "기존뜻: 1분 ➔ 9모뜻: 극미한, 정밀한 [mainjúːt]"
  },
  {
    en: "content",
    ipa: "[kəntént]",
    ko: "만족하는, 자족하는",
    baseKo: "콘텐츠, 내용물",
    mockKo: "만족하는 (=satisfied)",
    exampleEn: "He is content with what he has.",
    exampleKo: "그는 자신이 가진 것에 자족하고 만족한다.",
    desc: "기존뜻: 내용물 ➔ 9모뜻: 만족하는 (=satisfied) [kəntént]"
  },
  {
    en: "will",
    ipa: "[wíl]",
    ko: "의지; 유언장",
    baseKo: "~할 것이다",
    mockKo: "의지 / 유언장",
    exampleEn: "Where there is a will, there is a way.",
    exampleKo: "의지가 있는 곳에 길이 있다.",
    desc: "기존뜻: ~할 것이다 ➔ 9모뜻: 의지, 유언장"
  },
  {
    en: "issue",
    ipa: "[íʃuː]",
    ko: "(공식 발표·경고를) 내다; 발행하다",
    baseKo: "문제, 쟁점",
    mockKo: "발표하다, 발급하다",
    exampleEn: "The government issued a severe warning.",
    exampleKo: "정부는 강력한 경고를 공식 발표했다.",
    desc: "기존뜻: 문제 ➔ 9모뜻: 발표하다, 발급하다"
  },
  {
    en: "engage",
    ipa: "[engéidʒ]",
    ko: "(주의·관심을) 사로잡다; 참여하다",
    baseKo: "약혼하다",
    mockKo: "사로잡다 / 참여하다",
    exampleEn: "The novel engaged my attention completely.",
    exampleKo: "그 소설은 내 주의를 완전히 사로잡았다.",
    desc: "기존뜻: 약혼하다 ➔ 9모뜻: (관심을) 사로잡다 / 참여하다"
  },
  {
    en: "host",
    ipa: "[hóust]",
    ko: "다수, 수많은 무리 (a host of)",
    baseKo: "주인, 주최자",
    mockKo: "다수, 수많은 무리",
    exampleEn: "A host of problems appeared.",
    exampleKo: "수많은 골치 아픈 문제들이 나타났다.",
    desc: "기존뜻: 주인 ➔ 9모뜻: 수많은 무리 (a host of = a lot of)"
  },
  {
    en: "lean",
    ipa: "[líːn]",
    ko: "군살 없는; 빈약한",
    baseKo: "기대다",
    mockKo: "군살 없는 / 빈약한",
    exampleEn: "He has a lean, athletic body.",
    exampleKo: "그는 군살 없는 날렵하고 탄탄한 몸을 가졌다.",
    desc: "기존뜻: 기대다 ➔ 9모뜻: 군살 없는, 빈약한"
  },
  {
    en: "flat",
    ipa: "[flǽt]",
    ko: "단호한, 확고한; 침체된",
    baseKo: "평평한",
    mockKo: "단호한 / 침체된",
    exampleEn: "She gave him a flat refusal.",
    exampleKo: "그녀는 그에게 일말의 여지없는 단호한 거절을 했다.",
    desc: "기존뜻: 평평한 ➔ 9모뜻: 단호한(flat refusal) / 침체된"
  },
  {
    en: "deliver",
    ipa: "[dilívər]",
    ko: "(약속을) 이행하다; 연설하다",
    baseKo: "배달하다",
    mockKo: "이행하다 / 연설하다",
    exampleEn: "The politician delivered on his promise.",
    exampleKo: "그 정치인은 자신의 공약을 성실히 이행했다.",
    desc: "기존뜻: 배달하다 ➔ 9모뜻: (약속을) 이행하다 / 연설하다"
  },
  {
    en: "consume",
    ipa: "[kənsúːm]",
    ko: "(강렬한 감정이) 사로잡다, 휩싸이다",
    baseKo: "소비하다",
    mockKo: "사로잡다, 휩싸이다",
    exampleEn: "She was consumed with guilt.",
    exampleKo: "그녀는 극심한 죄책감에 완전히 사로잡혔다.",
    desc: "기존뜻: 소비하다 ➔ 9모뜻: (감정이) 집어삼키다, 사로잡다"
  },
  {
    en: "discipline",
    ipa: "[dísəplin]",
    ko: "학문 분야; 규율, 절제력",
    baseKo: "벌주다",
    mockKo: "학문 분야 / 규율",
    exampleEn: "Physics is a fundamental discipline.",
    exampleKo: "물리학은 대단히 기초적인 학문 분야이다.",
    desc: "기존뜻: 벌주다 ➔ 9모뜻: 학문 분야 / 규율, 절제력"
  },
  {
    en: "exercise",
    ipa: "[éksərsàiz]",
    ko: "(권리·힘을) 행사하다, 발휘하다",
    baseKo: "운동하다",
    mockKo: "행사하다, 발휘하다",
    exampleEn: "Citizens must exercise their right to vote.",
    exampleKo: "시민들은 투표권을 적극적으로 행사해야 한다.",
    desc: "기존뜻: 운동하다 ➔ 9모뜻: (권리·권력을) 행사하다"
  },
  {
    en: "harbor",
    ipa: "[hɑ́ːrbər]",
    ko: "(생각·의심·원한을) 품다, 숨겨주다",
    baseKo: "항구",
    mockKo: "품다, 숨겨주다",
    exampleEn: "Never harbor resentment in your heart.",
    exampleKo: "마음속에 결코 원한을 품지 마라.",
    desc: "기존뜻: 항구 ➔ 9모뜻: (생각·원한을) 품다"
  },
  {
    en: "pool",
    ipa: "[púːl]",
    ko: "(자원·정보를) 공동으로 모으다",
    baseKo: "수영장",
    mockKo: "공동으로 모으다 (=combine)",
    exampleEn: "Scientists pooled their data together.",
    exampleKo: "과학자들은 연구 데이터를 한곳에 공동으로 모았다.",
    desc: "기존뜻: 수영장 ➔ 9모뜻: (자금·정보를) 한데 모으다"
  },
  {
    en: "strike",
    ipa: "[stráik]",
    ko: "(생각이) 문득 떠오르다",
    baseKo: "치다, 파업",
    mockKo: "문득 떠오르다",
    exampleEn: "A great idea struck me suddenly.",
    exampleKo: "기막힌 아이디어가 문득 내 머릿속에 떠올랐다.",
    desc: "기존뜻: 치다 ➔ 9모뜻: (생각이) 문득 뇌리를 스치다"
  },
  {
    en: "treat",
    ipa: "[tríːt]",
    ko: "특별한 선물, 큰 기쁨, 대접",
    baseKo: "치료하다, 대우하다",
    mockKo: "뜻밖의 선물, 큰 기쁨",
    exampleEn: "The ice cream was a real treat.",
    exampleKo: "그 아이스크림은 정말 뜻밖의 큰 기쁨이자 선물이었다.",
    desc: "기존뜻: 치료하다 ➔ 9모뜻: 뜻밖의 큰 기쁨, 특별한 대접"
  },
  {
    en: "weather",
    ipa: "[wéðər]",
    ko: "(위기·풍파를) 헤쳐 나가다, 견디다",
    baseKo: "날씨",
    mockKo: "헤쳐 나가다, 견디다",
    exampleEn: "The company weathered the financial crisis.",
    exampleKo: "그 회사는 금융 위기를 무사히 헤쳐 나갔다.",
    desc: "기존뜻: 날씨 ➔ 9모뜻: (위기를) 무사히 헤쳐 나가다"
  },
  {
    en: "room",
    ipa: "[rúːm]",
    ko: "여지, 기회, 공간",
    baseKo: "방",
    mockKo: "여지, 기회, 공간",
    exampleEn: "There is no room for doubt.",
    exampleKo: "의심의 여지가 전혀 없다.",
    desc: "기존뜻: 방 ➔ 9모뜻: 여지, 기회 (no room for doubt)"
  },
  {
    en: "balance",
    ipa: "[bǽləns]",
    ko: "잔고, 잔액",
    baseKo: "균형",
    mockKo: "잔고, 잔액",
    exampleEn: "Check your bank account balance.",
    exampleKo: "당신의 은행 계좌 잔액을 확인하라.",
    desc: "기존뜻: 균형 ➔ 9모뜻: 통장 잔고, 미납 잔액"
  },
  {
    en: "lot",
    ipa: "[lɑ́t]",
    ko: "운명, 몫; 부지, 구역",
    baseKo: "많은 것",
    mockKo: "운명, 몫 / 부지",
    exampleEn: "He accepted his lot in life calmly.",
    exampleKo: "그는 자신의 타고난 삶의 운명을 차분히 받아들였다.",
    desc: "기존뜻: 많은 것 ➔ 9모뜻: 타고난 운명, 몫 / 부지"
  },
  {
    en: "post",
    ipa: "[póust]",
    ko: "중요한 직책, 자리, 배치",
    baseKo: "우편, 게시글",
    mockKo: "중요한 직책, 자리",
    exampleEn: "She was appointed to a high post.",
    exampleKo: "그녀는 고위 요직에 임명되었다.",
    desc: "기존뜻: 우편 ➔ 9모뜻: 중요한 직책, 요직"
  },
  {
    en: "state",
    ipa: "[stéit]",
    ko: "진술하다, 분명히 밝히다",
    baseKo: "국가, 상태",
    mockKo: "진술하다, 분명히 밝히다",
    exampleEn: "Please state your opinion clearly.",
    exampleKo: "당신의 의견을 분명하게 진술해주십시오.",
    desc: "기존뜻: 국가, 상태 ➔ 9모뜻: 공식 진술하다, 말하다"
  },
  {
    en: "weigh",
    ipa: "[wéi]",
    ko: "심사숙고하다, 신중히 저울질하다",
    baseKo: "무게를 재다",
    mockKo: "심사숙고하다, 저울질하다",
    exampleEn: "Weigh the pros and cons carefully.",
    exampleKo: "장단점을 신중하게 저울질하며 심사숙고하라.",
    desc: "기존뜻: 무게를 재다 ➔ 9모뜻: 심사숙고하다, 저울질하다"
  },
  {
    en: "stem",
    ipa: "[stém]",
    ko: "막다, 저지하다; 기인하다 (from)",
    baseKo: "줄기",
    mockKo: "막다 / 기인하다 (from)",
    exampleEn: "Tears stem from deep sadness.",
    exampleKo: "눈물은 깊은 슬픔에서 기인한다.",
    desc: "기존뜻: 줄기 ➔ 9모뜻: 막다, 저지하다 / 기인하다(stem from)"
  }
];

const MOCK_EXAM_VOCAB_SETS = [
  {
    id: "mock2026_g1_sep_9mo",
    book: "2026 고1 9모 대비",
    title: "[9모 대비] 1등급 킬러 반전 다의어 60선 (Part 1 + Part 2)",
    isMockSpecial: true,
    studentIds: [1, 2, 3, 4, 5, 6],
    words: [...MOCK_PART1_WORDS, ...MOCK_PART2_WORDS]
  }
];
