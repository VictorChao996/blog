---
title: Leetcode practice w1
outline: deep
date: 2024-11-10
lastUpdated: true
timespent (min): 120
---

# Leetcode Practice w1
## 前言
再開篇文章 [Leetcode weekly practice](./leetcode_weekly_practice_challenge.md) 中有提到說要搭配每週寫的三個題目去寫作分享回顧, 所以這篇文章會是這個週挑戰的第一篇文章。老實說在準備出這個系列文章前就有開始陸續寫一些題目, 但中間有中斷個一兩週, 果然跟開篇文提到的一樣, 有可能連每週寫三題題目的目標都沒達到, 更不用說還要多寫這些文章了。 

這一兩天又重拾寫題的行動, 為了降低轉換的成本, 會先從較近的題目開始回顧 ,比較沒有阻力。也有可能是混合之前寫過 & 當週寫的題目進行分享這樣, 陸續把開篇之前寫過的題目慢慢補回來。

那麼廢話不多說, 馬上進入題目環節。

## 題目

### 1. Best Time To Buy And Sell Stock
leetcode 題目第 [121 題](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/), 以下為原文

```txt
You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

**Constraints:**

- `1 <= prices.length <= 105`
- `0 <= prices[i] <= 104`
```

題目要求：給一個一維的數字陣列, 其中的數字代表股價在第 i 天的價格, 求這段時間內的最大利益 (只能各挑選一天買與賣的情況下)。

這題最暴力的解法為用雙層 for 回圈直接一一比較所有的買與賣點的差價即可以找出最大利益, 不過這樣 Time Complexity 為 O(n^2), 效率不好。

我們可以利用**買低賣高的特性**來選擇適當的買點, 再加上時間流向的單向性, 可以巧妙的用 one pass , 也就是 O(n) 達到一樣的要求！下面來看參考解法～

```JS
function findMaxProfit(prices){
	let buyPoint = 0, maxProfit = 0;

	for(let i=0; i < prices.length; i++){
		//更新 maxProfix
		if(prices[i] - prices[buyPoint] > maxProfit)
			maxProfit = prices[i] - prices[buyPoint];
		//有更低點時更新買點
		if(prices[i] < prices[buyPoint])
			buyPoint = i;
	}

	return maxProfit;
}
```
這邊 follow 一個策略, **買低賣高, 盡可能的選擇價格較低的買點**, 雖然無法保證下一個高點一定會出現使得 maxProfit 有所提升, 但是遇到更低點就選擇新買點是正確的, 因為這樣才會使得 profit 最大化。舉個例子: [5,4,3,2,1,10] , 遇到更低的值就選擇新的買點上來看, 10-1 比起 10-5 要來的大, 從這個例子就可以看到, 無論是否出現新的高點 (value 10), 更換買點這個策略是正確的, 因為有另一個變數 maxProfit 在紀錄最大利益, 所以可盡情地更換下一個買點。

這題目真的滿有意思的,明白概念後就完全不會忘的那種。不過關於最大利益計算可惜的是, 就算知道過去哪一段時間有買進賣出有最大利益也沒真的操作, 除非有時光機可以回到當時的最佳賣點賣掉股票, 但可惜的是, 沒辦法呢。

### 2. Valid Parentheses
leetcode 題目第 [20 題](https://leetcode.com/problems/valid-parentheses/), 以下為原文
```txt
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

**Constraints:**

- `1 <= s.length <= 104`
- `s` consists of parentheses only `'()[]{}'`.
```

題目要求: 給一個只包含六字元分別是 {,[,(,),],} 的字串, 求這個字串的括號組合是否合理。這邊的合理是基於**左右括號的是否能配對**來看, 舉個例子: "{ (  ) }" 可以, 但 "{ ( } )" 因為左右配對不上, 所以不合理。

從上述例子可以發現, 並不能無腦的使用統計相同類型的左右括號來判斷字串是否合理。觀察括號字串可以發現, 在都是左括號的情況下, ith 較大的字元會優先成功配對, 換句話說, 我們需要一個資料結構來滿足: 
1. 能儲存待配對的左括號
2. 可以滿足後到者優先配對的
這時 stack 資料結構就派上用場了, 有者 FILO (First In Last Out) 的特性, 剛好符合上面的要求, 滿足後到者優先配對 (也可理解為先到者最後配對) 的特性, 來解這個問題。

```JS
function isValidParentheses（s){

	//奇數肯定無法配對成功
	if(s.length%2 !== 0)
		return false;

	let stack = [];
	for(let i=0; i<s.length; i++){
		if(s[i] == "{" || s[i] == "[" || s[i] == "("){
			stack.push(s[i]);
		}if (s[i] == ")") {
			if (stack.pop() != "(") return false;
		} else if (s[i] == "]") {
			if (stack.pop() != "[") return false;
		} else if (s[i] == "}") {
			if (stack.pop() != "{") return false;
		}
	}


	return stack.length == 0; 

}
```

這邊就抓住一個原則, 遇到左括號就加進 stack 中 (等待配對右括號), 遇到右括號就直接 pop stack 並做比較, 若配對失敗 (表示兩種狀況: 1. 符號不對 2. 無符號) 此時就不用再比對下去。

當然如果覺得 pop 那段過於重複也可以優化成下面的 code, 好處是不管新增多少組括號或符號來配對只要新增數組即可, 比上面的 if-else 結構好很多。

```JS
function isValidParentheses（s){
	if(s.length %2 == 1) return false;

	let stack = [];
	let parentheses = {
		")":"(",
		"]":"[",
		"}":"{"
	};

	for(let i=0; i<s.length; i++){
		if(parentheses[s[i]]){
			if(stack[stack.length-1] == parentheses[s[i]]){
				stack.pop();
			}else{
				return false;
			}
		}else{
			stack.push(s[i]);
		}
	}

	return stack.length == 0;
}
```



### 3.  Min stack
leetcode 題目第 [155 題](https://leetcode.com/problems/min-stack/description/), 以下為原文

```txt
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

**Constraints:**

- `-231 <= val <= 231 - 1`
- Methods `pop`, `top` and `getMin` operations will always be called on **non-empty** stacks.
- At most `3 * 104` calls will be made to `push`, `pop`, `top`, and `getMin`.
```

題目要求：給一個 min-stack 的定義 & 包含的 method, 根據限制條件實作所有的 method 。

如果不需要手搓 stack 資料就夠的話, 這題還算單純, 與原本的資料結構 stack 類似, 但特別的是多加了一個 `getMin( )` method。問題的關鍵在於, 如何在 O(1) 的 time complexity 下取得 stack 中的 min value。若是呼叫的時候才找 minValue, 至少要 O(n) one pass array 才有辦法得知 min, 不符合限制。

當初在解的時候第一個想法為, 用一個變數存 minValue, 當新的值加入到 stack 時比較並更換 minValue, 這樣 `getMin()` 就能在 O(1) 實現。看是合理卻沒有考慮到 pop( ) 後的狀況, `pop( )` method 有機會剛好把 minValue 給 pop 出去, 此時就會遇到新的問題, **原本的 secondMinValue 是誰 ?** **誰是下一個 minValue?**

有鑑於此, 我們需要有另一個資料結構來記錄**隨著 stack 更新的 minValue** , 好讓 pop 的時候也能跟著更新 minValue。以下為參考 solution。

```JS
var MinStack = function () {
	this.stack = [];
	this.minStack = [];
};

MinStack.prototype.push = function (val) {
	this.stack.push(val);
	let lastMin;
	if (this.minStack.length == 0){
		 lastMin = val;
	}else{
		lastMin = this.minStack[this.minStack.length - 1];
	}
	
	val = Math.min(val, lastMin);
	this.minStack.push(val); //紀錄加入新 val 後的最新 minValue 值
	return;
};

MinStack.prototype.pop = function () {
	this.stack.pop();
	this.minStack.pop();
	return;
};

MinStack.prototype.top = function () {
	return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
	return this.minStack[this.minStack.length - 1]; //直接取最後一位即可
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
```

這邊利用另一個新的 stack (姑且叫他 min-stack) 來記錄隨著 stack push 而變動的當前 minValue 值, 並會隨著 stack pop 跟著 pop, 利用額外的空間犧牲換取每個 method 都能夠在 Time Complexity  O(1) 做完。 

## 結語
這週回顧了三題前段時間寫過的題目, 這些題目滿有意思的, 不會到說非常複雜, 卻又可以看到一個好的算法 ＆ 資料結構以非常簡潔的方式解決題目的問題。那這週就先這樣, 下週再繼續分享新的三題。