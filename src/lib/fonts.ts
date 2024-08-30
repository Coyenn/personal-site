import { Inter, Newsreader } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const newsreader = Newsreader({
	subsets: ["latin"],
	style: "italic",
	variable: "--font-serif",
});
