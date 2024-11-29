import Footer from "@/src/components/layout/footer";
import Nav from "@/src/components/layout/header";
import { ThemeProvider } from "@/src/components/theme-provider";
import { instrumentSerif, inter, newsreader, ovo } from "@/src/lib/fonts";
import { cn } from "@/src/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";

import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		default: "Tim Ritter — Design Engineer",
		template: "%s — Tim Ritter",
	},
	creator: "Tim Ritter",
	publisher: "Tim Ritter",
	description:
		"Creating web experiences with meticulous attention to detail. Diving deep into technical intricacies.",
	keywords: ["Tim Ritter"],
	authors: [{ name: "Tim Ritter", url: "https://tim-ritter.com" }],
	openGraph: {
		title: "Tim Ritter — Design Engineer",
		description:
			"Creating web experiences with meticulous attention to detail. Diving deep into technical intricacies.",
		url: "https://tim-ritter.com",
		siteName: "Tim Ritter Personal Site",
		images: [
			{
				url: "https://tim-ritter.com/og-image.png",
				width: 1200,
				height: 630,
				alt: "Tim Ritter — Design Engineer.",
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/favicon.ico",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tim Ritter — Design Engineer",
		description:
			"Creating web experiences with meticulous attention to detail. Diving deep into technical intricacies.",
		siteId: "kojenia",
		creator: "@kojenia",
		creatorId: "kojenia",
		images: {
			url: "https://tim-ritter.com/og-image.png",
			alt: "Tim Ritter — Design Engineer.",
		},
	},
	verification: {
		yahoo: "yahoo",
		other: { me: ["hi@tim.cv"] },
	},
	alternates: {
		canonical: "https://tim-ritter.com",
		types: { "application/rss": "https://tim-ritter.com/rss" },
	},
	category: "technology",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 2,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
		{ media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"antialiased min-h-screen",
				inter.variable,
				newsreader.variable,
				ovo.variable,
				instrumentSerif.variable,
			)}
			suppressHydrationWarning
		>
			<body
				className={
					"container px-6 sm:px-0 bg-background contrast-less:opacity-80 overflow-x-hidden min-h-screen flex flex-col"
				}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="blur" />
					<Nav />
					<main className="flex flex-col mt-16 md:mt-24 lg:mt-32 mb-32 gap-y-10 md:gap-y-12 print:!my-0 grow">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
