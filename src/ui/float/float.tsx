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
import { Key } from "../../utils/key"

export type FloatRenderProvided = {
	ref: Setter<HTMLElement | undefined>
	position: UseFloatingResult
}

export type FloatChildrenProvided = {
	ref: Setter<HTMLElement | undefined>
}

export type FloatDelay = number | { in?: number; out?: number }

export type FloatProps = {
	render: (provided: FloatRenderProvided) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	trigger?: FloatTriggers
	triggerKeys?: Key[]
	disabled?: boolean
	hideOnClick?: boolean
	interactive?: boolean
	delay?: FloatDelay
	options?: UseFloatingOptions<HTMLElement, HTMLElement>
	onClickOutside?: (ev: MouseEvent) => MaybePromise<void>
}

// TODO: interactive
// TODO: interactiveBorder
// TODO: onShow
// TODO: onShown
// TODO: onHide
// TODO: onHidden
// TODO: presence animation (scale + shift + fade): using Motion One
export const Float: Component<FloatProps> = (_props) => {
	const props = mergeProps(
		{
			trigger: "hover" as FloatTrigger,
			triggerKeys: [Key.Space, Key.Enter] as Key[],
			interactive: false,
			hideOnClick: true,
		},
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

	let scheduledSetVisible: number | undefined

	const scheduleSetVisible = (value: boolean) => {
		clearTimeout(scheduledSetVisible)

		const delay = typeof props.delay === "number" ? props.delay : props.delay?.[value ? "in" : "out"] ?? 0
		scheduledSetVisible = setTimeout(() => setVisible(value), delay)
	}

	const show = () => scheduleSetVisible(true)
	const hide = () => scheduleSetVisible(false)
	const toggle = () => (visible() ? hide() : show())

	const onMouseEnter = (ev: MouseEvent) => {
		if (props.disabled) {
			return
		}

		lastTriggerEvent = ev
		hovered = true

		if (!hasTrigger("hover")) {
			return
		}

		show()
	}

	const onMouseLeave = (ev: MouseEvent) => {
		if (props.disabled) {
			return
		}

		lastTriggerEvent = ev
		hovered = false

		if (!hasTrigger("hover")) {
			return
		}

		if (hasTrigger("focus") && focused) {
			return
		}

		hide()
	}

	const onFocus = (ev: FocusEvent) => {
		if (props.disabled) {
			return
		}

		lastTriggerEvent = ev
		focused = true

		if (!hasTrigger("focus")) {
			return
		}

		show()
	}

	const onBlur = (ev: FocusEvent) => {
		if (props.disabled) {
			return
		}

		lastTriggerEvent = ev
		focused = false

		if (!hasTrigger("focus")) {
			return
		}

		if (hasTrigger("hover") && hovered) {
			return
		}

		hide()
	}

	const onMouseUp = (ev: MouseEvent) => {
		if (props.disabled) {
			return
		}

		if (props.hideOnClick && visible() && lastTriggerEvent?.type !== "focus") {
			hide()
			return
		}

		lastTriggerEvent = ev

		if (hasTrigger("click")) {
			show()
		}
	}

	const onKeyUp = (ev: KeyboardEvent) => {
		if (props.disabled) {
			return
		}

		if (props.triggerKeys?.includes(ev.key as Key)) {
			lastTriggerEvent = ev

			if (hasTrigger("click")) {
				toggle()
			}
		}
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
		ref.addEventListener("mouseup", onMouseUp)
		ref.addEventListener("keyup", onKeyUp)
	})

	createRenderEffect(() => {
		if (props.disabled) {
			return
		}

		if (manual(props.trigger)) {
			setVisible(props.trigger.visible)
		}
	})

	createEffect(() => {
		if (props.disabled) {
			setVisible(false)
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

	createEffect(() => {
		const f = floating()

		if (f && props.interactive) {
			f.addEventListener("mousedown", (e) => e.preventDefault())
		}
	})

	return (
		<>
			{props.children({ ref: setReference })}
			<Show when={visible()}>{props.render({ ref: setFloating, position })}</Show>
		</>
	)
}
