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

// TODO: basic theme toggle setting
const X = () => {
	// rome-ignore lint/style/noNonNullAssertion: ThemeContext must exist
	const { setTheme } = useThemeContext()!

	return (
		<>
			<button onClick={() => setTheme("system")}>system</button>
			<button onClick={() => setTheme("light")}>light</button>
			<button onClick={() => setTheme("dark")}>dark</button>
		</>
	)
}
