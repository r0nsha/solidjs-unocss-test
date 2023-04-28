import {
	Preset,
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"
import { RadixColors, presetRadix } from "unocss-preset-radix"

const baseAliases = ["neutral", "primary", "success", "info", "warning", "danger"] as const
type BaseAlias = typeof baseAliases[number]
type Alias = BaseAlias

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: "google",
			fonts: {
				sans: {
					name: "Inter",
					weights: [400, 500, 700],
				},
				mono: {
					name: "Noto Sans Mono",
					weights: [400, 500, 700],
				},
			},
		}),
		presetRadix({
			palette: ["gray", "tomato", "grass", "blue", "amber", "red"],
			aliases: {
				neutral: "gray",
				primary: "tomato",
				success: "grass",
				info: "blue",
				warning: "amber",
				danger: "red",
			} satisfies Record<Alias, RadixColors>,
			lightSelector: ":root, .theme-light",
			darkSelector: ".theme-dark",
			prefix: "--",
		}) as unknown as Preset<{}>,
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
})
