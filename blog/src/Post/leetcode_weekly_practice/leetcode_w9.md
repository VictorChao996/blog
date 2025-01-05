---
title: leetcode practice w9
outline: deep
date: 2025-01-05
lastUpdated: true
timespent: 195
---
# Leetcode Practice w9
## 前言
本週是 leetcode weekly practice 的第 9 週, 這週一樣繼續來分享 Blind 75 的題目。總共三題, 其中1 題 Easy , 1 題 Medium, 1 題 Hard ,每個都與**Binary Tree**有關, 那我們一樣直接進入題目環節。 

## 題目

### 1 -  Same Tree
Leetcode [第 100 題](https://leetcode.com/problems/same-tree/), 以下為原文：
```
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false
 
Constraints:
The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104
```
![](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg)
> ex1 graph

![](https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg)
> ex2 graph

題目要求：
*給兩個 binary tree 的 root node, 判斷兩個 tree 是否結構上相同, 若相同回 true, 若不同則回 false*

這題敘述簡單且單純, 比較兩個 binary tree 是否一樣, traverse 方式看個人喜好, 用 BFS 或 DFS 都可。我們可以將大問題拆成小問題, 這個 same tree 本身可以拆成 左子樹是否為 same tree + 右子樹是否為 same tree + root node 是否相等。接者我們考慮 root node 比較上可能會出現的狀況：
1. **兩個 root node 值相等**
2. **同時為 null**
3. **兩者不相等**
4. **一個為 node 另一個為 null**

只要妥善處理上面四種狀況, 並將問題拆成子問題遞迴便可得到解答, 來看以下參考解：
```JS
function sameTree(p, q){
	if(!p && !q) return true;
	if(!p || !q) return false;
	if(p.val != q.val) return false;

	return sameTree(p.left, q.left) && sameTree(p.right, q.right);
}
```
觀察參考解, 其中兩個 node 皆為 null 的狀況剛好可以當作遞迴的終止條件, 而只有當 root node 相等時我們才接者遞迴繼續看 p & q 的左右子樹是否相等, 最終直到碰到 left node。

既然能用 recursive 的方法 traversal 所有 node, 我們當然也能用 BFS 的方式來遍歷比較：

```JS
function sameTree(p, q){
	const q1 = [p];
	const q2 = [q];
	while(q1.length > 0 && q2.length > 0){
		let n1 = q1.shift();
		let n2 = q2.shift();
		if(!n1 && !n2)
			continue;
		if(!n1 || !n2)
			return false;
		if(n1.val != n2.val)
			return false;
		q1.push(n1.left);
		q1.push(n1.right);
		q2.push(n2.left);
		q2.push(n2.right);
	}

	return true;
}
```
> 註：JS 語言沒有內建 queue, 需要使用第三方 library, 上述參考解用 list 替代 (Time Complexity 不同需注意)

以上兩個參考解的 Time Complexity 為 O(n), Space Complexity 也為 O(n) or O(h) （h 為 binary tree 的高度, recursive 實作）。

### 2 - Validate Binary Search Tree
Leetcode [第 98 題](https://leetcode.com/problems/validate-binary-search-tree/), 以下為原文：
```
Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:
1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and right subtrees must also be binary search trees.
 

Example 1:
Input: root = [2,1,3]
Output: true

Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
 
Constraints:
The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
```
![](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)
> ex1 graph

![](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)
> ex2 graph

題目要求：
*input 一個 binary tree 的 root node, 判斷此 tree 是否為合法的 binary search tree, 對於此 tree 中所有的 node 皆滿足 left sub tree 所有的 node 小於該 root node, 而 right sub tree 中所有的 node 皆大於此 root node*

這題滿有趣的, 看完題目後就先去忙別的事, 讓大腦在背景思考思考, 結果很意外地想到以前課堂上交的 inorder, preorder, postporder traversal (參考下方示意圖)。

![[inorder_preorder_postorder.excalidraw]](./img/inorder_preorder_postorder.excalidraw.png)


思考後發現, 一個合法的 binary search tree 在 inorder traversal 下會 node value 會呈現排序過的樣子, 以原題 example 1 為例, inorder 為 [1,2,3], 所以為 true, 而以 example 2 為例, inorder 為 [1,5,3,4,6] 所以為 false。
來看以下參考解：
```JS
function validateBinarySearchTree(root){
	const values = [];
	//inorder traverse tree
	function inOrder(node){
		if(!node)
			return;
		inOrder(node.left);
		values.push(node.val);
		inOrder(node.right);
		return;
	}
	inOrder(root);
	if(values.length < 2)
		return true;
		
	//check if list is sorted
	for(let i=1; i<values.length; i++){
		if(values[i-1] > values[i])
			return false;
	}
	return true;
}
```

以上參考非常簡單巧妙, 不過要先對 inorder, preorder, postorder 有個理解就是了。上述參考解的 Time Complexity 為 O(n), Space Complexity 為 O(h+n) => O(n) (會用到額外的空間存 value)。

以下再提供一種同樣巧妙但是不用額外空間 （recursive stack 外）的解法：
```JS
function validateBinarySearchTree(root){
	function valid(leftBound, rightBound, node){
		if(!node)
			return true;
		if(!(leftBound < node.val && node.val < rightBound))
			return false;
		return valid(leftBound, node.val, node.left) && valid(node.val, rightBound, node.right);
	}
	return valid(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

```

上述解法巧妙的點就在利用 binary search tree 的的特性來決定每次遞迴時動態調整的上下邊界, 一旦有 node 值在合理的區間之外, 代表沒有符合 BST 的條件。依據上述規則去遞迴檢查每一個 node 
, 最終完成判斷 input tree 是否為 BST。此解法的 Time Complexity 為 O(n), Space Complexity 為 O(h) => O(n)。

### 3 - Binary Tree Maximum Path Sum
Leetcode [第 124 題](https://leetcode.com/problems/binary-tree-maximum-path-sum/), 以下為原文：
```
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 
Constraints:
The number of nodes in the tree is in the range [1, 3 * 104].
-1000 <= Node.val <= 1000
```
![](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)
> ex1 graph

![](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)
> ex2 graph

題目要求：
*定義 node & node 之間的相連為 edge, 彼此相連的 node 叫做 adjacent node, 而數個 adjacent node edges 相連形成 path （其中每一個 node 至多只會相連兩個 edges ）。 定義 path sum 為經該 path 中所包含的 node 之 values 總和。 input 一個 binary tree 的 root node, 求其中的 maximum path sum （其中  node value 從 -1000 ~ 1000）*

這題真的滿難的, 不愧為 Hard, 想了半天都沒有什麼想法, 於是去翻看 Hint。稀裡糊塗的看到了關鍵想法, 包含 node 的 maximum path 有幾種可能：
1. 同時包含左右子樹與 node
2. 只包含左子樹與 node
3. 只包含右子樹與 node

得到提點的我便在沒有詳細思考下根據上述三種可能實作遞迴程式, 心想難到就這？結果就是大部分 test case 沒有過, max path sum 數字計算對不上。

仔細思考就會發現, **只用上面三個可能去構建 maximum path sum 會有一個盲點, 那就是加總出的 value 有機會不屬於 "合法的 path"**。什麼意思？設想一個情境, 遞迴從 Bottom Up 構建 max path sum 時首先出現 1 這個可能, 當該 node 的 parent node 又為 1  這個可能時, 此時計算值會有 node 有三個 edges 相連, 這樣將不是一個合法的 path （參考以下示意圖）。

![[leetcode_124_binary_tree_maximum_path_sum_g1.excalidraw]](./img/leetcode_124_binary_tree_maximum_path_sum_g1.excalidraw.png)
>從上圖中可以看到計算的結果如螢光筆所連接起並不是一個合法的 path （其中 node 20 有三條相鄰的邊）

從以上示意圖中得知, 只考慮原先三種的可能是不足的, 其實還缺少兩種可能, 那就是 Parent-node-left 或 Parent-node-right。當出現 parent 連接 node 時, 勢必只能選能左右子樹其中一個結果, 問題在於要如何有效的寫成遞迴的方式呢？

我們可以在遞迴計算的時候分開計算 result 值與要回傳的值, 來看以下參考解：
```JS
function maxPathSum(root){
	let result = -10000;
	//find valid max path for current node
	function traverse(node){
		if(!node) return 0;

		const leftMax = traverse(node.left);
		const rightMax = traverse(node.right);
		const currentNodeMaxPath = Math.max(
			node.val + maxLeft,
			node.val + maxRight,
			node.val + maxLeft + maxRight,
			node.val
		);
		//Note: max valid path 可能出現在 tree 的任意位置, 持續更新紀錄最大值
		if(currentNodeMaxPath > result) result = currentNodeMaxPath;
		//Note: 對於此 node 的 parent node 來說, 只有以下三種能與 parent 形成 valid path
		return Math.max(node.val, node.val + maxLeft, node.val + maxRight);
	}
	const temp = traverse(root);
	if(temp > result) result = temp;

	return result;
}
```

上述參考解中用 `traverse( )` 來遞迴求當前 node 的**合法 max Path**, 在遞迴的過程中會去計算四種可能性的最大值, 並持續更新 result。而這邊的關鍵在於, `traverse( )`的 return 值需要剔除會使得 parent node 採用時形成的 invalid path 狀況 （也就是 left-node-right), 已確保 traverse 計算的值正確無誤。當用 `traverse( )` 遍歷完所有的 node 時, 最終便能得到此 tree 的 max path 結果 （不一定包含 root）。

以上參考解的 Time Complexity 為 O(n), Space Complexity 則為 O(logN) ~ O(n) （看樹高決定遞迴）

## 結語
2025 新年的第一篇 leetcode 挑戰文, 也是 2025 blog 的第一篇文章 ! 2024 年末的時候有發生些有趣的事, 是之前沒有的體驗, 等之後時間比較充裕且確定之後再來寫一篇文來分享分享。下週的 leetcode 挑戰看心情, 也許會換成別的類型的題目, 或是繼續分享  tree 相關的題目, 不過一樣都是 Blind 75 中的題目。那本週的 leetcode 挑戰分享就到這邊了, 下週繼續～