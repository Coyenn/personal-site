import tailwindcssTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

/**
 * Adds utilities for animation delays
 */
const animationDelayPlugin = plugin(({ addUtilities }) => {
	const animationDelayUtilities: Record<string, Record<string, string>> = {};
	const baseDelay = 300;
	const increment = 150;
	const maxItems = 10;

	for (let i = 1; i <= maxItems; i++) {
		animationDelayUtilities[`.animation-delay-${i}`] = {
			"animation-delay": `${baseDelay + (i - 1) * increment}ms`,
		};
	}

	addUtilities(animationDelayUtilities);
});

/**
 * Adds CSS variables for all colors in the theme
 */
const addVariablesForColors = plugin(({ addBase, theme }) => {
	const allColors = theme("colors");
	const flattenedColors = Object.fromEntries(
		Object.entries(
			allColors as Record<string, string | Record<string, string>>,
		).flatMap(([key, val]) => {
			if (typeof val === "string") {
				return [[key, val]];
			}

			return Object.entries(val).map(([innerKey, innerVal]) => [
				`${key}-${innerKey}`,
				innerVal,
			]);
		}),
	);
	const newVars = Object.fromEntries(
		Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		":root": newVars,
	});
});

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	safelist: [
		{
			pattern: /animation-delay-\d+/,
		},
	],
	theme: {
		container: {
			center: true,
			padding: "0",
			screens: {
				DEFAULT: "640px",
			},
		},
		fontFamily: {
			sans: ["var(--font-sans)"],
			serif: ["var(--font-serif)"],
			ovo: ["var(--font-ovo)"],
			"instrument-serif": ["var(--font-instrument-serif)"],
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				intro: "intro 0.3s forwards ease-out",
				aurora: "aurora 60s linear infinite",
				flip: "flip 8s infinite steps(2, end)",
				rotate: "rotate 4s linear infinite both",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				aurora: {
					from: {
						backgroundPosition: "50% 50%, 50% 50%",
					},
					to: {
						backgroundPosition: "350% 50%, 350% 50%",
					},
				},
				intro: {
					"0%": {
						transform: "translateY(10px)",
						opacity: "0",
						filter: "blur(3px)",
					},
					"100%": {
						transform: "translateY(0px)",
						opacity: "1",
						filter: "blur(0px)",
					},
				},
				flip: {
					to: {
						transform: "rotate(360deg)",
					},
				},
				rotate: {
					to: {
						transform: "rotate(90deg)",
					},
				},
			},
		},
	},
	plugins: [
		tailwindcssAnimate,
		tailwindcssTypography,
		animationDelayPlugin,
		addVariablesForColors,
	],
} satisfies Config;

export default config;
