/**
 * science_questions.js
 * 유지현T 지구과학 정리본 기반 지질 시대 & 표준 화석 빈칸 단답형 50문항 문제 은행
 * (선캄브리아 / 고생대 / 중생대 / 신생대 전 시대 골고루 혼합 배치, 10문항 x 5회차)
 */

const SCIENCE_EARTH_50_QUESTIONS = [
  // ========================================================
  // [제 1회차 / 세트 A] 전 시대 균형 혼합 (10문항)
  // ========================================================
  {
    id: 'sci_q1',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '선캄브리아 시대 초기에 출현한 광합성을 하는 원핵생물인 남세균(시아노박테리아)의 활동으로 형성된 줄무늬 모양의 대표적인 표준 화석은 (       )이다.',
    correctAnswer: '스트로마톨라이트',
    acceptableAnswers: ['스트로마톨라이트', 'stromatolite'],
    explanation: '선캄브리아 시대 초기 남세균에 의해 형성된 퇴적 구조 표준 화석은 스트로마톨라이트입니다.'
  },
  {
    id: 'sci_q2',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 용어를 입력하세요.',
    passage: '고생대 초기에 대기 중에 (       )층이 형성되어 유해한 자외선이 차단되면서 비로소 생물의 육상 진출이 시작되었다.',
    correctAnswer: '오존층',
    acceptableAnswers: ['오존층', '오존'],
    explanation: '고생대 초기에 오존층이 형성되어 강력한 자외선을 차단함으로써 바다에만 머물던 생물이 육상으로 진출하기 시작했습니다.'
  },
  {
    id: 'sci_q3',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 초대륙 명칭을 입력하세요.',
    passage: '중생대 초기 및 중기(약 2억 년 전)에는 고생대 말기에 형성되었던 초대륙인 (       )가 분리되기 시작하면서 대서양과 인도양이 형성되었다.',
    correctAnswer: '판게아',
    acceptableAnswers: ['판게아', 'pangea', 'pangaea'],
    explanation: '고생대 말기에 형성된 판게아(초대륙)는 중생대 초·중기(약 2억 년 전)부터 분리되기 시작했습니다.'
  },
  {
    id: 'sci_q4',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '신생대 초·중기 따뜻한 얕은 바다에서 번성하였으며, 동전 모양의 껍데기를 가진 대형 유공충 표준 화석은 (       )이다.',
    correctAnswer: '화폐석',
    acceptableAnswers: ['화폐석', 'nummulite', '누물리테스'],
    explanation: '신생대 초·중기 따뜻한 해양에서 대량 번성한 대형 유공충 표준 화석은 화폐석입니다.'
  },
  {
    id: 'sci_q5',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '고생대 초기에 얕은 바다가 넓게 발달하여 해양 무척추동물이 번성하였는데, 머리·가슴·꼬리의 3부분으로 나뉘는 대표적인 해양 표준 화석은 (       )이다.',
    correctAnswer: '삼엽충',
    acceptableAnswers: ['삼엽충', 'trilobite'],
    explanation: '고생대 초기 바다에서 번성한 대표적인 무척추동물 표준 화석은 삼엽충입니다.'
  },
  {
    id: 'sci_q6',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 산맥 명칭을 입력하세요.',
    passage: '고생대 말기 초대륙 판게아가 형성되는 과정에서 대륙들이 충돌하여 북아메리카 동부의 (       ) 산맥과 유럽의 칼레도니아 산맥이 형성되었다.',
    correctAnswer: '애팔래치아',
    acceptableAnswers: ['애팔래치아', '애팔래치아 산맥', 'appalachian'],
    explanation: '고생대 말기 판게아 형성 충돌로 애팔래치아 산맥과 칼레도니아 산맥이 형성되었습니다.'
  },
  {
    id: 'sci_q7',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 생물 명칭을 입력하세요.',
    passage: '중생대 바다에서 번성하였으며 앵무조개와 유사한 나선형 껍데기를 가진 대표적인 두족류 해양 표준 화석으로, 중생대 말기에 공룡과 함께 멸종한 생물은 (       )이다.',
    correctAnswer: '암모나이트',
    acceptableAnswers: ['암모나이트', 'ammonite'],
    explanation: '중생대 전반에 걸쳐 번성하다가 중생대 말기 환경 급변으로 멸종한 대표 해양 표준 화석은 암모나이트입니다.'
  },
  {
    id: 'sci_q8',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 숫자를 순서대로 쉼표로 입력하거나 회수를 입력하세요.',
    passage: '신생대 말기 기후는 빙하기가 (   )회, 온난한 간빙기가 (   )회 반복되면서 오늘날과 유사한 기후와 생태계로 변화하였다. (빙하기와 간빙기 횟수를 각각 입력)',
    correctAnswer: '4, 3',
    acceptableAnswers: ['4, 3', '4회, 3회', '4회 3회', '4,3', '4/3'],
    explanation: '신생대 말기에는 빙하기 4회와 간빙기 3회가 교대로 반복되었습니다.'
  },
  {
    id: 'sci_q9',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 척추동물 명칭을 입력하세요.',
    passage: '고생대 중기에 온난한 기후 속에서 척추동물인 어류가 크게 번성하였는데, 머리와 몸 앞부분이 단단한 골판 갑옷으로 덮여 있는 대표적인 어류 화석은 (       )이다.',
    correctAnswer: '갑주어',
    acceptableAnswers: ['갑주어', 'ostracoderm'],
    explanation: '고생대 중기(데본기 등)에 번성한 원시 어류 표준 화석은 갑주어입니다.'
  },
  {
    id: 'sci_q10',
    round: 1,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 식물 분류군을 입력하세요.',
    passage: '중생대 초기 및 중기에는 온난한 기후 속에서 밑씨가 씨방에 싸여 있지 않고 밖으로 노출된 소나무, 은행나무 등의 (       )식물이 크게 번성하였다.',
    correctAnswer: '겉씨식물',
    acceptableAnswers: ['겉씨식물', '겉씨 식물', '나자식물'],
    explanation: '중생대는 은행나무, 소나무 등 겉씨식물이 육상 식물계를 지배하던 시대였습니다.'
  },

  // ========================================================
  // [제 2회차 / 세트 B] 전 시대 균형 혼합 (10문항)
  // ========================================================
  {
    id: 'sci_q11',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 시기를 입력하세요.',
    passage: '지구상에 최초의 원시 생명체(단세포 생물)가 출현한 시기는 약 (       )억 년 전으로 추정된다.',
    correctAnswer: '38',
    acceptableAnswers: ['38', '38억', '38억 년', '약 38', '약 38억'],
    explanation: '최초의 생명체는 선캄브리아 시대 초기인 약 38억 년 전 바다에서 출현한 것으로 알려져 있습니다.'
  },
  {
    id: 'sci_q12',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 지질 시대 명칭을 입력하세요.',
    passage: '고생대 중기에는 바다에서 어류(갑주어)가 번성하였고, 육상에서는 최초의 관다발 식물인 양치식물이 출현하였으며 날개를 가진 (       ) 곤충이 번성하였다.',
    correctAnswer: '대형',
    acceptableAnswers: ['대형', '거대', '대형곤충'],
    explanation: '고생대 중기~후기에는 풍부한 산소 농도로 인해 잠자리 등 대형 곤충이 크게 번성하였습니다.'
  },
  {
    id: 'sci_q13',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '중생대 말기에 출현하였으며, 파충류의 특징(이빨, 꼬리뼈)과 조류의 특징(깃털, 날개)을 모두 가지고 있어 진화의 결정적 증거가 되는 표준 화석은 (       )이다.',
    correctAnswer: '시조새',
    acceptableAnswers: ['시조새', 'archaeopteryx', '아르케옵테릭스'],
    explanation: '시조새는 파충류에서 조류로 진화하는 중간 형태를 보여주는 중생대 말기의 대표적 표준 화석입니다.'
  },
  {
    id: 'sci_q14',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물 명칭을 입력하세요.',
    passage: '신생대 전반에 걸쳐 번성하였으며, 두꺼운 털과 긴 엄니를 가지고 추운 빙하기 환경에 적응했던 대표적인 포유류 표준 화석은 (       )이다.',
    correctAnswer: '매머드',
    acceptableAnswers: ['매머드', '맘모스', 'mammoth'],
    explanation: '신생대를 대표하는 포유류 표준 화석은 매머드입니다.'
  },
  {
    id: 'sci_q15',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물군 화석 명칭을 입력하세요.',
    passage: '선캄브리아 시대 말기에 최초로 단단한 껍질이 없는 다세포 생물들이 출현하였는데, 오스트레일리아 남부에서 대량 발견된 이 다세포 생물 화석군은 (       ) 동물군 화석이다.',
    correctAnswer: '에디아카라',
    acceptableAnswers: ['에디아카라', '에디아카라 동물군', 'ediacara'],
    explanation: '선캄브리아 시대 말기 최초의 다세포 동물 화석군은 에디아카라 동물군입니다.'
  },
  {
    id: 'sci_q16',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물 분류군을 입력하세요.',
    passage: '고생대 말기에는 물과 육지를 오가며 생활하는 (       )류가 크게 번성하였고, 건조한 육상 환경에 적응한 파충류가 최초로 출현하였다.',
    correctAnswer: '양서류',
    acceptableAnswers: ['양서류', 'amphibian'],
    explanation: '고생대 말기(석탄기 등)는 양서류의 전성기였으며, 말기에 파충류가 새롭게 출현하였습니다.'
  },
  {
    id: 'sci_q17',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 해양(바다) 명칭을 입력하세요.',
    passage: '중생대 초기 및 중기에 판게아가 분리되면서 아메리카 대륙과 유라시아·아프리카 대륙 사이에 (       )양과 인도양이 새롭게 형성되기 시작하였다.',
    correctAnswer: '대서양',
    acceptableAnswers: ['대서양', 'atlantic'],
    explanation: '판게아가 남북과 동서로 갈라지면서 대서양과 인도양이 새로 형성되었습니다.'
  },
  {
    id: 'sci_q18',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 기후 특징을 입력하세요.',
    passage: '중생대 초기 및 중기에는 전 지구적으로 빙하기가 (       )으며, 활발한 화산 활동으로 온실 기체 농도가 증가하여 온난한 기후가 지속되었다. (있었음 / 없었음 중 선택)',
    correctAnswer: '없었음',
    acceptableAnswers: ['없었음', '없음', '빙하기 없음', '빙하기가 없었음', '전혀 없었음'],
    explanation: '중생대는 전 기간에 걸쳐 빙하기가 존재하지 않았던 매우 온난한 지질 시대입니다.'
  },
  {
    id: 'sci_q19',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '고생대 중기에 번성하였으며, 가느다란 톱니 모양의 나뭇가지 형태로 흑색 셰일 등에서 흔히 발견되는 부유성 해양 표준 화석은 (       )이다.',
    correctAnswer: '필석',
    acceptableAnswers: ['필석', 'graptolite'],
    explanation: '고생대 중기 바다를 부유하던 대표적인 표준 화석은 필석(Graptolite)입니다.'
  },
  {
    id: 'sci_q20',
    round: 2,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 퇴적물/암석 명칭을 입력하세요.',
    passage: '고생대 말기에 거대한 숲을 이루었던 거대 양치식물 군락이 지중에 묻혀 오랜 열과 압력을 받아 오늘날의 두꺼운 (       )층을 형성하였다.',
    correctAnswer: '석탄',
    acceptableAnswers: ['석탄', '석탄층', 'coal'],
    explanation: '고생대 석탄기 말기 거대 양치식물들이 매몰되어 대규모 석탄층을 형성하였습니다.'
  },

  // ========================================================
  // [제 3회차 / 세트 C] 전 시대 균형 혼합 (10문항)
  // ========================================================
  {
    id: 'sci_q21',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '고생대 말기 얕은 바다에서 번성한 방추형(베틀의 북 모양) 유공충 화석으로, 고생대 말 대멸종 때 절멸한 대표 표준 화석은 (       )(푸줄리나)이다.',
    correctAnswer: '방추충',
    acceptableAnswers: ['방추충', '푸줄리나', 'fusulina', '방추충(푸줄리나)'],
    explanation: '고생대 말기 온난한 얕은 바다의 대표 표준 화석은 방추충(푸줄리나)입니다.'
  },
  {
    id: 'sci_q22',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 산맥 명칭을 입력하세요.',
    passage: '중생대 초기 및 중기 판게아 분리와 대륙 이동 과정에서 판의 섭입으로 인해 북아메리카 서부의 (       ) 산맥과 남아메리카 서부의 안데스 산맥이 형성되기 시작하였다.',
    correctAnswer: '로키',
    acceptableAnswers: ['로키', '로키 산맥', 'rocky', '록키'],
    explanation: '중생대 판게아 분리 때 로키 산맥과 안데스 산맥 형성이 시작되었습니다.'
  },
  {
    id: 'sci_q23',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 식물 분류군을 입력하세요.',
    passage: '중생대 말기에 처음 출현하여 꽃을 피우고 씨방 속에 밑씨를 품어 보호하는 (       )식물은 신생대에 이르러 초원과 산림을 이루며 대번성하였다.',
    correctAnswer: '속씨식물',
    acceptableAnswers: ['속씨식물', '속씨 식물', '피자식물'],
    explanation: '속씨식물은 중생대 말기에 출현하여 신생대에 대번성하였습니다.'
  },
  {
    id: 'sci_q24',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 산맥 명칭을 입력하세요.',
    passage: '신생대 초·중기에는 인도 대륙이 아시아 대륙과 충돌하면서 거대한 (       ) 산맥이 융기하였고, 아프리카와 유럽의 충돌로 알프스 산맥이 형성되었다.',
    correctAnswer: '히말라야',
    acceptableAnswers: ['히말라야', '히말라야 산맥', 'himalaya'],
    explanation: '인도-유라시아 대륙 충돌로 신생대에 히말라야 산맥과 알프스 산맥이 형성되었습니다.'
  },
  {
    id: 'sci_q25',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 사건을 입력하세요.',
    passage: '고생대 말기에는 판게아 형성으로 인한 대륙붕 면적 축소와 극심한 기후 변화 및 화산 분출로 인해 지구 역사상 가장 큰 규모의 (       )이 발생하였다.',
    correctAnswer: '대멸종',
    acceptableAnswers: ['대멸종', '생물 대멸종', '생물대멸종', '멸종'],
    explanation: '고생대 말기(페름기 말)에는 해양 생물종의 약 90% 이상이 절멸하는 지구 역사상 최대의 대멸종이 발생했습니다.'
  },
  {
    id: 'sci_q26',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 세균(원핵생물) 명칭을 입력하세요.',
    passage: '선캄브리아 시대 바다에서 광합성을 통해 원시 지구 대기에 산소를 최초로 공급하기 시작한 원핵생물은 (       )(시아노박테리아)이다.',
    correctAnswer: '남세균',
    acceptableAnswers: ['남세균', '시아노박테리아', 'cyanobacteria'],
    explanation: '남세균(시아노박테리아)은 광합성을 통해 대기 중으로 산소를 방출하여 오존층 형성의 기틀을 마련했습니다.'
  },
  {
    id: 'sci_q27',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 표준 화석 명칭을 입력하세요.',
    passage: '고생대 초기에 얕은 바다에 서식하였으며 조개와 겉모습이 유사하지만 좌우 대칭인 껍데기를 가진 해양 무척추동물 표준 화석은 (       )류이다.',
    correctAnswer: '완족',
    acceptableAnswers: ['완족', '완족류', 'brachiopod'],
    explanation: '삼엽충과 함께 고생대 초기에 번성한 대표적인 해양 완족동물 화석은 완족류입니다.'
  },
  {
    id: 'sci_q28',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 생물 명칭을 입력하세요.',
    passage: '신생대 말기에는 오늘날과 비슷한 수륙 분포가 완성되었으며, 포유류의 번성과 함께 직립 보행을 하는 (       )의 조상이 출현하였다.',
    correctAnswer: '인류',
    acceptableAnswers: ['인류', '인간', '사람'],
    explanation: '신생대 말기(제4기)에는 인류의 조상이 출현하여 오늘날의 문명으로 발전하였습니다.'
  },
  {
    id: 'sci_q29',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 온실 기체를 입력하세요.',
    passage: '중생대 초기 및 중기에는 활발한 화산 활동으로 인해 대기 중 (       ) 기체 농도가 급증하여 빙하기 없이 전반적으로 온난한 기후가 유지되었다.',
    correctAnswer: '온실',
    acceptableAnswers: ['온실', '이산화탄소', '온실기체', '온실 가스'],
    explanation: '대규모 화산 분출로 이산화탄소 등 온실 기체가 방출되어 중생대 온난 기후를 견인했습니다.'
  },
  {
    id: 'sci_q30',
    round: 3,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 식물 분류군을 입력하세요.',
    passage: '고생대 중기에 육상으로 최초 진출한 관다발 식물로, 꽃과 씨앗 대신 포자로 번식하는 고사리 등의 식물 무리를 (       )식물이라 한다.',
    correctAnswer: '양치식물',
    acceptableAnswers: ['양치식물', '양치 식물', '양치류'],
    explanation: '고생대 중기에 육상으로 진출하여 거대 군락을 이룬 식물은 양치식물입니다.'
  },

  // ========================================================
  // [제 4회차 / 세트 D] 전 시대 균형 혼합 (10문항)
  // ========================================================
  {
    id: 'sci_q31',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 퇴적물(암석) 명칭을 입력하세요.',
    passage: '선캄브리아 시대 중기 및 말기에 빙하기가 존재했음을 입증해 주는 가장 결정적인 지질학적 퇴적 증거는 (       )의 분포이다.',
    correctAnswer: '빙퇴석',
    acceptableAnswers: ['빙퇴석', 'tillite', '빙하 퇴적물'],
    explanation: '빙하가 녹으면서 퇴적된 자갈과 암석 덩어리인 빙퇴석(Tillite)의 분포는 선캄브리아 시대 빙하기의 증거입니다.'
  },
  {
    id: 'sci_q32',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 산맥 명칭을 입력하세요.',
    passage: '고생대 말기 초대륙 판게아 충돌 당시 유럽 북서부에 형성되었으며 애팔래치아 산맥과 이어지는 산맥은 (       ) 산맥이다.',
    correctAnswer: '칼레도니아',
    acceptableAnswers: ['칼레도니아', '칼레도니아 산맥', 'caledonian'],
    explanation: '판게아 형성으로 북아메리카의 애팔래치아 산맥과 유럽의 칼레도니아 산맥이 형성되었습니다.'
  },
  {
    id: 'sci_q33',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물 명칭을 입력하세요.',
    passage: '중생대 말기에는 최초의 원시 (       )류와 하늘을 나는 익룡, 시조새가 출현하였으나, 말기 대멸종으로 공룡은 지구상에서 자취를 감추었다.',
    correctAnswer: '포유',
    acceptableAnswers: ['포유', '포유류', '원시 포유류', '원시포유류'],
    explanation: '중생대 말기에는 공룡의 그늘 아래서 원시 포유류가 최초로 출현하였습니다.'
  },
  {
    id: 'sci_q34',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 식생/지형 명칭을 입력하세요.',
    passage: '신생대 말기에는 기후가 한랭건조해지면서 삼림 면적이 줄어들고 벼과 식물로 이루어진 광활한 (       )이 형성되어 초식 포유류가 크게 번성하였다.',
    correctAnswer: '초원',
    acceptableAnswers: ['초원', '초원 형성', '초원지대', '초지'],
    explanation: '신생대 말기 기후 변화로 초원이 대규모로 형성되면서 말, 소 등의 초식 포유류가 번성했습니다.'
  },
  {
    id: 'sci_q35',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물 명칭을 입력하세요.',
    passage: '중생대 육상 생태계를 지배하였으며, 백악기 말 소행성 충돌과 환경 급변으로 인해 암모나이트와 함께 완전히 멸종한 파충류 무리는 (       )이다.',
    correctAnswer: '공룡',
    acceptableAnswers: ['공룡', 'dinosaur'],
    explanation: '중생대의 대표적인 파충류이자 표준 화석인 공룡은 중생대 말기에 대멸종을 겪었습니다.'
  },
  {
    id: 'sci_q36',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 대륙붕 상태를 입력하세요.',
    passage: '고생대 말기 모든 대륙이 하나로 뭉쳐 초대륙을 형성함에 따라 해안선 길이가 감소하고 얕은 바다인 (       )의 면적이 크게 축소되었다.',
    correctAnswer: '대륙붕',
    acceptableAnswers: ['대륙붕', 'continental shelf'],
    explanation: '대륙이 합쳐지면 해안선이 줄어들고 얕은 바다인 대륙붕 면적이 줄어들어 해양 생물 서식지가 급감합니다.'
  },
  {
    id: 'sci_q37',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 바다 환경을 입력하세요.',
    passage: '고생대 초기에는 육지에 생물이 없었으나 (       ) 바다가 넓게 발달하여 삼엽충, 완족류 등 해양 생물이 서식하기에 매우 유리하였다.',
    correctAnswer: '얕은',
    acceptableAnswers: ['얕은', '얕은 바다', '천해'],
    explanation: '고생대 초기에는 햇빛이 풍부하게 도달하는 얕은 바다가 발달하여 다양한 해양 무척추동물이 번성했습니다.'
  },
  {
    id: 'sci_q38',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 지질 시대를 입력하세요.',
    passage: '지각 변동을 너무 많이 받아 암석이 변성되고 생물체에 단단한 골격이 없어 화석이 거의 발견되지 않는 지질 시대는 (       ) 시대이다.',
    correctAnswer: '선캄브리아',
    acceptableAnswers: ['선캄브리아', '선캄브리아 시대', '선캄브리아대', 'precambrian'],
    explanation: '선캄브리아 시대는 오랜 지각 변동과 단단한 껍질의 부재로 인해 화석 산출이 매우 드뭅니다.'
  },
  {
    id: 'sci_q39',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 해양(바다) 명칭을 입력하세요.',
    passage: '신생대 초·중기에는 대륙 이동이 지속되면서 (       )양과 인도양이 더욱 넓어졌고, 오늘날과 유사한 5대양 6대주 형태로 재편되었다.',
    correctAnswer: '대서양',
    acceptableAnswers: ['대서양', '인도양', '대서양과 인도양'],
    explanation: '신생대에 아메리카 대륙이 서쪽으로 이동하며 대서양이 지속적으로 확장되었습니다.'
  },
  {
    id: 'sci_q40',
    round: 4,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 동물군 분류를 입력하세요.',
    passage: '고생대 말기에 번성한 (       )충은 유공충의 일종으로, 형태가 방추형(실감개 모양)을 닮아 붙여진 이름이다.',
    correctAnswer: '방추',
    acceptableAnswers: ['방추', '방추충', '푸줄리나'],
    explanation: '방추충은 고생대 말기의 대표적인 유공충 표준 화석입니다.'
  },

  // ========================================================
  // [제 5회차 / 세트 E] 전 시대 균형 혼합 (10문항)
  // ========================================================
  {
    id: 'sci_q41',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 생물 출현 시기를 입력하세요.',
    passage: '선캄브리아 시대 말기에는 해조류와 균류가 출현하였으며, 말기에는 최초의 (       ) 생물이 출현하여 에디아카라 동물군 화석을 남겼다.',
    correctAnswer: '다세포',
    acceptableAnswers: ['다세포', '다세포 생물', '다세포생물'],
    explanation: '선캄브리아 시대 초기에는 단세포 생물만 있었으나, 말기에 이르러 최초의 다세포 생물이 출현했습니다.'
  },
  {
    id: 'sci_q42',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 지질 시대를 입력하세요.',
    passage: '삼엽충과 갑주어, 방추충이 표준 화석으로 대표되는 지질 시대는 (       )대이다.',
    correctAnswer: '고생',
    acceptableAnswers: ['고생', '고생대', 'paleozoic'],
    explanation: '삼엽충(초기), 갑주어(중기), 방추충(말기)은 모두 고생대의 대표 표준 화석입니다.'
  },
  {
    id: 'sci_q43',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 지질 시대를 입력하세요.',
    passage: '공룡과 암모나이트, 시조새가 표준 화석으로 대표되는 지질 시대는 (       )대이다.',
    correctAnswer: '중생',
    acceptableAnswers: ['중생', '중생대', 'mesozoic'],
    explanation: '공룡, 암모나이트, 시조새는 중생대의 대표 표준 화석입니다.'
  },
  {
    id: 'sci_q44',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 지질 시대를 입력하세요.',
    passage: '화폐석과 매머드가 표준 화석으로 대표되는 지질 시대는 (       )대이다.',
    correctAnswer: '신생',
    acceptableAnswers: ['신생', '신생대', 'cenozoic'],
    explanation: '화폐석(초·중기)과 매머드(말기)는 신생대의 대표 표준 화석입니다.'
  },
  {
    id: 'sci_q45',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 시기를 입력하세요.',
    passage: '초대륙 판게아의 분리가 처음 시작된 지질 시대는 (       )대 초기이다.',
    correctAnswer: '중생',
    acceptableAnswers: ['중생', '중생대', 'mesozoic'],
    explanation: '판게아는 고생대 말기에 형성되어 중생대 초기(약 2억 년 전)에 분리되기 시작했습니다.'
  },
  {
    id: 'sci_q46',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 자외선 차단 요소를 입력하세요.',
    passage: '선캄브리아 시대에는 대기 중에 오존층이 없어 강한 (       )선이 지표면에 도달하였기 때문에 모든 생명체가 바다에만 머물고 육상 생물은 전혀 존재할 수 없었다.',
    correctAnswer: '자외',
    acceptableAnswers: ['자외', '자외선', 'uv'],
    explanation: '오존층이 없던 선캄브리아 시대에는 강력한 자외선으로 인해 육상에는 생물이 살 수 없었습니다.'
  },
  {
    id: 'sci_q47',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 생태계 명칭을 입력하세요.',
    passage: '신생대 말기에는 어류, 연체동물, 산호 등 다양한 해양 생물이 번성하여 오늘날 우리가 보는 (       )적인 해양 생태계가 최종 구축되었다.',
    correctAnswer: '현대',
    acceptableAnswers: ['현대', '현대적', '현대적인'],
    explanation: '신생대 말기에 이르러 현대적인 해양 생태계와 육상 생태계가 정립되었습니다.'
  },
  {
    id: 'sci_q48',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 식물 명칭을 입력하세요.',
    passage: '중생대에 번성했던 겉씨식물의 대표적인 예로는 은행나무와 (       )나무 등이 있다.',
    correctAnswer: '소나무',
    acceptableAnswers: ['소나무', '소나무 등', '소나무류', '송백류'],
    explanation: '중생대의 대표적 겉씨식물로는 은행나무, 소나무, 소철 등이 있습니다.'
  },
  {
    id: 'sci_q49',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 척추동물 분류를 입력하세요.',
    passage: '고생대 중기에 번성했던 갑주어는 동물 분류상 척추동물인 (       )류에 속한다.',
    correctAnswer: '어',
    acceptableAnswers: ['어', '어류', '물고기'],
    explanation: '갑주어는 척추동물 어류에 속하는 원시 물고기 화석입니다.'
  },
  {
    id: 'sci_q50',
    round: 5,
    type: 'SHORT',
    prompt: '다음 빈칸에 들어갈 알맞은 산맥 명칭을 입력하세요.',
    passage: '신생대 초·중기에 아프리카 판과 유라시아 판의 충돌로 유럽 남부에 형성된 거대한 습곡 산맥은 (       ) 산맥이다.',
    correctAnswer: '알프스',
    acceptableAnswers: ['알프스', '알프스 산맥', 'alps'],
    explanation: '신생대 초·중기에 대륙 충돌로 히말라야 산맥과 알프스 산맥이 형성되었습니다.'
  }
];

// 전역 헬퍼 함수
function getScienceSpecialQuestionsByRound(round = 1) {
  const r = Math.max(1, Math.min(5, Number(round) || 1));
  return SCIENCE_EARTH_50_QUESTIONS
    .filter(q => q.round === r)
    .map(q => ({
      ...q,
      question: q.prompt || q.question || '다음 빈칸에 들어갈 알맞은 단어를 입력하세요.',
      answer: q.correctAnswer || q.answer,
      choices: q.choices || []
    }));
}

// 윈도우 객체 노출
if (typeof window !== 'undefined') {
  window.SCIENCE_EARTH_50_QUESTIONS = SCIENCE_EARTH_50_QUESTIONS;
  window.getScienceSpecialQuestionsByRound = getScienceSpecialQuestionsByRound;
}
