import { ReferenceElement } from "@floating-ui/dom"
import { UseFloatingResult, useFloating } from "solid-floating-ui"
import { Component, JSXElement, Setter, createSignal } from "solid-js"

export type FloatProps = {
	render: (ref: Setter<HTMLElement | undefined>, position: UseFloatingResult) => JSXElement
	children: (ref: Setter<ReferenceElement | undefined>) => JSXElement
}

export const Float: Component<FloatProps> = (props) => {
	const [reference, setReference] = createSignal<ReferenceElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()

	const position = useFloating(reference, floating)

	return (
		<>
			{props.children(setReference)}
			{props.render(setFloating, position)}
		</>
	)
}
