import { defineConfig } from "vitepress";

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
		// 		text: "Examples",
		// 		items: [
		// 			{ text: "Markdown Examples", link: "/markdown-examples" },
		// 			{ text: "Runtime API Examples", link: "/api-examples" },
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
			copyright: "Copyright © 2024 Victor Zhao",
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
});
