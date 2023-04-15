import { IconFileDescription } from "@tabler/icons-solidjs"
import { Component } from "solid-js"

export const WorkoutList: Component = () => {
	return (
		<div class="flex flex-col gap-1 flex-1 mx-1">
			<WorkoutItem text={"Untitled"} />
			<WorkoutItem text={"Stronglifts 5x5"} />
			<WorkoutItem text={"Starting Strength"} />
			<WorkoutItem text={"GZCLP"} />
		</div>
	)
}

type WorkoutItemProps = {
	text: string
}

const WorkoutItem: Component<WorkoutItemProps> = (props) => {
	return (
		<div class="h-[fit-content] px-2 py-1 rounded-1 text-sm font-bold flex items-center gap-2.5 select-none color-on-secondary transition-colors duration-100 hover:(bg-surface-100 color-on-primary) active:bg-surface-200">
			<IconFileDescription size={22} />
			<span class="flex-1">{props.text}</span>
		</div>
	)
}
