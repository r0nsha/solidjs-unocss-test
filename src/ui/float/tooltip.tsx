import { Component, FlowComponent, splitProps } from "solid-js"
import { Float, FloatProps } from "./float"

export type TooltipProps = Omit<FloatProps, "render"> & {
	text: string
}

export const Tooltip: Component<TooltipProps> = (props) => {
	const [local, float] = splitProps(props, ["text"])

	return (
		<Float
			{...float}
			render={(ref, position) => (
				<div
					ref={ref}
					style={{
						position: position.strategy,
						top: `${position.y ?? 0}px`,
						left: `${position.x ?? 0}px`,
					}}
				>
					{local.text}
				</div>
			)}
		/>
	)
}
