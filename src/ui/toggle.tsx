import classNames from "classnames"
import { Component } from "solid-js"

export type ToggleProps = {
	checked?: boolean
	onChange?: (newValue: boolean, event: Event) => void
}

export const Toggle: Component<ToggleProps> = (props) => {
	return (
		<div
			class={classNames(
				"relative w-10 h-4.5 rounded-4.5 flex items-center transition-colors duration-100",
				props.checked
					? "bg-primary-300 hover:bg-primary-400 active:bg-primary-500"
					: "bg-surface-300 hover:bg-surface-400 active:bg-surface-500",
			)}
			classList={{
				"bg-primary-500": props.checked,
			}}
			onKeyPress={(e) => props.onChange?.(!props.checked, e)}
			onClick={(e) => props.onChange?.(!props.checked, e)}
		>
			<div
				class="w-3 h-3 bg-white rounded-[50%] absolute top-[50%] inset-s-1 translate-y-[-50%] transition-inset duration-150"
				classList={{
					"inset-s-6": props.checked,
				}}
			/>
		</div>
	)
}
