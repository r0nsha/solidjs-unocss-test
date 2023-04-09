import { defineConfig, presetUno, presetWebFonts, transformerVariantGroup } from "unocss"

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
	transformers: [transformerVariantGroup()],
})
