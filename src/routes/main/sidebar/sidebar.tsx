import { Component } from "solid-js"
import { WorkoutList } from "./workout-list"
import { IconSettings } from "@tabler/icons-solidjs"
import { useI18n } from "../../../locale/i18n.context"
import { Menu } from "../../../ui/float/menu"
import { useTheme } from "../../../contexts/theme.context"
import { Toggle } from "../../../ui/toggle"
import { Button } from "../../../ui/button"

export const Sidebar: Component = () => {
	return (
		<div class="w-70 min-h-0 bg-neutral-2 flex flex-(col shrink-0)">
			<div class="h-10 flex justify-end items-center px-2 mb-6">
				<Settings />
			</div>
			<WorkoutList />
		</div>
	)
}

const Settings: Component = () => {
	const [t] = useI18n()

	return (
		<Menu
			class="w-60"
			content={
				<>
					<span class="px-2 text-sm font-medium">{t.settings()}</span>
					<Menu.Item closeMode="none" readonly text={t.dark_mode()} suffix={<ThemeToggle />} />
				</>
			}
		>
			{(provided) => (
				<Button
					ref={provided.ref}
					variant="ghost"
					icon={IconSettings}
					size="sm"
					selected={provided.visible()}
				/>
			)}
		</Menu>
	)
}

const ThemeToggle: Component = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Toggle checked={theme() === "dark"} onChange={(newValue) => setTheme(newValue ? "dark" : "light")} />
	)
}
