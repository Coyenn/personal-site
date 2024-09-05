"use client";

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

	return (
		<div
			className={cn(
				"flex justify-center items-center relative h-[30vw] sm:h-[200px] md:-mx-10",
				className,
			)}
		>
			{items.map((item, index) => {
				const rotations = [-8, 4, -10];
				const rotationValue = useMotionValue(0);
				const rotationSpring = useSpring(0, {
					stiffness: 600,
					damping: 40,
				});
				const scaleValue = useMotionValue(0.85);
				const scaleSpring = useSpring(scaleValue, {
					stiffness: 300,
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
						400 + index * 100,
					);

					return () => {
						rotationValue.destroy();
						scaleValue.destroy();
					};
				}, []);

				return (
					<motion.div
						key={slugify(item.href)}
						className="w-[36%] block absolute shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl sm:rounded-3xl overflow-hidden"
						style={{
							rotate: rotationSpring,
							scale: scaleSpring,
							left: `${index * 31}%`,
							zIndex: isHovering ? 1 : 0,
							opacity: opacitySpring,
							transform: `translateX(${translateXSpring}px)`,
						}}
						onHoverStart={() => {
							rotationSpring.set(0);
							scaleSpring.set(1.05);
							translateXSpring.set(-30);
							setIsHovering(true);
						}}
						onHoverEnd={() => {
							rotationSpring.set(rotations[index]);
							scaleSpring.set(1);
							translateXSpring.set(0);
							setIsHovering(false);
						}}
						onMouseDown={() => {
							rotationSpring.set(0);
							scaleSpring.set(0.95);
							setIsHovering(true);
						}}
						onMouseUp={() => {
							rotationSpring.set(rotations[index]);
							scaleSpring.set(1);
							setIsHovering(false);
						}}
					>
						<Link href={item.href}>
							<Image
								{...item.image}
								src={item.image.src ?? ""}
								className="h-full w-full aspect-[16/11] object-cover"
							/>
						</Link>
					</motion.div>
				);
			})}
		</div>
	);
}
