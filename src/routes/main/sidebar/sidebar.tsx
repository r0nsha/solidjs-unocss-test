import { Component } from "solid-js"
import { Divider } from "../../../ui/divider"
import { ThemeToggle } from "./theme-toggle"
import { WorkoutList } from "./workout-list"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 min-h-0 bg-surface-100 border-(e-(2 solid) surface-200) flex flex-(col shrink-0)">
			<Title />
			<div class="h-8" />
			<WorkoutList />
			<Divider />
			<ThemeToggle />
		</div>
	)
}

const Title: Component = () => (
	<div class="h-10 flex items-center gap-2 px-4">
		<div class="w-5 h-5 bg-primary-300 rounded-1" />
		<span class="text-sm font-medium">Your name here...</span>
	</div>
)
