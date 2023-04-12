import { Component } from "solid-js"
import { I18nProvider } from "./locale/i18n.context"
import { ThemeProvider } from "./contexts/theme.context"
import { Main } from "./components/main/main"

export const App: Component = () => {
	return (
		<I18nProvider>
			<ThemeProvider>
				<Main />
			</ThemeProvider>
		</I18nProvider>
	)
}
