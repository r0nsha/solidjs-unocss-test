import { ReferenceElement, autoUpdate, flip, shift } from "@floating-ui/dom"
import { UseFloatingOptions, UseFloatingResult, useFloating } from "solid-floating-ui"
import { Component, JSXElement, Setter, createSignal, mergeProps } from "solid-js"

export type FloatTrigger = "hover" | "focus" | "focus-within" | "click"
export type FloatTriggers = FloatTrigger | FloatTrigger[] | { visible: boolean }

export type FloatChildrenProvided = {
	ref: Setter<ReferenceElement | undefined>
}

export type FloatProps = {
	render: (ref: Setter<HTMLElement | undefined>, position: UseFloatingResult) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	trigger?: FloatTrigger
	interactive?: boolean
	options?: UseFloatingOptions<ReferenceElement, HTMLElement>
}

// TODO: trigger or trigger array
// TODO: trigger: manual (via prop)
// TODO: trigger: hover
// TODO: trigger: focus
// TODO: trigger: focus-within
// TODO: trigger: click (and key press)
// TODO: presence animation (scale + shift + fade)
// TODO: interactive
// TODO: interactiveBorder
// TODO: delay
// TODO: onShow
// TODO: onShown
// TODO: onHide
// TODO: onHidden
// TODO: onClickOutside (use:clickOutside)
export const Float: Component<FloatProps> = (_props) => {
	const props = mergeProps({ trigger: "hover" }, _props)

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
