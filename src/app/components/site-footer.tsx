export const twitterHref = "https://x.com/Kojenia";
export const githubHref = "https://github.com/Coyenn";
export const emailAddress = "hi@tim.cv";
export const emailHref = `mailto:${emailAddress}`;

export function SiteFooter() {
  return (
    <footer className="mt-12 flex items-baseline gap-3">
      <a
        className="hover:fancy-underline"
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        @Kojenia
      </a>
      <span aria-hidden="true" className="text-secondary select-none">
        ·
      </span>
      <a
        className="hover:fancy-underline"
        href={emailHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {emailAddress}
      </a>
      <span aria-hidden="true" className="text-secondary select-none">
        ·
      </span>
      <a
        className="hover:fancy-underline"
        href={githubHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </footer>
  );
}
