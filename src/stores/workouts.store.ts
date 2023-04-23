import { createStore } from "solid-js/store"

export type Workout = {
	publicId: string
	name: string
}

export const [workouts, setWorkouts] = createStore<Workout[]>([])
