import {
	defineConfig,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss"

const colors = ["surface", "primary", "success", "info", "warning", "danger"] as const
type Color = typeof colors[number]

type ColorPalette = Record<number, string>

const forEachColorLevel = (fn: (level: number) => void) => {
	fn(50)
	for (let i = 100; i < 1000; i += 100) {
		fn(i)
	}
	fn(950)
}

const colorPalette = (color: Color): ColorPalette => {
	const palette: Record<number, string> = {}
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
					name: "Noto Sans",
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
			},
		},
	},
})
