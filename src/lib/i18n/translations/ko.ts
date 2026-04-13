import type { TranslationKeys } from "./en";

const ko: TranslationKeys = {
  // Navbar
  "nav.home": "홈",
  "nav.translate": "번역",
  "nav.faq": "FAQ",
  "nav.blog": "블로그",
  "nav.about": "소개",
  "nav.startTranslating": "번역 시작",
  "nav.appName": "CartoonTranslator",

  // Footer
  "footer.tagline": "AI 기반 만화 번역 서비스",
  "footer.allRightsReserved": "All rights reserved.",
  "footer.freeToUse": "무료로 이용하세요.",

  // Home page — Hero
  "home.hero.badge": "AI 스마트 번역",
  "home.hero.title1": "모든 만화를",
  "home.hero.title2": "즉시 번역",
  "home.hero.description":
    "AI OCR이 대화를 감지하고 번역하여 말풍선의 텍스트를 원본 스타일에 맞게 자연스럽게 교체합니다. 일본어, 한국어, 중국어를 포함한 35개 이상의 언어를 지원합니다.",
  "home.hero.ctaStart": "무료로 번역 시작",
  "home.hero.ctaHow": "작동 방식 보기",
  "home.hero.previewLabel": "CartoonTranslator — 번역",
  "home.hero.original": "원본",
  "home.hero.translated": "번역",
  "home.hero.previewCaption": "전후 비교 — 스마트 텍스트 교체 미리보기",

  // Home page — How It Works
  "home.howItWorks.badge": "간단한 워크플로우",
  "home.howItWorks.title": "이렇게 작동합니다",
  "home.howItWorks.subtitle": "원본 스캔에서 번역 페이지까지 몇 초 만에 — 별도 설정 불필요.",
  "home.howItWorks.step1.title": "업로드",
  "home.howItWorks.step1.description": "만화 페이지 이미지를 드롭하세요 — JPG, PNG 또는 WebP, 최대 10MB.",
  "home.howItWorks.step2.title": "AI 처리",
  "home.howItWorks.step2.description":
    "OCR이 모든 말풍선을 감지하고 AI가 번역한 후 스마트 인페인팅으로 원본 텍스트를 교체합니다.",
  "home.howItWorks.step3.title": "다운로드",
  "home.howItWorks.step3.description":
    "말풍선 스타일에 맞는 자연스러운 타이포그래피로 번역된 페이지를 즉시 받으세요.",

  // Home page — Features
  "home.features.badge": "필요한 모든 것",
  "home.features.title": "만화 독자를 위해 설계",
  "home.features.subtitle": "만화 번역의 특수성을 처리하는 강력한 기능들.",
  "home.features.f1.title": "일본어 세로 텍스트",
  "home.features.f1.description":
    "전통 만화와 라이트 노벨에서 볼 수 있는 타테구미(세로 쓰기)를 완전히 지원합니다.",
  "home.features.f2.title": "35개 이상 언어",
  "home.features.f2.description":
    "일본어, 한국어, 중국어, 영어, 스페인어, 프랑스어, 독일어 등 다양한 언어 간 번역.",
  "home.features.f3.title": "일괄 업로드",
  "home.features.f3.description":
    "Pro로 한 번에 최대 50페이지를 처리합니다. 챕터를 업로드하고 AI가 알아서 처리하게 하세요.",
  "home.features.f4.title": "스마트 텍스트 교체",
  "home.features.f4.description":
    "AI가 말풍선 색상을 감지하고 텍스트를 자연스럽게 교체합니다 — 단순 흰색 박스가 아닙니다.",
  "home.features.f5.title": "편집 및 재렌더링",
  "home.features.f5.description":
    "내보내기 전에 모든 번역 말풍선을 검토, 수정, 재렌더링할 수 있습니다. 완전한 창의적 제어.",
  "home.features.f6.title": "나란히 비교",
  "home.features.f6.description":
    "원본과 번역 페이지를 함께 보며 정확도를 한눈에 확인하세요.",

  // Home page — Stats
  "home.stats.title": "전 세계 만화 팬들이 신뢰합니다",
  "home.stats.subtitle": "숫자가 말해줍니다.",
  "home.stats.s1.label": "일괄 처리 페이지 (Pro)",
  "home.stats.s2.label": "지원 언어",
  "home.stats.s3.label": "하루 5페이지 무료",
  "home.stats.s4.label": "CJK OCR 정확도",

  // Home page — CTA
  "home.cta.title": "좋아하는 만화를 번역할 준비가 됐나요?",
  "home.cta.subtitle":
    "계정 불필요. 페이지를 업로드하기만 하면 몇 초 안에 자연스러운 번역을 받을 수 있습니다 — 완전 무료.",
  "home.cta.button": "무료로 번역 시작",
  "home.cta.noSignup": "신용카드 불필요 • 회원가입 불필요",

  // Translate page
  "translate.title": "만화 번역기",
  "translate.subtitle": "최대 {max}페이지를 업로드하고 언어를 선택하여 번역 결과를 받으세요.",
  "translate.tab.upload": "업로드",
  "translate.tab.results": "결과",
  "translate.tab.history": "기록",
  "translate.upload.title": "이미지 업로드",
  "translate.upload.description": "JPG, PNG 또는 WEBP — 각 최대 10MB — 최대 {max}페이지",
  "translate.upload.dropzone.title": "이미지를 여기에 드래그 앤 드롭",
  "translate.upload.dropzone.subtitle": "또는 클릭하여 탐색 — 여러 파일을 한 번에 선택",
  "translate.upload.chooseFiles": "파일 선택",
  "translate.upload.pagesUploaded": "{count}페이지 업로드됨",
  "translate.upload.pagesUploadedPlural": "{count}페이지 업로드됨",
  "translate.upload.clearAll": "모두 지우기",
  "translate.languages.title": "언어",
  "translate.languages.description": "{count}개 이상의 목표 언어 지원",
  "translate.languages.source": "원본 언어",
  "translate.languages.target": "대상 언어",
  "translate.button.translate": "{count}페이지 번역",
  "translate.button.translatePlural": "{count}페이지 번역",
  "translate.button.translating": "{count}페이지 번역 중…",
  "translate.button.translatingPlural": "{count}페이지 번역 중…",
  "translate.button.translateEmpty": "번역",
  "translate.progress.complete": "{pct}% 완료",
  "translate.result.viewSideBySide": "나란히 보기",
  "translate.result.viewSingle": "단일 보기",
  "translate.result.download": "다운로드",
  "translate.result.downloadAll": "모두",
  "translate.result.processing": "{page}페이지 처리 중...",
  "translate.result.pageSuccess": "{page}페이지 — 번역 완료",
  "translate.result.pageFailed": "{page}페이지 — 실패",
  "translate.result.original": "원본",
  "translate.result.translated": "번역",
  "translate.result.editDetails": "번역 세부 정보 (편집 가능)",
  "translate.result.rerender": "재렌더링",
  "translate.result.editHint": "위의 번역을 편집한 후 \"재렌더링\"을 클릭하여 이미지를 업데이트하세요.",
  "translate.result.startOver": "다시 시작",
  "translate.history.title": "번역 기록",
  "translate.history.clear": "지우기",
  "translate.history.empty": "아직 번역 기록이 없습니다. 페이지를 번역하면 여기에 표시됩니다.",

  // FAQ page
  "faq.title": "자주 묻는 질문",
  "faq.subtitle": "CartoonTranslator에 대해 알아야 할 모든 것.",
  "faq.cta.title": "아직 궁금한 점이 있나요?",
  "faq.cta.subtitle": "GitHub 이슈를 열거나 연락하세요 — 모든 것을 읽습니다.",
  "faq.cta.button": "GitHub 이슈",
  "faq.q1": "CartoonTranslator란 무엇인가요?",
  "faq.a1":
    "CartoonTranslator는 만화, 만화(manhwa), 만화(manhua) 등을 번역하는 무료 AI 기반 웹 앱입니다. 페이지 이미지를 업로드하면 PaddleOCR을 사용하여 모든 말풍선을 감지하고 선택한 언어로 텍스트를 번역합니다 — 몇 초 만에 깨끗하고 읽기 쉬운 패널을 얻을 수 있습니다.",
  "faq.q2": "어떤 언어가 지원되나요?",
  "faq.a2":
    "현재 일본어, 중국어(간체 및 번체), 한국어를 소스 언어로 지원합니다. 출력 언어로는 영어, 스페인어, 프랑스어, 독일어, 포르투갈어, 이탈리아어 등이 포함됩니다. 목록을 계속 확장하고 있습니다 — 최신 지원 목록은 번역기 페이지를 확인하세요.",
  "faq.q3": "정말 무료인가요?",
  "faq.a3":
    "네, 완전히 무료입니다. CartoonTranslator는 만화 팬들을 위해 만들어진 열정 프로젝트입니다. 유료 콘텐츠, 크레딧 시스템, 회원가입이 없습니다. 서버 비용을 충당하기 위해 광고를 지원받지만 핵심 번역은 항상 무료입니다.",
  "faq.q4": "번역 정확도는 어떤가요?",
  "faq.a4":
    "정확도는 이미지 품질과 소스 언어에 따라 다릅니다. 일본어나 중국어 만화의 선명하고 고해상도 스캔의 경우 매우 자연스러운 번역을 기대할 수 있습니다. 손으로 쓴 글자나 스타일리시한 폰트는 OCR에 더 어려울 수 있으며 가끔 오류가 발생할 수 있습니다. 중요한 읽기의 경우 패널별로 검토하는 것을 권장합니다.",
  "faq.q5": "어떤 파일 형식을 지원하나요?",
  "faq.a5":
    "CartoonTranslator는 PNG, JPEG/JPG, WebP 이미지를 허용합니다. 최상의 결과를 위해 1500px 이상의 이미지를 업로드하세요. PDF 지원은 로드맵에 있습니다. 각 업로드는 단일 페이지로 처리됩니다.",
  "faq.q6": "만화 볼륨 전체를 번역할 수 있나요?",
  "faq.a6":
    "현재 도구는 페이지별로 작동합니다. 챕터나 볼륨 전체에 대한 일괄 업로드는 계획된 기능입니다. 그 동안에는 페이지를 한 번에 하나씩 업로드할 수 있습니다 — 각각 10초 이내에 처리됩니다.",
  "faq.q7": "AI OCR은 어떻게 작동하나요?",
  "faq.a7":
    "PaddleOCR — 오픈 소스 최첨단 OCR 엔진 — 을 사용하여 말풍선, 생각 상자, 효과음에서 텍스트를 감지하고 추출합니다. 추출된 텍스트는 만화 맥락, 속어, 경어를 이해하는 대형 언어 모델에 전달되어 자연스러운 번역을 생성합니다.",
  "faq.q8": "내 데이터는 안전한가요?",
  "faq.a8":
    "이미지는 번역 요청 기간 동안만 서버 측에서 처리되며 영구적으로 저장되지 않습니다. 업로드한 내용을 제3자와 공유하지 않습니다. 계정이 필요하지 않으므로 개인 데이터가 수집되지 않습니다. 자세한 내용은 개인정보 처리방침을 참조하세요.",

  // About page
  "about.subtitle": "프로젝트 소개",
  "about.title1": "만화 팬이 만든,",
  "about.title2": "만화 팬을 위한.",
  "about.intro":
    "CartoonTranslator는 개인적인 필요에서 시작된 주말 실험이었습니다: 일본에서 출시되는 당일에 미번역 만화 챕터를 읽는 것. 제대로 된 도구로 성장했고 이제 모두에게 무료로 제공됩니다.",
  "about.howItWorks.title": "작동 방식",
  "about.step1.title": "페이지 업로드",
  "about.step1.description":
    "만화의 PNG, JPEG 또는 WebP 스캔을 드롭하세요. 원본 스캔, 스캔레이션 페이지, 폰 카메라 촬영 모두 지원됩니다.",
  "about.step2.title": "OCR이 텍스트를 감지",
  "about.step2.description":
    "최첨단 오픈 소스 엔진인 PaddleOCR이 페이지의 모든 말풍선, 생각 상자, 효과음을 찾아 높은 정밀도로 텍스트를 추출합니다.",
  "about.step3.title": "AI가 맥락 속에서 번역",
  "about.step3.description":
    "대형 언어 모델이 읽기 순서와 서사 흐름을 이해할 수 있도록 위치 맥락과 함께 추출된 텍스트를 받아 기계적인 단어 대 단어 출력 대신 자연스러운 번역을 생성합니다.",
  "about.step4.title": "패널에 다시 렌더링",
  "about.step4.description":
    "번역된 텍스트가 원본 말풍선 위에 합성되어 복사 붙여넣기 없이 깨끗하고 읽기 쉬운 페이지를 제공합니다.",
  "about.techStack.title": "기술 스택",
  "about.tech.ocr": "OCR 엔진",
  "about.tech.translation": "번역",
  "about.tech.framework": "프레임워크",
  "about.tech.styling": "스타일링",
  "about.tech.hosting": "호스팅",
  "about.tech.imageProcessing": "이미지 처리",
  "about.philosophy.title": "철학",
  "about.philosophy.p1":
    "전문 현지화는 예술 형식입니다 — 재능 있는 번역가, 레터러, 편집자가 볼륨당 수개월의 작업을 합니다. CartoonTranslator는 그 대체품이 아닙니다; 진행 중인 시리즈를 따라가거나 공식 출시를 받지 못할 수도 있는 타이틀을 탐색하려는 팬들을 위한 읽기 보조 도구입니다.",
  "about.philosophy.p2":
    "이러한 도구는 무료, 빠르고, 개인정보를 존중해야 한다고 믿습니다. 이미지는 요청 기간 이상 저장되지 않으며, 계정이 필요하지 않고, 코드는 오픈 소스입니다.",
  "about.philosophy.p3":
    "프로젝트를 즐기신다면, 사랑하는 만화의 공식 영어 릴리스를 지원하는 것을 고려해 주세요 — 구매는 이 예술을 가능하게 만드는 창작자들을 지원합니다.",
  "about.cta.title": "번역할 준비가 됐나요?",
  "about.cta.subtitle": "회원가입 불필요. 페이지를 드롭하기만 하면 됩니다.",
  "about.cta.button": "무료로 사용해보기",

  // Language selector
  "langSelector.label": "언어",
};

export default ko;
