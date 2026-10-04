import localFont from "next/font/local";

import "./globals.css";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { columnWidth } from "@/lib/column";

export { metadata } from "./metadata";

const akkuratMono = localFont({
  src: "../fonts/akkurat-mono.woff2",
  variable: "--font-ui",
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={akkuratMono.variable}>
      <body
        className="mx-auto box-content min-h-screen p-6 md:p-10 bg-background font-mono text-foreground text-base"
        style={{ maxWidth: columnWidth }}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
