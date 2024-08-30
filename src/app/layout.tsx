import type { Metadata } from "next";
import "./globals.css";
import { inter, newsreader } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Tim Ritter. Design Engineer",
	description:
		"Crafting interfaces. Building polished software and web experiences.",
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
			)}
		>
			<body className={"container px-6 sm:px-0 bg-background"}>{children}</body>
		</html>
	);
}
