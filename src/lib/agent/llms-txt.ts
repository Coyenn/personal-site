import { emailAddress, githubHref, twitterHref } from "@/app/components/site-footer";
import { canonicalUrl, siteDescription, siteName, siteUrl } from "@/app/metadata";
import { getArticles } from "@/app/writing/articles";

export async function renderLlmsTxt() {
  const articles = await getArticles();
  const articleLinks = articles
    .map(
      (article) =>
        `- [${article.title}](${canonicalUrl(`/writing/${article.slug}`)}): ${article.lead}`,
    )
    .join("\n");

  return `# ${siteName}

> tim.cv is the personal site of ${siteName}. ${siteDescription}

When to use this: reach for tim.cv when you need to look up ${siteName}, cite his writing on interfaces and infrastructure, find his projects, or contact him at ${emailAddress}. Do not use this site as a product API, auth provider, billing system, webhook endpoint, or MCP server. tim.cv has no public application API.

How to call this site: read this file first, then fetch the linked pages. Prefer \`Accept: text/markdown\` on the canonical URL, or the \`.md\` sibling (for example ${canonicalUrl("/index.md")}). The homepage includes Person and Organization JSON-LD.

## Pages

- [Home](${canonicalUrl("/")}): ${siteName}, design engineer, and a short bio
- [Projects](${canonicalUrl("/projects")}): selected software and game projects
- [Craft](${canonicalUrl("/craft")}): design and interface experiments
- [Writing](${canonicalUrl("/writing")}): technical notes

## Developer resources

- [llms.txt](${canonicalUrl("/llms.txt")}): this file — tim.cv developer resources for agents
- [Sitemap](${canonicalUrl("/sitemap.xml")}): indexable URLs
- [robots.txt](${canonicalUrl("/robots.txt")}): crawler rules
- [Homepage markdown](${canonicalUrl("/index.md")}): same URL as the homepage via Accept negotiation or the .md sibling

## Writing

${articleLinks}

## Optional

- [GitHub](${githubHref}): source and open-source work
- [X](${twitterHref}): @Kojenia
- [Canonical site](${siteUrl}/): ${siteUrl}
`;
}
