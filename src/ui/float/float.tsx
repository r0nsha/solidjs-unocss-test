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
import { FloatTrigger, FloatTriggers, isCursorOutsideInteractiveBorder, manual } from "./trigger"
import { Key } from "../../utils/key"
import { ZIndex } from "../../utils/z-index"

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
	interactiveBorder?: number
	delay?: FloatDelay
	zIndex?: number
	options?: UseFloatingOptions<HTMLElement, HTMLElement>
	onShow?: () => MaybePromise<void>
	onHide?: () => MaybePromise<void>
	onClickOutside?: (ev: MouseEvent) => MaybePromise<void>
}

// TODO: onShow
// TODO: onHide
// TODO: maxWidth
// TODO: maxHeight
// TODO: presence animation (scale + shift + fade): using Motion One
// TODO: onShown
// TODO: onHidden
export const Float: Component<FloatProps> = (_props) => {
	const props = mergeProps(
		{
			trigger: "hover" as FloatTrigger,
			triggerKeys: [Key.Space, Key.Enter] as Key[],
			disabled: false,
			hideOnClick: true,
			interactive: false,
			interactiveBorder: 4,
			delay: 0,
			zIndex: ZIndex.float,
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

	const hasTrigger = (is: FloatTrigger) =>
		!manual(props.trigger) &&
		(Array.isArray(props.trigger) ? props.trigger.includes(is) : props.trigger === is)

	const isCursorOverRefOrFloat = (ev: MouseEvent) =>
		floating()?.contains(ev.target as Node | null) || reference()?.contains(ev.target as Node | null)

	let scheduledSetVisible: number | undefined

	const scheduleSetVisible = (value: boolean) => {
		clearTimeout(scheduledSetVisible)

		const delay = typeof props.delay === "number" ? props.delay : props.delay[value ? "in" : "out"] ?? 0
		scheduledSetVisible = setTimeout(() => {
			setVisible(value)
			if (value) {
				props.onShow?.()
			} else {
				props.onHide?.()
			}
		}, delay)
	}

	const scheduleShow = () => scheduleSetVisible(true)
	const scheduleHide = () => scheduleSetVisible(false)
	const scheduleToggle = () => (visible() ? scheduleHide() : scheduleShow())

	const addInteractiveMouseMove = () => document.addEventListener("mousemove", onMouseMove)
	const removeInteractiveMouseMove = () => document.removeEventListener("mousemove", onMouseMove)

	const onMouseEnter = (ev: MouseEvent) => {
		removeInteractiveMouseMove()

		if (props.disabled) {
			return
		}

		lastTriggerEvent = ev
		hovered = true

		if (!hasTrigger("hover")) {
			return
		}

		scheduleShow()
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

		if (props.interactive) {
			addInteractiveMouseMove()
		} else {
			scheduleHide()
		}
	}

	const onMouseMove = (ev: MouseEvent) => {
		const f = floating()

		if (!f || isCursorOverRefOrFloat(ev)) {
			return
		}

		if (isCursorOutsideInteractiveBorder(ev, props.interactiveBorder, position, f)) {
			scheduleHide()
		} else {
			scheduleShow()
		}
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

		scheduleShow()
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

		scheduleHide()
	}

	const onMouseUp = (ev: MouseEvent) => {
		if (props.disabled) {
			return
		}

		if (props.hideOnClick && visible() && lastTriggerEvent?.type !== "focus") {
			scheduleHide()
			return
		}

		lastTriggerEvent = ev

		if (hasTrigger("click")) {
			scheduleShow()
		}
	}

	const onKeyUp = (ev: KeyboardEvent) => {
		if (props.disabled) {
			return
		}

		if (props.triggerKeys?.includes(ev.key as Key)) {
			lastTriggerEvent = ev

			if (hasTrigger("click")) {
				scheduleToggle()
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
		if (isCursorOverRefOrFloat(ev)) {
			return
		}

		scheduleHide()
		props.onClickOutside?.(ev)
	}

	createEffect(() => {
		if (manual(props.trigger)) {
			return
		}

		if (visible()) {
			setTimeout(() => document.body.addEventListener("click", bodyClickHandler))
		} else {
			setTimeout(() => document.body.removeEventListener("click", bodyClickHandler))
			removeInteractiveMouseMove()
		}
	})

	createEffect(() => {
		const f = floating()

		if (f) {
			f.style.pointerEvents = props.interactive ? "auto" : "none"
			f.style.userSelect = props.interactive ? "auto" : "none"
			f.style.zIndex = props.zIndex.toString()
		}
	})

	createEffect(() => {
		if (manual(props.trigger)) {
			if (visible()) {
				props.onShow?.()
			} else {
				props.onHide?.()
			}
		}
	})

	return (
		<>
			{props.children({ ref: setReference })}
			<Show when={visible()}>{props.render({ ref: setFloating, position })}</Show>
		</>
	)
}
