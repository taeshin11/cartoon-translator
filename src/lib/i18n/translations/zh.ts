import type { TranslationKeys } from "./en";

const zh: TranslationKeys = {
  // Navbar
  "nav.home": "首页",
  "nav.translate": "翻译",
  "nav.faq": "常见问题",
  "nav.blog": "博客",
  "nav.about": "关于",
  "nav.startTranslating": "开始翻译",
  "nav.appName": "CartoonTranslator",

  // Footer
  "footer.tagline": "AI驱动的漫画翻译",
  "footer.allRightsReserved": "版权所有。",
  "footer.freeToUse": "免费使用。",

  // Home page — Hero
  "home.hero.badge": "AI智能翻译",
  "home.hero.title1": "即时翻译任何",
  "home.hero.title2": "漫画内容",
  "home.hero.description":
    "AI OCR检测对话，翻译文字，并自然地替换气泡中的文本——完美匹配原始风格。支持日语、韩语、中文等35种以上语言。",
  "home.hero.ctaStart": "免费开始翻译",
  "home.hero.ctaHow": "查看工作原理",
  "home.hero.previewLabel": "CartoonTranslator — 翻译",
  "home.hero.original": "原文",
  "home.hero.translated": "翻译",
  "home.hero.previewCaption": "前后对比 — 智能文字替换预览",

  // Home page — How It Works
  "home.howItWorks.badge": "简单工作流程",
  "home.howItWorks.title": "工作原理",
  "home.howItWorks.subtitle": "从原始扫描到翻译页面仅需数秒 — 无需设置。",
  "home.howItWorks.step1.title": "上传",
  "home.howItWorks.step1.description": "拖放漫画页面图像 — JPG、PNG或WebP，最大10MB。",
  "home.howItWorks.step2.title": "AI处理",
  "home.howItWorks.step2.description":
    "OCR检测每个文字气泡，AI进行翻译，然后智能修复替换原始文字。",
  "home.howItWorks.step3.title": "下载",
  "home.howItWorks.step3.description":
    "立即获取翻译页面，自然排版与气泡风格完美匹配。",

  // Home page — Features
  "home.features.badge": "您需要的一切",
  "home.features.title": "专为漫画读者打造",
  "home.features.subtitle": "强大功能处理漫画翻译的各种特殊情况。",
  "home.features.f1.title": "日语竖排文字",
  "home.features.f1.description":
    "完全支持传统漫画和轻小说中的竖组（竖排书写模式）。",
  "home.features.f2.title": "35种以上语言",
  "home.features.f2.description":
    "在日语、韩语、中文、英语、西班牙语、法语、德语等多种语言之间翻译。",
  "home.features.f3.title": "批量上传",
  "home.features.f3.description":
    "Pro版本一次处理最多50页。上传章节，让AI处理一切。",
  "home.features.f4.title": "智能文字替换",
  "home.features.f4.description":
    "AI检测气泡颜色并自然替换文字 — 不只是在漫画上覆盖白色方块。",
  "home.features.f5.title": "编辑与重新渲染",
  "home.features.f5.description":
    "导出前审阅、调整和重新渲染每个翻译气泡。完全的创意控制。",
  "home.features.f6.title": "并排比较",
  "home.features.f6.description":
    "同时查看原始和翻译页面，一眼验证准确性。",

  // Home page — Stats
  "home.stats.title": "全球漫画爱好者的信赖之选",
  "home.stats.subtitle": "数字说明一切。",
  "home.stats.s1.label": "每批处理页数（Pro）",
  "home.stats.s2.label": "支持语言数",
  "home.stats.s3.label": "每天5页免费",
  "home.stats.s4.label": "CJK OCR准确率",

  // Home page — CTA
  "home.cta.title": "准备好翻译您最喜欢的漫画了吗？",
  "home.cta.subtitle":
    "无需账户。只需上传页面，几秒内获得自然流畅的翻译 — 完全免费。",
  "home.cta.button": "免费开始翻译",
  "home.cta.noSignup": "无需信用卡 • 无需注册",

  // Translate page
  "translate.title": "漫画翻译器",
  "translate.subtitle": "上传最多{max}页，选择语言，获取翻译结果。",
  "translate.tab.upload": "上传",
  "translate.tab.results": "结果",
  "translate.tab.history": "历史",
  "translate.upload.title": "上传图像",
  "translate.upload.description": "JPG、PNG或WEBP — 每个最大10MB — 最多{max}页",
  "translate.upload.dropzone.title": "将图像拖放到此处",
  "translate.upload.dropzone.subtitle": "或点击浏览 — 一次选择多个文件",
  "translate.upload.chooseFiles": "选择文件",
  "translate.upload.pagesUploaded": "已上传{count}页",
  "translate.upload.pagesUploadedPlural": "已上传{count}页",
  "translate.upload.clearAll": "清除全部",
  "translate.languages.title": "语言",
  "translate.languages.description": "支持{count}种以上目标语言",
  "translate.languages.source": "源语言",
  "translate.languages.target": "目标语言",
  "translate.button.translate": "翻译{count}页",
  "translate.button.translatePlural": "翻译{count}页",
  "translate.button.translating": "正在翻译{count}页…",
  "translate.button.translatingPlural": "正在翻译{count}页…",
  "translate.button.translateEmpty": "翻译",
  "translate.progress.complete": "{pct}%完成",
  "translate.result.viewSideBySide": "并排查看",
  "translate.result.viewSingle": "单页查看",
  "translate.result.download": "下载",
  "translate.result.downloadAll": "全部",
  "translate.result.processing": "正在处理第{page}页...",
  "translate.result.pageSuccess": "第{page}页 — 翻译完成",
  "translate.result.pageFailed": "第{page}页 — 失败",
  "translate.result.original": "原文",
  "translate.result.translated": "翻译",
  "translate.result.editDetails": "翻译详情（可编辑）",
  "translate.result.rerender": "重新渲染",
  "translate.result.editHint": "编辑上面的翻译，然后点击\"重新渲染\"更新图像。",
  "translate.result.startOver": "重新开始",
  "translate.history.title": "翻译历史",
  "translate.history.clear": "清除",
  "translate.history.empty": "暂无翻译历史。翻译一些页面后将在此显示。",

  // FAQ page
  "faq.title": "常见问题",
  "faq.subtitle": "您需要了解的关于CartoonTranslator的一切。",
  "faq.cta.title": "还有疑问？",
  "faq.cta.subtitle": "在GitHub上开Issue或联系我们 — 我们阅读所有内容。",
  "faq.cta.button": "GitHub Issues",
  "faq.q1": "CartoonTranslator是什么？",
  "faq.a1":
    "CartoonTranslator是一个免费的AI驱动网络应用，用于翻译漫画、韩漫、港漫等各类漫画。上传页面图像，我们将使用PaddleOCR检测所有气泡，然后将文本翻译成您选择的语言 — 几秒内获得干净可读的页面。",
  "faq.q2": "支持哪些语言？",
  "faq.a2":
    "目前支持日语、中文（简体和繁体）和韩语作为源语言。输出语言包括英语、西班牙语、法语、德语、葡萄牙语、意大利语等。我们正在积极扩展列表 — 请查看翻译页面获取最新完整选择。",
  "faq.q3": "真的免费吗？",
  "faq.a3":
    "是的，完全免费。CartoonTranslator是一个为漫画爱好者打造的热情项目。没有付费墙、积分系统，无需注册。网站通过广告支持来支付服务器成本，但核心翻译始终免费。",
  "faq.q4": "翻译准确度如何？",
  "faq.a4":
    "准确度取决于图像质量和源语言。对于清晰、高分辨率的日语或中文漫画扫描，您可以期待非常自然的翻译。手写或风格化字体对OCR来说更难，偶尔可能产生错误。对于重要阅读，我们建议逐页面审查。",
  "faq.q5": "支持哪些文件格式？",
  "faq.a5":
    "CartoonTranslator接受PNG、JPEG/JPG和WebP图像。为获得最佳效果，请上传1500px或更宽的图像。PDF支持在路线图中。每次上传作为单页处理。",
  "faq.q6": "可以翻译整个漫画卷吗？",
  "faq.a6":
    "目前该工具按页面工作。整章或卷的批量上传是计划中的功能。同时，您可以逐页上传 — 每页在10秒内处理完成。",
  "faq.q7": "AI OCR如何工作？",
  "faq.a7":
    "我们使用PaddleOCR — 一个开源的最先进OCR引擎 — 从气泡、想法框和音效中检测和提取文字。提取的文字随后传递给理解漫画上下文、俚语和敬语的大型语言模型，以产生自然的翻译。",
  "faq.q8": "我的数据安全吗？",
  "faq.a8":
    "您的图像仅在翻译请求期间在服务器端处理，不会永久存储。我们不会与第三方共享您的上传。无需账户，因此不收集个人数据。详情请参阅我们的隐私政策。",

  // About page
  "about.subtitle": "关于项目",
  "about.title1": "漫画爱好者为",
  "about.title2": "漫画爱好者打造。",
  "about.intro":
    "CartoonTranslator始于一个周末实验，源于个人需求：在日本发布当天阅读未翻译的漫画章节。它成长为一个真正的工具 — 现在对所有人免费开放。",
  "about.howItWorks.title": "工作原理",
  "about.step1.title": "上传页面",
  "about.step1.description":
    "拖入漫画的任何PNG、JPEG或WebP扫描。适用于原始扫描、汉化版页面和手机相机拍摄。",
  "about.step2.title": "OCR检测文字",
  "about.step2.description":
    "PaddleOCR — 最先进的开源引擎 — 定位页面上的每个气泡、想法框和音效，并以高精度提取文字。",
  "about.step3.title": "AI在上下文中翻译",
  "about.step3.description":
    "大型语言模型接收提取的文字以及位置上下文，以理解阅读顺序和叙事流程，产生自然翻译而不是机械的逐词输出。",
  "about.step4.title": "渲染回格子上",
  "about.step4.description":
    "翻译后的文字合成在原始气泡上，为您提供干净可读的页面 — 无需复制粘贴。",
  "about.techStack.title": "技术栈",
  "about.tech.ocr": "OCR引擎",
  "about.tech.translation": "翻译",
  "about.tech.framework": "框架",
  "about.tech.styling": "样式",
  "about.tech.hosting": "托管",
  "about.tech.imageProcessing": "图像处理",
  "about.philosophy.title": "理念",
  "about.philosophy.p1":
    "专业本地化是一种艺术形式 — 才华横溢的翻译、排版和编辑人员每卷需要数月工作。CartoonTranslator不是其替代品；它是一个阅读辅助工具，为想要跟随正在进行的系列或探索可能永远不会获得官方发行的作品的粉丝服务。",
  "about.philosophy.p2":
    "我们相信这类工具应该是免费、快速和尊重隐私的。您的图像不会在请求生命周期之后存储，不需要账户，代码是开源的。",
  "about.philosophy.p3":
    "如果您喜欢这个项目，请考虑支持您喜爱的漫画的官方英文版本 — 您的购买支持了使这门艺术成为可能的创作者。",
  "about.cta.title": "准备好翻译了吗？",
  "about.cta.subtitle": "无需注册。只需拖入一页。",
  "about.cta.button": "免费试用",

  // Language selector
  "langSelector.label": "语言",
};

export default zh;
