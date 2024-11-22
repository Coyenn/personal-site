"use client";

import { useEffect } from "react";

import "@/src/styles/focus.css";

/**
 * Credits to Paco Coursey for the idea.
 *
 * https://x.com/pacocoursey/status/1522209996984967168
 */
export default function FocusMode() {
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.code === "KeyF") {
				document.body.classList.add("focus");
			}
		};

		const onKeyUp = (event: KeyboardEvent) => {
			if (event.code === "KeyF") {
				document.body.classList.remove("focus");
			}
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
	}, []);

	return <></>;
}
