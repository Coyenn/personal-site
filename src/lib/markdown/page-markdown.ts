import { craftDescription, craftTitle, getCraftItems } from "@/app/craft/items";
import { homeIntro } from "@/app/home";
import { canonicalUrl, siteName } from "@/app/metadata";
import { projects, projectsDescription, projectsTitle } from "@/app/projects/items";
import {
  getArticle,
  getArticleSource,
  getArticles,
  writingDescription,
  writingTitle,
} from "@/app/writing/articles";
import { ageFromBirthday } from "@/lib/age";
import { jobTitle } from "@/lib/schema/json-ld";

export type MarkdownPage = {
  body: string;
  canonicalUrl: string;
  found: boolean;
};

function ok(body: string, pathname: string): MarkdownPage {
  return {
    body: `${body.trim()}\n`,
    canonicalUrl: canonicalUrl(pathname),
    found: true,
  };
}

function stripMdxModule(source: string) {
  return source
    .replace(/^import\s+[\s\S]*?;\s*$/gm, "")
    .replace(/^export const Hero = [\s\S]*?;\s*$/gm, "")
    .replace(/^export const metadata = \{[\s\S]*?\n\};\s*/m, "")
    .trim();
}

export async function markdownForPathname(pathname: string): Promise<MarkdownPage> {
  const normalized = pathname === "/index" ? "/" : pathname;

  if (normalized === "/" || normalized === "") {
    return ok(
      `# ${siteName}

${jobTitle}

${homeIntro(ageFromBirthday())}`,
      "/",
    );
  }

  if (normalized === "/projects") {
    const items = projects
      .map((project) => `- [${project.name}](${project.href}): ${project.description}`)
      .join("\n");

    return ok(
      `# ${projectsTitle}

${projectsDescription}

${items}`,
      "/projects",
    );
  }

  if (normalized === "/craft") {
    const items = getCraftItems()
      .map((item) => {
        const detail = item.description ? `: ${item.description}` : "";

        return `- ${item.title} (${item.date})${detail}`;
      })
      .join("\n");

    return ok(
      `# ${craftTitle}

${craftDescription}

${items}`,
      "/craft",
    );
  }

  if (normalized === "/writing") {
    const items = (await getArticles())
      .map(
        (article) =>
          `- [${article.title}](${canonicalUrl(`/writing/${article.slug}`)}): ${article.date}`,
      )
      .join("\n");

    return ok(
      `# ${writingTitle}

${writingDescription}

${items}`,
      "/writing",
    );
  }

  const articleMatch = normalized.match(/^\/writing\/([^/]+)$/);

  if (articleMatch?.[1]) {
    const slug = articleMatch[1];
    const [article, source] = await Promise.all([getArticle(slug), getArticleSource(slug)]);

    if (article && source) {
      return ok(
        `# ${article.title}

${article.date}

${article.lead}

${stripMdxModule(source)}`,
        `/writing/${slug}`,
      );
    }
  }

  return {
    body: "",
    canonicalUrl: canonicalUrl(normalized),
    found: false,
  };
}
