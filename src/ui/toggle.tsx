import classNames from "classnames"
import { Component } from "solid-js"

export type ToggleProps = {
	checked?: boolean
	disabled?: boolean
	onChange?: (newValue: boolean, event: MouseEvent) => void
}

export const Toggle: Component<ToggleProps> = (props) => {
	return (
		<button
			class={classNames(
				"relative w-10 h-4.5 rounded-full flex items-center outline-transparent border-none",
				props.checked
					? "bg-primary-9 hover:bg-primary-10 active:bg-primary-11 focus-visible:outline-neutral-11"
					: "bg-neutralA-6 hover:bg-neutralA-7 active:bg-neutralA-8",
				props.disabled && "opacity-50 pointer-events-none",
			)}
			disabled={props.disabled}
			onClick={(ev) => props.onChange?.(!props.checked, ev)}
		>
			<div
				class={classNames(
					"w-3 h-3 bg-white rounded-full absolute top-[50%] translate-y-[-50%] transition-inset duration-150",
					props.checked ? "inset-s-6" : "inset-s-1",
				)}
			/>
		</button>
	)
}
