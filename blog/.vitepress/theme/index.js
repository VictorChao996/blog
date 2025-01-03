// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";

// import PostList from "./components/PostList.vue";
import GraphView from "./components/GraphView.vue";
import TimeLineView from "./components/TimeLineView.vue";

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
		app.component("TimeLineView", TimeLineView);
	},
};
