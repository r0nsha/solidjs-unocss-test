import { Component, onMount } from "solid-js"

export const App: Component = () => {
	onMount(() => {
		document.body.classList.add("theme-light")
	})

	return <div>Hello</div>
}
