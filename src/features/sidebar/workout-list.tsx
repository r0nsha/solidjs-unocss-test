import { IconFileDescription } from "@tabler/icons-solidjs"
import { Component } from "solid-js"
import { Button } from "../../ui/button"
import { ListItem } from "../../ui/list-item"

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
	return <ListItem prefixIcon={IconFileDescription} text={props.text} />
}
