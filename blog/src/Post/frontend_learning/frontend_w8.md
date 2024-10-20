---
title: 第八周-複習 JS & 初步認識 AWS
outline: deep
lastUpdated: 2023-02-13
date: 2023-02-13
---
# 第八周-複習 JS & 初步認識 AWS

## 前言
這周還是繼續地在觀看Udemy上的課程，稍微不同的是Campus Program 前三週遠距學習的內容也公布了，趁著開學前最後一周還有時間的情況下加緊學習。

## 主要學習&實作項目

### JavsScript
JS老朋友了，我認為學習JS比較麻煩的有以下幾點:
- 語言本身存在怪異性
- 新的標準的推出(ES6)
- 需要區分JS原生或是瀏覽器提供的API
總之學習JS比我想的還要漫長，因為需要顧慮的點特別多。我只能說阿，~~不愧是十天內設計出來的語言~~。

這周學習的項目為:
- JS basic
- JS functions
- JS DOM & JS events
- JS 非同步程式
- **AJAX & API**

前四個算是複習了，主要新的學習內容為第五項。包含JSON的概念、使用，另外還包含call API(來獲取JSON)的練習。另外也接觸了API開發工具，相對瀏覽器的Dev tools來說，API工具可以在開發上可以更方便，例如: 觀看headers, JSON資料，或是設定query string等。

### AWS Cloud Service
Campus Program公布的遠距學習內容其中之一是AWS，比照此計畫的課程大綱&網路上的心得分享後，我猜是要將後端server建立在aws上。與其他領域不同，cloud service是我先前沒碰過的主題，因此在認識AWS的服務上也花了不少時間。

找了網路上關於aws的學習資源，在了解之餘也動手實作一些項目:
- 註冊開通 AWS 帳號
- 使用IAM 申請user並給予權限
- 設置CloudWatch 監聽帳單規則(根據規則發送警訊)
- 新增一個EC2 linux instance
- 新增一個S3 bucket 

因為AWS 提供的服務實在是太多了，光是要理解每個服務在幹嘛都要花上不少時間，所以下周還有得研究了。

## 總結
這一周也是學習了不少新的知識，看著玲朗滿目的前後端知識不免感到焦慮，畢竟要熟悉這麼龐大的知識需要不少的時間，並且這之中還不包括實作&練習的時間🤯。這種遊走在舒適圈邊緣的感覺沒意外的話還會持續個十幾周，希望我能堅持下去! 給自己喊聲加油XD。

## 參考資料
- 小馬技術aws系列: [AWS 中文入门开发教学YouTube](https://www.youtube.com/watch?v=G0hvLDTmXig&list=PLliocbKHJNwsyKkNwFUHbZZOJ2gT9qnT9&index=1)
- EC2 linus instance: [教學課程：使用 Amazon EC2 Linux 執行個體 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- AWS service鐵人賽文章: [Amazon Cloud Service 30 days challenge :: 2018 iT 邦幫忙鐵人賽 (ithome.com.tw)](https://ithelp.ithome.com.tw/users/20083507/ironman/1366)