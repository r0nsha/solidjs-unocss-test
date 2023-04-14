import { Component } from "solid-js"
import { useI18n } from "../../locale/i18n.context"
import { IconFileDescription } from "@tabler/icons-solidjs"
import { useTheme } from "../../contexts/theme.context"
import { Toggle } from "../../ui/toggle"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 border-e-(2 solid surface-100) flex flex-col">
			<Title />
			<div class="flex-1 mx-1">
				<WorkoutItem text={"Untitled"} />
			</div>
			<div class="mx-1 mb-6">
				<ThemeSelect />
			</div>
		</div>
	)
}

const Title: Component = () => {
	return (
		<div class="h-11 flex items-center gap-2.5 px-3">
			<div class="w-5.5 h-5.5 bg-primary-200 rounded-1" />
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

const ThemeSelect = () => {
	const [t] = useI18n()
	const { setTheme } = useTheme()

	// <button onClick={() => setTheme("system")}>system</button>
	// <button onClick={() => setTheme("light")}>light</button>
	// <button onClick={() => setTheme("dark")}>dark</button>
	// <Switch />
	return (
		<>
			<div class="px-2 py-1 rounded-1 flex justify-between items-center gap-2.5 select-none color-on-secondary">
				<span class="flex-1 text-sm font-bold">{t.theme()}</span>
				<Toggle />
			</div>
		</>
	)
}
