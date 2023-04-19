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

export type FloatProps = {
	render: (provided: FloatRenderProvided) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	trigger?: FloatTriggers
	hideOnClick?: boolean
	interactive?: boolean
	options?: UseFloatingOptions<HTMLElement, HTMLElement>
	onClickOutside?: (ev: MouseEvent) => MaybePromise<void>
}

// TODO: trigger: click + hover
// TODO: trigger: click + focus
// TODO: trigger: click - key press
// TODO: disabled
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

	let lastTriggerEvent: Event | null = null
	let hovered = false
	let focused = false

	const [reference, setReference] = createSignal<HTMLElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()
	const [visible, setVisible] = createSignal(false)

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

	const hasAnyFocusTrigger = () => hasTrigger("focus") || hasTrigger("focusin")

	const show = () => setVisible(true)
	const hide = () => setVisible(false)

	const onMouseEnter = (ev: MouseEvent) => {
		lastTriggerEvent = ev
		hovered = true

		if (!hasTrigger("hover")) {
			return
		}

		show()
	}

	const onMouseLeave = (ev: MouseEvent) => {
		lastTriggerEvent = ev
		hovered = false

		if (!hasTrigger("hover")) {
			return
		}

		if (hasAnyFocusTrigger() && focused) {
			return
		}

		hide()
	}

	const onFocus = (ev: FocusEvent) => {
		lastTriggerEvent = ev
		focused = true

		if (!hasAnyFocusTrigger()) {
			return
		}

		show()
	}

	const onBlur = (ev: FocusEvent) => {
		lastTriggerEvent = ev
		focused = false

		if (!hasAnyFocusTrigger()) {
			return
		}

		if (hasTrigger("hover") && hovered) {
			return
		}

		hide()
	}

	const onMouseUp = (ev: MouseEvent) => {
		const wasFocused = lastTriggerEvent?.type === "focus"
		lastTriggerEvent = ev

		if (!hasTrigger("click")) {
			return
		}

		if (hasAnyFocusTrigger() && focused) {
			return
		}

		show()
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
		ref.addEventListener("mouseup", onMouseUp)
	})

	createRenderEffect(() => {
		if (manual(props.trigger)) {
			setVisible(props.trigger.visible)
		}
	})

	const hideOnClickHandler = (ev: Event) => {
		if (hasTrigger("focus") || hasTrigger("focusin")) {
			const t = ev.currentTarget as HTMLElement | null
			t?.blur()
		} else {
			hide()
		}
	}

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
			if (visible()) {
				ref.addEventListener("mouseup", hideOnClickHandler)
				// ref.addEventListener("keypress", hideOnKeypressHandler)
			} else {
				ref.removeEventListener("mouseup", hideOnClickHandler)
				// ref.removeEventListener("keypress", hideOnKeypressHandler)
			}
		}
	})

	const bodyClickHandler = (ev: MouseEvent) => {
		const ref = reference()
		const f = floating()

		if (f && !f.contains(ev.target as Node | null) && ref && !ref.contains(ev.target as Node | null)) {
			hide()
			props.onClickOutside?.(ev)
		}
	}

	createEffect(() => {
		if (visible()) {
			setTimeout(() => document.body.addEventListener("click", bodyClickHandler))
		} else {
			setTimeout(() => document.body.removeEventListener("click", bodyClickHandler))
		}
	})

	createEffect(() => {
		const f = floating()

		if (f) {
			f.style.pointerEvents = props.interactive ? "auto" : "none"
		}
	})

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
			<Show when={visible()}>{props.render({ ref: setFloating, position })}</Show>
		</>
	)
}
