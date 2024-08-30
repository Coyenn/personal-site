import { DM_Sans, Newsreader } from "next/font/google";

export const inter = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-sans",
});
export const newsreader = Newsreader({
	subsets: ["latin"],
	style: "italic",
	variable: "--font-serif",
});
