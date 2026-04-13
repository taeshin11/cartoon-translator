import type { TranslationKeys } from "./en";

const ja: TranslationKeys = {
  // Navbar
  "nav.home": "ホーム",
  "nav.translate": "翻訳",
  "nav.faq": "FAQ",
  "nav.blog": "ブログ",
  "nav.about": "概要",
  "nav.startTranslating": "翻訳を始める",
  "nav.appName": "CartoonTranslator",

  // Footer
  "footer.tagline": "AIによるマンガ・コミック翻訳",
  "footer.allRightsReserved": "All rights reserved.",
  "footer.freeToUse": "無料でご利用いただけます。",

  // Home page — Hero
  "home.hero.badge": "AIスマート翻訳",
  "home.hero.title1": "あらゆるマンガや",
  "home.hero.title2": "コミックを瞬時に翻訳",
  "home.hero.description":
    "AIのOCRがセリフを検出して翻訳し、吹き出しのテキストをオリジナルのスタイルに合わせて自然に置き換えます。日本語、韓国語、中国語を含む35以上の言語をサポート。",
  "home.hero.ctaStart": "無料で翻訳を始める",
  "home.hero.ctaHow": "仕組みを見る",
  "home.hero.previewLabel": "CartoonTranslator — 翻訳",
  "home.hero.original": "原文",
  "home.hero.translated": "翻訳",
  "home.hero.previewCaption": "前後比較 — スマートテキスト置換プレビュー",

  // Home page — How It Works
  "home.howItWorks.badge": "シンプルなワークフロー",
  "home.howItWorks.title": "使い方",
  "home.howItWorks.subtitle": "スキャンから翻訳ページまで数秒で — セットアップ不要。",
  "home.howItWorks.step1.title": "アップロード",
  "home.howItWorks.step1.description": "マンガのページ画像をドロップ — JPG、PNG、WebP、最大10MB。",
  "home.howItWorks.step2.title": "AI処理",
  "home.howItWorks.step2.description":
    "OCRがすべての吹き出しを検出し、AIが翻訳して、スマートインペインティングでオリジナルのテキストを置換。",
  "home.howItWorks.step3.title": "ダウンロード",
  "home.howItWorks.step3.description":
    "吹き出しのスタイルに合った自然なタイポグラフィで翻訳されたページを即座に入手。",

  // Home page — Features
  "home.features.badge": "必要なすべてが揃っています",
  "home.features.title": "マンガ読者のために設計",
  "home.features.subtitle": "コミックやマンガ翻訳の特性に対応する強力な機能。",
  "home.features.f1.title": "日本語縦書きテキスト",
  "home.features.f1.description":
    "伝統的なマンガや軽小説に見られる縦組み（縦書きモード）を完全サポート。",
  "home.features.f2.title": "35以上の言語",
  "home.features.f2.description":
    "日本語、韓国語、中国語、英語、スペイン語、フランス語、ドイツ語など多数の言語間で翻訳。",
  "home.features.f3.title": "バッチアップロード",
  "home.features.f3.description":
    "Proで一度に最大50ページを処理。チャプターをアップロードしてAIにすべてを任せましょう。",
  "home.features.f4.title": "スマートテキスト置換",
  "home.features.f4.description":
    "AIが吹き出しの色を検出してテキストを自然に置換 — マンガの上に白いボックスを重ねるだけではありません。",
  "home.features.f5.title": "編集と再レンダリング",
  "home.features.f5.description":
    "エクスポート前にすべての翻訳吹き出しをレビュー、調整、再レンダリングできます。完全なクリエイティブコントロール。",
  "home.features.f6.title": "並べて比較",
  "home.features.f6.description":
    "原文と翻訳ページを並べて表示して精度を一目で確認。",

  // Home page — Stats
  "home.stats.title": "世界中のマンガファンに信頼されています",
  "home.stats.subtitle": "数字がすべてを物語っています。",
  "home.stats.s1.label": "バッチ処理ページ数（Pro）",
  "home.stats.s2.label": "対応言語数",
  "home.stats.s3.label": "1日5ページ無料",
  "home.stats.s4.label": "CJK OCR精度",

  // Home page — CTA
  "home.cta.title": "お気に入りのマンガを翻訳する準備はできましたか？",
  "home.cta.subtitle":
    "アカウント不要。ページをアップロードするだけで数秒で自然な翻訳が得られます — 完全無料。",
  "home.cta.button": "無料で翻訳を始める",
  "home.cta.noSignup": "クレジットカード不要 • 登録不要",

  // Translate page
  "translate.title": "マンガ・コミック翻訳",
  "translate.subtitle": "最大{max}ページをアップロードし、言語を選択して翻訳結果を取得。",
  "translate.tab.upload": "アップロード",
  "translate.tab.results": "結果",
  "translate.tab.history": "履歴",
  "translate.upload.title": "画像のアップロード",
  "translate.upload.description": "JPG、PNG、WEBP — 各最大10MB — 最大{max}ページ",
  "translate.upload.dropzone.title": "ここに画像をドラッグ＆ドロップ",
  "translate.upload.dropzone.subtitle": "またはクリックして参照 — 複数ファイルを一度に選択可能",
  "translate.upload.chooseFiles": "ファイルを選択",
  "translate.upload.pagesUploaded": "{count}ページアップロード済み",
  "translate.upload.pagesUploadedPlural": "{count}ページアップロード済み",
  "translate.upload.clearAll": "すべてクリア",
  "translate.languages.title": "言語",
  "translate.languages.description": "{count}以上の目標言語に対応",
  "translate.languages.source": "ソース言語",
  "translate.languages.target": "ターゲット言語",
  "translate.button.translate": "{count}ページを翻訳",
  "translate.button.translatePlural": "{count}ページを翻訳",
  "translate.button.translating": "{count}ページを翻訳中…",
  "translate.button.translatingPlural": "{count}ページを翻訳中…",
  "translate.button.translateEmpty": "翻訳",
  "translate.progress.complete": "{pct}%完了",
  "translate.result.viewSideBySide": "並べて表示",
  "translate.result.viewSingle": "単一表示",
  "translate.result.download": "ダウンロード",
  "translate.result.downloadAll": "すべて",
  "translate.result.processing": "{page}ページ目を処理中...",
  "translate.result.pageSuccess": "{page}ページ目 — 翻訳完了",
  "translate.result.pageFailed": "{page}ページ目 — 失敗",
  "translate.result.original": "原文",
  "translate.result.translated": "翻訳",
  "translate.result.editDetails": "翻訳の詳細（編集可能）",
  "translate.result.rerender": "再レンダリング",
  "translate.result.editHint": "上の翻訳を編集してから「再レンダリング」をクリックして画像を更新。",
  "translate.result.startOver": "最初からやり直す",
  "translate.history.title": "翻訳履歴",
  "translate.history.clear": "クリア",
  "translate.history.empty": "翻訳履歴はまだありません。ページを翻訳するとここに表示されます。",

  // FAQ page
  "faq.title": "よくある質問",
  "faq.subtitle": "CartoonTranslatorについて知っておくべきすべてのこと。",
  "faq.cta.title": "まだ質問がありますか？",
  "faq.cta.subtitle": "GitHubでイシューを開くかご連絡ください — すべて読みます。",
  "faq.cta.button": "GitHubイシュー",
  "faq.q1": "CartoonTranslatorとは何ですか？",
  "faq.a1":
    "CartoonTranslatorは、マンガ、マンファ、マンファなどを翻訳する無料のAI搭載ウェブアプリです。ページ画像をアップロードすると、PaddleOCRを使ってすべての吹き出しを検出し、選択した言語にテキストを翻訳します — 数秒でクリーンで読みやすいパネルが得られます。",
  "faq.q2": "どの言語がサポートされていますか？",
  "faq.a2":
    "現在、ソース言語として日本語、中国語（簡体字・繁体字）、韓国語をサポートしています。出力言語には英語、スペイン語、フランス語、ドイツ語、ポルトガル語、イタリア語などが含まれます。リストを積極的に拡張しています — 最新の選択肢については翻訳ページを確認してください。",
  "faq.q3": "本当に無料ですか？",
  "faq.a3":
    "はい、完全に無料です。CartoonTranslatorはマンガファンのために作られたパッションプロジェクトです。ペイウォール、クレジットシステム、登録は必要ありません。サーバーコストをカバーするために広告でサポートされていますが、コア翻訳は常に無料です。",
  "faq.q4": "翻訳の精度はどうですか？",
  "faq.a4":
    "精度は画像の品質とソース言語によって異なります。日本語や中国語のマンガの鮮明な高解像度スキャンでは、非常に自然な翻訳が期待できます。手書きやスタイリッシュなフォントはOCRには難しく、時々エラーが発生することがあります。重要な読書にはパネルごとにレビューすることをお勧めします。",
  "faq.q5": "どのファイル形式がサポートされていますか？",
  "faq.a5":
    "CartoonTranslatorはPNG、JPEG/JPG、WebP画像を受け付けます。最良の結果を得るには1500px以上の画像をアップロードしてください。PDFサポートはロードマップにあります。各アップロードは単一ページとして処理されます。",
  "faq.q6": "マンガのボリューム全体を翻訳できますか？",
  "faq.a6":
    "現在、ツールはページごとに動作します。チャプターやボリューム全体のバッチアップロードは計画中の機能です。その間は、一度に1ページずつアップロードできます — 各ページは10秒以内に処理されます。",
  "faq.q7": "AI OCRはどのように機能しますか？",
  "faq.a7":
    "PaddleOCR — オープンソースの最先端OCRエンジン — を使用して、吹き出し、思考ボックス、効果音からテキストを検出・抽出します。抽出されたテキストは、マンガのコンテキスト、スラング、敬語を理解する大規模言語モデルに渡され、自然な翻訳を生成します。",
  "faq.q8": "データは安全ですか？",
  "faq.a8":
    "画像は翻訳リクエストの期間のみサーバー側で処理され、永久に保存されることはありません。アップロードを第三者と共有することはありません。アカウントは不要なので、個人データは収集されません。詳細についてはプライバシーポリシーをご覧ください。",

  // About page
  "about.subtitle": "プロジェクトについて",
  "about.title1": "マンガファンが作った、",
  "about.title2": "マンガファンのために。",
  "about.intro":
    "CartoonTranslatorは、個人的な必要性から始まった週末の実験でした：日本でリリースされた当日に未翻訳のマンガチャプターを読むこと。それが本格的なツールに成長し、今では誰もが無料で利用できます。",
  "about.howItWorks.title": "仕組み",
  "about.step1.title": "ページをアップロード",
  "about.step1.description":
    "マンガやコミックのPNG、JPEG、WebPスキャンをドロップしてください。生のスキャン、スキャンレーションページ、スマートフォンカメラ撮影でも動作します。",
  "about.step2.title": "OCRがテキストを検出",
  "about.step2.description":
    "最先端のオープンソースエンジンであるPaddleOCRが、ページ上のすべての吹き出し、思考ボックス、効果音を見つけ、高精度でテキストを抽出します。",
  "about.step3.title": "AIがコンテキスト内で翻訳",
  "about.step3.description":
    "大規模言語モデルが、読み順と物語の流れを理解できるように位置コンテキストとともに抽出されたテキストを受け取り、単語対単語のロボット的な出力ではなく自然な翻訳を生成します。",
  "about.step4.title": "パネルに再レンダリング",
  "about.step4.description":
    "翻訳されたテキストが元の吹き出しの上に合成され、コピー＆ペーストなしにクリーンで読みやすいページを提供します。",
  "about.techStack.title": "技術スタック",
  "about.tech.ocr": "OCRエンジン",
  "about.tech.translation": "翻訳",
  "about.tech.framework": "フレームワーク",
  "about.tech.styling": "スタイリング",
  "about.tech.hosting": "ホスティング",
  "about.tech.imageProcessing": "画像処理",
  "about.philosophy.title": "哲学",
  "about.philosophy.p1":
    "プロのローカライズは芸術の形式です — 才能あるトランスレーター、レタラー、エディターがボリュームごとに何ヶ月もの作業をします。CartoonTranslatorはその代替品ではありません; 進行中のシリーズを追ったり、公式リリースを受けないかもしれないタイトルを探索したいファンのための読書補助ツールです。",
  "about.philosophy.p2":
    "このようなツールは無料で、速く、プライバシーを尊重すべきだと考えています。画像はリクエストの存続期間を超えて保存されることはなく、アカウントは不要で、コードはオープンソースです。",
  "about.philosophy.p3":
    "プロジェクトをお楽しみいただけるなら、お気に入りのマンガの公式英語リリースのサポートを検討してください — あなたの購入はこのアートを可能にするクリエイターを支援します。",
  "about.cta.title": "翻訳する準備はできましたか？",
  "about.cta.subtitle": "登録不要。ページをドロップするだけ。",
  "about.cta.button": "無料で試す",

  // Language selector
  "langSelector.label": "言語",
};

export default ja;
