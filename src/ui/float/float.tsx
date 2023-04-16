import { ReferenceElement, autoUpdate, flip, shift } from "@floating-ui/dom"
import { UseFloatingOptions, UseFloatingResult, useFloating } from "solid-floating-ui"
import { Component, JSXElement, Setter, Show, createEffect, createSignal, mergeProps } from "solid-js"
import { FloatTrigger } from "./triggers"

export type FloatTriggers = FloatTrigger /* | FloatTrigger[] */ | { visible: boolean }

export type FloatChildrenProvided = {
	ref: Setter<HTMLElement | undefined>
}

export type FloatProps = {
	render: (ref: Setter<HTMLElement | undefined>, position: UseFloatingResult) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	trigger?: FloatTriggers
	interactive?: boolean
	options?: UseFloatingOptions<HTMLElement, HTMLElement>
}

// TODO: trigger or trigger array
// TODO: trigger: manual (via prop)
// TODO: trigger: hover
// TODO: trigger: focus
// TODO: trigger: focus-within
// TODO: trigger: click (and key press)
// TODO: interactive
// TODO: interactiveBorder
// TODO: delay
// TODO: onShow
// TODO: onShown
// TODO: onHide
// TODO: onHidden
// TODO: onClickOutside
// TODO: presence animation (scale + shift + fade): using Motion One
export const Float: Component<FloatProps> = (_props) => {
	const props = mergeProps({ trigger: "hover" as FloatTrigger }, _props)

	const shouldShow = () => typeof props.trigger === "object" && props.trigger.visible

	const [reference, setReference] = createSignal<HTMLElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()
	const [show, setShow] = createSignal(shouldShow)

	const position = useFloating(reference, floating, {
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
		...props.options,
		middleware: [flip(), shift(), ...(props.options?.middleware ?? [])],
	})

	// const show = () => {
	// 	// TODO: trigger array
	// 	// if (Array.isArray(props.trigger)) {
	// 	// 	throw new Error("todo")
	// 	// } else
	// 	if (typeof props.trigger === "object") {
	// 		return props.trigger.visible
	// 	} else {
	// 		throw new Error("TODO: triggers")
	// 		// switch (props.trigger) {
	// 		// 	case "hover":
	// 		// 		break
	// 		// }
	// 	}
	// }

	// throw new Error("TODO: triggers")
	// createEffect(() => {
	// 	const ref = reference()
	//
	// 	const triggerHandlers
	//
	// 	ref?.removeEventListener()
	// })

	return (
		<>
			{props.children({ ref: setReference })}
			<Show when={shouldShow()}>{props.render(setFloating, position)}</Show>
		</>
	)
}
