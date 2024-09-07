"use client";

import LightboxImage from "@/src/components/lightbox";
import craft from "@/src/data/craft";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import slugify from "slugify";

function predictRenderedImageHeight(
	image: StaticImageData,
	containerWidth: number,
): number {
	const imageWidth = image.width;
	const imageHeight = image.height;
	const aspectRatio = imageWidth / imageHeight;

	const renderedWidth = Math.min(containerWidth, imageWidth);
	const renderedHeight = renderedWidth / aspectRatio;

	return Math.round(renderedHeight);
}

export default function CraftList() {
	const containerRef = useRef<HTMLUListElement>(null);

	return (
		<ul className="flex flex-col list-none group -mt-3" ref={containerRef}>
			{craft.map((item, index) => {
				const { ref, inView: inViewIntersection } = useInView({
					threshold: 0,
				});
				const inView = index < 3 ? true : inViewIntersection;

				return (
					<li
						className={`${index < 10 ? "animate-intro" : ""} motion-reduce:duration-0 motion-reduce:opacity-100 animation-delay-${index + 1}`}
						key={slugify(item.title)}
						ref={ref}
					>
						<div className="block group-hover:opacity-50 py-6 hover:!opacity-100 transition-opacity duration-300 motion-reduce:!opacity-100 ease-in-out contrast-more:!opacity-100">
							{item.image &&
								(inView ? (
									<LightboxImage
										loading={index < 3 ? "eager" : "lazy"}
										alt={item.title}
										className="rounded-lg border border-muted-foreground/10"
										height={item.image.height}
										src={item.image}
										width={item.image.width}
									/>
								) : (
									<div
										aria-label={item.title}
										className="rounded-lg border bg-muted-foreground/10 w-full"
										style={{
											height:
												!inView && item.image
													? predictRenderedImageHeight(
															item.image,
															containerRef.current?.offsetWidth ?? 0,
														)
													: "auto",
										}}
									/>
								))}
							<h3 className="flex justify-between items-center gap-4 mt-6">
								<span>{item.title}</span>
							</h3>
						</div>
						{index < craft.length - 1 && <hr />}
					</li>
				);
			})}
		</ul>
	);
}
