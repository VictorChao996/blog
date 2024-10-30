---
outline: deep
---

# Experiment
底下放一些實驗性前端頁面

- [GraphView Example](./experiment.md#example)
- [TimelineView Example](./experiment.md#example-1)

## GraphView
### Description: 
模仿 obsidian graph view 
### Target:
可以像 ob graph view 一樣, 呈現 post 的關係圖, 並能夠透過點擊 node 跳轉 post 頁面
### Usage (temp): 
- 使用 `generateGraphData.mjs` 產生 node & links array （會輸出成 `graphData.js`）
- 將 `graphData.js` 中的 node & links import 進 `GraphView.vue` 的 data 中
- 在 .vitrepress 之下的 index.js 註冊 GraphView.vue component

    ::: details See the example
    
    ```js{5,18}
    import { h } from "vue";
    import DefaultTheme from "vitepress/theme";
    import "./style.css";

    import GraphView from "./components/GraphView.vue";

    /** @type {import('vitepress').Theme} */
    export default {
        extends: DefaultTheme,
        Layout: () => {
            return h(DefaultTheme.Layout, null, {
                // https://vitepress.dev/guide/extending-default-theme#layout-slots
            });
        },
        enhanceApp({ app, router, siteData }) {
            // ...
            // app.component("PostList", PostList);
            app.component("GraphView", GraphView);
        },
    };
    ```
    :::
- 在任意 .md 中直接使用
    ```
    <GraphView />
    ```

### Example
<GraphView />

### Improvement
1. 跳轉: 能夠點擊 node 就跳轉至指定 post 頁面
2. 拖動優化: 可以對著空白處點擊實現整個 graph 畫面移動效果 (camera 位置變換?)
3. 縮放優化: 可以根據 mouseScroll 放大或縮小整個 graphView
4. 其他效果....


## Timeline view

### Description
能夠根據 json data 呈現像是里程碑的時間圖

### Usage
- 更新 `milestoneData.js` 中的 json data
- `milestoneData.js` 的資料會自動 import 進 `TimeLineView.vue` 中
- 在 .vitepress 之下的 `index.js` 註冊 TimeLineView.vue component
- 在任意 .md 中直接使用
- 在任意 .md 中直接使用
    ```
    <TimeLineView />
    ```

### Example
<TimeLineView />