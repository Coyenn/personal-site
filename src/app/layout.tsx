import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, newsreader } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";

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
			<body className={"container px-6 sm:px-0 bg-background"}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider delayDuration={100}>
						<div className="blur" />
						<Nav />
						{children}
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
