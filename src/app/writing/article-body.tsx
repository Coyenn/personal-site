import type { ReactNode } from "react";

export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <div className="article-mdx [&_p+p]:mt-3 [&_:is(ul,ol)]:my-3 [&_:is(ul,ol)]:grid [&_:is(ul,ol)]:list-none [&_:is(ul,ol)]:gap-3 [&_:is(ul,ol)]:p-0">
      {children}
    </div>
  );
}
