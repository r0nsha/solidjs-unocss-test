import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import UnocssPlugin from "unocss/vite"
import visualizer from "rollup-plugin-visualizer"

export default defineConfig({
	plugins: [solidPlugin(), UnocssPlugin(), visualizer()],
	clearScreen: false,
	server: {
		port: 5173,
		strictPort: true,
	},
	envPrefix: ["VITE_", "TAURI_"],
	build: {
		// Tauri uses Chromium on Windows and WebKit on macOS and Linux
		target: process.env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
})
