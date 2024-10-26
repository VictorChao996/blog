import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "blog/src/Post");

function generateGraphData() {
	const nodes = [];
	const links = [];

	function readMarkdownFiles(dir) {
		const files = fs.readdirSync(dir);
		files.forEach((file) => {
			if (file == "index.md") return;
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				// 如果是目錄，遞迴進入
				readMarkdownFiles(filePath);
			} else if (file.endsWith(".md")) {
				const fileContent = fs.readFileSync(filePath, "utf8");
				const { data } = matter(fileContent);

				// 生成節點，使用相對於 Post 目錄的路徑作為 node_id
				const nodeId = path
					.relative(postsDirectory, filePath)
					.replace(/\.md$/, "");
				nodes.push({ id: nodeId, name: data.title || nodeId });

				// 假設每個文件的內容中有連結到其他文件的標題
				const regex = /\[(.*?)\]\((?!http|https|\/\/)(.*?)\.md\)/g; // 只匹配 .md 文件的連結
				let match;
				while ((match = regex.exec(fileContent)) !== null) {
					const linkedPost = match[2]; // 取得連結的文件名
					const targetId = path
						.relative(
							postsDirectory,
							path.join(dir, linkedPost + ".md")
						)
						.replace(/\.md$/, "");
					links.push({ source: nodeId, target: targetId });
				}
			}
		});
	}

	readMarkdownFiles(postsDirectory);

	const graphData = { nodes, links }; // 將 nodes 和 links 包裝成一個對象

	// 將 graphData 寫入 JS 文件
	const jsContent = `export const graphData = ${JSON.stringify(
		graphData,
		null,
		2
	)};`;
	fs.writeFileSync(
		path.join(process.cwd(), "blog/.vitepress/theme/graphData.js"),
		jsContent
	); // 寫入 JS 文件
	return graphData; // 返回 graphData
}

const graphData = generateGraphData();
console.log(graphData); // 輸出 graphData
