import { useThemeContext } from "./theme.context"

// TODO: basic theme toggle setting
export const ThemeSelect = () => {
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
