"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export interface CopyCodeProps {
	code: string;
}

export default function CopyCode(props: CopyCodeProps) {
	const [copied, setCopied] = useState(false);
	const { code } = props;

	return (
		<button
			type="button"
			className="absolute top-1 right-1 h-6 w-6 rounded border border-transparent hover:border-foreground/5 text-foreground/30 hover:text-foreground contrast-more:text-foreground bg-white dark:bg-muted transition-all"
			onClick={async () => {
				if (copied === true) return;

				setCopied(true);
				await navigator.clipboard.writeText(code);

				setTimeout(() => {
					setCopied(false);
				}, 2000);
			}}
		>
			<span className="sr-only">
				{copied ? "Copied to clipboard!" : "Copy code"}
			</span>
			<AnimatePresence>
				{copied && (
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						mode={"popLayout"}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						<path
							fill="currentColor"
							fillRule="evenodd"
							d="M19.707 7.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 16.586l9.293-9.293a1 1 0 0 1 1.414 0Z"
							clipRule="evenodd"
						/>
					</motion.svg>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{!copied && (
					<motion.svg
						className="w-4 h-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						mode={"popLayout"}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M2 5C2 3.34315 3.34315 2 5 2H12C13.6569 2 15 3.34315 15 5C15 5.55228 14.5523 6 14 6C13.4477 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4H5C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H6C6.55228 14 7 14.4477 7 15C7 15.5523 6.55228 16 6 16H5C3.34315 16 2 14.6569 2 13V5ZM9 10.8462C9 9.20041 10.42 8 12 8H19C20.58 8 22 9.20041 22 10.8462V19.1538C22 20.7996 20.58 22 19 22H12C10.42 22 9 20.7996 9 19.1538V10.8462ZM12 10C11.3708 10 11 10.4527 11 10.8462V19.1538C11 19.5473 11.3708 20 12 20H19C19.6292 20 20 19.5473 20 19.1538V10.8462C20 10.4527 19.6292 10 19 10H12Z"
							fill="currentColor"
						/>
					</motion.svg>
				)}
			</AnimatePresence>
		</button>
	);
}
