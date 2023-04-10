import {
	Accessor,
	Component,
	JSXElement,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js"
import { useLocalStorage } from "../../hooks/useLocalStorage"

export type Theme = "light" | "dark" | "system"
export type SystemTheme = Exclude<Theme, "system">

const ThemeContext = createContext<{ setTheme: (newTheme: Theme) => void }>()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider: Component<{
	children?: JSXElement
}> = (props) => {
	const systemTheme = useSystemTheme()
	const [theme, setTheme] = useLocalStorage<Theme>("theme", { defaultValue: "system" })

	createEffect(() => {
		const _theme = theme()
		const currentTheme = _theme === "system" ? systemTheme() : _theme
		document.body.className = `theme-${currentTheme}`
	})

	return <ThemeContext.Provider value={{ setTheme }}>{props.children}</ThemeContext.Provider>
}

const useSystemTheme = (): Accessor<SystemTheme> => {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

	const getSystemTheme = (matches: boolean): SystemTheme => (matches ? "dark" : "light")

	const [systemTheme, setSystemTheme] = createSignal<SystemTheme>(getSystemTheme(mediaQuery.matches))

	const listener = (e: MediaQueryListEvent) => setSystemTheme(getSystemTheme(e.matches))

	onMount(() => mediaQuery.addEventListener("change", listener))
	onCleanup(() => mediaQuery.removeEventListener("change", listener))

	return systemTheme
}
