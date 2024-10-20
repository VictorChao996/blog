import fs from "fs/promises";
import path from "path";

export async function getAllMarkdownFilesPath(directoryPath) {
	const files = await fs.readdir(directoryPath, { withFileTypes: true });
	const mdFiles = [];

	for (const file of files) {
		const filePath = path.join(directoryPath, file.name);

		if (file.isDirectory()) {
			// Recursively call the function for subdirectories
			const subdirectoryFiles = await getAllMarkdownFilesPath(filePath);
			mdFiles.push(...subdirectoryFiles);
		} else if (file.isFile() && file.name.endsWith(".md")) {
			mdFiles.push(filePath);
		}
	}

	return mdFiles;
}
