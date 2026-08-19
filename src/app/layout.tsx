import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

const akkuratMono = localFont({
  src: "../fonts/akkurat-mono.otf",
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tim Ritter · Design Engineer",
    template: "%s · Tim Ritter",
  },
  description:
    "Tim Ritter is a designer, engineer, and game developer building things from curiosity.",
};

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
