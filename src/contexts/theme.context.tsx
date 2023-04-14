import {
	Accessor,
	FlowComponent,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js"
import { useLocalStorage } from "../hooks/useLocalStorage"

export type Theme = "light" | "dark" | "system"
export type SystemTheme = Exclude<Theme, "system">

const ThemeContext = createContext<{ theme: Accessor<SystemTheme>; setTheme: (newTheme: Theme) => void }>()

export const useTheme = () => {
	const value = useContext(ThemeContext)
	if (!value) throw new Error("useTheme must be used within a ThemeProvider")
	return value
}

export const ThemeProvider: FlowComponent = (props) => {
	const systemTheme = useSystemTheme()
	const [theme, setTheme] = useLocalStorage<Theme>("theme", { defaultValue: "system" })

	const getTheme = () => {
		const _theme = theme()
		return _theme === "system" ? systemTheme() : _theme ?? "light"
	}

	createEffect(() => {
		const currentTheme = getTheme()
		document.body.className = `theme-${currentTheme}`
	})

	return (
		<ThemeContext.Provider
			value={{
				theme: getTheme,
				setTheme,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	)
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
