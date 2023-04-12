import { Component } from "solid-js"
import { ThemeProvider } from "./components/theme/theme.context"
import { ThemeSelect } from "./components/theme/theme-select"
import { I18nProvider } from "./locale/i18n.context"
import { IconArrowRight } from "@tabler/icons-solidjs"

export const App: Component = () => {
	return (
		<I18nProvider>
			<ThemeProvider>
				<ThemeSelect />
				<IconArrowRight />
			</ThemeProvider>
		</I18nProvider>
	)
}
