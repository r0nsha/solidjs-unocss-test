import { Component } from "solid-js"
import { ThemeProvider } from "./components/theme/theme.context"
import { ThemeSelect } from "./components/theme/theme-select"

export const App: Component = () => {
	return (
		<ThemeProvider>
			<ThemeSelect />
		</ThemeProvider>
	)
}
