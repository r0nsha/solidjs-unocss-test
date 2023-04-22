import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import UnocssPlugin from "unocss/vite"
import visualizer from "rollup-plugin-visualizer"

export default defineConfig({
	plugins: [solidPlugin(), UnocssPlugin(), visualizer()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
})
