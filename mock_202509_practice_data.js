// ========================================================
// 2025년 9월 고1 학평 영어 (29~40번) 유형별 실전 문제풀이 테스트
// 기간: 2026-09-29(화) ~ 2026-10-09(금) [총 11일간 11개 세트 118문항 (순수 어법 & 독해 & 서술형)]
// 어휘/단어 문항 완전 배제, 어법 및 독해 문제로만 정밀 구성
// ========================================================

const MOCK_202509_PASSAGES = {
  "29": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
  "30": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
  "31": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
  "32": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
  "33": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
  "34": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
  "35": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
  "36": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
  "37": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
  "38": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
  "39": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
  "40": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes."
};

const MOCK_202509_TYPE_A_QUESTIONS = [
  {
    "id": "mock2509_q23",
    "passageNo": 29,
    "pdfQNum": 23,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when ⓐthreatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If ⓑput into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, ⓒwhich for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species ⓓthat the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits ⓔit against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 5,
    "explanation": "ⓔ it → itself\n동사 hits의 목적어 자리이며, 의미상 주어인 an animal과 목적어가 같은 대상을 가리키므로 재귀대명사 itself로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q25",
    "passageNo": 30,
    "pdfQNum": 25,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "For a species born in a time ⓐwhen resources were limited and dangers were great, our natural tendency to share and cooperate is complicated ⓐwhen resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing ⓑwhat we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest ⓒto do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know ⓓthat they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, ⓔis combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 5,
    "explanation": "ⓔ is combined → combined\n문장의 주어인 Our desire for more와 본동사 starts 사이에 삽입되어 주어를 부연 설명하는 분사구 자리입니다. 주어가 결합되는 수동의 대상이므로 과거분사 combined로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q28",
    "passageNo": 31,
    "pdfQNum": 28,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A), (B), (C)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, (A)(is / are) not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so (B)(is / does) the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get (C)(that / what) they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "(A) is — (B) is — (C) what",
      "(A) is — (B) does — (C) what",
      "(A) is — (B) does — (C) that",
      "(A) are — (B) is — (C) that",
      "(A) are — (B) does — (C) what"
    ],
    "answer": 2,
    "explanation": "(A) Whether 명사절 주어는 단수 취급하므로 is가 올바릅니다.\n(B) 일반동사 fades를 대신하는 대동사로 주어 the despair(단수)에 수일치하여 does가 올바릅니다.\n(C) get의 목적어이자 for의 목적어가 빠진 불완전한 절을 이끄는 관계대명사 what이 올바릅니다."
  },
  {
    "id": "mock2509_q29",
    "passageNo": 32,
    "pdfQNum": 29,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "Although you may put off ⓐgoing to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears ⓑto be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to ⓒtriggers sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt ⓓthat you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to ⓔgetting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 3,
    "explanation": "ⓒ triggers → to trigger 또는 trigger\nbe의 보어인 명사절 안에서 목적을 나타내는 부사적 용법의 to부정사 to keep과 and로 병렬 연결되므로 triggers를 to trigger(또는 to가 생략된 동사원형 trigger)로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q32",
    "passageNo": 33,
    "pdfQNum": 32,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A), (B), (C)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate (A)(is / are) that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits (B)(mean / means) I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on (C)(that / what) I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "(A) is — (B) mean — (C) what",
      "(A) are — (B) mean — (C) that",
      "(A) is — (B) means — (C) that",
      "(A) are — (B) means — (C) what",
      "(A) is — (B) means — (C) what"
    ],
    "answer": 5,
    "explanation": "(A) 주어 One of the things에서 핵심 명사는 단수 One이므로 단수동사 is.\n(B) 동명사구 주어 using six significant digits는 단수 취급하므로 means.\n(C) 전치사 on 뒤에서 do의 목적어가 빠진 불완전한 명사절을 이끄는 관계대명사 what. 따라서 ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q34",
    "passageNo": 34,
    "pdfQNum": 34,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A), (B), (C)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "Richard Heinberg, an American journalist, argues (A)(what / that) in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again (B)(requires / requiring) the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, (C)(that / which) tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "(A) that — (B) requiring — (C) which",
      "(A) that — (B) requiring — (C) that",
      "(A) that — (B) requires — (C) which",
      "(A) what — (B) requiring — (C) that",
      "(A) what — (B) requires — (C) which"
    ],
    "answer": 1,
    "explanation": "(A) argues 뒤에 완전한 절을 이끄는 명사절 접속사 that.\n(B) 접속사 없이 콤마로 이어져 능동 의미를 나타내는 분사구문 requiring.\n(C) 계속적 용법의 관계대명사절로 선행사 transition proposals를 수식하는 which (계속적 용법에 that 불가). 따라서 ①번이 정답입니다."
  },
  {
    "id": "mock2509_q36",
    "passageNo": 35,
    "pdfQNum": 36,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A), (B), (C)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and (A)(make / have made) human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then (B)(develop / developed) the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” (C)(replaced / replacing) the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "(A) make — (B) develop — (C) replacing",
      "(A) have made — (B) develop — (C) replaced",
      "(A) make — (B) developed — (C) replaced",
      "(A) have made — (B) developed — (C) replacing",
      "(A) make — (B) developed — (C) replacing"
    ],
    "answer": 5,
    "explanation": "(A) 관계사절 내 조동사 could에 연결된 become과 and로 병렬되는 동사원형 make.\n(B) 과거시제 본동사 asked와 and로 병렬 연결되는 과거동사 developed.\n(C) 앞 절 뒤에 이어져 능동의 분사구문을 이루는 현재분사 replacing. 따라서 ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q37",
    "passageNo": 36,
    "pdfQNum": 37,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and ⓐstays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But ⓑto stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, ⓒallowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors ⓓnot stop and help the slow-movers across the road. Tortoises become ⓔso terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 4,
    "explanation": "ⓓ not stop → not to stop\n동사 remind는 목적격보어로 to부정사를 취하며, to부정사의 부정은 to 앞에 not을 붙여야 하므로 not to stop으로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q39",
    "passageNo": 37,
    "pdfQNum": 39,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, ⓐmaking you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force ⓑcalled friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also ⓒslows you down. One of these ⓓis friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, ⓔpushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 3,
    "explanation": "ⓒ slows → slow\n계속적 용법의 관계대명사 which가 가리키는 선행사는 복수명사구 other friction forces이므로 수일치하여 복수동사 slow로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q42",
    "passageNo": 38,
    "pdfQNum": 42,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A), (B), (C)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems (A)(that / where) allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor (B)(finds / to find) desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or (C)(removing / removed) anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "(A) that — (B) finds — (C) removing",
      "(A) that — (B) to find — (C) removing",
      "(A) that — (B) to find — (C) removed",
      "(A) where — (B) finds — (C) removing",
      "(A) where — (B) to find — (C) removed"
    ],
    "answer": 3,
    "explanation": "(A) 뒤에 동사 allow의 주어가 없는 불완전한 절을 이끄는 주격 관계대명사 that.\n(B) 가목적어 it에 상응하는 진목적어 자리로 의미상 주어(for an editor) 뒤에 오는 to find.\n(C) can be easily added의 과거분사 added와 or로 병렬 연결되는 수동의 과거분사 removed. 따라서 ③번이 정답입니다."
  },
  {
    "id": "mock2509_q43",
    "passageNo": 39,
    "pdfQNum": 43,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것은?",
    "passage": "A morally good person is ⓐone who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and ⓑdoes not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions ⓒthat count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, ⓓit may be said that she means well; but, contrary to Kant, some results are necessary before she ⓔregards as morally good.",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": 5,
    "explanation": "ⓔ regards → is regarded\n접속사 before가 이끄는 절의 주어 she는 도덕적으로 선하다고 ‘여겨지는’ 대상이므로 수동 표현인 is regarded로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q46",
    "passageNo": 40,
    "pdfQNum": 46,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E) 중, 어법상 어색한 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when (A)visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects (B)creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, (C)sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often (D)surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas (E)where appear as unrecognizable colors and shapes.",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 5,
    "explanation": "(E) where → that 또는 which\n뒤에 주어가 없는 불완전한 절(appear as unrecognizable colors and shapes)이 이어지므로 선행사 areas를 수식하는 주격 관계대명사 that 또는 which로 고쳐야 합니다."
  }
];

const MOCK_202509_TYPE_B_QUESTIONS = [
  {
    "id": "mock2509_q67",
    "passageNo": 29,
    "pdfQNum": 67,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것을 알맞게 고치지 않은 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for (A)immediate flight when they perceive a threat. Other species are slower, less nervous, ⓐseeking protection in herds, stand their ground when threatened, and don’t run until (B)necessary. Naturally, the (C)dull species are difficult to keep in captivity. If they ⓑput into an enclosure, they are likely to panic, and either die of shock or hit ⓒthem repeatedly to death against the fence in their attempts to escape. That’s (D)true, for example, of gazelles, which for thousands of years ⓓwas the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been (E)untamed. Just imagine trying to herd an animal ⓔwhat runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "ⓐ: seeking → seek",
      "ⓑ: put → are putting",
      "ⓒ: them → themselves",
      "ⓓ: was → were",
      "ⓔ: what → that"
    ],
    "answer": 2,
    "explanation": "②번 ⓑ: put → are put\n주어 they(초식동물들)는 우리 안에 '넣어지는' 수동의 대상이므로 are putting(능동 진행)이 아니라 수동태인 are put으로 고쳐야 합니다."
  },
  {
    "id": "mock2509_q69",
    "passageNo": 30,
    "pdfQNum": 69,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것을 모두 고르면?",
    "passage": "For a species born in a time ⓐwhich resources were limited and dangers were great, our natural tendency to share and cooperate ⓑis complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more (A)receptive to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because ⓒit is in their (B)interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on (C)sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the (D)smaller our fences, the more ⓓsophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical (E)isolation with the “common folk,” ⓔstarting to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": [
      1,
      5
    ],
    "explanation": "① ⓐ: which → when 또는 in[during] which (완전한 절을 이끌어 선행사 a time을 수식하므로 관계부사 when으로 고쳐야 합니다.)\n⑤ ⓔ: starting → starts (문장의 주어 Our desire for more에 대한 본동사 자리이므로 단수동사 starts로 고쳐야 합니다.)\n따라서 ①, ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q72",
    "passageNo": 31,
    "pdfQNum": 72,
    "type": "CHOICE",
    "question": "윗글의 괄호 (A)~(D)에서 어법상 알맞은 말로 바르게 연결된 것은?",
    "passage": "While our experiences affect our mood, we are not blown in a completely new direction by each (A)(gust / gusts) of wind. As humans, we adjust — to new information and events both good and bad — and (B)(return / returning) to our personal default level of well-being. There will be highs and lows, but over time, like water (C)(seeking / sought) its own level, we are pulled toward our baseline. ... And for the first few minutes of the rest of their lives, they (D)(do / are).",
    "choices": [
      "(A) gusts — (B) returning — (C) seeking — (D) are",
      "(A) gust — (B) return — (C) seeking — (D) do",
      "(A) gusts — (B) return — (C) sought — (D) are",
      "(A) gust — (B) returning — (C) sought — (D) do",
      "(A) gust — (B) return — (C) seeking — (D) are"
    ],
    "answer": 5,
    "explanation": "(A) each는 단수명사를 수식하므로 단수명사 gust.\n(B) 주어 we의 첫 번째 동사 adjust와 and로 병렬되므로 return.\n(C) water가 목적어 its own level을 추구하는 능동 주체이므로 현재분사 seeking.\n(D) 앞 문장의 be happy에 상응하여 보어 happy가 생략된 복수 be동사 are. 따라서 ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q74",
    "passageNo": 32,
    "pdfQNum": 74,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E)에 대한 설명으로 알맞지 않은 것은?",
    "passage": "... and you (A)are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound (B)known as adenosine. ... Thus, this molecule may be (C)what your body uses to keep track of lost sleep ... An accumulation of adenosine and other factors might explain (D)why, after several nights of less than optimal amounts of sleep, you build up a sleep debt (E)that you must make up by sleeping longer than normal.",
    "choices": [
      "(A): ‘force+목적어+목적격보어‘의 수동 표현인 ’be forced+to부정사‘의 형태로 ’어쩔 수 없이 ~하게 되다‘라는 뜻을 나타낸다.",
      "(B): 명사구 a compound를 수식하는 과거분사구로, 앞에 ‘주격 관계대명사+be동사’인 which[that] is가 생략된 것으로 볼 수 있다.",
      "(C): be의 보어 역할을 하는 명사절을 이끄는 의문사이다.",
      "(D): explain의 목적어인 간접의문문을 이루는 의문부사 또는 선행사 the reason을 포함한 관계부사 why로 볼 수 있으며, the reason that으로 바꾸어 쓸 수 있다.",
      "(E): 목적격 관계대명사이므로 생략할 수 있다."
    ],
    "answer": 3,
    "explanation": "③번 (C)의 what은 '의문사'가 아니라, 선행사를 포함하여 '~하는 것'의 뜻으로 be동사의 보어 역할을 하는 명사절을 이끄는 '관계대명사'입니다."
  },
  {
    "id": "mock2509_q75",
    "passageNo": 33,
    "pdfQNum": 75,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것을 모두 고르면?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is ⓐwhat the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively ⓑprecise; after all, ⓒuse six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is (A)(certain / uncertain), that means the uncertainty in knowing the precise Earth-sun distance ⓓis larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore (B)(depends on / is independent of) what I'm intending to do with it. If I care only about ⓔwhat minute the sun will rise tomorrow, then the number quoted here is (C)(fine / insufficient).\n*significant digit: 유효 숫자",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": [
      1,
      3
    ],
    "explanation": "① ⓐ: what → that (be동사 is 뒤에 완전한 절이 이어지므로 명사절 접속사 that이 되어야 합니다.)\n③ ⓒ: use → using 또는 to use (뒤에 동사 means가 이어지므로 주어 역할을 하는 동명사 using 또는 to부정사 to use가 되어야 합니다.)\n따라서 ①, ③번이 정답입니다."
  },
  {
    "id": "mock2509_q78",
    "passageNo": 34,
    "pdfQNum": 78,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E) 중, 어법상 어색한 것을 모두 고르면?",
    "passage": "... we are actually involved in one of the greatest change (A)projects in human history. ... production of concrete structures and steel elements require amounts of energy (B)that is only possible to produce with fossil energy. Production of solar panels (C)requiring scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, (D)the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which (E)tends to focus just on energy supply requirements.",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": [
      3,
      5
    ],
    "explanation": "③ (C): requiring → requires (문장의 본동사 자리이므로 단수 주어 Production of solar panels에 수일치한 requires가 되어야 합니다.)\n⑤ (E): tends → tend (계속적 용법 관계대명사 which의 선행사는 복수명사구 transition proposals이므로 복수동사 tend로 고쳐야 합니다.)\n따라서 ③, ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q79",
    "passageNo": 35,
    "pdfQNum": 79,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E) 중, 어법상 어색한 것을 모두 고르면?",
    "passage": "Humans for centuries have dreamed of machines (A)where could become intelligent and make ⓐhuman-like decisions. There (B)have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has ⓑwarned against creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked (C)whether machines could think and reason like humans and then ⓒabandoned the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy (D)coined “artificial intelligence,” replacing the ⓓpreviously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that (E)are programming to think like humans — endowed by their creators with ⓔreasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": [
      1,
      5
    ],
    "explanation": "① (A): where → that 또는 which (주어가 없는 불완전한 관계사절을 이끌어 선행사 machines를 수식하므로 주격 관계대명사 that 또는 which로 고쳐야 합니다.)\n⑤ (E): are programming → are programmed (선행사 intelligent machines는 프로그램되는 수동 대상이므로 수동태 are programmed로 고쳐야 합니다.)\n따라서 ①, ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q82",
    "passageNo": 36,
    "pdfQNum": 82,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E)에 대한 설명으로 알맞지 않은 것을 모두 고르면?",
    "passage": "... and stays in its tunnel for much of the summer, (A)meaning that it spends more than 90 percent of its life immobile. ... The tortoise stocks up on water by eating plants and (B)digging holes to collect rain. ... Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it (C)to reabsorb water back into its body. ... park rangers often remind visitors not to stop and (D)help the slow-movers across the road. Tortoises become so terrified when people pick them up (E)that they empty their bladders, losing their precious water reserves.",
    "choices": [
      "(A): 분사구문을 이루는 현재분사로, 의미상 주어는 주절의 주어 The slow-moving creature이다.",
      "(B): 전치사 by의 목적어 자리에서 동명사 eating과 접속사 and로 병렬구조를 이룬다.",
      "(C): allowing it의 목적을 나타내는 부사적용법의 to부정사이다.",
      "(D): remind의 목적격 보어 자리에서 to부정사의 to에 이어진 동사원형 stop과 병렬구조를 이루는 동사원형이다.",
      "(E): ‘너무 ~해서 …하다’라는 뜻의 ‘so+형용사+that+완전한 절’ 구문에서 결과를 나타내는 절을 이끄는 접속사이다."
    ],
    "answer": [
      1,
      3
    ],
    "explanation": "① (A): 의미상 주어는 주어 The slow-moving creature가 아니라 '앞 절 전체 내용'입니다.\n③ (C): allowing it의 목적격 보어로 쓰여 'it이 물을 재흡수하도록 허용하다'라는 5형식 목적격보어 to부정사입니다. 목적을 나타내는 부사적용법이 아닙니다.\n따라서 ①, ③번이 정답입니다."
  },
  {
    "id": "mock2509_q84",
    "passageNo": 37,
    "pdfQNum": 84,
    "type": "MULTI_CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓔ 중, 어법상 어색한 것을 모두 고르면?",
    "passage": "Imagine ⓐthat you are pedalling your bicycle on a level road. ... Because the brakes change your movement, making you ⓑto slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which ⓒtend to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces ⓓacting on you and your bicycle, which also slow you down. ... Another is air resistance, ⓔwhich you can feel, pushing you backwards as you and the bicycle move forwards.",
    "choices": [
      "ⓐ",
      "ⓑ",
      "ⓒ",
      "ⓓ",
      "ⓔ"
    ],
    "answer": [
      2,
      3
    ],
    "explanation": "② ⓑ: to slow → slow (사역동사 의미의 현재분사 making의 목적어 you 뒤에 오는 목적격보어이므로 동사원형 slow로 고쳐야 합니다.)\n③ ⓒ: tend → tends (선행사 the force called friction이 단수명사이므로 주격 관계대명사 which 뒤의 동사도 단수형인 tends로 고쳐야 합니다.)\n따라서 ②, ③번이 정답입니다."
  },
  {
    "id": "mock2509_q86",
    "passageNo": 38,
    "pdfQNum": 86,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 (A)~(F) 중, 어법상 어색한 것의 개수는?",
    "passage": "... without having to fast forward or fast reverse (A)to find it. ... (B)Another highlight of a digital nonlinear system is its random access process that (C)make it hard for an editor to find desired shots or scenes without having to spend time fast forwarding or (D)rewinding videotape. ... the whole piece had to (E)retype. ... If a mistake is made, it is easily (F)deleted and fixed with a few keystrokes ...",
    "choices": [
      "1개",
      "2개",
      "3개",
      "4개",
      "5개"
    ],
    "answer": 2,
    "explanation": "어법상 어색한 것은 총 2개입니다.\n1) (C) make → makes (단수 선행사 its random access process에 수일치하여 makes가 되어야 합니다.)\n2) (E) retype → be retyped (주어 the whole piece가 다시 입력되는 수동 대상이므로 수동태 be retyped로 고쳐야 합니다.)\n따라서 ②번(2개)이 정답입니다."
  },
  {
    "id": "mock2509_q87",
    "passageNo": 39,
    "pdfQNum": 87,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 ⓐ~ⓕ 중, 어법상 어색한 것을 모두 골라 짝지은 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and ⓐdoes morally good ones significantly more often than most. In judging a person not only her actions but also her (A)intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who (B)intentionally prevents harm to others and does not harm them simply because things do not turn out as she intends ⓑare not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression ⓒwhich it is the actual consequences of a person's actions that (C)count toward her ⓓbeing judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally ⓔthinking of as morally (D)good. Of such a person, it may be said ⓕthat she means well; but, contrary to Kant, some (E)motives are necessary before she is regarded as morally good.",
    "choices": [
      "① ⓐ, ⓓ",
      "② ⓒ, ⓔ",
      "③ ⓐ, ⓓ, ⓕ",
      "④ ⓑ, ⓒ, ⓔ",
      "⑤ ⓑ, ⓓ, ⓕ"
    ],
    "answer": 4,
    "explanation": "④번 ⓑ, ⓒ, ⓔ가 어색합니다.\n- ⓑ are → is (주어 A person(단수)에 수일치하여 is가 되어야 합니다.)\n- ⓒ which → that (추상명사 the false impression과 동격을 이루는 동격 접속사 that이어야 합니다.)\n- ⓔ thinking → thought ('A be thought of as B'의 수동태 표현으로 thought of as가 되어야 합니다.)"
  },
  {
    "id": "mock2509_q90",
    "passageNo": 40,
    "pdfQNum": 90,
    "type": "CHOICE",
    "question": "윗글의 밑줄 친 (A)~(E)에 대한 설명으로 알맞지 않은 것은?",
    "passage": "... we establish unconscious hierarchies (A)that reflect our functional relationship to objects ... (B)so that the handle is hidden by the hammer's head. The functional relationship (C)we have with objects creates visual expectations ... through a lens (D)that is similar to the eye. ... but simply (E)serve them up to us with a mechanical indifference.",
    "choices": [
      "(A): unconscious hierarchies를 선행사로 하는 주격 관계대명사이며, which로 바꾸어 쓸 수 있다.",
      "(B): ‘~하도록’이라는 의미로 목적을 나타내는 완전한 절을 이끌고 있으며, in order that으로 바꾸어 쓸 수 있다.",
      "(C): 동사 have의 목적어가 없는 불완전한 절의 형태로 명사구인 The functional relationship을 수식하고 있으며, we 앞에 목적격 관계대명사 which 또는 that이 생략되어 있다.",
      "(D): ‘주격 관계대명사+be동사’인 that is를 생략하고 similar to the eye로 쓸 수 있다.",
      "(E): ‘~을 제공하다’라는 뜻의 구동사 ‘serve ~ up’의 목적어로 confusing details를 가리키는 대명사 them이 쓰였으며, serve up them의 어순도 가능하다."
    ],
    "answer": 5,
    "explanation": "⑤번 (E): 타동사+부사로 이루어진 이어동사(serve ~ up)에서 목적어가 대명사(them)일 때는 반드시 '동사 + 대명사 + 부사'(serve them up)의 어순이어야 하며, serve up them은 불가능합니다."
  }
];

const MOCK_202509_TYPE_C_MAIN_QUESTIONS = [
  {
    "id": "mock2509_q102",
    "passageNo": 29,
    "pdfQNum": 102,
    "type": "CHOICE",
    "question": "다음 글의 주제로 알맞은 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "how to domesticate nervous animals",
      "animal species in the Fertile Crescent",
      "the process of human settlement in the Fertile Crescent",
      "why nervous large mammalian herbivores cannot be domesticated",
      "differences between herbivores and carnivores in coping with danger"
    ],
    "answer": 4,
    "explanation": "큰 포유류 초식동물 중 가젤처럼 긴장하고 빠르게 도망치는 종들은 우리에 갇히면 공황에 빠져 길들이기 어렵다는 내용이므로, ④번 '긴장하는 대형 포유류 초식동물을 길들일 수 없는 이유'가 글의 주제로 가장 적절합니다."
  },
  {
    "id": "mock2509_q103",
    "passageNo": 30,
    "pdfQNum": 103,
    "type": "CHOICE",
    "question": "다음 글의 요지로 알맞은 것은?",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "To protect our lives and property, we need to take greater care with home security.",
      "The more we own, the more we need to engage with others to maintain a proper sense of reality.",
      "Whether resources are scarce or abundant, and whether risks are low or high, we must always cooperate to survive.",
      "Scarce resources and high risks strengthen our tendency to share and cooperate, while abundance and safety reduce it.",
      "Nomadic peoples tend to be less attached to possessions and more willing to share and cooperate than those living in settlements."
    ],
    "answer": 4,
    "explanation": "자원이 부족하고 위험이 클 때 인류는 나누고 협력하는 경향이 강하지만, 반대로 풍요롭고 안전해질수록 담장을 높이고 나눔을 꺼리게 된다는 내용이므로, ④번이 글의 요지로 가장 적절합니다."
  },
  {
    "id": "mock2509_q104",
    "passageNo": 31,
    "pdfQNum": 104,
    "type": "CHOICE",
    "question": "다음 글의 요지로 알맞은 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "Happiness is entirely determined by our mood.",
      "All humans share the same baseline for happiness.",
      "Once people experience joy, they often seek even greater happiness.",
      "Our mood is influenced by experiences, but it is not fixed and returns to a personal baseline of well-being.",
      "Compared to adults, children have simpler expectations for happiness, and their happiness endures longer."
    ],
    "answer": 4,
    "explanation": "우리의 기분은 개별 사건에 의해 영향을 받지만 완전히 흔들리는 것이 아니라 적응을 거쳐 자신의 행복 기준선(baseline)으로 되돌아간다는 내용이므로, ④번이 글의 요지로 적절합니다."
  },
  {
    "id": "mock2509_q105",
    "passageNo": 32,
    "pdfQNum": 105,
    "type": "CHOICE",
    "question": "다음 글의 주제로 알맞은 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "the effect of sleep on metabolism",
      "using adenosine to treat sleeplessness",
      "the reason we cannot get used to less sleep",
      "the effect of sleep deprivation on work performance",
      "the importance of a regular lifestyle for improving sleep quality"
    ],
    "answer": 3,
    "explanation": "깨어 있는 동안 쌓이고 잘 때 분해되는 아데노신의 분자적 피드백 메커니즘 때문에 인체는 필요한 수면량보다 적게 자는 것에 결코 적응할 수 없다는 내용이므로, ③번 '우리가 더 적은 수면에 익숙해질 수 없는 이유'가 적절합니다."
  },
  {
    "id": "mock2509_q106",
    "passageNo": 33,
    "pdfQNum": 106,
    "type": "CHOICE",
    "question": "다음 글의 요지로 알맞은 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "Despite advances in aeronautics, the exact distance between the Earth and the sun remains unknown.",
      "For the public, whether a concept can be understood is more important than numerical accuracy.",
      "There is a conceptual difference between the uncertainty understood by the public and that in science.",
      "The significance of uncertainty is relative, as the precision of a measurement depends on the purpose for which it is used.",
      "The rotation and revolution of the Earth affect the measurement of distances between two points on Earth or in the atmosphere."
    ],
    "answer": 4,
    "explanation": "측정값의 불확실성의 의미는 상대적이며, 그 수치가 어떤 목적으로 사용되는지에 따라 정밀도 평가가 달라진다는 내용이므로, ④번이 글의 요지로 적절합니다."
  },
  {
    "id": "mock2509_q107",
    "passageNo": 34,
    "pdfQNum": 107,
    "type": "CHOICE",
    "question": "다음 글의 제목으로 알맞은 것은?",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "The Paradox of Renewable Energy Development",
      "How Agricultural Reform Will Solve the Climate Crisis",
      "Push Forward the Development of Renewable Energy!",
      "Why We Need Both Fossil Fuels and Renewable Energy",
      "Installing Solar Panels: The Key to Solving Global Warming"
    ],
    "answer": 1,
    "explanation": "지구 온난화를 막기 위해 재생에너지 인프라를 건설할수록 오히려 건설 과정에서 화석 에너지를 더 빨리 소비하게 되어 탄소 감축 노력을 저해한다는 역설을 설명하므로, ①번 '재생에너지 개발의 역설'이 알맞은 제목입니다."
  },
  {
    "id": "mock2509_q108",
    "passageNo": 35,
    "pdfQNum": 108,
    "type": "CHOICE",
    "question": "다음 글의 주제로 알맞은 것은?",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "the influence of Greek mythology on art and science",
      "human fears of human-like machines throughout history",
      "the historical background and development of artificial intelligence",
      "the future advancement of AI’s reasoning and learning capabilities",
      "the need for ethical standards in the development of artificial intelligence"
    ],
    "answer": 3,
    "explanation": "고대 그리스 신화부터 프랑켄슈타인 문학, 1950년 앨런 튜링의 튜링 테스트, 존 매카시의 '인공지능' 명명에 이르기까지 AI의 역사적 배경과 발전 과정을 서술하고 있으므로, ③번이 알맞은 주제입니다."
  },
  {
    "id": "mock2509_q109",
    "passageNo": 36,
    "pdfQNum": 109,
    "type": "CHOICE",
    "question": "다음 글의 제목으로 알맞은 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "How Water Is Stored in the Desert Tortoise Bladder",
      "The Benefits of Hibernation for The Desert Tortoise",
      "Strategies of The Desert Tortoise for Enduring Heat",
      "Why Picking up a Desert Tortoise Can Be Deadly for It",
      "The Desert Tortoise: A Master of Water Waste in Death Valley"
    ],
    "answer": 3,
    "explanation": "사막거북이 데스밸리의 혹독한 더위를 피해 땅속 굴에서 동면/하면을 하고, 정교한 방광을 저장 탱크로 활용하여 수분을 재흡수해 생존하는 전략을 다루므로, ③번 '더위를 견디기 위한 사막거북의 전략들'이 가장 적절합니다."
  },
  {
    "id": "mock2509_q110",
    "passageNo": 37,
    "pdfQNum": 110,
    "type": "CHOICE",
    "question": "다음 글의 제목으로 알맞은 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "How to Pedal a Bicycle More Rapidly on Flat Roads",
      "Friction: The Force that Reduces the Speed of Motion",
      "Air Resistance: The Wind That Pushes Cyclists Backward",
      "Understanding Friction for Developing Brakes That Works Faster",
      "The Relationship Between Brakes and Axles in Generating Friction"
    ],
    "answer": 2,
    "explanation": "자전거 브레이크 작동, 바퀴 축의 마찰, 공기 저항 등 운동의 반대 방향으로 작용하여 물체의 속도를 줄여주는 마찰력의 원리를 설명하므로, ②번 '마찰력: 운동 속도를 줄이는 힘'이 알맞은 제목입니다."
  },
  {
    "id": "mock2509_q111",
    "passageNo": 38,
    "pdfQNum": 111,
    "type": "CHOICE",
    "question": "다음 글의 제목으로 알맞은 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "The Advantages of Nonlinear Editing",
      "Why Linear Editing Is Essential in Writing",
      "Fatal Flaws of Using Nonlinear Editing System",
      "Nonlinear Editing Creates Diverse Special Effects",
      "How linear Editing Changed Video Production Methods"
    ],
    "answer": 1,
    "explanation": "비선형 디지털 편집 시스템이 테이프를 감을 필요 없이 임의 접근이 가능하고 수정 및 추가가 워드프로세서처럼 자유롭다는 장점들을 다루므로, ①번 '비선형 편집의 장점들'이 알맞은 제목입니다."
  },
  {
    "id": "mock2509_q112",
    "passageNo": 39,
    "pdfQNum": 112,
    "type": "CHOICE",
    "question": "다음 글의 요지로 알맞은 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": [
      "Any person who unintentionally avoids doing harm to others is still a morally good person.",
      "The actual results of a person’s actions entirely determine whether or not she is morally good.",
      "It is Intentions, not actual consequences, that matter in judging whether a person is morally good.",
      "The main point of moral judgment lies in how frequently a person does morally good actions compared to others.",
      "When judging whether a person is morally good, both her intention and the results of her action should be considered."
    ],
    "answer": 5,
    "explanation": "사람이 도덕적으로 선한지 판단할 때는 그 사람의 선한 의도뿐만 아니라 실제 행동의 결과도 반드시 함께 고려되어야 한다는 내용이므로, ⑤번이 글의 요지로 알맞습니다."
  },
  {
    "id": "mock2509_q113",
    "passageNo": 40,
    "pdfQNum": 113,
    "type": "CHOICE",
    "question": "다음 글의 제목으로 알맞은 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "choices": [
      "The Functional Basis of Camera Lenses",
      "Our Preconceptions and the Obstruction of Objective Vision",
      "How Functional Relationships with Objects Create Hierarchies",
      "Why We Tend to Perceive Objects in the Way a Camera Does",
      "Correcting Distortions of Reality Caused by Preconceptions"
    ],
    "answer": 2,
    "explanation": "사물에 대한 우리의 기능적 선입견이 세상을 카메라처럼 객관적이고 중립적으로 보는 시각을 방해한다는 내용이므로, ②번 '우리의 선입견과 객관적 시각의 방해'가 알맞은 제목입니다."
  }
];

const MOCK_202509_TYPE_C_DETAIL_QUESTIONS = [
  {
    "id": "mock2509_q124",
    "passageNo": 29,
    "pdfQNum": 124,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "Some large mammalian herbivores flee immediately upon detecting a threat.",
      "There are some mammalian herbivores species that stay in place when they face danger and flee only when necessary.",
      "The nervous species confined within a fence may repeatedly throw themselves against it in an effort to escape, which can ultimately lead to death.",
      "For thousands of years, gazelles were hunted more frequently than any other game animals in certain regions of the Fertile Crescent.",
      "The first settlers of the Fertile Crescent had limited opportunities to domesticate gazelles compared to other mammals."
    ],
    "answer": 5,
    "explanation": "본문에서 비옥한 초승달 지대의 최초 정착민들에게 가젤보다 길들일 기회가 더 많았던 포유류 종은 없었다고 명시(no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles)했으므로, 가젤을 길들일 제한적 기회만 가졌다는 ⑤번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q125",
    "passageNo": 30,
    "pdfQNum": 125,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "When resources are abundant and external dangers are few, our natural tendency to share and cooperate is not simple.",
      "We are prone to share more willingly when we possess more.",
      "Some nomadic groups recognize that they may someday need food and shelter while on the move.",
      "The more we possess, the more elaborate our security grows in order to keep others out.",
      "When our longing for more is paired with diminished contact with ordinary people, we start drifting away from reality."
    ],
    "answer": 2,
    "explanation": "본문에서는 우리가 가진 것이 더 적을 때 기꺼이 나누는 경향이 있고(When we have less, we tend to be more open to sharing), 많이 가질수록 덜 나누려 한다고 했으므로, ②번 '더 많이 소유할 때 더 기꺼이 나누는 경향이 있다'는 내용과 일치하지 않습니다."
  },
  {
    "id": "mock2509_q126",
    "passageNo": 31,
    "pdfQNum": 126,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "Our happiness and unhappiness are not determined solely by each passing moment of our life experience.",
      "Our mood is shaped by our experiences, but we are not swept into entirely new directions by every passing gust.",
      "We adapt to new information and events, eventually restoring our natural baseline of well-being.",
      "Despite the highs and lows, over time we are drawn back to our baseline.",
      "When children receive a toy they want, their happiness lasts forever."
    ],
    "answer": 5,
    "explanation": "아이들이 원하던 장난감을 받았을 때 인생의 첫 몇 분 동안만 그러할 뿐 결국 어른들처럼 적응한다(But then the kids — like adults — adapt)고 했으므로, ⑤번 '아이들의 행복이 영원히 지속된다'는 일치하지 않습니다."
  },
  {
    "id": "mock2509_q127",
    "passageNo": 32,
    "pdfQNum": 127,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "The everyday necessity of sleep appears, in part, to stem from a compound called adenosine.",
      "Adenosine, a naturally occurring chemical, accumulates in the blood as wakefulness is prolonged.",
      "Sleep facilitates the breakdown of adenosine in the body.",
      "Adenosine may play a role in inducing sleep when necessary.",
      "The buildup of adenosine may explain the requirement for extended sleep, even when sleep appears sufficient."
    ],
    "answer": 5,
    "explanation": "아데노신의 축적은 '수면이 충분할 때'가 아니라 '며칠 밤 동안 최적 수면량에 미치지 못했을 때(after several nights of less than optimal amounts of sleep)' 수면 빚을 갚기 위해 더 오래 자야 하는 이유를 설명하므로 ⑤번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q128",
    "passageNo": 33,
    "pdfQNum": 128,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "The relative importance of uncertainty can make it difficult for the public to understand it.",
      "Six significant digits in the Earth–sun distance, 1.49597 × 10⁸ km, indicate the distance has an accuracy of one part in a million.",
      "Even if the next digit of the Earth–sun distance, 1.49597 × 10⁸ km, is uncertain, its accuracy does not change much.",
      "The precision of the cited Earth–sun distance depends on the purpose for which it is used.",
      "It is necessary to know a more accurate distance than 1.49597 × 10⁸ km to send satellites that orbit just above the sun."
    ],
    "answer": 3,
    "explanation": "지구-태양 거리에서 다음 숫자가 불확실하면 그 불확실성은 뉴욕과 시카고 사이의 거리보다 더 커진다고 했으므로, 정확도가 별로 변하지 않는다는 ③번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q129",
    "passageNo": 34,
    "pdfQNum": 129,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "According to Heinberg, building renewable energy infrastructure to prevent global warming is one of the largest transformation projects in human history.",
      "Building renewable energy infrastructure requires not only solar panels and wind turbines but changes in related sectors.",
      "Producing concrete structure and steel components to prevent global warming is impossible without fossil fuels.",
      "Building a renewable energy system is expensive but contributes to reducing global emissions.",
      "Heinberg points out that the cost of building renewable energy infrastructure is rarely taken into account in transition proposals."
    ],
    "answer": 4,
    "explanation": "재생에너지 시스템을 강력히 추진할수록 건설에 화석 에너지를 더 빨리 소비해야 하므로, 이것이 전 세계 배기가스를 줄이려는 노력을 오히려 훼손(an undermining factor)한다고 명시되어 있으므로 ④번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q130",
    "passageNo": 35,
    "pdfQNum": 130,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "As illustrated by the myth of Pandora, myths about robots, automatons, and artificial life have existed since ancient Greece.",
      "The creation of human-like beings and thinking machines has long been a theme in literature.",
      "In 1950, Alan Turing developed a test to evaluate a machine's intelligence and its ability to perform tasks.",
      "The term “artificial intelligence,” coined by John McCarthy, served as a substitute for the earlier term “automata studies.”",
      "Since the term was coined, artificial intelligence has come to include research and practice in creating machines capable of human-like thinking."
    ],
    "answer": 3,
    "explanation": "1950년 앨런 튜링은 기계가 작업 수행 능력이 아니라 '인간처럼 생각하고 추론할 수 있는지, 자율적으로 생각할 수 있는지(measure a machine's intelligence and whether the machines can think autonomously)'를 측정하기 위해 튜링 테스트를 개발했으므로 ③번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q131",
    "passageNo": 36,
    "pdfQNum": 131,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "The desert tortoise can protect itself from Death Valley's extreme heat by staying in its tunnel.",
      "The desert tortoise usually comes out of its tunnel only after even a little rain has fallen.",
      "After rain, the tortoise secures its water supply through feeding on plants and making holes to hold water.",
      "The tortoise, unlike the majority of animals, has a bladder that works as a container to take water back into its body.",
      "Park rangers protect desert tortoises by reminding visitors not to help them cross the road."
    ],
    "answer": 2,
    "explanation": "사막거북은 적은 비(a little rain)가 아니라 '충분히 좋은 비(after a good rain)'가 내린 후에만 지표면으로 나온다고 했으므로 ②번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q132",
    "passageNo": 37,
    "pdfQNum": 132,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "When you stop pedalling your bicycle, no forward force is acting anymore.",
      "Applying the brakes makes you slow down more quickly over a shorter distance.",
      "Brakes push the wheel-rims backwards, creating forward acceleration.",
      "Your bicycle continues to be slowed down by the wheels rubbing on the axles.",
      "Air resistance, another source of friction, pushes against you when the bicycle goes forward."
    ],
    "answer": 3,
    "explanation": "브레이크는 바퀴 테두리를 마찰시켜 운동 반대 방향(뒤쪽)으로 힘을 가해 감속시키는 것이지 앞으로의 가속(forward acceleration)을 만드는 것이 아니므로 ③번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q133",
    "passageNo": 38,
    "pdfQNum": 133,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "Every current editing system is nonlinear, enabling editors to reach any scene instantly.",
      "With nonlinear systems, editors can add special effects like slow motion, wipes and dissolves.",
      "Random access in nonlinear systems lets editors locate desired shots without tape controls.",
      "When changes are made in nonlinear editing, automatic program adjustment is performed.",
      "Linear editing offers greater flexibility than nonlinear editing when it comes to correcting mistakes or adding new information."
    ],
    "answer": 5,
    "explanation": "선형 편집은 실수가 있으면 전체를 다시 타자 쳐야 했던 반면, 비선형 편집은 워드프로세서처럼 몇 번의 키 입력으로 쉽게 수정/삭제할 수 있으므로, 선형 편집이 더 큰 유연성을 제공한다는 ⑤번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q134",
    "passageNo": 39,
    "pdfQNum": 134,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": [
      "To be morally good, a person must do fewer bad actions and more good ones than others.",
      "Evaluating whether a person is morally good involves considering her intentions and motives as well as her actions.",
      "If harm is avoided merely because things do not occur as intended, the person cannot be morally good.",
      "If someone constantly seeks to prevent harm but never accomplishes it, she is not usually seen as morally good.",
      "According to Kant, intentions and consequences are equally required as criteria to determine if a person is morally good."
    ],
    "answer": 5,
    "explanation": "칸트는 결과가 아닌 '의도'를 도덕적 판단 기준으로 보았으나, 필자는 칸트와 달리(contrary to Kant) 도덕적으로 선하다고 여겨지기 위해서는 '어떤 결과도 반드시 필요하다'고 주장하고 있으므로, 칸트가 의도와 결과를 동등하게 요구했다는 ⑤번은 일치하지 않습니다."
  },
  {
    "id": "mock2509_q135",
    "passageNo": 40,
    "pdfQNum": 135,
    "type": "CHOICE",
    "question": "다음 글의 내용과 일치하지 않는 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "choices": [
      "When we see a scene, we deliberately create levels of importance that reflect both our use of objects and immediate goals.",
      "In imagining a hammer, we are inclined to picture it from a “ready for use” angle.",
      "The way we use objects shapes expectations in our vision, which interferes with a camera-like perception.",
      "Photographs frequently surprise us when looked at closely, since they show confusing details without interpretation.",
      "The flat quality of photographs can make certain areas appear as colors and forms that we cannot identify."
    ],
    "answer": 1,
    "explanation": "우리가 장면을 볼 때 위계를 수립하는 것은 의도적인 것(deliberately)이 아니라 '무의식적인 것(unconscious hierarchies)'이라고 본문에 명시되어 있으므로 ①번은 일치하지 않습니다."
  }
];

const MOCK_202509_TYPE_C_BLANK1_QUESTIONS = [
  {
    "id": "mock2509_q145",
    "passageNo": 29,
    "pdfQNum": 145,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to ______________________. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "put to sleep",
      "keep in captivity",
      "keep within a herd",
      "keep focused for long periods",
      "feed with different types of food"
    ],
    "answer": 2,
    "explanation": "위협을 느낄 때 극도로 긴장하고 도망치도록 프로그램된 종들은 우리에 가두면 충격으로 죽거나 울타리에 부딪혀 죽는다는 내용이 뒤에 이어지므로, '가두어 기르기(keep in captivity)' 어렵다는 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q146",
    "passageNo": 30,
    "pdfQNum": 146,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on ______________,  for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "saving",
      "sharing",
      "security",
      "exploration",
      "reproduction"
    ],
    "answer": 2,
    "explanation": "가진 것이 많지 않은 유목민들이 기꺼이 음식을 나누고 환대를 베푸는 이유는 자신도 언젠가 도움을 필요로 하는 여행자가 될 수 있어 생존이 '나눔(sharing)'에 달려 있음을 알기 때문이므로 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q147",
    "passageNo": 31,
    "pdfQNum": 147,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward ____________________ — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "our baseline",
      "others’ needs",
      "others’ attitudes",
      "our subconscious",
      "our survival instinct"
    ],
    "answer": 1,
    "explanation": "물이 고유한 수위를 찾아가듯, 나쁜 소식 후에는 다시 올라가고 좋은 소식 후에는 다시 내려오며 원래의 개인적 기준선으로 돌아간다는 내용이므로, ①번 'our baseline(우리의 기준선)'이 정답입니다."
  },
  {
    "id": "mock2509_q148",
    "passageNo": 32,
    "pdfQNum": 148,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by _______________________ than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "reducing sleep",
      "sleeping longer",
      "exercising harder",
      "consuming caffeine",
      "staying awake longer"
    ],
    "answer": 2,
    "explanation": "충분한 잠을 자지 못해 수면 빚(sleep debt)이 쌓이면, 평소보다 '더 오래 잠으로써(sleeping longer)' 보충해야 한다는 흐름이므로 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q149",
    "passageNo": 33,
    "pdfQNum": 149,
    "type": "CHOICE",
    "question": "다음 글의 빈칸 (A), (B)에 들어갈 알맞은 말로 연결된 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. (A)___________, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ (B)___________ depends on what I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "(A) Yet — (B) nevertheless",
      "(A) Hence — (B) therefore",
      "(A) However — (B) therefore",
      "(A) Moreover — (B) thus",
      "(A) Consequently — (B) nonetheless"
    ],
    "answer": 3,
    "explanation": "(A) 앞선 정밀해 보인다는 내용에 대해 반전을 나타내므로 역접의 However가 알맞습니다.\n(B) 그 불확실성이 매우 크다는 앞 문장의 사실에서 귀결되는 결과이므로 인과의 therefore가 적절합니다."
  },
  {
    "id": "mock2509_q150",
    "passageNo": 34,
    "pdfQNum": 150,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure _____________________________ in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "is shared",
      "is controlled",
      "is exaggerated",
      "is seldom counted",
      "is carefully calculated"
    ],
    "answer": 4,
    "explanation": "전환 제안서들은 주로 에너지 공급 요구량에만 집중하여, 새 에너지 인프라를 건설하는 데 들어가는 화석 연료 비용은 '거의 계산/고려되지 않는다(is seldom counted)'는 내용이므로 ④번이 알맞습니다."
  },
  {
    "id": "mock2509_q151",
    "passageNo": 35,
    "pdfQNum": 151,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with ____________________________.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "charm and beauty",
      "speed and flexibility",
      "reasoning and learning",
      "compassion and empathy",
      "concentration and perseverance"
    ],
    "answer": 3,
    "explanation": "인공지능은 창조자에 의해 인간과 같이 생각하도록 프로그래밍되어 '추론과 학습(reasoning and learning)' 능력을 부여받은 지능적 기계를 만드는 연구이자 실행이므로 ③번이 알맞습니다."
  },
  {
    "id": "mock2509_q152",
    "passageNo": 36,
    "pdfQNum": 152,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as ______________________,  allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "a fuel tank",
      "a cooling fan",
      "a rain shelter",
      "a water purifier",
      "a storage container"
    ],
    "answer": 5,
    "explanation": "사막거북의 방광은 물을 체내로 재흡수할 수 있는 일종의 물탱크, 즉 '저장 용기(a storage container)' 역할을 한다는 흐름이므로 ⑤번이 알맞습니다."
  },
  {
    "id": "mock2509_q153",
    "passageNo": 37,
    "pdfQNum": 153,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting _______________________________,  that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "counter to the course of movement",
      "opposite to the usual role of brakes",
      "toward the center of the bicycle wheels",
      "in the same direction as the movement",
      "parallel to the bicycle’s forward direction"
    ],
    "answer": 1,
    "explanation": "뒤이어 'that is backwards(즉, 뒤쪽으로)'라는 설명이 나오므로, 마찰력은 '운동의 진행 방향과 반대로(counter to the course of movement)' 작용하여 감속시킨다는 ①번이 알맞습니다."
  },
  {
    "id": "mock2509_q154",
    "passageNo": 38,
    "pdfQNum": 154,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is _____________________________ with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "left unchanged",
      "manually corrected",
      "easily deleted and fixed",
      "retyped from the beginning",
      "hard to remove and modify"
    ],
    "answer": 3,
    "explanation": "워드프로세서 프로그램을 사용하는 것과 유사한 비선형 편집에서는 실수가 생겨도 몇 번의 키 입력으로 '쉽게 삭제되고 수정된다(easily deleted and fixed)'는 흐름이므로 ③번이 알맞습니다."
  },
  {
    "id": "mock2509_q155",
    "passageNo": 39,
    "pdfQNum": 155,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her _____________________________ are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": [
      "knowledge and skills",
      "feelings and emotions",
      "intentions and motives",
      "achievements and results",
      "donations and volunteering"
    ],
    "answer": 3,
    "explanation": "사람을 도덕적으로 판단할 때는 행동뿐만 아니라 그녀의 '의도와 동기(intentions and motives)' 역시 관련이 있다는 내용이 이어지므로 ③번이 알맞습니다."
  },
  {
    "id": "mock2509_q156",
    "passageNo": 40,
    "pdfQNum": 156,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world _______________ through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "choices": [
      "partially",
      "relatively",
      "randomly",
      "objectively",
      "emotionally"
    ],
    "answer": 4,
    "explanation": "카메라는 사람의 눈과 달리 세상을 편견 없이 기계적인 렌즈를 통해 '객관적으로(objectively, 원문 impartially)' 기록한다는 흐름이므로 ④번이 알맞습니다."
  }
];

const MOCK_202509_TYPE_C_BLANK2_QUESTIONS = [
  {
    "id": "mock2509_q166",
    "passageNo": 29,
    "pdfQNum": 166,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles. But _______________________________________________________. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "they were too slow to catch gazelles alive",
      "no gazelle species has ever been domesticated",
      "they already had a lot of domesticated livestock",
      "there were many species more beautiful than gazelles",
      "gazelles would have been useless as livestock even if domesticated"
    ],
    "answer": 2,
    "explanation": "정착민들에게 가젤을 길들일 기회가 그 어느 동물보다 많았음에도 불구하고, 역설적으로 '어떤 가젤 종도 길들여진 적이 없다(no gazelle species has ever been domesticated)'는 내용이 와야 하므로 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q167",
    "passageNo": 30,
    "pdfQNum": 167,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, _____________________________________________________________. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "we tend to save what we have",
      "we have a tendency to want to possess more",
      "we tend to be more open to sharing what we have",
      "we may eventually use force to take things from others",
      "we may leave for other places in search of resources"
    ],
    "answer": 3,
    "explanation": "가진 것이 적은 유목민들이 나누는 삶을 실천하는 예시가 바로 이어지므로, '우리는 가진 것이 적을 때 우리가 가진 것을 나누는 데 더 열려 있는 경향이 있다'는 ③번이 알맞습니다."
  },
  {
    "id": "mock2509_q168",
    "passageNo": 31,
    "pdfQNum": 168,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and _______________________________________________________________________. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "return to our personal default level of well-being",
      "grow from the emotions formed through that adaption",
      "come to realize that our happiness depends entirely on them",
      "eventually forget them instead of returning to our state of balance",
      "seek ever greater stimulation and never return to our original level of well-being"
    ],
    "answer": 1,
    "explanation": "새로운 사건이나 감정에 일시적으로 흔들리더라도 결국 '자신만의 기본 행복 수준으로 되돌아간다(return to our personal default level of well-being)'는 내용이므로 ①번이 알맞습니다."
  },
  {
    "id": "mock2509_q169",
    "passageNo": 32,
    "pdfQNum": 169,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, ______________________________________________________________________________________________. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "you can recover from fatigue with minimal sleep",
      "you can't sleep deeply even when you're very tired",
      "you can't become accustomed to getting less sleep than your body needs",
      "you can't concentrate on your studies or work when you don't get enough sleep",
      "you can compensate for the negative effects of sleep debt by taking adenosine supplements"
    ],
    "answer": 3,
    "explanation": "아데노신의 축적과 수면 빚이라는 체내 분자적 피드백 때문에 '당신은 당신의 몸이 필요로 하는 것보다 더 적은 수면을 취하는 것에 익숙해질 수 없다'는 ③번이 정답입니다."
  },
  {
    "id": "mock2509_q170",
    "passageNo": 33,
    "pdfQNum": 170,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on ___________________________________. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "the measurement tool I use",
      "what I'm intending to do with it",
      "where I measured the distance",
      "how many significant digits I consider accurate",
      "the context in which I apply the concept of uncertainty"
    ],
    "answer": 2,
    "explanation": "뒤이어 내일 해가 뜨는 시각만 알고 싶을 때와 태양 바로 위에 위성을 보낼 때 요구되는 정밀도가 전혀 다르다는 예시가 나오므로, '내가 그것으로 무엇을 하려고 의도하는가(what I'm intending to do with it)'에 달려 있다는 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q171",
    "passageNo": 34,
    "pdfQNum": 171,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also _____________________________________________________________________________. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "clear proof that renewable energy is unnecessary",
      "a solution that takes too long to eliminate fossil fuel use",
      "a short-sighted incentive to increase solar panel production",
      "a guarantee of immediate sustainability for limited sectors",
      "an undermining factor for our efforts to cut global emissions"
    ],
    "answer": 5,
    "explanation": "재생에너지 구축 과정에서 화석 에너지를 대량 소모하게 되는 현상은 막대한 비용이 들 뿐만 아니라 '전 세계 배기가스를 감축하려는 우리의 노력을 저해하는 요인(an undermining factor for our efforts to cut global emissions)'이 된다는 ⑤번이 알맞습니다."
  },
  {
    "id": "mock2509_q172",
    "passageNo": 35,
    "pdfQNum": 172,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Humans for centuries have dreamed of ____________________________________________________________________________. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "machines that can work instead of humans",
      "machines that can operate without electricity",
      "machines with the ideal appearance they have long desired",
      "machines that could become intelligent and make human-like decisions",
      "machines that are connected to them and act as extensions of themselves"
    ],
    "answer": 4,
    "explanation": "수 세기 동안 인류는 고대 신화와 문학, 튜링 테스트에 이르기까지 '지능을 갖추고 인간과 같은 결정을 내릴 수 있는 기계(machines that could become intelligent and make human-like decisions)'를 꿈꿔왔으므로 ④번이 알맞습니다."
  },
  {
    "id": "mock2509_q173",
    "passageNo": 36,
    "pdfQNum": 173,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors _________________________________________________________________. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "to rescue the slow-movers from predators on the road",
      "to leave the slow-movers alone when they are on the road",
      "to help the slow-movers quickly move to the other side",
      "not to pour water on the slow-movers when they look thirsty",
      "to take the slow-movers to their home for protection from heat"
    ],
    "answer": 2,
    "explanation": "사람들이 사막거북을 들어 올리면 공포에 질려 소중한 수분을 방광에서 배출해 생존에 치명적이므로, 국립공원 관리인들은 방문객들에게 '도로 위의 느리게 움직이는 거북들을 그냥 내버려 두라(to leave the slow-movers alone)'고 당부한다는 ②번이 정답입니다."
  },
  {
    "id": "mock2509_q174",
    "passageNo": 37,
    "pdfQNum": 174,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly ____________________________________________________.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "the air pushing the cart forwards",
      "the friction force making the cart accelerate",
      "the axles rubbing on the body as they rotate",
      "the wheels creating extra speed as they spin more quickly",
      "the wheel-rims supporting the cart and keeping it upright"
    ],
    "answer": 3,
    "explanation": "카트와 같은 주변 물체에 마찰력 원리를 적용할 때 마찰을 일으키는 주요 원인은 '바퀴 축이 회전하면서 본체와 마찰하는 것(the axles rubbing on the body as they rotate)'이므로 ③번이 알맞습니다."
  },
  {
    "id": "mock2509_q175",
    "passageNo": 38,
    "pdfQNum": 175,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added ________________________________________________________________________. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "only the new information could be inserted without difficulty",
      "any error in linear editing was corrected automatically by the system",
      "editors could simply delete any mistake with a backspace key",
      "modifications were made as conveniently as in a word processor",
      "the whole document was required to be typed again from the beginning"
    ],
    "answer": 5,
    "explanation": "타자기로 문서를 작성하는 선형 편집에서는 실수나 수정이 생기면 '문서 전체를 처음부터 다시 작성해야 했다(the whole document was required to be typed again from the beginning)'는 대조 내용이 들어가야 하므로 ⑤번이 알맞습니다."
  },
  {
    "id": "mock2509_q176",
    "passageNo": 39,
    "pdfQNum": 176,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, ______________________________________ before she is regarded as morally good.",
    "choices": [
      "intentions alone are always sufficient",
      "the frequency of her actions is really important",
      "moral evaluation relies only on her good deeds",
      "good intentions must accompany actual good results",
      "success never affects whether she is morally good"
    ],
    "answer": 4,
    "explanation": "해를 막으려고 항상 노력하지만 결코 해내지 못하는 사람은 도덕적으로 선하다고 인정받기 어렵고 칸트와 달리 '선한 의도는 실제의 선한 결과를 수반해야만 한다(good intentions must accompany actual good results)'는 내용이므로 ④번이 알맞습니다."
  },
  {
    "id": "mock2509_q177",
    "passageNo": 40,
    "pdfQNum": 177,
    "type": "CHOICE",
    "question": "다음 글의 빈칸에 들어갈 말로 알맞은 것은?",
    "passage": "Vision ________________________________________________________________________. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "choices": [
      "is free from the influence of our expectations",
      "depends solely on an unbiased view of reality",
      "works exactly like a camera lens without analysis",
      "is controlled by the connection to our permanent priorities",
      "is affected by the prior concepts shaping our view of reality"
    ],
    "answer": 5,
    "explanation": "인간의 시각은 사물에 대한 우리의 선입견과 기능적 관계에 의해 위계를 형성하고 영향을 받는다는 글의 첫 문장이므로, '우리의 현실 관점을 형성하는 이전의 개념들(선입견)에 의해 영향을 받는다(is affected by the prior concepts shaping our view of reality)'는 ⑤번이 알맞습니다."
  }
];

const MOCK_202509_TYPE_C_IMPLIED_IRRELEVANT_QUESTIONS = [
  {
    "id": "mock2509_q184",
    "passageNo": 31,
    "pdfQNum": 184,
    "type": "CHOICE",
    "question": "다음 글의 밑줄 친 ⓐwe are not blown in a completely new direction by each gust of wind가 의미하는 바로 알맞은 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, ⓐwe are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "We are unaffected by any experiences or events in our lives.",
      "Our baseline happiness is completely altered by each passing event.",
      "Our moods change from time to time, but our personalities remain stable.",
      "We are influenced by events and experiences and gradually develop different personalities.",
      "We are not entirely swayed by each event and eventually return to our baseline emotional state."
    ],
    "answer": 5,
    "explanation": "우리의 기분이 매 순간의 사건에 의해 일시적으로 변할 수는 있지만, 바람에 날려 완전히 다른 방향으로 가버리는 것이 아니라 결국 자신의 행복 기준선으로 되돌아온다는 맥락이므로 ⑤번이 알맞습니다."
  },
  {
    "id": "mock2509_q185",
    "passageNo": 32,
    "pdfQNum": 185,
    "type": "CHOICE",
    "question": "다음 글의 밑줄 친 ⓐa lack of sleep catches up with you가 의미하는 바로 알맞은 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, ⓐa lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "reducing sleep allows you to do more activities",
      "a lack of sleep interferes with adenosine accumulation",
      "we are overwhelmed by the need for sleep and can't help but sleep",
      "if you continue to endure a lack of sleep, you eventually get used to sleeping less",
      "you should find an alternative way to break down adenosine rather than sleeping"
    ],
    "answer": 3,
    "explanation": "수면 부족이 계속되면 아데노신이 축적되고 수면 빚이 쌓여 결국 압도적인 수면 욕구에 의해 잠을 잘 수밖에 없게 된다는 의미이므로 ③번 '수면 필요에 압도되어 잠을 잘 수밖에 없다'가 알맞습니다."
  },
  {
    "id": "mock2509_q186",
    "passageNo": 40,
    "pdfQNum": 186,
    "type": "CHOICE",
    "question": "다음 글의 밑줄 친 (A)simply serve them up to us with a mechanical indifference가 의미하는 바로 알맞은 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but (A)simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "choices": [
      "hide unrecognizable shapes, avoiding colors that might appear confusing",
      "interpret puzzling shapes, giving symbolic meaning to flat colors and shapes",
      "explain confusing details with clarity and care, instead of providing them indifferently",
      "present confusing details mechanically, in a neutral way, without adding human interpretation",
      "filter confusing elements before showing them, providing viewers with a simplified version of reality"
    ],
    "answer": 4,
    "explanation": "사진은 인간의 시각처럼 선입견이나 위계를 반영해 해석하지 않고, 복잡하고 혼란스러운 세부사항들을 기계적이고 중립적인 방식으로 그대로 제시한다는 뜻이므로 ④번이 알맞습니다."
  },
  {
    "id": "mock2509_q188",
    "passageNo": 30,
    "pdfQNum": 188,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 흐름상 관계없는 것은?",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few.\n(A) When we have less, we tend to be more open to sharing what we have. (B) Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. (C) Historically, they have chosen nomadic lifestyles to find food or resources along animal herds for survival, but modern nomads choose them for reasons such as adventure, personal growth, and remote work. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. (D) It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share. (E) Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 3,
    "explanation": "글 전체는 자원의 희소성과 풍요가 나눔과 협력에 미치는 역설적 영향을 다루고 있으므로, 현대 유목민의 선택 이유(모험, 원격 근무 등)를 설명한 (C)는 흐름과 관계없습니다."
  },
  {
    "id": "mock2509_q189",
    "passageNo": 36,
    "pdfQNum": 189,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 흐름상 관계없는 것은?",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. (A) The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. (B) It is very sensitive to the soil type, owing to its reliance on its tunnel for a shelter. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. (C) Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. (D) And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. (E) Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "사막거북이 혹독한 더위를 극복하는 생존 방식(비 온 후 수분 섭취, 정교한 방광을 통한 수분 재흡수)을 다루는 글이므로, 토양의 종류에 민감하다는 내용인 (B)는 글의 흐름과 무관합니다."
  },
  {
    "id": "mock2509_q190",
    "passageNo": 37,
    "pdfQNum": 190,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 흐름상 관계없는 것은?",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. (A) This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. (B) Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. (C) One of these is friction in the wheels rubbing on the axles. (D) The axles are adjustable depending on the type of the wheels. (E) Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 4,
    "explanation": "자전거와 탑승자에게 작용하는 다양한 마찰력(브레이크 마찰, 차축 마찰, 공기 저항)의 감속 원리를 설명하고 있으므로, 바퀴 종류에 따른 축의 조절 가능성을 언급한 (D)는 흐름과 무관합니다."
  },
  {
    "id": "mock2509_q191",
    "passageNo": 38,
    "pdfQNum": 191,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 흐름상 관계없는 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. (A) Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. (B) With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. (C) Linear editing was like composing a paper on a typewriter. (D) If a mistake was made or new information needed to be added the whole piece had to be retyped. (E) News departments often still use linear editing because they can start editing tape and feeds from the field as soon as they are received. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 5,
    "explanation": "선형 편집(타자기)과 비선형 편집(워드프로세서)을 비교하며 비선형 편집의 편리함과 장점을 설명하는 글이므로, 뉴스 부서가 여전히 선형 편집을 사용하는 사례를 언급한 (E)는 흐름에서 벗어납니다."
  },
  {
    "id": "mock2509_q192",
    "passageNo": 39,
    "pdfQNum": 192,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 흐름상 관계없는 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. (A) A morally good person must intend to do morally good actions and intend to avoid morally bad ones. (B) Moral goodness also relies on luck since fortunate accidents reflect a person’s real character. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. (C) Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. (D) A person who always tries to prevent harm but never does, is not generally thought of as morally good. (E) Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "도덕적 판단에서 의도와 실제 결과가 모두 중요하다는 논지에서, 도덕적 선함이 행운에 의존한다거나 우연한 사고가 본성을 반영한다는 (B)는 글의 전체 흐름과 관계없습니다."
  }
];

const MOCK_202509_TYPE_C_ORDER_QUESTIONS = [
  {
    "id": "mock2509_q201",
    "passageNo": 29,
    "pdfQNum": 201,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat.\n\n(A) But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n(B) Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape.\n(C) That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles.\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 3,
    "explanation": "주어진 글(위협에 즉각 도망치는 종) 뒤에 대조적으로 느리고 무리 짓는 다른 종들과 긴장하는 종들의 포획 어려움을 설명하는 (B)가 오고, 그 예시로 가젤을 드는 (C)가 이어진 후, 가젤이 결국 길들여지지 못한 이유를 부연하는 (A)로 마무리되는 (B)-(C)-(A)가 가장 자연스럽습니다."
  },
  {
    "id": "mock2509_q202",
    "passageNo": 31,
    "pdfQNum": 202,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad.\n\n(A) There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up.\n(B) While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being.\n(C) This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 2,
    "explanation": "주어진 글에 이어 경험이 기분에 영향을 미치더라도 바람에 휩쓸리지 않고 기본 수준으로 돌아간다는 (B)가 오고, 물처럼 기준선으로 끌어당겨진다는 상술 (A)가 온 뒤, 이를 아이들의 장난감 예시(This tendency)로 입증하는 (C)가 이어지는 (B)-(A)-(C)가 적절합니다."
  },
  {
    "id": "mock2509_q203",
    "passageNo": 32,
    "pdfQNum": 203,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep.\n\n(A) Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n(B) This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine.\n(C) Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 3,
    "explanation": "주어진 글의 수면 욕구를 'This daily drive for sleep'으로 받아 아데노신을 소개하는 (B)가 오고, 'Thus, this molecule'로 이어 아데노신의 축적과 수면 빚을 설명하는 (C)가 온 후, 이를 'Because of such built-in molecular feedback'으로 요약하며 적응 불가를 결론짓는 (A)로 끝나는 (B)-(C)-(A)가 알맞습니다."
  },
  {
    "id": "mock2509_q204",
    "passageNo": 33,
    "pdfQNum": 204,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative.\n\n(A) If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n(B) However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it.\n(C) Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so.\n*significant digit: 유효 숫자",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 5,
    "explanation": "주어진 글의 불확실성의 상대성에 대한 예시로 지구-태양 거리를 드는 (C)가 먼저 오고, However로 반전하여 다음 자릿수의 큰 불확실성과 용도 의존성을 설명하는 (B)가 온 뒤, 용도에 따른 구체적 차이(일출 시각 vs 인공위성 궤도)를 보여주는 (A)가 이어지는 (C)-(B)-(A)가 정답입니다."
  },
  {
    "id": "mock2509_q205",
    "passageNo": 34,
    "pdfQNum": 205,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes.\n\n(A) Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process.\n(B) This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy.\n(C) This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 2,
    "explanation": "주어진 글의 변화 과정을 'This transformation'으로 받아 화석 연료의 필수성을 콘크리트/철강 예시로 드는 (B)가 오고, 태양광 패널 생산의 화석연료 사용과 빠른 에너지 소비를 설명하는 (A)가 온 후, 'This is not only expensive...'로 받으며 배기가스 감축 노력의 저해를 지적하는 (C)로 이어지는 (B)-(A)-(C)가 자연스럽습니다."
  },
  {
    "id": "mock2509_q206",
    "passageNo": 35,
    "pdfQNum": 206,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions.\n\n(A) There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein).\n(B) A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n(C) In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously.\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 1,
    "explanation": "인류가 지능형 기계를 꿈꿔왔다는 주어진 글 뒤에 고대 그리스 신화와 프랑켄슈타인 등 역사적 사례를 드는 (A)가 오고, 1950년 튜링 테스트를 개발한 (C)가 온 후, 몇 년 뒤 존 매카시가 AI를 명명한 (B)로 이어지는 시간적 순서인 (A)-(C)-(B)가 알맞습니다."
  },
  {
    "id": "mock2509_q207",
    "passageNo": 38,
    "pdfQNum": 207,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves.\n\n(A) Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n(B) Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped.\n(C) Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically.\n*linear: 선형의",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 5,
    "explanation": "특수 효과에 이어 'Another highlight'로 비선형 시스템의 또 다른 장점인 임의 접근과 길이 자동 조정을 설명하는 (C)가 먼저 오고, 대조를 위해 타자기와 같은 선형 편집의 한계를 든 (B)가 온 뒤, 'Nonlinear editing, on the other hand'로 워드프로세서 같은 비선형 편집의 편리성을 결론짓는 (A)가 이어지는 (C)-(B)-(A)가 정답입니다."
  },
  {
    "id": "mock2509_q208",
    "passageNo": 39,
    "pdfQNum": 208,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant.\n\n(A) A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.\n(B) A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good.\n(C) Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important.",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 3,
    "explanation": "도덕적 판단에서 의도와 동기가 관련된다는 주어진 글에 이어 선한 행동을 의도해야 하며 비의도적으로 해를 면한 것은 선하지 않다는 (B)가 오고, 이를 슬랩스틱 영화의 'this kind of situation'으로 받아 실제 결과도 중요하다고 전환하는 (C)가 온 뒤, 의도만 있고 결과가 없는 사람을 지적하는 (A)로 이어지는 (B)-(C)-(A)가 올바릅니다."
  },
  {
    "id": "mock2509_q209",
    "passageNo": 40,
    "pdfQNum": 209,
    "type": "CHOICE",
    "question": "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities.\n\n(A) The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.” The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye.\n(B) When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas that appear as unrecognizable colors and shapes.\n(C) For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head.",
    "choices": [
      "(A) - (C) - (B)",
      "(B) - (A) - (C)",
      "(B) - (C) - (A)",
      "(C) - (A) - (B)",
      "(C) - (B) - (A)"
    ],
    "answer": 4,
    "explanation": "기능적 관계와 우선순위에 따른 무의식적 위계에 대한 예시로 망치를 떠올리는 (C)가 먼저 오고, 이러한 기능적 관계가 카메라처럼 보는 것을 방해한다는 (A)가 온 뒤, 카메라와 사진의 기계적 중립성과 평면성을 설명하는 (B)로 이어지는 (C)-(A)-(B)가 적절합니다."
  }
];

const MOCK_202509_TYPE_C_INSERT_QUESTIONS = [
  {
    "id": "mock2509_q217",
    "passageNo": 29,
    "pdfQNum": 217,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles.",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. (A) Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. (B) Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. (C) That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. (D) But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour! (E)\n*herbivore: 초식동물 **herd: 무리",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 4,
    "explanation": "주어진 문장은 최초 정착민들에게 가젤보다 길들일 기회가 더 많았던 동물은 없었다는 내용이므로, 가젤이 가장 빈번하게 사냥된 종이었다는 문장 뒤이자, 역접의 But으로 시작하여 '그러나 어떤 가젤도 길들여지지 못했다'는 문장 앞인 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q218",
    "passageNo": 30,
    "pdfQNum": 218,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Ironically, the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share.",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. (A) When we have less, we tend to be more open to sharing what we have. (B) Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. (C) If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. (D) It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. (E) Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 5,
    "explanation": "유목 부족들이 적게 가졌을 때 기꺼이 나누는 삶의 방식을 설명한 뒤, 아이러니하게도 더 많이 가질수록 담장을 높이고 덜 나누려 한다는 역설적 전환 문장이므로 (E)에 들어가는 것이 가장 알맞습니다."
  },
  {
    "id": "mock2509_q219",
    "passageNo": 31,
    "pdfQNum": 219,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives.",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. (A) While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. (B) As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. (C) There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. (D) And for the first few minutes of the rest of their lives, they are. (E) But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 4,
    "explanation": "주어진 문장에 나오는 아이들의 장난감 기쁨과 평생 행복할 것이라는 믿음에 이어, (D) 뒤의 문장 'And for the first few minutes of the rest of their lives, they are.'에서 'they are'가 주어진 문장의 'they will be happy'를 대동사로 받고 있으므로 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q220",
    "passageNo": 32,
    "pdfQNum": 220,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] This natural chemical builds up in your blood as time awake increases.",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. (A) This daily drive for sleep appears to be due, in part, to a compound known as adenosine. (B) While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. (C) An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. (D) Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. (E) Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "주어진 문장의 'This natural chemical'은 바로 앞 문장 (A) 뒤에서 소개된 'a compound known as adenosine'을 가리키며, 자는 동안 아데노신을 분해한다는 내용과 대조를 이루므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q221",
    "passageNo": 33,
    "pdfQNum": 221,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it.",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. (A) Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. (B) This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. (C) However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! (D) If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. (E) If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 4,
    "explanation": "주어진 문장은 인용된 숫자가 정확한지의 여부는 사용 의도에 따라 결정된다는 결론을 제시하므로, 앞서 불확실성의 크기를 설명한 문장 뒤이자 그 구체적 용도 차이(일출 시간 vs 인공위성)를 예시로 드는 문장 앞인 (D)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q222",
    "passageNo": 34,
    "pdfQNum": 222,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process.",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. (A) This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. (B) Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. (C) This is not only expensive, but also an undermining factor for our efforts to cut global emissions. (D) Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements. (E)\n*excavate: 발굴하다",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 3,
    "explanation": "태양광 패널 생산에 필요한 광물 발굴에 화석 연료가 다시 사용된다는 (B) 뒤에서 인과의 Thus를 통해 '우리가 더 밀어붙일수록 화석 에너지를 더 빨리 사용해야 한다'는 결론을 맺고, 이를 (C) 뒤의 'This is not only expensive...'가 받으므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q223",
    "passageNo": 35,
    "pdfQNum": 223,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein).",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. (A) There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). (B) In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. (C) A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” (D) Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning. (E)\n*automaton: 자동 장치 **endow: 부여하다",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "주어진 문장은 'Likewise(마찬가지로)'로 시작하여 문학에서 생각하는 기계를 꿈꿔온 역사(프랑켄슈타인)를 언급하므로, 신화 속 로봇/인공 생명체를 언급한 (A) 뒤이자, 1950년 튜링 테스트라는 현대 과학적 시도로 넘어가는 (B) 앞인 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q224",
    "passageNo": 36,
    "pdfQNum": 224,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder.",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. (A) The tortoise stocks up on water by eating plants and digging holes to collect rain. (B) Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. (C) Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. (D) And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. (E) Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "비가 온 후 식물을 먹고 빗물을 모아 수분을 비축한다는 1차적 수분 확보 방법 뒤에서, '하지만 장기 동면 동안 수분을 유지하기 위해 매우 정교한 방광에 의존한다'며 방광의 역할을 처음 제시하므로 (B)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q225",
    "passageNo": 37,
    "pdfQNum": 225,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down.",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. (A) Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. (B) This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. (C) One of these is friction in the wheels rubbing on the axles. (D) Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. (E) When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 3,
    "explanation": "브레이크 마찰력에 대한 설명을 마친 뒤, '브레이크를 잡지 않아도 다른 마찰력들이 존재한다'고 전환한 후, (C) 뒤에서 'One of these(그 중 하나)'로 차축 마찰을 소개하고 있으므로 (C)에 들어가야 합니다."
  },
  {
    "id": "mock2509_q226",
    "passageNo": 40,
    "pdfQNum": 226,
    "type": "CHOICE",
    "question": "다음 글의 (A)~(E) 중, 주어진 문장이 들어갈 알맞은 곳은?\n\n[주어진 문장] The functional relationship we have with objects creates visual expectations that interfere with our ability to see “like a camera.”",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. (A) One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. (B) The camera, like the human eye, sees only shapes and colors. (C) It documents the world impartially through a lens that is similar to the eye. (D) When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. (E) And because of their flatness, photographs often contain areas that appear as unrecognizable colors and shapes.",
    "choices": [
      "(A)",
      "(B)",
      "(C)",
      "(D)",
      "(E)"
    ],
    "answer": 2,
    "explanation": "망치 예시를 통해 사물과의 기능적 관계를 설명한 뒤, 이것이 카메라처럼 보는 능력을 방해한다고 결론지으면서, 뒤이어 'The camera, like the human eye...'로 카메라의 시각을 설명하는 문장이 이어지므로 (B)에 들어가야 합니다."
  }
];

const MOCK_202509_TYPE_C_SUMMARY_QUESTIONS = [
  {
    "id": "mock2509_q233",
    "passageNo": 31,
    "pdfQNum": 233,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] Although our mood is affected by momentary experiences, we naturally (A)____________ them and return to our baseline level of well-being, as illustrated by children’s (B)____________ joy when receiving toys.",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, we adjust — to new information and events both good and bad — and return to our personal default level of well-being. There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "choices": [
      "(A) exclude — (B) great",
      "(A) boast of — (B) long-lasting",
      "(A) show off — (B) short-lived",
      "(A) adapt to — (B) brief",
      "(A) adjust to — (B) enduring"
    ],
    "answer": 4,
    "explanation": "비록 기분이 순간적 경험에 영향받지만 우리는 자연스럽게 그것에 적응하고(adapt to) 기본 행복 수준으로 돌아가며, 이는 장난감을 받을 때 아이들의 잠깐의/일시적인(brief) 기쁨에서 잘 드러나므로 ④번이 정답입니다."
  },
  {
    "id": "mock2509_q234",
    "passageNo": 32,
    "pdfQNum": 234,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] The need for sleep is caused by adenosine, which (A)______________ while you are awake and breaks down during sleep, which may explain why (B)______________ eventually forces longer sleep and why the body cannot adapt to getting less sleep than it needs.",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, you can't become accustomed to getting less sleep than your body needs. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "choices": [
      "(A) increases — (B) oversleeping",
      "(A) degrades — (B) sleep loss",
      "(A) is generated — (B) light sleep",
      "(A) is eliminated — (B) excessive sleep",
      "(A) accumulates — (B) sleep deprivation"
    ],
    "answer": 5,
    "explanation": "수면 욕구는 깨어 있는 동안 축적되고(accumulates) 잘 때 분해되는 아데노신에 의해 발생하며, 이는 수면 부족(sleep deprivation)이 결국 더 긴 수면을 강제하는 이유를 설명하므로 ⑤번이 알맞습니다."
  },
  {
    "id": "mock2509_q235",
    "passageNo": 34,
    "pdfQNum": 235,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] Richard Heinberg argues that transitioning to renewable energy requires infrastructure changes that (A)______________ fossil fuels, which actually undermines efforts to reduce emissions, but this tends to be (B)______________ in transition proposals.",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process. This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "choices": [
      "(A) reduces — (B) ignored",
      "(A) needs — (B) highlighted",
      "(A) relies on — (B) considered",
      "(A) decreases — (B) emphasized",
      "(A) depends on — (B) overlooked"
    ],
    "answer": 5,
    "explanation": "재생에너지로의 전환은 화석 연료에 의존하는(depends on / relies on) 인프라 변화를 필요로 하며 이는 배기가스 감축 노력을 약화시키지만, 전환 제안서에서는 흔히 간과되는(overlooked / seldom counted) 경향이 있으므로 ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q236",
    "passageNo": 36,
    "pdfQNum": 236,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] To avoid extreme heat, the desert tortoise stays in its tunnel during the summer and only comes out after a good rain to (A)____________ water, reabsorbing the (B)____________ water through its bladder during winter hibernation.",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "choices": [
      "(A) release — (B) wasted",
      "(A) empty — (B) stored",
      "(A) gain — (B) wasted",
      "(A) pour — (B) infinite",
      "(A) secure — (B) stored"
    ],
    "answer": 5,
    "explanation": "극심한 더위를 피하기 위해 사막거북은 여름 동안 굴 속에 머물다가 충분한 비가 온 후에만 나와 수분을 확보하고(secure), 겨울 동면 동안 방광을 통해 저장된(stored) 수분을 재흡수하므로 ⑤번이 정답입니다."
  },
  {
    "id": "mock2509_q237",
    "passageNo": 37,
    "pdfQNum": 237,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] In order to lower the speed of the bicycle more (A)____________, in a shorter distance, friction from brakes, rubbing axles, and the air works (B)___________________ on you and the bicycle, and this principle can be applied to objects like a cart.",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by acting in the direction opposite to movement, that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "choices": [
      "(A) abruptly — (B) backwards",
      "(A) gradually — (B) in reverse",
      "(A) swiftly — (B) forwards",
      "(A) slowly — (B) ahead",
      "(A) suddenly — (B) sideways"
    ],
    "answer": 1,
    "explanation": "더 짧은 거리에서 자전거 속도를 더 급작스럽게(abruptly / suddenly) 줄이기 위해, 브레이크와 축, 공기 마찰은 자전거와 사람에게 뒤쪽으로(backwards) 작용하므로 ①번이 알맞습니다."
  },
  {
    "id": "mock2509_q238",
    "passageNo": 38,
    "pdfQNum": 238,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] Nonlinear editing (A)____________ various special effects, provides random access to desired scenes, and lets scenes be easily added anywhere, making additions and modifications (B)____________ than in linear editing.",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "choices": [
      "(A) enables — (B) more troublesome",
      "(A) allows — (B) less demanding",
      "(A) limits — (B) more complex",
      "(A) offers — (B) less efficient",
      "(A) restricts — (B) simpler"
    ],
    "answer": 2,
    "explanation": "비선형 편집은 다양한 특수 효과를 가능하게 하고(allows / enables), 원하는 장면에 대한 임의 접근을 제공하며 수정을 선형 편집보다 덜 부담스럽고 수월하게(less demanding) 만들어 주므로 ②번이 알맞습니다."
  },
  {
    "id": "mock2509_q239",
    "passageNo": 39,
    "pdfQNum": 239,
    "type": "CHOICE",
    "question": "다음 글을 아래와 같이 요약할 때, 빈칸 (A), (B)에 들어갈 말로 알맞게 연결된 것은?\n\n[요약문] Whether a person is morally good depends on both her good (A)____________, not by chance, and the good (B)____________.",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "choices": [
      "(A) motives — (B) plans",
      "(A) desires — (B) consequences",
      "(A) talents — (B) attempts",
      "(A) intentions — (B) results",
      "(A) skills — (B) processes"
    ],
    "answer": 4,
    "explanation": "사람이 도덕적으로 선한지는 우연이 아닌 그녀의 선한 의도(intentions)와 실제 나타난 좋은 결과(results) 둘 다에 달려 있으므로 ④번이 정답입니다."
  }
];

const MOCK_202509_TYPE_D_ESSAY_QUESTIONS = [
  {
    "id": "mock2509_q267",
    "passageNo": 29,
    "pdfQNum": 267,
    "type": "ESSAY",
    "question": "다음 글의 밑줄 친 우리말에 맞도록 <보기>의 단어들을 어법과 문맥에 맞게 모두 사용하여 완전한 영어 문장으로 완성하시오.\n\n[우리말] 그 지역의 최초 정착민들이 가젤보다 가축화할 기회가 더 많았던 포유류 종은 없다.\n\n<보기>\n[ settled / of / had / that / domesticate / opportunity / mammal / than / the / no / peoples / area / to / more / is / first / species / There / gazelles ]\n\n<조건>\n- <보기>에 주어진 단어만을 모두 사용할 것 (단어 추가나 어형 변형 불가)\n- 대소문자 및 띄어쓰기를 정확하게 작성할 것",
    "passage": "Big mammalian herbivore species react to danger from predators or humans in different ways. Some species are nervous, fast, and programmed for instant flight when they perceive a threat. Other species are slower, less nervous, seek protection in herds, stand their ground when threatened, and don’t run until necessary. Naturally, the nervous species are difficult to keep in captivity. If put into an enclosure, they are likely to panic, and either die of shock or hit themselves repeatedly to death against the fence in their attempts to escape. That’s true, for example, of gazelles, which for thousands of years were the most frequently hunted game species in some parts of the Fertile Crescent. [우리말 밑줄: 그 지역의 최초 정착민들이 가젤보다 가축화할 기회가 더 많았던 포유류 종은 없다.] But no gazelle species has ever been domesticated. Just imagine trying to herd an animal that runs away, blindly hits itself against walls, can leap up to nearly 30 feet, and can run at a speed of 50 miles per hour!\n*herbivore: 초식동물 **herd: 무리",
    "answer": "There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles.",
    "acceptableAnswers": [
      "There is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles",
      "there is no mammal species that the first settled peoples of that area had more opportunity to domesticate than gazelles"
    ],
    "keywords": [
      "no mammal species",
      "first settled peoples",
      "more opportunity",
      "domesticate than gazelles"
    ],
    "explanation": "'There is no + 명사 + that ... had more opportunity to 동사원형 than ~'의 부정 주어 비교급 구문으로, '그 지역의 최초 정착민들에게 가젤보다 가축화할 기회가 더 많았던 포유류 종은 없다'라는 최상급 의미를 나타냅니다."
  },
  {
    "id": "mock2509_q271",
    "passageNo": 30,
    "pdfQNum": 271,
    "type": "ESSAY",
    "question": "다음 글의 내용을 바탕으로 빈칸에 들어갈 말을 <보기>의 단어를 활용하여 <조건>에 맞게 완성하시오.\n\n[빈칸] Ironically, _________________________________________________________________.\n\n[우리말] 역설적이게도 우리가 더 많이 가질수록 우리의 울타리는 더 커지고, 사람들을 멀리하기 위한 우리의 보안은 더 정교해지며, 우리는 덜 나누고 싶어 한다.\n\n<보기>\n[ have / big / fence / sophisticated / security / people / keep / away / little / want / share ]\n\n<조건>\n- 'The + 비교급 ..., the + 비교급 ...' 병렬 구조를 사용할 것\n- <보기>의 단어는 필요시 어형을 변형하여 적절한 형태로 쓸 것",
    "passage": "For a species born in a time when resources were limited and dangers were great, our natural tendency to share and cooperate is complicated when resources are plenty and outside dangers are few. When we have less, we tend to be more open to sharing what we have. Certain nomadic tribes don’t have much, yet they are happy to share because it is in their interest to do so. If you happen upon them in your travels, they will open up their homes and give you their food and hospitality. It’s not just because they are nice people; it’s because their survival depends on sharing, for they know that they may be the travelers in need of food and shelter another day. Ironically, [빈칸: _________________________________________________________________] Our desire for more, combined with our reduced physical interaction with the “common folk,” starts to create a disconnection or blindness to reality.\n*nomadic: 유목의 **hospitality: 환대",
    "answer": "the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share",
    "acceptableAnswers": [
      "the more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share.",
      "The more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share",
      "The more we have, the bigger our fences, the more sophisticated our security to keep people away and the less we want to share."
    ],
    "keywords": [
      "the more we have",
      "the bigger our fences",
      "the more sophisticated our security",
      "the less we want to share"
    ],
    "explanation": "'The + 비교급 ~, the + 비교급 ...' 구문 세 개가 병렬된 형태로: the more we have(더 많이 가질수록), the bigger our fences(울타리는 더 커지고), the more sophisticated our security to keep people away(보안은 더 정교해지고), and the less we want to share(더 적게 나누고 싶어 한다)가 정답입니다."
  },
  {
    "id": "mock2509_q273",
    "passageNo": 31,
    "pdfQNum": 273,
    "type": "ESSAY",
    "question": "다음 글의 밑줄 친 우리말에 맞도록 <보기>의 단어들을 문맥과 어법에 맞게 모두 사용하여 문장을 완성하시오.\n\n[우리말] 인간으로서 우리는 좋고 나쁜 새로운 정보와 사건에 적응하고, 우리의 개인적인 기준 수준의 행복으로 되돌아간다.\n\n<보기>\n[ we / to / our / and / adjust / return / personal / events / both / level / of / well-being / bad / default / information / good / new / and ]\n\n<조건>\n- 주어진 단어를 빠짐없이 한 번씩만 사용할 것\n- 'As humans, ' 바로 뒤에 이어 쓸 것",
    "passage": "Whether we feel happy or sad, content or discontent, is not determined merely by each individual successive moment of life experience — a good thing happens and I'm happy, a bad thing happens and I'm sad. While our experiences affect our mood, we are not blown in a completely new direction by each gust of wind. As humans, [우리말 밑줄: 우리는 좋고 나쁜 새로운 정보와 사건에 적응하고, 우리의 개인적인 기준 수준의 행복으로 되돌아간다.] There will be highs and lows, but over time, like water seeking its own level, we are pulled toward our baseline — back up after bad news and back down after good. The euphoria of first love fades, and so does the despair of a break-up. This tendency is best seen with little kids and their toy joy: When they get what they've longed for, they believe they will be happy for the rest of their lives. And for the first few minutes of the rest of their lives, they are. But then the kids — like adults — adapt.\n*euphoria: (극도의) 행복감",
    "answer": "we adjust to new information and events both good and bad and return to our personal default level of well-being",
    "acceptableAnswers": [
      "we adjust to new information and events both good and bad and return to our personal default level of well-being.",
      "We adjust to new information and events both good and bad and return to our personal default level of well-being",
      "we adjust - to new information and events both good and bad - and return to our personal default level of well-being"
    ],
    "keywords": [
      "adjust to new information and events",
      "both good and bad",
      "return to our personal default level of well-being"
    ],
    "explanation": "adjust to(~에 적응하다)와 return to(~로 되돌아가다)가 병렬 연결되며, default level of well-being(행복의 기준선/기본 수준) 표현을 구성하는 문장입니다."
  },
  {
    "id": "mock2509_q278",
    "passageNo": 32,
    "pdfQNum": 278,
    "type": "ESSAY",
    "question": "다음 글의 빈칸 (A)에 들어갈 말을 <보기>의 단어를 모두 활용하여 우리말에 맞게 영작하시오.\n\n[우리말] 당신은 당신의 몸이 필요로 하는 것보다 적은 수면을 취하는 것에 익숙해질 수 없다.\n\n<보기>\n[ accustomed / become / can't / getting / less / sleep / than / needs / your / body / to / you ]\n\n<조건>\n- 'become accustomed to -ing' 표현을 반드시 활용할 것\n- 단어 추가나 누락 없이 정확한 어순으로 작성할 것",
    "passage": "Although you may put off going to sleep in order to squeeze more activities into your day, eventually your need for sleep becomes overwhelming and you are forced to get some sleep. This daily drive for sleep appears to be due, in part, to a compound known as adenosine. This natural chemical builds up in your blood as time awake increases. While you sleep, your body breaks down the adenosine. Thus, this molecule may be what your body uses to keep track of lost sleep and to trigger sleep when needed. An accumulation of adenosine and other factors might explain why, after several nights of less than optimal amounts of sleep, you build up a sleep debt that you must make up by sleeping longer than normal. Because of such built-in molecular feedback, (A) ________________________________________________________________. Eventually, a lack of sleep catches up with you.\n*compound: 화합물 **accumulation: 축적",
    "answer": "you can't become accustomed to getting less sleep than your body needs",
    "acceptableAnswers": [
      "you can't become accustomed to getting less sleep than your body needs.",
      "You can't become accustomed to getting less sleep than your body needs",
      "You can't become accustomed to getting less sleep than your body needs."
    ],
    "keywords": [
      "can't become accustomed to getting less sleep",
      "than your body needs"
    ],
    "explanation": "'become accustomed to + -ing'는 '~하는 것에 익숙해지다'라는 숙어로 to는 전치사이므로 동명사 getting이 옵니다. 'than your body needs'는 유사 관계대명사/비교구문으로 이어집니다."
  },
  {
    "id": "mock2509_q281",
    "passageNo": 33,
    "pdfQNum": 281,
    "type": "SHORT",
    "question": "다음 글의 주제를 한 문장으로 요약하고자 한다. 본문에서 찾아 각 빈칸 (A), (B)에 들어갈 가장 알맞은 단어를 1단어로 쓰시오.\n\n[요약문]\nWhether uncertainty is significant or precise is (A)____________, depending heavily on what a person is (B)____________ to do with the measured number.\n\n<조건>\n- 본문에 실제로 쓰인 단어를 그대로 활용할 것\n- 답안 작성 형식: (A) 단어, (B) 단어",
    "passage": "One of the things that makes uncertainty difficult for members of the public to appreciate is that the significance of uncertainty is relative. Take, for example, the distance between Earth and the sun: 1.49597 x 10⁸ km, as measured at one point during the year. This seems relatively precise; after all, using six significant digits means I know the distance to an accuracy of one part in a million or so. However, if the next digit is uncertain, that means the uncertainty in knowing the precise Earth-sun distance is larger than the distance between New York and Chicago! Whether or not the quoted number is “precise“ therefore depends on what I'm intending to do with it. If I care only about what minute the sun will rise tomorrow, then the number quoted here is fine. If I want to send a satellite to orbit just above the sun, however, then I would need to know distances more accurately.\n*significant digit: 유효 숫자",
    "answer": "(A) relative, (B) intending",
    "acceptableAnswers": [
      "relative, intending",
      "(A)relative, (B)intending",
      "(A) relative / (B) intending",
      "relative / intending",
      "A: relative, B: intending"
    ],
    "keywords": [
      "relative",
      "intending"
    ],
    "explanation": "글의 핵심 주제는 불확실성의 의미가 상대적(relative)이며, 그 수치를 가지고 무엇을 하려고 의도하는지(intending)에 따라 정밀함의 기준이 달라진다는 것입니다."
  },
  {
    "id": "mock2509_q284",
    "passageNo": 34,
    "pdfQNum": 284,
    "type": "ESSAY",
    "question": "다음 글의 밑줄 친 우리말에 맞도록 <보기>의 단어들을 알맞게 배열 및 변형하여 'The + 비교급, The + 비교급' 구문의 완전한 문장을 완성하시오.\n\n[우리말] 따라서 우리가 재생 에너지 시스템을 향해 더 열심히 밀어붙일수록, 우리는 건설 과정을 위해 화석 에너지를 더 빠르게 사용해야 한다.\n\n<보기>\n[ hard / fast / push / renewable / we / system / towards / have / to / energy / a / fossil / energy / use / for / the / process / construction ]\n\n<조건>\n- hard와 fast를 각각 올바른 비교급 형태로 변형할 것\n- 'Thus, ' 다음에 이어지는 한 문장으로 작성할 것",
    "passage": "Richard Heinberg, an American journalist, argues that in building the renewable energy infrastructure to stop global warming, we are actually involved in one of the greatest change projects in human history. In addition to solar panels and wind turbines, we have to build an alternative transport infrastructure, farming procedures and industrial processes. This transformation cannot happen without fossil fuels. For instance, production of concrete structures and steel elements require amounts of energy that is only possible to produce with fossil energy. Production of solar panels requires scarce and expensive minerals which must be excavated, again requiring the use of fossil fuels. Thus, [우리말 밑줄: 우리가 재생 에너지 시스템을 향해 더 열심히 밀어붙일수록, 우리는 건설 과정을 위해 화석 에너지를 더 빠르게 사용해야 한다.] This is not only expensive, but also an undermining factor for our efforts to cut global emissions. Heinberg remarks that the cost of building this new energy infrastructure is seldom counted in transition proposals, which tend to focus just on energy supply requirements.\n*excavate: 발굴하다",
    "answer": "the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process",
    "acceptableAnswers": [
      "the harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process.",
      "The harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process",
      "The harder we push towards a renewable energy system, the faster we have to use fossil energy for the construction process."
    ],
    "keywords": [
      "the harder we push towards a renewable energy system",
      "the faster we have to use fossil energy",
      "for the construction process"
    ],
    "explanation": "'The + 비교급(the harder) + 주어 동사 ~, the + 비교급(the faster) + 주어 동사 ...' 구문으로, 신재생 에너지 구축을 더 강하게 밀어붙일수록 건설에 필요한 화석 에너지 소비도 빨라진다는 역설을 영작하는 문제입니다."
  },
  {
    "id": "mock2509_q287",
    "passageNo": 35,
    "pdfQNum": 287,
    "type": "ESSAY",
    "question": "다음 글에서 존 매카시(John McCarthy) 교수가 정의한 이래로 '인공지능(artificial intelligence)'이 궁극적으로 연구하고 실천해 온 목표 내용을 본문에서 찾아 15단어 이내의 영어로 쓰시오.\n\n<조건>\n- 본문의 단어 표현을 그대로 인용하여 작성할 것\n- '인간처럼 생각하도록 프로그램된 지능형 기계를 만드는 것'에 해당하는 구를 작성할 것",
    "passage": "Humans for centuries have dreamed of machines that could become intelligent and make human-like decisions. There have been myths about robots, automatons, and artificial beings since ancient Greece (e.g., the myth of Pandora, who released ills upon the world). Likewise, literature throughout history has dreamed of creating human-like creatures and thinking machines (e.g., Mary Shelley’s Frankenstein). In 1950, British mathematician Alan Turing asked whether machines could think and reason like humans and then developed the Turing test to measure a machine’s intelligence and whether the machines can think autonomously. A few years later, MIT professor John McCarthy coined “artificial intelligence,” replacing the previously used expression “automata studies.” Since then, artificial intelligence has become the study and practice of “making intelligent machines” that are programmed to think like humans — endowed by their creators with reasoning and learning.\n*automaton: 자동 장치 **endow: 부여하다",
    "answer": "making intelligent machines that are programmed to think like humans",
    "acceptableAnswers": [
      "making intelligent machines that are programmed to think like humans.",
      "the study and practice of making intelligent machines that are programmed to think like humans",
      "Making intelligent machines that are programmed to think like humans",
      "making intelligent machines that are programmed to think like humans endowed by their creators with reasoning and learning"
    ],
    "keywords": [
      "making intelligent machines",
      "programmed to think like humans"
    ],
    "explanation": "본문 마지막 문장에서 인공지능을 'making intelligent machines that are programmed to think like humans (인간처럼 생각하도록 프로그래밍된 지능적인 기계를 만드는 것)'이라고 명시하고 있습니다."
  },
  {
    "id": "mock2509_q290",
    "passageNo": 36,
    "pdfQNum": 290,
    "type": "ESSAY",
    "question": "다음 글을 읽고 국립공원 관리인들이 방문객들에게 도로를 건너는 사막 거북을 집어 올려 도와주지 말라고 당부하는 구체적인 이유를 본문 내용을 바탕으로 우리말로 서술하시오.\n\n<조건>\n- 거북이 느끼는 감정과 신체적 반응(장기 이름 포함), 그리고 그로 인한 치명적인 결과를 반드시 포함할 것",
    "passage": "The desert tortoise has a simple solution for coping with Death Valley's extreme heat: It avoids it. The slow-moving creature hibernates during the winter and stays in its tunnel for much of the summer, meaning that it spends more than 90 percent of its life immobile. In fact, the tortoise usually only surfaces after a good rain. Then, it gets to work. The tortoise stocks up on water by eating plants and digging holes to collect rain. But to stay supplied with water through its extended hibernation, the reptile relies on something else — its highly sophisticated bladder. Unlike most animals, the tortoise's bladder acts as a holding tank, allowing it to reabsorb water back into its body. Incredibly, a desert tortoise can go a full year without taking in any freshwater at all. And because its bladder is so important to a tortoise's survival, park rangers often remind visitors not to stop and help the slow-movers across the road. Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.\n*hibernation: 동면 **bladder: 방광",
    "answer": "사막 거북은 사람들이 집어 올릴 때 극도로 겁을 먹어 방광을 비우게 되고, 이로 인해 생존에 필수적인 소중한 비축 수분을 잃게 되기 때문이다.",
    "acceptableAnswers": [
      "거북이가 사람들이 들어 올릴 때 너무 무서워하여 방광을 비우게 되고, 소중한 저장 수분을 잃어버리기 때문이다.",
      "사람들이 집어 올리면 거북이가 극심한 공포로 방광을 비워 소중한 비축 수분을 잃기 때문이다.",
      "Tortoises become so terrified when people pick them up that they empty their bladders, losing their precious water reserves.",
      "방광을 비워 소중한 수분을 잃게 되기 때문이다"
    ],
    "keywords": [
      "겁",
      "두려",
      "공포",
      "방광",
      "수분",
      "비축"
    ],
    "explanation": "사막 거북은 사람이 들어 올리면 극도로 겁을 먹어(terrified) 소중한 수분 저장고 역할을 하는 방광(bladder)을 비워버리고, 비축된 수분(precious water reserves)을 잃어 탈수로 죽을 수 있기 때문입니다."
  },
  {
    "id": "mock2509_q293",
    "passageNo": 37,
    "pdfQNum": 293,
    "type": "SHORT",
    "question": "다음 글의 밑줄 친 (A)의 마찰력(friction)이 움직이는 물체의 속도를 늦추는 작동 방식을 본문에서 찾아 8단어의 영어로 쓰시오.\n\n[빈칸]\nFriction tends to slow down moving things by ___________________________________.\n\n<조건>\n- 본문에 등장하는 단어만을 사용하여 전치사 by 뒤에 이어지는 구로 작성할 것",
    "passage": "Imagine you are pedalling your bicycle on a level road. You stop pedalling: no force is now acting to move you forward. What happens? You gradually slow down. How could you slow down more suddenly, in a shorter distance? By putting the brakes on. Because the brakes change your movement, making you slow down more suddenly, they must be exerting a force on the bicycle and you, as they grip and rub on the wheel-rims. This is the force called friction, which tends to slow down moving things by [밑줄 (A) acting in the direction opposite to movement], that is backwards. Even without the brakes on, there are other friction forces acting on you and your bicycle, which also slow you down. One of these is friction in the wheels rubbing on the axles. Another is air resistance, which you can feel, pushing you backwards as you and the bicycle move forwards. When you apply these ideas to something around you, like a cart, you can see what could be generating friction: mainly the axles rubbing on the body as they rotate.\n*rim: 테두리 **axle: (바퀴의) 축",
    "answer": "acting in the direction opposite to movement",
    "acceptableAnswers": [
      "acting in the direction opposite to movement.",
      "acting in the direction opposite to movement, that is backwards",
      "Acting in the direction opposite to movement"
    ],
    "keywords": [
      "acting in the direction opposite to movement"
    ],
    "explanation": "본문에서 마찰력이 'acting in the direction opposite to movement (움직임과 반대 방향으로 작용함으로써)' 움직이는 사물을 느리게 만드는 힘이라고 정의하고 있습니다."
  },
  {
    "id": "mock2509_q294",
    "passageNo": 38,
    "pdfQNum": 294,
    "type": "ESSAY",
    "question": "다음 글을 읽고 디지털 비선형 편집 시스템(nonlinear editing system)이 기존 선형 편집에 비해 가지는 핵심 장점 2가지를 찾아 우리말로 각각 서술하시오.\n\n<조건>\n- (1) 장면/영상을 찾는 방식, (2) 장면을 추가/삭제할 때 프로그램 길이에 미치는 효과를 포함하여 작성할 것",
    "passage": "All editing systems are now nonlinear computer-based systems that allow random access to any video shot or scene without having to fast forward or fast reverse to find it. Nonlinear systems can create a range of special effects, such as slow motion, wipes and dissolves. Another highlight of a digital nonlinear system is its random access process that makes it easy for an editor to find desired shots or scenes without having to spend time fast forwarding or rewinding videotape. With nonlinear editing, shots or scenes can be easily added or removed anywhere in the program, and the computer adjusts the program length automatically. Linear editing was like composing a paper on a typewriter. If a mistake was made or new information needed to be added the whole piece had to be retyped. Nonlinear editing, on the other hand, is like using a word processing program. If a mistake is made, it is easily deleted and fixed with a few keystrokes, and new information can be added easily.\n*linear: 선형의",
    "answer": "1. 테이프를 앞뒤로 빨리 감을 필요 없이 원하는 장면이나 장면에 무작위 접근(random access)하여 쉽게 찾을 수 있다. 2. 프로그램의 어느 곳에서든 장면을 쉽게 추가하거나 제거할 수 있으며, 컴퓨터가 프로그램 길이를 자동으로 조절해 준다.",
    "acceptableAnswers": [
      "1. 빨리 감기나 되감기 없이 원하는 장면을 무작위로 바로 찾을 수 있다 (random access). 2. 장면의 추가나 삭제가 자유롭고 프로그램 길이가 자동 조절된다.",
      "첫째, 테이프를 감지 않고 무작위 접근(random access)으로 원하는 장면을 즉시 찾을 수 있다. 둘째, 프로그램 길이를 컴퓨터가 자동 조절하므로 장면의 추가와 삭제가 간편하다.",
      "무작위 접근(random access)을 통해 원하는 장면을 쉽게 찾을 수 있고, 장면을 자유롭게 추가하거나 삭제할 수 있으며 프로그램 길이가 자동으로 조절된다."
    ],
    "keywords": [
      "무작위",
      "접근",
      "random access",
      "추가",
      "삭제",
      "길이",
      "자동"
    ],
    "explanation": "비선형 편집의 두 가지 핵심 기능은 ① 빨리 감기/되감기 없는 무작위 접근(random access) 기능과 ② 장면 추가/제거 시 컴퓨터가 전체 프로그램 길이를 자동으로 조절(adjusts the program length automatically)해 주는 유연성입니다."
  },
  {
    "id": "mock2509_q299",
    "passageNo": 39,
    "pdfQNum": 299,
    "type": "SHORT",
    "question": "다음 글에 따르면 한 사람이 도덕적으로 선하다고 판단되기 위해 반드시 고려되어야 하는 두 가지 핵심 요소를 본문에서 찾아 각각 쓰시오.\n\n<조건>\n- (1) 행위자의 내면적 측면, (2) 행위의 결과적 측면에 해당하는 본문의 핵심 표현을 쓸 것\n- 답안 작성 형식: (1) ________, (2) ________",
    "passage": "A morally good person is one who does morally bad actions significantly less often than most and does morally good ones significantly more often than most. In judging a person not only her actions but also her intentions and motives are relevant. A morally good person must intend to do morally good actions and intend to avoid morally bad ones. A person who unintentionally prevents harm to others and does not harm them simply because things do not turn out as she intends is not morally good. Although this kind of situation generally occurs only in slapstick movies, it is worth mentioning to avoid the false impression that it is the actual consequences of a person's actions that count toward her being judged morally good or bad. But actual consequences are important. A person who always tries to prevent harm but never does, is not generally thought of as morally good. Of such a person, it may be said that she means well; but, contrary to Kant, some results are necessary before she is regarded as morally good.",
    "answer": "(1) intentions and motives, (2) actual consequences",
    "acceptableAnswers": [
      "(1) intentions and motives, (2) actual consequences",
      "(1) intentions, (2) consequences",
      "intentions and motives, actual consequences",
      "intentions and motives / actual consequences",
      "intentions / actual consequences",
      "(1)intentions and motives, (2)actual consequences",
      "intentions, consequences"
    ],
    "keywords": [
      "intentions",
      "motives",
      "consequences"
    ],
    "explanation": "본문에 따르면 한 사람을 도덕적으로 판단할 때 그녀의 행위뿐만 아니라 (1) 의도와 동기(intentions and motives) 및 (2) 실제적인 결과(actual consequences / results)가 모두 필수적으로 고려되어야 합니다."
  },
  {
    "id": "mock2509_q301",
    "passageNo": 40,
    "pdfQNum": 301,
    "type": "SHORT",
    "question": "다음 글의 빈칸에 들어갈 알맞은 말을 본문에서 찾아 4단어의 영어로 쓰시오.\n\n[빈칸]\nThe functional relationship we have with objects creates visual expectations that interfere with our ability to _____________________________.\n\n<조건>\n- 본문의 단어를 어형 변형 없이 4단어로 쓸 것",
    "passage": "Vision is influenced by our preconceptions about reality. In viewing a scene, we establish unconscious hierarchies that reflect our functional relationship to objects and our momentary priorities. For example, when visualizing a hammer in our mind's eye, we tend to “see” it in profile or at some other “ready for use” angle. One would probably not visualize a hammer as seen from the top so that the handle is hidden by the hammer's head. The functional relationship we have with objects creates visual expectations that interfere with our ability to _____________________________. The camera, like the human eye, sees only shapes and colors. It documents the world impartially through a lens that is similar to the eye. When we look at them carefully, photographs are often surprising because they don't interpret confusing details but simply serve them up to us with a mechanical indifference. And because of their flatness, photographs often contain areas where appear as unrecognizable colors and shapes.",
    "answer": "see like a camera",
    "acceptableAnswers": [
      "see like a camera",
      "see \"like a camera\"",
      "see “like a camera”",
      "see 'like a camera'"
    ],
    "keywords": [
      "see",
      "like",
      "camera"
    ],
    "explanation": "우리가 사물과 맺는 기능적 관계는 시각적 기대를 만들어내며, 이것이 선입견 없이 형태와 색상만을 기계적으로 기록하는 '카메라처럼 보는 능력(see like a camera)'을 방해한다는 내용입니다."
  }
];

const MOCK_202509_PRACTICE_TEST_PLANS = [
  {
    "planId": "mock2509_d1",
    "dayNum": 1,
    "date": "2026-09-29",
    "title": "[9모 기출] Day 1: 유형 A 어법 기초·핵심 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 A: 지문별 어법 기초·핵심 실전 12제 (지문당 1제)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "29번~40번 지문별 핵심 어법(밑줄 및 괄호 어법) 12문항입니다. 정확한 문법 원리와 어법 쓰임을 점검하세요!",
    "questionsVar": "MOCK_202509_TYPE_A_QUESTIONS"
  },
  {
    "planId": "mock2509_d2",
    "dayNum": 2,
    "date": "2026-09-30",
    "title": "[9모 기출] Day 2: 유형 B 어법 심화 & 모두 고르기 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 B: 어법 심화 & 모두 고르기 12제 (모두 고르기 복수정답 포함)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "어법 고난도 심화 유형입니다. 복수 정답(모두 고르기) 문항은 체크박스를 꼼꼼히 확인하고 제출하세요!",
    "questionsVar": "MOCK_202509_TYPE_B_QUESTIONS"
  },
  {
    "planId": "mock2509_d3",
    "dayNum": 3,
    "date": "2026-10-01",
    "title": "[9모 기출] Day 3: 유형 C 대의 파악 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 대의 파악 (주제·제목·요지·주장) 12제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "29번~40번 지문의 중심 내용과 핵심 주제/제목/요지를 묻는 12문항입니다. 지문의 핵심 논지를 파악하세요!",
    "questionsVar": "MOCK_202509_TYPE_C_MAIN_QUESTIONS"
  },
  {
    "planId": "mock2509_d4",
    "dayNum": 4,
    "date": "2026-10-02",
    "title": "[9모 기출] Day 4: 유형 C 세부 정보 파악 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 세부 내용 일치·불일치 12제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "지문의 구체적 사실관계 및 세부 정보 일치/불일치 12문항입니다. 선택지의 미세한 왜곡을 주의 깊게 비교 분석하세요!",
    "questionsVar": "MOCK_202509_TYPE_C_DETAIL_QUESTIONS"
  },
  {
    "planId": "mock2509_d5",
    "dayNum": 5,
    "date": "2026-10-03",
    "title": "[9모 기출] Day 5: 유형 C 빈칸 추론 (1) 핵심 어구 완성 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 핵심 어구 빈칸 추론 12제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "지문의 핵심 논리와 주제가 압축된 빈칸을 완성하는 12문항입니다. 문맥의 단서를 정확히 포착하세요!",
    "questionsVar": "MOCK_202509_TYPE_C_BLANK1_QUESTIONS"
  },
  {
    "planId": "mock2509_d6",
    "dayNum": 6,
    "date": "2026-10-04",
    "title": "[9모 기출] Day 6: 유형 C 빈칸 추론 (2) 킬러 문장 완성 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 문장 단위 고난도 킬러 빈칸 추론 12제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "1등급을 결정짓는 고난도 문장 단위 빈칸 12문항입니다. 글 전체의 주제와 패러프레이징된 표현을 찾아내세요!",
    "questionsVar": "MOCK_202509_TYPE_C_BLANK2_QUESTIONS"
  },
  {
    "planId": "mock2509_d7",
    "dayNum": 7,
    "date": "2026-10-05",
    "title": "[9모 기출] Day 7: 유형 C 함축 의미 추론 & 흐름 무관 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 밑줄 함축 의미 & 흐름과 무관한 문장 8제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "밑줄 친 비유적 표현의 함축 의미와 글의 통일성을 해치는 무관한 문장을 찾는 8문항입니다.",
    "questionsVar": "MOCK_202509_TYPE_C_IMPLIED_IRRELEVANT_QUESTIONS"
  },
  {
    "planId": "mock2509_d8",
    "dayNum": 8,
    "date": "2026-10-06",
    "title": "[9모 기출] Day 8: 유형 C 글의 순서 배열 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 글의 순서 배열 실전 9제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "지문의 논리적 전개, 지시어/연결사/관사의 흐름을 바탕으로 (A)-(B)-(C) 순서를 바르게 맞추는 9문항입니다.",
    "questionsVar": "MOCK_202509_TYPE_C_ORDER_QUESTIONS"
  },
  {
    "planId": "mock2509_d9",
    "dayNum": 9,
    "date": "2026-10-07",
    "title": "[9모 기출] Day 9: 유형 C 문장 삽입 위치 파악 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 주어진 문장의 위치 찾기 10제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "주어진 문장이 들어갈 가장 적절한 위치를 파악하는 문장 삽입 10문항입니다. 논리적 단절과 전환점을 포착하세요!",
    "questionsVar": "MOCK_202509_TYPE_C_INSERT_QUESTIONS"
  },
  {
    "planId": "mock2509_d10",
    "dayNum": 10,
    "date": "2026-10-08",
    "title": "[9모 기출] Day 10: 유형 C 한 문장 요약문 완성 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 C: 한 문장 요약문 빈칸 완성 7제",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "지문 전체 내용을 간결하게 압축한 요약문의 (A), (B) 빈칸에 들어갈 어구를 찾는 7문항입니다.",
    "questionsVar": "MOCK_202509_TYPE_C_SUMMARY_QUESTIONS"
  },
  {
    "planId": "mock2509_d11",
    "dayNum": 11,
    "date": "2026-10-09",
    "title": "[9모 기출] Day 11: 유형 D 서술형·조건부 영작 실전 (29~40번)",
    "time": "00:00",
    "endTime": "23:59",
    "scope": "2025 9월 학평 29~40번 유형 D: 서술형/조건부 영작/핵심 단답형 12제 (지문당 1제)",
    "cutoff": "80점 이상",
    "cutoffScore": 80,
    "practiceCutoff": 80,
    "allowLate": true,
    "teacherNote": "내신 1등급을 결정짓는 핵심 서술형 실전 12문항입니다. 주어진 조건과 어순에 맞게 정확한 철자와 문법으로 작성하세요!",
    "questionsVar": "MOCK_202509_TYPE_D_ESSAY_QUESTIONS"
  }
];


// Helper function to resolve questions array by planId
function getMock202509QuestionsByPlanId(planId) {
  switch (planId) {
    case 'mock2509_d1': return MOCK_202509_TYPE_A_QUESTIONS;
    case 'mock2509_d2': return MOCK_202509_TYPE_B_QUESTIONS;
    case 'mock2509_d3': return MOCK_202509_TYPE_C_MAIN_QUESTIONS;
    case 'mock2509_d4': return MOCK_202509_TYPE_C_DETAIL_QUESTIONS;
    case 'mock2509_d5': return MOCK_202509_TYPE_C_BLANK1_QUESTIONS;
    case 'mock2509_d6': return MOCK_202509_TYPE_C_BLANK2_QUESTIONS;
    case 'mock2509_d7': return MOCK_202509_TYPE_C_IMPLIED_IRRELEVANT_QUESTIONS;
    case 'mock2509_d8': return MOCK_202509_TYPE_C_ORDER_QUESTIONS;
    case 'mock2509_d9': return MOCK_202509_TYPE_C_INSERT_QUESTIONS;
    case 'mock2509_d10': return MOCK_202509_TYPE_C_SUMMARY_QUESTIONS;
    case 'mock2509_d11': return MOCK_202509_TYPE_D_ESSAY_QUESTIONS;
    default: return [];
  }
}
