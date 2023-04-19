import { autoUpdate, flip, shift } from "@floating-ui/dom"
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
import { MaybePromise } from "../../types/promise"
import { FloatTrigger, FloatTriggers, manual } from "./triggers"

export type FloatRenderProvided = {
	ref: Setter<HTMLElement | undefined>
	position: UseFloatingResult
}

export type FloatChildrenProvided = {
	ref: Setter<HTMLElement | undefined>
}

type EventHandlers = (readonly [keyof HTMLElementEventMap, (e: Event) => void])[]

export type FloatProps = {
	render: (provided: FloatRenderProvided) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	trigger?: FloatTriggers
	hideOnClick?: boolean
	interactive?: boolean
	options?: UseFloatingOptions<HTMLElement, HTMLElement>
	onClickOutside?: (ev: MouseEvent) => MaybePromise<void>
}

// TODO: trigger: click
// TODO: trigger: onClickOutside
// TODO: trigger: click + hover
// TODO: trigger: click + focus
// TODO: trigger: click - key press
// TODO: disabled
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
	const props = mergeProps(
		{ trigger: "hover" as FloatTrigger, interactive: false, hideOnClick: true },
		_props,
	)

	let hovered = false
	let focused = false

	const [reference, setReference] = createSignal<HTMLElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()
	const [show, setShow] = createSignal(false)

	const position = useFloating(reference, floating, {
		strategy: "fixed",
		whileElementsMounted: autoUpdate,
		...props.options,
		middleware: [flip(), shift(), ...(props.options?.middleware ?? [])],
	})

	// PERF: calling `hasTrigger` everywhere is inefficient
	const hasTrigger = (is: FloatTrigger) =>
		!manual(props.trigger) &&
		(Array.isArray(props.trigger) ? props.trigger.includes(is) : props.trigger === is)

	const onMouseEnter = (e: MouseEvent) => {
		hovered = true

		if (!hasTrigger("hover")) {
			return
		}

		setShow(true)
	}

	const onMouseLeave = (e: MouseEvent) => {
		hovered = false

		if (!hasTrigger("hover")) {
			return
		}

		if (hasTrigger("focus") && focused) {
			return
		}

		setShow(false)
	}

	const onFocus = (e: FocusEvent) => {
		focused = true

		if (!hasTrigger("focus") && !hasTrigger("focusin")) {
			return
		}

		setShow(true)
	}

	const onBlur = (e: FocusEvent) => {
		focused = false

		if (!hasTrigger("focus") && !hasTrigger("focusin")) {
			return
		}

		if (hasTrigger("hover") && hovered) {
			return
		}

		setShow(false)
	}

	const onClick = (e: MouseEvent) => {
		if (!hasTrigger("click")) {
			return
		}

		setShow(true)
	}

	createEffect(() => {
		const ref = reference()

		if (manual(props.trigger) || !ref) {
			return
		}

		ref.addEventListener("mouseenter", onMouseEnter)
		ref.addEventListener("mouseleave", onMouseLeave)
		ref.addEventListener("focus", onFocus)
		ref.addEventListener("blur", onBlur)
		ref.addEventListener("focusin", onFocus)
		ref.addEventListener("focusout", onBlur)
	})

	createRenderEffect(() => {
		if (manual(props.trigger)) {
			setShow(props.trigger.visible)
		}
	})

	const hideOnClickHandler = () => setShow(false)

	// const hideOnKeypressHandler = (e: KeyboardEvent) => {
	// 	if (isFloatTriggerKey(e.key as Key)) {
	// 		hide()
	// 	}
	// }

	createEffect(() => {
		const ref = reference()

		if (manual(props.trigger) || !ref) {
			return
		}

		if (props.hideOnClick) {
			if (show()) {
				ref.addEventListener("click", hideOnClickHandler)
				// ref.addEventListener("keypress", hideOnKeypressHandler)
			} else {
				ref.removeEventListener("click", hideOnClickHandler)
				// ref.removeEventListener("keypress", hideOnKeypressHandler)
			}
		}
	})

	// const bodyClickHandler = (ev: MouseEvent) => {
	// 	const ref = reference()
	// 	const f = floating()
	//
	// 	if (f && !f.contains(ev.target as Node | null) && ref && !ref.contains(ev.target as Node | null)) {
	// 		hide()
	// 		props.onClickOutside?.(ev)
	// 	}
	// }
	//
	// createEffect(() => {
	// 	if (shown()) {
	// 		setTimeout(() => document.body.addEventListener("click", bodyClickHandler))
	// 	} else {
	// 		setTimeout(() => document.body.removeEventListener("click", bodyClickHandler))
	// 	}
	// })

	// createEffect(() => {
	// 	const f = floating()
	//
	// 	if (f) {
	// 		f.style.pointerEvents = props.interactive ? "auto" : "none"
	// 	}
	// })

	// createEffect(() => {
	// 	const ref = reference()
	//
	// 	if (ref && props.interactive) {
	// 		ref.addEventListener("mousedown", (e) => e.preventDefault())
	// 	}
	// })

	return (
		<>
			{props.children({ ref: setReference })}
			<Show when={show()}>{props.render({ ref: setFloating, position })}</Show>
		</>
	)
}
