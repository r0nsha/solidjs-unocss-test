import { Component } from "solid-js"
import { ThemeProvider, useThemeContext } from "./contexts/theme.context"

export const App: Component = () => {
	return (
		<ThemeProvider>
			<div>Hello</div>
			<X />
		</ThemeProvider>
	)
}

const X = () => {
	// rome-ignore lint/style/noNonNullAssertion: ThemeContext must exist
	const { setTheme } = useThemeContext()!

	return (
		<>
			<button onClick={() => setTheme(null)}>system</button>
			<button onClick={() => setTheme("light")}>light</button>
			<button onClick={() => setTheme("dark")}>dark</button>
		</>
	)
}
