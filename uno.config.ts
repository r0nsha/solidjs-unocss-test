import { Preset, defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from "unocss"
import { RadixColors, presetRadix } from "./vendor/unocss-preset-radix/src"

const palette: readonly RadixColors[] = ["mauve", "purple", "green", "blue", "orange", "red"] as const
const aliases = ["neutral", "primary", "success", "info", "warning", "danger"] as const
type Alias = typeof aliases[number]

export default defineConfig({
	presets: [
		presetUno(),
		// presetWebFonts({
		// 	provider: "google",
		// 	fonts: {
		// 		sans: {
		// 			name: "Inter",
		// 			weights: [400, 500, 700],
		// 		},
		// 		mono: {
		// 			name: "Noto Sans Mono",
		// 			weights: [400, 500, 700],
		// 		},
		// 	},
		// }),
		presetRadix({
			palette,
			aliases: {
				neutral: "mauve",
				primary: "purple",
				success: "green",
				info: "blue",
				warning: "orange",
				danger: "red",
			} satisfies Record<Alias, RadixColors>,
			lightSelector: ":root, .theme-light",
			darkSelector: ".theme-dark",
			prefix: "--",
		}) as unknown as Preset<{}>,
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	safelist: [...[...palette, ...aliases].map((c) => `hue-${c}`)],
})
