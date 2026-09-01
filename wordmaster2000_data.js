/**
 * 워드마스터 수능 2000 전체 데이터셋 (Day 01 ~ Day 50)
 * 총 50개 Day 세트, 각 40단어 (총 2,000단어)
 * 교재(폴더) 분류: book = "워드마스터 수능 2000"
 * 각 단어별 교재 인쇄본 100% 동일 표준 발음기호(ipa) 내장 완료
 */
const WORDMASTER_2000_SETS = [
  {
    "id": "wm2000_day_01",
    "book": "워드마스터 수능 2000",
    "title": "Day 01",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "provide",
        "ko": "공급하다, 제공하다",
        "ipa": "[prəváid]"
      },
      {
        "en": "develop",
        "ko": "개발하다, 발전하다",
        "ipa": "[divéləp]"
      },
      {
        "en": "service",
        "ko": "서비스, 봉사",
        "ipa": "[sə́ːrvəs]"
      },
      {
        "en": "inform",
        "ko": "알리다, 통지하다",
        "ipa": "[ìnfɔ́ːrm]"
      },
      {
        "en": "relationship",
        "ko": "관계",
        "ipa": "[riléiʃənʃìp]"
      },
      {
        "en": "improve",
        "ko": "향상시키다, 개선하다",
        "ipa": "[ìmprúːv]"
      },
      {
        "en": "individual",
        "ko": "개인, 개인의",
        "ipa": "[ìndəvídʒəwəl]"
      },
      {
        "en": "require",
        "ko": "필요로 하다, 요구하다",
        "ipa": "[rìːkwáiər]"
      },
      {
        "en": "advise",
        "ko": "조언하다, 충고하다",
        "ipa": "[ædváiz]"
      },
      {
        "en": "social",
        "ko": "사회의, 사교적인",
        "ipa": "[sóuʃəl]"
      },
      {
        "en": "amount",
        "ko": "총액, 양",
        "ipa": "[əmáunt]"
      },
      {
        "en": "behave",
        "ko": "행동하다",
        "ipa": "[bihéiv]"
      },
      {
        "en": "employ",
        "ko": "고용하다, 쓰다",
        "ipa": "[emplɔ́i]"
      },
      {
        "en": "attitude",
        "ko": "태도, 입장",
        "ipa": "[ǽtətùːd]"
      },
      {
        "en": "research",
        "ko": "연구, 연구하다",
        "ipa": "[risə́ːrtʃ]"
      },
      {
        "en": "audience",
        "ko": "청중, 관객",
        "ipa": "[ádiəns]"
      },
      {
        "en": "volunteer",
        "ko": "자원봉사, 자원하다",
        "ipa": "[vàləntíər]"
      },
      {
        "en": "influence",
        "ko": "영향, 영향을 끼치다",
        "ipa": "[ínfluːəns]"
      },
      {
        "en": "terrible",
        "ko": "끔찍한, 무서운",
        "ipa": "[téərəbəl]"
      },
      {
        "en": "opportunity",
        "ko": "기회",
        "ipa": "[àpərtúːnəti]"
      },
      {
        "en": "ability",
        "ko": "능력",
        "ipa": "[əbílətìː]"
      },
      {
        "en": "expense",
        "ko": "비용, 지출",
        "ipa": "[ikspéns]"
      },
      {
        "en": "local",
        "ko": "지방의, 지역의",
        "ipa": "[lóukəl]"
      },
      {
        "en": "involve",
        "ko": "포함하다, 관련되다",
        "ipa": "[ìnválv]"
      },
      {
        "en": "stress",
        "ko": "스트레스, 강조하다",
        "ipa": "[strés]"
      },
      {
        "en": "therefore",
        "ko": "그러므로, 그 결과",
        "ipa": "[ðéərfɔ̀ːr]"
      },
      {
        "en": "positive",
        "ko": "긍정적인, 확신하는",
        "ipa": "[pázətiv]"
      },
      {
        "en": "average",
        "ko": "평균, 평균의",
        "ipa": "[ǽvəridʒ]"
      },
      {
        "en": "ride",
        "ko": "타다, 태워주기",
        "ipa": "[ráid]"
      },
      {
        "en": "encourage",
        "ko": "격려하다, 장려하다",
        "ipa": "[enkə́ːridʒ]"
      },
      {
        "en": "determine",
        "ko": "결정하다, 결심하다",
        "ipa": "[dətə́ːrmən]"
      },
      {
        "en": "international",
        "ko": "국제의, 국제적인",
        "ipa": "[ìntərnǽʃənəl]"
      },
      {
        "en": "consume",
        "ko": "소비하다, 먹다",
        "ipa": "[kənsúːm]"
      },
      {
        "en": "impress",
        "ko": "깊은 인상을 주다",
        "ipa": "[ìmprés]"
      },
      {
        "en": "object",
        "ko": "물체, 목표, 반대하다",
        "ipa": "[ábdʒekt]"
      },
      {
        "en": "available",
        "ko": "이용 가능한, 시간이 있는",
        "ipa": "[əvéiləbəl]"
      },
      {
        "en": "contain",
        "ko": "함유하다, 포함하다",
        "ipa": "[kəntéin]"
      },
      {
        "en": "recognize",
        "ko": "인지하다, 인정하다",
        "ipa": "[rékəgnàiz]"
      },
      {
        "en": "material",
        "ko": "재료, 물질",
        "ipa": "[mətíəriəl]"
      },
      {
        "en": "comfort",
        "ko": "편안하게 하다, 위로하다",
        "ipa": "[kʌ́mfərt]"
      }
    ]
  },
  {
    "id": "wm2000_day_02",
    "book": "워드마스터 수능 2000",
    "title": "Day 02",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "emotion",
        "ko": "감정, 정서",
        "ipa": "[imóuʃən]"
      },
      {
        "en": "amaze",
        "ko": "놀라게 하다",
        "ipa": "[əméiz]"
      },
      {
        "en": "reduce",
        "ko": "줄이다, 감소시키다",
        "ipa": "[rədúːs]"
      },
      {
        "en": "discover",
        "ko": "발견하다",
        "ipa": "[diskʌ́vər]"
      },
      {
        "en": "decide",
        "ko": "결정하다, 결심하다",
        "ipa": "[dìsáid]"
      },
      {
        "en": "benefit",
        "ko": "이익, 혜택을 주다",
        "ipa": "[bénəfit]"
      },
      {
        "en": "affect",
        "ko": "영향을 미치다",
        "ipa": "[əfékt]"
      },
      {
        "en": "occur",
        "ko": "일어나다, 발생하다",
        "ipa": "[əkə́ːr]"
      },
      {
        "en": "complex",
        "ko": "복잡한, 복합건물",
        "ipa": "[kámpleks]"
      },
      {
        "en": "define",
        "ko": "정의하다, 규정하다",
        "ipa": "[difáin]"
      },
      {
        "en": "proud",
        "ko": "자랑스러워하는",
        "ipa": "[práud]"
      },
      {
        "en": "aware",
        "ko": "알고 있는, 인지하는",
        "ipa": "[əwéər]"
      },
      {
        "en": "contact",
        "ko": "접촉하다, 연락하다",
        "ipa": "[kántæ̀kt]"
      },
      {
        "en": "profession",
        "ko": "직업, 전문직",
        "ipa": "[prəféʃən]"
      },
      {
        "en": "detail",
        "ko": "세부사항, 상세히 설명하다",
        "ipa": "[ditéil]"
      },
      {
        "en": "approach",
        "ko": "접근하다, 접근법",
        "ipa": "[əpróutʃ]"
      },
      {
        "en": "career",
        "ko": "경력, 직업",
        "ipa": "[kəríər]"
      },
      {
        "en": "package",
        "ko": "소포, 꾸러미",
        "ipa": "[pǽkədʒ]"
      },
      {
        "en": "disappear",
        "ko": "사라지다, 없어지다",
        "ipa": "[dìsəpíər]"
      },
      {
        "en": "novel",
        "ko": "소설, 참신한",
        "ipa": "[návəl]"
      },
      {
        "en": "secure",
        "ko": "안전한, 확보하다",
        "ipa": "[sikjúər]"
      },
      {
        "en": "fashion",
        "ko": "유행, 방식",
        "ipa": "[fǽʃən]"
      },
      {
        "en": "despite",
        "ko": "~에도 불구하고",
        "ipa": "[dispáit]"
      },
      {
        "en": "background",
        "ko": "배경",
        "ipa": "[bǽkgràund]"
      },
      {
        "en": "solution",
        "ko": "해결책, 용액",
        "ipa": "[səlúːʃən]"
      },
      {
        "en": "generate",
        "ko": "발생시키다, 생성하다",
        "ipa": "[dʒénərèit]"
      },
      {
        "en": "generation",
        "ko": "세대, 발생",
        "ipa": "[dʒènəréiʃən]"
      },
      {
        "en": "separate",
        "ko": "분리하다, 떨어진",
        "ipa": "[sépərèit]"
      },
      {
        "en": "specify",
        "ko": "명시하다, 구체적으로 밝히다",
        "ipa": "[spésəfài]"
      },
      {
        "en": "extreme",
        "ko": "극단적인, 극심한",
        "ipa": "[ekstríːm]"
      },
      {
        "en": "frequent",
        "ko": "빈번한, 잦은",
        "ipa": "[fríːkwənt]"
      },
      {
        "en": "regular",
        "ko": "규칙적인, 정기적인",
        "ipa": "[régjələr]"
      },
      {
        "en": "continuous",
        "ko": "계속되는, 지속적인",
        "ipa": "[kəntínjuːəs]"
      },
      {
        "en": "general",
        "ko": "일반적인, 보통의",
        "ipa": "[dʒénərəl]"
      },
      {
        "en": "ancient",
        "ko": "고대의, 옛날의",
        "ipa": "[éintʃənt]"
      },
      {
        "en": "unique",
        "ko": "독특한, 유일한",
        "ipa": "[juːníːk]"
      },
      {
        "en": "normal",
        "ko": "정상적인, 평범한",
        "ipa": "[nɔ́ːrməl]"
      },
      {
        "en": "standard",
        "ko": "표준, 기준",
        "ipa": "[stǽndərd]"
      },
      {
        "en": "typical",
        "ko": "전형적인, 대표적인",
        "ipa": "[típəkəl]"
      },
      {
        "en": "rare",
        "ko": "드문, 희귀한",
        "ipa": "[réər]"
      }
    ]
  },
  {
    "id": "wm2000_day_03",
    "book": "워드마스터 수능 2000",
    "title": "Day 03",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "insist",
        "ko": "주장하다, 고집하다",
        "ipa": "[ìnsíst]"
      },
      {
        "en": "due",
        "ko": "~할 예정인, 만기의",
        "ipa": "[dúː]"
      },
      {
        "en": "negative",
        "ko": "부정적인",
        "ipa": "[négətiv]"
      },
      {
        "en": "athletic",
        "ko": "운동의, 체육의",
        "ipa": "[æθlétik]"
      },
      {
        "en": "factor",
        "ko": "요인, 요소",
        "ipa": "[fǽktər]"
      },
      {
        "en": "mental",
        "ko": "정신의, 마음의",
        "ipa": "[méntəl]"
      },
      {
        "en": "imagine",
        "ko": "상상하다",
        "ipa": "[ìmǽdʒən]"
      },
      {
        "en": "tend",
        "ko": "~하는 경향이 있다",
        "ipa": "[ténd]"
      },
      {
        "en": "constant",
        "ko": "끊임없는, 일정한",
        "ipa": "[kánstənt]"
      },
      {
        "en": "replace",
        "ko": "대체하다, 바꾸다",
        "ipa": "[rìːpléis]"
      },
      {
        "en": "activity",
        "ko": "활동",
        "ipa": "[æktívəti]"
      },
      {
        "en": "physical",
        "ko": "신체적인, 물질의",
        "ipa": "[fízikəl]"
      },
      {
        "en": "community",
        "ko": "지역 사회, 공동체",
        "ipa": "[kəmjúːnəti]"
      },
      {
        "en": "focus",
        "ko": "집중하다, 초점",
        "ipa": "[fóukəs]"
      },
      {
        "en": "variety",
        "ko": "다양성, 종류",
        "ipa": "[vəráiəti]"
      },
      {
        "en": "various",
        "ko": "다양한",
        "ipa": "[véəriəs]"
      },
      {
        "en": "respond",
        "ko": "응답하다, 반응하다",
        "ipa": "[rispánd]"
      },
      {
        "en": "response",
        "ko": "응답, 반응",
        "ipa": "[rispáns]"
      },
      {
        "en": "prevent",
        "ko": "예방하다, 막다",
        "ipa": "[privént]"
      },
      {
        "en": "create",
        "ko": "창조하다, 만들다",
        "ipa": "[kriéit]"
      },
      {
        "en": "creativity",
        "ko": "창의성",
        "ipa": "[krìːeitívəti]"
      },
      {
        "en": "creature",
        "ko": "생물, 생명체",
        "ipa": "[kríːtʃər]"
      },
      {
        "en": "manage",
        "ko": "관리하다, 해내다",
        "ipa": "[mǽnədʒ]"
      },
      {
        "en": "management",
        "ko": "경영, 관리",
        "ipa": "[mǽnədʒmənt]"
      },
      {
        "en": "current",
        "ko": "현재의, 흐름",
        "ipa": "[kə́ːrənt]"
      },
      {
        "en": "currently",
        "ko": "현재, 지금",
        "ipa": "[kə́ːrəntli]"
      },
      {
        "en": "remove",
        "ko": "제거하다, 없애다",
        "ipa": "[rimúːv]"
      },
      {
        "en": "damage",
        "ko": "손상, 피해를 입히다",
        "ipa": "[dǽmədʒ]"
      },
      {
        "en": "compete",
        "ko": "경쟁하다",
        "ipa": "[kəmpíːt]"
      },
      {
        "en": "competition",
        "ko": "경쟁, 대회",
        "ipa": "[kàmpətíʃən]"
      },
      {
        "en": "competitive",
        "ko": "경쟁력 있는",
        "ipa": "[kəmpétətiv]"
      },
      {
        "en": "competitor",
        "ko": "경쟁자",
        "ipa": "[kəmpétətər]"
      },
      {
        "en": "observe",
        "ko": "관찰하다, 준수하다",
        "ipa": "[əbzə́ːrv]"
      },
      {
        "en": "observation",
        "ko": "관찰",
        "ipa": "[àbzərvéiʃən]"
      },
      {
        "en": "produce",
        "ko": "생산하다, 농산물",
        "ipa": "[prədúːs]"
      },
      {
        "en": "product",
        "ko": "제품, 생산품",
        "ipa": "[prádəkt]"
      },
      {
        "en": "production",
        "ko": "생산",
        "ipa": "[prədʌ́kʃən]"
      },
      {
        "en": "productive",
        "ko": "생산적인",
        "ipa": "[prədʌ́ktiv]"
      },
      {
        "en": "productivity",
        "ko": "생산성",
        "ipa": "[pròudəktívəti]"
      },
      {
        "en": "labor",
        "ko": "노동, 근로",
        "ipa": "[léibər]"
      }
    ]
  },
  {
    "id": "wm2000_day_04",
    "book": "워드마스터 수능 2000",
    "title": "Day 04",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "publish",
        "ko": "출판하다, 발표하다",
        "ipa": "[pʌ́bliʃ]"
      },
      {
        "en": "aim",
        "ko": "목표, 겨냥하다",
        "ipa": "[éim]"
      },
      {
        "en": "contemporary",
        "ko": "현대의, 동시대의",
        "ipa": "[kəntémpərèəri]"
      },
      {
        "en": "exhibit",
        "ko": "전시하다, 전시품",
        "ipa": "[igzíbit]"
      },
      {
        "en": "organize",
        "ko": "조직하다, 정리하다",
        "ipa": "[ɔ́ːrgənàiz]"
      },
      {
        "en": "organization",
        "ko": "조직, 단체",
        "ipa": "[ɔ̀ːrgənəzéiʃən]"
      },
      {
        "en": "arrange",
        "ko": "배열하다, 준비하다",
        "ipa": "[əréindʒ]"
      },
      {
        "en": "arrangement",
        "ko": "준비, 배열",
        "ipa": "[əréindʒmənt]"
      },
      {
        "en": "participate",
        "ko": "참여하다, 참가하다",
        "ipa": "[partísəpèit]"
      },
      {
        "en": "participation",
        "ko": "참여, 참가",
        "ipa": "[partìsəpéiʃən]"
      },
      {
        "en": "participant",
        "ko": "참가자",
        "ipa": "[partísəpənt]"
      },
      {
        "en": "accept",
        "ko": "받아들이다, 수락하다",
        "ipa": "[æksépt]"
      },
      {
        "en": "acceptable",
        "ko": "용인되는, 받아들일 수 있는",
        "ipa": "[ækséptəbəl]"
      },
      {
        "en": "acceptance",
        "ko": "수락, 수용",
        "ipa": "[ækséptəns]"
      },
      {
        "en": "admit",
        "ko": "인정하다, 입장을 허락하다",
        "ipa": "[ədmít]"
      },
      {
        "en": "admission",
        "ko": "입장료, 인정",
        "ipa": "[ædmíʃən]"
      },
      {
        "en": "permit",
        "ko": "허가하다, 허가증",
        "ipa": "[pərmít]"
      },
      {
        "en": "permission",
        "ko": "허락, 허가",
        "ipa": "[pərmíʃən]"
      },
      {
        "en": "allow",
        "ko": "허락하다, 인정하다",
        "ipa": "[əláu]"
      },
      {
        "en": "forbid",
        "ko": "금지하다",
        "ipa": "[fərbíd]"
      },
      {
        "en": "prohibit",
        "ko": "금지하다, 막다",
        "ipa": "[prouhíbət]"
      },
      {
        "en": "ban",
        "ko": "금지하다, 금지",
        "ipa": "[bǽn]"
      },
      {
        "en": "limit",
        "ko": "제한하다, 한계",
        "ipa": "[límət]"
      },
      {
        "en": "limitation",
        "ko": "한계, 제한",
        "ipa": "[lìmitéiʃən]"
      },
      {
        "en": "restrict",
        "ko": "제한하다, 통제하다",
        "ipa": "[ristríkt]"
      },
      {
        "en": "restriction",
        "ko": "제한, 규제",
        "ipa": "[ristríkʃən]"
      },
      {
        "en": "contain",
        "ko": "포함하다, 억누르다",
        "ipa": "[kəntéin]"
      },
      {
        "en": "container",
        "ko": "그릇, 용기",
        "ipa": "[kəntéinər]"
      },
      {
        "en": "include",
        "ko": "포함하다",
        "ipa": "[ìnklúːd]"
      },
      {
        "en": "exclude",
        "ko": "배제하다, 제외하다",
        "ipa": "[iksklúːd]"
      },
      {
        "en": "exclusive",
        "ko": "독점적인, 배타적인",
        "ipa": "[iksklúːsiv]"
      },
      {
        "en": "consist",
        "ko": "구성되다",
        "ipa": "[kənsíst]"
      },
      {
        "en": "compose",
        "ko": "구성하다, 작곡하다",
        "ipa": "[kəmpóuz]"
      },
      {
        "en": "composition",
        "ko": "구성, 작문",
        "ipa": "[kàmpəzíʃən]"
      },
      {
        "en": "constitute",
        "ko": "구성하다, 제정하다",
        "ipa": "[kánstətùːt]"
      },
      {
        "en": "constitution",
        "ko": "헌법, 구성",
        "ipa": "[kànstətúːʃən]"
      },
      {
        "en": "comprise",
        "ko": "구성하다, 차지하다",
        "ipa": "[kəmpráiz]"
      },
      {
        "en": "involvement",
        "ko": "관여, 개입",
        "ipa": "[ìnválvmənt]"
      },
      {
        "en": "attach",
        "ko": "붙이다, 첨부하다",
        "ipa": "[ətǽtʃ]"
      },
      {
        "en": "attachment",
        "ko": "부착물, 애착",
        "ipa": "[ətǽtʃmənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_05",
    "book": "워드마스터 수능 2000",
    "title": "Day 05",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "struggle",
        "ko": "투쟁하다, 분투하다",
        "ipa": "[strʌ́gəl]"
      },
      {
        "en": "effort",
        "ko": "노력, 수고",
        "ipa": "[éfərt]"
      },
      {
        "en": "attempt",
        "ko": "시도하다, 시도",
        "ipa": "[ətémpt]"
      },
      {
        "en": "challenge",
        "ko": "도전, 이의를 제기하다",
        "ipa": "[tʃǽləndʒ]"
      },
      {
        "en": "overcome",
        "ko": "극복하다, 이겨내다",
        "ipa": "[óuvərkʌ̀m]"
      },
      {
        "en": "conquer",
        "ko": "정복하다, 극복하다",
        "ipa": "[káŋkər]"
      },
      {
        "en": "defeat",
        "ko": "패배시키다, 패배",
        "ipa": "[difíːt]"
      },
      {
        "en": "surrender",
        "ko": "항복하다, 굴복하다",
        "ipa": "[səréndər]"
      },
      {
        "en": "yield",
        "ko": "생산하다, 굴복하다, 양보하다",
        "ipa": "[jíːld]"
      },
      {
        "en": "resist",
        "ko": "저항하다, 참다",
        "ipa": "[rizíst]"
      },
      {
        "en": "resistance",
        "ko": "저항, 반대",
        "ipa": "[rizístəns]"
      },
      {
        "en": "endure",
        "ko": "견디다, 참다",
        "ipa": "[endjúər]"
      },
      {
        "en": "endurance",
        "ko": "인내, 지구력",
        "ipa": "[éndərəns]"
      },
      {
        "en": "tolerate",
        "ko": "참다, 용인하다",
        "ipa": "[tálərèit]"
      },
      {
        "en": "tolerance",
        "ko": "관용, 내성",
        "ipa": "[tálərəns]"
      },
      {
        "en": "bear",
        "ko": "견디다, 낳다, 곰",
        "ipa": "[béər]"
      },
      {
        "en": "withstand",
        "ko": "견뎌내다, 버티다",
        "ipa": "[wiθstǽnd]"
      },
      {
        "en": "suffer",
        "ko": "고통받다, 겪다",
        "ipa": "[sʌ́fər]"
      },
      {
        "en": "suffering",
        "ko": "고통, 괴로움",
        "ipa": "[sʌ́fəriŋ]"
      },
      {
        "en": "pain",
        "ko": "고통, 통증",
        "ipa": "[péin]"
      },
      {
        "en": "painful",
        "ko": "고통스러운",
        "ipa": "[péinfəl]"
      },
      {
        "en": "ache",
        "ko": "아프다, 통증",
        "ipa": "[éik]"
      },
      {
        "en": "hurt",
        "ko": "다치게 하다, 아프다",
        "ipa": "[hə́ːrt]"
      },
      {
        "en": "injure",
        "ko": "부상을 입히다",
        "ipa": "[índʒər]"
      },
      {
        "en": "injury",
        "ko": "부상, 상처",
        "ipa": "[índʒəri]"
      },
      {
        "en": "wound",
        "ko": "상처를 입히다, 부상",
        "ipa": "[wáund]"
      },
      {
        "en": "heal",
        "ko": "치료하다, 낫다",
        "ipa": "[híːl]"
      },
      {
        "en": "cure",
        "ko": "치료하다, 해결책",
        "ipa": "[kjúər]"
      },
      {
        "en": "treat",
        "ko": "치료하다, 대우하다, 대접하다",
        "ipa": "[tríːt]"
      },
      {
        "en": "treatment",
        "ko": "치료, 대우",
        "ipa": "[tríːtmənt]"
      },
      {
        "en": "remedy",
        "ko": "치료법, 해결책",
        "ipa": "[rémədi]"
      },
      {
        "en": "therapy",
        "ko": "치료, 요법",
        "ipa": "[θéərəpi]"
      },
      {
        "en": "therapist",
        "ko": "치료사",
        "ipa": "[θéərəpəst]"
      },
      {
        "en": "patient",
        "ko": "환자, 참을성 있는",
        "ipa": "[péiʃənt]"
      },
      {
        "en": "patience",
        "ko": "인내심",
        "ipa": "[péiʃəns]"
      },
      {
        "en": "impatient",
        "ko": "참을성 없는, 안달하는",
        "ipa": "[ìmpéiʃənt]"
      },
      {
        "en": "nurse",
        "ko": "간호사, 돌보다",
        "ipa": "[nə́ːrs]"
      },
      {
        "en": "clinic",
        "ko": "진료소, 병원",
        "ipa": "[klínik]"
      },
      {
        "en": "hospital",
        "ko": "병원",
        "ipa": "[háspìtəl]"
      },
      {
        "en": "ambulance",
        "ko": "구급차",
        "ipa": "[ǽmbjələns]"
      }
    ]
  },
  {
    "id": "wm2000_day_06",
    "book": "워드마스터 수능 2000",
    "title": "Day 06",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "educate",
        "ko": "교육하다",
        "ipa": "[édʒəkèit]"
      },
      {
        "en": "education",
        "ko": "교육",
        "ipa": "[èdʒəkéiʃən]"
      },
      {
        "en": "educational",
        "ko": "교육의, 교육적인",
        "ipa": "[èdʒəkéiʃənəl]"
      },
      {
        "en": "instruct",
        "ko": "지시하다, 가르치다",
        "ipa": "[ìnstrʌ́kt]"
      },
      {
        "en": "instruction",
        "ko": "설명, 지시",
        "ipa": "[ìnstrʌ́kʃən]"
      },
      {
        "en": "instructor",
        "ko": "강사, 지도자",
        "ipa": "[ìnstrʌ́ktər]"
      },
      {
        "en": "lecture",
        "ko": "강의, 강연하다",
        "ipa": "[léktʃər]"
      },
      {
        "en": "lecturer",
        "ko": "강연자, 강사",
        "ipa": "[léktʃərər]"
      },
      {
        "en": "curriculum",
        "ko": "교육과정",
        "ipa": "[kəríkjələm]"
      },
      {
        "en": "major",
        "ko": "전공의, 주요한, 전공하다",
        "ipa": "[méidʒər]"
      },
      {
        "en": "minor",
        "ko": "부전공의, 사소한",
        "ipa": "[máinər]"
      },
      {
        "en": "degree",
        "ko": "학위, 정도, 도",
        "ipa": "[digríː]"
      },
      {
        "en": "diploma",
        "ko": "졸업장, 수료증",
        "ipa": "[diplóuma]"
      },
      {
        "en": "graduate",
        "ko": "졸업하다, 졸업생",
        "ipa": "[grǽdʒəwət]"
      },
      {
        "en": "graduation",
        "ko": "졸업",
        "ipa": "[græ̀dʒuːéiʃən]"
      },
      {
        "en": "scholar",
        "ko": "학자",
        "ipa": "[skálər]"
      },
      {
        "en": "scholarship",
        "ko": "장학금, 학문",
        "ipa": "[skálərʃìp]"
      },
      {
        "en": "academic",
        "ko": "학업의, 학술적인",
        "ipa": "[æ̀kədémik]"
      },
      {
        "en": "academy",
        "ko": "학원, 학술원",
        "ipa": "[əkǽdəmi]"
      },
      {
        "en": "faculty",
        "ko": "교수진, 능력",
        "ipa": "[fǽkəlti]"
      },
      {
        "en": "tuition",
        "ko": "수업료, 등록금",
        "ipa": "[tjuːíʃən]"
      },
      {
        "en": "semester",
        "ko": "학기",
        "ipa": "[səméstər]"
      },
      {
        "en": "term",
        "ko": "학기, 용어, 조건",
        "ipa": "[tə́ːrm]"
      },
      {
        "en": "assignment",
        "ko": "과제, 배정",
        "ipa": "[əsáinmənt]"
      },
      {
        "en": "assign",
        "ko": "할당하다, 배정하다",
        "ipa": "[əsáin]"
      },
      {
        "en": "submit",
        "ko": "제출하다, 굴복하다",
        "ipa": "[səbmít]"
      },
      {
        "en": "submission",
        "ko": "제출, 굴복",
        "ipa": "[səbmíʃən]"
      },
      {
        "en": "evaluate",
        "ko": "평가하다",
        "ipa": "[ivǽljuːèit]"
      },
      {
        "en": "evaluation",
        "ko": "평가",
        "ipa": "[ivæ̀ljuːéiʃən]"
      },
      {
        "en": "assess",
        "ko": "평가하다, 사정하다",
        "ipa": "[əsés]"
      },
      {
        "en": "assessment",
        "ko": "평가, 사정",
        "ipa": "[əsésmənt]"
      },
      {
        "en": "grade",
        "ko": "성적, 등급, 채점하다",
        "ipa": "[gréid]"
      },
      {
        "en": "score",
        "ko": "점수, 득점하다",
        "ipa": "[skɔ́ːr]"
      },
      {
        "en": "exam",
        "ko": "시험, 검사",
        "ipa": "[igzǽm]"
      },
      {
        "en": "examine",
        "ko": "검사하다, 진찰하다",
        "ipa": "[igzǽmin]"
      },
      {
        "en": "examination",
        "ko": "시험, 검사",
        "ipa": "[igzæ̀mənéiʃən]"
      },
      {
        "en": "knowledge",
        "ko": "지식",
        "ipa": "[nálədʒ]"
      },
      {
        "en": "knowledgeable",
        "ko": "아는 것이 많은",
        "ipa": "[nálədʒəbəl]"
      },
      {
        "en": "wisdom",
        "ko": "지혜",
        "ipa": "[wízdəm]"
      },
      {
        "en": "intelligent",
        "ko": "지능이 있는, 똑똑한",
        "ipa": "[ìntélədʒənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_07",
    "book": "워드마스터 수능 2000",
    "title": "Day 07",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "science",
        "ko": "과학",
        "ipa": "[sáiəns]"
      },
      {
        "en": "scientific",
        "ko": "과학의, 과학적인",
        "ipa": "[sàiəntífik]"
      },
      {
        "en": "scientist",
        "ko": "과학자",
        "ipa": "[sáiəntist]"
      },
      {
        "en": "technology",
        "ko": "기술",
        "ipa": "[teknálədʒi]"
      },
      {
        "en": "technological",
        "ko": "기술적인",
        "ipa": "[tèknəládʒikəl]"
      },
      {
        "en": "technical",
        "ko": "전문적인, 기술의",
        "ipa": "[téknikəl]"
      },
      {
        "en": "technique",
        "ko": "기법, 기술",
        "ipa": "[tekníːk]"
      },
      {
        "en": "experiment",
        "ko": "실험, 실험하다",
        "ipa": "[ikspéərəmənt]"
      },
      {
        "en": "experimental",
        "ko": "실험의, 실험적인",
        "ipa": "[ikspèəriméntəl]"
      },
      {
        "en": "laboratory",
        "ko": "실험실, 연구소",
        "ipa": "[lǽbrətɔ̀ːri]"
      },
      {
        "en": "hypothesis",
        "ko": "가설",
        "ipa": "[haipáθəsəs]"
      },
      {
        "en": "theory",
        "ko": "이론",
        "ipa": "[θíəri]"
      },
      {
        "en": "theoretical",
        "ko": "이론적인",
        "ipa": "[θìːərétikəl]"
      },
      {
        "en": "formula",
        "ko": "공식, 제조법",
        "ipa": "[fɔ́ːrmjələ]"
      },
      {
        "en": "variable",
        "ko": "변수, 변하기 쉬운",
        "ipa": "[véəriəbəl]"
      },
      {
        "en": "constant",
        "ko": "상수, 일정한",
        "ipa": "[kánstənt]"
      },
      {
        "en": "data",
        "ko": "자료, 데이터",
        "ipa": "[déitə]"
      },
      {
        "en": "datum",
        "ko": "자료 (단수)",
        "ipa": "[dǽtəm]"
      },
      {
        "en": "analyze",
        "ko": "분석하다",
        "ipa": "[ǽnəlàiz]"
      },
      {
        "en": "analysis",
        "ko": "분석",
        "ipa": "[ənǽləsəs]"
      },
      {
        "en": "analytic",
        "ko": "분석적인",
        "ipa": "[æ̀nəlítik]"
      },
      {
        "en": "invent",
        "ko": "발명하다",
        "ipa": "[ìnvént]"
      },
      {
        "en": "invention",
        "ko": "발명, 발명품",
        "ipa": "[ìnvénʃən]"
      },
      {
        "en": "inventor",
        "ko": "발명가",
        "ipa": "[ìnvéntər]"
      },
      {
        "en": "innovate",
        "ko": "혁신하다",
        "ipa": "[ínəvèit]"
      },
      {
        "en": "innovation",
        "ko": "혁신, 쇄신",
        "ipa": "[ìnəvéiʃən]"
      },
      {
        "en": "innovative",
        "ko": "혁신적인",
        "ipa": "[ínəvèitiv]"
      },
      {
        "en": "patent",
        "ko": "특허, 특허를 받다",
        "ipa": "[pǽtənt]"
      },
      {
        "en": "discover",
        "ko": "발견하다",
        "ipa": "[diskʌ́vər]"
      },
      {
        "en": "discovery",
        "ko": "발견",
        "ipa": "[diskʌ́vəri]"
      },
      {
        "en": "explore",
        "ko": "탐험하다, 탐구하다",
        "ipa": "[iksplɔ́ːr]"
      },
      {
        "en": "exploration",
        "ko": "탐험, 탐구",
        "ipa": "[èkspləréiʃən]"
      },
      {
        "en": "investigate",
        "ko": "조사하다, 수사하다",
        "ipa": "[ìnvéstəgèit]"
      },
      {
        "en": "investigation",
        "ko": "조사, 수사",
        "ipa": "[ìnvèstəgéiʃən]"
      },
      {
        "en": "detect",
        "ko": "감지하다, 발견하다",
        "ipa": "[ditékt]"
      },
      {
        "en": "detection",
        "ko": "감지, 발견",
        "ipa": "[ditékʃən]"
      },
      {
        "en": "detector",
        "ko": "탐지기",
        "ipa": "[ditéktər]"
      },
      {
        "en": "sensor",
        "ko": "감지기, 센서",
        "ipa": "[sénsər]"
      },
      {
        "en": "device",
        "ko": "장치, 기기",
        "ipa": "[diváis]"
      },
      {
        "en": "instrument",
        "ko": "기구, 악기, 도구",
        "ipa": "[ínstrəmənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_08",
    "book": "워드마스터 수능 2000",
    "title": "Day 08",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "environment",
        "ko": "환경",
        "ipa": "[inváirənmənt]"
      },
      {
        "en": "environmental",
        "ko": "환경의, 환경적인",
        "ipa": "[invàirənméntəl]"
      },
      {
        "en": "ecology",
        "ko": "생태학, 생태계",
        "ipa": "[ikálədʒi]"
      },
      {
        "en": "ecological",
        "ko": "생태학의",
        "ipa": "[ikəládʒikəl]"
      },
      {
        "en": "ecosystem",
        "ko": "생태계",
        "ipa": "[íːkousìstəm]"
      },
      {
        "en": "habitat",
        "ko": "서식지",
        "ipa": "[hǽbətæ̀t]"
      },
      {
        "en": "species",
        "ko": "종 (생물)",
        "ipa": "[spíːʃiz]"
      },
      {
        "en": "extinct",
        "ko": "멸종된",
        "ipa": "[ikstíŋkt]"
      },
      {
        "en": "extinction",
        "ko": "멸종",
        "ipa": "[ikstíŋkʃən]"
      },
      {
        "en": "endangered",
        "ko": "멸종 위기에 처한",
        "ipa": "[endéindʒərd]"
      },
      {
        "en": "preserve",
        "ko": "보존하다, 보호하다",
        "ipa": "[prəzə́ːrv]"
      },
      {
        "en": "preservation",
        "ko": "보존, 보호",
        "ipa": "[prèzərvéiʃən]"
      },
      {
        "en": "conserve",
        "ko": "보존하다, 아끼다",
        "ipa": "[kənsə́ːrv]"
      },
      {
        "en": "conservation",
        "ko": "보호, 보존",
        "ipa": "[kànsərvéiʃən]"
      },
      {
        "en": "protect",
        "ko": "보호하다",
        "ipa": "[prətékt]"
      },
      {
        "en": "protection",
        "ko": "보호",
        "ipa": "[prətékʃən]"
      },
      {
        "en": "protective",
        "ko": "보호하는",
        "ipa": "[prətéktiv]"
      },
      {
        "en": "pollute",
        "ko": "오염시키다",
        "ipa": "[pəlúːt]"
      },
      {
        "en": "pollution",
        "ko": "오염, 공해",
        "ipa": "[pəlúːʃən]"
      },
      {
        "en": "pollutant",
        "ko": "오염 물질",
        "ipa": "[pəlúːtənt]"
      },
      {
        "en": "contaminate",
        "ko": "오염시키다",
        "ipa": "[kəntǽmənèit]"
      },
      {
        "en": "contamination",
        "ko": "오염",
        "ipa": "[kəntæ̀mənéiʃən]"
      },
      {
        "en": "waste",
        "ko": "쓰레기, 낭비하다",
        "ipa": "[wéist]"
      },
      {
        "en": "recycle",
        "ko": "재활용하다",
        "ipa": "[risáikəl]"
      },
      {
        "en": "recyclable",
        "ko": "재활용 가능한",
        "ipa": "[risáikləbəl]"
      },
      {
        "en": "garbage",
        "ko": "쓰레기",
        "ipa": "[gáːrbidʒ]"
      },
      {
        "en": "trash",
        "ko": "쓰레기",
        "ipa": "[trǽʃ]"
      },
      {
        "en": "litter",
        "ko": "쓰레기를 버리다, 쓰레기",
        "ipa": "[lítər]"
      },
      {
        "en": "emission",
        "ko": "배출, 방출",
        "ipa": "[imíʃən]"
      },
      {
        "en": "emit",
        "ko": "방출하다, 내뿜다",
        "ipa": "[imít]"
      },
      {
        "en": "climate",
        "ko": "기후",
        "ipa": "[kláimət]"
      },
      {
        "en": "global",
        "ko": "지구의, 세계적인",
        "ipa": "[glóubəl]"
      },
      {
        "en": "warming",
        "ko": "온난화",
        "ipa": "[wɔ́ːrmiŋ]"
      },
      {
        "en": "drought",
        "ko": "가뭄",
        "ipa": "[dráut]"
      },
      {
        "en": "flood",
        "ko": "홍수, 범람하다",
        "ipa": "[flʌ́d]"
      },
      {
        "en": "famine",
        "ko": "기근, 굶주림",
        "ipa": "[fǽmən]"
      },
      {
        "en": "disaster",
        "ko": "재앙, 재난",
        "ipa": "[dizǽstər]"
      },
      {
        "en": "catastrophe",
        "ko": "대참사, 재앙",
        "ipa": "[kətǽstrəfi]"
      },
      {
        "en": "renewable",
        "ko": "재생 가능한",
        "ipa": "[rinúːəbəl]"
      },
      {
        "en": "sustainable",
        "ko": "지속 가능한",
        "ipa": "[səstéinəbəl]"
      }
    ]
  },
  {
    "id": "wm2000_day_09",
    "book": "워드마스터 수능 2000",
    "title": "Day 09",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "economy",
        "ko": "경제",
        "ipa": "[ikánəmi]"
      },
      {
        "en": "economic",
        "ko": "경제의, 경제학의",
        "ipa": "[èkənámik]"
      },
      {
        "en": "economical",
        "ko": "경제적인, 절약하는",
        "ipa": "[èkənámikəl]"
      },
      {
        "en": "economics",
        "ko": "경제학",
        "ipa": "[èkənámiks]"
      },
      {
        "en": "financially",
        "ko": "재정적으로",
        "ipa": "[fənǽnʃəli]"
      },
      {
        "en": "finance",
        "ko": "금융, 재정",
        "ipa": "[fənǽns]"
      },
      {
        "en": "fiscal",
        "ko": "재정의, 회계의",
        "ipa": "[fískəl]"
      },
      {
        "en": "capital",
        "ko": "자본, 수도, 대문자",
        "ipa": "[kǽpətəl]"
      },
      {
        "en": "capitalism",
        "ko": "자본주의",
        "ipa": "[kǽpitəlìzəm]"
      },
      {
        "en": "invest",
        "ko": "투자하다",
        "ipa": "[ìnvést]"
      },
      {
        "en": "investment",
        "ko": "투자, 투자금",
        "ipa": "[ìnvéstmənt]"
      },
      {
        "en": "investor",
        "ko": "투자자",
        "ipa": "[ìnvéstər]"
      },
      {
        "en": "profit",
        "ko": "이익, 수익",
        "ipa": "[práfət]"
      },
      {
        "en": "profitable",
        "ko": "수익성이 있는",
        "ipa": "[práfətəbəl]"
      },
      {
        "en": "loss",
        "ko": "손실, 분실",
        "ipa": "[lɔ́ːs]"
      },
      {
        "en": "revenue",
        "ko": "수익, 세입",
        "ipa": "[révənùː]"
      },
      {
        "en": "income",
        "ko": "소득, 수입",
        "ipa": "[ínkʌ̀m]"
      },
      {
        "en": "outcome",
        "ko": "결과, 성과",
        "ipa": "[áutkʌ̀m]"
      },
      {
        "en": "budget",
        "ko": "예산, 예산을 세우다",
        "ipa": "[bʌ́dʒit]"
      },
      {
        "en": "fund",
        "ko": "자금, 기금",
        "ipa": "[fʌ́nd]"
      },
      {
        "en": "funding",
        "ko": "자금 지원",
        "ipa": "[fʌ́ndiŋ]"
      },
      {
        "en": "cost",
        "ko": "비용, 비용이 들다",
        "ipa": "[kást]"
      },
      {
        "en": "price",
        "ko": "가격, 대가",
        "ipa": "[práis]"
      },
      {
        "en": "charge",
        "ko": "요금, 청구하다, 충전하다",
        "ipa": "[tʃáːrdʒ]"
      },
      {
        "en": "fee",
        "ko": "수수료, 요금",
        "ipa": "[fíː]"
      },
      {
        "en": "fare",
        "ko": "교통 요금",
        "ipa": "[féər]"
      },
      {
        "en": "currency",
        "ko": "통화, 화폐",
        "ipa": "[kə́ːrənsi]"
      },
      {
        "en": "inflation",
        "ko": "인플레이션, 물가 상승",
        "ipa": "[ìnfléiʃən]"
      },
      {
        "en": "deflation",
        "ko": "디플레이션, 물가 하락",
        "ipa": "[difléiʃən]"
      },
      {
        "en": "debt",
        "ko": "빚, 부채",
        "ipa": "[dét]"
      },
      {
        "en": "loan",
        "ko": "대출, 빌려주다",
        "ipa": "[lóun]"
      },
      {
        "en": "borrow",
        "ko": "빌리다",
        "ipa": "[báːròu]"
      },
      {
        "en": "lend",
        "ko": "빌려주다",
        "ipa": "[lénd]"
      },
      {
        "en": "bankrupt",
        "ko": "파산한",
        "ipa": "[bǽŋkrəpt]"
      },
      {
        "en": "bankruptcy",
        "ko": "파산, 도산",
        "ipa": "[bǽŋkrəpsi]"
      },
      {
        "en": "trade",
        "ko": "무역, 거래하다",
        "ipa": "[tréid]"
      },
      {
        "en": "commerce",
        "ko": "상업, 통상",
        "ipa": "[kámərs]"
      },
      {
        "en": "commercial",
        "ko": "상업의, 광고",
        "ipa": "[kəmə́ːrʃəl]"
      },
      {
        "en": "market",
        "ko": "시장, 시장에 내놓다",
        "ipa": "[máːrkət]"
      },
      {
        "en": "merchandise",
        "ko": "상품, 물품",
        "ipa": "[mə́ːrtʃəndàiz]"
      }
    ]
  },
  {
    "id": "wm2000_day_10",
    "book": "워드마스터 수능 2000",
    "title": "Day 10",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "society",
        "ko": "사회",
        "ipa": "[səsáiəti]"
      },
      {
        "en": "sociology",
        "ko": "사회학",
        "ipa": "[sòusiálədʒi]"
      },
      {
        "en": "socialize",
        "ko": "사귀다, 사회화하다",
        "ipa": "[sóuʃəlàiz]"
      },
      {
        "en": "politics",
        "ko": "정치, 정치학",
        "ipa": "[pálətìks]"
      },
      {
        "en": "political",
        "ko": "정치적인",
        "ipa": "[pəlítəkəl]"
      },
      {
        "en": "politician",
        "ko": "정치인",
        "ipa": "[pàlətíʃən]"
      },
      {
        "en": "government",
        "ko": "정부, 행정",
        "ipa": "[gʌ́vərmənt]"
      },
      {
        "en": "govern",
        "ko": "통치하다, 지배하다",
        "ipa": "[gʌ́vərn]"
      },
      {
        "en": "governor",
        "ko": "주지사, 통치자",
        "ipa": "[gʌ́vərnər]"
      },
      {
        "en": "state",
        "ko": "국가, 주, 상태, 말하다",
        "ipa": "[stéit]"
      },
      {
        "en": "nation",
        "ko": "국가, 민족",
        "ipa": "[néiʃən]"
      },
      {
        "en": "national",
        "ko": "국가의, 전국의",
        "ipa": "[nǽʃənəl]"
      },
      {
        "en": "citizen",
        "ko": "시민, 국민",
        "ipa": "[sítəzən]"
      },
      {
        "en": "citizenship",
        "ko": "시민권",
        "ipa": "[sítizənʃìp]"
      },
      {
        "en": "democracy",
        "ko": "민주주의",
        "ipa": "[dimákrəsi]"
      },
      {
        "en": "democratic",
        "ko": "민주적인",
        "ipa": "[dèməkrǽtik]"
      },
      {
        "en": "republic",
        "ko": "공화국",
        "ipa": "[ripʌ́blək]"
      },
      {
        "en": "republican",
        "ko": "공화국의, 공화당원",
        "ipa": "[ripʌ́blikən]"
      },
      {
        "en": "monarchy",
        "ko": "군주제",
        "ipa": "[mánarki]"
      },
      {
        "en": "dictator",
        "ko": "독재자",
        "ipa": "[diktéitər]"
      },
      {
        "en": "dictatorship",
        "ko": "독재 정권",
        "ipa": "[diktéitərʃìp]"
      },
      {
        "en": "law",
        "ko": "법, 법률",
        "ipa": "[lɔ́ː]"
      },
      {
        "en": "legal",
        "ko": "합법적인, 법률의",
        "ipa": "[líːgəl]"
      },
      {
        "en": "illegal",
        "ko": "불법의",
        "ipa": "[ìlíːgəl]"
      },
      {
        "en": "court",
        "ko": "법원, 법정, 코트",
        "ipa": "[kɔ́ːrt]"
      },
      {
        "en": "judge",
        "ko": "판사, 판단하다",
        "ipa": "[dʒʌ́dʒ]"
      },
      {
        "en": "judgment",
        "ko": "판단, 판결",
        "ipa": "[dʒʌ́dʒmənt]"
      },
      {
        "en": "jury",
        "ko": "배심원단",
        "ipa": "[dʒúəri]"
      },
      {
        "en": "trial",
        "ko": "재판, 시도, 시련",
        "ipa": "[tráiəl]"
      },
      {
        "en": "justice",
        "ko": "정의, 사법",
        "ipa": "[dʒʌ́stəs]"
      },
      {
        "en": "injustice",
        "ko": "불의, 부정",
        "ipa": "[ìndʒʌ́stis]"
      },
      {
        "en": "crime",
        "ko": "범죄",
        "ipa": "[kráim]"
      },
      {
        "en": "criminal",
        "ko": "범죄자, 범죄의",
        "ipa": "[krímənəl]"
      },
      {
        "en": "victim",
        "ko": "피해자, 희생자",
        "ipa": "[víktəm]"
      },
      {
        "en": "suspect",
        "ko": "용의자, 의심하다",
        "ipa": "[səspékt]"
      },
      {
        "en": "arrest",
        "ko": "체포하다, 체포",
        "ipa": "[ərést]"
      },
      {
        "en": "punish",
        "ko": "처벌하다",
        "ipa": "[pʌ́niʃ]"
      },
      {
        "en": "punishment",
        "ko": "처벌, 형벌",
        "ipa": "[pʌ́niʃmənt]"
      },
      {
        "en": "penalty",
        "ko": "처벌, 벌금",
        "ipa": "[pénəlti]"
      },
      {
        "en": "fine",
        "ko": "벌금, 좋은, 미세한",
        "ipa": "[fáin]"
      }
    ]
  },
  {
    "id": "wm2000_day_11",
    "book": "워드마스터 수능 2000",
    "title": "Day 11",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "culture",
        "ko": "문화",
        "ipa": "[kʌ́ltʃər]"
      },
      {
        "en": "cultural",
        "ko": "문화의",
        "ipa": "[kʌ́ltʃərəl]"
      },
      {
        "en": "art",
        "ko": "예술, 미술, 기술",
        "ipa": "[áːrt]"
      },
      {
        "en": "artist",
        "ko": "예술가, 화가",
        "ipa": "[áːrtəst]"
      },
      {
        "en": "artistic",
        "ko": "예술적인",
        "ipa": "[artístik]"
      },
      {
        "en": "literature",
        "ko": "문학",
        "ipa": "[lítərətʃər]"
      },
      {
        "en": "literary",
        "ko": "문학의",
        "ipa": "[lítərèəri]"
      },
      {
        "en": "literal",
        "ko": "글자 그대로의",
        "ipa": "[lítərəl]"
      },
      {
        "en": "literate",
        "ko": "읽고 쓸 줄 아는",
        "ipa": "[lítərət]"
      },
      {
        "en": "illiterate",
        "ko": "문맹의",
        "ipa": "[ìlítərət]"
      },
      {
        "en": "illiteracy",
        "ko": "문맹",
        "ipa": "[ìlítərəsi]"
      },
      {
        "en": "masterpiece",
        "ko": "걸작, 명작",
        "ipa": "[mǽstərpìːs]"
      },
      {
        "en": "classic",
        "ko": "고전의, 대표적인, 명작",
        "ipa": "[klǽsik]"
      },
      {
        "en": "classical",
        "ko": "고전적인, 클래식의",
        "ipa": "[klǽsikəl]"
      },
      {
        "en": "heritage",
        "ko": "유산, 전통",
        "ipa": "[héərətədʒ]"
      },
      {
        "en": "tradition",
        "ko": "전통, 관습",
        "ipa": "[trədíʃən]"
      },
      {
        "en": "traditional",
        "ko": "전통적인",
        "ipa": "[trədíʃənəl]"
      },
      {
        "en": "custom",
        "ko": "관습, 풍습, 세관",
        "ipa": "[kʌ́stəm]"
      },
      {
        "en": "customary",
        "ko": "관례적인",
        "ipa": "[kʌ́stəmèəri]"
      },
      {
        "en": "folklore",
        "ko": "민속, 민간전승",
        "ipa": "[fóuklɔ̀ːr]"
      },
      {
        "en": "ritual",
        "ko": "의식, 의례",
        "ipa": "[rítʃuːəl]"
      },
      {
        "en": "ceremony",
        "ko": "의식, 식",
        "ipa": "[séərəmòuni]"
      },
      {
        "en": "celebrate",
        "ko": "축하하다, 기념하다",
        "ipa": "[séləbrèit]"
      },
      {
        "en": "celebration",
        "ko": "축하, 축제",
        "ipa": "[sèləbréiʃən]"
      },
      {
        "en": "festival",
        "ko": "축제, 페스티벌",
        "ipa": "[féstəvəl]"
      },
      {
        "en": "performance",
        "ko": "공연, 성과, 실행",
        "ipa": "[pərfɔ́ːrməns]"
      },
      {
        "en": "perform",
        "ko": "공연하다, 수행하다",
        "ipa": "[pərfɔ́ːrm]"
      },
      {
        "en": "performer",
        "ko": "공연자, 연기자",
        "ipa": "[pərfɔ́ːrmər]"
      },
      {
        "en": "exhibition",
        "ko": "전시회",
        "ipa": "[èksəbíʃən]"
      },
      {
        "en": "gallery",
        "ko": "미술관, 화랑",
        "ipa": "[gǽləri]"
      },
      {
        "en": "museum",
        "ko": "박물관",
        "ipa": "[mjuːzíːəm]"
      },
      {
        "en": "sculpture",
        "ko": "조각품, 조각",
        "ipa": "[skʌ́lptʃər]"
      },
      {
        "en": "sculptor",
        "ko": "조각가",
        "ipa": "[skʌ́lptər]"
      },
      {
        "en": "statue",
        "ko": "동상, 조각상",
        "ipa": "[stǽtʃùː]"
      },
      {
        "en": "portrait",
        "ko": "초상화, 인물사진",
        "ipa": "[pɔ́ːrtrət]"
      },
      {
        "en": "landscape",
        "ko": "풍경, 풍경화",
        "ipa": "[lǽndskèip]"
      },
      {
        "en": "canvas",
        "ko": "캔버스, 화폭",
        "ipa": "[kǽnvəs]"
      },
      {
        "en": "palette",
        "ko": "팔레트",
        "ipa": "[pǽlət]"
      },
      {
        "en": "craft",
        "ko": "공예, 기술, 배",
        "ipa": "[krǽft]"
      },
      {
        "en": "craftsman",
        "ko": "장인, 공예가",
        "ipa": "[krǽftsmən]"
      }
    ]
  },
  {
    "id": "wm2000_day_12",
    "book": "워드마스터 수능 2000",
    "title": "Day 12",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "psychology",
        "ko": "심리학",
        "ipa": "[saikálədʒi]"
      },
      {
        "en": "psychological",
        "ko": "심리적인, 정신적인",
        "ipa": "[sàikəládʒikəl]"
      },
      {
        "en": "personality",
        "ko": "성격, 인성, 개성",
        "ipa": "[pə̀ːrsənǽliti]"
      },
      {
        "en": "character",
        "ko": "성격, 특징, 등장인물",
        "ipa": "[kéəriktər]"
      },
      {
        "en": "characteristic",
        "ko": "특징적인, 특성",
        "ipa": "[kèərəktərístik]"
      },
      {
        "en": "trait",
        "ko": "특성, 특색",
        "ipa": "[tréit]"
      },
      {
        "en": "temperament",
        "ko": "기질, 성품",
        "ipa": "[témprəmənt]"
      },
      {
        "en": "mood",
        "ko": "기분, 분위기",
        "ipa": "[múːd]"
      },
      {
        "en": "temper",
        "ko": "성질, 성미, 누그러뜨리다",
        "ipa": "[témpər]"
      },
      {
        "en": "sympathy",
        "ko": "동정, 공감",
        "ipa": "[símpəθi]"
      },
      {
        "en": "sympathize",
        "ko": "동정하다, 공감하다",
        "ipa": "[símpəθàiz]"
      },
      {
        "en": "empathy",
        "ko": "감정이입, 공감",
        "ipa": "[émpəθi]"
      },
      {
        "en": "compassion",
        "ko": "연민, 동정심",
        "ipa": "[kəmpǽʃən]"
      },
      {
        "en": "pity",
        "ko": "동정, 불쌍히 여김, 유감",
        "ipa": "[píti]"
      },
      {
        "en": "mercy",
        "ko": "자비, 연민",
        "ipa": "[mə́ːrsi]"
      },
      {
        "en": "merciful",
        "ko": "자비로운",
        "ipa": "[mə́ːrsifəl]"
      },
      {
        "en": "ruthless",
        "ko": "무자비한, 가차없는",
        "ipa": "[rúːθləs]"
      },
      {
        "en": "cruel",
        "ko": "잔인한, 잔혹한",
        "ipa": "[krúːəl]"
      },
      {
        "en": "cruelty",
        "ko": "잔인함",
        "ipa": "[krúːlti]"
      },
      {
        "en": "hostile",
        "ko": "적대적인",
        "ipa": "[hástəl]"
      },
      {
        "en": "hostility",
        "ko": "적대감",
        "ipa": "[hastíləti]"
      },
      {
        "en": "aggressive",
        "ko": "공격적인, 적극적인",
        "ipa": "[əgrésiv]"
      },
      {
        "en": "aggression",
        "ko": "공격, 침략",
        "ipa": "[əgréʃən]"
      },
      {
        "en": "violent",
        "ko": "폭력적인, 격렬한",
        "ipa": "[váiələnt]"
      },
      {
        "en": "violence",
        "ko": "폭력, 폭력 행위",
        "ipa": "[váiələns]"
      },
      {
        "en": "gentle",
        "ko": "온화한, 부드러운",
        "ipa": "[dʒéntəl]"
      },
      {
        "en": "mild",
        "ko": "온화한, 순한",
        "ipa": "[máild]"
      },
      {
        "en": "tender",
        "ko": "부드러운, 다정한",
        "ipa": "[téndər]"
      },
      {
        "en": "generous",
        "ko": "관대한, 후한",
        "ipa": "[dʒénərəs]"
      },
      {
        "en": "generosity",
        "ko": "관대함, 아량",
        "ipa": "[dʒènərásəti]"
      },
      {
        "en": "selfish",
        "ko": "이기적인",
        "ipa": "[sélfiʃ]"
      },
      {
        "en": "selfless",
        "ko": "이타적인, 사심 없는",
        "ipa": "[sélfləs]"
      },
      {
        "en": "altruistic",
        "ko": "이타적인",
        "ipa": "[ɔ̀ːltruːístik]"
      },
      {
        "en": "greedy",
        "ko": "탐욕스러운, 욕심 많은",
        "ipa": "[gríːdi]"
      },
      {
        "en": "greed",
        "ko": "탐욕, 욕심",
        "ipa": "[gríːd]"
      },
      {
        "en": "modest",
        "ko": "겸손한, 알맞은",
        "ipa": "[mádəst]"
      },
      {
        "en": "modesty",
        "ko": "겸손",
        "ipa": "[mádəsti]"
      },
      {
        "en": "humble",
        "ko": "겸손한, 초라한",
        "ipa": "[hʌ́mbəl]"
      },
      {
        "en": "arrogant",
        "ko": "거만한, 오만한",
        "ipa": "[éərəgənt]"
      },
      {
        "en": "arrogance",
        "ko": "오만, 거만",
        "ipa": "[éərəgəns]"
      }
    ]
  },
  {
    "id": "wm2000_day_13",
    "book": "워드마스터 수능 2000",
    "title": "Day 13",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "communicate",
        "ko": "의사소통하다, 전달하다",
        "ipa": "[kəmjúːnəkèit]"
      },
      {
        "en": "communication",
        "ko": "의사소통, 통신",
        "ipa": "[kəmjùːnəkéiʃən]"
      },
      {
        "en": "express",
        "ko": "표현하다, 급행의",
        "ipa": "[iksprés]"
      },
      {
        "en": "expression",
        "ko": "표현, 표정",
        "ipa": "[ikspréʃən]"
      },
      {
        "en": "expressive",
        "ko": "표현이 풍부한",
        "ipa": "[iksprésiv]"
      },
      {
        "en": "convey",
        "ko": "전달하다, 운르다",
        "ipa": "[kənvéi]"
      },
      {
        "en": "deliver",
        "ko": "전달하다, 배달하다, 연설하다",
        "ipa": "[dilívər]"
      },
      {
        "en": "delivery",
        "ko": "배달, 전달",
        "ipa": "[dilívəri]"
      },
      {
        "en": "message",
        "ko": "메시지, 전갈",
        "ipa": "[mésədʒ]"
      },
      {
        "en": "messenger",
        "ko": "전령, 배달원",
        "ipa": "[mésəndʒər]"
      },
      {
        "en": "signal",
        "ko": "신호, 신호를 보내다",
        "ipa": "[sígnəl]"
      },
      {
        "en": "gesture",
        "ko": "몸짓, 제스처",
        "ipa": "[dʒéstʃər]"
      },
      {
        "en": "sign",
        "ko": "표지판, 서명하다, 징후",
        "ipa": "[sáin]"
      },
      {
        "en": "symbol",
        "ko": "상징, 기호",
        "ipa": "[símbəl]"
      },
      {
        "en": "symbolize",
        "ko": "상징하다",
        "ipa": "[símbəlàiz]"
      },
      {
        "en": "metaphor",
        "ko": "은유, 비유",
        "ipa": "[métəfɔr]"
      },
      {
        "en": "analogy",
        "ko": "비유, 유사점",
        "ipa": "[ənǽlədʒi]"
      },
      {
        "en": "dialogue",
        "ko": "대화, 문답",
        "ipa": "[dáiəlɔ̀ːg]"
      },
      {
        "en": "conversation",
        "ko": "대화, 담화",
        "ipa": "[kànvərséiʃən]"
      },
      {
        "en": "chat",
        "ko": "잡담하다, 대화",
        "ipa": "[tʃǽt]"
      },
      {
        "en": "discuss",
        "ko": "토론하다, 논의하다",
        "ipa": "[diskʌ́s]"
      },
      {
        "en": "discussion",
        "ko": "토론, 논의",
        "ipa": "[diskʌ́ʃən]"
      },
      {
        "en": "debate",
        "ko": "토론, 논쟁하다",
        "ipa": "[dəbéit]"
      },
      {
        "en": "argue",
        "ko": "주장하다, 언쟁하다",
        "ipa": "[áːrgjuː]"
      },
      {
        "en": "argument",
        "ko": "주장, 논쟁",
        "ipa": "[áːrgjəmənt]"
      },
      {
        "en": "persuade",
        "ko": "설득하다",
        "ipa": "[pərswéid]"
      },
      {
        "en": "persuasion",
        "ko": "설득",
        "ipa": "[pərswéiʒən]"
      },
      {
        "en": "persuasive",
        "ko": "설득력 있는",
        "ipa": "[pərswéisiv]"
      },
      {
        "en": "convince",
        "ko": "확신시키다, 납득시키다",
        "ipa": "[kənvíns]"
      },
      {
        "en": "convincing",
        "ko": "설득력 있는",
        "ipa": "[kənvínsiŋ]"
      },
      {
        "en": "broadcast",
        "ko": "방송하다, 방영",
        "ipa": "[brɔ́ːdkæ̀st]"
      },
      {
        "en": "network",
        "ko": "네트워크, 망",
        "ipa": "[nétwə̀ːrk]"
      },
      {
        "en": "journal",
        "ko": "일기, 학술지, 잡지",
        "ipa": "[dʒə́ːrnəl]"
      },
      {
        "en": "journalism",
        "ko": "언론, 저널리즘",
        "ipa": "[dʒə́ːrnəlìzəm]"
      },
      {
        "en": "journalist",
        "ko": "기자, 저널리스트",
        "ipa": "[dʒə́ːrnələst]"
      },
      {
        "en": "headline",
        "ko": "표제, 헤드라인",
        "ipa": "[hédlàin]"
      },
      {
        "en": "article",
        "ko": "기사, 조항, 물건",
        "ipa": "[áːrtəkəl]"
      },
      {
        "en": "column",
        "ko": "기둥, 칼럼, 난",
        "ipa": "[káləm]"
      },
      {
        "en": "editorial",
        "ko": "사설, 편집의",
        "ipa": "[èdətɔ́ːriəl]"
      },
      {
        "en": "press",
        "ko": "언론, 누르다, 인쇄기",
        "ipa": "[prés]"
      }
    ]
  },
  {
    "id": "wm2000_day_14",
    "book": "워드마스터 수능 2000",
    "title": "Day 14",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "geography",
        "ko": "지리학, 지리",
        "ipa": "[dʒiágrəfi]"
      },
      {
        "en": "geographic",
        "ko": "지리적인",
        "ipa": "[dʒìːəgrǽfik]"
      },
      {
        "en": "region",
        "ko": "지역, 지방",
        "ipa": "[ríːdʒən]"
      },
      {
        "en": "regional",
        "ko": "지역의, 지방의",
        "ipa": "[ríːdʒənəl]"
      },
      {
        "en": "district",
        "ko": "구역, 지역",
        "ipa": "[dístrikt]"
      },
      {
        "en": "area",
        "ko": "면적, 지역, 영역",
        "ipa": "[éəriə]"
      },
      {
        "en": "zone",
        "ko": "구역, 지대",
        "ipa": "[zóun]"
      },
      {
        "en": "territory",
        "ko": "영토, 영역",
        "ipa": "[téəritɔ̀ːri]"
      },
      {
        "en": "boundary",
        "ko": "경계, 한계",
        "ipa": "[báundəri]"
      },
      {
        "en": "border",
        "ko": "국경, 가장자리",
        "ipa": "[bɔ́ːrdər]"
      },
      {
        "en": "frontier",
        "ko": "국경, 미개척 영역",
        "ipa": "[frəntíər]"
      },
      {
        "en": "location",
        "ko": "위치, 장소",
        "ipa": "[loukéiʃən]"
      },
      {
        "en": "locate",
        "ko": "위치시키다, 찾아내다",
        "ipa": "[lóukèit]"
      },
      {
        "en": "destination",
        "ko": "목적지, 행선지",
        "ipa": "[dèstənéiʃən]"
      },
      {
        "en": "route",
        "ko": "경로, 노선",
        "ipa": "[rúːt]"
      },
      {
        "en": "path",
        "ko": "길, 경로",
        "ipa": "[pǽθ]"
      },
      {
        "en": "passage",
        "ko": "통로, 통과, 구절",
        "ipa": "[pǽsədʒ]"
      },
      {
        "en": "travel",
        "ko": "여행하다, 이동하다",
        "ipa": "[trǽvəl]"
      },
      {
        "en": "journey",
        "ko": "여행, 여정",
        "ipa": "[dʒə́ːrni]"
      },
      {
        "en": "trip",
        "ko": "여행, 발을 헛디디다",
        "ipa": "[tríp]"
      },
      {
        "en": "tour",
        "ko": "관광, 여행하다",
        "ipa": "[túər]"
      },
      {
        "en": "tourism",
        "ko": "관광업",
        "ipa": "[túərìzəm]"
      },
      {
        "en": "tourist",
        "ko": "관광객",
        "ipa": "[túərəst]"
      },
      {
        "en": "voyage",
        "ko": "항해, 여행",
        "ipa": "[vɔ́iədʒ]"
      },
      {
        "en": "cruise",
        "ko": "유람선 여행",
        "ipa": "[krúːz]"
      },
      {
        "en": "flight",
        "ko": "비행, 항공편",
        "ipa": "[fláit]"
      },
      {
        "en": "departure",
        "ko": "출발",
        "ipa": "[dipáːrtʃər]"
      },
      {
        "en": "depart",
        "ko": "출발하다, 떠나다",
        "ipa": "[dipáːrt]"
      },
      {
        "en": "arrival",
        "ko": "도착",
        "ipa": "[əráivəl]"
      },
      {
        "en": "arrive",
        "ko": "도착하다",
        "ipa": "[əráiv]"
      },
      {
        "en": "transport",
        "ko": "수송하다, 운송",
        "ipa": "[trænspɔ́ːrt]"
      },
      {
        "en": "transportation",
        "ko": "교통수단, 수송",
        "ipa": "[træ̀nspərtéiʃən]"
      },
      {
        "en": "vehicle",
        "ko": "차량, 탈것, 수단",
        "ipa": "[víːhikəl]"
      },
      {
        "en": "passenger",
        "ko": "승객",
        "ipa": "[pǽsəndʒər]"
      },
      {
        "en": "commute",
        "ko": "통근하다, 통근",
        "ipa": "[kəmjúːt]"
      },
      {
        "en": "pedestrian",
        "ko": "보행자",
        "ipa": "[pədéstriən]"
      },
      {
        "en": "traffic",
        "ko": "교통, 교통량",
        "ipa": "[trǽfik]"
      },
      {
        "en": "congestion",
        "ko": "혼잡, 정체",
        "ipa": "[kəndʒéstʃən]"
      },
      {
        "en": "highway",
        "ko": "고속도로",
        "ipa": "[háiwèi]"
      },
      {
        "en": "transit",
        "ko": "환승, 수송",
        "ipa": "[trǽnzit]"
      }
    ]
  },
  {
    "id": "wm2000_day_15",
    "book": "워드마스터 수능 2000",
    "title": "Day 15",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "universe",
        "ko": "우주, 만물",
        "ipa": "[júːnəvə̀ːrs]"
      },
      {
        "en": "universal",
        "ko": "보편적인, 우주의",
        "ipa": "[jùːnəvə́ːrsəl]"
      },
      {
        "en": "galaxy",
        "ko": "은하, 은하수",
        "ipa": "[gǽləksi]"
      },
      {
        "en": "solar",
        "ko": "태양의",
        "ipa": "[sóulər]"
      },
      {
        "en": "lunar",
        "ko": "달의",
        "ipa": "[lúːnər]"
      },
      {
        "en": "planet",
        "ko": "행성",
        "ipa": "[plǽnət]"
      },
      {
        "en": "planetary",
        "ko": "행성의",
        "ipa": "[plǽnətèəri]"
      },
      {
        "en": "satellite",
        "ko": "위성, 인공위성",
        "ipa": "[sǽtəlàit]"
      },
      {
        "en": "orbit",
        "ko": "궤도, 궤도를 돌다",
        "ipa": "[ɔ́ːrbət]"
      },
      {
        "en": "gravity",
        "ko": "중력, 중대성",
        "ipa": "[grǽvəti]"
      },
      {
        "en": "gravitational",
        "ko": "중력의",
        "ipa": "[græ̀vitéiʃənəl]"
      },
      {
        "en": "atmosphere",
        "ko": "대기, 공기, 분위기",
        "ipa": "[ǽtməsfìər]"
      },
      {
        "en": "atmospheric",
        "ko": "대기의",
        "ipa": "[æ̀tməsféərik]"
      },
      {
        "en": "radiation",
        "ko": "방사선, 복사",
        "ipa": "[rèidiéiʃən]"
      },
      {
        "en": "radiate",
        "ko": "방사하다, 내뿜다",
        "ipa": "[réidiət]"
      },
      {
        "en": "spectrum",
        "ko": "스펙트럼, 범위",
        "ipa": "[spéktrəm]"
      },
      {
        "en": "telescope",
        "ko": "망원경",
        "ipa": "[téləskòup]"
      },
      {
        "en": "microscope",
        "ko": "현미경",
        "ipa": "[máikrəskòup]"
      },
      {
        "en": "spacecraft",
        "ko": "우주선",
        "ipa": "[spéiskræ̀ft]"
      },
      {
        "en": "astronaut",
        "ko": "우주비행사",
        "ipa": "[ǽstrənàt]"
      },
      {
        "en": "astronomy",
        "ko": "천문학",
        "ipa": "[əstránəmi]"
      },
      {
        "en": "astronomer",
        "ko": "천문학자",
        "ipa": "[əstránəmər]"
      },
      {
        "en": "astrology",
        "ko": "점성술",
        "ipa": "[əstrálədʒi]"
      },
      {
        "en": "physics",
        "ko": "물리학",
        "ipa": "[fíziks]"
      },
      {
        "en": "physicist",
        "ko": "물리학자",
        "ipa": "[fízisist]"
      },
      {
        "en": "motion",
        "ko": "운동, 움직임, 발의",
        "ipa": "[móuʃən]"
      },
      {
        "en": "velocity",
        "ko": "속도",
        "ipa": "[vəlásəti]"
      },
      {
        "en": "acceleration",
        "ko": "가속도",
        "ipa": "[æ̀ksèləréiʃən]"
      },
      {
        "en": "accelerate",
        "ko": "가속하다, 촉진하다",
        "ipa": "[æksélərèit]"
      },
      {
        "en": "mass",
        "ko": "질량, 덩어리, 대중",
        "ipa": "[mǽs]"
      },
      {
        "en": "density",
        "ko": "밀도, 농도",
        "ipa": "[dénsəti]"
      },
      {
        "en": "dense",
        "ko": "빽빽한, 밀집한",
        "ipa": "[déns]"
      },
      {
        "en": "friction",
        "ko": "마찰, 마찰력, 갈등",
        "ipa": "[fríkʃən]"
      },
      {
        "en": "magnet",
        "ko": "자석, 끌어당기는 것",
        "ipa": "[mǽgnət]"
      },
      {
        "en": "magnetic",
        "ko": "자석의, 매력 있는",
        "ipa": "[mægnétik]"
      },
      {
        "en": "particle",
        "ko": "입자, 극소량",
        "ipa": "[páːrtəkəl]"
      },
      {
        "en": "atom",
        "ko": "원자",
        "ipa": "[ǽtəm]"
      },
      {
        "en": "atomic",
        "ko": "원자의",
        "ipa": "[ətámik]"
      },
      {
        "en": "molecule",
        "ko": "분자",
        "ipa": "[máləkjùːl]"
      },
      {
        "en": "molecular",
        "ko": "분자의",
        "ipa": "[məlékjələr]"
      }
    ]
  },
  {
    "id": "wm2000_day_16",
    "book": "워드마스터 수능 2000",
    "title": "Day 16",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "biology",
        "ko": "생물학",
        "ipa": "[baiálədʒi]"
      },
      {
        "en": "biological",
        "ko": "생물학적인",
        "ipa": "[bàiəládʒikəl]"
      },
      {
        "en": "organism",
        "ko": "유기체, 생물",
        "ipa": "[ɔ́ːrgənìzəm]"
      },
      {
        "en": "cell",
        "ko": "세포, 칸",
        "ipa": "[sél]"
      },
      {
        "en": "cellular",
        "ko": "세포의",
        "ipa": "[séljələr]"
      },
      {
        "en": "gene",
        "ko": "유전자",
        "ipa": "[dʒíːn]"
      },
      {
        "en": "genetic",
        "ko": "유전의, 유전학의",
        "ipa": "[dʒənétik]"
      },
      {
        "en": "genetics",
        "ko": "유전학",
        "ipa": "[dʒənétiks]"
      },
      {
        "en": "genome",
        "ko": "게놈, 유전체",
        "ipa": "[dʒíːnòum]"
      },
      {
        "en": "DNA",
        "ko": "디엔에이, 유전자 본체",
        "ipa": "[díːènéi]"
      },
      {
        "en": "heredity",
        "ko": "유전",
        "ipa": "[hərédəti]"
      },
      {
        "en": "hereditary",
        "ko": "유전적인",
        "ipa": "[hərédətèəri]"
      },
      {
        "en": "inherit",
        "ko": "물려받다, 상속하다",
        "ipa": "[ìnhéərət]"
      },
      {
        "en": "inheritance",
        "ko": "유산, 상속",
        "ipa": "[ìnhéərətəns]"
      },
      {
        "en": "evolve",
        "ko": "진화하다, 발전하다",
        "ipa": "[iválv]"
      },
      {
        "en": "evolution",
        "ko": "진화, 발전",
        "ipa": "[èvəlúːʃən]"
      },
      {
        "en": "evolutionary",
        "ko": "진화의",
        "ipa": "[èvəlúːʃənèəri]"
      },
      {
        "en": "adapt",
        "ko": "적응하다, 맞추다",
        "ipa": "[ədǽpt]"
      },
      {
        "en": "adaptation",
        "ko": "적응, 각색",
        "ipa": "[æ̀dəptéiʃən]"
      },
      {
        "en": "survival",
        "ko": "생존",
        "ipa": "[sərváivəl]"
      },
      {
        "en": "survive",
        "ko": "살아남다, 생존하다",
        "ipa": "[sərváiv]"
      },
      {
        "en": "survivor",
        "ko": "생존자",
        "ipa": "[sərváivər]"
      },
      {
        "en": "mutation",
        "ko": "돌연변이",
        "ipa": "[mjuːtéiʃən]"
      },
      {
        "en": "mutate",
        "ko": "돌연변이를 일으키다",
        "ipa": "[mjúːtèit]"
      },
      {
        "en": "reproduce",
        "ko": "번식하다, 복제하다",
        "ipa": "[rìːprədúːs]"
      },
      {
        "en": "reproduction",
        "ko": "번식, 생식, 복제",
        "ipa": "[rìːprədʌ́kʃən]"
      },
      {
        "en": "offspring",
        "ko": "자손, 새끼",
        "ipa": "[ɔ́ːfsprìŋ]"
      },
      {
        "en": "ancestor",
        "ko": "조상, 선조",
        "ipa": "[ǽnsèstər]"
      },
      {
        "en": "descendant",
        "ko": "자손, 후손",
        "ipa": "[diséndənt]"
      },
      {
        "en": "trait",
        "ko": "형질, 특성",
        "ipa": "[tréit]"
      },
      {
        "en": "tissue",
        "ko": "조직, 화장지",
        "ipa": "[tísjùː]"
      },
      {
        "en": "organ",
        "ko": "장기, 기관, 오르간",
        "ipa": "[ɔ́ːrgən]"
      },
      {
        "en": "system",
        "ko": "체계, 계통, 계",
        "ipa": "[sístəm]"
      },
      {
        "en": "skeleton",
        "ko": "골격, 뼈대",
        "ipa": "[skélətən]"
      },
      {
        "en": "bone",
        "ko": "뼈",
        "ipa": "[bóun]"
      },
      {
        "en": "muscle",
        "ko": "근육",
        "ipa": "[mʌ́səl]"
      },
      {
        "en": "muscular",
        "ko": "근육의, 강건한",
        "ipa": "[mʌ́skjələr]"
      },
      {
        "en": "nerve",
        "ko": "신경, 용기",
        "ipa": "[nə́ːrv]"
      },
      {
        "en": "nervous",
        "ko": "신경의, 긴장한",
        "ipa": "[nə́ːrvəs]"
      },
      {
        "en": "brain",
        "ko": "뇌, 두뇌, 지능",
        "ipa": "[bréin]"
      }
    ]
  },
  {
    "id": "wm2000_day_17",
    "book": "워드마스터 수능 2000",
    "title": "Day 17",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "nutrition",
        "ko": "영양, 영양 섭취",
        "ipa": "[nuːtríʃən]"
      },
      {
        "en": "nutrient",
        "ko": "영양소, 영양분",
        "ipa": "[núːtriənt]"
      },
      {
        "en": "nutritious",
        "ko": "영양가 있는",
        "ipa": "[nuːtríʃəs]"
      },
      {
        "en": "diet",
        "ko": "식습관, 다이어트, 식단",
        "ipa": "[dáiət]"
      },
      {
        "en": "dietary",
        "ko": "음식의, 식이의",
        "ipa": "[dáiətèəri]"
      },
      {
        "en": "calorie",
        "ko": "칼로리, 열량",
        "ipa": "[kǽləri]"
      },
      {
        "en": "protein",
        "ko": "단백질",
        "ipa": "[próutìːn]"
      },
      {
        "en": "carbohydrate",
        "ko": "탄수화물",
        "ipa": "[kàːrbouháidrèit]"
      },
      {
        "en": "fat",
        "ko": "지방, 살찐",
        "ipa": "[fǽt]"
      },
      {
        "en": "vitamin",
        "ko": "비타민",
        "ipa": "[váitəmən]"
      },
      {
        "en": "mineral",
        "ko": "미네랄, 광물",
        "ipa": "[mínərəl]"
      },
      {
        "en": "fiber",
        "ko": "섬유질, 섬유",
        "ipa": "[fáibər]"
      },
      {
        "en": "ingredient",
        "ko": "재료, 성분",
        "ipa": "[ìngríːdiənt]"
      },
      {
        "en": "recipe",
        "ko": "조리법, 비결",
        "ipa": "[résəpi]"
      },
      {
        "en": "flavor",
        "ko": "맛, 풍미",
        "ipa": "[fléivər]"
      },
      {
        "en": "digest",
        "ko": "소화하다, 요약하다",
        "ipa": "[daidʒést]"
      },
      {
        "en": "digestion",
        "ko": "소화, 소화력",
        "ipa": "[daidʒéstʃən]"
      },
      {
        "en": "digestive",
        "ko": "소화의",
        "ipa": "[daidʒéstiv]"
      },
      {
        "en": "appetite",
        "ko": "식욕, 욕구",
        "ipa": "[ǽpətàit]"
      },
      {
        "en": "hunger",
        "ko": "굶주림, 배고픔",
        "ipa": "[hʌ́ŋgər]"
      },
      {
        "en": "thirsty",
        "ko": "목마른",
        "ipa": "[θə́ːrsti]"
      },
      {
        "en": "hygiene",
        "ko": "위생, 청결",
        "ipa": "[háidʒìːn]"
      },
      {
        "en": "sanitary",
        "ko": "위생의, 위생적인",
        "ipa": "[sǽnitèəri]"
      },
      {
        "en": "disease",
        "ko": "질병, 질환",
        "ipa": "[dizíːz]"
      },
      {
        "en": "illness",
        "ko": "질병, 아픔",
        "ipa": "[ílnəs]"
      },
      {
        "en": "symptom",
        "ko": "증상, 징후",
        "ipa": "[símptəm]"
      },
      {
        "en": "syndrome",
        "ko": "증후군",
        "ipa": "[síndròum]"
      },
      {
        "en": "fever",
        "ko": "열, 발열",
        "ipa": "[fíːvər]"
      },
      {
        "en": "infection",
        "ko": "감염, 전염",
        "ipa": "[ìnfékʃən]"
      },
      {
        "en": "infect",
        "ko": "감염시키다",
        "ipa": "[ìnfékt]"
      },
      {
        "en": "infectious",
        "ko": "전염성의",
        "ipa": "[ìnfékʃəs]"
      },
      {
        "en": "contagious",
        "ko": "전염성의, 전파되는",
        "ipa": "[kəntéidʒəs]"
      },
      {
        "en": "epidemic",
        "ko": "유행병, 유행성의",
        "ipa": "[èpədémik]"
      },
      {
        "en": "pandemic",
        "ko": "전국적 유행병",
        "ipa": "[pændémik]"
      },
      {
        "en": "immune",
        "ko": "면역의, 면제된",
        "ipa": "[ìmjúːn]"
      },
      {
        "en": "immunity",
        "ko": "면역, 면제",
        "ipa": "[ìmjúːnəti]"
      },
      {
        "en": "vaccine",
        "ko": "백신",
        "ipa": "[væ̀ksíːn]"
      },
      {
        "en": "vaccinate",
        "ko": "예방접종을 하다",
        "ipa": "[vǽksəneit]"
      },
      {
        "en": "diagnose",
        "ko": "진단하다",
        "ipa": "[dàiəgnóus]"
      },
      {
        "en": "diagnosis",
        "ko": "진단",
        "ipa": "[dàiəgnóusəs]"
      }
    ]
  },
  {
    "id": "wm2000_day_18",
    "book": "워드마스터 수능 2000",
    "title": "Day 18",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "architecture",
        "ko": "건축, 건축학",
        "ipa": "[áːrkətèktʃər]"
      },
      {
        "en": "architect",
        "ko": "건축가, 설계자",
        "ipa": "[áːrkətèkt]"
      },
      {
        "en": "architectural",
        "ko": "건축의",
        "ipa": "[àːrkətéktʃərəl]"
      },
      {
        "en": "structure",
        "ko": "구조, 구조물",
        "ipa": "[strʌ́ktʃər]"
      },
      {
        "en": "structural",
        "ko": "구조의",
        "ipa": "[strʌ́ktʃərəl]"
      },
      {
        "en": "construct",
        "ko": "건설하다, 구성하다",
        "ipa": "[kənstrʌ́kt]"
      },
      {
        "en": "construction",
        "ko": "건설, 공사",
        "ipa": "[kənstrʌ́kʃən]"
      },
      {
        "en": "destructive",
        "ko": "파괴적인",
        "ipa": "[distrʌ́ktiv]"
      },
      {
        "en": "destroy",
        "ko": "파괴하다",
        "ipa": "[distrɔ́i]"
      },
      {
        "en": "infrastructure",
        "ko": "사회 기반 시설",
        "ipa": "[ìnfrəstrʌ́ktʃər]"
      },
      {
        "en": "facility",
        "ko": "시설, 편의시설, 재능",
        "ipa": "[fəsíliti]"
      },
      {
        "en": "foundation",
        "ko": "기초, 토대, 재단",
        "ipa": "[faundéiʃən]"
      },
      {
        "en": "framework",
        "ko": "틀, 뼈대",
        "ipa": "[fréimwə̀ːrk]"
      },
      {
        "en": "pillar",
        "ko": "기둥, 중심축",
        "ipa": "[pílər]"
      },
      {
        "en": "column",
        "ko": "원주, 기둥",
        "ipa": "[káləm]"
      },
      {
        "en": "ceiling",
        "ko": "천장, 상한선",
        "ipa": "[síːliŋ]"
      },
      {
        "en": "floor",
        "ko": "바닥, 층",
        "ipa": "[flɔ́ːr]"
      },
      {
        "en": "roof",
        "ko": "지붕",
        "ipa": "[rúːf]"
      },
      {
        "en": "shelter",
        "ko": "주거지, 피난처, 보호하다",
        "ipa": "[ʃéltər]"
      },
      {
        "en": "dwelling",
        "ko": "주거, 서식지",
        "ipa": "[dwéliŋ]"
      },
      {
        "en": "residence",
        "ko": "거주지, 주택",
        "ipa": "[rézidəns]"
      },
      {
        "en": "resident",
        "ko": "주민, 거주자",
        "ipa": "[rézidənt]"
      },
      {
        "en": "residential",
        "ko": "주거의",
        "ipa": "[rèzidénʃəl]"
      },
      {
        "en": "reside",
        "ko": "살다, 거주하다",
        "ipa": "[rizáid]"
      },
      {
        "en": "inhabit",
        "ko": "살다, 서식하다",
        "ipa": "[ìnhǽbət]"
      },
      {
        "en": "inhabitant",
        "ko": "주민, 서식 동물",
        "ipa": "[inhǽbətənt]"
      },
      {
        "en": "urban",
        "ko": "도시의",
        "ipa": "[ə́ːrbən]"
      },
      {
        "en": "rural",
        "ko": "시골의, 농촌의",
        "ipa": "[rúərəl]"
      },
      {
        "en": "suburb",
        "ko": "교외, 근교",
        "ipa": "[sʌ́bərb]"
      },
      {
        "en": "suburban",
        "ko": "교외의",
        "ipa": "[səbə́ːrbən]"
      },
      {
        "en": "metropolis",
        "ko": "대도시, 중심지",
        "ipa": "[mətrápələs]"
      },
      {
        "en": "metropolitan",
        "ko": "대도시의",
        "ipa": "[mètrəpálətən]"
      },
      {
        "en": "downtown",
        "ko": "도심, 시내",
        "ipa": "[dáuntáun]"
      },
      {
        "en": "skyscraper",
        "ko": "초고층 건물",
        "ipa": "[skáiskrèipər]"
      },
      {
        "en": "estate",
        "ko": "부동산, 사유지",
        "ipa": "[istéit]"
      },
      {
        "en": "property",
        "ko": "재산, 부동산, 속성",
        "ipa": "[prápərti]"
      },
      {
        "en": "tenant",
        "ko": "세입자, 임차인",
        "ipa": "[ténənt]"
      },
      {
        "en": "landlord",
        "ko": "임대인, 집주인",
        "ipa": "[lǽndlɔ̀ːrd]"
      },
      {
        "en": "rent",
        "ko": "임대료, 빌리다",
        "ipa": "[rént]"
      },
      {
        "en": "mortgage",
        "ko": "주택 담보 대출",
        "ipa": "[mɔ́ːrgədʒ]"
      }
    ]
  },
  {
    "id": "wm2000_day_19",
    "book": "워드마스터 수능 2000",
    "title": "Day 19",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "sense",
        "ko": "감각, 의미, 분별력",
        "ipa": "[séns]"
      },
      {
        "en": "sensory",
        "ko": "감각의",
        "ipa": "[sénsəri]"
      },
      {
        "en": "sensible",
        "ko": "현명한, 분별 있는",
        "ipa": "[sénsəbəl]"
      },
      {
        "en": "sensitive",
        "ko": "민감한, 예민한",
        "ipa": "[sénsətiv]"
      },
      {
        "en": "sensitivity",
        "ko": "민감성, 감수성",
        "ipa": "[sènsitíviti]"
      },
      {
        "en": "perceive",
        "ko": "지각하다, 인지하다",
        "ipa": "[pərsíːv]"
      },
      {
        "en": "perception",
        "ko": "지각, 인식",
        "ipa": "[pərsépʃən]"
      },
      {
        "en": "perceptive",
        "ko": "통찰력 있는",
        "ipa": "[pərséptiv]"
      },
      {
        "en": "sight",
        "ko": "시각, 시력, 광경",
        "ipa": "[sáit]"
      },
      {
        "en": "vision",
        "ko": "시력, 시야, 비전",
        "ipa": "[víʒən]"
      },
      {
        "en": "visual",
        "ko": "시각의, 눈에 보이는",
        "ipa": "[víʒəwəl]"
      },
      {
        "en": "visualize",
        "ko": "시각화하다, 상상하다",
        "ipa": "[víʒwəlàiz]"
      },
      {
        "en": "hearing",
        "ko": "청각, 청력, 공청회",
        "ipa": "[híːriŋ]"
      },
      {
        "en": "auditory",
        "ko": "청각의",
        "ipa": "[ɔ́ːditɔ̀ːri]"
      },
      {
        "en": "audible",
        "ko": "들리는, 들을 수 있는",
        "ipa": "[ádəbəl]"
      },
      {
        "en": "taste",
        "ko": "미각, 맛, 취향",
        "ipa": "[téist]"
      },
      {
        "en": "flavor",
        "ko": "맛, 향미",
        "ipa": "[fléivər]"
      },
      {
        "en": "smell",
        "ko": "후각, 냄새, 맡다",
        "ipa": "[smél]"
      },
      {
        "en": "odor",
        "ko": "냄새, 악취",
        "ipa": "[óudər]"
      },
      {
        "en": "scent",
        "ko": "향기, 냄새",
        "ipa": "[sént]"
      },
      {
        "en": "touch",
        "ko": "촉각, 만지다",
        "ipa": "[tʌ́tʃ]"
      },
      {
        "en": "tactile",
        "ko": "촉각의",
        "ipa": "[tǽktil]"
      },
      {
        "en": "cognition",
        "ko": "인지, 인식",
        "ipa": "[kagníʃən]"
      },
      {
        "en": "cognitive",
        "ko": "인지의, 인식의",
        "ipa": "[kágnitiv]"
      },
      {
        "en": "comprehend",
        "ko": "이해하다, 파악하다",
        "ipa": "[kàmprihénd]"
      },
      {
        "en": "comprehension",
        "ko": "이해, 이해력",
        "ipa": "[kàmprihénʃən]"
      },
      {
        "en": "comprehensive",
        "ko": "포괄적인, 종합적인",
        "ipa": "[kàmprihénsiv]"
      },
      {
        "en": "recognize",
        "ko": "알아보다, 인정하다",
        "ipa": "[rékəgnàiz]"
      },
      {
        "en": "recognition",
        "ko": "인식, 인정",
        "ipa": "[rèkəgníʃən]"
      },
      {
        "en": "aware",
        "ko": "알고 있는",
        "ipa": "[əwéər]"
      },
      {
        "en": "awareness",
        "ko": "인식, 자각",
        "ipa": "[əwéərnəs]"
      },
      {
        "en": "conscious",
        "ko": "의식하는, 자각하는",
        "ipa": "[kánʃəs]"
      },
      {
        "en": "consciousness",
        "ko": "의식, 자각",
        "ipa": "[kánʃəsnəs]"
      },
      {
        "en": "unconscious",
        "ko": "무의식의, 의식을 잃은",
        "ipa": "[ʌ̀nkánʃəs]"
      },
      {
        "en": "subconscious",
        "ko": "잠재의식의",
        "ipa": "[səbkánʃəs]"
      },
      {
        "en": "intuition",
        "ko": "직관, 직감",
        "ipa": "[ìntuːíʃən]"
      },
      {
        "en": "intuitive",
        "ko": "직관적인",
        "ipa": "[ìntúːətiv]"
      },
      {
        "en": "insight",
        "ko": "통찰력, 안목",
        "ipa": "[ínsàit]"
      },
      {
        "en": "logic",
        "ko": "논리, 논리학",
        "ipa": "[ládʒik]"
      },
      {
        "en": "reasoning",
        "ko": "추론, 추리",
        "ipa": "[ríːzəniŋ]"
      }
    ]
  },
  {
    "id": "wm2000_day_20",
    "book": "워드마스터 수능 2000",
    "title": "Day 20",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "cooperate",
        "ko": "협력하다, 협동하다",
        "ipa": "[kouápərèit]"
      },
      {
        "en": "cooperation",
        "ko": "협력, 협동",
        "ipa": "[kouàpəréiʃən]"
      },
      {
        "en": "cooperative",
        "ko": "협력적인, 협동조합",
        "ipa": "[kouápərèitiv]"
      },
      {
        "en": "collaborate",
        "ko": "공동 작업하다, 협력하다",
        "ipa": "[kəlǽbərèit]"
      },
      {
        "en": "collaboration",
        "ko": "협업, 합작",
        "ipa": "[kəlæ̀bəréiʃən]"
      },
      {
        "en": "collaborative",
        "ko": "협력적인",
        "ipa": "[kəlǽbərèitiv]"
      },
      {
        "en": "coordinate",
        "ko": "조정하다, 조화시키다",
        "ipa": "[kouɔ́ːrdənət]"
      },
      {
        "en": "coordination",
        "ko": "조정, 조화",
        "ipa": "[kouɔ̀ːrdənéiʃən]"
      },
      {
        "en": "ally",
        "ko": "동맹국, 동맹자",
        "ipa": "[ǽlai]"
      },
      {
        "en": "alliance",
        "ko": "동맹, 연합",
        "ipa": "[əláiəns]"
      },
      {
        "en": "partner",
        "ko": "동반자, 협력자",
        "ipa": "[páːrtnər]"
      },
      {
        "en": "partnership",
        "ko": "동반자 관계",
        "ipa": "[páːrtnərʃìp]"
      },
      {
        "en": "colleague",
        "ko": "동료",
        "ipa": "[kálig]"
      },
      {
        "en": "peer",
        "ko": "동료, 또래, 응시하다",
        "ipa": "[píər]"
      },
      {
        "en": "companion",
        "ko": "동반자, 친구",
        "ipa": "[kəmpǽnjən]"
      },
      {
        "en": "comrade",
        "ko": "동지, 전우",
        "ipa": "[kámræ̀d]"
      },
      {
        "en": "conflict",
        "ko": "갈등, 충돌, 대립하다",
        "ipa": "[kánflikt]"
      },
      {
        "en": "confront",
        "ko": "직면하다, 맞서다",
        "ipa": "[kənfrʌ́nt]"
      },
      {
        "en": "confrontation",
        "ko": "대립, 대치",
        "ipa": "[kànfrəntéiʃən]"
      },
      {
        "en": "dispute",
        "ko": "분쟁, 논쟁하다",
        "ipa": "[dispjúːt]"
      },
      {
        "en": "quarrel",
        "ko": "말다툼, 다투다",
        "ipa": "[kwɔ́ːrəl]"
      },
      {
        "en": "friction",
        "ko": "마찰, 불화",
        "ipa": "[fríkʃən]"
      },
      {
        "en": "hostility",
        "ko": "적대감, 적개심",
        "ipa": "[hastíləti]"
      },
      {
        "en": "rival",
        "ko": "경쟁자, 필적하다",
        "ipa": "[ráivəl]"
      },
      {
        "en": "rivalry",
        "ko": "경쟁, 대항",
        "ipa": "[ráivəlri]"
      },
      {
        "en": "compromise",
        "ko": "타협하다, 타협, 손상시키다",
        "ipa": "[kámprəmàiz]"
      },
      {
        "en": "negotiate",
        "ko": "협상하다, 절충하다",
        "ipa": "[nəgóuʃièit]"
      },
      {
        "en": "negotiation",
        "ko": "협상, 교섭",
        "ipa": "[nigòuʃiéiʃən]"
      },
      {
        "en": "reconcile",
        "ko": "화해시키다, 조화시키다",
        "ipa": "[rékənsàil]"
      },
      {
        "en": "reconciliation",
        "ko": "화해, 조화",
        "ipa": "[rèkənsìliéiʃən]"
      },
      {
        "en": "mediate",
        "ko": "중재하다, 조정하다",
        "ipa": "[míːdièit]"
      },
      {
        "en": "mediation",
        "ko": "중재, 조정",
        "ipa": "[mìːdiéiʃən]"
      },
      {
        "en": "mediator",
        "ko": "중재자",
        "ipa": "[míːdièitər]"
      },
      {
        "en": "harmony",
        "ko": "조화, 화합",
        "ipa": "[háːrməni]"
      },
      {
        "en": "harmonious",
        "ko": "조화로운",
        "ipa": "[harmóuniəs]"
      },
      {
        "en": "solidarity",
        "ko": "연대, 결속",
        "ipa": "[sàlədéərəti]"
      },
      {
        "en": "unite",
        "ko": "결합하다, 단결하다",
        "ipa": "[júːnàit]"
      },
      {
        "en": "unity",
        "ko": "통일성, 단결",
        "ipa": "[júːnəti]"
      },
      {
        "en": "isolate",
        "ko": "격리하다, 고립시키다",
        "ipa": "[áisəlèit]"
      },
      {
        "en": "isolation",
        "ko": "고립, 격리",
        "ipa": "[àisəléiʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_21",
    "book": "워드마스터 수능 2000",
    "title": "Day 21",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "desire",
        "ko": "욕구, 갈망, 바라다",
        "ipa": "[dizáiər]"
      },
      {
        "en": "aspire",
        "ko": "열망하다, 염원하다",
        "ipa": "[əspáir]"
      },
      {
        "en": "aspiration",
        "ko": "열망, 포부",
        "ipa": "[æ̀spəréiʃən]"
      },
      {
        "en": "ambition",
        "ko": "야망, 야심",
        "ipa": "[æmbíʃən]"
      },
      {
        "en": "ambitious",
        "ko": "야심 찬, 의욕적인",
        "ipa": "[æmbíʃəs]"
      },
      {
        "en": "motive",
        "ko": "동기, 동인",
        "ipa": "[móutiv]"
      },
      {
        "en": "motivate",
        "ko": "동기를 부여하다",
        "ipa": "[móutəvèit]"
      },
      {
        "en": "motivation",
        "ko": "동기 부여",
        "ipa": "[mòutəvéiʃən]"
      },
      {
        "en": "incentive",
        "ko": "유인책, 장려금",
        "ipa": "[ìnséntiv]"
      },
      {
        "en": "urge",
        "ko": "촉구하다, 강한 충동",
        "ipa": "[ə́ːrdʒ]"
      },
      {
        "en": "impulse",
        "ko": "충동, 자극",
        "ipa": "[ímpəls]"
      },
      {
        "en": "impulsive",
        "ko": "충동적인",
        "ipa": "[ìmpʌ́lsiv]"
      },
      {
        "en": "craving",
        "ko": "갈망, 열망",
        "ipa": "[kréiviŋ]"
      },
      {
        "en": "greed",
        "ko": "탐욕, 식탐",
        "ipa": "[gríːd]"
      },
      {
        "en": "passion",
        "ko": "열정, 격정",
        "ipa": "[pǽʃən]"
      },
      {
        "en": "passionate",
        "ko": "열정적인",
        "ipa": "[pǽʃənət]"
      },
      {
        "en": "enthusiasm",
        "ko": "열정, 열광",
        "ipa": "[inθúːziæ̀zəm]"
      },
      {
        "en": "enthusiastic",
        "ko": "열렬한, 열정적인",
        "ipa": "[inθùːziǽstik]"
      },
      {
        "en": "zeal",
        "ko": "열의, 열성",
        "ipa": "[zíːl]"
      },
      {
        "en": "eager",
        "ko": "간절히 바라는, 열심인",
        "ipa": "[íːgər]"
      },
      {
        "en": "intent",
        "ko": "의도, 전념하는",
        "ipa": "[ìntént]"
      },
      {
        "en": "intention",
        "ko": "의도, 의향",
        "ipa": "[ìnténtʃən]"
      },
      {
        "en": "intentional",
        "ko": "의도적인, 고의의",
        "ipa": "[ìnténʃənəl]"
      },
      {
        "en": "purpose",
        "ko": "목적, 취지",
        "ipa": "[pə́ːrpəs]"
      },
      {
        "en": "purposeful",
        "ko": "목적이 있는, 단호한",
        "ipa": "[pə́ːrpəsfəl]"
      },
      {
        "en": "objective",
        "ko": "목표, 객관적인",
        "ipa": "[əbdʒéktiv]"
      },
      {
        "en": "aim",
        "ko": "겨냥하다, 목표",
        "ipa": "[éim]"
      },
      {
        "en": "goal",
        "ko": "목표, 골",
        "ipa": "[góul]"
      },
      {
        "en": "target",
        "ko": "목표, 표적",
        "ipa": "[táːrgət]"
      },
      {
        "en": "ideal",
        "ko": "이상적인, 이상",
        "ipa": "[aidíːl]"
      },
      {
        "en": "optimistic",
        "ko": "낙관적인, 긍정적인",
        "ipa": "[àptəmístik]"
      },
      {
        "en": "optimism",
        "ko": "낙관주의",
        "ipa": "[áptəmìzəm]"
      },
      {
        "en": "pessimistic",
        "ko": "비관적인",
        "ipa": "[pèsəmístik]"
      },
      {
        "en": "pessimism",
        "ko": "비관주의",
        "ipa": "[pésəmìzəm]"
      },
      {
        "en": "cynical",
        "ko": "냉소적인, 부정적인",
        "ipa": "[sínikəl]"
      },
      {
        "en": "skeptical",
        "ko": "회의적인, 의심 많은",
        "ipa": "[sképtəkəl]"
      },
      {
        "en": "doubtful",
        "ko": "의심스러운",
        "ipa": "[dáutfəl]"
      },
      {
        "en": "hesitant",
        "ko": "망설이는, 주저하는",
        "ipa": "[hézitənt]"
      },
      {
        "en": "reluctant",
        "ko": "꺼리는, 주저하는",
        "ipa": "[rilʌ́ktənt]"
      },
      {
        "en": "willing",
        "ko": "기꺼이 하는, 자진해서 하는",
        "ipa": "[wíliŋ]"
      }
    ]
  },
  {
    "id": "wm2000_day_22",
    "book": "워드마스터 수능 2000",
    "title": "Day 22",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "corporation",
        "ko": "기업, 법인",
        "ipa": "[kɔ̀ːrpəréiʃən]"
      },
      {
        "en": "corporate",
        "ko": "기업의, 법인의",
        "ipa": "[kɔ́ːrpərət]"
      },
      {
        "en": "enterprise",
        "ko": "기업, 사업, 진취성",
        "ipa": "[éntərpràiz]"
      },
      {
        "en": "executive",
        "ko": "경영진, 임원, 실행의",
        "ipa": "[igzékjətiv]"
      },
      {
        "en": "manager",
        "ko": "관리자, 경영자",
        "ipa": "[mǽnədʒər]"
      },
      {
        "en": "supervisor",
        "ko": "감독관, 관리자",
        "ipa": "[súːpərvàizər]"
      },
      {
        "en": "supervise",
        "ko": "감독하다, 지휘하다",
        "ipa": "[súːpərvàiz]"
      },
      {
        "en": "recruit",
        "ko": "채용하다, 신입사원",
        "ipa": "[rəkrúːt]"
      },
      {
        "en": "recruitment",
        "ko": "채용, 신병 모집",
        "ipa": "[rəkrúːtmənt]"
      },
      {
        "en": "hire",
        "ko": "고용하다",
        "ipa": "[háiər]"
      },
      {
        "en": "dismiss",
        "ko": "해고하다, 묵살하다",
        "ipa": "[dismís]"
      },
      {
        "en": "layoff",
        "ko": "일시 해고, 정리해고",
        "ipa": "[léiɔ̀ːf]"
      },
      {
        "en": "resign",
        "ko": "사임하다, 사직하다",
        "ipa": "[rizáin]"
      },
      {
        "en": "resignation",
        "ko": "사직, 사임",
        "ipa": "[rèzəgnéiʃən]"
      },
      {
        "en": "retire",
        "ko": "은퇴하다, 퇴직하다",
        "ipa": "[ritáir]"
      },
      {
        "en": "retirement",
        "ko": "은퇴, 퇴직",
        "ipa": "[ritáiərmənt]"
      },
      {
        "en": "pension",
        "ko": "연금",
        "ipa": "[pénʃən]"
      },
      {
        "en": "salary",
        "ko": "급여, 월급",
        "ipa": "[sǽləri]"
      },
      {
        "en": "wage",
        "ko": "임금, 주급",
        "ipa": "[wéidʒ]"
      },
      {
        "en": "bonus",
        "ko": "보너스, 상여금",
        "ipa": "[bóunəs]"
      },
      {
        "en": "compensation",
        "ko": "보상, 배상, 급여",
        "ipa": "[kàmpənséiʃən]"
      },
      {
        "en": "compensate",
        "ko": "보상하다, 보충하다",
        "ipa": "[kámpənsèit]"
      },
      {
        "en": "workplace",
        "ko": "직장, 근무지",
        "ipa": "[wə́ːrkplèis]"
      },
      {
        "en": "colleague",
        "ko": "동료",
        "ipa": "[kálig]"
      },
      {
        "en": "profession",
        "ko": "전문직, 직업",
        "ipa": "[prəféʃən]"
      },
      {
        "en": "professional",
        "ko": "전문적인, 전문가",
        "ipa": "[prəféʃənəl]"
      },
      {
        "en": "vocation",
        "ko": "천직, 소명, 직업",
        "ipa": "[voukéiʃən]"
      },
      {
        "en": "occupy",
        "ko": "차지하다, 점령하다",
        "ipa": "[ákjəpài]"
      },
      {
        "en": "occupation",
        "ko": "직업, 점령",
        "ipa": "[àkjəpéiʃən]"
      },
      {
        "en": "occupational",
        "ko": "직업의, 업무상의",
        "ipa": "[akjəpéiʃənəl]"
      },
      {
        "en": "career",
        "ko": "경력, 직업 경로",
        "ipa": "[kəríər]"
      },
      {
        "en": "promotion",
        "ko": "승진, 홍보, 촉진",
        "ipa": "[prəmóuʃən]"
      },
      {
        "en": "promote",
        "ko": "승진시키다, 촉진하다",
        "ipa": "[prəmóut]"
      },
      {
        "en": "demote",
        "ko": "강등시키다",
        "ipa": "[dimóut]"
      },
      {
        "en": "workload",
        "ko": "업무량",
        "ipa": "[wə́ːrklòud]"
      },
      {
        "en": "overtime",
        "ko": "초과 근무, 잔업",
        "ipa": "[óuvərtàim]"
      },
      {
        "en": "shift",
        "ko": "근무 교대, 교대조, 변화",
        "ipa": "[ʃíft]"
      },
      {
        "en": "productivity",
        "ko": "생산성",
        "ipa": "[pròudəktívəti]"
      },
      {
        "en": "efficiency",
        "ko": "효율성, 능률",
        "ipa": "[ifíʃənsi]"
      },
      {
        "en": "efficient",
        "ko": "효율적인, 유능한",
        "ipa": "[ifíʃənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_23",
    "book": "워드마스터 수능 2000",
    "title": "Day 23",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "contract",
        "ko": "계약, 계약서, 수축하다",
        "ipa": "[kántræ̀kt]"
      },
      {
        "en": "contractor",
        "ko": "계약자, 시공업자",
        "ipa": "[kántræ̀ktər]"
      },
      {
        "en": "clause",
        "ko": "조항, 절",
        "ipa": "[klɔ́ːz]"
      },
      {
        "en": "obligation",
        "ko": "의무, 책임",
        "ipa": "[àbləgéiʃən]"
      },
      {
        "en": "obligatory",
        "ko": "의무적인, 필수의",
        "ipa": "[əblígətɔ̀ːri]"
      },
      {
        "en": "duty",
        "ko": "의무, 직무, 관세",
        "ipa": "[dúːti]"
      },
      {
        "en": "responsible",
        "ko": "책임이 있는",
        "ipa": "[rispánsəbəl]"
      },
      {
        "en": "responsibility",
        "ko": "책임, 의무",
        "ipa": "[rispànsəbíləti]"
      },
      {
        "en": "liable",
        "ko": "책임이 있는, ~하기 쉬운",
        "ipa": "[láiəbəl]"
      },
      {
        "en": "liability",
        "ko": "법적 책임, 부채",
        "ipa": "[làiəbíliti]"
      },
      {
        "en": "right",
        "ko": "권리, 옳은, 오른쪽",
        "ipa": "[ráit]"
      },
      {
        "en": "privilege",
        "ko": "특권, 특혜",
        "ipa": "[prívlədʒ]"
      },
      {
        "en": "entitle",
        "ko": "자격을 주다, 제목을 붙이다",
        "ipa": "[entáitəl]"
      },
      {
        "en": "authorize",
        "ko": "권한을 부여하다, 허가하다",
        "ipa": "[ɔ́ːθəràiz]"
      },
      {
        "en": "authority",
        "ko": "권위, 권한, 당국",
        "ipa": "[əθɔ́ːrəti]"
      },
      {
        "en": "comply",
        "ko": "따르다, 준수하다",
        "ipa": "[kəmplái]"
      },
      {
        "en": "compliance",
        "ko": "준수, 순응",
        "ipa": "[kəmpláiəns]"
      },
      {
        "en": "conform",
        "ko": "따르다, 일치하다",
        "ipa": "[kənfɔ́ːrm]"
      },
      {
        "en": "obey",
        "ko": "복종하다, 따르다",
        "ipa": "[oubéi]"
      },
      {
        "en": "obedient",
        "ko": "순종하는, 복종하는",
        "ipa": "[oubíːdiənt]"
      },
      {
        "en": "violate",
        "ko": "위반하다, 침해하다",
        "ipa": "[váiəleit]"
      },
      {
        "en": "violation",
        "ko": "위반, 침해",
        "ipa": "[vaiəléiʃən]"
      },
      {
        "en": "breach",
        "ko": "위반, 파기, 깨뜨리다",
        "ipa": "[bríːtʃ]"
      },
      {
        "en": "infringe",
        "ko": "침해하다, 어기다",
        "ipa": "[ìnfríndʒ]"
      },
      {
        "en": "infringement",
        "ko": "침해, 위반",
        "ipa": "[ìnfríndʒmənt]"
      },
      {
        "en": "lawsuit",
        "ko": "소송",
        "ipa": "[lɔ́ːsùːt]"
      },
      {
        "en": "sue",
        "ko": "고소하다, 소송을 제기하다",
        "ipa": "[súː]"
      },
      {
        "en": "plaintiff",
        "ko": "원고 (소송 제기자)",
        "ipa": "[pléintəf]"
      },
      {
        "en": "defendant",
        "ko": "피고",
        "ipa": "[diféndənt]"
      },
      {
        "en": "attorney",
        "ko": "변호사, 대리인",
        "ipa": "[ətə́ːrni]"
      },
      {
        "en": "lawyer",
        "ko": "변호사",
        "ipa": "[lɔ́ːjər]"
      },
      {
        "en": "counsel",
        "ko": "조언, 변호인, 상담하다",
        "ipa": "[káunsəl]"
      },
      {
        "en": "verdict",
        "ko": "평결, 판단",
        "ipa": "[və́ːrdikt]"
      },
      {
        "en": "sentence",
        "ko": "선고하다, 문장, 형벌",
        "ipa": "[séntəns]"
      },
      {
        "en": "guilty",
        "ko": "유죄의, 죄책감이 드는",
        "ipa": "[gílti]"
      },
      {
        "en": "innocent",
        "ko": "무죄의, 순진한",
        "ipa": "[ínəsənt]"
      },
      {
        "en": "innocence",
        "ko": "무죄, 결백, 순진",
        "ipa": "[ínəsəns]"
      },
      {
        "en": "witness",
        "ko": "목격자, 증인, 목격하다",
        "ipa": "[wítnəs]"
      },
      {
        "en": "testimony",
        "ko": "증언, 증거",
        "ipa": "[téstəmòuni]"
      },
      {
        "en": "evidence",
        "ko": "증거, 흔적",
        "ipa": "[évədəns]"
      }
    ]
  },
  {
    "id": "wm2000_day_24",
    "book": "워드마스터 수능 2000",
    "title": "Day 24",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "military",
        "ko": "군사의, 군대",
        "ipa": "[mílətèəri]"
      },
      {
        "en": "soldier",
        "ko": "군인, 병사",
        "ipa": "[sóuldʒər]"
      },
      {
        "en": "troop",
        "ko": "군대, 무리",
        "ipa": "[trúːp]"
      },
      {
        "en": "army",
        "ko": "육군, 군대",
        "ipa": "[áːrmi]"
      },
      {
        "en": "navy",
        "ko": "해군",
        "ipa": "[néivi]"
      },
      {
        "en": "airforce",
        "ko": "공군",
        "ipa": "[éərfɔrs]"
      },
      {
        "en": "weapon",
        "ko": "무기, 흉기",
        "ipa": "[wépən]"
      },
      {
        "en": "arms",
        "ko": "무기, 군비, 품",
        "ipa": "[áːrmz]"
      },
      {
        "en": "armor",
        "ko": "갑옷, 장갑",
        "ipa": "[áːrmər]"
      },
      {
        "en": "shield",
        "ko": "방패, 보호하다",
        "ipa": "[ʃíːld]"
      },
      {
        "en": "sword",
        "ko": "칼, 검",
        "ipa": "[sɔ́ːrd]"
      },
      {
        "en": "missile",
        "ko": "미사일",
        "ipa": "[mísəl]"
      },
      {
        "en": "bomb",
        "ko": "폭탄, 폭파하다",
        "ipa": "[bám]"
      },
      {
        "en": "explosive",
        "ko": "폭발성의, 폭발물",
        "ipa": "[iksplóusiv]"
      },
      {
        "en": "explode",
        "ko": "폭발하다",
        "ipa": "[iksplóud]"
      },
      {
        "en": "explosion",
        "ko": "폭발, 파열",
        "ipa": "[iksplóuʒən]"
      },
      {
        "en": "blast",
        "ko": "폭발, 돌풍, 폭파하다",
        "ipa": "[blǽst]"
      },
      {
        "en": "casualty",
        "ko": "사상자, 피해자",
        "ipa": "[kǽʒəwəlti]"
      },
      {
        "en": "refugee",
        "ko": "난민, 망명자",
        "ipa": "[réfjuːdʒi]"
      },
      {
        "en": "shelter",
        "ko": "피난처, 대피소",
        "ipa": "[ʃéltər]"
      },
      {
        "en": "invade",
        "ko": "침략하다, 침입하다",
        "ipa": "[ìnvéid]"
      },
      {
        "en": "invasion",
        "ko": "침략, 침입",
        "ipa": "[ìnvéiʒən]"
      },
      {
        "en": "invader",
        "ko": "침략자",
        "ipa": "[ìnvéidər]"
      },
      {
        "en": "conquer",
        "ko": "정복하다, 탈환하다",
        "ipa": "[káŋkər]"
      },
      {
        "en": "conquest",
        "ko": "정복, 점령",
        "ipa": "[káŋkwest]"
      },
      {
        "en": "occupy",
        "ko": "점령하다, 점유하다",
        "ipa": "[ákjəpài]"
      },
      {
        "en": "truce",
        "ko": "휴전, 정전",
        "ipa": "[trúːs]"
      },
      {
        "en": "ceasefire",
        "ko": "휴전, 사격 중지",
        "ipa": "[síːsfáiər]"
      },
      {
        "en": "treaty",
        "ko": "조약, 협정",
        "ipa": "[tríːti]"
      },
      {
        "en": "pact",
        "ko": "약정, 협정",
        "ipa": "[pǽkt]"
      },
      {
        "en": "peace",
        "ko": "평화, 평온",
        "ipa": "[píːs]"
      },
      {
        "en": "peaceful",
        "ko": "평화로운",
        "ipa": "[píːsfəl]"
      },
      {
        "en": "security",
        "ko": "안보, 보안, 보증",
        "ipa": "[sikjúərəti]"
      },
      {
        "en": "threat",
        "ko": "위협, 협박",
        "ipa": "[θrét]"
      },
      {
        "en": "threaten",
        "ko": "위협하다, 협박하다",
        "ipa": "[θrétən]"
      },
      {
        "en": "terror",
        "ko": "공포, 테러",
        "ipa": "[téərər]"
      },
      {
        "en": "terrorism",
        "ko": "테러리즘",
        "ipa": "[téərərìzəm]"
      },
      {
        "en": "terrorist",
        "ko": "테러리스트",
        "ipa": "[téərərist]"
      },
      {
        "en": "disarmament",
        "ko": "군축, 군비 축소",
        "ipa": "[disáːrməmənt]"
      },
      {
        "en": "surrender",
        "ko": "항복하다, 인도하다",
        "ipa": "[səréndər]"
      }
    ]
  },
  {
    "id": "wm2000_day_25",
    "book": "워드마스터 수능 2000",
    "title": "Day 25",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "philosophy",
        "ko": "철학",
        "ipa": "[fəlásəfi]"
      },
      {
        "en": "philosopher",
        "ko": "철학자",
        "ipa": "[fəlásəfər]"
      },
      {
        "en": "philosophical",
        "ko": "철학적인",
        "ipa": "[fìləsáfikəl]"
      },
      {
        "en": "ethics",
        "ko": "윤리학, 도덕",
        "ipa": "[éθiks]"
      },
      {
        "en": "ethical",
        "ko": "윤리적인, 도덕적인",
        "ipa": "[éθikəl]"
      },
      {
        "en": "moral",
        "ko": "도덕적인, 교훈",
        "ipa": "[mɔ́ːrəl]"
      },
      {
        "en": "morality",
        "ko": "도덕, 도덕성",
        "ipa": "[mərǽləti]"
      },
      {
        "en": "immoral",
        "ko": "부도덕한",
        "ipa": "[ìmɔ́ːrəl]"
      },
      {
        "en": "virtue",
        "ko": "미덕, 덕목, 장점",
        "ipa": "[və́ːrtʃuː]"
      },
      {
        "en": "virtuous",
        "ko": "도덕적인, 덕이 높은",
        "ipa": "[və́ːrtʃuːəs]"
      },
      {
        "en": "vice",
        "ko": "악덕, 결함, 부(副)",
        "ipa": "[váis]"
      },
      {
        "en": "sin",
        "ko": "죄, 죄악",
        "ipa": "[sín]"
      },
      {
        "en": "sacred",
        "ko": "신성한, 성스러운",
        "ipa": "[séikrəd]"
      },
      {
        "en": "holy",
        "ko": "거룩한, 성스러운",
        "ipa": "[hóuli]"
      },
      {
        "en": "divine",
        "ko": "신의, 신성한",
        "ipa": "[diváin]"
      },
      {
        "en": "religion",
        "ko": "종교",
        "ipa": "[rilídʒən]"
      },
      {
        "en": "religious",
        "ko": "종교적인, 신앙심 깊은",
        "ipa": "[rilídʒəs]"
      },
      {
        "en": "faith",
        "ko": "믿음, 신앙",
        "ipa": "[féiθ]"
      },
      {
        "en": "faithful",
        "ko": "충실한, 신의 있는",
        "ipa": "[féiθfəl]"
      },
      {
        "en": "belief",
        "ko": "신념, 확신",
        "ipa": "[bilíːf]"
      },
      {
        "en": "doctrine",
        "ko": "교리, 신조",
        "ipa": "[dáktrən]"
      },
      {
        "en": "dogma",
        "ko": "교조, 독단적 신조",
        "ipa": "[dágmə]"
      },
      {
        "en": "pray",
        "ko": "기도하다, 빌다",
        "ipa": "[préi]"
      },
      {
        "en": "prayer",
        "ko": "기도, 기도문",
        "ipa": "[préər]"
      },
      {
        "en": "worship",
        "ko": "예배, 숭배하다",
        "ipa": "[wə́ːrʃəp]"
      },
      {
        "en": "idol",
        "ko": "우상, 아이돌",
        "ipa": "[áidəl]"
      },
      {
        "en": "temple",
        "ko": "사원, 신전, 관자놀이",
        "ipa": "[témpəl]"
      },
      {
        "en": "church",
        "ko": "교회",
        "ipa": "[tʃə́ːrtʃ]"
      },
      {
        "en": "cathedral",
        "ko": "대성당",
        "ipa": "[kəθíːdrəl]"
      },
      {
        "en": "priest",
        "ko": "사제, 성직자",
        "ipa": "[príːst]"
      },
      {
        "en": "monk",
        "ko": "수도승, 승려",
        "ipa": "[mʌ́ŋk]"
      },
      {
        "en": "meditation",
        "ko": "명상, 묵상",
        "ipa": "[mèdətéiʃən]"
      },
      {
        "en": "meditate",
        "ko": "명상하다",
        "ipa": "[médətèit]"
      },
      {
        "en": "spiritual",
        "ko": "영적인, 정신적인",
        "ipa": "[spíəritʃùːəl]"
      },
      {
        "en": "soul",
        "ko": "영혼, 혼",
        "ipa": "[sóul]"
      },
      {
        "en": "spirit",
        "ko": "정신, 영혼, 기백",
        "ipa": "[spíərət]"
      },
      {
        "en": "conscience",
        "ko": "양심",
        "ipa": "[kánʃəns]"
      },
      {
        "en": "righteous",
        "ko": "의로운, 당연한",
        "ipa": "[ráitʃəs]"
      },
      {
        "en": "noble",
        "ko": "고결한, 귀족의",
        "ipa": "[nóubəl]"
      },
      {
        "en": "destiny",
        "ko": "운명, 숙명",
        "ipa": "[déstəni]"
      }
    ]
  },
  {
    "id": "wm2000_day_26",
    "book": "워드마스터 수능 2000",
    "title": "Day 26",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "industry",
        "ko": "산업, 공업, 근면",
        "ipa": "[índəstri]"
      },
      {
        "en": "industrial",
        "ko": "산업의, 공업의",
        "ipa": "[ìndʌ́striəl]"
      },
      {
        "en": "industrialize",
        "ko": "산업화하다",
        "ipa": "[ìndʌ́striəlàiz]"
      },
      {
        "en": "manufacture",
        "ko": "제조하다, 생산하다",
        "ipa": "[mæ̀njəfǽktʃər]"
      },
      {
        "en": "manufacturer",
        "ko": "제조업자, 제조사",
        "ipa": "[mæ̀njəfǽktʃərər]"
      },
      {
        "en": "factory",
        "ko": "공장",
        "ipa": "[fǽktəri]"
      },
      {
        "en": "plant",
        "ko": "공장, 식물, 심다",
        "ipa": "[plǽnt]"
      },
      {
        "en": "facility",
        "ko": "설비, 시설",
        "ipa": "[fəsíliti]"
      },
      {
        "en": "machinery",
        "ko": "기계류",
        "ipa": "[məʃíːnəri]"
      },
      {
        "en": "equipment",
        "ko": "장비, 설비",
        "ipa": "[ikwípmənt]"
      },
      {
        "en": "automate",
        "ko": "자동화하다",
        "ipa": "[ɔ́ːtəmèit]"
      },
      {
        "en": "automation",
        "ko": "자동화",
        "ipa": "[ɔtəméiʃən]"
      },
      {
        "en": "agriculture",
        "ko": "농업, 농경",
        "ipa": "[ǽgrikʌ̀ltʃər]"
      },
      {
        "en": "agricultural",
        "ko": "농업의, 농사의",
        "ipa": "[æ̀grəkʌ́ltʃərəl]"
      },
      {
        "en": "cultivate",
        "ko": "경작하다, 재배하다",
        "ipa": "[kʌ́ltəvèit]"
      },
      {
        "en": "cultivation",
        "ko": "경작, 재배",
        "ipa": "[kʌ̀ltivéiʃən]"
      },
      {
        "en": "harvest",
        "ko": "수확하다, 수확기",
        "ipa": "[háːrvəst]"
      },
      {
        "en": "crop",
        "ko": "농작물, 수확물",
        "ipa": "[kráp]"
      },
      {
        "en": "yield",
        "ko": "수확량, 산출하다",
        "ipa": "[jíːld]"
      },
      {
        "en": "fertile",
        "ko": "비옥한, 번식력 있는",
        "ipa": "[fə́ːrtəl]"
      },
      {
        "en": "fertility",
        "ko": "비옥함, 출산율",
        "ipa": "[fərtíləti]"
      },
      {
        "en": "fertilizer",
        "ko": "비료, 거름",
        "ipa": "[fə́ːrtəlàizər]"
      },
      {
        "en": "barren",
        "ko": "척박한, 불모의",
        "ipa": "[bǽrən]"
      },
      {
        "en": "irrigation",
        "ko": "관개, 물을 대기",
        "ipa": "[ìərəgéiʃən]"
      },
      {
        "en": "irrigate",
        "ko": "물을 대다, 관개하다",
        "ipa": "[íərəgèit]"
      },
      {
        "en": "livestock",
        "ko": "가축",
        "ipa": "[láivstàk]"
      },
      {
        "en": "cattle",
        "ko": "소, 가축",
        "ipa": "[kǽtəl]"
      },
      {
        "en": "pasture",
        "ko": "목초지, 방목장",
        "ipa": "[pǽstʃər]"
      },
      {
        "en": "energy",
        "ko": "에너지, 활력",
        "ipa": "[énərdʒi]"
      },
      {
        "en": "energetic",
        "ko": "활동적인, 정력적인",
        "ipa": "[ènərdʒétik]"
      },
      {
        "en": "fuel",
        "ko": "연료, 부채질하다",
        "ipa": "[fjúːəl]"
      },
      {
        "en": "fossil",
        "ko": "화석",
        "ipa": "[fásəl]"
      },
      {
        "en": "petroleum",
        "ko": "석유",
        "ipa": "[pətróuliəm]"
      },
      {
        "en": "coal",
        "ko": "석탄",
        "ipa": "[kóul]"
      },
      {
        "en": "electricity",
        "ko": "전기",
        "ipa": "[ilèktrísəti]"
      },
      {
        "en": "electric",
        "ko": "전기의",
        "ipa": "[iléktrik]"
      },
      {
        "en": "generator",
        "ko": "발전기",
        "ipa": "[dʒénərèitər]"
      },
      {
        "en": "nuclear",
        "ko": "원자력의, 핵의",
        "ipa": "[núːkliər]"
      },
      {
        "en": "solar",
        "ko": "태양열의, 태양의",
        "ipa": "[sóulər]"
      },
      {
        "en": "turbine",
        "ko": "터빈",
        "ipa": "[tə́ːrbain]"
      }
    ]
  },
  {
    "id": "wm2000_day_27",
    "book": "워드마스터 수능 2000",
    "title": "Day 27",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "duration",
        "ko": "지속 기간, 지속",
        "ipa": "[dúəréiʃən]"
      },
      {
        "en": "temporary",
        "ko": "일시적인, 임시의",
        "ipa": "[témpərèəri]"
      },
      {
        "en": "permanent",
        "ko": "영구적인, 불변의",
        "ipa": "[pə́ːrmənənt]"
      },
      {
        "en": "eternal",
        "ko": "영원한, 끊임없는",
        "ipa": "[itə́ːrnəl]"
      },
      {
        "en": "perpetual",
        "ko": "끊임없는, 영속하는",
        "ipa": "[pərpétʃuːəl]"
      },
      {
        "en": "transient",
        "ko": "일시적인, 순간적인",
        "ipa": "[trǽnʒənt]"
      },
      {
        "en": "instant",
        "ko": "즉각적인, 순간",
        "ipa": "[ínstənt]"
      },
      {
        "en": "instantaneous",
        "ko": "순간적인, 즉시의",
        "ipa": "[ìnstəntǽniəs]"
      },
      {
        "en": "simultaneous",
        "ko": "동시의, 동시에 일어나는",
        "ipa": "[sàiməltéiniəs]"
      },
      {
        "en": "contemporary",
        "ko": "동시대의, 현대의",
        "ipa": "[kəntémpərèəri]"
      },
      {
        "en": "chronological",
        "ko": "연대기순의",
        "ipa": "[krànəládʒikəl]"
      },
      {
        "en": "decade",
        "ko": "10년",
        "ipa": "[dekéid]"
      },
      {
        "en": "century",
        "ko": "1세기, 100년",
        "ipa": "[séntʃəri]"
      },
      {
        "en": "millennium",
        "ko": "천년, 천년기",
        "ipa": "[məléniəm]"
      },
      {
        "en": "era",
        "ko": "시대, 연대",
        "ipa": "[éərə]"
      },
      {
        "en": "epoch",
        "ko": "신시대, 획기적인 사건",
        "ipa": "[épək]"
      },
      {
        "en": "dimension",
        "ko": "차원, 크기, 규모",
        "ipa": "[diménʃən]"
      },
      {
        "en": "spatial",
        "ko": "공간의, 공간적인",
        "ipa": "[spéiʃəl]"
      },
      {
        "en": "infinite",
        "ko": "무한한, 막대한",
        "ipa": "[ínfənət]"
      },
      {
        "en": "finite",
        "ko": "한정된, 유한한",
        "ipa": "[fáinàit]"
      },
      {
        "en": "interval",
        "ko": "간격, 휴식 시간",
        "ipa": "[íntərvəl]"
      },
      {
        "en": "span",
        "ko": "기간, 폭, 걸치다",
        "ipa": "[spǽn]"
      },
      {
        "en": "pace",
        "ko": "속도, 걸음걸이",
        "ipa": "[péis]"
      },
      {
        "en": "swift",
        "ko": "신속한, 빠른",
        "ipa": "[swíft]"
      },
      {
        "en": "rapid",
        "ko": "빠른, 급속한",
        "ipa": "[rǽpəd]"
      },
      {
        "en": "gradual",
        "ko": "점진적인, 서서히 일어나는",
        "ipa": "[grǽdʒuːəl]"
      },
      {
        "en": "prompt",
        "ko": "즉각적인, 촉발하다",
        "ipa": "[prámpt]"
      },
      {
        "en": "delay",
        "ko": "지연시키다, 미루다",
        "ipa": "[diléi]"
      },
      {
        "en": "postpone",
        "ko": "연기하다, 미루다",
        "ipa": "[poustpóun]"
      },
      {
        "en": "suspend",
        "ko": "중단하다, 매달다",
        "ipa": "[səspénd]"
      },
      {
        "en": "resume",
        "ko": "재개하다, 다시 시작하다",
        "ipa": "[rizúːm]"
      },
      {
        "en": "transform",
        "ko": "변형시키다, 탈바꿈하다",
        "ipa": "[trænsfɔ́ːrm]"
      },
      {
        "en": "transformation",
        "ko": "변화, 변신",
        "ipa": "[træ̀nsfərméiʃən]"
      },
      {
        "en": "alter",
        "ko": "바꾸다, 변경하다",
        "ipa": "[ɔ́ːltər]"
      },
      {
        "en": "alteration",
        "ko": "변화, 개조",
        "ipa": "[ɔ̀ːltəréiʃən]"
      },
      {
        "en": "modify",
        "ko": "수정하다, 조절하다",
        "ipa": "[mádəfài]"
      },
      {
        "en": "modification",
        "ko": "수정, 변경",
        "ipa": "[màdəfəkéiʃən]"
      },
      {
        "en": "shift",
        "ko": "이동하다, 변화",
        "ipa": "[ʃíft]"
      },
      {
        "en": "fluctuate",
        "ko": "변동하다, 오르내리다",
        "ipa": "[flʌ́ktʃəwèit]"
      },
      {
        "en": "fluctuation",
        "ko": "변동, 오르내림",
        "ipa": "[flʌ̀ktʃuːéiʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_28",
    "book": "워드마스터 수능 2000",
    "title": "Day 28",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "anxiety",
        "ko": "불안, 염려, 갈망",
        "ipa": "[æŋzáiəti]"
      },
      {
        "en": "anxious",
        "ko": "불안한, 열망하는",
        "ipa": "[ǽŋkʃəs]"
      },
      {
        "en": "panic",
        "ko": "공황, 극심한 공포",
        "ipa": "[pǽnik]"
      },
      {
        "en": "dread",
        "ko": "두려워하다, 공포",
        "ipa": "[dréd]"
      },
      {
        "en": "terror",
        "ko": "극심한 공포, 테러",
        "ipa": "[téərər]"
      },
      {
        "en": "horror",
        "ko": "공포, 전율",
        "ipa": "[hɔ́ːrər]"
      },
      {
        "en": "frighten",
        "ko": "겁주다, 놀라게 하다",
        "ipa": "[fráitən]"
      },
      {
        "en": "scare",
        "ko": "겁주다, 두려움",
        "ipa": "[skéər]"
      },
      {
        "en": "delight",
        "ko": "기쁨, 즐겁게 하다",
        "ipa": "[diláit]"
      },
      {
        "en": "delighted",
        "ko": "아주 기뻐하는",
        "ipa": "[diláitəd]"
      },
      {
        "en": "ecstasy",
        "ko": "황홀경, 무아지경",
        "ipa": "[ékstəsi]"
      },
      {
        "en": "joyful",
        "ko": "아주 기쁜",
        "ipa": "[dʒɔ́ifəl]"
      },
      {
        "en": "cheerful",
        "ko": "쾌활한, 발랄한",
        "ipa": "[tʃíərfəl]"
      },
      {
        "en": "glad",
        "ko": "기쁜, 반가운",
        "ipa": "[glǽd]"
      },
      {
        "en": "grief",
        "ko": "비탄, 큰 슬픔",
        "ipa": "[gríːf]"
      },
      {
        "en": "grieve",
        "ko": "몹시 슬퍼하다",
        "ipa": "[gríːv]"
      },
      {
        "en": "mourn",
        "ko": "애도하다, 슬퍼하다",
        "ipa": "[mɔ́ːrn]"
      },
      {
        "en": "sorrow",
        "ko": "슬픔, 비애",
        "ipa": "[sáːrou]"
      },
      {
        "en": "depression",
        "ko": "우울증, 불경기",
        "ipa": "[dipréʃən]"
      },
      {
        "en": "depress",
        "ko": "우울하게 만들다",
        "ipa": "[diprés]"
      },
      {
        "en": "frustrate",
        "ko": "좌절시키다",
        "ipa": "[frʌ́strèit]"
      },
      {
        "en": "frustration",
        "ko": "좌절, 불만",
        "ipa": "[frəstréiʃən]"
      },
      {
        "en": "despair",
        "ko": "절망, 체념하다",
        "ipa": "[dispéər]"
      },
      {
        "en": "hopeless",
        "ko": "절망적인, 가망 없는",
        "ipa": "[hóupləs]"
      },
      {
        "en": "rage",
        "ko": "분노, 격노",
        "ipa": "[réidʒ]"
      },
      {
        "en": "fury",
        "ko": "격분, 맹렬함",
        "ipa": "[fjúəri]"
      },
      {
        "en": "furious",
        "ko": "격노한, 맹렬한",
        "ipa": "[fjúəriəs]"
      },
      {
        "en": "irritate",
        "ko": "짜증나게 하다",
        "ipa": "[íəritèit]"
      },
      {
        "en": "irritation",
        "ko": "짜증, 염증",
        "ipa": "[ìəritéiʃən]"
      },
      {
        "en": "annoy",
        "ko": "짜증나게 하다",
        "ipa": "[ənɔ́i]"
      },
      {
        "en": "annoyance",
        "ko": "짜증, 골칫거리",
        "ipa": "[ənɔ́iəns]"
      },
      {
        "en": "resent",
        "ko": "분개하다, 억울하게 생각하다",
        "ipa": "[rizént]"
      },
      {
        "en": "resentment",
        "ko": "분개, 적의",
        "ipa": "[rizéntmənt]"
      },
      {
        "en": "jealous",
        "ko": "질투하는, 시기하는",
        "ipa": "[dʒéləs]"
      },
      {
        "en": "jealousy",
        "ko": "질투, 시기",
        "ipa": "[dʒéləsi]"
      },
      {
        "en": "envy",
        "ko": "부러워하다, 질투",
        "ipa": "[énvi]"
      },
      {
        "en": "envious",
        "ko": "부러워하는",
        "ipa": "[énviəs]"
      },
      {
        "en": "shame",
        "ko": "수치심, 부끄러움",
        "ipa": "[ʃéim]"
      },
      {
        "en": "embarrass",
        "ko": "당황하게 하다",
        "ipa": "[imbéərəs]"
      },
      {
        "en": "embarrassment",
        "ko": "당황, 난처함",
        "ipa": "[imbéərəsmənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_29",
    "book": "워드마스터 수능 2000",
    "title": "Day 29",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "information",
        "ko": "정보, 안내",
        "ipa": "[ìnfərméiʃən]"
      },
      {
        "en": "informative",
        "ko": "유익한, 정보를 주는",
        "ipa": "[ìnfɔ́ːrmətiv]"
      },
      {
        "en": "inform",
        "ko": "알리다, 통지하다",
        "ipa": "[ìnfɔ́ːrm]"
      },
      {
        "en": "software",
        "ko": "소프트웨어, 프로그램",
        "ipa": "[sɔ́ːftwèər]"
      },
      {
        "en": "hardware",
        "ko": "하드웨어, 장비",
        "ipa": "[háːrdwèər]"
      },
      {
        "en": "program",
        "ko": "프로그램, 계획",
        "ipa": "[próugræ̀m]"
      },
      {
        "en": "code",
        "ko": "암호, 부호, 규범, 코드",
        "ipa": "[kóud]"
      },
      {
        "en": "encode",
        "ko": "암호화하다, 부호화하다",
        "ipa": "[enkóud]"
      },
      {
        "en": "decode",
        "ko": "해독하다",
        "ipa": "[dikóud]"
      },
      {
        "en": "database",
        "ko": "데이터베이스",
        "ipa": "[déitəbèis]"
      },
      {
        "en": "algorithm",
        "ko": "알고리즘, 연산 절차",
        "ipa": "[ǽlgərìðəm]"
      },
      {
        "en": "cyber",
        "ko": "사이버의, 인터넷의",
        "ipa": "[sáibər]"
      },
      {
        "en": "virtual",
        "ko": "가상의, 사실상의",
        "ipa": "[və́ːrtʃuːəl]"
      },
      {
        "en": "virtually",
        "ko": "사실상, 가상으로",
        "ipa": "[və́ːrtʃuːəli]"
      },
      {
        "en": "interface",
        "ko": "인터페이스, 접점",
        "ipa": "[íntərfèis]"
      },
      {
        "en": "digital",
        "ko": "디지털의",
        "ipa": "[dídʒətəl]"
      },
      {
        "en": "analog",
        "ko": "아날로그의",
        "ipa": "[ǽnəlɔ̀ːg]"
      },
      {
        "en": "network",
        "ko": "네트워크, 방송망",
        "ipa": "[nétwə̀ːrk]"
      },
      {
        "en": "wireless",
        "ko": "무선의",
        "ipa": "[wáirlis]"
      },
      {
        "en": "telecommunication",
        "ko": "원거리 통신",
        "ipa": "[tèləkəmjùːnikéiʃən]"
      },
      {
        "en": "access",
        "ko": "접근하다, 이용 권한",
        "ipa": "[ǽksès]"
      },
      {
        "en": "accessible",
        "ko": "접근하기 쉬운, 이용 가능한",
        "ipa": "[æksésəbəl]"
      },
      {
        "en": "storage",
        "ko": "저장, 보관소",
        "ipa": "[stɔ́ːrədʒ]"
      },
      {
        "en": "store",
        "ko": "저장하다, 상점",
        "ipa": "[stɔ́ːr]"
      },
      {
        "en": "retrieve",
        "ko": "되찾다, 검색하다",
        "ipa": "[ritríːv]"
      },
      {
        "en": "retrieval",
        "ko": "검색, 회수",
        "ipa": "[ritríːvəl]"
      },
      {
        "en": "transmit",
        "ko": "전송하다, 전달하다",
        "ipa": "[trænzmít]"
      },
      {
        "en": "transmission",
        "ko": "전송, 전파",
        "ipa": "[trænsmíʃən]"
      },
      {
        "en": "server",
        "ko": "서버, 봉사자",
        "ipa": "[sə́ːrvər]"
      },
      {
        "en": "client",
        "ko": "고객, 의뢰인",
        "ipa": "[kláiənt]"
      },
      {
        "en": "browser",
        "ko": "웹 브라우저",
        "ipa": "[bráuzər]"
      },
      {
        "en": "browse",
        "ko": "둘러보다, 검색하다",
        "ipa": "[bráuz]"
      },
      {
        "en": "domain",
        "ko": "도메인, 영역, 분야",
        "ipa": "[douméin]"
      },
      {
        "en": "link",
        "ko": "연결하다, 링크",
        "ipa": "[líŋk]"
      },
      {
        "en": "hyperlink",
        "ko": "하이퍼링크",
        "ipa": "[háipərliŋk]"
      },
      {
        "en": "security",
        "ko": "보안, 안전",
        "ipa": "[sikjúərəti]"
      },
      {
        "en": "encrypt",
        "ko": "암호화하다",
        "ipa": "[enkrípt]"
      },
      {
        "en": "privacy",
        "ko": "사생활, 사적 자유",
        "ipa": "[práivəsi]"
      },
      {
        "en": "platform",
        "ko": "플랫폼, 승강장",
        "ipa": "[plǽtfɔ̀ːrm]"
      },
      {
        "en": "application",
        "ko": "응용프로그램, 적용, 신청",
        "ipa": "[æ̀pləkéiʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_30",
    "book": "워드마스터 수능 2000",
    "title": "Day 30",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "geology",
        "ko": "지질학",
        "ipa": "[dʒiálədʒi]"
      },
      {
        "en": "geological",
        "ko": "지질학적인",
        "ipa": "[dʒìːəládʒikəl]"
      },
      {
        "en": "geologist",
        "ko": "지질학자",
        "ipa": "[dʒiálədʒəst]"
      },
      {
        "en": "crust",
        "ko": "지각, 껍질",
        "ipa": "[krʌ́st]"
      },
      {
        "en": "mantle",
        "ko": "맨틀, 덮개",
        "ipa": "[mǽntəl]"
      },
      {
        "en": "core",
        "ko": "핵, 중심부",
        "ipa": "[kɔ́ːr]"
      },
      {
        "en": "plate",
        "ko": "판, 접시, 금속판",
        "ipa": "[pléit]"
      },
      {
        "en": "tectonics",
        "ko": "구조 지질학",
        "ipa": "[tektániks]"
      },
      {
        "en": "earthquake",
        "ko": "지진",
        "ipa": "[ə́ːrθkwèik]"
      },
      {
        "en": "tremor",
        "ko": "미진, 떨림",
        "ipa": "[trémər]"
      },
      {
        "en": "fault",
        "ko": "단층, 잘못, 결함",
        "ipa": "[fɔ́ːlt]"
      },
      {
        "en": "volcano",
        "ko": "화산",
        "ipa": "[valkéinou]"
      },
      {
        "en": "volcanic",
        "ko": "화산의",
        "ipa": "[valkǽnik]"
      },
      {
        "en": "eruption",
        "ko": "분출, 폭발",
        "ipa": "[ìːrʌ́pʃən]"
      },
      {
        "en": "erupt",
        "ko": "분출하다, 터지다",
        "ipa": "[iərʌ́pt]"
      },
      {
        "en": "magma",
        "ko": "마그마",
        "ipa": "[mǽgmə]"
      },
      {
        "en": "lava",
        "ko": "용암",
        "ipa": "[lávə]"
      },
      {
        "en": "ash",
        "ko": "화산재, 재",
        "ipa": "[ǽʃ]"
      },
      {
        "en": "meteorology",
        "ko": "기상학",
        "ipa": "[mìːtiərálədʒi]"
      },
      {
        "en": "meteorological",
        "ko": "기상학의",
        "ipa": "[mìːtiɔ̀ːrəládʒikəl]"
      },
      {
        "en": "weather",
        "ko": "날씨, 기상",
        "ipa": "[wéðər]"
      },
      {
        "en": "forecast",
        "ko": "예보, 예측하다",
        "ipa": "[fɔ́ːrkæ̀st]"
      },
      {
        "en": "temperature",
        "ko": "온도, 기온",
        "ipa": "[témprətʃər]"
      },
      {
        "en": "humidity",
        "ko": "습도",
        "ipa": "[hjuːmídəti]"
      },
      {
        "en": "humid",
        "ko": "습한, 눅눅한",
        "ipa": "[hjúːməd]"
      },
      {
        "en": "precipitation",
        "ko": "강수량, 침전",
        "ipa": "[prisìpitéiʃən]"
      },
      {
        "en": "rainfall",
        "ko": "강우량",
        "ipa": "[réinfɔ̀ːl]"
      },
      {
        "en": "storm",
        "ko": "폭풍우",
        "ipa": "[stɔ́ːrm]"
      },
      {
        "en": "typhoon",
        "ko": "태풍",
        "ipa": "[tàifúːn]"
      },
      {
        "en": "hurricane",
        "ko": "허리케인",
        "ipa": "[hə́ːrəkèin]"
      },
      {
        "en": "tornado",
        "ko": "토네이도",
        "ipa": "[tɔrnéidòu]"
      },
      {
        "en": "blizzard",
        "ko": "눈보라",
        "ipa": "[blízərd]"
      },
      {
        "en": "ocean",
        "ko": "대양, 바다",
        "ipa": "[óuʃən]"
      },
      {
        "en": "oceanic",
        "ko": "대양의, 해양의",
        "ipa": "[òuʃiǽnik]"
      },
      {
        "en": "marine",
        "ko": "해양의, 바다의",
        "ipa": "[məríːn]"
      },
      {
        "en": "current",
        "ko": "해류, 기류, 전류",
        "ipa": "[kə́ːrənt]"
      },
      {
        "en": "tide",
        "ko": "조수, 조석, 흐름",
        "ipa": "[táid]"
      },
      {
        "en": "tidal",
        "ko": "조수의",
        "ipa": "[táidəl]"
      },
      {
        "en": "coast",
        "ko": "해안, 연안",
        "ipa": "[kóust]"
      },
      {
        "en": "coastal",
        "ko": "해안의, 연안의",
        "ipa": "[kóustəl]"
      }
    ]
  },
  {
    "id": "wm2000_day_31",
    "book": "워드마스터 수능 2000",
    "title": "Day 31",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "infer",
        "ko": "추론하다, 암시하다",
        "ipa": "[ìnfə́ːr]"
      },
      {
        "en": "inference",
        "ko": "추론, 결론",
        "ipa": "[ínfərəns]"
      },
      {
        "en": "deduce",
        "ko": "연역하다, 추론하다",
        "ipa": "[didúːs]"
      },
      {
        "en": "deduction",
        "ko": "연역, 공제",
        "ipa": "[didʌ́kʃən]"
      },
      {
        "en": "induce",
        "ko": "귀납하다, 유도하다, 설득하다",
        "ipa": "[ìndúːs]"
      },
      {
        "en": "induction",
        "ko": "귀납, 유도, 취임",
        "ipa": "[ìndʌ́kʃən]"
      },
      {
        "en": "premise",
        "ko": "전제, 부지",
        "ipa": "[prémis]"
      },
      {
        "en": "conclusion",
        "ko": "결론, 결말",
        "ipa": "[kənklúːʒən]"
      },
      {
        "en": "conclude",
        "ko": "결론을 내리다, 끝나다",
        "ipa": "[kənklúːd]"
      },
      {
        "en": "valid",
        "ko": "타당한, 유효한",
        "ipa": "[vǽlid]"
      },
      {
        "en": "validity",
        "ko": "타당성, 유효성",
        "ipa": "[vəlídəti]"
      },
      {
        "en": "invalid",
        "ko": "무효한, 근거 없는, 환자",
        "ipa": "[ínvələd]"
      },
      {
        "en": "fallacy",
        "ko": "오류, 틀린 생각",
        "ipa": "[fǽləsi]"
      },
      {
        "en": "fallacious",
        "ko": "잘못된, 오류가 있는",
        "ipa": "[fəléiʃəs]"
      },
      {
        "en": "paradox",
        "ko": "역설, 패러독스",
        "ipa": "[péərədàks]"
      },
      {
        "en": "paradoxical",
        "ko": "역설적인",
        "ipa": "[pèərədáksikəl]"
      },
      {
        "en": "dilemma",
        "ko": "진퇴양난, 딜레마",
        "ipa": "[dilémə]"
      },
      {
        "en": "contradict",
        "ko": "모순되다, 반박하다",
        "ipa": "[kàntrədíkt]"
      },
      {
        "en": "contradiction",
        "ko": "모순, 반박",
        "ipa": "[kàntrədíkʃən]"
      },
      {
        "en": "contradictory",
        "ko": "모순되는",
        "ipa": "[kàntrədíktəri]"
      },
      {
        "en": "consistent",
        "ko": "일관된, 부합하는",
        "ipa": "[kənsístənt]"
      },
      {
        "en": "consistency",
        "ko": "일관성",
        "ipa": "[kənsístənsi]"
      },
      {
        "en": "inconsistent",
        "ko": "일관성 없는, 모순된",
        "ipa": "[ìnkənsístənt]"
      },
      {
        "en": "coherent",
        "ko": "조리 있는, 통일성 있는",
        "ipa": "[kouhíərənt]"
      },
      {
        "en": "coherence",
        "ko": "일관성, 조리",
        "ipa": "[kouhíərəns]"
      },
      {
        "en": "rational",
        "ko": "합리적인, 이성적인",
        "ipa": "[rǽʃənəl]"
      },
      {
        "en": "rationality",
        "ko": "합리성, 이성",
        "ipa": "[ræ̀ʃənǽliti]"
      },
      {
        "en": "irrational",
        "ko": "비이성적인, 불합리한",
        "ipa": "[ìərǽʃənəl]"
      },
      {
        "en": "reason",
        "ko": "이유, 이성, 추론하다",
        "ipa": "[ríːzən]"
      },
      {
        "en": "reasonable",
        "ko": "합리적인, 타당한",
        "ipa": "[ríːzənəbəl]"
      },
      {
        "en": "cause",
        "ko": "원인, 야기하다, 대의",
        "ipa": "[káz]"
      },
      {
        "en": "causal",
        "ko": "인과관계의",
        "ipa": "[kɔ́ːzəl]"
      },
      {
        "en": "effect",
        "ko": "영향, 효과, 결과",
        "ipa": "[ifékt]"
      },
      {
        "en": "effective",
        "ko": "효과적인, 유효한",
        "ipa": "[iféktiv]"
      },
      {
        "en": "consequence",
        "ko": "결과, 중요성",
        "ipa": "[kánsəkwəns]"
      },
      {
        "en": "consequent",
        "ko": "결과로 일어나는",
        "ipa": "[kánsəkwənt]"
      },
      {
        "en": "attribute",
        "ko": "원인으로 돌리다, 속성",
        "ipa": "[ǽtrəbjùːt]"
      },
      {
        "en": "ascribe",
        "ko": "원인을 돌리다",
        "ipa": "[əskráib]"
      },
      {
        "en": "factor",
        "ko": "요인, 인자",
        "ipa": "[fǽktər]"
      },
      {
        "en": "catalyst",
        "ko": "촉매, 기폭제",
        "ipa": "[kǽtələst]"
      }
    ]
  },
  {
    "id": "wm2000_day_32",
    "book": "워드마스터 수능 2000",
    "title": "Day 32",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "linguistics",
        "ko": "언어학",
        "ipa": "[liŋgwístiks]"
      },
      {
        "en": "linguistic",
        "ko": "언어의, 언어학의",
        "ipa": "[liŋgwístik]"
      },
      {
        "en": "dialect",
        "ko": "방언, 사투리",
        "ipa": "[dáiəlèkt]"
      },
      {
        "en": "accent",
        "ko": "억양, 강세, 강조하다",
        "ipa": "[əksént]"
      },
      {
        "en": "pronounce",
        "ko": "발음하다, 선언하다",
        "ipa": "[prənáuns]"
      },
      {
        "en": "pronunciation",
        "ko": "발음",
        "ipa": "[prounʌ̀nsiéiʃən]"
      },
      {
        "en": "vocabulary",
        "ko": "어휘, 어휘력",
        "ipa": "[voukǽbjəlèəri]"
      },
      {
        "en": "grammar",
        "ko": "문법",
        "ipa": "[grǽmər]"
      },
      {
        "en": "grammatical",
        "ko": "문법적인",
        "ipa": "[grəmǽtəkəl]"
      },
      {
        "en": "syntax",
        "ko": "통사론, 구문론",
        "ipa": "[síntæ̀ks]"
      },
      {
        "en": "semantics",
        "ko": "의미론",
        "ipa": "[simǽntiks]"
      },
      {
        "en": "idiom",
        "ko": "관용구, 숙어",
        "ipa": "[ídiəm]"
      },
      {
        "en": "idiomatic",
        "ko": "관용적인",
        "ipa": "[ìdiəmǽtik]"
      },
      {
        "en": "slang",
        "ko": "속어, 은어",
        "ipa": "[slǽŋ]"
      },
      {
        "en": "jargon",
        "ko": "전문 용어",
        "ipa": "[dʒáːrgən]"
      },
      {
        "en": "terminology",
        "ko": "전문 용어 체계",
        "ipa": "[tə̀ːrminálədʒi]"
      },
      {
        "en": "fluent",
        "ko": "유창한, 능통한",
        "ipa": "[flúːənt]"
      },
      {
        "en": "fluency",
        "ko": "유창함",
        "ipa": "[flúːənsi]"
      },
      {
        "en": "articulate",
        "ko": "또렷이 말하다, 분명한",
        "ipa": "[artíkjəlèit]"
      },
      {
        "en": "articulation",
        "ko": "명확한 발음, 표현",
        "ipa": "[àːrtikjəléiʃən]"
      },
      {
        "en": "rhetoric",
        "ko": "수사법, 미사여구",
        "ipa": "[rétərik]"
      },
      {
        "en": "rhetorical",
        "ko": "수사적인",
        "ipa": "[ritɔ́ːrikəl]"
      },
      {
        "en": "narrative",
        "ko": "이야기, 서사",
        "ipa": "[nǽrətiv]"
      },
      {
        "en": "narrate",
        "ko": "이야기하다",
        "ipa": "[néərèit]"
      },
      {
        "en": "narrator",
        "ko": "서술자, 해설자",
        "ipa": "[néəreitər]"
      },
      {
        "en": "metaphor",
        "ko": "은유, 비유",
        "ipa": "[métəfɔr]"
      },
      {
        "en": "simile",
        "ko": "직유, 직유법",
        "ipa": "[síməli]"
      },
      {
        "en": "symbolism",
        "ko": "상징주의, 상징적 표현",
        "ipa": "[símbəlìzəm]"
      },
      {
        "en": "irony",
        "ko": "반어법, 풍자, 아이러니",
        "ipa": "[áirəni]"
      },
      {
        "en": "satire",
        "ko": "풍자, 풍자 문학",
        "ipa": "[sǽtàiər]"
      },
      {
        "en": "parody",
        "ko": "패러디, 풍자적 모방",
        "ipa": "[péərədi]"
      },
      {
        "en": "hyperbole",
        "ko": "과장, 과장법",
        "ipa": "[haipə́ːrbəlìː]"
      },
      {
        "en": "euphemism",
        "ko": "완곡어법",
        "ipa": "[júːfəmìzəm]"
      },
      {
        "en": "cliché",
        "ko": "진부한 표현, 상투적 문구",
        "ipa": "[kliːʃéi]"
      },
      {
        "en": "quote",
        "ko": "인용하다, 견적을 내다",
        "ipa": "[kwóut]"
      },
      {
        "en": "quotation",
        "ko": "인용, 인용구",
        "ipa": "[kwoutéiʃən]"
      },
      {
        "en": "cite",
        "ko": "인용하다, 언급하다",
        "ipa": "[sáit]"
      },
      {
        "en": "citation",
        "ko": "인용, 표창",
        "ipa": "[saitéiʃən]"
      },
      {
        "en": "paraphrase",
        "ko": "다른 말로 바꾸어 표현하다",
        "ipa": "[péərəfrèiz]"
      },
      {
        "en": "summarize",
        "ko": "요약하다",
        "ipa": "[sʌ́məràiz]"
      }
    ]
  },
  {
    "id": "wm2000_day_33",
    "book": "워드마스터 수능 2000",
    "title": "Day 33",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "hierarchy",
        "ko": "계급 체계, 위계",
        "ipa": "[háiəràːrki]"
      },
      {
        "en": "hierarchical",
        "ko": "계급에 따른, 계층적인",
        "ipa": "[hàiráːrkəkəl]"
      },
      {
        "en": "stratification",
        "ko": "계층화, 단층화",
        "ipa": "[stræ̀təfikéiʃən]"
      },
      {
        "en": "class",
        "ko": "계급, 계층, 수업",
        "ipa": "[klǽs]"
      },
      {
        "en": "status",
        "ko": "지위, 신분, 상태",
        "ipa": "[stǽtəs]"
      },
      {
        "en": "prestige",
        "ko": "위신, 명성",
        "ipa": "[prestíːʒ]"
      },
      {
        "en": "prestigious",
        "ko": "명망 있는, 일류의",
        "ipa": "[prestídʒəs]"
      },
      {
        "en": "elite",
        "ko": "엘리트, 최상류층",
        "ipa": "[ilíːt]"
      },
      {
        "en": "underprivileged",
        "ko": "혜택을 받지 못하는",
        "ipa": "[ʌ́ndərprívlədʒd]"
      },
      {
        "en": "poverty",
        "ko": "빈곤, 가난",
        "ipa": "[pávərti]"
      },
      {
        "en": "destitute",
        "ko": "극빈한, 빈곤한",
        "ipa": "[déstətùːt]"
      },
      {
        "en": "impoverished",
        "ko": "가난해진, 궁핍한",
        "ipa": "[ìmpávriʃt]"
      },
      {
        "en": "wealth",
        "ko": "부, 재산, 풍부함",
        "ipa": "[wélθ]"
      },
      {
        "en": "wealthy",
        "ko": "부유한, 재산이 많은",
        "ipa": "[wélθi]"
      },
      {
        "en": "affluent",
        "ko": "부유한, 풍요로운",
        "ipa": "[ǽfluːənt]"
      },
      {
        "en": "affluence",
        "ko": "풍요, 부유",
        "ipa": "[ǽfluːəns]"
      },
      {
        "en": "prosperity",
        "ko": "번영, 번성",
        "ipa": "[praspéərəti]"
      },
      {
        "en": "prosper",
        "ko": "번영하다, 번창하다",
        "ipa": "[práspər]"
      },
      {
        "en": "prosperous",
        "ko": "번영하는, 번성한",
        "ipa": "[práspərəs]"
      },
      {
        "en": "welfare",
        "ko": "복지, 안녕",
        "ipa": "[wélfèər]"
      },
      {
        "en": "wellbeing",
        "ko": "행복, 안녕",
        "ipa": "[wèlbíːiŋ]"
      },
      {
        "en": "subsidy",
        "ko": "보조금, 장려금",
        "ipa": "[sʌ́bsidi]"
      },
      {
        "en": "subsidize",
        "ko": "보조금을 지급하다",
        "ipa": "[sʌ́bsidàiz]"
      },
      {
        "en": "pension",
        "ko": "국민연금, 연금",
        "ipa": "[pénʃən]"
      },
      {
        "en": "insurance",
        "ko": "보험",
        "ipa": "[ìnʃúərəns]"
      },
      {
        "en": "inequality",
        "ko": "불평등",
        "ipa": "[ìnikwáləti]"
      },
      {
        "en": "equality",
        "ko": "평등",
        "ipa": "[ikwáləti]"
      },
      {
        "en": "equity",
        "ko": "공평, 공정, 자기자본",
        "ipa": "[ékwəti]"
      },
      {
        "en": "discrimination",
        "ko": "차별, 분별력",
        "ipa": "[diskrìmənéiʃən]"
      },
      {
        "en": "discriminate",
        "ko": "차별하다, 구별하다",
        "ipa": "[diskrímənèit]"
      },
      {
        "en": "segregation",
        "ko": "인종 차별, 격리",
        "ipa": "[sègrəgéiʃən]"
      },
      {
        "en": "segregate",
        "ko": "격리하다, 분리하다",
        "ipa": "[ségrəgèit]"
      },
      {
        "en": "integrate",
        "ko": "통합하다, 융합하다",
        "ipa": "[íntəgrèit]"
      },
      {
        "en": "integration",
        "ko": "통합",
        "ipa": "[ìntəgréiʃən]"
      },
      {
        "en": "marginalize",
        "ko": "사회적으로 소외시키다",
        "ipa": "[máːrdʒənəlàiz]"
      },
      {
        "en": "minority",
        "ko": "소수자, 소수",
        "ipa": "[mainɔ́ːrəti]"
      },
      {
        "en": "majority",
        "ko": "다수, 과반수",
        "ipa": "[mədʒɔ́ːrəti]"
      },
      {
        "en": "diversity",
        "ko": "다양성",
        "ipa": "[divə́ːrsiti]"
      },
      {
        "en": "diverse",
        "ko": "다양한",
        "ipa": "[daivə́ːrs]"
      },
      {
        "en": "multicultural",
        "ko": "다문화의",
        "ipa": "[mʌ̀ltikʌ́ltʃərəl]"
      }
    ]
  },
  {
    "id": "wm2000_day_34",
    "book": "워드마스터 수능 2000",
    "title": "Day 34",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "melody",
        "ko": "선율, 멜로디",
        "ipa": "[mélədi]"
      },
      {
        "en": "harmony",
        "ko": "화음, 조화",
        "ipa": "[háːrməni]"
      },
      {
        "en": "rhythm",
        "ko": "리듬, 규칙적 변화",
        "ipa": "[ríðəm]"
      },
      {
        "en": "rhythmic",
        "ko": "리듬감 있는",
        "ipa": "[ríðmik]"
      },
      {
        "en": "tempo",
        "ko": "속도, 템포",
        "ipa": "[témpòu]"
      },
      {
        "en": "composition",
        "ko": "작곡, 구성, 작품",
        "ipa": "[kàmpəzíʃən]"
      },
      {
        "en": "composer",
        "ko": "작곡가",
        "ipa": "[kəmpóuzər]"
      },
      {
        "en": "orchestra",
        "ko": "오케스트라, 관현악단",
        "ipa": "[ɔ́ːrkəstrə]"
      },
      {
        "en": "symphony",
        "ko": "교향곡",
        "ipa": "[símfəni]"
      },
      {
        "en": "concerto",
        "ko": "협주곡",
        "ipa": "[kəntʃéərtou]"
      },
      {
        "en": "conductor",
        "ko": "지휘자, 전도체",
        "ipa": "[kəndʌ́ktər]"
      },
      {
        "en": "instrumental",
        "ko": "기악의, 도움이 되는",
        "ipa": "[ìnstrəméntəl]"
      },
      {
        "en": "vocal",
        "ko": "목소리의, 성악의, 의견을 강력히 밝히는",
        "ipa": "[vóukəl]"
      },
      {
        "en": "vocalist",
        "ko": "가수, 보컬",
        "ipa": "[vóukəlist]"
      },
      {
        "en": "choir",
        "ko": "합창단, 성가대",
        "ipa": "[kwáiər]"
      },
      {
        "en": "chorus",
        "ko": "합창, 후렴구",
        "ipa": "[kɔ́ːrəs]"
      },
      {
        "en": "audition",
        "ko": "오디션, 심사",
        "ipa": "[adíʃən]"
      },
      {
        "en": "rehearse",
        "ko": "연습하다, 리허설을 하다",
        "ipa": "[rihə́ːrs]"
      },
      {
        "en": "rehearsal",
        "ko": "리허설, 예행연습",
        "ipa": "[rihə́ːrsəl]"
      },
      {
        "en": "venue",
        "ko": "공연 장소, 개최지",
        "ipa": "[vénjuː]"
      },
      {
        "en": "stage",
        "ko": "무대, 단계",
        "ipa": "[stéidʒ]"
      },
      {
        "en": "backdrop",
        "ko": "배경, 배경막",
        "ipa": "[bǽkdràp]"
      },
      {
        "en": "costume",
        "ko": "의상, 복장",
        "ipa": "[kastúːm]"
      },
      {
        "en": "prop",
        "ko": "소품, 받침대, 지지하다",
        "ipa": "[práp]"
      },
      {
        "en": "script",
        "ko": "대본, 원고",
        "ipa": "[skrípt]"
      },
      {
        "en": "playwright",
        "ko": "극작가",
        "ipa": "[pléiràit]"
      },
      {
        "en": "director",
        "ko": "감독, 연출가, 이사",
        "ipa": "[dəréktər]"
      },
      {
        "en": "choreography",
        "ko": "안무, 무용 지도",
        "ipa": "[kɔ̀ːriágrəfi]"
      },
      {
        "en": "choreographer",
        "ko": "안무가",
        "ipa": "[kɔ̀ːriágrəfər]"
      },
      {
        "en": "spectator",
        "ko": "관객, 관중",
        "ipa": "[spékteitər]"
      },
      {
        "en": "applause",
        "ko": "박수갈채",
        "ipa": "[əplɔ́ːz]"
      },
      {
        "en": "applaud",
        "ko": "박수치다, 칭찬하다",
        "ipa": "[əplɔ́ːd]"
      },
      {
        "en": "ovation",
        "ko": "열렬한 박수, 환호",
        "ipa": "[ouvéiʃən]"
      },
      {
        "en": "encore",
        "ko": "앙코르, 재공연 요청",
        "ipa": "[ánkɔ̀ːr]"
      },
      {
        "en": "debut",
        "ko": "데뷔, 첫 등장",
        "ipa": "[deibjúː]"
      },
      {
        "en": "celebrity",
        "ko": "유명인, 명성",
        "ipa": "[səlébriti]"
      },
      {
        "en": "entertainment",
        "ko": "오락, 연예",
        "ipa": "[èntərtéinmənt]"
      },
      {
        "en": "entertainer",
        "ko": "연예인",
        "ipa": "[èntərtéinər]"
      },
      {
        "en": "amuse",
        "ko": "즐겁게 하다",
        "ipa": "[əmjúːz]"
      },
      {
        "en": "amusement",
        "ko": "재미, 오락",
        "ipa": "[əmjúːzmənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_35",
    "book": "워드마스터 수능 2000",
    "title": "Day 35",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "commerce",
        "ko": "상업, 교역",
        "ipa": "[kámərs]"
      },
      {
        "en": "commercialize",
        "ko": "상업화하다",
        "ipa": "[kəmə́ːrʃəlàiz]"
      },
      {
        "en": "merchandise",
        "ko": "상품, 물품",
        "ipa": "[mə́ːrtʃəndàiz]"
      },
      {
        "en": "commodity",
        "ko": "원자재, 상품",
        "ipa": "[kəmádəti]"
      },
      {
        "en": "inventory",
        "ko": "재고, 재고 목록",
        "ipa": "[ìnvəntɔ́ːri]"
      },
      {
        "en": "stock",
        "ko": "재고, 주식, 저장하다",
        "ipa": "[sták]"
      },
      {
        "en": "wholesale",
        "ko": "도매, 도매의",
        "ipa": "[hóulsèil]"
      },
      {
        "en": "retail",
        "ko": "소매, 소매의",
        "ipa": "[ríːtèil]"
      },
      {
        "en": "retailer",
        "ko": "소매상, 유통업체",
        "ipa": "[ríːtèilər]"
      },
      {
        "en": "distribute",
        "ko": "유통하다, 배분하다",
        "ipa": "[distríbjuːt]"
      },
      {
        "en": "distribution",
        "ko": "유통, 분배",
        "ipa": "[dìstrəbjúːʃən]"
      },
      {
        "en": "distributor",
        "ko": "유통업자, 배급사",
        "ipa": "[distríbjətər]"
      },
      {
        "en": "logistics",
        "ko": "물류, 물류 관리",
        "ipa": "[lədʒístiks]"
      },
      {
        "en": "supply",
        "ko": "공급, 공급하다",
        "ipa": "[səplái]"
      },
      {
        "en": "demand",
        "ko": "수요, 요구하다",
        "ipa": "[dimǽnd]"
      },
      {
        "en": "consumer",
        "ko": "소비자",
        "ipa": "[kənsúːmər]"
      },
      {
        "en": "consume",
        "ko": "소비하다, 소모하다",
        "ipa": "[kənsúːm]"
      },
      {
        "en": "consumption",
        "ko": "소비, 소비량",
        "ipa": "[kənsʌ́mpʃən]"
      },
      {
        "en": "advertisement",
        "ko": "광고, 홍보",
        "ipa": "[ædvə́ːrtəzmənt]"
      },
      {
        "en": "advertise",
        "ko": "광고하다",
        "ipa": "[ǽdvərtàiz]"
      },
      {
        "en": "brand",
        "ko": "상표, 브랜드",
        "ipa": "[brǽnd]"
      },
      {
        "en": "reputation",
        "ko": "평판, 명성",
        "ipa": "[rèpjətéiʃən]"
      },
      {
        "en": "loyalty",
        "ko": "충성도, 충성심",
        "ipa": "[lɔ́iəlti]"
      },
      {
        "en": "customer",
        "ko": "고객, 손님",
        "ipa": "[kʌ́stəmər]"
      },
      {
        "en": "client",
        "ko": "고객, 의뢰인",
        "ipa": "[kláiənt]"
      },
      {
        "en": "transaction",
        "ko": "거래, 매매",
        "ipa": "[trænzǽkʃən]"
      },
      {
        "en": "receipt",
        "ko": "영수증, 수령",
        "ipa": "[risíːt]"
      },
      {
        "en": "refund",
        "ko": "환불, 환불하다",
        "ipa": "[rifʌ́nd]"
      },
      {
        "en": "exchange",
        "ko": "교환하다, 환전하다",
        "ipa": "[ikstʃéindʒ]"
      },
      {
        "en": "warranty",
        "ko": "품질 보증서",
        "ipa": "[wɔ́ːrənti]"
      },
      {
        "en": "guarantee",
        "ko": "보장하다, 보증",
        "ipa": "[gèərəntíː]"
      },
      {
        "en": "discount",
        "ko": "할인, 무시하다",
        "ipa": "[diskáunt]"
      },
      {
        "en": "bargain",
        "ko": "특가품, 흥정하다",
        "ipa": "[báːrgən]"
      },
      {
        "en": "auction",
        "ko": "경매",
        "ipa": "[ákʃən]"
      },
      {
        "en": "bid",
        "ko": "입찰하다, 입찰",
        "ipa": "[bíd]"
      },
      {
        "en": "monopoly",
        "ko": "독점, 전매",
        "ipa": "[mənápəli]"
      },
      {
        "en": "oligopoly",
        "ko": "과점",
        "ipa": "[àligápəli]"
      },
      {
        "en": "competition",
        "ko": "경쟁",
        "ipa": "[kàmpətíʃən]"
      },
      {
        "en": "competitor",
        "ko": "경쟁자, 경쟁업체",
        "ipa": "[kəmpétətər]"
      },
      {
        "en": "niche",
        "ko": "틈새시장, 적소",
        "ipa": "[nítʃ]"
      }
    ]
  },
  {
    "id": "wm2000_day_36",
    "book": "워드마스터 수능 2000",
    "title": "Day 36",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "chemistry",
        "ko": "화학",
        "ipa": "[kéməstri]"
      },
      {
        "en": "chemical",
        "ko": "화학 물질, 화학의",
        "ipa": "[kéməkəl]"
      },
      {
        "en": "element",
        "ko": "원소, 요소",
        "ipa": "[éləmənt]"
      },
      {
        "en": "compound",
        "ko": "화합물, 혼합하다",
        "ipa": "[kámpaund]"
      },
      {
        "en": "reaction",
        "ko": "반응",
        "ipa": "[riǽkʃən]"
      },
      {
        "en": "react",
        "ko": "반응하다",
        "ipa": "[riǽkt]"
      },
      {
        "en": "reactant",
        "ko": "반응 물질",
        "ipa": "[riǽktənt]"
      },
      {
        "en": "catalyst",
        "ko": "촉매",
        "ipa": "[kǽtələst]"
      },
      {
        "en": "solution",
        "ko": "용액, 해결책",
        "ipa": "[səlúːʃən]"
      },
      {
        "en": "solvent",
        "ko": "용매, 지불 능력이 있는",
        "ipa": "[sálvənt]"
      },
      {
        "en": "solute",
        "ko": "용질",
        "ipa": "[sáljuːt]"
      },
      {
        "en": "dissolve",
        "ko": "녹이다, 용해하다",
        "ipa": "[dizálv]"
      },
      {
        "en": "acid",
        "ko": "산, 산성의",
        "ipa": "[ǽsəd]"
      },
      {
        "en": "acidic",
        "ko": "산성의",
        "ipa": "[əsídik]"
      },
      {
        "en": "alkali",
        "ko": "알칼리, 염기",
        "ipa": "[ǽlkəlài]"
      },
      {
        "en": "alkaline",
        "ko": "알칼리성의",
        "ipa": "[ǽlkəlàin]"
      },
      {
        "en": "neutral",
        "ko": "중성의, 중립의",
        "ipa": "[núːtrəl]"
      },
      {
        "en": "neutralize",
        "ko": "중화하다, 무력화하다",
        "ipa": "[núːtrəlàiz]"
      },
      {
        "en": "thermodynamics",
        "ko": "열역학",
        "ipa": "[θə̀ːrmoudàinǽmiks]"
      },
      {
        "en": "thermal",
        "ko": "열의, 보온의",
        "ipa": "[θə́ːrməl]"
      },
      {
        "en": "kinetic",
        "ko": "운동의, 운동 에너지의",
        "ipa": "[kənétik]"
      },
      {
        "en": "potential",
        "ko": "잠재력, 잠재적인, 위치 에너지",
        "ipa": "[pəténʃəl]"
      },
      {
        "en": "friction",
        "ko": "마찰력, 저항",
        "ipa": "[fríkʃən]"
      },
      {
        "en": "inertia",
        "ko": "관성, 무기력",
        "ipa": "[ìnə́ːrʃə]"
      },
      {
        "en": "momentum",
        "ko": "운동량, 추진력",
        "ipa": "[mouméntəm]"
      },
      {
        "en": "equilibrium",
        "ko": "평형 상태, 균형",
        "ipa": "[ìːkwəlíbriəm]"
      },
      {
        "en": "optics",
        "ko": "광학",
        "ipa": "[áptiks]"
      },
      {
        "en": "refract",
        "ko": "굴절시키다",
        "ipa": "[rifrǽkt]"
      },
      {
        "en": "refraction",
        "ko": "굴절",
        "ipa": "[rifrǽkʃən]"
      },
      {
        "en": "reflect",
        "ko": "반사하다, 반영하다, 숙고하다",
        "ipa": "[riflékt]"
      },
      {
        "en": "reflection",
        "ko": "반사, 반영, 심사숙고",
        "ipa": "[riflékʃən]"
      },
      {
        "en": "transmit",
        "ko": "투과시키다, 전송하다",
        "ipa": "[trænzmít]"
      },
      {
        "en": "absorb",
        "ko": "흡수하다, 열중시키다",
        "ipa": "[əbzɔ́ːrb]"
      },
      {
        "en": "absorption",
        "ko": "흡수, 몰입",
        "ipa": "[əbzɔ́ːrpʃən]"
      },
      {
        "en": "fluid",
        "ko": "유체, 유동적인",
        "ipa": "[flúːəd]"
      },
      {
        "en": "liquify",
        "ko": "액화하다",
        "ipa": "[líkwəfài]"
      },
      {
        "en": "evaporate",
        "ko": "증발하다, 사라지다",
        "ipa": "[ivǽpərèit]"
      },
      {
        "en": "evaporation",
        "ko": "증발",
        "ipa": "[ivæ̀pəréiʃən]"
      },
      {
        "en": "condense",
        "ko": "응결되다, 요약하다",
        "ipa": "[kəndéns]"
      },
      {
        "en": "condensation",
        "ko": "응결, 응축",
        "ipa": "[kàndənséiʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_37",
    "book": "워드마스터 수능 2000",
    "title": "Day 37",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "behavior",
        "ko": "행동, 처신",
        "ipa": "[bihéivjər]"
      },
      {
        "en": "behavioral",
        "ko": "행동의",
        "ipa": "[bihéivjərəl]"
      },
      {
        "en": "habit",
        "ko": "습관, 버릇",
        "ipa": "[hǽbət]"
      },
      {
        "en": "habitual",
        "ko": "습관적인, 늘 하는",
        "ipa": "[həbítʃuːəl]"
      },
      {
        "en": "routine",
        "ko": "일상, 판에 박힌 일",
        "ipa": "[ruːtíːn]"
      },
      {
        "en": "stimulus",
        "ko": "자극",
        "ipa": "[stímjələs]"
      },
      {
        "en": "stimulate",
        "ko": "자극하다, 격려하다",
        "ipa": "[stímjəlèit]"
      },
      {
        "en": "stimulation",
        "ko": "자극, 흥분",
        "ipa": "[stìmjəléiʃən]"
      },
      {
        "en": "response",
        "ko": "반응, 응답",
        "ipa": "[rispáns]"
      },
      {
        "en": "conditioned",
        "ko": "조건 반사의, 길들여진",
        "ipa": "[kəndíʃənd]"
      },
      {
        "en": "reinforce",
        "ko": "강화하다, 보강하다",
        "ipa": "[rìːinfɔ́ːrs]"
      },
      {
        "en": "reinforcement",
        "ko": "강화, 보강",
        "ipa": "[rìːinfɔ́ːrsmənt]"
      },
      {
        "en": "extinction",
        "ko": "소거, 소멸",
        "ipa": "[ikstíŋkʃən]"
      },
      {
        "en": "instinct",
        "ko": "본능, 직관",
        "ipa": "[ínstiŋkt]"
      },
      {
        "en": "instinctive",
        "ko": "본능적인",
        "ipa": "[ìnstíŋktiv]"
      },
      {
        "en": "intuition",
        "ko": "직관",
        "ipa": "[ìntuːíʃən]"
      },
      {
        "en": "subconscious",
        "ko": "잠재의식, 잠재의식적인",
        "ipa": "[səbkánʃəs]"
      },
      {
        "en": "unconscious",
        "ko": "무의식적인",
        "ipa": "[ʌ̀nkánʃəs]"
      },
      {
        "en": "repression",
        "ko": "억압, 억제",
        "ipa": "[ripréʃən]"
      },
      {
        "en": "repress",
        "ko": "억압하다, 억누르다",
        "ipa": "[riprés]"
      },
      {
        "en": "defense",
        "ko": "방어, 변호",
        "ipa": "[diféns]"
      },
      {
        "en": "mechanism",
        "ko": "기제, 메커니즘, 구조",
        "ipa": "[mékənìzəm]"
      },
      {
        "en": "projection",
        "ko": "투사, 예상, 투영",
        "ipa": "[prədʒékʃən]"
      },
      {
        "en": "introvert",
        "ko": "내향적인 사람",
        "ipa": "[íntrouvə̀ːrt]"
      },
      {
        "en": "introverted",
        "ko": "내향적인",
        "ipa": "[íntrouvə̀ːrtid]"
      },
      {
        "en": "extrovert",
        "ko": "외향적인 사람",
        "ipa": "[ékstrəvə̀ːrt]"
      },
      {
        "en": "extroverted",
        "ko": "외향적인",
        "ipa": "[ékstrəvə̀ːrtid]"
      },
      {
        "en": "self-esteem",
        "ko": "자존감, 자부심",
        "ipa": "[sélf-əstíːm]"
      },
      {
        "en": "self-efficacy",
        "ko": "자기효능감",
        "ipa": "[sélf-éfikæ̀si]"
      },
      {
        "en": "narcissism",
        "ko": "자기애, 나르시시즘",
        "ipa": "[náːrsisìzəm]"
      },
      {
        "en": "complex",
        "ko": "콤플렉스, 강박관념",
        "ipa": "[kámpleks]"
      },
      {
        "en": "trauma",
        "ko": "정신적 충격, 트라우마",
        "ipa": "[trɔ́ːmə]"
      },
      {
        "en": "neurosis",
        "ko": "신경증, 노이로제",
        "ipa": "[nuəróusəs]"
      },
      {
        "en": "psychosis",
        "ko": "정신병",
        "ipa": "[saikóusəs]"
      },
      {
        "en": "therapy",
        "ko": "심리 치료, 요법",
        "ipa": "[θéərəpi]"
      },
      {
        "en": "counseling",
        "ko": "상담, 조언",
        "ipa": "[káunsəliŋ]"
      },
      {
        "en": "consult",
        "ko": "상담하다, 상의하다",
        "ipa": "[kənsʌ́lt]"
      },
      {
        "en": "consultant",
        "ko": "상담가, 자문위원",
        "ipa": "[kənsʌ́ltənt]"
      },
      {
        "en": "coping",
        "ko": "대처, 대응",
        "ipa": "[kóupiŋ]"
      },
      {
        "en": "cope",
        "ko": "대처하다, 맞서다",
        "ipa": "[kóup]"
      }
    ]
  },
  {
    "id": "wm2000_day_38",
    "book": "워드마스터 수능 2000",
    "title": "Day 38",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "pedagogy",
        "ko": "교육학, 교수법",
        "ipa": "[pédəgòudʒi]"
      },
      {
        "en": "didactic",
        "ko": "교훈적인, 가르치려 드는",
        "ipa": "[daidǽktik]"
      },
      {
        "en": "mentor",
        "ko": "멘토, 조언자",
        "ipa": "[méntɔ̀ːr]"
      },
      {
        "en": "mentorship",
        "ko": "멘토 관계, 지도",
        "ipa": "[méntərʃìp]"
      },
      {
        "en": "tutor",
        "ko": "개인 지도 교사, 지도하다",
        "ipa": "[túːtər]"
      },
      {
        "en": "tutorial",
        "ko": "개별 지도, 사용 지침서",
        "ipa": "[tuːtɔ́ːriəl]"
      },
      {
        "en": "scholar",
        "ko": "학자",
        "ipa": "[skálər]"
      },
      {
        "en": "scholastic",
        "ko": "학업의, 학교의",
        "ipa": "[skəlǽstik]"
      },
      {
        "en": "erudite",
        "ko": "박식한, 학식 있는",
        "ipa": "[éərədàit]"
      },
      {
        "en": "literacy",
        "ko": "문해력, 읽고 쓰는 능력",
        "ipa": "[lítərəsi]"
      },
      {
        "en": "numeracy",
        "ko": "산술 능력, 수리력",
        "ipa": "[njúːmərəsi]"
      },
      {
        "en": "critical",
        "ko": "비판적인, 중요한",
        "ipa": "[krítikəl]"
      },
      {
        "en": "inquiry",
        "ko": "탐구, 질문, 문의",
        "ipa": "[ìnkwáirìː]"
      },
      {
        "en": "inquire",
        "ko": "묻다, 조사하다",
        "ipa": "[ìnkwáir]"
      },
      {
        "en": "investigate",
        "ko": "연구하다, 조사하다",
        "ipa": "[ìnvéstəgèit]"
      },
      {
        "en": "methodology",
        "ko": "방법론",
        "ipa": "[mèθədálədʒi]"
      },
      {
        "en": "empirical",
        "ko": "경험적인, 실증적인",
        "ipa": "[èmpíərikəl]"
      },
      {
        "en": "quantitative",
        "ko": "양적인, 수량적인",
        "ipa": "[kwántitèitiv]"
      },
      {
        "en": "qualitative",
        "ko": "질적인",
        "ipa": "[kwálətèitiv]"
      },
      {
        "en": "sample",
        "ko": "표본, 견본",
        "ipa": "[sǽmpəl]"
      },
      {
        "en": "sampling",
        "ko": "표본 추출",
        "ipa": "[sǽmpliŋ]"
      },
      {
        "en": "survey",
        "ko": "설문 조사, 조망하다",
        "ipa": "[sərvéi]"
      },
      {
        "en": "questionnaire",
        "ko": "질문지, 설문지",
        "ipa": "[kwèstʃənéər]"
      },
      {
        "en": "correlation",
        "ko": "상관관계",
        "ipa": "[kɔ̀ːrəléiʃən]"
      },
      {
        "en": "causation",
        "ko": "인과관계",
        "ipa": "[kɔ̀ːzéiʃən]"
      },
      {
        "en": "bias",
        "ko": "편향, 선입견",
        "ipa": "[báiəs]"
      },
      {
        "en": "prejudice",
        "ko": "편견, 선입관",
        "ipa": "[prédʒədis]"
      },
      {
        "en": "peer-review",
        "ko": "동료 심사",
        "ipa": "[píər-rìːvjúː]"
      },
      {
        "en": "citation",
        "ko": "인용",
        "ipa": "[saitéiʃən]"
      },
      {
        "en": "bibliography",
        "ko": "참고문헌 목록",
        "ipa": "[bìbliágrəfi]"
      },
      {
        "en": "abstract",
        "ko": "초록, 개요, 추상적인",
        "ipa": "[æbstrǽkt]"
      },
      {
        "en": "thesis",
        "ko": "학위 논문, 명제",
        "ipa": "[θíːsəs]"
      },
      {
        "en": "dissertation",
        "ko": "박사 논문",
        "ipa": "[dìsərtéiʃən]"
      },
      {
        "en": "plagiarism",
        "ko": "표절",
        "ipa": "[pléidʒərìzəm]"
      },
      {
        "en": "plagiarize",
        "ko": "표절하다",
        "ipa": "[pléidʒəràiz]"
      },
      {
        "en": "ethics",
        "ko": "연구 윤리, 윤리학",
        "ipa": "[éθiks]"
      },
      {
        "en": "integrity",
        "ko": "진실성, 온전함",
        "ipa": "[ìntégrəti]"
      },
      {
        "en": "rigorous",
        "ko": "엄격한, 철저한",
        "ipa": "[rígərəs]"
      },
      {
        "en": "rigor",
        "ko": "엄격함, 정확함",
        "ipa": "[rígər]"
      },
      {
        "en": "academician",
        "ko": "학술원 회원, 학자",
        "ipa": "[æ̀kədəmíʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_39",
    "book": "워드마스터 수능 2000",
    "title": "Day 39",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "pharmacy",
        "ko": "약국, 약학",
        "ipa": "[fáːrməsi]"
      },
      {
        "en": "pharmaceutical",
        "ko": "제약의, 약학의",
        "ipa": "[fàːrməsúːtikəl]"
      },
      {
        "en": "pharmacist",
        "ko": "약사",
        "ipa": "[fáːrməsist]"
      },
      {
        "en": "prescription",
        "ko": "처방전, 규정",
        "ipa": "[prəskrípʃən]"
      },
      {
        "en": "prescribe",
        "ko": "처방하다, 규정하다",
        "ipa": "[prəskráib]"
      },
      {
        "en": "dosage",
        "ko": "복용량, 투약량",
        "ipa": "[dóusədʒ]"
      },
      {
        "en": "dose",
        "ko": "1회 복용량",
        "ipa": "[dóus]"
      },
      {
        "en": "medication",
        "ko": "약물, 투약",
        "ipa": "[mèdəkéiʃən]"
      },
      {
        "en": "antibiotic",
        "ko": "항생제",
        "ipa": "[æ̀ntibaiátik]"
      },
      {
        "en": "antiviral",
        "ko": "항바이러스의",
        "ipa": "[æ̀ntiváirəl]"
      },
      {
        "en": "painkiller",
        "ko": "진통제",
        "ipa": "[péinkìlər]"
      },
      {
        "en": "sedative",
        "ko": "진정제",
        "ipa": "[sédətiv]"
      },
      {
        "en": "anesthetic",
        "ko": "마취제, 마취의",
        "ipa": "[æ̀nəsθétik]"
      },
      {
        "en": "anesthesia",
        "ko": "마취",
        "ipa": "[æ̀nisθíːʒə]"
      },
      {
        "en": "surgery",
        "ko": "수술, 외과",
        "ipa": "[sə́ːrdʒəri]"
      },
      {
        "en": "surgeon",
        "ko": "외과의사",
        "ipa": "[sə́ːrdʒən]"
      },
      {
        "en": "surgical",
        "ko": "수술의, 외과의",
        "ipa": "[sə́ːrdʒikəl]"
      },
      {
        "en": "operation",
        "ko": "수술, 작동, 운영",
        "ipa": "[àpəréiʃən]"
      },
      {
        "en": "operate",
        "ko": "수술하다, 작동하다",
        "ipa": "[ápərèit]"
      },
      {
        "en": "transplant",
        "ko": "이식하다, 장기 이식",
        "ipa": "[trænsplǽnt]"
      },
      {
        "en": "donor",
        "ko": "기증자, 기부자",
        "ipa": "[dóunər]"
      },
      {
        "en": "recipient",
        "ko": "수혜자, 장기 이식 받는 사람",
        "ipa": "[rəsípiənt]"
      },
      {
        "en": "chronic",
        "ko": "만성의",
        "ipa": "[kránik]"
      },
      {
        "en": "acute",
        "ko": "급성의, 예리한",
        "ipa": "[əkjúːt]"
      },
      {
        "en": "malignant",
        "ko": "악성의 (종양)",
        "ipa": "[məlígnənt]"
      },
      {
        "en": "benign",
        "ko": "양성의, 온화한",
        "ipa": "[bináin]"
      },
      {
        "en": "tumor",
        "ko": "종양",
        "ipa": "[túːmər]"
      },
      {
        "en": "cancer",
        "ko": "암",
        "ipa": "[kǽnsər]"
      },
      {
        "en": "carcinogen",
        "ko": "발암 물질",
        "ipa": "[karsínədʒən]"
      },
      {
        "en": "hypertension",
        "ko": "고혈압",
        "ipa": "[hàipərténʃən]"
      },
      {
        "en": "diabetes",
        "ko": "당뇨병",
        "ipa": "[dàiəbíːtiz]"
      },
      {
        "en": "stroke",
        "ko": "뇌졸중, 타격",
        "ipa": "[stróuk]"
      },
      {
        "en": "cardiac",
        "ko": "심장의",
        "ipa": "[káːrdiæ̀k]"
      },
      {
        "en": "respiratory",
        "ko": "호흡기의",
        "ipa": "[réspərətɔ̀ːri]"
      },
      {
        "en": "asthma",
        "ko": "천식",
        "ipa": "[ǽzmə]"
      },
      {
        "en": "allergy",
        "ko": "알레르기",
        "ipa": "[ǽlərdʒi]"
      },
      {
        "en": "allergic",
        "ko": "알레르기가 있는",
        "ipa": "[ələ́ːrdʒik]"
      },
      {
        "en": "rehabilitation",
        "ko": "재활, 사회 복귀",
        "ipa": "[rìːhəbìlətéiʃən]"
      },
      {
        "en": "rehabilitate",
        "ko": "재활 치료를 하다",
        "ipa": "[rìːhəbílətèit]"
      },
      {
        "en": "prognosis",
        "ko": "예후, 예측",
        "ipa": "[pragnóusəs]"
      }
    ]
  },
  {
    "id": "wm2000_day_40",
    "book": "워드마스터 수능 2000",
    "title": "Day 40",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "sustainability",
        "ko": "지속 가능성",
        "ipa": "[səstèinəbíliti]"
      },
      {
        "en": "renewable",
        "ko": "재생 가능한",
        "ipa": "[rinúːəbəl]"
      },
      {
        "en": "biofuel",
        "ko": "바이오 연료",
        "ipa": "[báioufjùːəl]"
      },
      {
        "en": "solar",
        "ko": "태양광의",
        "ipa": "[sóulər]"
      },
      {
        "en": "photovoltaic",
        "ko": "태양광 발전의",
        "ipa": "[fòutəvòultéiik]"
      },
      {
        "en": "hydroelectric",
        "ko": "수력 발전의",
        "ipa": "[hàidrouiléktrik]"
      },
      {
        "en": "geothermal",
        "ko": "지열의",
        "ipa": "[dʒìːouθə́ːrməl]"
      },
      {
        "en": "deforestation",
        "ko": "삼림 벌채, 산림 파괴",
        "ipa": "[difɔ̀ːristéiʃən]"
      },
      {
        "en": "afforestation",
        "ko": "조림, 숲 가꾸기",
        "ipa": "[æfɔ̀ːristéiʃən]"
      },
      {
        "en": "desertification",
        "ko": "사막화",
        "ipa": "[dizə̀ːrtəfikéiʃən]"
      },
      {
        "en": "biodiversity",
        "ko": "생물다양성",
        "ipa": "[bàioudaivə́ːrsəti]"
      },
      {
        "en": "degradation",
        "ko": "퇴화, 질적 저하",
        "ipa": "[dègrədéiʃən]"
      },
      {
        "en": "degrade",
        "ko": "분해되다, 저하시키다",
        "ipa": "[digréid]"
      },
      {
        "en": "biodegradable",
        "ko": "생분해성의",
        "ipa": "[bàioudəgréidəbəl]"
      },
      {
        "en": "footprint",
        "ko": "발자국, 탄소 발자국",
        "ipa": "[fútprìnt]"
      },
      {
        "en": "carbon",
        "ko": "탄소",
        "ipa": "[káːrbən]"
      },
      {
        "en": "greenhouse",
        "ko": "온실",
        "ipa": "[gríːnhàus]"
      },
      {
        "en": "ozone",
        "ko": "오존",
        "ipa": "[óuzòun]"
      },
      {
        "en": "depletion",
        "ko": "고갈, 소모",
        "ipa": "[diplíːʃən]"
      },
      {
        "en": "deplete",
        "ko": "고갈시키다",
        "ipa": "[diplíːt]"
      },
      {
        "en": "acid rain",
        "ko": "산성비",
        "ipa": "[ǽsəd réin]"
      },
      {
        "en": "smog",
        "ko": "스모그",
        "ipa": "[smág]"
      },
      {
        "en": "particulate",
        "ko": "미립자, 미세먼지",
        "ipa": "[pərtíkjələt]"
      },
      {
        "en": "landfill",
        "ko": "쓰레기 매립지",
        "ipa": "[lǽndfìl]"
      },
      {
        "en": "incinerate",
        "ko": "소각하다",
        "ipa": "[ìnsínərèit]"
      },
      {
        "en": "incineration",
        "ko": "소각, 전소",
        "ipa": "[ìnsínərèiʃən]"
      },
      {
        "en": "conservationist",
        "ko": "자연보호 활동가",
        "ipa": "[kànsərvéiʃənist]"
      },
      {
        "en": "activist",
        "ko": "활동가, 운동가",
        "ipa": "[ǽktəvəst]"
      },
      {
        "en": "legislation",
        "ko": "법률 제정, 입법",
        "ipa": "[lèdʒəsléiʃən]"
      },
      {
        "en": "protocol",
        "ko": "의정서, 협약",
        "ipa": "[próutəkàl]"
      },
      {
        "en": "treaty",
        "ko": "조약",
        "ipa": "[tríːti]"
      },
      {
        "en": "regulation",
        "ko": "규제, 단속",
        "ipa": "[règjəléiʃən]"
      },
      {
        "en": "regulate",
        "ko": "규제하다, 조절하다",
        "ipa": "[régjəlèit]"
      },
      {
        "en": "sanctuary",
        "ko": "보호구역, 안식처",
        "ipa": "[sǽŋktʃuːèəri]"
      },
      {
        "en": "wildlife",
        "ko": "야생동물",
        "ipa": "[wáildlàif]"
      },
      {
        "en": "poach",
        "ko": "밀렵하다",
        "ipa": "[póutʃ]"
      },
      {
        "en": "poacher",
        "ko": "밀렵꾼",
        "ipa": "[póutʃər]"
      },
      {
        "en": "endangered",
        "ko": "멸종 위기에 처한",
        "ipa": "[endéindʒərd]"
      },
      {
        "en": "threatened",
        "ko": "위협받는",
        "ipa": "[θrétənd]"
      },
      {
        "en": "extinction",
        "ko": "멸종, 사멸",
        "ipa": "[ikstíŋkʃən]"
      }
    ]
  },
  {
    "id": "wm2000_day_41",
    "book": "워드마스터 수능 2000",
    "title": "Day 41",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "civilization",
        "ko": "문명",
        "ipa": "[sìvəlizéiʃən]"
      },
      {
        "en": "civilize",
        "ko": "문명화하다",
        "ipa": "[sívəlàiz]"
      },
      {
        "en": "ancient",
        "ko": "고대의, 옛날의",
        "ipa": "[éintʃənt]"
      },
      {
        "en": "medieval",
        "ko": "중세의",
        "ipa": "[midíːvəl]"
      },
      {
        "en": "renaissance",
        "ko": "부흥, 르네상스",
        "ipa": "[rènəsáns]"
      },
      {
        "en": "revolution",
        "ko": "혁명, 변혁",
        "ipa": "[rèvəlúːʃən]"
      },
      {
        "en": "revolutionary",
        "ko": "혁명적인, 혁명가",
        "ipa": "[rèvəlúːʃənèəri]"
      },
      {
        "en": "rebellion",
        "ko": "반란, 반역",
        "ipa": "[ribéljən]"
      },
      {
        "en": "rebel",
        "ko": "반역자, 반란을 일으키다",
        "ipa": "[rébəl]"
      },
      {
        "en": "uprising",
        "ko": "봉기, 반란",
        "ipa": "[əpráiziŋ]"
      },
      {
        "en": "empire",
        "ko": "제국",
        "ipa": "[émpaiər]"
      },
      {
        "en": "emperor",
        "ko": "황제",
        "ipa": "[émpərər]"
      },
      {
        "en": "imperial",
        "ko": "제국의, 황제의",
        "ipa": "[ìmpíəriəl]"
      },
      {
        "en": "imperialism",
        "ko": "제국주의",
        "ipa": "[ìmpíəriəlìzəm]"
      },
      {
        "en": "colony",
        "ko": "식민지",
        "ipa": "[káləni]"
      },
      {
        "en": "colonial",
        "ko": "식민지의",
        "ipa": "[kəlóuniəl]"
      },
      {
        "en": "colonize",
        "ko": "식민지화하다",
        "ipa": "[kálənàiz]"
      },
      {
        "en": "independence",
        "ko": "독립, 자립",
        "ipa": "[ìndipéndəns]"
      },
      {
        "en": "archaeology",
        "ko": "고고학",
        "ipa": "[àːrkiálədʒi]"
      },
      {
        "en": "archaeologist",
        "ko": "고고학자",
        "ipa": "[àːrkiálədʒist]"
      },
      {
        "en": "excavate",
        "ko": "발굴하다, 파내다",
        "ipa": "[ékskəvèit]"
      },
      {
        "en": "excavation",
        "ko": "발굴, 출토품",
        "ipa": "[èkskəvéiʃən]"
      },
      {
        "en": "artifact",
        "ko": "유물, 인공물",
        "ipa": "[áːrtəfæ̀kt]"
      },
      {
        "en": "relic",
        "ko": "유물, 유적",
        "ipa": "[rélik]"
      },
      {
        "en": "ruins",
        "ko": "폐허, 유적",
        "ipa": "[rúːənz]"
      },
      {
        "en": "fossilize",
        "ko": "화석화하다",
        "ipa": "[fásəlàiz]"
      },
      {
        "en": "dynasty",
        "ko": "왕조, 시대",
        "ipa": "[dáinəsti]"
      },
      {
        "en": "reign",
        "ko": "통치 기간, 군림하다",
        "ipa": "[réin]"
      },
      {
        "en": "monarch",
        "ko": "군주",
        "ipa": "[mánàːrk]"
      },
      {
        "en": "sovereign",
        "ko": "주권자, 통치자, 주권이 있는",
        "ipa": "[sávrən]"
      },
      {
        "en": "sovereignty",
        "ko": "주권, 통치권",
        "ipa": "[sávrənti]"
      },
      {
        "en": "chronicle",
        "ko": "연대기, 기록하다",
        "ipa": "[kránikəl]"
      },
      {
        "en": "archive",
        "ko": "기록 보관소, 공문서",
        "ipa": "[áːrkàiv]"
      },
      {
        "en": "monument",
        "ko": "기념물, 기념비",
        "ipa": "[mánjuːmənt]"
      },
      {
        "en": "inscribe",
        "ko": "새기다, 쓰다",
        "ipa": "[ìnskráib]"
      },
      {
        "en": "inscription",
        "ko": "비문, 새긴 글",
        "ipa": "[ìnskrípʃən]"
      },
      {
        "en": "heritage",
        "ko": "문화유산",
        "ipa": "[héərətədʒ]"
      },
      {
        "en": "legacy",
        "ko": "유산, 물려받은 것",
        "ipa": "[légəsi]"
      },
      {
        "en": "prehistoric",
        "ko": "선사 시대의",
        "ipa": "[prìːhistɔ́ːrik]"
      },
      {
        "en": "primitive",
        "ko": "원시의, 초기의",
        "ipa": "[prímətiv]"
      }
    ]
  },
  {
    "id": "wm2000_day_42",
    "book": "워드마스터 수능 2000",
    "title": "Day 42",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "diplomacy",
        "ko": "외교, 외교술",
        "ipa": "[diplóuməsi]"
      },
      {
        "en": "diplomat",
        "ko": "외교관",
        "ipa": "[dípləmæ̀t]"
      },
      {
        "en": "diplomatic",
        "ko": "외교의, 수완 있는",
        "ipa": "[dìpləmǽtik]"
      },
      {
        "en": "ambassador",
        "ko": "대사, 특사",
        "ipa": "[æmbǽsədər]"
      },
      {
        "en": "embassy",
        "ko": "대사관",
        "ipa": "[émbəsi]"
      },
      {
        "en": "consulate",
        "ko": "영사관",
        "ipa": "[kánsələt]"
      },
      {
        "en": "envoy",
        "ko": "특사, 사절",
        "ipa": "[énvɔi]"
      },
      {
        "en": "negotiator",
        "ko": "협상가",
        "ipa": "[nəgóuʃièitər]"
      },
      {
        "en": "bilateral",
        "ko": "양국의, 쌍방의",
        "ipa": "[bailǽtərəl]"
      },
      {
        "en": "multilateral",
        "ko": "다국간의, 다자간의",
        "ipa": "[mʌ̀ltilǽtərəl]"
      },
      {
        "en": "accord",
        "ko": "협정, 합의, 부여하다",
        "ipa": "[əkɔ́ːrd]"
      },
      {
        "en": "alliance",
        "ko": "동맹, 연합",
        "ipa": "[əláiəns]"
      },
      {
        "en": "coalition",
        "ko": "연립 정부, 연합",
        "ipa": "[kòuəlíʃən]"
      },
      {
        "en": "summit",
        "ko": "정상회담, 정상, 꼭대기",
        "ipa": "[sʌ́mət]"
      },
      {
        "en": "convention",
        "ko": "관례, 협약, 총회",
        "ipa": "[kənvénʃən]"
      },
      {
        "en": "treaty",
        "ko": "조약",
        "ipa": "[tríːti]"
      },
      {
        "en": "ratify",
        "ko": "비준하다, 승인하다",
        "ipa": "[rǽtəfài]"
      },
      {
        "en": "ratification",
        "ko": "비준, 승인",
        "ipa": "[ræ̀təfəkéiʃən]"
      },
      {
        "en": "sanction",
        "ko": "제재, 인가, 허가하다",
        "ipa": "[sǽŋkʃən]"
      },
      {
        "en": "embargo",
        "ko": "통상 금지령, 금수 조치",
        "ipa": "[embáːrgou]"
      },
      {
        "en": "boycott",
        "ko": "불매 운동을 벌이다",
        "ipa": "[bɔ́ikàt]"
      },
      {
        "en": "neutrality",
        "ko": "중립, 중립성",
        "ipa": "[nuːtrǽləti]"
      },
      {
        "en": "neutral",
        "ko": "중립의",
        "ipa": "[núːtrəl]"
      },
      {
        "en": "nonalignment",
        "ko": "비동맹",
        "ipa": "[nànáláinmənt]"
      },
      {
        "en": "hegemony",
        "ko": "패권, 주도권",
        "ipa": "[hidʒéməni]"
      },
      {
        "en": "superpower",
        "ko": "초강대국",
        "ipa": "[sùːpərpáuər]"
      },
      {
        "en": "sovereignty",
        "ko": "주권, 자주권",
        "ipa": "[sávrənti]"
      },
      {
        "en": "autonomy",
        "ko": "자치권, 자율성",
        "ipa": "[ɔtánəmi]"
      },
      {
        "en": "autonomous",
        "ko": "자치의, 자율적인",
        "ipa": "[ɔtánəməs]"
      },
      {
        "en": "regime",
        "ko": "정권, 제도",
        "ipa": "[rəʒíːm]"
      },
      {
        "en": "administration",
        "ko": "행정부, 관리",
        "ipa": "[ædmìnistréiʃən]"
      },
      {
        "en": "bureaucracy",
        "ko": "관료제, 관료주의",
        "ipa": "[bjuərákrəsi]"
      },
      {
        "en": "bureaucrat",
        "ko": "관료",
        "ipa": "[bjúərəkræ̀t]"
      },
      {
        "en": "corrupt",
        "ko": "부패한, 부패시키다",
        "ipa": "[kərʌ́pt]"
      },
      {
        "en": "corruption",
        "ko": "부패, 비리",
        "ipa": "[kərʌ́pʃən]"
      },
      {
        "en": "bribe",
        "ko": "뇌물, 뇌물을 주다",
        "ipa": "[bráib]"
      },
      {
        "en": "bribery",
        "ko": "뇌물 수수",
        "ipa": "[bráibəri]"
      },
      {
        "en": "transparency",
        "ko": "투명성, 명백함",
        "ipa": "[trænspéərənsi]"
      },
      {
        "en": "transparent",
        "ko": "투명한, 명백한",
        "ipa": "[trænspéərənt]"
      },
      {
        "en": "accountability",
        "ko": "책임, 의무",
        "ipa": "[əkáuntəbìliti]"
      }
    ]
  },
  {
    "id": "wm2000_day_43",
    "book": "워드마스터 수능 2000",
    "title": "Day 43",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "infancy",
        "ko": "유아기, 초기",
        "ipa": "[ínfənsi]"
      },
      {
        "en": "infant",
        "ko": "유아, 젖먹이",
        "ipa": "[ínfənt]"
      },
      {
        "en": "toddler",
        "ko": "걸음마를 배우는 아이",
        "ipa": "[tádlər]"
      },
      {
        "en": "childhood",
        "ko": "유년기, 어린 시절",
        "ipa": "[tʃáildhùd]"
      },
      {
        "en": "adolescence",
        "ko": "청소년기, 사춘기",
        "ipa": "[æ̀dəlésəns]"
      },
      {
        "en": "adolescent",
        "ko": "청소년",
        "ipa": "[æ̀dəlésənt]"
      },
      {
        "en": "puberty",
        "ko": "사춘기",
        "ipa": "[pjúːbərti]"
      },
      {
        "en": "youth",
        "ko": "젊음, 청년",
        "ipa": "[júːθ]"
      },
      {
        "en": "juvenile",
        "ko": "청소년의, 유치한",
        "ipa": "[dʒúːvənəl]"
      },
      {
        "en": "adulthood",
        "ko": "성인기, 성인임",
        "ipa": "[ədʌ́lthùd]"
      },
      {
        "en": "adult",
        "ko": "성인, 성숙한",
        "ipa": "[ədʌ́lt]"
      },
      {
        "en": "mature",
        "ko": "성숙한, 익다",
        "ipa": "[mətʃúər]"
      },
      {
        "en": "maturity",
        "ko": "성숙, 만기",
        "ipa": "[mətʃúərəti]"
      },
      {
        "en": "immature",
        "ko": "미성숙한",
        "ipa": "[ìmətjúər]"
      },
      {
        "en": "aging",
        "ko": "노화, 나이 먹음",
        "ipa": "[éidʒiŋ]"
      },
      {
        "en": "elderly",
        "ko": "나이 든, 어르신",
        "ipa": "[éldərli]"
      },
      {
        "en": "senior",
        "ko": "고령자, 선배, 고위의",
        "ipa": "[síːnjər]"
      },
      {
        "en": "longevity",
        "ko": "장수, 수명",
        "ipa": "[lɔndʒévəti]"
      },
      {
        "en": "lifespan",
        "ko": "수명, 생존 기간",
        "ipa": "[láifspæ̀n]"
      },
      {
        "en": "life expectancy",
        "ko": "기대 수명",
        "ipa": "[láif ikspéktənsi]"
      },
      {
        "en": "retiree",
        "ko": "퇴직자, 은퇴자",
        "ipa": "[ritáiríː]"
      },
      {
        "en": "senile",
        "ko": "노망든, 노쇠한",
        "ipa": "[síːnàil]"
      },
      {
        "en": "dementia",
        "ko": "치매",
        "ipa": "[diménʃiə]"
      },
      {
        "en": "cognitive decline",
        "ko": "인지 저하",
        "ipa": "[kágnitiv dikláin]"
      },
      {
        "en": "developmental",
        "ko": "발달의, 발달상의",
        "ipa": "[divèləpméntəl]"
      },
      {
        "en": "milestone",
        "ko": "중요한 이정표, 획기적 사건",
        "ipa": "[máilstòun]"
      },
      {
        "en": "nurture",
        "ko": "양육하다, 보살피다",
        "ipa": "[nə́ːrtʃər]"
      },
      {
        "en": "foster",
        "ko": "양육하다, 촉진하다",
        "ipa": "[fástər]"
      },
      {
        "en": "parenting",
        "ko": "육아, 부모 노릇",
        "ipa": "[péərəntiŋ]"
      },
      {
        "en": "upbringing",
        "ko": "양육, 훈육",
        "ipa": "[ʌ́pbrìŋiŋ]"
      },
      {
        "en": "socialization",
        "ko": "사회화",
        "ipa": "[sòuʃəlizéiʃən]"
      },
      {
        "en": "peer pressure",
        "ko": "또래 압력",
        "ipa": "[píər préʃər]"
      },
      {
        "en": "identity",
        "ko": "정체성, 신원",
        "ipa": "[aidéntitìː]"
      },
      {
        "en": "individuality",
        "ko": "개성, 개별성",
        "ipa": "[ìndìvidʒuːǽliti]"
      },
      {
        "en": "role model",
        "ko": "본보기가 되는 사람",
        "ipa": "[róul mádəl]"
      },
      {
        "en": "generation gap",
        "ko": "세대 차이",
        "ipa": "[dʒènəréiʃən gǽp]"
      },
      {
        "en": "filial",
        "ko": "자식의, 효성스러운",
        "ipa": "[fíliəl]"
      },
      {
        "en": "ancestral",
        "ko": "조상의, 선조의",
        "ipa": "[ænséstrəl]"
      },
      {
        "en": "kinship",
        "ko": "친족 관계, 유대감",
        "ipa": "[kínʃìp]"
      },
      {
        "en": "descendant",
        "ko": "자손, 후예",
        "ipa": "[diséndənt]"
      }
    ]
  },
  {
    "id": "wm2000_day_44",
    "book": "워드마스터 수능 2000",
    "title": "Day 44",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "artificial intelligence",
        "ko": "인공지능",
        "ipa": "[àːrtəfíʃəl ìntélədʒəns]"
      },
      {
        "en": "machine learning",
        "ko": "기계 학습, 머신러닝",
        "ipa": "[məʃíːn lə́ːrniŋ]"
      },
      {
        "en": "neural network",
        "ko": "신경망",
        "ipa": "[núərəl nétwə̀ːrk]"
      },
      {
        "en": "algorithm",
        "ko": "알고리즘",
        "ipa": "[ǽlgərìðəm]"
      },
      {
        "en": "robotics",
        "ko": "로봇공학",
        "ipa": "[ròubátiks]"
      },
      {
        "en": "robot",
        "ko": "로봇",
        "ipa": "[róubàt]"
      },
      {
        "en": "autonomous",
        "ko": "자율적인, 자율 주행의",
        "ipa": "[ɔtánəməs]"
      },
      {
        "en": "automation",
        "ko": "자동화",
        "ipa": "[ɔtəméiʃən]"
      },
      {
        "en": "automate",
        "ko": "자동화하다",
        "ipa": "[ɔ́ːtəmèit]"
      },
      {
        "en": "sensor",
        "ko": "센서, 감지기",
        "ipa": "[sénsər]"
      },
      {
        "en": "actuator",
        "ko": "작동기, 구동 장치",
        "ipa": "[ǽktjuːèitər]"
      },
      {
        "en": "nanotechnology",
        "ko": "나노기술",
        "ipa": "[næ̀noutèknálədʒìː]"
      },
      {
        "en": "biotechnology",
        "ko": "생명공학",
        "ipa": "[bàioutèknálədʒi]"
      },
      {
        "en": "genetic engineering",
        "ko": "유전공학",
        "ipa": "[dʒənétik éndʒəníəriŋ]"
      },
      {
        "en": "virtual reality",
        "ko": "가상현실",
        "ipa": "[və́ːrtʃuːəl rìːǽlətìː]"
      },
      {
        "en": "augmented reality",
        "ko": "증강현실",
        "ipa": "[agméntid rìːǽlətìː]"
      },
      {
        "en": "cyberspace",
        "ko": "가상공간, 사이버공간",
        "ipa": "[sáibərspèis]"
      },
      {
        "en": "quantum",
        "ko": "양자, 양자의",
        "ipa": "[kwántəm]"
      },
      {
        "en": "computation",
        "ko": "계산, 연산",
        "ipa": "[kàmpjətéiʃən]"
      },
      {
        "en": "cloud computing",
        "ko": "클라우드 컴퓨팅",
        "ipa": "[kláud kəmpjúːtiŋ]"
      },
      {
        "en": "big data",
        "ko": "빅데이터",
        "ipa": "[bíg déitə]"
      },
      {
        "en": "data mining",
        "ko": "데이터 마이닝, 정보 추출",
        "ipa": "[déitə máiniŋ]"
      },
      {
        "en": "predictive",
        "ko": "예측의, 예언하는",
        "ipa": "[pridíktiv]"
      },
      {
        "en": "simulation",
        "ko": "시뮬레이션, 모의실험",
        "ipa": "[sìmjəléiʃən]"
      },
      {
        "en": "simulate",
        "ko": "모의실험을 하다",
        "ipa": "[símjələt]"
      },
      {
        "en": "prototype",
        "ko": "시제품, 견본",
        "ipa": "[próutətàip]"
      },
      {
        "en": "disruptive",
        "ko": "파괴적인, 혁신적인",
        "ipa": "[disrʌ́ptiv]"
      },
      {
        "en": "breakthrough",
        "ko": "비약적 발전, 돌파구",
        "ipa": "[bréikθrùː]"
      },
      {
        "en": "frontier",
        "ko": "최첨단 영역, 국경",
        "ipa": "[frəntíər]"
      },
      {
        "en": "cutting-edge",
        "ko": "최첨단의",
        "ipa": "[kʌ́tiŋèdʒ]"
      },
      {
        "en": "state-of-the-art",
        "ko": "최신식의, 최고 수준의",
        "ipa": "[stèitəvðiáːrt]"
      },
      {
        "en": "obsolete",
        "ko": "더 이상 쓸모없는, 구식의",
        "ipa": "[ábsəlìːt]"
      },
      {
        "en": "outdated",
        "ko": "구식의, 시대에 뒤떨어진",
        "ipa": "[áutdèitid]"
      },
      {
        "en": "upgrade",
        "ko": "업그레이드하다, 향상시키다",
        "ipa": "[əpgréid]"
      },
      {
        "en": "downgrade",
        "ko": "격하시키다",
        "ipa": "[dáungréid]"
      },
      {
        "en": "compatible",
        "ko": "호환되는, 양립할 수 있는",
        "ipa": "[kəmpǽtəbəl]"
      },
      {
        "en": "compatibility",
        "ko": "호환성, 융합성",
        "ipa": "[kəmpæ̀təbílətìː]"
      },
      {
        "en": "telecommunication",
        "ko": "원격 통신",
        "ipa": "[tèləkəmjùːnikéiʃən]"
      },
      {
        "en": "broadband",
        "ko": "광대역 통신망",
        "ipa": "[brɔ́ːdbæ̀nd]"
      },
      {
        "en": "bandwidth",
        "ko": "대역폭, 처리 용량",
        "ipa": "[bǽndwidθ]"
      }
    ]
  },
  {
    "id": "wm2000_day_45",
    "book": "워드마스터 수능 2000",
    "title": "Day 45",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "fiction",
        "ko": "소설, 허구",
        "ipa": "[fíkʃən]"
      },
      {
        "en": "fictional",
        "ko": "허구의, 가상의",
        "ipa": "[fíkʃənəl]"
      },
      {
        "en": "nonfiction",
        "ko": "논픽션, 비소설",
        "ipa": "[nanfíkʃən]"
      },
      {
        "en": "novel",
        "ko": "소설, 참신한",
        "ipa": "[návəl]"
      },
      {
        "en": "novelist",
        "ko": "소설가",
        "ipa": "[návələst]"
      },
      {
        "en": "poetry",
        "ko": "시, 시가",
        "ipa": "[póuətri]"
      },
      {
        "en": "poem",
        "ko": "시 (개별 작품)",
        "ipa": "[póuəm]"
      },
      {
        "en": "poet",
        "ko": "시인",
        "ipa": "[póuət]"
      },
      {
        "en": "poetic",
        "ko": "시적인",
        "ipa": "[pouétik]"
      },
      {
        "en": "prose",
        "ko": "산문, 산문체",
        "ipa": "[próuz]"
      },
      {
        "en": "drama",
        "ko": "희곡, 드라마",
        "ipa": "[drámə]"
      },
      {
        "en": "dramatic",
        "ko": "극적인, 연극의",
        "ipa": "[drəmǽtik]"
      },
      {
        "en": "playwright",
        "ko": "극작가",
        "ipa": "[pléiràit]"
      },
      {
        "en": "tragedy",
        "ko": "비극, 비극적 사건",
        "ipa": "[trǽdʒədi]"
      },
      {
        "en": "tragic",
        "ko": "비극적인",
        "ipa": "[trǽdʒik]"
      },
      {
        "en": "comedy",
        "ko": "희극, 코미디",
        "ipa": "[kámədi]"
      },
      {
        "en": "comic",
        "ko": "희극의, 만화",
        "ipa": "[kámik]"
      },
      {
        "en": "satire",
        "ko": "풍자",
        "ipa": "[sǽtàiər]"
      },
      {
        "en": "satirical",
        "ko": "풍자적인",
        "ipa": "[sətíərəkəl]"
      },
      {
        "en": "irony",
        "ko": "아이러니, 반어법",
        "ipa": "[áirəni]"
      },
      {
        "en": "protagonist",
        "ko": "주인공",
        "ipa": "[proutǽgənəst]"
      },
      {
        "en": "antagonist",
        "ko": "적대자, 악역",
        "ipa": "[æntǽgənəst]"
      },
      {
        "en": "plot",
        "ko": "줄거리, 구성, 음모",
        "ipa": "[plát]"
      },
      {
        "en": "climax",
        "ko": "절정, 클라이맥스",
        "ipa": "[kláimæ̀ks]"
      },
      {
        "en": "theme",
        "ko": "주제, 테마",
        "ipa": "[θíːm]"
      },
      {
        "en": "motif",
        "ko": "동기, 모티프, 문양",
        "ipa": "[moutíːf]"
      },
      {
        "en": "symbolism",
        "ko": "상징적 의미, 상징주의",
        "ipa": "[símbəlìzəm]"
      },
      {
        "en": "allusion",
        "ko": "암시, 인용",
        "ipa": "[əlúːʒən]"
      },
      {
        "en": "foreshadow",
        "ko": "복선을 깔다, 암시하다",
        "ipa": "[fɔrʃǽdou]"
      },
      {
        "en": "flashback",
        "ko": "회상 장면, 플래시백",
        "ipa": "[flǽʃbæ̀k]"
      },
      {
        "en": "narrator",
        "ko": "서술자, 해설자",
        "ipa": "[néəreitər]"
      },
      {
        "en": "perspective",
        "ko": "시점, 관점, 원근법",
        "ipa": "[pərspéktiv]"
      },
      {
        "en": "first-person",
        "ko": "1인칭의",
        "ipa": "[fə́ːrst-pə́ːrsən]"
      },
      {
        "en": "omniscient",
        "ko": "전지전능한, 모든 것을 아는",
        "ipa": "[amníʃənt]"
      },
      {
        "en": "setting",
        "ko": "배경, 설정",
        "ipa": "[sétiŋ]"
      },
      {
        "en": "dialogue",
        "ko": "대화",
        "ipa": "[dáiəlɔ̀ːg]"
      },
      {
        "en": "monologue",
        "ko": "독백",
        "ipa": "[mánəlɔ̀ːg]"
      },
      {
        "en": "soliloquy",
        "ko": "독백",
        "ipa": "[səlíləkwi]"
      },
      {
        "en": "aesthetic",
        "ko": "미적인, 심미적인",
        "ipa": "[esθétik]"
      },
      {
        "en": "criticism",
        "ko": "비평, 비판",
        "ipa": "[krítisìzəm]"
      }
    ]
  },
  {
    "id": "wm2000_day_46",
    "book": "워드마스터 수능 2000",
    "title": "Day 46",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "bias",
        "ko": "편향, 치우침",
        "ipa": "[báiəs]"
      },
      {
        "en": "prejudice",
        "ko": "선입견, 편견",
        "ipa": "[prédʒədis]"
      },
      {
        "en": "stereotype",
        "ko": "고정관념",
        "ipa": "[stéəriətàip]"
      },
      {
        "en": "cognitive dissonance",
        "ko": "인지 부조화",
        "ipa": "[kágnitiv dísənəns]"
      },
      {
        "en": "confirmation bias",
        "ko": "확증 편향",
        "ipa": "[kànfərméiʃən báiəs]"
      },
      {
        "en": "heuristic",
        "ko": "어림셈, 발견적 교수법",
        "ipa": "[hjuərístik]"
      },
      {
        "en": "fallacy",
        "ko": "오류, 그릇된 논리",
        "ipa": "[fǽləsi]"
      },
      {
        "en": "rationalize",
        "ko": "합리화하다",
        "ipa": "[rǽʃənəlàiz]"
      },
      {
        "en": "rationalization",
        "ko": "합리화",
        "ipa": "[ræ̀ʃənəlizéiʃən]"
      },
      {
        "en": "justification",
        "ko": "정당화, 변명",
        "ipa": "[dʒʌ̀stəfəkéiʃən]"
      },
      {
        "en": "justify",
        "ko": "정당화하다",
        "ipa": "[dʒʌ́stəfài]"
      },
      {
        "en": "subjective",
        "ko": "주관적인",
        "ipa": "[səbdʒéktiv]"
      },
      {
        "en": "subjectivity",
        "ko": "주관성",
        "ipa": "[səbdʒektíviti]"
      },
      {
        "en": "objective",
        "ko": "객관적인, 목표",
        "ipa": "[əbdʒéktiv]"
      },
      {
        "en": "objectivity",
        "ko": "객관성",
        "ipa": "[àbdʒektíviti]"
      },
      {
        "en": "illusion",
        "ko": "착각, 환상",
        "ipa": "[ìlúːʒən]"
      },
      {
        "en": "delusion",
        "ko": "망상, 착각",
        "ipa": "[dilúːʒən]"
      },
      {
        "en": "hallucination",
        "ko": "환각, 환영",
        "ipa": "[həlùːsənéiʃən]"
      },
      {
        "en": "deception",
        "ko": "속임수, 사기",
        "ipa": "[disépʃən]"
      },
      {
        "en": "deceive",
        "ko": "속이다, 기만하다",
        "ipa": "[disíːv]"
      },
      {
        "en": "fallible",
        "ko": "실수를 저지르기 쉬운",
        "ipa": "[fǽləbəl]"
      },
      {
        "en": "infallible",
        "ko": "결코 틀리지 않는",
        "ipa": "[ìnfǽləbəl]"
      },
      {
        "en": "judgment",
        "ko": "판단, 판결",
        "ipa": "[dʒʌ́dʒmənt]"
      },
      {
        "en": "misjudge",
        "ko": "잘못 판단하다",
        "ipa": "[misdʒʌ́dʒ]"
      },
      {
        "en": "overestimate",
        "ko": "과대평가하다",
        "ipa": "[òuvəréstəmèit]"
      },
      {
        "en": "underestimate",
        "ko": "과소평가하다",
        "ipa": "[ʌ́ndəréstəmèit]"
      },
      {
        "en": "perspective",
        "ko": "시각, 견해",
        "ipa": "[pərspéktiv]"
      },
      {
        "en": "standpoint",
        "ko": "견지, 관점",
        "ipa": "[stǽndpɔ̀int]"
      },
      {
        "en": "viewpoint",
        "ko": "관점, 시각",
        "ipa": "[vjúːpɔ̀int]"
      },
      {
        "en": "worldview",
        "ko": "세계관",
        "ipa": "[wə́ːrldvjùː]"
      },
      {
        "en": "paradigm",
        "ko": "패러다임, 전형적인 예",
        "ipa": "[péərədàim]"
      },
      {
        "en": "dogma",
        "ko": "교조, 독단",
        "ipa": "[dágmə]"
      },
      {
        "en": "dogmatic",
        "ko": "독단적인",
        "ipa": "[dagmǽtik]"
      },
      {
        "en": "orthodox",
        "ko": "정통의, 정설의",
        "ipa": "[ɔ́ːrθədàks]"
      },
      {
        "en": "unorthodox",
        "ko": "이단의, 파격적인",
        "ipa": "[ənɔ́ːrθədàks]"
      },
      {
        "en": "skeptic",
        "ko": "회의론자",
        "ipa": "[sképtik]"
      },
      {
        "en": "skepticism",
        "ko": "회의론, 의심",
        "ipa": "[sképtisìzəm]"
      },
      {
        "en": "cynic",
        "ko": "냉소적인 사람",
        "ipa": "[sínik]"
      },
      {
        "en": "cynicism",
        "ko": "냉소주의",
        "ipa": "[sínisìzəm]"
      },
      {
        "en": "pragmatic",
        "ko": "실용적인, 실무적인",
        "ipa": "[prægmǽtik]"
      }
    ]
  },
  {
    "id": "wm2000_day_47",
    "book": "워드마스터 수능 2000",
    "title": "Day 47",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "urbanization",
        "ko": "도시화",
        "ipa": "[ə̀ːrbənəzéiʃən]"
      },
      {
        "en": "demography",
        "ko": "인구통계학",
        "ipa": "[dimágrəfi]"
      },
      {
        "en": "demographic",
        "ko": "인구통계학의",
        "ipa": "[dèməgrǽfik]"
      },
      {
        "en": "population",
        "ko": "인구, 주민",
        "ipa": "[pàpjəléiʃən]"
      },
      {
        "en": "density",
        "ko": "밀도",
        "ipa": "[dénsəti]"
      },
      {
        "en": "overcrowding",
        "ko": "과밀, 과밀화",
        "ipa": "[óuvərkràudiŋ]"
      },
      {
        "en": "congestion",
        "ko": "혼잡, 정체",
        "ipa": "[kəndʒéstʃən]"
      },
      {
        "en": "slum",
        "ko": "빈민가, 슬럼",
        "ipa": "[slʌ́m]"
      },
      {
        "en": "gentrification",
        "ko": "젠트리피케이션, 도시 재활성화",
        "ipa": "[dʒèntrifikéiʃən]"
      },
      {
        "en": "redevelopment",
        "ko": "재개발",
        "ipa": "[rìːdivéləpmənt]"
      },
      {
        "en": "revitalization",
        "ko": "재활성화, 부흥",
        "ipa": "[rìːvàitələzéiʃən]"
      },
      {
        "en": "infrastructure",
        "ko": "기반시설",
        "ipa": "[ìnfrəstrʌ́ktʃər]"
      },
      {
        "en": "sanitation",
        "ko": "공중위생, 하수 시설",
        "ipa": "[sæ̀nətéiʃən]"
      },
      {
        "en": "sewage",
        "ko": "하수, 오수",
        "ipa": "[súːədʒ]"
      },
      {
        "en": "drainage",
        "ko": "배수 시설",
        "ipa": "[dréinədʒ]"
      },
      {
        "en": "public transport",
        "ko": "대중교통",
        "ipa": "[pʌ́blik trænspɔ́ːrt]"
      },
      {
        "en": "commuter",
        "ko": "통근자",
        "ipa": "[kəmjúːtər]"
      },
      {
        "en": "suburbia",
        "ko": "교외, 교외 주민들",
        "ipa": "[səbə́ːrbiə]"
      },
      {
        "en": "sprawl",
        "ko": "무질서한 팽창, 뻗어나가다",
        "ipa": "[sprɔ́ːl]"
      },
      {
        "en": "megalopolis",
        "ko": "거대 도시권",
        "ipa": "[mègəlápələs]"
      },
      {
        "en": "metropolis",
        "ko": "주요 도시, 대도시",
        "ipa": "[mətrápələs]"
      },
      {
        "en": "provincial",
        "ko": "지방의, 편협한",
        "ipa": "[prəvínʃəl]"
      },
      {
        "en": "hinterland",
        "ko": "배후지, 오지",
        "ipa": "[híntərlæ̀nd]"
      },
      {
        "en": "zoning",
        "ko": "용도 지역 지정",
        "ipa": "[zóuniŋ]"
      },
      {
        "en": "ordinance",
        "ko": "조례, 법령",
        "ipa": "[ɔ́ːrdənəns]"
      },
      {
        "en": "civic",
        "ko": "시민의, 시의",
        "ipa": "[sívik]"
      },
      {
        "en": "municipal",
        "ko": "지방자치의, 시의",
        "ipa": "[mjuːnísəpəl]"
      },
      {
        "en": "municipality",
        "ko": "지방자치단체",
        "ipa": "[mjùːnisəpǽləti]"
      },
      {
        "en": "amenity",
        "ko": "생활 편의 시설",
        "ipa": "[əménəti]"
      },
      {
        "en": "accessibility",
        "ko": "접근성",
        "ipa": "[æ̀ksesəbíliti]"
      },
      {
        "en": "livability",
        "ko": "거주 적합성",
        "ipa": "[lìvəbíləti]"
      },
      {
        "en": "walkability",
        "ko": "보행 편의성",
        "ipa": "[wɔ̀ːkəbíləti]"
      },
      {
        "en": "footpath",
        "ko": "보도, 오솔길",
        "ipa": "[fútpæ̀θ]"
      },
      {
        "en": "pedestrian zone",
        "ko": "보행자 전용 구역",
        "ipa": "[pədéstriən zóun]"
      },
      {
        "en": "green space",
        "ko": "녹지 공간",
        "ipa": "[gríːn spéis]"
      },
      {
        "en": "parkland",
        "ko": "공원 부지",
        "ipa": "[páːrklæ̀nd]"
      },
      {
        "en": "civic center",
        "ko": "시민 센터",
        "ipa": "[sívik séntər]"
      },
      {
        "en": "waterfront",
        "ko": "수변 지역, 해안가",
        "ipa": "[wɔ́ːtərfrʌ̀nt]"
      },
      {
        "en": "skyline",
        "ko": "스카이라인, 공중선",
        "ipa": "[skáilàin]"
      },
      {
        "en": "landmark",
        "ko": "주요 지형지물, 랜드마크",
        "ipa": "[lǽndmàːrk]"
      }
    ]
  },
  {
    "id": "wm2000_day_48",
    "book": "워드마스터 수능 2000",
    "title": "Day 48",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "corporate governance",
        "ko": "기업 지배구조",
        "ipa": "[kɔ́ːrpərət gʌ́vərnəns]"
      },
      {
        "en": "stakeholder",
        "ko": "이해관계자",
        "ipa": "[stéikhòuldər]"
      },
      {
        "en": "shareholder",
        "ko": "주주",
        "ipa": "[ʃéərhòuldər]"
      },
      {
        "en": "stockholder",
        "ko": "주주",
        "ipa": "[stákhòuldər]"
      },
      {
        "en": "dividend",
        "ko": "배당금",
        "ipa": "[dívidènd]"
      },
      {
        "en": "board of directors",
        "ko": "이사회",
        "ipa": "[bɔ́ːrd ʌ́v dəréktərz]"
      },
      {
        "en": "audit",
        "ko": "회계 감사, 심사하다",
        "ipa": "[ɔ́ːdit]"
      },
      {
        "en": "auditor",
        "ko": "회계 감사관",
        "ipa": "[ɔ́ːditər]"
      },
      {
        "en": "compliance",
        "ko": "준법 감시, 규정 준수",
        "ipa": "[kəmpláiəns]"
      },
      {
        "en": "whistleblower",
        "ko": "내부고발자",
        "ipa": "[wísəlblòuər]"
      },
      {
        "en": "fraud",
        "ko": "사기, 사기꾼",
        "ipa": "[frɔ́ːd]"
      },
      {
        "en": "embezzlement",
        "ko": "횡령, 착복",
        "ipa": "[embézəlmənt]"
      },
      {
        "en": "embezzle",
        "ko": "횡령하다",
        "ipa": "[imbézəl]"
      },
      {
        "en": "bribery",
        "ko": "뇌물 수수",
        "ipa": "[bráibəri]"
      },
      {
        "en": "monopoly",
        "ko": "독점",
        "ipa": "[mənápəli]"
      },
      {
        "en": "antitrust",
        "ko": "독점 금지의",
        "ipa": "[æ̀ntaitrʌ́st]"
      },
      {
        "en": "fair trade",
        "ko": "공정 무역",
        "ipa": "[féər tréid]"
      },
      {
        "en": "philanthropy",
        "ko": "자선 활동, 박애",
        "ipa": "[filǽnθrəpi]"
      },
      {
        "en": "philanthropist",
        "ko": "자선가",
        "ipa": "[fəlǽnθrəpəst]"
      },
      {
        "en": "charity",
        "ko": "자선 단체, 자비",
        "ipa": "[tʃéəriti]"
      },
      {
        "en": "donation",
        "ko": "기부, 기증",
        "ipa": "[dounéiʃən]"
      },
      {
        "en": "donate",
        "ko": "기부하다",
        "ipa": "[dóunèit]"
      },
      {
        "en": "nonprofit",
        "ko": "비영리의, 비영리 단체",
        "ipa": "[nanpráfət]"
      },
      {
        "en": "foundation",
        "ko": "재단",
        "ipa": "[faundéiʃən]"
      },
      {
        "en": "corporate citizenship",
        "ko": "기업 시민의식",
        "ipa": "[kɔ́ːrpərət sítizənʃìp]"
      },
      {
        "en": "sweatshop",
        "ko": "착취 공장",
        "ipa": "[swétʃàp]"
      },
      {
        "en": "fair wage",
        "ko": "공정 임금",
        "ipa": "[féər wéidʒ]"
      },
      {
        "en": "work-life balance",
        "ko": "일과 삶의 균형",
        "ipa": "[wə́ːrk-láif bǽləns]"
      },
      {
        "en": "maternity leave",
        "ko": "출산 휴가",
        "ipa": "[mətə́ːrniti líːv]"
      },
      {
        "en": "paternity leave",
        "ko": "육아 휴직",
        "ipa": "[pətə́ːrniti líːv]"
      },
      {
        "en": "harassment",
        "ko": "괴롭힘, 희롱",
        "ipa": "[hərǽsmənt]"
      },
      {
        "en": "workplace safety",
        "ko": "직장 안전",
        "ipa": "[wə́ːrkplèis séifti]"
      },
      {
        "en": "ergonomics",
        "ko": "인간공학",
        "ipa": "[ə̀ːrgənámiks]"
      },
      {
        "en": "ergonomic",
        "ko": "인간공학적인",
        "ipa": "[ə̀ːrgənámik]"
      },
      {
        "en": "job security",
        "ko": "고용 안정성",
        "ipa": "[dʒáb sikjúərəti]"
      },
      {
        "en": "turnover rate",
        "ko": "이직률",
        "ipa": "[tə́ːrnòuvər réit]"
      },
      {
        "en": "absenteeism",
        "ko": "잦은 결근",
        "ipa": "[æ̀bsəntíːizəm]"
      },
      {
        "en": "morale",
        "ko": "사기, 의욕",
        "ipa": "[mərǽl]"
      },
      {
        "en": "synergy",
        "ko": "상승 효과, 시너지",
        "ipa": "[sínərdʒi]"
      },
      {
        "en": "core competency",
        "ko": "핵심 역량",
        "ipa": "[kɔ́ːr kámpətinsi]"
      }
    ]
  },
  {
    "id": "wm2000_day_49",
    "book": "워드마스터 수능 2000",
    "title": "Day 49",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "biodiversity",
        "ko": "생물다양성",
        "ipa": "[bàioudaivə́ːrsəti]"
      },
      {
        "en": "biome",
        "ko": "생물군계",
        "ipa": "[báiòum]"
      },
      {
        "en": "flora",
        "ko": "식물군",
        "ipa": "[flɔ́ːrə]"
      },
      {
        "en": "fauna",
        "ko": "동물군",
        "ipa": "[fɔ́ːnə]"
      },
      {
        "en": "indigenous",
        "ko": "토착의, 고유한",
        "ipa": "[ìndídʒənəs]"
      },
      {
        "en": "native",
        "ko": "토착의, 원주민",
        "ipa": "[néitiv]"
      },
      {
        "en": "invasive species",
        "ko": "외래 침입종",
        "ipa": "[ìnvéisiv spíːʃiz]"
      },
      {
        "en": "ecological niche",
        "ko": "생태적 지위",
        "ipa": "[ikəládʒikəl nítʃ]"
      },
      {
        "en": "food chain",
        "ko": "먹이 사슬",
        "ipa": "[fúːd tʃéin]"
      },
      {
        "en": "food web",
        "ko": "먹이 그물",
        "ipa": "[fúːd wéb]"
      },
      {
        "en": "trophic level",
        "ko": "영양 단계",
        "ipa": "[tróufik lévəl]"
      },
      {
        "en": "predator",
        "ko": "포식자",
        "ipa": "[prédətər]"
      },
      {
        "en": "prey",
        "ko": "먹이, 사냥감",
        "ipa": "[préi]"
      },
      {
        "en": "predation",
        "ko": "포식, 포식 활동",
        "ipa": "[prədéiʃən]"
      },
      {
        "en": "symbiosis",
        "ko": "공생",
        "ipa": "[sìmbaióusəs]"
      },
      {
        "en": "symbiotic",
        "ko": "공생의",
        "ipa": "[sìmbiátik]"
      },
      {
        "en": "mutualism",
        "ko": "상리공생",
        "ipa": "[mjúːtʃuːʌ̀lìzəm]"
      },
      {
        "en": "parasitism",
        "ko": "기생",
        "ipa": "[pǽrəsàitìzm]"
      },
      {
        "en": "parasite",
        "ko": "기생충, 기생 동물",
        "ipa": "[péərəsàit]"
      },
      {
        "en": "host",
        "ko": "숙주, 주최자",
        "ipa": "[hóust]"
      },
      {
        "en": "clone",
        "ko": "복제 생물, 복제하다",
        "ipa": "[klóun]"
      },
      {
        "en": "cloning",
        "ko": "생물 복제",
        "ipa": "[klóuniŋ]"
      },
      {
        "en": "genetic modification",
        "ko": "유전자 변형",
        "ipa": "[dʒənétik màdəfəkéiʃən]"
      },
      {
        "en": "transgenic",
        "ko": "유전자 이식의",
        "ipa": "[træ̀nzdʒénik]"
      },
      {
        "en": "stem cell",
        "ko": "줄기세포",
        "ipa": "[stém sél]"
      },
      {
        "en": "crispr",
        "ko": "유전자 가위 기술",
        "ipa": "[kríspər]"
      },
      {
        "en": "bioethics",
        "ko": "생명윤리",
        "ipa": "[bàiouéθiks]"
      },
      {
        "en": "in vitro",
        "ko": "시험관 내에서의",
        "ipa": "[in vítrou]"
      },
      {
        "en": "in vivo",
        "ko": "생체 내에서의",
        "ipa": "[in víːvou]"
      },
      {
        "en": "specimen",
        "ko": "표본, 시료",
        "ipa": "[spésəmən]"
      },
      {
        "en": "taxidermy",
        "ko": "박제술",
        "ipa": "[tǽksədə̀ːrmi]"
      },
      {
        "en": "taxonomy",
        "ko": "분류학",
        "ipa": "[tæ̀ksɔ́ːnəmìː]"
      },
      {
        "en": "genus",
        "ko": "속 (생물 분류)",
        "ipa": "[dʒíːnəs]"
      },
      {
        "en": "phylum",
        "ko": "문 (생물 분류)",
        "ipa": "[fáiləm]"
      },
      {
        "en": "kingdom",
        "ko": "계 (생물 분류), 왕국",
        "ipa": "[kíŋdəm]"
      },
      {
        "en": "botany",
        "ko": "식물학",
        "ipa": "[bátəni]"
      },
      {
        "en": "botanist",
        "ko": "식물학자",
        "ipa": "[bátənist]"
      },
      {
        "en": "zoology",
        "ko": "동물학",
        "ipa": "[zouálədʒi]"
      },
      {
        "en": "zoologist",
        "ko": "동물학자",
        "ipa": "[zouálədʒəst]"
      },
      {
        "en": "endangered species",
        "ko": "멸종 위기종",
        "ipa": "[endéindʒərd spíːʃiz]"
      }
    ]
  },
  {
    "id": "wm2000_day_50",
    "book": "워드마스터 수능 2000",
    "title": "Day 50",
    "studentIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "words": [
      {
        "en": "ubiquitous",
        "ko": "어디에나 존재하는, 보편적인",
        "ipa": "[juːbíkwitəs]"
      },
      {
        "en": "ephemeral",
        "ko": "수명이 짧은, 덧없는",
        "ipa": "[ifémərəl]"
      },
      {
        "en": "quintessential",
        "ko": "전형적인, 본질적인",
        "ipa": "[kwìntisénʃəl]"
      },
      {
        "en": "juxtaposition",
        "ko": "병치, 나란히 놓기",
        "ipa": "[dʒʌ̀kstəpəzíʃən]"
      },
      {
        "en": "juxtapose",
        "ko": "나란히 놓다, 병치하다",
        "ipa": "[dʒʌ̀kstəpóuz]"
      },
      {
        "en": "idiosyncrasy",
        "ko": "특이한 성향, 별스러운 점",
        "ipa": "[ìdiousínkrəsìː]"
      },
      {
        "en": "anomalous",
        "ko": "변칙의, 이례적인",
        "ipa": "[ənámələs]"
      },
      {
        "en": "anomaly",
        "ko": "변칙, 예외, 이례",
        "ipa": "[ənáməli]"
      },
      {
        "en": "dichotomy",
        "ko": "이분법, 양분",
        "ipa": "[daikátəmi]"
      },
      {
        "en": "conundrum",
        "ko": "난제, 수수께끼",
        "ipa": "[kənʌ́ndrəm]"
      },
      {
        "en": "paradigm shift",
        "ko": "패러다임의 전환",
        "ipa": "[péərədàim ʃíft]"
      },
      {
        "en": "status quo",
        "ko": "현재의 상태, 현상 유지",
        "ipa": "[stǽtəs kwóu]"
      },
      {
        "en": "pragmatism",
        "ko": "실용주의",
        "ipa": "[prǽgmətìzəm]"
      },
      {
        "en": "existential",
        "ko": "실존주의의, 존재에 관한",
        "ipa": "[ègzìsténʃəl]"
      },
      {
        "en": "subjugate",
        "ko": "굴복시키다, 지배하다",
        "ipa": "[sʌ́bdʒəgèit]"
      },
      {
        "en": "exacerbate",
        "ko": "악화시키다",
        "ipa": "[igzǽsərbèit]"
      },
      {
        "en": "ameliorate",
        "ko": "개선하다, 완화하다",
        "ipa": "[əmíːljərèit]"
      },
      {
        "en": "mitigate",
        "ko": "완화하다, 경감하다",
        "ipa": "[mítəgèit]"
      },
      {
        "en": "proliferation",
        "ko": "급증, 확산",
        "ipa": "[pròulifəréiʃən]"
      },
      {
        "en": "proliferate",
        "ko": "급증하다, 확산되다",
        "ipa": "[proulífərèit]"
      },
      {
        "en": "omnipresent",
        "ko": "편재하는, 어디에나 있는",
        "ipa": "[àmniprézənt]"
      },
      {
        "en": "superfluous",
        "ko": "불필요한, 과잉의",
        "ipa": "[súːpərflwʌ̀s]"
      },
      {
        "en": "counterintuitive",
        "ko": "직관에 반하는",
        "ipa": "[kàuntərintjúːətiv]"
      },
      {
        "en": "pinnacle",
        "ko": "정점, 절정",
        "ipa": "[pínəkəl]"
      },
      {
        "en": "nadir",
        "ko": "최악의 순간, 바닥",
        "ipa": "[néidər]"
      },
      {
        "en": "catalyst",
        "ko": "기폭제, 촉매",
        "ipa": "[kǽtələst]"
      },
      {
        "en": "trajectory",
        "ko": "궤적, 궤도",
        "ipa": "[trədʒéktəri]"
      },
      {
        "en": "zenith",
        "ko": "천정, 절정",
        "ipa": "[zíːnəθ]"
      },
      {
        "en": "precarious",
        "ko": "불안정한, 위태로운",
        "ipa": "[prikéəriəs]"
      },
      {
        "en": "tenuous",
        "ko": "미약한, 극도로 빈약한",
        "ipa": "[ténjəwəs]"
      },
      {
        "en": "resilience",
        "ko": "회복력, 탄력성",
        "ipa": "[rizíliəns]"
      },
      {
        "en": "resilient",
        "ko": "회복력 있는, 탄력 있는",
        "ipa": "[rizíljənt]"
      },
      {
        "en": "heterogeneous",
        "ko": "이질적인, 다양한",
        "ipa": "[hètərədʒíːnjəs]"
      },
      {
        "en": "homogeneous",
        "ko": "동질적인, 균일한",
        "ipa": "[hòumədʒíːniəs]"
      },
      {
        "en": "quintessence",
        "ko": "진수, 본질",
        "ipa": "[kwintésəns]"
      },
      {
        "en": "antithesis",
        "ko": "정반대, 대조",
        "ipa": "[æntíθəsəs]"
      },
      {
        "en": "synthesize",
        "ko": "종합하다, 합성하다",
        "ipa": "[sínθəsàiz]"
      },
      {
        "en": "synthesis",
        "ko": "종합, 합성",
        "ipa": "[sínθəsəs]"
      },
      {
        "en": "culmination",
        "ko": "정점, 최고조",
        "ipa": "[kʌ̀lmənéiʃən]"
      },
      {
        "en": "culminate",
        "ko": "끝을 맺다, 최고조에 달하다",
        "ipa": "[kʌ́lminèit]"
      }
    ]
  }
];
