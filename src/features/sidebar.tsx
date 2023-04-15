import { Component } from "solid-js"
import { useI18n } from "../locale/i18n.context"
import { IconFileDescription } from "@tabler/icons-solidjs"
import { useTheme } from "../contexts/theme.context"
import { Toggle } from "../ui/toggle"
import { Divider } from "../ui/divider"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 border-e-(2 solid surface-100) flex flex-col">
			<Title />
			<div class="flex-1 mx-1">
				<WorkoutItem text={"Untitled"} />
			</div>
			<ThemeToggle />
		</div>
	)
}

const Title: Component = () => {
	return (
		<div class="h-11 flex items-center gap-2.5 px-3">
			<div class="w-5.5 h-5.5 bg-primary-300 rounded-1" />
			<span class="text-sm font-bold">Your name here...</span>
		</div>
	)
}

type WorkoutItemProps = {
	text: string
}

const WorkoutItem: Component<WorkoutItemProps> = (props) => {
	return (
		<div class="h-[fit-content] px-2 py-1 rounded-1 text-sm font-bold flex items-center gap-2.5 select-none color-on-secondary transition-colors duration-100 hover:bg-surface-100 active:bg-surface-200">
			<IconFileDescription size={22} />
			<span class="flex-1">{props.text}</span>
		</div>
	)
}

const ThemeToggle = () => {
	const [t] = useI18n()
	const { theme, setTheme } = useTheme()

	return (
		<div class="mx-1">
			<Divider />
			<div class="px-2 py-6 rounded-1 flex justify-between items-center gap-2.5 select-none color-on-secondary">
				<span class="flex-1 text-sm font-bold">{t.dark_mode()}</span>
				<Toggle checked={theme() === "dark"} onChange={(newValue) => setTheme(newValue ? "dark" : "light")} />
			</div>
		</div>
	)
}
