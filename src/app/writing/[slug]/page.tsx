import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "../../components/page-intro";
import { ArticleBody } from "../article-body";
import { getArticle, getArticleSlugs, getArticleWithContent, writingTitle } from "../articles";
import { slugifyHeading } from "../heading";

type WritingArticleProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: WritingArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: writingTitle,
    };
  }

  return {
    title: article.title,
    description: article.lead,
    alternates: {
      types: {
        "text/markdown": `/writing/${slug}.md`,
      },
    },
  };
}

export default async function WritingArticle({ params }: WritingArticleProps) {
  const { slug } = await params;
  const article = await getArticleWithContent(slug);

  if (!article) {
    notFound();
  }

  const Content = article.Content;

  return (
    <>
      <article>
        <PageIntro.Frame>
          <PageIntro.Title>{article.title}</PageIntro.Title>
          <PageIntro.Time dateTime={article.date}>{article.date}</PageIntro.Time>
        </PageIntro.Frame>
        <p className="text-foreground">{article.lead}</p>
        {article.Hero ? <article.Hero /> : null}

        <nav
          className="mt-12 grid grid-cols-[96px_minmax(0,1fr)] gap-3  max-[640px]:block"
          aria-label="Article contents"
        >
          <span className="tracking-[0.04em] text-secondary-foreground">Contents</span>
          <ol className="m-0 grid list-none gap-3 p-0 max-[640px]:mt-3">
            {article.sections.map((section, index) => (
              <li key={section}>
                <a
                  className="text-secondary-foreground hover:fancy-underline inline-grid w-fit max-w-full grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3"
                  href={`#${slugifyHeading(section)}`}
                >
                  <span className="text-secondary select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">{section}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ArticleBody>
          <Content />
        </ArticleBody>
      </article>

      <div className="mt-12">
        <Link className="hover:fancy-underline inline-flex items-center gap-x-2" href="/writing">
          <svg
            viewBox="0 0 12 12"
            className="size-3 shrink-0 text-secondary select-none"
            aria-hidden="true"
          >
            <path
              d="M10 6H2.4M5.4 3.2 2.2 6l3.2 2.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          All writing
        </Link>
      </div>
    </>
  );
}
