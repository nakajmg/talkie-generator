# talkie-generator
  
-----

## モチベ

* Talkie.jsいいぞ
* HTMLとMarkdown分離したいぞ

-----

## 構成

* template.ejs
* index.md
* config.js

-----

## template.ejs

`config.js` と `index.md` をもとにページを生成

-----

## index.md

Markdown。ページの区切りはハイフン5個（`confing.js`で変更可能）

-----

## config.js

ページごとの設定を記述。

- pages
  - attributes
    - layout
    - invert
    - backface
    - backfaceFilter
  - note
  - type

-----

## config.js

```javascript
module.exports = {
  pages: [
    {
      attributes: {
        layout: 'title',
        invert: '',
        backface: './img/bg.png',
        backfaceFilter: 'blur(2px) brightness(1.5)'
      },
      note: 'ノートです'
    },
    {
      attributes: ['layout="transparent"']
    },
    {
      type: 'html',
      attributes: 'layout'
    }
  ],
  delimiter: /\n-----\n/, // optional {RegExp}
  dist: '.' // optional {String}
}
```

-----

<h1>pages.type</h1>

`type: 'html'` で `section` タグになる。HTMLがかける。

<ul>
  <li> リスト要素
  <li> リスト要素
  <li> リスト要素
</ul>

-----

## [nakajmg/talkie-generator](https://github.com/nakajmg/talkie-generator)

-----

## コマンド

- `talkie init <outputPath>` テンプレートを生成
  - `-b` オプションでTalkie本体もコピー
- `talkie <templatesPath>` テンプレートから `index.html` を生成  

