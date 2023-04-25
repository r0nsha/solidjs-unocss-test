import classNames from "classnames"
import { Component } from "solid-js"

export type ToggleProps = {
	checked?: boolean
	// TODO:
	// disabled?: boolean
	onChange?: (newValue: boolean, event: MouseEvent) => void
}

export const Toggle: Component<ToggleProps> = (props) => {
	return (
		<button
			class={classNames(
				"relative w-10 h-4.5 rounded-4.5 flex items-center transition-(colors opacity) duration-100 outline-transparent border-none",
				props.checked
					? "bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
					: "bg-surface-300 hover:bg-surface-400 active:bg-surface-500",
			)}
			onClick={(ev) => props.onChange?.(!props.checked, ev)}
		>
			<div
				class={classNames(
					"w-3 h-3 bg-white rounded-3 absolute top-[50%] translate-y-[-50%] transition-inset duration-150",
					props.checked ? "inset-s-6" : "inset-s-1",
				)}
			/>
		</button>
	)
}
