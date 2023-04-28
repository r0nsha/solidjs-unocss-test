import {
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"

const colors = ["neutral", "primary", "success", "info", "warning", "danger"] as const
type Color = typeof colors[number]

type ColorPalette = Record<string | number, string>

const forEachColorLevel = (fn: (level: string | number) => void) => {
	fn(50)
	for (let i = 100; i < 1000; i += 100) {
		fn(i)
	}
	fn(950)
	fn("hover")
	fn("active")
}

const colorPalette = (color: Color): ColorPalette => {
	const palette: ColorPalette = {}
	forEachColorLevel((level) => {
		palette[level] = `var(--${color}-${level})`
	})
	return palette
}

const colorTheme = () => {
	const t: Partial<Record<Color, ColorPalette>> = {}
	colors.forEach((color) => {
		t[color] = colorPalette(color)
	})
	return t
}

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
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {
		colors: {
			...colorTheme(),
			on: {
				primary: "var(--on-primary)",
				secondary: "var(--on-secondary)",
				dim: "var(--on-dim)",
			},
		},
	},
})
