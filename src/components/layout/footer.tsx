import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Needs to be a footer tag
    <footer
      aria-label="Site Footer"
      className="flex items-center justify-between text-muted-foreground contrast-more:text-foreground mb-2 text-sm animate-intro motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-5"
    >
      <p>&copy; {currentYear}</p>
      <Link href="/colophon">
        <em className="text-sm">Colophon</em>
      </Link>
    </footer>
  );
}
