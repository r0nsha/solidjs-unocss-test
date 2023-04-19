import { IconFileDescription, IconSquarePlus } from "@tabler/icons-solidjs"
import { Component } from "solid-js"
import { Button } from "../../ui/button"
import { ListItem } from "../../ui/list-item"
import { useI18n } from "../../locale/i18n.context"
import { Divider } from "../../ui/divider"
import { Tooltip } from "../../ui/float/tooltip"

export const WorkoutList: Component = () => {
	const [t] = useI18n()

	return (
		<div class="flex flex-(col 1) mx-1">
			<div class="ps-2 pb-1 flex justify-between items-center select-none">
				<span class="font-bold">{t.workouts()}</span>
				<Tooltip text={t.create_a_workout()} trigger={["click", "focus"]}>
					{(provided) => <Button {...provided} variant="ghost" colorScheme="neutral" icon={IconSquarePlus} />}
				</Tooltip>
			</div>
			<Divider />
			<div class="flex flex-(col 1) gap-1 py-2">
				<WorkoutItem text={"Untitled"} />
				<WorkoutItem text={"Stronglifts 5x5"} />
				<WorkoutItem text={"Starting Strength"} />
				<WorkoutItem text={"GZCLP"} />
			</div>
		</div>
	)
}

type WorkoutItemProps = {
	text: string
}

const WorkoutItem: Component<WorkoutItemProps> = (props) => {
	return <ListItem prefixIcon={IconFileDescription} text={props.text} />
}
