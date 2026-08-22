import localFont from "next/font/local";

import "./globals.css";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export { metadata } from "./metadata";

const akkuratMono = localFont({
  src: "../fonts/akkurat-mono.otf",
  variable: "--font-ui",
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={akkuratMono.variable}>
      <body className="min-h-screen p-6 md:p-10 max-w-[560px] bg-background font-mono text-foreground text-base">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
