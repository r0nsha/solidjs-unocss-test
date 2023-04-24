import { Component } from "solid-js"
import { Divider } from "../../../ui/divider"
import { ThemeToggle } from "./theme-toggle"
import { WorkoutList } from "./workout-list"
import { ListItem } from "../../../ui/list-item"
import { IconSettings } from "@tabler/icons-solidjs"
import { useI18n } from "../../../locale/i18n.context"
import { Menu } from "../../../ui/float/menu"
import { useTheme } from "../../../contexts/theme.context"
import { Toggle } from "../../../ui/toggle"

export const Sidebar: Component = () => {
	const [t] = useI18n()

	const { theme, setTheme } = useTheme()

	return (
		<div class="w-60 min-h-0 bg-surface-100 border-(e-(1 solid) surface-200) flex flex-(col shrink-0)">
			<Title />
			<div class="flex flex-col mt-2 mb-4">
				<Menu
					options={{ placement: "bottom-start" }}
					// FIXME: menu abruptly closes when changing themes
					content={
						<>
							<Menu.Item
								closeMode="none"
								readonly
								text={t.dark_mode()}
								suffix={
									<Toggle
										checked={theme() === "dark"}
										onChange={(newValue) => setTheme(newValue ? "dark" : "light")}
									/>
								}
							/>
						</>
					}
				>
					{(provided) => (
						<ListItem ref={provided.ref} class="mx-1" prefixIcon={IconSettings} text={t.settings()} />
					)}
				</Menu>
			</div>
			<WorkoutList />
			<Divider />
			<ThemeToggle />
		</div>
	)
}

const Title: Component = () => (
	<div class="h-10 flex items-center gap-2 px-3">
		<div class="w-5 h-5 bg-primary-300 rounded-1" />
		<span class="text-sm font-medium">Your name here...</span>
	</div>
)
