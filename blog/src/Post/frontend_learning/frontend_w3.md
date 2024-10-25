---
title: 第三周-初探Vue框架
outline: deep
lastUpdated: 2023-01-01
date: 2023-01-01
---
# 第三周-初探Vue框架
## 前言
第二周紀錄的主要學習內容是JavaScript的基礎&進階概念，而本周主要的學習內容是認識框架(Vue.js)。

在前端框架三支柱中(Angular、React、Vue)為什麼會選擇Vue來做學習呢? 其實是看中Vue框架主打的**輕便性**，另外也聽說官方文件易於閱讀學習，於是就果斷選擇Vue來入門。

### 三大框架簡單比較
- Angular: 
	- 由Google support
	- 各種功能完善，相對的學習曲線較高
	- 需使用TypeScript
- React: 
	- 由Facebook(Meta) support
	- 使用JSX
	- 需要接觸第三方插件
- Vue:
	- 由Vue團隊support
	- 使用HTML寫法
	- SFC將 HTML、JavaScript、CSS分開
	- 漸進式框架

## 主要學習內容

### 為何要使用框架?
傳統網站開發使用HTML、CSS、JavaScript 將網站的骨架、樣式、邏輯控制分開的寫法在小型的網站上還能應付，然而當網站的架構逐漸擴大，**開發維護**上就會產生各種各樣的問題。

#### ✒️網站互動元素開發
原先使用JavaScript操作DOM的方法很不直觀，儘管後來有出現 jQuery 可以使開發者有更完善與簡潔的方法來達成網頁元素的互動，但部分項目仍然會頻繁的操作DOM。而Vue採用**模板語法**的方式&監聽特定節點的值(**宣告式渲染**)來代替開發者實際操作DOM，可使開發者在開發複雜的互動UI時更加直觀。

#### ✒️效能優化
開發者藉由JavaScript DOM API 可以操作&更改網頁的HTML元素，但操作DOM會增加網頁渲染的成本(Repaint or Reflow)，使得網頁效能較差。

因為這個理由，Vue使用了**Virtual DOM** 的概念。利用JavaScript物件紀錄現有的DOM結構，當資料狀態改變的時候建立Virtual DOM 與新的DOM結構，再利用演算法分析兩個DOM差異, 最後再根據紀錄來執行渲染的函式，完成實體DOM的更新。

Virtual DOM 的概念可以避免網頁效能低落。

#### ✒️組件化UI
在現代複雜的網頁開發中，網站可能會重複出現元素(卡片畫面、按鈕、表格等)，將重複的元素寫成一個 **組件(component)** 能使得專案較易於開發&維護。

Vue中的SFC(single file component)中分為三個部分: 
`<template>` `<script>` `<style>` 分別對應HTML、JavaScript、CSS 。 當定義好組件的內容後，透過import 的方式就可以**重複使用組件**。

### Vue 的特色
再了解為何要使用框架並選擇學習Vue後，不免俗的要來介紹Vue的特色。理解框架的特色&使用情境對於學習Vue有很大的幫助。

#### ⭐採用宣告式渲染
比起原生JavaScript 藉由DOM來更新UI的方法(指令式宣告)，Vue採用宣告式渲染(Declarative Rendering),
能讓開發者能更專注在UI & 資料的關係上。
- Counter範例
```js
import { createApp } from 'vue' 

createApp({ 
  data() { 
    return { 
	  count: 0 
    } 
  } 
}).mount('#app')
```
```HTML
<div id="app"> 
  <button @click="count++"> 
    Count is: {{ count }} 
  </button> 
</div>
```

#### ⭐響應式UI
Vue會自動追蹤JavaScript的state，並且有效率的更新DOM。

#### ⭐漸進式框架
Vue的**核心只關注在View layout的呈現**，並提供minimal且必要的功能給使用者。隨者開發上的需求的增加，可以再**引入其他的函式庫或工具**來處理各種功能，例如: vue-router處理前端路由、vuex的狀態管理等。

#### ⭐單檔案組件SFC
Vue支援以.vue為副檔名的檔案來定義一個完整的組件，SFC能清楚地將架構與組件的關係給分割。在複雜的專案中，SFC能有更高的可讀性&重複使用性。

## 總結
這周的內容就先整理到這邊，雖然有稍微玩了一下vue特有的各種神奇指令(v-bind、v-model等)，但我想先把重點整理過在打成文章。另外，我總覺得應該要分別用原生JS & Vue來製作一個小的專案後(例如ToDo app 之類的)，才能更加理解前端開發上使用框架的好處。