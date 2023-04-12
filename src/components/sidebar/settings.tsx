import { useTheme } from "../../contexts/theme.context"

export const ThemeSelect = () => {
	const { setTheme } = useTheme()

	return (
		<>
			<button onClick={() => setTheme("system")}>system</button>
			<button onClick={() => setTheme("light")}>light</button>
			<button onClick={() => setTheme("dark")}>dark</button>
		</>
	)
}
