import "uno.css"
import "./index.scss"
import "@unocss/reset/normalize.css"

import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"

import { render } from "solid-js/web"
import { App } from "./app"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?",
	)
}

if (root) {
	render(() => <App />, root)
}
