import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export const writingTitle = "Writing";
export const writingDescription =
  "Technical notes about interfaces, infrastructure, tools, and following curiosity.";

export type ArticleMetadata = {
  date: string;
  lead: string;
  title: string;
};

export type Article = ArticleMetadata & {
  sections: string[];
  slug: string;
};

export type ArticleWithContent = Article & {
  Content: ComponentType<MDXProps>;
  Hero?: ComponentType;
};

const articlesDirectory = path.join(process.cwd(), "src/content/writing");

function getSections(source: string) {
  return [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
}

export function getArticleFilePath(slug: string) {
  return path.join(articlesDirectory, `${slug}.mdx`);
}

export function getArticleSlugs() {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getArticleSource(slug: string) {
  if (!getArticleSlugs().includes(slug)) {
    return undefined;
  }

  return readFileSync(getArticleFilePath(slug), "utf8");
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  if (!getArticleSlugs().includes(slug)) {
    return undefined;
  }

  const { metadata } = await import(`@/content/writing/${slug}.mdx`);
  const source = getArticleSource(slug);

  if (!source) {
    return undefined;
  }

  return {
    slug,
    ...metadata,
    sections: getSections(source),
  };
}

export async function getArticles() {
  const articles = await Promise.all(getArticleSlugs().map((slug) => getArticle(slug)));

  return articles
    .filter((article): article is Article => article !== undefined)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export async function getArticleWithContent(slug: string): Promise<ArticleWithContent | undefined> {
  if (!getArticleSlugs().includes(slug)) {
    return undefined;
  }

  const [{ default: Content, metadata, Hero }, source] = await Promise.all([
    import(`@/content/writing/${slug}.mdx`),
    Promise.resolve(getArticleSource(slug)),
  ]);

  if (!source) {
    return undefined;
  }

  return {
    slug,
    ...metadata,
    sections: getSections(source),
    Content,
    Hero,
  };
}
