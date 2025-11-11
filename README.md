# Shinya's Portfolio Website

エンジニアとしての成果物とスキルを紹介するインタラクティブなポートフォリオサイトです。

## 🚀 特徴

- **モダンなデザイン**: Bootstrap 5 とカスタム CSS による美しい UI
- **インタラクティブ**: 各作品をクリックすると詳細がモーダルで表示
- **レスポンシブ**: モバイル・タブレット・デスクトップに対応
- **アニメーション**: スクロール時の要素アニメーション
- **スムーズスクロール**: ナビゲーションのスムーズな移動

## 📱 セクション構成

### 1. Hero Section

- 自己紹介と CTA ボタン
- グラデーション背景とアニメーション

### 2. About Section

- エンジニアとしての 3 つの特徴
- アイコン付きのカード表示

### 3. Skills Section

- 技術スタックの分類表示
- カテゴリ別のスキルタグ

### 4. Works Section

- **Web Services**: SVG カレンダー、dev-cabinet
- **Chrome Extensions**: Notify me!
- **Desktop Applications**: Micro Note、Bokuchi
- **Other Projects**: GitHub、Qiita

### 5. Contact Section

- 各種リンクと連絡先

## 🛠️ 技術スタック

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Animations**: CSS3 Animations + JavaScript
- **Responsive**: Mobile-first approach

## 📁 ファイル構成

```
/
├── index.html          # メインHTMLファイル
├── css/
│   ├── bootstrap.min.css    # Bootstrap CSS
│   └── portfolio.css        # カスタムCSS
├── js/
│   ├── bootstrap.min.js     # Bootstrap JavaScript
│   └── portfolio.js         # カスタムJavaScript
└── README.md
```

## 🚀 セットアップ

1. リポジトリをクローン

```bash
git clone https://github.com/shinya/shinya.github.io.git
cd shinya.github.io
```

2. ブラウザで`index.html`を開く

```bash
open index.html
```

または、ローカルサーバーを起動

```bash
python -m http.server 8000
# http://localhost:8000 でアクセス
```

## 🎨 カスタマイズ

### 色の変更

`css/portfolio.css`の`:root`セクションで CSS 変数を編集：

```css
:root {
  --primary-color: #007bff;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* その他の変数... */
}
```

### 作品の追加

`js/portfolio.js`の`workDetails`オブジェクトに新しい作品を追加：

```javascript
'new-work': {
    title: '新しい作品',
    description: '作品の説明',
    features: ['機能1', '機能2'],
    technologies: ['技術1', '技術2'],
    link: 'https://example.com',
    linkText: 'リンクテキスト'
}
```

### スキルの追加

`index.html`の Skills Section に新しいスキルカードを追加。

## 📱 レスポンシブ対応

- **Mobile**: 576px 以下
- **Tablet**: 768px 以下
- **Desktop**: 768px 以上

## 🌟 インタラクティブ機能

### 作品カード

- ホバー時のアニメーション
- クリックでモーダル表示
- 詳細情報とリンク

### ナビゲーション

- スムーズスクロール
- アクティブセクションのハイライト
- スクロール時の背景変更

### アニメーション

- スクロール時の要素フェードイン
- ヒーローセクションのタイピング効果
- パララックス効果

## 🔧 今後の改善予定

- [ ] デスクトップアプリのアイコンとスクリーンショット追加
- [ ] ダークモード対応
- [ ] 多言語対応（英語版）
- [ ] ブログセクションの追加
- [ ] コンタクトフォームの実装

## 📄 ライセンス

MIT License

## 👨‍💻 作者

**Shinya** - [GitHub](https://github.com/shinya) - [Qiita](https://qiita.com/ssaita)

---

このポートフォリオサイトは、エンジニアとしてのスキルと成果物を効果的にアピールすることを目的としています。ご質問やフィードバックがございましたら、お気軽にお問い合わせください。
