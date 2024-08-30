import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const animationDelayPlugin = plugin(({ addUtilities }) => {
	const animationDelayUtilities: Record<string, Record<string, string>> = {};
	const baseDelay = 200;
	const increment = 200;
	const maxItems = 99;

	for (let i = 1; i <= maxItems; i++) {
		animationDelayUtilities[`.animation-delay-${i}`] = {
			"animation-delay": `${baseDelay + (i - 1) * increment}ms`,
		};
	}

	addUtilities(animationDelayUtilities);
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
				intro: "intro 0.5s forwards ease-out",
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
				intro: {
					"0%": {
						transform: "translateY(10px)",
						opacity: "0",
						filter: "blur(5px)",
					},
					"100%": {
						transform: "translateY(0px)",
						opacity: "1",
						filter: "blur(0px)",
					},
				},
			},
		},
	},
	plugins: [tailwindcssAnimate, animationDelayPlugin],
} satisfies Config;

export default config;
