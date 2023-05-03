import { Component } from "solid-js"
import { WorkoutList } from "./workout-list"
import { ListItem } from "../../../ui/list-item"
import { IconSettings } from "@tabler/icons-solidjs"
import { useI18n } from "../../../locale/i18n.context"
import { Menu } from "../../../ui/float/menu"
import { useTheme } from "../../../contexts/theme.context"
import { Toggle } from "../../../ui/toggle"
import { Divider } from "../../../ui/divider"

export const Sidebar: Component = () => {
	return (
		<div class="w-70 min-h-0 bg-neutral-2 flex flex-(col shrink-0)">
			<div class="h-10" />
			<WorkoutList />
			<Divider />
			<Settings />
		</div>
	)
}

const Settings: Component = () => {
	const [t] = useI18n()

	return (
		<div class="flex flex-col px-2 py-4">
			<Menu
				class="w-60"
				options={{
					placement: "right-end",
				}}
				content={
					<>
						<Menu.Item closeMode="none" readonly text={t.dark_mode()} suffix={<ThemeToggle />} />
					</>
				}
			>
				{(provided) => (
					<ListItem
						ref={provided.ref}
						prefixIcon={IconSettings}
						text={t.settings()}
						selected={provided.visible()}
					/>
				)}
			</Menu>
		</div>
	)
}

const ThemeToggle: Component = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Toggle checked={theme() === "dark"} onChange={(newValue) => setTheme(newValue ? "dark" : "light")} />
	)
}
