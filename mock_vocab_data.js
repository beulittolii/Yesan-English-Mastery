/**
 * 2026학년도 고1 6모 / 9모 대비 특별 단어 세트
 * "아는 단어인데 전혀 몰랐던 뜻" — 수능·모평 1등급 빈출 반전 다의어 & 킬러 어휘 60선
 * 모든 단어에 100% 교재 표준 인쇄본 발음기호(ipa) 및 실전 독해 쓰임새·해설(desc) 탑재
 */

const MOCK_PART1_WORDS = [
  {
    en: "count",
    ipa: "[káunt]",
    ko: "(동) 중요하다, 가치가 있다 (≠ 세다)",
    desc: "💡 [실전 쓰임새] 'Every second counts.(매 1초가 중요하다)', 'count for much/nothing(매우 중요하다/무가치하다)'. 수능 대의파악 지문에서 동사로 쓰이면 '세다'가 아니라 십중팔구 '중요하다(=matter)'!"
  },
  {
    en: "matter",
    ipa: "[mǽtər]",
    ko: "(동) 중요하다, 문제가 되다 (≠ 물질)",
    desc: "💡 [실전 쓰임새] 'It matters little what he says.(그가 뭐라 하든 중요치 않다)', 'What really matters is...(진짜 중요한 것은~)'. 명사 '물질'이 아닌 자동사 '중요하다(=be significant)'."
  },
  {
    en: "appreciate",
    ipa: "[əpríːʃièit]",
    ko: "(동) 진가를 인정하다, 제대로 이해하다, (가치가) 오르다 (≠ 감사하다)",
    desc: "💡 [실전 쓰임새] 예술 지문에서 '진가를 인정하다/감상하다', 경제 지문에서 '가치가 오르다(반의어: depreciate)', 철학·심리 지문에서 '상황의 본질을 제대로 이해하다/인식하다'."
  },
  {
    en: "observe",
    ipa: "[əbzə́ːrv]",
    ko: "(동) (법·규칙을) 준수하다, (의견을) 말하다 (≠ 관찰하다)",
    desc: "💡 [실전 쓰임새] 법·사회 지문에서 'observe the law/rules(법이나 규범을 준수하다)'. '관찰하다'로만 외우면 빈칸 추론이나 문맥 파악에서 정반대로 오독하기 쉬움!"
  },
  {
    en: "address",
    ipa: "[ədrés]",
    ko: "(동) (문제·상황을) 다루다, 해결하다; 연설하다 (≠ 주소)",
    desc: "💡 [실전 쓰임새] 모의고사 빈출 1순위! 'address the problem/issue(문제를 다루다, 해결책을 모색하다)'. 집 주소가 아니라 수능 1등급 필수어 '다루다/해결하다(=tackle, handle)'."
  },
  {
    en: "compromise",
    ipa: "[kámprəmàiz]",
    ko: "(동) (원칙·평판·안전을) 훼손하다, 위태롭게 하다 (≠ 타협하다)",
    desc: "💡 [실전 쓰임새] 과학·안전 지문에서 'compromise safety/immune system(안전이나 면역체계를 훼손하다/약화시키다)'. '타협하다'로만 알면 문맥이 완전히 망가짐!"
  },
  {
    en: "spell",
    ipa: "[spél]",
    ko: "(동) (나쁜 결과를) 초래하다, 가져오다; (명) 한동안의 기간 (≠ 철자를 쓰다)",
    desc: "💡 [실전 쓰임새] 환경·경제 지문에서 'spell disaster/trouble(재앙/골칫거리를 초래하다)'. 철자를 쓰다 외에 부정적인 결과를 '불러오다(=bring about, lead to)'."
  },
  {
    en: "accommodate",
    ipa: "[əkámədèit]",
    ko: "(동) (요구·조건을) 수용하다, 맞추다, 부응하다 (≠ 숙박시키다)",
    desc: "💡 [실전 쓰임새] 사회·심리 지문에서 'accommodate different needs/changes(다양한 요구를 수용하다/변화에 맞추다)'. 호텔 숙박이 아니라 '요구에 맞춰주다'."
  },
  {
    en: "tell",
    ipa: "[tél]",
    ko: "(동) 구별하다, 분간하다, 알아채다 (≠ 말하다)",
    desc: "💡 [실전 쓰임새] 'tell A from B (A와 B를 구별하다)', 'It is hard to tell the difference.(차이를 분간하기 어렵다)'. can/could와 함께 쓰여 '식별하다/구별하다(=distinguish)'."
  },
  {
    en: "check",
    ipa: "[tʃék]",
    ko: "(동) 억제하다, 저지하다, 방지하다 (≠ 확인하다)",
    desc: "💡 [실전 쓰임새] 정치 지문에서 'checks and balances(견제와 균형)', 의학 지문에서 'check the growth of tumor(종양의 성장을 억제하다)'. '확인'이 아닌 '저지/억제'."
  },
  {
    en: "entertain",
    ipa: "[èntərtéin]",
    ko: "(동) (생각·아이디어를) 품다, 고려하다 (≠ 즐겁게 하다)",
    desc: "💡 [실전 쓰임새] 인문·철학 지문에서 'entertain a thought/doubt/idea(생각/의심을 마음속에 품다, 진지하게 검토하다)'. 남을 웃겨주는 것이 아니라 '생각을 품다'."
  },
  {
    en: "sound",
    ipa: "[sáund]",
    ko: "(형) 건전한, 타당한, 믿을 만한; 깊은 (≠ 소리)",
    desc: "💡 [실전 쓰임새] 논리 지문에서 'sound argument/reasoning(타당하고 반박할 수 없는 논증)', 'sound sleep(깊고 평온한 잠)'. 소리가 아닌 형용사 '타당한/건전한(=valid, robust)'."
  },
  {
    en: "fast",
    ipa: "[fǽst]",
    ko: "(부/형) 단단히, 굳게, 고정된 (≠ 빠른)",
    desc: "💡 [실전 쓰임새] 'hold fast to one\'s principles(원칙을 굳게 고수하다)', 'fast asleep(깊이 잠든)', 'stand fast(물러서지 않고 버티다)'. 속도가 아니라 '단단히/고정된'."
  },
  {
    en: "bear",
    ipa: "[bɛ́ər]",
    ko: "(동) (고통·무게를) 견디다, (마음에) 품다, (결실을) 맺다 (≠ 곰)",
    desc: "💡 [실전 쓰임새] 'bear the burden/pain(짐이나 고통을 짊어지다/견디다)', 'bear in mind(마음에 새기다/명심하다)', 'bear fruit(결실을 맺다)'. 동사로 '견디다/품다'."
  },
  {
    en: "grave",
    ipa: "[gréiv]",
    ko: "(형) 심각한, 중대한, 근엄한 (≠ 무덤)",
    desc: "💡 [실전 쓰임새] 'grave consequence/concern(심각한 파장/중대한 우려)', 'a grave expression(심각한 표정)'. 명사 '무덤'이 아닌 형용사로 '심각한/중대한(=serious, critical)'."
  },
  {
    en: "yield",
    ipa: "[jíːld]",
    ko: "(동) (결과·수익을) 산출하다, 생산하다; 굴복하다 (≠ 양보하다)",
    desc: "💡 [실전 쓰임새] 경제·과학에서 'yield high profits/results(높은 수익/결과를 산출하다)', 심리에서 'yield to temptation/pressure(유혹/압박에 굴복하다)'. 빈출 1순위!"
  },
  {
    en: "plant",
    ipa: "[plǽnt]",
    ko: "(동) (의심·생각을) 심다, (첩자를) 위장 잠입시키다; (명) 공장 (≠ 식물)",
    desc: "💡 [실전 쓰임새] 'plant suspicion in the jury\'s mind(배심원의 마음에 의심을 심다)', 'manufacturing plant(제조 공장)'. 식물이 아닌 '생각을 심다' 또는 '공장'."
  },
  {
    en: "novel",
    ipa: "[nɑ́vəl]",
    ko: "(형) 새로운, 참신한, 기발한 (≠ 소설)",
    desc: "💡 [실전 쓰임새] 'a novel solution/approach(참신하고 혁신적인 해결책/접근법)'. 독해 지문에서 명사 앞 수식어로 쓰이면 100% '새로운/기발한(=innovative, original)'!"
  },
  {
    en: "draw",
    ipa: "[drɔ́ː]",
    ko: "(동) (결론·교훈을) 도출하다, 이끌어내다, 매혹하다 (≠ 그리다)",
    desc: "💡 [실전 쓰임새] 'draw a conclusion(결론을 도출하다)', 'draw lessons from failure(실패에서 교훈을 이끌어내다)', 'draw criticism(비판을 끌어모으다)'."
  },
  {
    en: "charge",
    ipa: "[tʃɑ́ːrdʒ]",
    ko: "(동) 책임을 맡기다, 기소하다, 고발하다; 돌진하다 (≠ 요금)",
    desc: "💡 [실전 쓰임새] 'in charge of(~를 책임지는)', 'be charged with a crime(범죄로 기소되다)'. 돈(요금)이 아니라 조직에서의 '책임'이나 법적 '기소'."
  },
  {
    en: "credit",
    ipa: "[krédit]",
    ko: "(동) (공로·성과를) ~의 탓으로 돌리다, 인정하다 (≠ 신용)",
    desc: "💡 [실전 쓰임새] 'credit A with B / credit B to A (B라는 업적을 A의 공로로 돌리다/인정하다)'. 카드 신용이 아니라 '공로를 인정하다/돌리다(=attribute to)'."
  },
  {
    en: "fine",
    ipa: "[fáin]",
    ko: "(형) 미세한, 정밀한, 촘촘한; (명) 벌금 (≠ 좋은)",
    desc: "💡 [실전 쓰임새] 환경 지문에서 'fine dust/particles(미세먼지/미세입자)', 기술 지문에서 'fine adjustments(정밀한 미세 조정)', 법률에서 'pay a fine(벌금을 물다)'."
  },
  {
    en: "subject",
    ipa: "[sʌ́bdʒikt]",
    ko: "(명) 피실험자; (형) ~의 영향을 받기 쉬운, 종속된 (≠ 과목)",
    desc: "💡 [실전 쓰임새] 실험 지문 1순위! 'the subjects in the study(연구의 실험 대상자/피실험자)', 'be subject to change(변화의 영향을 받기 쉽다/변하기 마련이다)'."
  },
  {
    en: "object",
    ipa: "[ɑ́bdʒikt]",
    ko: "(동) 반대하다, 이의를 제기하다 (≠ 물건, 대상)",
    desc: "💡 [실전 쓰임새] 'object to the new proposal(새로운 제안에 강력히 반대하다)'. 물건/대상이 아니라 전치사 to와 함께 쓰여 '반대하다(=oppose, disagree)'."
  },
  {
    en: "firm",
    ipa: "[fə́ːrm]",
    ko: "(형) 확고한, 단호한; (명) 회사 (≠ 회사만 있는 것이 아님)",
    desc: "💡 [실전 쓰임새] 'firm belief/determination(흔들림 없는 확고한 신념/결의)', 'firm ground(단단한 땅)'. 법률 회사(law firm)뿐 아니라 '확고한(=resolute)'."
  },
  {
    en: "scale",
    ipa: "[skéil]",
    ko: "(동) (가파른 산·벽을) 기어오르다; (명) 규모, 비늘 (≠ 저울)",
    desc: "💡 [실전 쓰임새] 'scale the steep cliff(가파른 절벽을 기어오르다)', 'on a global scale(지구적 규모로)'. 체중계 저울이 아닌 동사 '정복하다/오르다(=climb up)'."
  },
  {
    en: "current",
    ipa: "[kə́ːrənt]",
    ko: "(명) 흐름, 해류, 기류, 전류, 경향 (≠ 현재의)",
    desc: "💡 [실전 쓰임새] 'ocean current(해류)', 'cultural/political current(문화적/정치적 조류와 흐름)'. '현재의'라는 형용사 외에 명사로 도도한 '흐름/조류'."
  },
  {
    en: "figure",
    ipa: "[fígjər]",
    ko: "(동) 생각하다, 판단하다; (명) 중요 인물, 모습 (≠ 숫자)",
    desc: "💡 [실전 쓰임새] 'figure that S+V(판단하다/생각하다)', 'prominent figure in history(역사 속의 저명한 인물)'. 단순 숫자가 아닌 '인물' 또는 '판단하다'."
  },
  {
    en: "court",
    ipa: "[kɔ́ːrt]",
    ko: "(동) (재난·위험을) 자초하다; 환심을 사려고 하다 (≠ 법원, 경기장)",
    desc: "💡 [실전 쓰임새] 'court disaster/danger(재앙이나 위험을 스스로 자초하다)'. 법원이나 농구 코트가 아닌 동사로 위험을 '자초하다' 또는 대중의 환심을 사다."
  },
  {
    en: "game",
    ipa: "[géim]",
    ko: "(명) 사냥감; (형) 기꺼이 ~할 용기가 있는 (≠ 놀이, 게임)",
    desc: "💡 [실전 쓰임새] 'big game hunter(대형 야생 사냥감 사냥꾼)', 'Are you game for the challenge?(그 도전에 기꺼이 용기 내어 뛰어들래?)'. 사냥감 또는 기꺼이 응하는!"
  }
];

const MOCK_PART2_WORDS = [
  {
    en: "even",
    ipa: "[íːvən]",
    ko: "(형) 평평한, 균등한, 대등한, 침착한 (≠ 심지어)",
    desc: "💡 [실전 쓰임새] 'an even contest(승부를 가리기 힘든 대등한 시합)', 'even surface(평평한 지면)', 'an even temper(차분하고 흔들림 없는 성품)'. '심지어'가 아닌 형용사."
  },
  {
    en: "meet",
    ipa: "[míːt]",
    ko: "(동) (요구·조건·마감·필요를) 충족시키다, 부응하다 (≠ 만나다)",
    desc: "💡 [실전 쓰임새] 수능·모평 최다 빈출! 'meet the deadline(마감을 맞추다)', 'meet the requirements/criteria(요건/기준을 충족시키다)'. 사람이 만나는 게 아님!"
  },
  {
    en: "last",
    ipa: "[lǽst]",
    ko: "(동) 지속되다, 견디다, 효력을 유지하다 (≠ 마지막의)",
    desc: "💡 [실전 쓰임새] 'The effect lasts for hours.(그 효과는 수 시간 동안 지속된다)', 'shoes built to last(오래 견디도록 튼튼하게 만들어진 신발)'."
  },
  {
    en: "spring",
    ipa: "[spríŋ]",
    ko: "(동) (갑자기) 튀어 오르다, 샘솟다, 싹트다; (명) 샘 (≠ 봄)",
    desc: "💡 [실전 쓰임새] 'spring from curiosity(호기심에서 싹트다/비롯되다)', 'Tears sprang to her eyes.(눈물이 왈칵 솟구쳤다)'. 계절 봄이 아닌 동사 '솟구치다/생겨나다'."
  },
  {
    en: "custom",
    ipa: "[kʌ́stəm]",
    ko: "(명) 관세, 세관(customs); (형) 주문 제작한 (≠ 관습)",
    desc: "💡 [실전 쓰임새] 'clear customs(세관 검사를 통과하다)', 'custom-made furniture(맞춤 주문 제작된 가구)'. 전통 관습 외에 무역 '관세/세관' 및 '맞춤형의'."
  },
  {
    en: "second",
    ipa: "[sékənd]",
    ko: "(동) (제안·의견을) 지지하다, 재청하다 (≠ 두 번째)",
    desc: "💡 [실전 쓰임새] 회의·토론 지문에서 'I second that motion.(그 제안/동의안을 전적으로 지지하고 재청합니다)'. 두 번째 순서가 아닌 동사 '지지하다(=support)'."
  },
  {
    en: "minute",
    ipa: "[mainjúːt]",
    ko: "(형) 극미한, 대단히 상세한, 정밀한 (≠ 분)",
    desc: "💡 [실전 쓰임새] 발음 주의 [mainjúːt]! 'minute differences(눈에 띄지 않는 극미한 차이)', 'minute examination(대단히 꼼꼼하고 정밀한 조사)'. 시간 1분이 아님!"
  },
  {
    en: "content",
    ipa: "[kəntént]",
    ko: "(형) 만족하는, 자족하는; (동) 만족시키다 (≠ 내용물)",
    desc: "💡 [실전 쓰임새] 강세가 뒤에 오며 [kəntént]! 'content with simple life(소박한 삶에 만족하는)'. 유튜브 영상 콘텐츠(내용물)가 아닌 형용사 '만족하는(=satisfied)'."
  },
  {
    en: "will",
    ipa: "[wíl]",
    ko: "(명) 의지, 유언장 (≠ ~할 것이다)",
    desc: "💡 [실전 쓰임새] 'strong willpower/free will(강한 의지력/자유의지)', 'leave a will(유언장을 남기다)'. 조동사 미래 표현 외에 명사로 인간의 굳건한 '의지'와 '유언장'."
  },
  {
    en: "issue",
    ipa: "[íʃuː]",
    ko: "(동) (선언·명령을) 발표하다, (잡지·증서를) 발행하다 (≠ 문제, 논쟁)",
    desc: "💡 [실전 쓰임새] 'issue a warning/statement(공식 경고나 성명을 발표하다)', 'issue a passport/visa(여권이나 비자를 발급하다)'. 쟁점(이슈) 외에 동사 '발표/발행하다'."
  },
  {
    en: "engage",
    ipa: "[engéidʒ]",
    ko: "(동) (주의·관심을) 사로잡다, 관여하다, 교전하다 (≠ 약혼하다)",
    desc: "💡 [실전 쓰임새] 'engage the reader\'s attention(독자의 흥미를 확 사로잡다)', 'engage in deep conversation(깊은 대화에 참여하다)'. 약혼하다가 아닌 '주의를 끌다'."
  },
  {
    en: "host",
    ipa: "[hóust]",
    ko: "(명) 다수, 무리 (a host of); (동) 주최하다 (≠ 주인)",
    desc: "💡 [실전 쓰임새] 지문 빈출 관용구 'a host of factors/reasons(수많은 요인들/이유들)'. 파티 호스트(주최자) 외에 a host of 형태로 '엄청난 수의 무리(=a multitude of)'."
  },
  {
    en: "lean",
    ipa: "[líːn]",
    ko: "(형) 군살 없는, 빈약한, 메마른; (동) 기울다, 기대다 (≠ 기대다만 아님)",
    desc: "💡 [실전 쓰임새] 'lean body/meat(군살 없는 날씬한 몸/지방 없는 살코기)', 'lean harvest(빈약한 흉작)'. 벽에 기대다 외에 형용사 '군살 없는/빈약한(=slender, sparse)'."
  },
  {
    en: "flat",
    ipa: "[flǽt]",
    ko: "(형) 단호한, 확고한, 활기 없는; (명) 아파트 (≠ 평평한만 아님)",
    desc: "💡 [실전 쓰임새] 'a flat refusal/denial(단호하고 일말의 여지없는 거절/부인)', 'flat market(침체된 시장)'. 평평한 바닥 외에 태도가 '단호한', 기운이 '처진/활기 없는'."
  },
  {
    en: "deliver",
    ipa: "[dilívər]",
    ko: "(동) (약속을) 이행하다, (연설을) 하다, 구출하다 (≠ 배달하다)",
    desc: "💡 [실전 쓰임새] 'deliver a speech/lecture(연설/강의를 하다)', 'deliver on a promise(공약이나 약속을 성실히 이행하다)'. 택배 배송이 아닌 '말을 전달하다/약속을 지키다'."
  },
  {
    en: "consume",
    ipa: "[kənsúːm]",
    ko: "(동) (감정이) 사로잡다, 휩싸이게 하다; 소모하다 (≠ 소비하다)",
    desc: "💡 [실전 쓰임새] 심리 지문에서 'be consumed with guilt/rage(죄책감이나 분노에 완전히 사로잡히다)'. 상품 소비가 아닌 감정에 '집어삼켜지다/사로잡히다'."
  },
  {
    en: "discipline",
    ipa: "[dísəplin]",
    ko: "(명) 학문 분야, 규율; (동) 훈련하다 (≠ 벌주다만 아님)",
    desc: "💡 [실전 쓰임새] 'scientific/academic discipline(과학적 학문 분야/연구 분과)', 'strict discipline(엄격한 자기 규율)'. 단순 체벌이 아닌 명사 '학문 분야'와 '절제력'."
  },
  {
    en: "exercise",
    ipa: "[éksərsàiz]",
    ko: "(동) (권리·권력을) 행사하다, 발휘하다; (명) 운동 (≠ 운동하다)",
    desc: "💡 [실전 쓰임새] 사회·정치에서 'exercise one\'s right to vote(투표권을 행사하다)', 'exercise caution(각별한 주의를 기울이다)'. 헬스 운동이 아닌 권리나 힘을 '행사하다'."
  },
  {
    en: "harbor",
    ipa: "[hɑ́ːrbər]",
    ko: "(동) (생각·원한을) 품다, 숨겨주다; (명) 항구 (≠ 항구)",
    desc: "💡 [실전 쓰임새] 'harbor hatred/suspicion(원한이나 의심을 오랫동안 마음속에 품다)', 'harbor fugitives(탈주범을 은닉하다)'. 배를 대는 항구 외에 동사 '품다/숨겨주다'."
  },
  {
    en: "pool",
    ipa: "[púːl]",
    ko: "(동) (자금·정보를) 공동으로 모으다; (명) 수영장, 웅덩이 (≠ 수영장)",
    desc: "💡 [실전 쓰임새] 'pool their knowledge and resources(지식과 자원을 한곳에 공동으로 모으다)'. 수영장 물웅덩이 외에 동사로 '공동 출자하다/모으다(=combine)'."
  },
  {
    en: "strike",
    ipa: "[stráik]",
    ko: "(동) (생각이) 문득 떠오르다, 인상을 주다; 치다, 파업하다 (≠ 파업하다)",
    desc: "💡 [실전 쓰임새] 'It struck me that...(문득 ~라는 생각이 뇌리를 스쳤다)', 'strike a chord with audience(청중의 심금을 울리다/공감을 사다)'. 문득 생각이 떠오르다."
  },
  {
    en: "treat",
    ipa: "[tríːt]",
    ko: "(명) 특별한 선물, 큰 기쁨; (동) 대우하다, 치료하다 (≠ 치료하다)",
    desc: "💡 [실전 쓰임새] 'Today\'s concert was a real treat.(오늘 콘서트는 정말 뜻밖의 큰 기쁨/선물이었다)'. 의사의 치료 외에 명사로 '뜻밖의 특별한 즐거움/대접'."
  },
  {
    en: "weather",
    ipa: "[wéðər]",
    ko: "(동) (폭풍·위기를) 무사히 헤쳐 나가다, 견디다 (≠ 날씨)",
    desc: "💡 [실전 쓰임새] 경제·생존 지문에서 'weather the economic crisis/storm(경제 위기/모진 풍파를 무사히 헤쳐 나가다)'. 일기예보 날씨가 아닌 동사 '견디다/생존하다'."
  },
  {
    en: "room",
    ipa: "[rúːm]",
    ko: "(명) 여지, 기회, 공간 (≠ 방)",
    desc: "💡 [실전 쓰임새] 'There is no room for doubt/error.(의심이나 실수의 여지가 전혀 없다)', 'room for growth(성장의 여지)'. 방(房)이 아니라 셀 수 없는 명사 '여지/기회'."
  },
  {
    en: "balance",
    ipa: "[bǽləns]",
    ko: "(명) 잔고, 잔액; 균형 (≠ 균형)",
    desc: "💡 [실전 쓰임새] 금융·경제 지문에서 'bank account balance(은행 계좌 잔고)', 'unpaid balance(미납 잔액)'. 시소의 균형 외에 회계 상의 '남아 있는 잔액'."
  },
  {
    en: "lot",
    ipa: "[lɑ́t]",
    ko: "(명) 운명, 몫; 부지, 구역 (≠ 많은 것)",
    desc: "💡 [실전 쓰임새] 'accept one\'s lot in life(자신에게 주어진 삶의 운명/몫을 받아들이다)', 'parking lot(주차 부지)'. a lot of(많은) 외에 명사로 '타고난 운명'과 '구역'."
  },
  {
    en: "post",
    ipa: "[póust]",
    ko: "(명) 직책, 자리, 배치; (동) 게시하다 (≠ 우편)",
    desc: "💡 [실전 쓰임새] 'take up an ambassadorial post(대사 직책을 맡다)', 'post guard(경비병을 배치하다)'. 우체국/SNS 게시글 외에 공식적인 '중요한 직책/자리'."
  },
  {
    en: "state",
    ipa: "[stéit]",
    ko: "(동) 진술하다, 말하다; (명) 상태, 국가 (≠ 국가)",
    desc: "💡 [실전 쓰임새] 'state clearly that S+V(분명하고 단호하게 진술하다/밝히다)', 'as stated above(위에서 언급/진술되었듯이)'. 미국 주(State)나 국가 외에 동사 '진술하다'."
  },
  {
    en: "weigh",
    ipa: "[wéi]",
    ko: "(동) 심사숙고하다, 비교 평가하다; 무게가 나가다 (≠ 무게를 재다)",
    desc: "💡 [실전 쓰임새] 'weigh the pros and cons(장단점을 신중하게 저울질하며 심사숙고하다)', 'weigh heavily on my mind(마음을 무겁게 짓누르다)'."
  },
  {
    en: "stem",
    ipa: "[stém]",
    ko: "(동) (흐름을) 막다, 저지하다; (~에서) 기인하다(stem from); (명) 줄기 (≠ 줄기)",
    desc: "💡 [실전 쓰임새] 'stem the flow of false rumors(거짓 소문의 확산을 막다/저지하다)', 'Problems stem from misunderstanding.(문제는 오해에서 기인한다)'. 줄기 외에 '막다/기인하다'."
  }
];

const MOCK_EXAM_VOCAB_SETS = [
  {
    id: "mock2026_g1_sep_part1",
    book: "2026 고1 6모/9모 대비",
    title: "[6모/9모 킬러] 반전 다의어 정예 Part 1 (30단어)",
    isMockSpecial: true,
    studentIds: [1, 2, 3, 4, 5, 6],
    words: MOCK_PART1_WORDS
  },
  {
    id: "mock2026_g1_sep_part2",
    book: "2026 고1 6모/9모 대비",
    title: "[6모/9모 킬러] 반전 다의어 & 킬러 Part 2 (30단어)",
    isMockSpecial: true,
    studentIds: [1, 2, 3, 4, 5, 6],
    words: MOCK_PART2_WORDS
  },
  {
    id: "mock2026_g1_sep_all",
    book: "2026 고1 6모/9모 대비",
    title: "[6모/9모 파이널] 반전 다의어 통합 풀세트 Part 1+2 (60단어)",
    isMockSpecial: true,
    studentIds: [1, 2, 3, 4, 5, 6],
    words: [...MOCK_PART1_WORDS, ...MOCK_PART2_WORDS]
  }
];
