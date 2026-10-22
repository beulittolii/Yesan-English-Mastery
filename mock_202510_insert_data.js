// ============================================================
// 10/12 문장 삽입 위치 파악 실전 테스트 (3세트)
// 2025 고1 9월 학평 29~40번 지문 활용
// 세트마다 다른 '주어진 문장'을 제시 → 정답 위치 상이
// ============================================================

// ────────────────────────────────────────────────
// [SET 1] 문장 삽입 12문항
// ────────────────────────────────────────────────
const MOCK_202510_INSERT_SET1_QUESTIONS = [
  {
    "id": "mock2510_ins1_q01",
    "passageNo": 29,
    "pdfQNum": 1,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles.",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. (A) Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don't run until necessary. (B) Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. (C) That's true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. (D) But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour! (E)\n*herbivore: 초식동물 **herd: 무리",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 최초 정착민들에게 가젤보다 길들일 기회가 더 많았던 포유류는 없었다는 내용입니다. 가젤이 가장 빈번하게 사냥된 종이었다는 (C) 뒤, 그리고 '하지만 어떤 가젤도 길들여지지 않았다(But no gazelle species has ever been domesticated)'는 문장 앞인 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q02",
    "passageNo": 30,
    "pdfQNum": 2,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share.",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. (A) When we have less, we tend to be more open to sharing what we have. (B) Certain nomadic tribes don't have much, yet they are happy to share because it is in their interest to do so. (C) If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. (D) It's not just because they are nice people; it's because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. (E) Our desire for more, combined with our reduced physical interaction with the \"common folk,\" starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 5,
    "explanation": "유목 부족들이 적게 가졌을 때 기꺼이 나누는 삶을 설명한 뒤, 아이러니하게도 더 많이 가질수록 담장을 높이고 덜 나누려 한다는 역설적 전환 문장입니다. 뒤에 이어지는 '더 많이 원하는 욕구가 단절을 만든다'는 문장과 자연스럽게 연결되므로 (E)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q03",
    "passageNo": 31,
    "pdfQNum": 3,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives.",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. (A) While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. (B) As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. (C) There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. (D) And for the first few minutes of the rest of their lives, they are. (E) But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 아이들이 장난감을 갖게 되면 평생 행복할 것이라 믿는다고 말합니다. (D) 바로 뒤 문장 'And for the first few minutes of the rest of their lives, they are.'에서 'they are'가 주어진 문장의 'they will be happy'를 대동사로 받고 있으므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q04",
    "passageNo": 32,
    "pdfQNum": 4,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This natural chemical builds up in your blood as time awake increases.",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. (A) This daily drive for sleep appears to be due, in part, to a compound known as adenosine. (B) While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. (C) An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. (D) Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. (E) Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "'This natural chemical'은 (A) 바로 뒤에서 처음 소개된 'a compound known as adenosine'을 가리킵니다. 깨어 있는 시간이 길수록 혈중 농도가 높아진다는 내용 다음에, 자는 동안 아데노신을 분해한다는 문장(While you sleep...)이 이어지므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q05",
    "passageNo": 33,
    "pdfQNum": 5,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Whether or not the quoted number is \"precise\" therefore depends on what I'm intending to do with it.",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. (A) Take, for example, the distance between Earth and the sun: 1.49597 × 10⁸ km, as measured at one point during the year. (B) This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. (C) However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! (D) If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. (E) If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 인용된 숫자의 '정밀성' 여부가 사용 의도에 달려 있다는 결론입니다. 불확실성의 크기(뉴욕-시카고 거리보다 크다)를 설명한 (C) 뒤에 오며, 이어서 그 구체적 용도 차이(일출 시각 vs. 인공위성 궤도)를 예시로 드는 문장들 앞인 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q06",
    "passageNo": 34,
    "pdfQNum": 6,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process.",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. (A) This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. (B) Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. (C) This is not only expensive, but also an undermining factor for our efforts to cut global emissions. (D) Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements. (E)\n*excavate: 발굴하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "태양광 패널 생산에 필요한 광물 발굴에 화석 연료가 다시 사용된다는 (B) 뒤에서, 인과관계를 나타내는 Thus로 '더 밀어붙일수록 화석 에너지를 더 빨리 써야 한다'고 결론 짓고, (C) 뒤의 'This is not only expensive...'가 이를 받으므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q07",
    "passageNo": 35,
    "pdfQNum": 7,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley's Frankenstein).",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. (A) There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). (B) In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine's intelligence and whether the machines can think autonomously. (C) A few years later, MIT professor John McCarthy coined \"artificial intelligence,\" replacing the previously used expression \"automata studies.\" (D) Since then, artificial intelligence has become the study and practice of \"making intelligent machines\" that are programmed to think like humans — endowed by their creators with reasoning and learning. (E)\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "'Likewise(마찬가지로)'로 시작하여 문학(프랑켄슈타인)에서도 인간형 기계를 꿈꿔왔음을 언급합니다. 고대 그리스 신화 속 로봇/인공 생명체를 다룬 (A) 뒤에 오며, 1950년 튜링 테스트라는 현대 과학적 시도로 넘어가는 (B) 앞인 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q08",
    "passageNo": 36,
    "pdfQNum": 8,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder.",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. (A) The tortoise stocks up on water by eating plants and digging holes to collect rain. (B) Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. (C) Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. (D) And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. (E) Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "비가 온 뒤 식물 섭취와 빗물 수집이라는 1차적 수분 확보 방법 뒤에서, 역접의 But으로 '장기 동면 동안 수분 유지를 위해 정교한 방광에 의존한다'며 방광의 역할을 처음 소개합니다. 그 뒤 (B)의 'Unlike most animals, the tortoise's bladder...'가 자연스럽게 이어지므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q09",
    "passageNo": 37,
    "pdfQNum": 9,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down.",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. (A) Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. (B) This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. (C) One of these is friction in the wheels rubbing on the axles. (D) Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. (E) When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "브레이크 마찰력 설명을 마친 뒤, '브레이크 없이도 다른 마찰력들이 존재한다'고 화제를 전환합니다. 바로 다음 문장 'One of these(그 중 하나)'가 주어진 문장의 'other friction forces'를 가리키므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q10",
    "passageNo": 38,
    "pdfQNum": 10,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically.",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. (A) Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. (B) Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. (C) Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. (D) Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily. (E)\n*linear: 선형의",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "주어진 문장은 비선형 편집의 핵심 기능(어디서든 장면 추가·삭제, 자동 길이 조정)을 설명합니다. 임의 접근으로 원하는 장면을 쉽게 찾는다는 (B) 뒤에 이어지며, (C) 다음 '선형 편집은 타자기로 글 쓰는 것 같았다'는 대조 설명이 시작되기 직전인 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q11",
    "passageNo": 39,
    "pdfQNum": 11,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] In judging a person not only her actions but also her intentions and motives are relevant.",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. (A) A morally good person must intend to do morally good actions and intend to avoid morally bad ones. (B) A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. (C) Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. (D) But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. (E) Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 한 사람을 판단할 때 행동만이 아니라 의도와 동기도 관련된다는 내용입니다. 도덕적으로 선한 사람의 정의를 제시한 도입부 바로 뒤에 오며, (A) 이후 '도덕적으로 선한 행동을 의도해야 한다(must intend)'는 구체적 요건으로 이어지는 가교 역할을 하므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins1_q12",
    "passageNo": 40,
    "pdfQNum": 12,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] The functional relationship we have with objects creates visual expectations that interfere with our ability to see \"like a camera.\"",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to \"see\" it in profile or at some other \"ready for use\" angle. (A) One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. (B) The camera, like the human eye, sees only shapes and colors. (C) It documents the world impartially through a lens that is similar to the eye. (D) When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. (E) And because of their flatness, photographs often contain areas that appear as unrecognizable colors and shapes.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "망치 예시로 기능적 관계가 시각적 기대를 만든다는 것을 보인 뒤, 주어진 문장은 그 기능적 관계가 '카메라처럼 보는 능력'을 방해한다고 결론 짓습니다. 뒤이어 (B)부터 카메라의 시각('shapes and colors만 본다')을 설명하므로 (B)에 들어가야 합니다."
  }
];

// ────────────────────────────────────────────────
// [SET 2] 문장 삽입 12문항 — 다른 주어진 문장, 다른 정답 위치
// ────────────────────────────────────────────────
const MOCK_202510_INSERT_SET2_QUESTIONS = [
  {
    "id": "mock2510_ins2_q01",
    "passageNo": 29,
    "pdfQNum": 1,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] These traits — extreme speed and unpredictability — make such animals nearly impossible to contain safely within enclosures.",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. (A) Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don't run until necessary. (B) Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. (C) That's true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. (D) But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour! (E)\n*herbivore: 초식동물 **herd: 무리",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장의 'These traits'는 앞 문장 '위협을 감지하면 즉각 도망치도록 프로그래밍된 빠르고 신경질적인 종'의 특성(speed, unpredictability)을 가리킵니다. 이어서 (A) 뒤에 더 느리고 덜 신경질적인 다른 종들을 대조적으로 소개하므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q02",
    "passageNo": 30,
    "pdfQNum": 2,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Abundance, paradoxically, tends to reduce our generosity rather than increase it.",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. (A) When we have less, we tend to be more open to sharing what we have. (B) Certain nomadic tribes don't have much, yet they are happy to share because it is in their interest to do so. (C) If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. (D) It's not just because they are nice people; it's because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. (E) Our desire for more, combined with our reduced physical interaction with the \"common folk,\" starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "주어진 문장은 풍요가 오히려 관대함을 줄인다는 역설을 제시합니다. (A) 뒤 '적게 가질수록 더 개방적으로 나눈다'는 문장과 대응되며, 이어서 유목 부족의 나눔 사례를 구체적 반례로 보여주는 흐름 앞인 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q03",
    "passageNo": 31,
    "pdfQNum": 3,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This process of adjustment is known as hedonic adaptation, and it applies equally to both positive and negative events.",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. (A) While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. (B) As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. (C) There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. (D) And for the first few minutes of the rest of their lives, they are. (E) But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "주어진 문장의 'This process of adjustment'는 바로 앞 (B)의 'we adjust — to new information and events... and return to our personal default level of well-being'을 지칭합니다. 이 적응 과정을 '쾌락 적응'이라 명명하고, (C) 뒤에서 'highs and lows'와 기준선 복귀의 구체적 예시(첫사랑의 행복감, 이별의 절망)를 드는 흐름으로 이어지므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q04",
    "passageNo": 32,
    "pdfQNum": 4,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This sleep debt cannot simply be ignored — it accumulates and must eventually be repaid by sleeping longer than usual.",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. (A) This daily drive for sleep appears to be due, in part, to a compound known as adenosine. (B) While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. (C) An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. (D) Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. (E) Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장의 'This sleep debt'는 (C)의 'you build up a sleep debt'를 직접 받습니다. 수면 빚이 무시될 수 없고 반드시 갚아야 한다는 내용 뒤에, (D)에서 '내장된 분자 피드백 때문에 수면 부족에 적응할 수 없다'고 원인을 설명하는 흐름으로 이어지므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q05",
    "passageNo": 33,
    "pdfQNum": 5,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] What seems precise at one scale of measurement may be wildly inaccurate at another.",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. (A) Take, for example, the distance between Earth and the sun: 1.49597 × 10⁸ km, as measured at one point during the year. (B) This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. (C) However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! (D) If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. (E) If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 불확실성의 상대성이라는 주제문을 부연합니다. 바로 뒤 (A)에서 '지구-태양 거리'를 구체적 예시로 들기 전, 핵심 개념을 다시 한번 명확히 풀어주는 역할을 하므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q06",
    "passageNo": 34,
    "pdfQNum": 6,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] The sheer scale of this transition means that its upfront environmental cost is often severely underestimated.",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. (A) This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. (B) Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. (C) This is not only expensive, but also an undermining factor for our efforts to cut global emissions. (D) Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements. (E)\n*excavate: 발굴하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 전환의 규모가 워낙 커서 선행 환경 비용이 과소평가된다고 말합니다. 이는 'This is not only expensive, but also an undermining factor...'라는 비판적 평가 뒤에서, Heinberg가 '전환 비용이 제안서에 거의 포함되지 않는다'고 지적하는 (E) 앞인 (D)에 자연스럽게 연결됩니다."
  },
  {
    "id": "mock2510_ins2_q07",
    "passageNo": 35,
    "pdfQNum": 7,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This dream reflects a deep human desire to extend our own intelligence beyond biological limits.",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. (A) There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). (B) In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine's intelligence and whether the machines can think autonomously. (C) A few years later, MIT professor John McCarthy coined \"artificial intelligence,\" replacing the previously used expression \"automata studies.\" (D) Since then, artificial intelligence has become the study and practice of \"making intelligent machines\" that are programmed to think like humans — endowed by their creators with reasoning and learning. (E)\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장의 'This dream'은 도입부 '인간이 지능형 기계를 꿈꿔왔다'는 문장을 바로 받습니다. 그 꿈의 근원적 이유(생물학적 한계를 넘고 싶은 욕망)를 설명하고, 이어서 (A)부터 고대 그리스 신화 속 구체적 사례들을 제시하는 흐름으로 이어지므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q08",
    "passageNo": 36,
    "pdfQNum": 8,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This remarkable ability to survive without water for extended periods sets the desert tortoise apart from most other reptiles.",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. (A) The tortoise stocks up on water by eating plants and digging holes to collect rain. (B) Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. (C) Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. (D) And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. (E) Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장의 'This remarkable ability'는 앞 (C)의 'a desert tortoise can go a full year without taking in any freshwater'를 받습니다. 사막거북의 독보적 능력을 정리한 뒤, (D) 이후 방광의 중요성과 방문객 주의 사항으로 자연스럽게 이어지므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q09",
    "passageNo": 37,
    "pdfQNum": 9,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Understanding these forces helps engineers design more efficient wheels and bearings to minimize energy loss.",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. (A) Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. (B) This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. (C) One of these is friction in the wheels rubbing on the axles. (D) Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. (E) When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 5,
    "explanation": "주어진 문장은 마찰력에 관한 이해가 공학적 응용으로 이어진다는 내용입니다. 마차의 축 마찰을 언급하며 마찰력 발생 원인을 설명하는 (E) 앞 문장('When you apply these ideas...')의 직접적 결론이자 현실 적용으로 이어지는 흐름이므로 (E)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q10",
    "passageNo": 38,
    "pdfQNum": 10,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Nonlinear editing, on the other hand, is like using a word processing program.",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. (A) Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. (B) Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. (C) Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. (D) If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily. (E)\n*linear: 선형의",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 'on the other hand'로 선형 편집(타자기)과 대비하여 비선형 편집을 워드프로세서에 비유합니다. '수정 시 전부 다시 타이핑해야 했다'는 (C) 뒤의 선형 편집 한계 설명 다음에 오며, (D) 이후 '실수를 키 몇 번으로 간단히 고칠 수 있다'는 비선형 편집의 장점으로 자연스럽게 이어지므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q11",
    "passageNo": 39,
    "pdfQNum": 11,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] But actual consequences are important.",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. (A) In judging a person not only her actions but also her intentions and motives are relevant. (B) A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. (C) Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. (D) A person who always tries to prevent harm but never does, is not generally thought of as morally good. (E) Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장 'But actual consequences are important.'는 역접의 But으로 실제 결과도 중요하다고 전환합니다. '행동의 실제 결과가 판단에 중요한 것이 아니라는 잘못된 인상을 피해야 한다'는 (C) 뒤에서, (D) 이후 '해를 막으려 했지만 결코 성공하지 못한 사람은 도덕적으로 선하다고 보지 않는다'는 실제 결과 중심의 예시로 이어지므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins2_q12",
    "passageNo": 40,
    "pdfQNum": 12,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] We automatically frame what we see in terms of how we use things, rather than how they actually appear to the eye.",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to \"see\" it in profile or at some other \"ready for use\" angle. (A) One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. (B) The camera, like the human eye, sees only shapes and colors. (C) It documents the world impartially through a lens that is similar to the eye. (D) When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. (E) And because of their flatness, photographs often contain areas that appear as unrecognizable colors and shapes.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 '사용 방식으로 보는 것을 틀 지운다'는 일반 원리를 제시합니다. '사용하기 좋은 각도로 본다'는 앞 문장의 논지를 한 번 더 일반화하고, (A) 뒤에서 '위에서 본 망치는 상상하지 않는다'는 구체적 사례를 보여주기 전 연결 역할을 하므로 (A)에 들어가야 합니다."
  }
];

// ────────────────────────────────────────────────
// [SET 3] 문장 삽입 12문항 — 또 다른 주어진 문장, 또 다른 정답 위치
// ────────────────────────────────────────────────
const MOCK_202510_INSERT_SET3_QUESTIONS = [
  {
    "id": "mock2510_ins3_q01",
    "passageNo": 29,
    "pdfQNum": 1,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Such an attempt would almost certainly end in injury to both the human handler and the animal itself.",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. (A) Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don't run until necessary. (B) Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. (C) That's true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. (D) But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour! (E)\n*herbivore: 초식동물 **herd: 무리",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 5,
    "explanation": "주어진 문장은 '그런 시도는 사람과 동물 모두에게 부상으로 끝날 것'이라는 내용입니다. 바로 앞 (D) 뒤에서 '벽에 부딪히고, 30피트를 뛰고, 시속 50마일로 달리는 동물을 몰려는' 상황을 상상해 보라는 문장(Just imagine...)의 자연스러운 결론으로 이어지므로 (E)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q02",
    "passageNo": 30,
    "pdfQNum": 2,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This is particularly evident when comparing wealthier societies with those that possess fewer material goods.",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. (A) When we have less, we tend to be more open to sharing what we have. (B) Certain nomadic tribes don't have much, yet they are happy to share because it is in their interest to do so. (C) If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. (D) It's not just because they are nice people; it's because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. (E) Our desire for more, combined with our reduced physical interaction with the \"common folk,\" starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 '부유한 사회와 물질적으로 적은 사회를 비교할 때 이 점이 특히 두드러진다'는 내용입니다. '자원이 풍부할수록 나누려는 경향이 복잡해진다'는 주제문 직후, (A) '적게 가질수록 더 개방적으로 나눈다'는 문장으로 넘어가기 전 이를 구체화하는 역할을 하므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q03",
    "passageNo": 31,
    "pdfQNum": 3,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Rather, our happiness is governed by a kind of emotional thermostat that tends to reset itself after significant events.",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. (A) While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. (B) As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. (C) There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. (D) And for the first few minutes of the rest of their lives, they are. (E) But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 '행복이 큰 사건 뒤에 초기화되는 감정 온도계에 의해 지배된다'는 내용으로, 도입부의 '순간순간의 경험으로만 결정되지 않는다'는 핵심 주장을 비유적으로 풀어줍니다. (A) 이후 '경험이 기분에 영향을 주지만 새 방향으로 완전히 날아가지는 않는다'는 구체적 설명으로 자연스럽게 이어지므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q04",
    "passageNo": 32,
    "pdfQNum": 4,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] No matter how much you try to convince yourself that you can function well on little sleep, your body knows otherwise.",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. (A) This daily drive for sleep appears to be due, in part, to a compound known as adenosine. (B) While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. (C) An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. (D) Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. (E) Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 5,
    "explanation": "주어진 문장은 적게 자도 잘 기능한다고 스스로를 설득하려 해도 몸은 다르게 안다는 내용입니다. (D)의 '내장된 분자 피드백으로 수면 부족에 적응할 수 없다'는 결론을 받아, (E) 뒤의 'Eventually, a lack of sleep catches up with you'로 자연스럽게 연결되는 흐름이므로 (E)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q05",
    "passageNo": 33,
    "pdfQNum": 5,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Yet this apparent precision is entirely misleading when we consider the actual implications of the remaining uncertainty.",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. (A) Take, for example, the distance between Earth and the sun: 1.49597 × 10⁸ km, as measured at one point during the year. (B) This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. (C) However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! (D) If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. (E) If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "주어진 문장은 '겉보기 정밀성이 실제 불확실성의 의미를 보면 완전히 오해를 부른다'는 역전을 제시합니다. '6개 유효숫자로 백만 분의 일 정확도처럼 보인다'는 (B) 뒤에 오며, 다음 (C) 문장 'However, if the next digit is uncertain...'의 구체적 수치로 그 오해를 즉시 증명하므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q06",
    "passageNo": 34,
    "pdfQNum": 6,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Wind turbines, for example, require vast quantities of steel and concrete in their foundations, both of which depend heavily on coal-powered furnaces.",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. (A) This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. (B) Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. (C) This is not only expensive, but also an undermining factor for our efforts to cut global emissions. (D) Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements. (E)\n*excavate: 발굴하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "주어진 문장은 풍력 터빈 기초에 막대한 철강·콘크리트가 필요하고 이것이 석탄에 의존한다는 구체적 예시입니다. (A)의 '콘크리트 구조물과 철강 생산에 화석 에너지만으로 가능한 에너지가 필요하다'는 진술 뒤에 추가 예시로 자연스럽게 붙으며, 다음 (B)의 태양광 패널 사례로 이어지는 흐름이므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q07",
    "passageNo": 35,
    "pdfQNum": 7,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] McCarthy's 1956 Dartmouth Conference is widely regarded as the founding event of artificial intelligence as a formal academic discipline.",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. (A) There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). (B) In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine's intelligence and whether the machines can think autonomously. (C) A few years later, MIT professor John McCarthy coined \"artificial intelligence,\" replacing the previously used expression \"automata studies.\" (D) Since then, artificial intelligence has become the study and practice of \"making intelligent machines\" that are programmed to think like humans — endowed by their creators with reasoning and learning. (E)\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 1956년 다트머스 회의를 AI의 공식적 학문 창설 이벤트로 설명합니다. 매카시가 'artificial intelligence'라는 용어를 만들었다는 (C) 뒤에서, 그 결과 AI가 학문으로 자리잡았다는 (D) 이후의 'Since then, artificial intelligence has become the study and practice of...'로 이어지기 직전인 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q08",
    "passageNo": 36,
    "pdfQNum": 8,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] So effective is this system that the tortoise can retain sufficient water through both summer dormancy and winter hibernation.",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. (A) The tortoise stocks up on water by eating plants and digging holes to collect rain. (B) Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. (C) Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. (D) And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. (E) Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 3,
    "explanation": "주어진 문장은 '이 시스템이 매우 효과적이어서 여름 휴면과 겨울 동면 모두에서 수분을 유지할 수 있다'는 내용입니다. '방광이 물을 재흡수하도록 한다'는 (B)의 메커니즘을 받으며, 다음 (C)의 'Incredibly, a desert tortoise can go a full year without taking in any freshwater'라는 놀라운 결과로 이어지기 직전인 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q09",
    "passageNo": 37,
    "pdfQNum": 9,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This braking force slows you down far more effectively than simply stopping your pedalling ever could.",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. (A) Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. (B) This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. (C) One of these is friction in the wheels rubbing on the axles. (D) Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. (E) When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 1,
    "explanation": "주어진 문장은 '이 제동력이 페달을 멈추는 것보다 훨씬 효과적으로 속도를 줄인다'는 내용입니다. '브레이크를 잡으면'이라는 앞 문장 뒤에 오며, (A) 이후 브레이크가 왜 그런 강한 힘을 발휘하는지(마찰력)를 설명하는 문장으로 자연스럽게 이어지므로 (A)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q10",
    "passageNo": 38,
    "pdfQNum": 10,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape.",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. (A) Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. (B) With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. (C) Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. (D) Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily. (E)\n*linear: 선형의",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "주어진 문장은 'Another highlight'로 시작하여 디지털 비선형 시스템의 또 다른 장점인 임의 접근 기능을 소개합니다. 특수 효과(슬로모션 등)를 언급한 (A) 뒤에서 추가 장점을 이어주고, (B) 이후 '어디서든 장면을 추가·삭제할 수 있다'는 비선형 편집의 실용성으로 자연스럽게 이어지므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q11",
    "passageNo": 39,
    "pdfQNum": 11,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] A morally good person must intend to do morally good actions and intend to avoid morally bad ones.",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. (A) In judging a person not only her actions but also her intentions and motives are relevant. (B) A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. (C) Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. (D) But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. (E) Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 2,
    "explanation": "주어진 문장은 도덕적으로 선한 사람은 선한 행동을 의도하고 나쁜 행동을 피하려 의도해야 한다는 구체적 요건을 제시합니다. '의도와 동기가 판단에 관련된다'는 (A) 뒤에 오며, (B) 이후 '비의도적으로 해를 방지한 사람은 도덕적으로 선하지 않다'는 반례로 이어지는 논리 흐름이므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2510_ins3_q12",
    "passageNo": 40,
    "pdfQNum": 12,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This explains why photographs often feel alien to us — they capture what is literally there, not what we expect to see.",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to \"see\" it in profile or at some other \"ready for use\" angle. (A) One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. (B) The camera, like the human eye, sees only shapes and colors. (C) It documents the world impartially through a lens that is similar to the eye. (D) When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. (E) And because of their flatness, photographs often contain areas that appear as unrecognizable colors and shapes.",
    "choices": ["(A)", "(B)", "(C)", "(D)", "(E)"],
    "answer": 4,
    "explanation": "주어진 문장은 '사진이 낯설게 느껴지는 이유는 우리가 기대하는 것이 아닌 실제 있는 것을 담기 때문'이라고 설명합니다. '카메라가 렌즈를 통해 세계를 공정하게 기록한다'는 (C) 뒤에 오며, (D)의 '사진을 자세히 보면 종종 놀랍다'는 문장의 원인을 미리 설명해 주는 역할을 하므로 (D)에 들어가야 합니다."
  }
];

// ────────────────────────────────────────────────
// 10/12 문장 삽입 실전 테스트 계획 (3세트)
// ────────────────────────────────────────────────
const MOCK_202510_INSERT_TEST_PLANS = [
  {
    "planId": "mock2510_insert_s1",
    "setNum": 1,
    "date": "2026-10-12",
    "title": "[10/12 문장 삽입] Set 1 — 주어진 문장 위치 파악 12제",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 고1 9월 학평 29~40번 전 지문 · 문장 삽입 유형 12제 (Set 1)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "29~40번 전 지문에서 '주어진 문장이 들어갈 알맞은 곳' 유형만 뽑은 12문항입니다. 지시어·연결사·문맥 논리로 정확한 삽입 위치를 찾으세요! (Set 1)",
    "questionsVar": "MOCK_202510_INSERT_SET1_QUESTIONS"
  },
  {
    "planId": "mock2510_insert_s2",
    "setNum": 2,
    "date": "2026-10-12",
    "title": "[10/12 문장 삽입] Set 2 — 주어진 문장 위치 파악 12제",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 고1 9월 학평 29~40번 전 지문 · 문장 삽입 유형 12제 (Set 2)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "같은 지문, 다른 주어진 문장 — 정답 위치가 모두 달라집니다! 지문의 논리 흐름을 처음부터 다시 분석하세요. (Set 2)",
    "questionsVar": "MOCK_202510_INSERT_SET2_QUESTIONS"
  },
  {
    "planId": "mock2510_insert_s3",
    "setNum": 3,
    "date": "2026-10-12",
    "title": "[10/12 문장 삽입] Set 3 — 주어진 문장 위치 파악 12제",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 고1 9월 학평 29~40번 전 지문 · 문장 삽입 유형 12제 (Set 3)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "또 다른 주어진 문장으로 또 다른 정답 위치를 찾아야 합니다. 각 문장의 단서어(지시대명사·연결사·관사)에 집중하세요! (Set 3)",
    "questionsVar": "MOCK_202510_INSERT_SET3_QUESTIONS"
  }
];

// Helper: planId로 문제 배열 반환
function getMock202510InsertQuestionsByPlanId(planId) {
  switch (planId) {
    case 'mock2510_insert_s1': return MOCK_202510_INSERT_SET1_QUESTIONS;
    case 'mock2510_insert_s2': return MOCK_202510_INSERT_SET2_QUESTIONS;
    case 'mock2510_insert_s3': return MOCK_202510_INSERT_SET3_QUESTIONS;
    default: return [];
  }
}
