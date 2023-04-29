import { IconFile, IconPlus } from "@tabler/icons-solidjs"
import { Component, For } from "solid-js"
import { Button } from "../../../ui/button"
import { ListItem } from "../../../ui/list-item"
import { useI18n } from "../../../locale/i18n.context"
import { Tooltip } from "../../../ui/float/tooltip"
import { Workout, setWorkouts, workouts } from "../../../stores/workouts.store"
import { nanoid } from "nanoid"

export const WorkoutList: Component = () => {
	const [t] = useI18n()

	const addWorkout = () => setWorkouts([...workouts, { publicId: nanoid(), name: "" }])

	return (
		<div class="min-h-0 flex flex-(col 1)">
			<div class="ps-4 pe-2 flex justify-between items-center">
				<span class="text-sm font-bold select-none">{t.workouts()}</span>
				<Tooltip text={t.create_a_workout()} subtext="Ctrl+N">
					{(provided) => (
						<Button
							{...provided}
							small
							variant="ghost"
							color="neutral"
							icon={IconPlus}
							onClick={addWorkout}
						/>
					)}
				</Tooltip>
			</div>
			<div class="min-h-0 flex flex-(col 1) gap-0.5 px-2 py-1 overflow-y-auto">
				<For each={workouts}>{(workout) => <WorkoutItem workout={workout} />}</For>
			</div>
		</div>
	)
}

type WorkoutItemProps = {
	workout: Workout
}

const WorkoutItem: Component<WorkoutItemProps> = (props) => {
	const [t] = useI18n()

	const name = () => {
		const name = props.workout.name.trim()
		return name !== "" ? name : t.untitled()
	}

	// TODO: use IconFileDescription if workout is not empty

	return <ListItem prefixIcon={IconFile} text={name()} />
}
