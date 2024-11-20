"use client";

import { useHighlightList } from "@/src/hooks/use-highlight-list";
import { cn } from "@/src/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import slugify from "slugify";

export interface BlogPostRowProps {
	className?: string;
	items: {
		image: {
			src?: string;
			alt: string;
			width: number;
			height: number;
		};
		href: string;
	}[];
}

export default function BlogPostRow(props: BlogPostRowProps) {
	const { items, className } = props;
	const setHighlightIndex = useHighlightList(
		(state) => state.setHighlightIndex,
	);

	return (
		<div
			className={cn(
				"flex justify-center items-center relative h-[30vw] sm:h-[200px] md:-mx-10",
				className,
			)}
		>
			{items.map((item, index) => {
				const rotations = [-12, 6, -10];
				const rotationValue = useMotionValue(0);
				const rotationSpring = useSpring(0, {
					stiffness: 600,
					damping: 40,
				});
				const scaleValue = useMotionValue(0.85);
				const scaleSpring = useSpring(scaleValue, {
					stiffness: 400,
					damping: 20,
				});
				const opacityValue = useMotionValue(0);
				const opacitySpring = useSpring(opacityValue, {
					stiffness: 300,
					damping: 20,
				});
				const translateXValue = useMotionValue(0);
				const translateXSpring = useSpring(translateXValue, {
					stiffness: 300,
					damping: 20,
				});
				const [isHovering, setIsHovering] = useState(false);

				// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
				useEffect(() => {
					setTimeout(
						() => {
							scaleSpring.set(1);
							rotationSpring.set(rotations[index]);
							opacitySpring.set(1);
						},
						400 + index * 200,
					);

					return () => {
						rotationValue.destroy();
						scaleValue.destroy();
					};
				}, []);

				return (
					<motion.div
						key={slugify(item.href)}
						className="w-[36%] block absolute bg-black shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl sm:rounded-3xl overflow-hidden"
						drag
						dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
						dragElastic={0.5}
						dragTransition={{
							max: 50,
							bounceStiffness: 1000,
							bounceDamping: 50,
						}}
						style={{
							rotate: rotationSpring,
							scale: scaleSpring,
							left: `${index * 31}%`,
							opacity: opacitySpring,
							transform: `translateX(${translateXSpring}px)`,
						}}
						onHoverStart={() => {
							rotationSpring.set(0);
							scaleSpring.set(1.05);
							translateXSpring.set(-30);
							setIsHovering(true);
							setHighlightIndex(index);
						}}
						onHoverEnd={() => {
							rotationSpring.set(rotations[index]);
							scaleSpring.set(1);
							translateXSpring.set(0);
							setIsHovering(false);
							setHighlightIndex(null);
						}}
						onMouseDown={() => {
							rotationSpring.set(0);
							scaleSpring.set(0.95);
							setIsHovering(true);
							setHighlightIndex(index);
						}}
						onMouseUp={() => {
							rotationSpring.set(rotations[index]);
							scaleSpring.set(1);
							setIsHovering(false);
							setHighlightIndex(null);
						}}
					>
						<Link href={item.href} draggable={false} className="relative">
							<Image
								{...item.image}
								src={item.image.src ?? ""}
								quality={90}
								priority
								draggable={false}
								className="h-full w-full aspect-[16/11] object-cover dark:bg-opacity-80"
							/>
						</Link>
					</motion.div>
				);
			})}
		</div>
	);
}
