import type { StaticImageData } from "next/image";

export function predictRenderedImageHeight(
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
