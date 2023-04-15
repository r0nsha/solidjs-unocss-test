import { FlowComponent } from "solid-js"

export type TooltipProps = {
	text: string
}

// TODO: floating tooltip
export const Tooltip: FlowComponent<TooltipProps> = (props) => {
	return props.children
}
