// blog/src/Post/updateIndex.js
import * as utils from "./utils.mjs";
import fs from "fs/promises";
import path from "path";

async function updatePostIndexFile() {
	const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
	const rootDirectory = path.join(currentDirectory, "../src/Post");
	const mdFiles = await utils.getAllMarkdownFilesPath(rootDirectory);
	const indexFilePath = path.join(rootDirectory, "index.md");

	// 清空 index.md 文件
	await fs.writeFile(indexFilePath, ""); // 新增：清空 index.md 的內容

	// 讀取每個 .md 文件的 frontmatter 以獲取 date 值
	const mdFilesWithDates = await Promise.all(
		mdFiles.map(async (file) => {
			const content = await fs.readFile(file, "utf-8");
			const match = content.match(/date:\s*(\d{4}-\d{2}-\d{2})/); // 更新：匹配 date 而非 lastUpdated
			return {
				file,
				date: match ? new Date(match[1]) : new Date(0), // 默認為最早的日期
			};
		})
	);
	// 根據 date 值降序排序
	const sortedMdFiles = mdFilesWithDates
		.sort((a, b) => b.date - a.date) // 更新：根據 date 排序
		.map((file) => file.file);

	// 用日期 header 分開不同日期的文章
	let previousDate = null;
	let indexContent = "";
	indexContent += `---\ntitle: "Posts"\noutline: deep\n---\n\n# {{ $frontmatter.title }}\n\n`;
	for (const file of sortedMdFiles) {
		const content = await fs.readFile(file, "utf-8");
		const match = content.match(/date:\s*(\d{4}-\d{2}-\d{2})/); // 更新：匹配 date 而非 lastUpdated
		const currentDate = match ? match[1] : "無日期";
		if (currentDate !== previousDate) {
			if (previousDate) {
				indexContent += "\n";
			}
			indexContent += `### ${currentDate}\n`;
			previousDate = currentDate;
		}
		const fileName = path.basename(file, ".md"); // 更新：使用正則表達式獲取標題
		const titleMatch = content.match(/title:\s*(.+)/); // 新增：匹配標題
		const title = titleMatch ? titleMatch[1] : fileName; // 如果找到標題，使用它，否則使用文件名
		indexContent += `- [${title}](${path.relative(rootDirectory, file)})\n`;
	}

	// 將導航鏈接添加到 index.md
	await fs.writeFile(indexFilePath, indexContent); // 寫回更新後的內容
	console.log("index.md 已更新！");
}

updatePostIndexFile().catch(console.error);
