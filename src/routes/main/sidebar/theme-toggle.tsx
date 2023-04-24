import { useTheme } from "../../../contexts/theme.context"
import { useI18n } from "../../../locale/i18n.context"
import { Toggle } from "../../../ui/toggle"

export const ThemeToggle = () => {
	const [t] = useI18n()
	const { theme, setTheme } = useTheme()

	return (
		<div class="ps-5 pe-3 py-6 rounded-1 flex justify-between items-center select-none color-on-secondary">
			<span class="flex-1 text-sm font-bold">{t.dark_mode()}</span>
			<Toggle checked={theme() === "dark"} onChange={(newValue) => setTheme(newValue ? "dark" : "light")} />
		</div>
	)
}
