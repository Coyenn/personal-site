export function SiteFooter() {
  return (
    <footer className="mt-12 flex items-baseline gap-3">
      <a className="hover:fancy-underline" href="https://x.com/Kojenia" target="_blank" rel="noopener noreferrer">
        @Kojenia
      </a>
      <span aria-hidden="true" className="text-secondary select-none">
        ·
      </span>
      <a className="hover:fancy-underline" href="mailto:hi@tim.cv" target="_blank" rel="noopener noreferrer">
        hi@tim.cv
      </a>
      <span aria-hidden="true" className="text-secondary select-none">
        ·
      </span>
      <a className="hover:fancy-underline" href="https://github.com/Coyenn" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </footer>
  );
}
