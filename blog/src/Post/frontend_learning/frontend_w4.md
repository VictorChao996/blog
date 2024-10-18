---
title: 第四周-vue基礎
outline: deep
lastUpdated: 2023-01-08
---
# 第四周-vue基礎
## 前言
上週學習的內容主要是Vue框架的基礎，在學習入門的過程(包含看書本、看教學影片、官方教學、文件等)時發現自己對於原生JS還不夠熟悉，以至於沒有辦法有效率的學習框架，或體會到使用前端框架的好處。僅能從其他人的介紹中得知使用Vue框架的一些好處。

雖然看了許多基礎內容，但有鑑於現階段學習Vue 會遇到相對尷尬的問題就是Vue 2 & Vue 3的不同。並且Vue 3 新增的Composition API 寫法又會使得跟著網路教材學習起來相對不太容易。有鑑於版本&不同的API風格，以下就整理一些Vue的共通觀念。

---

## 主要學習內容

### MVVM 架構
以前有聽過MVC架構，也就是model-view-controller，是一種將應用程式分割成三種不同邏輯元件的**設計模式**，有助於專案的協作開發。而不同的MVC架構，Vue參考了MVVM架構的設計，那什麼是MVVM架構?

![Vue MVVM 架構圖](./img/mvvm.png)


MVVM為**model-view-viewmodel**的縮寫，這三者分別代表不同的邏輯元件。對應到網頁開發可以將其整理成一下的重點
- Model:
	- 資料處理
	- Plain JavaScript Object
- View:
	- 網頁畫面
	- DOM
- View Model
	- 實現DOM Listener
	- 實現 Data Bindings 

Vue的核心功能就是扮演View model的角色，經由宣告式(聲明式)的渲染就可以不用親自的操作DOM。藉由Vue能使工程師更專注於UI & Data的在網頁上的呈現，並且程式邏輯能更專注於data的處理，而不是在思考要如何操作DOM。

### Vue的特殊語法
vue有兩種特殊的語法用於幫助程式設計師撰寫比起原生JS更簡潔的&更有效率的執行程式 **(借助Virtual DOM的力量)**。

#### 插植語法
- 功能: 用於解析**標籤體內的內容**
- 寫法: `{{ }}` ，用於接收data中的所有屬性
#### v-指令語法
- 功能: 用於解析標籤(標籤屬性、綁定事件)
- 例: `<v-bind:href="url">` 

其中插植語法提供了顯示單向綁定(data->UI)的功能，而使用v-指令語法則可以具有各種綁定功能(雙向綁定、事件綁定、樣式綁定、條件渲染等)

### 常見V-指令
善用v-指令可以大大的降低程式碼的長度，下面整理了一些基礎常見的v-指令。

#### v-bind
使用插植語法可以很方便地將data屬性中的資料(Options API) 或 ref( )與reactive()的資料(Composition API)的資料應用在HTML tag的內容中。但插植語法卻沒有辦法在HTML tag 的attribute上，有鑑於此，Vue提供了v-bind指令，可以將data用於屬性上。

利用v-bind指令即可實現動態調整CSS樣式或tag屬性。
範例: 動態指定image URL
```vue
<template>
	<div id="app">
		<img v-bind:src="url">
	</div>
</template>
<script>
export default{
	data(){
		return {
			url: "./image.png"
		}
	}

}
</script>

```
因為太常用所以Vue提供的簡寫，例如下面兩者寫法是一樣的。
```vue
<img v-bind:src="url">
<img :src="url">
```
#### v-on
vue也提供了綁定事件的指令v-on，以下為最簡單的事件範例。
```vue
<button v-on:click="doThis"></button>
```
這時有些人可能會想，那這樣不就跟原來將onclick寫在HTML上面無差別嗎?
```HTML
<button onclick="doThis"></button>
```
舊的寫法將綁定事件寫死在HTML標籤中，相較於將HTML與JS分開的寫法**缺乏彈性與可變性**，於是之後就藉由DOM來綁定事件。
```JavaScript
var btn = document.querySelector(.btnclass);
//事件綁定方法一
btn.onclik = function(){

}
//事件綁定方法二: 使用addEventListener
btn.addEventListener('click', functoin(e){
	console.log(e);
	e.preventDafult();
});
```

雖然分開HTML & JS 有諸多好處，但vue提出的component概念的主要目的為減少DOM的操作，且希望開發者能藉由觀看`<template>`就明白UI 介面&事件觸發的關係，於是就產生了類似在HTML上指定屬性的寫法。不過v-on的好處是提供了JS event相關常用的修飾子。例如上面的btn事件綁定可以寫成:
```vue
<button v-on:click.prevent="fun"></button>
```
處此之外還有`.stop` `.once` `.capture` 等與 JS event機制有關的設定。

 因為事件綁定很常用所以vue也提供了縮寫符號: @
```vue
<button @click.prevent="fun"></button>
<input @keyup.enter="onEnter"/>
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
//可以使用在component上
<MyComponent @my-event="handleThis" />
```

#### v-if/v-show
vue提供了條件渲染指令，可以根據指定的value來決定是否要渲染template到頁面上。
- 範例:
```vue
<div v-if="isShow">v-if content</div>
<div v-show="isShow">v-show content</div>
```
兩個指令所達到的效果都是控制元素是否出現在畫面上，然而他們實作的方法不同，**前者是會直接移除HTML element，後者則是使用CSS屬性來隱藏**。

兩者使用情況比較如下:
- v-if
	- 可搭配`v-else-if`, `v-else` 使用
	- 適用結果幾乎不變的情況，以此降低browser的渲染&DOM生成成本。
- v- show
	- 適用DOM狀態需要被保留的情況
	- 適用DOM狀態會頻繁更動的情況
#### v-for
除了一般的條件渲染，vue也提供了方便列表渲染的指令。可以讓開發者以更簡便&直觀的方式撰寫template(HTML)

- 範例1: 根據reactive data來渲染HTML
```vue
<div id="app">
	<ul>
		<li v-for="item in arr">{{ item }}</li>
	</ul>
</div>
```

- 範例2: 條列顯示物件(Object) 資料
```vue
<div id="app">
	<ul>
		<li v-for="(item, index) in arr">{{ index }} / {{item}}</li>
	</ul>
</div>
```

有了v-for指令就能**減少手動更新list的data & 更新畫面的步驟**(繁複的DOM 操作)，讓開發者能更專注在data 與 UI 的關係上。

#### v-model
最後也是最重要的雙向綁定指令，在高互動性的網頁中，表單類型的元素是不可或缺的(例: ` <input> 、<textarea> 、<select>`等)。不同於v-bind只能實現單向綁定，v-model實現了真正的雙向綁定，不過它本質上是一種語法糖。

範例: 當在輸入框中打字，下方文字會立即更新。
```vue
<template>
	<div>
		<input type="text" v-model="value"/>
		<p>Value: {{ Value }}</p>
	</div>
</template>

<script>
import {ref} from 'vue'

const value= ref('')
</script>
```

v-model 指令語法糖本質上就是v-bind & v-on 指令做結合使用。
```vue
//兩者本質上相等
<input v-model="msg">

<input v-bind:value="msg" v-on:input="msg = $event.target.value">
```
實際上v-model在做的事情就是上面提到的MVVM架構中的ViewModel。

---
## 結語
以上就是一些簡單的關於vue基礎知識的總結。在學習的過程中發現自己對原生 JS 不是說到非常熟悉，以至於在學習有關event的內容是會卡住。也因為還不熟悉JS 事件&事件處理的精隨，以至於無法深刻體會Vue 中 v-指令帶來的好處。

現在清楚明白自己JS的基礎知識還讀的不夠深入，我認為目前不太適合繼續學習Vue相關的知識。所以下面幾周的學習內容應該會著重在**JS 進階 & Web API 相關的知識**去做學習。



圖片來源: [MVVM] https://v1-cn.vuejs.org/guide/overview.html