---
title: 第二周-JavaScript基礎&進階
outline: deep
lastUpdated: 2022-12-18
---
# 第二周-JavaScript基礎&進階
## 挑戰破功?
上週因為在準備AppWors School Campus Program 面試的關係就沒有出文章(~~挑戰才剛開始就失敗~~)，這周要好好來惡補一下進度。在前端學習的部分並沒有實際的計畫學習的內容，只有根據不熟的方面加減看一下。

這兩周課餘時間主要集中在JavaScript 進階 與 前端框架Vue 的學習，關於學習的內容我會拆成好幾篇來發。雖然希望可以忠實的呈現每一週的學習內容，但礙於時間比較零散，再加上單純紀錄容易變成流水帳，所以之後的學習內容重點整理可能會跨周分享。

希望學習紀錄&重點筆記的比例能各站50%這樣。



## 主要學習內容

### JavaScript 基礎
程式語言共有的基礎知識: 變數、陣列、迴圈、條件判斷式、function都大同小異，這方面沒什麼太大的問題，比較特別的是JavaScript的資料型別還分為六種基本(primitives) & Object，而最重要的就是Object.

#### Object
學習 Object 對完整了解 JavaScript 來說非常重要，在JavaScript中幾乎所有東西都可以是Object 。Object由 property(name) & Value 組成，可對應至其他程式語言中的 key-value pair 結構，如: Python 中的 Dictionaries、C 中的 Hash tables。因為其內容是由屬性(property)&值(value)所組成，具有易於閱讀的和處理的優勢，於是後來就設計出鼎鼎大名的JSON格式 (JavaScript Object Notation)。

網路應用的資料傳輸通常使用JSON格式，例如: server端傳送網頁資源到client端，client端瀏覽器再根據接收到的渲染網頁。了解JSON格式並熟悉"解析&字串化"能使之後學習使用 Fetch API 時更加容易。   

### JavaScript 進階
跟隨w3school官網的JS教學看看，並把Youtube上的進階教學影片看過一遍，這些主題是:
- Nested Funtion
- Closure
- this keyword
- Class
- Asynchronous JavaScript
	- Timeouts and Interval
	- Callbacks
	- Promise
	- async & await
	- Event Loop

Function 的進階應用對我來說是很新的觀念，像是**nested function & Closure**都是之前寫過的程式語言中沒有接觸過的概念。 "使用Closure達到funtion中的private variable 這件事"對於本身是從較為嚴謹的C++作為入門程式語言的我來說感到不可思議，因為這牽扯到var關鍵字所建立的變數是function scope，與其他語言的block scope不同。

另一個奇妙的點是通常function內的local 變數只會在function執行期間 "存在" ，然而 JavaScript  Closure的概念使得當nested function中 外部的function被invoked時，**該function 的 lexical enviroment 都會被建立&保留**，而local variable就包含在此lexical enviroment中。同一個function closure所形成的不同變數(常數)就具有不同的lexical enviroment，根據這個特性就可以達到類似OOP的概念。

除了function的新概念外，還包含this 關鍵字。若是從其他OOP(物件導向)語言轉過來學習JavaScript的人肯定會被this的概念混淆。this根據invoke的時機會有**各種不同的結果**，不過我也沒有仔細研究一遍，唯一能確定的是 (~~很多人都很困惑~~ )關於this的討論會另外寫成一篇文，在這邊就先不討論。

### Asynchronous JavaScript 
JavaScript另一個重要的進階主題是**同步&非同步**程式。
程式初學者學到的程式執行順序: 一行一行，從上而下，依序執行 就是最常見的synchronous程式。這類程式雖然直觀，但是當某一行指令或某一個function執行的時間較長時，就會使得程式阻塞(blocking)。但在Event 很多的網頁應用中，我們當然不希望網頁當掉或是某一個Button 按下去沒反應，因此就有了**Asynchronous 非同步**的概念。

>註: JavaScript 本身是synchronous、Blocked、single-thread language。

#### Timeouts & Intervals
藉由**Web API** 提供的Timeout method我們可以實現類似asynchronous的效果。
```JavaScript
function hello()
{
    console.log("world\n");
}
setTimeout(hello, 1000);
console.log('Hello');
```
使用`setTimeout( )` 可以讓function在經過特定時間後才執行，而且在等待的時間內不會阻擋到後面程式碼的執行。`setInterval( )` 也是類似的觀念，不過會持續執行直到程式結束或interval被取消。

這邊需要特別注意**等待時間是minimum delay 而不是guaranteed delay**(這牽扯到Web API 與 JavaScript底層的運作)，所以即使寫成 `setTimeout(fun, 0)` 也不能保證function會馬上執行。

#### Callbacks
callback如果單看中文翻譯名稱可能比較難懂，簡單來說就是一個函式接受另一個函式當作參數傳入，這麼做的好處就是可以讓函式控制參數函式的執行時機。
- 案例一
```JavaScript
function First(Fn){
	console.log(1);
	Fn();
}
function Second(){
	console.log(2);
}
First(Second);
//執行結果:
//1 
//2
```
這時候很多人可能會想，那為何不直接寫成這樣就好?
```JavaScript
function First(){
	console.log(1);
	Fn();
}
function Second(){
	console.log(2);
}
First()
Second()

//執行結果與上相同
```
雖然執行結果相同，但問題是當First Function的執行時間較長時會造成程式Block，而使用`setTimeout()` 又會造成順序不對(`Second()`先執行)。將函式寫成Callback的形式就可以搭配`setTimeout()` 使用，**進而確保程式在非同步執行的情況下，順序是對的**。

Callback雖然方便使用，但是當有過多的callback function會造成複雜的巢狀結構，使得程式碼變得**不易閱讀&維護**。
```JavaScript
fetchCurrentUser(`api/user`, function(result){
	fetchFollowersByUserId(`api/followers/${result.userId}`, function(result){
		fetchFollowerInterests(`api/interests/${result.interstId}`, function(result){
			//直到取得需要的資源.....
		})
	})
})
```

，進而造成**Callback Hell**。
為了避免callback hell於是後來又延伸出Promise的概念。

#### Promises
promise 是一個可以有不同狀態的JavaScript Object，分別是**pending, fulfilled, rejected**，我們可以依據不同的狀態來處理asynchronous code。Promise最大的用處是他提供`.then()` 與 `.catch()` 等method，而這兩者的回傳值皆為promise，可以方便地進行 *鍊式調用(Chaning)*。
```JavaScript
const promise = fecthCurrentUser('api/user');
promise
    .then(result => fetchFollowerSByUserId(`api/followers/${result.userId}`))
    .then(result => fetchFollowerInterests(`api/interests/${result.interstId}`))
    //持續直到取得需要的資源....
    .catch(/*rejected 處理*/)
```
使用promise可以很好的避免callback Hell，並且方便程式開發者撰寫Error Handling。

除此之外promise還提供一些實用method 如 `Promise.all( )` , `Promise.allSettled( )`, `Promise.race()` 來滿足現今網頁各種複雜的request。

關於Promise的內容可以寫好幾篇文章了，對於初學非同步程式的新手一次接觸這麼多的概念會需要不少時間消化，幸好當初在自學Flutter 框架的過程中就先接觸並且學習類似的觀念(在Dart 語言中叫做Future)，以至於我現在學習起還能應付得過來。關於非同步程式的學習筆記之後有空會再統整成新的文章來發表。

#### async/await
有了Promise的概念後，接者就要提到async/await。
用async關鍵字定義的function 會成為async function，其用意是使得function的回傳值為Promise；
而await關鍵字則能讓程式等待 async functoin 的 return 結果。

在這兩個關鍵字的搭配下就能**用synchronous code的寫法來撰寫asynchronous code**，來看以下範例。
```JavaScript
async function fetchData(){
    const user = await fetchCurrentUser(`api/user`);
    const followers = await fetchFollowersByUserId(`api/followers/${result.userId}`);
    const interests = await fetchFollowerInterests(`api/interests/${result.followerId}`);
    //持續直到取得需要的資源....
}
```
這樣的方法使得撰寫程式可以更直觀，並且可以直接套用try...catch() 來做例外處理。

### 其他學習
再有了上述提到各種基本概念後再去觀看Fetch API 的教學影片比較容易上手，因為涉及 JSON、Object、asynchronous等主題。不過我目前對於Fetch API 的了解僅止於 HTTP request ，詳細的應用還有待進一步學習。



## 總結

### 撰寫文字
我發現若在學習的過程中沒有主動做筆記，再撰寫文章的當下要寫出學習的總結整理還滿困難的。

再撰寫的過程還要重新打開已經看過的文章or影片複習，這與我理想中的寫作有點出入。以往的想法都是學習完成後便可以順利的寫下總結文章，然而事實卻是: **邊review，邊想總結，邊寫下文字**，這樣做花費了大量的時間。

在***卡片盒筆記*** 這本書中有提到，理想的寫作過程應該為學習的當下就在做統整筆記並與其他的知識做一個連結。而產出文章的方法為整理總結好的文字組合成段落&文章，換句話說，最後的步驟反而是最簡單的。若依據傳統的寫作方法從空白的紙張開始寫，會花上不少時間。~~這篇文章的內容大概花了我超過五小時~~   
不過我也還在嘗試新的產出方法，期望自己在學習之於也能產出高品質的文章給他人看。

### 持續學習
這篇紀錄的概念只佔前端工程的冰山一角，當真正投入心力學習就會發現涉及到的技術很廣，並且水很深。唯有持續不斷的學習才能在快速變化的前端工程領域不被淘汰。目前打算將更詳細的技術筆記單獨拉出來成為新的系列文章，這系列就專注在自己每周前端學習總結這樣。


那第二周的學習內容總結就到這邊，擱置的第三周文章我會盡快補齊(大概?)。