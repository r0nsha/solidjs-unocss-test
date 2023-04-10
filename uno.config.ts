import {
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"

const colorPalette = (name: string): Record<number, string> => {
	const palette: Record<number, string> = {}

	for (let i = 100; i < 1000; i += 100) {
		palette[i] = `var(--${name}-${i})`
	}

	return palette
}

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: "google",
			fonts: {
				sans: "DM Sans",
				mono: "Noto Sans Mono",
			},
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {
		colors: {
			surface: colorPalette("surface"),
			on: {
				primary: "var(--on-primary)",
				secondary: "var(--on-secondary)",
			},
		},
	},
})
