import { Component } from "solid-js"
import { ThemeProvider } from "./components/theme/theme.context"
import { ThemeSelect } from "./components/theme/theme-select"
import { IconArrowRight } from "@tabler/icons-solidjs"

export const App: Component = () => {
	return (
		<ThemeProvider>
			<div>Hello</div>
			<IconArrowRight class="color-primary-500" size={48} />
			<ThemeSelect />
		</ThemeProvider>
	)
}
