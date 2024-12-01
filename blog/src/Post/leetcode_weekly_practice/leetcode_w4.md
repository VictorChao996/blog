---
title: leetcode practice w4
outline: deep
date: 2024-12-01
lastUpdated: true
timespent: 170	
---
# Leetcode Practice w4

## 前言
本週是 leetcode weekly practice 的第四週, 因為這週有額外的事情佔用掉時間, 所以我挑了之前有寫過且相對單純的題目來分享( ~~讓我偷懶一下~~)。

總共三題, 其中２ 題 Easy , 一題 Medium, 多少都與**計數**這個概念相關, 那我們一樣直接進入題目環節。 

## 題目

### Contain Duplicate
Leetcode [第 217 題](https://leetcode.com/problems/contains-duplicate/description/), 以下為原文：
```
Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true
Explanation:
The element 1 occurs at the indices 0 and 3.

Example 2:
Input: nums = [1,2,3,4]
Output: false
Explanation:
All elements are distinct.

Constraints:
1 <= nums.length <= 105
-109 <= nums[i] <= 109
```
題目要求：
*給一個只包含整數數字的陣列, 若該陣列包含重複的數字則返回 true, 否則返回 false。*

這個題目我能想到的一共有四種解法, 分別是:
1. brute force
2. sort
3. bucket count
4. hash_map count。

下面來分享其中的三種解法。

第一個 brute force 暴力解只要有基礎程式基礎就能想到的, 依序兩兩比較陣列中所有元素構成的排列組合, 來判斷是否 duplicate, 

以下為 brute force 參考解。
```JS
function containDuplicate(nums){
	const size = nums.length;

	for(let i=0; i < size; i++){
		for(let j=0; j < size; j++){
			if(i === j)
				return true;
		}
	}

	return false;
}
```

這麼做很直觀, 但是因為用了兩層回圈, 平均時間複雜度為 `O(n^2)`, 當陣列長度非常的大時, 會執行比較久。

這邊我們換個思路, 這一題重點不在兩兩比較,而是在找出重複的數字 , 所以這邊可以換成統計數字出現的次數。根據題目的限制, `-109 <= nums[i] <= 109` 且陣列只會包含整數數字, 換句話說, 陣列元素只會出現 `-109,-108, ..., -1, 0, 1, ..., 109` 共 219 個整數。於是乎我們可以建立一個大小為 219 的 array 來分別統計這寫整數出現的次數, 就像是投球進指定號碼的 bucket 一樣, 當任一 bucket 中有超過兩個以上的球時, 代表陣列出現重複的數字。

以下為 bucket count 參考解:
```JS
function containDuplicate(nums){
	const size = nums.length;
	const buckets = new Array(219).fill(0);

	//統計數字 (投球進指定 bucket)
	for(let i=0; i < size; i++){
		bucket[nums[i] + 109]++;
	}
	//遍歷 buckets 檢查是否重複 
	for(let i=0; i < buckets.length; i++){
		if(bucket[i] > 1)
			return true;
	}

	return false;
}
```

利用 bucket 的概念, 這邊用額外的空間來換取時間, 使得平均時間複雜度降為 `O(n)` 。這個解法的概念較好了解, 也比較容易想到, 但是當 bucket 太大時, 會浪費很多額外的空間來計數時 (例如：陣列數字上下限變高, 或是陣列包含浮點數) , 此方法就不太適合。

我們可以繼續沿用計數的概念, 只不過這次是使用 hash_map 來做, 以下為參考解:
```JS
function containDuplicate(nums){
	const size = nums.length;

	const m = new Map();

	for(let i=0; i < size; i++){
		//若當前 nums[i] 在 map 中有紀錄, 則代表數字重複出現
		if(m.get(nums[i])){
			return true;
		}
		m.set(nums[i], 1);
	}
	return false;
}
```

因為 hash map 的新增  & 查詢都是 constant time, 所以此參考解的平均 Time Complexity 為 `O(n)`, Space Complexity 則為 `O(n)` （與 array size 等大）。**用 map 方法紀錄的好處為, 可以不被局限於數字, 而是可以利用 key:value 的結構, 儲存任意字元的計數**。這個好處可以從要分享的下一題中展現。


### Valid Anagram
Leetcode [第 242 題](https://leetcode.com/problems/valid-anagram/description/), 以下為原文：
```
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 
Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
```
題目要求：
*給兩個 input 字串 s & t, 若兩字串互為 anagram（相同字母異序詞） 則返回 true, 否則 false。*

這題我能想到的有兩個解, 分別是 **sort 解** 與 **計數解**。
anagram 名為相同字母異序詞, 兩個字串若互為 anagram 則表示說, 兩者所包含的字母數量相同, 只不過是字母順序不同。換句話說, 兩個字串依據字母排序過後會相同, 利用這個想法可寫出以下參考解:

```JS
function validAnagram(s, t){
	let temp1 = s.split('').sort().join('');
	let temp2 = t.split('').sort().join('');

	if(temp1 = temp2)
		return true;
	return false;
}
```

上面這個解法雖然直觀, 但平均 Time Complexity 是基於 sort() 的方法, 為 `O(nlogn)`。換個思路, 其實判斷 anagram 的重點不在於字母中的順序, 而是字串中的各字母數是否相同, 基於以上的想法, 我們可以直接統計字串中各字母出現的次數, 最後再兩兩比較即可。以下為參考解:

```JS
function validAnagram(s, t){
	let m1 = new Map();
	let m2 = new Map();

	if(s.length != t.length)
		return false;
	//build the map
	for(let i=0; i < s.length; i++){
		if(m1.get(s[i]) == undefined)
			m1.set(s[i], 0);
		if(m2.get(t[i]) == undefined)
			m2.set(t[i], 0);
		m1.set(s[i], m1.get(s[i]) + 1);
		m2.set(t[i], m2.get(t[i]) + 1);
	}
	
	for(let i=0; i < s.length; i++){
		if(m1.get(s[i]) != m2.get(s[i]))
			return false;
	}

	return true;
}
```

這個 map 解是不是很熟悉? 其實就類似上面一題 Contain Duplicate 的 Map 計數解, 只不過這邊需要完整紀錄 map 後再做比較, 而前一題則相對單純, 看到重複可以直接 return。

此方法的 Time Complexity 為 `O(n)` , Space Complexity 則為 `Max(O(s.size), O(t.size))`。


### Group Anagram
Leetcode [第 49 題](https://leetcode.com/problems/group-anagrams/description/), 以下為原文：
```
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
```
題目要求：
*input 給一個字串陣列, 將互為 anagram 的字串放在同一陣列中並返回 group 後的結果（二維陣列), return 結果沒有順序之分。 陣列至少會有一個字串, 其中字串大小可為 0 (空字串)* 

這一題若有寫過前一題 Valid Anagram 的話, 那其實此題就是該題的延伸版 (可以說是做比較多次?),一樣可以分為 sort 解 & Map 解兩種。以下為 sort 解的參考解：

```JS
function groupAnagram(strs){
	let sorted_array = [];
	let map = new Map();
	let result = [];

	//sort strings in strs
	for (let i = 0; i < strs.length; i++) {
		const sorted_str = strs[i].split("").sort().join("");
		sorted_array.push(sorted_str);
	}

	//建立 map
	for (let i = 0; i < sorted_array.length; i++) {
		if (map.get(sorted_array[i]) == undefined) {
			map.set(sorted_array[i], []);
		}
		let temp = map.get(sorted_array[i]);
		temp.push(i);
		map.set(sorted_array[i], temp);
	}

	//根據 map 結果返回 result
	for (const [key, value] of map) {
		// console.log(`key: ${key}, value: ${value}`);
		const indexs = value;
		let temp = [];
		for (let i = 0; i < indexs.length; i++) {
			temp.push(strs[indexs[i]]);
		}
		result.push(temp);
	}
	return result;
}
```

參考 sort 解可以分為主要三個步驟： 1. sort 2. 建立 map 3. 根據 map 返回 result, 分析時間複雜度我們可知道 sort 的 Time Complexity 及決定了整個 function 的 Time Complexity 為 `Ｏ(ｍ* LlogL)`, 其中 m 為 strs 大小, LlogL 為各別字串的排序。

與 Valid Anagram 題目類似, 此題一樣可以用記數來判斷兩個字串是否互為 anagram, 於是就有了第二種解法, 以下為參考解:

```JS
function groupAnagram(strs){
	let map = new Map();
	let result = [];

	//sort strings in strs
	for (let i = 0; i < strs.length; i++) {
		const count = new Array(26).fill(0);
		//統計各字母出現的次數
		for (let c of strs[i]) {
			count[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
		}
		const key = count.join(".");
		if (map.get(key) == undefined) map.set(key, []);
		let temp = map.get(key);
		temp.push(strs[i]); //直接存原始字串
		map.set(key, temp);
	}

	//build resort
	for ([key, value] of map) {
		// console.log(`key: ${key}, value: ${value}`);
		result.push(value);
	}

	return result;
}
```

此解法的重點在於將 count 陣列作為 map 的 key, 因為 anagram 各字母計數相同的關係, 此時 map 中相同 key 及代表互為 anagram 。根據這個規則依序遍歷 strs 將所有字串都做一個分類後, 做後在統一放到 result 陣列中返回即為解答。

這邊特別的一點是, bucket 計數這個概念又再次作為 Sort 的平替出現, 雖然犧牲了一些額外空間, 但是時間複雜度可以跟原本的 sort 比起來還是相對較低的, 類似的思考在 [leetcode w2#1. Missing Number](./leetcode_w2.md#missing-number) 中也有提到, 從這可知 sort & bucket 要處理的問題類似時可互相轉換, 但不是絕對。

利用 bucket 我們可以有效的將 Time Complexity 降至 `O(m * n)`, 其中 m 為 strs 的大小, n 為最長的 str[i] 字串長度。Space Complexity 則為 `O(m * 26)` (額外為每一個 strs 中的字串都建立 count 陣列用於統計), 省略後為 O(m)。

## 結語
本週的三個題目雖然相對單純, 但是也是非常值得練習的, 每一題都會碰到計數的概念, 有計數就代表 bucket 或 hash_map 也有機會跟著出現。剛好這三題每一題的參考解都有用到 Map , 就當作是對 JS Map 的練習吧, 畢竟比較少使用, 通常都是用 JS object 來處理所有 key: value 型別的的資料了 (如： JSON data)。

印象中 JS Object & Js Map 還是有滿大的差異的, 例如後者的 key 接受任何型別, 但是前者比較必須為 String (或是 simple type) 。這些 language specific 的 details 真的只有多寫才會比較清楚, 下次遇到題目的時候才能對要選擇何種資料結構有較快的反應。

那本週的分享就先到這, 下週繼續～