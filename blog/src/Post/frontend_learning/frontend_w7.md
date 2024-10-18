---
title: 第七周-購買 Udemy Bootcamp 課程
outline: deep
lastUpdated: 2023-02-13
---
# 第七周-購買 Udemy Bootcamp 課程
## 前言

相隔了兩個星期，終於又發布這個系列文章了😅。眼看當初設立的每周挑戰變得可有可無，我趕緊來補一下最新的進度。

上週農曆新年因為電腦不在身邊於是也就沒有任何學習。直到本周因為受不了如此沒有系統化的學習，再加上帳號頭一次購買有推出優惠，於是果斷購買了Udemy的線上課程。雖然為入門課程(Bootcamp)但是課程單元的數量可一點都不馬虎，兩門總計都為64小時的Web課程要全部花完也要花上不少時間。以下是主要學習的內容。

## 主要學習&實作項目
已經有相關基礎的部分直接開兩倍速快速聽過，而簡單介紹屬性的單元就把練習題目做完便速速前往下一個單元。

### web開發概念
在學習web 開發之前需要的各種基礎觀念:
- 網路是什麼?
- 前後端的是什麼?
- 瀏覽器的作用?
- HTML/CSS/JS 分別扮演什麼樣的角色?

### HTML
迅速看過，並做一點練習題目，至於table的部分我完全放掉，我認為以下幾點是學習HTML相對比較重要的內容。
- Basic
- HTML semantic
- HTML form
- form validation

### CSS
CSS的部分就是快速複習基礎觀念與屬性，主要的學習策略為多聽多看。雖說進階的部分現階段不是很熟，但我想至少要在實作的當下知道在MDN要搜索哪個關鍵字才好。至於BootStrap我沒有太深入去研究，只是稍微玩一下，等到需要使用的時候再續翻閱文件就好。
- basic
- selector
- container
	- div(block)
	- span(inline)
- display
	- block
	- inline
	- inline-block
	- none
- box-model: content, padding, border, margin
- box-sizing
	- content-box
	- border-box
- position:
	- fixed
	- absolute
	- relative
- transform
	- translate
	- rotate
	- skew
- **flexbox**
	- main axis/cross axis 的觀念
	- flex-direction
	- justify-content
	- align-item
	- align-self
	- wrap
- **RWD**
	- media query
- CSS framework: Bootstrap

flexbox的部分老是看過就忘，名字真的傻傻分不清楚，找機會再做一個類似[display: flex (flexbox.help)](https://flexbox.help/)的頁面來加深自己的印象好了。

### Terminal (CLI)
一些跟file處理相關的指令，先前就有藉由terminal來輸入git指令的經驗，這部分還算得心應手。稍微整理了一下比較就跳到下一個單元去了。[command Line 常用指令 - Victor's 程式開發筆記 (gitbook.io)](https://victorchao996.gitbook.io/personal-notes/jie-shao-an-zhuang-zhi-ling/command-line-chang-yong-zhi-ling)

### Node.js
雖然這是前端挑戰系列，但是全端網頁課程怎麼能沒有後端的部分呢? 以下是主要學習的內容:
- node是什麼?
- node REPL
- node JS runtime 與 brower的差異
- 範例 node 內建模組API : File System, HTTP
- npm(node package manager)
- node_modules 觀念

跟者課程的練習時做了一個簡單的node程式[weird-language-guesser](https://github.com/VictorChao996/weird-language-guesser)，順便練習npm install & import的動作(~~雖然功能有點失敗就是了~~)

### Express
若要使用node當作後端的server，通常不會使用內建HTTP module，而是使用npm上的package: Express。目前看了一半的內容:
- 啟用server listen for requests
- 根據request 送出相對應的 response
- routing 概念
目前還沒看到EJS的部分，但是看完node.js 與 express 的部分影片讓我對於後端有更深的認識。在這過程中有更加了解瀏覽器送出請求後會發生什麼事，

### mongoDB
這一part主要學習的內容是資料庫的觀念，並稍微玩一下:
- SQL vs NoSQL
- 安裝mongoDB
- 下載並使用MongoDB shell
- 藉由MongoDB Shell 達到CRUD
- 更多的工具: [Mongoose ODM v6.9.1 (mongoosejs.com)](https://mongoosejs.com/)

光是安裝的部分就花了不少時間QQ。

## 總結
這一周也挺瘋狂的，接觸了不少新的觀念，尤其是學習Node真的打開了我的眼界。node解放了JS，使其能在瀏覽器以外的地方運行。另外node內建各種module能讓developer使用，再加上npm的出現，讓開發各種project變得更為容易，這現象從觀察 npm 前幾名package的weekly downloads 能略知一二。這周挑戰文章就先這樣，ㄅㄅ。
