import { Component } from "solid-js"
import { ThemeProvider, useThemeContext } from "./components/theme/theme.context"
import { ThemeSelect } from "./components/theme/theme-select"

export const App: Component = () => {
	return (
		<ThemeProvider>
			<div>Hello</div>
			<ThemeSelect />
		</ThemeProvider>
	)
}
