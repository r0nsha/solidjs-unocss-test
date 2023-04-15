import { IconFileDescription } from "@tabler/icons-solidjs"
import { Component } from "solid-js"
import { Divider } from "../../ui/divider"
import { ThemeToggle } from "./theme-toggle"
import { WorkoutList } from "./workout-list"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 border-e-(2 solid surface-100) flex flex-col">
			<Title />
			<WorkoutList />
			<div class="mx-1">
				<Divider />
				<ThemeToggle />
			</div>
		</div>
	)
}

const Title: Component = () => (
	<div class="h-11 flex items-center gap-2.5 px-3">
		<div class="w-5.5 h-5.5 bg-primary-300 rounded-1" />
		<span class="text-sm font-medium">Your name here...</span>
	</div>
)