import classNames from "classnames"
import { Component, mergeProps } from "solid-js"

export type DividerOrientation = "horizontal" | "vertical"

export type DividerProps = {
	class?: string
	orientation?: DividerOrientation
}

export const Divider: Component<DividerProps> = (_props) => {
	const props = mergeProps({ orientation: "horizontal" } satisfies DividerProps, _props)

	return (
		<div
			class={classNames("bg-surface-200", props.class)}
			classList={{
				"w-full": props.orientation === "horizontal",
				"h-0.35": props.orientation === "horizontal",
				"w-0.35": props.orientation === "vertical",
				"h-full": props.orientation === "vertical",
			}}
		/>
	)
}
