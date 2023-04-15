import { ReferenceElement, autoUpdate, flip, shift } from "@floating-ui/dom"
import { UseFloatingOptions, UseFloatingResult, useFloating } from "solid-floating-ui"
import { Component, JSXElement, Setter, createSignal } from "solid-js"

export type FloatChildrenProvided = {
	ref: Setter<ReferenceElement | undefined>
}

export type FloatProps = {
	render: (ref: Setter<HTMLElement | undefined>, position: UseFloatingResult) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	options?: UseFloatingOptions<ReferenceElement, HTMLElement>
}

export const Float: Component<FloatProps> = (props) => {
	const [reference, setReference] = createSignal<ReferenceElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()

	const position = useFloating(reference, floating, {
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
		...props.options,
		middleware: [flip(), shift(), ...(props.options?.middleware ?? [])],
	})

	return (
		<>
			{props.children({ ref: setReference })}
			{props.render(setFloating, position)}
		</>
	)
}
