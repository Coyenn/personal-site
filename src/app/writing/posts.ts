import fs from "node:fs";
import path from "node:path";

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	draft?: boolean;
};

const parseFrontmatter = (fileContent: string) => {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];
	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = frontMatterBlock?.trim().split("\n");
	const metadata: Partial<Metadata> = {};

	if (!frontMatterLines) {
		throw new Error("Front matter not found");
	}

	for (const line of frontMatterLines) {
		const [key, ...valueArr] = line.split(": ");

		const value = valueArr
			.join(": ")
			.trim()
			.replace(/^['"](.*)['"]$/, "$1");
		metadata[key.trim() as keyof Metadata] = value;
	}

	return { metadata: metadata as Metadata, content };
};

const getMDXFiles = (dir: string) =>
	fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");

const readMDXFile = (filePath: string) =>
	parseFrontmatter(fs.readFileSync(filePath, "utf-8"));

const getMDXData = (dir: string) => {
	const mdxFiles = getMDXFiles(dir);

	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
};

export function getPosts() {
	return getMDXData(
		path.join(process.cwd(), "src", "app", "writing", "content"),
	)
		.sort((a, b) => {
			if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt))
				return -1;
			return 1;
		})
		.filter((post) => !post.metadata.draft);
}
