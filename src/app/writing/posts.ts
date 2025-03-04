import fs from 'node:fs';
import path from 'node:path';

export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  content: string;
}

export interface BlogPostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  draft?: boolean;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock?.trim().split('\n');
  const metadata: Partial<BlogPostMetadata> = {};

  if (!frontMatterLines) {
    throw new Error('Front matter not found');
  }

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(': ');

    const value = valueArr
      .join(': ')
      .trim()
      .replace(/^['"](.*)['"]$/, '$1');

    const typedKey = key.trim() as keyof BlogPostMetadata;

    if (typedKey === 'draft') {
      metadata[typedKey] = value === 'true';
    } else {
      metadata[typedKey] = value;
    }
  }

  return { metadata: metadata as BlogPostMetadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  return parseFrontmatter(fs.readFileSync(filePath, 'utf-8'));
}

function getMDXData(dir: string): BlogPost[] {
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
}

export function getPosts(): BlogPost[] {
  return getMDXData(
    path.join(process.cwd(), 'src', 'app', 'writing', 'content'),
  )
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt))
        return -1;
      return 1;
    })
    .filter((post) => !post.metadata.draft);
}
