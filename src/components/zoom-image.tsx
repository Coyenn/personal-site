"use client";

import { cn } from "@/src/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

export interface ZoomImageProps {
	src: StaticImageData | StaticImport | string;
	alt: string;
	height?: number | `${number}`;
	width?: number | `${number}`;
	className?: string;
	loading?: "lazy" | "eager";
}

export default function ZoomImage(props: ZoomImageProps) {
	const { loading = "lazy" } = props;

	const [backdropOpacity, setBackdropOpacity] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const MAX_DRAG = 150;
	const x = useMotionValue(0);
	const dragButtonSize = useTransform(
		x,
		[-MAX_DRAG, 0, MAX_DRAG],
		[0.5, 1, 1.5],
	);
	const backgroundOpacity = useTransform(
		x,
		[-MAX_DRAG, 0, MAX_DRAG],
		[0, 0, 0.5],
	);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (isDragging) {
			document.documentElement.style.setProperty(
				"cursor",
				"grabbing",
				"important",
			);
		} else {
			document.documentElement.style.cursor = "auto";
		}
	}, [isDragging]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Not needed
	useEffect(() => {
		x.on("change", (latest) => {
			const image = imageRef.current;

			if (image) {
				const newScale = 1 + latest / 400;
				image.style.transform = `scale(${newScale})`;
			}

			x.set(Math.min(Math.max(latest, -MAX_DRAG), MAX_DRAG));
			setBackdropOpacity(backgroundOpacity.get());
		});

		return () => {
			x.set(0);
			setBackdropOpacity(0);
		};
	}, []);

	return (
		<>
			<div
				className="bg-background fixed inset-0 w-full h-full z-[9] pointer-events-none"
				style={{ opacity: backdropOpacity }}
			/>
			<div className="relative z-10">
				<Image
					{...props}
					className={cn(props.className, "bg-muted-foreground/10 z-10")}
					tabIndex={0}
					aria-label={props.alt}
					loading={loading}
					draggable={false}
					sizes="(min-width: 1024px) 50vw, 100vw"
					placeholder={typeof props.src === "string" ? undefined : "blur"}
					ref={imageRef}
				/>
				<div className="hidden group lg:block absolute right-0 md:right-[-110px] top-1/2 -translate-y-1/2 w-7 h-14">
					<motion.button
						tabIndex={-1}
						type="button"
						className="block absolute w-full h-full touch-none cursor-grab"
						drag="x"
						dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
						dragElastic={{ top: 0, bottom: 0, left: 0.1, right: 0.2 }}
						whileDrag={{ cursor: "grabbing" }}
						onDragStart={() => {
							setIsDragging(true);
						}}
						onDragEnd={() => {
							setIsDragging(false);
						}}
						style={{ x, scale: dragButtonSize }}
					>
						<div
							className={cn(
								"w-1 h-11 bg-foreground opacity-50 group-hover:opacity-70 contrast-more:opacity-100 rounded-3xl contrast-more:bg-neutral-900",
								isDragging && "opacity-70",
							)}
						/>
					</motion.button>
				</div>
			</div>
		</>
	);
}
