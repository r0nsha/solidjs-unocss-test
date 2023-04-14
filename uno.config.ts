import {
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"

const colorPalette = (name: string): Record<number, string> => {
	const palette: Record<number, string> = {}

	const add = (level: number) => (palette[level] = `var(--${name}-${level})`)

	add(50)

	for (let i = 100; i < 1000; i += 100) {
		add(i)
	}

	add(950)

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
			primary: colorPalette("primary"),
			success: colorPalette("success"),
			info: colorPalette("info"),
			warning: colorPalette("warning"),
			danger: colorPalette("danger"),
		},
	},
})
