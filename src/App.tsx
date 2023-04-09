import type { Component } from "solid-js"

export const App: Component = () => {
	return (
		<div>
			<p class="text-(4xl green-700 center) py-20 font-sans">
				Hello{" "}
				<a
					class="text-pink-600 hover:(font-bold hover:border-1)"
					href="https://antfu.me/posts/reimagine-atomic-css"
					target="atomic-css"
				>
					3 x 12 @ 20kg
				</a>
				!
			</p>
			<p class="text-(5xl center) font-(sans bold)">Setup: web application</p>
			<p class="text-(5xl center) font-(sans bold)">hare</p>
		</div>
	)
}
