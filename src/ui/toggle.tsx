import { Component, JSX } from "solid-js"

export type ToggleProps = {
	checked?: boolean
	onChange?: (newValue: boolean, event: Event) => void
}

export const Toggle: Component<ToggleProps> = (props) => {
	return (
		<div class="relative w-10 h-3.5 rounded-3.5 bg-surface-400">
			<div class="" />
		</div>
	)
}
