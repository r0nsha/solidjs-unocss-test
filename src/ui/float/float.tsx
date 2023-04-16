import { ReferenceElement, autoUpdate, flip, shift } from "@floating-ui/dom"
import { UseFloatingOptions, UseFloatingResult, useFloating } from "solid-floating-ui"
import {
	Component,
	JSXElement,
	Setter,
	Show,
	createEffect,
	createRenderEffect,
	createSignal,
	mergeProps,
} from "solid-js"
import {
	FloatTrigger,
	FloatTriggerEventHandlers,
	getFloatTriggerProps as getFloatTriggerEventHandlers,
} from "./triggers"

export type ManualFloatTrigger = { visible: boolean }
export type FloatTriggers = FloatTrigger | FloatTrigger[] | ManualFloatTrigger

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

	const [reference, setReference] = createSignal<HTMLElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()
	const [showStates, setShowStates] = createSignal<boolean[]>([])

	const position = useFloating(reference, floating, {
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
		...props.options,
		middleware: [flip(), shift(), ...(props.options?.middleware ?? [])],
	})

	let lastEventHandlers: FloatTriggerEventHandlers = []

	const isManual = (trigger: FloatTriggers): trigger is ManualFloatTrigger =>
		typeof trigger === "object" && !Array.isArray(trigger)

	createRenderEffect(() => {
		if (isManual(props.trigger)) {
			setShowStates([props.trigger.visible])
		}
	})

	createEffect(() => {
		const ref = reference()

		if (isManual(props.trigger) || !ref) {
			return
		}

		lastEventHandlers.forEach(([ev, handler]) => ref.removeEventListener(ev, handler))

		let eventHandlers: FloatTriggerEventHandlers

		if (Array.isArray(props.trigger)) {
			setShowStates(Array(props.trigger.length).fill(false))

			eventHandlers = props.trigger.reduce(
				(acc, trigger, index) => [
					...acc,
					...getFloatTriggerEventHandlers(trigger, (show) => {
						setShowStates((states) => states.map((state, i) => (i === index ? show : state)))
					}),
				],
				[] as FloatTriggerEventHandlers,
			)
		} else {
			eventHandlers = getFloatTriggerEventHandlers(props.trigger, (show) => setShowStates([show]))
		}

		eventHandlers.forEach(([ev, handler]) => ref.addEventListener(ev, handler))

		lastEventHandlers = eventHandlers
	})

	return (
		<>
			{props.children({ ref: setReference })}
			<Show when={showStates().some(Boolean)}>{props.render(setFloating, position)}</Show>
		</>
	)
}
