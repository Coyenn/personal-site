import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		scrollRestoration: true,
		turbo: {
			useSwcCss: true,
			treeShaking: true,
		},
	},
};

export default nextConfig;
