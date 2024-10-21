- [Pesonal Blog](#pesonal-blog)
  - [Intro](#intro)
  - [Installation](#installation)
  - [Usage \& Dev](#usage--dev)
  - [Project Structure](#project-structure)
    - [必知](#必知)
    - [其他](#其他)
      - [other](#other)
      - [Scripts helper](#scripts-helper)
  - [Memo](#memo)


# Pesonal Blog

## Intro
- Reserve for personal blog, build site with vitepress.
- Content is king, .md file comes first, webpage style comes second.

## Installation
- `npm install`: install all the packages for vitepress dev
  - vitepress packages
  - vue packages

## Usage & Dev
- details please visit the package.json file
  - `npm run dev`: local dev, vitepress support hot reload
  - `npm run build`: vitepress build the statis site
  - `npm run preview`: preview the build website

## Project Structure
> 下面說明當前 Project 的 File Structure, 有混合一些 vitepress default 設定 & 客製化設定的內容, 總之沒有絕對, 當參考用

### 必知
- blog: vitepress 根目錄 (註：可透過 config.js 設定 `base` 表根目錄位置)
  - .vitepress/: ***最重要的的資料夾***
    - `config.js`: 在這個檔案中定義 vitepress 的一些設定
    - theme: vitepress theme, 底下的 `index.js` 可以自定義 layout 或掛載額外的 vue component （如果有用到自己建立的 vue component 話）
    - cache：快取, 可忽略
    - dist: build 後產生的網站檔案 (html, asset 等)
  - src: 文檔資源位置 (註：可透過 config.js 設定 `srcDir` 表文檔位置)

### 其他
#### other
- .gitHub/workflows: 放 GitHub Actions yml file
- scripts: 一寫簡單的可執行執行腳本
  - update.sh: git commit & push 到 remote
  - updatePostIndex.sh: 執行[updatePostIndex.js](#scripts-helper)

#### Scripts helper
- updatePostIndex.js : 根據 Post 底下的檔案路徑 & .md file 來產生要寫入 Post/index.md 的資料
  - 執行方式(本地觸發):
    -  `npm run updatePostIndex`
    -  `sh scripts/updatePostIndex.sh`
  - 補充說明：
    - 考慮到網站可以使用 EditLink 跳轉 GitHub 直接線上編輯的關係,目前這個 script 已經加入到 GitHub Actions 中, 會在 npm run build 之前觸發

## Memo

- vitepress 根據 srcDir 底下的 file structure 來決定 html 的玩整路徑, 當前 directory 底下的 index.md 則表示該路徑,例如：
  - src/Post/reading/books.md --> www.xxxxxx.com/post/reading/books.html
  - src/Post/hello/world.md --> www.xxx.com/post/hello/world.html
  - src/Post/tag/index.md --> www.xxx.com/post/tag
- 雖然 vitepress 會自動產生路徑, 但是若有要在頁面上顯示跳轉的 link 的需求都需要手動新增到 .md 文檔中(包括 sidebar) （除非寫 vue component）, 比較麻煩, 所以可以先寫類似上面的 `updatePostIndex.js` 動態產生 link 內容到 index.md 中
- vitepress 可以讓你在 .md 文檔中使用自定義的 vue component, 不過那是比較進階的部分
  - 目前以 .md file 為重,盡量不在 .md 中使用 vue component, 避免有一天又要搬家或重新架設 blog site, 那現在做的所有 .md 以外的設定都會派不上用場
  - 等文章累積到一定的量, 有閒暇時間可以再玩玩
- 目前 [personal doc](https://victorchao996.github.io/docs2/) 也是使用 vitepress 架設, 因為配置類似, 有想過乾脆跟 blog 共用同一個 repo, 但考慮到 text search 全域搜尋會被影響到, 所以先擱置