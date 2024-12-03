import { defineConfig } from "vitepress";
// import { RSSOptions, RssPlugin } from "vitepress-plugin-rss";
import { RssPlugin } from "vitepress-plugin-rss";

//constant
const CopyrightString = "Copyright © 2024 Victor Zhao";

//NOTE: RSS plugin settings,
//ref: https://www.npmjs.com/package/vitepress-plugin-rss
const baseUrl = "https://victorchao996.github.io/blog";
const RSS = {
	title: "Victor's Blog",
	baseUrl,
	copyright: CopyrightString,
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "victor's blog",
	description: "Victor's blog",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: "/logo.jpeg",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Post", link: "/Post" },
		],

		// sidebar: [
		// 	{
		// 		text: "Series",
		// 		items: [
		// 			{ text: "Markdown Examples", link: "/markdown-examples" },
		// 			{ text: "Runtime API Examples", link: "/api-examples" },
		// 			{
		// 				text: "Leetcode Weekly Practice",
		// 				link: "Post/leetcode_weekly_practice/leetcode_weekly_practice_challenge",
		// 			},
		// 		],
		// 	},
		// ],

		socialLinks: [
			{ icon: "github", link: "https://github.com/VictorChao996" },
			{
				icon: "linkedin",
				link: "https://www.linkedin.com/in/victorchao996/",
			},
		],
		footer: {
			message: "Released under the MIT License.",
			copyright: CopyrightString,
		},
		search: {
			provider: "local",
		},
		lastUpdated: {
			text: "Updated at",
			formatOptions: {
				dateStyle: "full",
				timeStyle: "medium",
			},
		},
		editLink: {
			pattern:
				"https://github.com/VictorChao996/blog/edit/main/blog/src/:path",
		},
	},
	base: "/blog/",
	srcDir: "src",
	markdown: {
		math: true,
	},
	vite: {
		plugins: [RssPlugin(RSS)],
	},
});
