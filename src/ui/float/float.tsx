import { autoUpdate, flip, shift } from "@floating-ui/dom"
import { UseFloatingOptions, UseFloatingResult, useFloating } from "solid-floating-ui"
import {
	Component,
	JSX,
	JSXElement,
	Setter,
	Show,
	createEffect,
	createRenderEffect,
	createSignal,
	mergeProps,
	onCleanup,
	splitProps,
} from "solid-js"
import { MaybePromise } from "../../types/promise"
import { FloatTrigger, FloatTriggers, isCursorOutsideInteractiveBorder, manual } from "./trigger"
import { Key } from "../../utils/key"
import { ZIndex } from "../../utils/z-index"
import { Presence } from "@motionone/solid"
import { MotionEvent } from "@motionone/dom"

export type FloatRenderProvided = {
	(): {
		ref: Setter<HTMLElement | undefined>
		style: JSX.CSSProperties
		onMotionComplete: (ev: MotionEvent) => MaybePromise<void>
	}
	class: string | undefined
}

export type FloatChildrenProvided = {
	ref: Setter<HTMLElement | undefined>
}

export type FloatDelay = number | { in?: number; out?: number }

export type FloatProps = {
	render: (provided: FloatRenderProvided) => JSXElement
	children: (provided: FloatChildrenProvided) => JSXElement
	class?: string
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
	onShown?: () => MaybePromise<void>
	onHide?: () => MaybePromise<void>
	onHidden?: () => MaybePromise<void>
	onClickOutside?: (ev: MouseEvent) => MaybePromise<void>
}

export const Float: Component<FloatProps> = (props) => {
	const merged = mergeProps(
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
		props,
	)

	const [events, other] = splitProps(merged, ["onShow", "onShown", "onHide", "onHidden", "onClickOutside"])

	let lastTriggerEvent: Event | null = null
	let hovered = false

	const [reference, setReference] = createSignal<HTMLElement>()
	const [floating, setFloating] = createSignal<HTMLElement>()
	const [visible, setVisible] = createSignal(false)

	const position = useFloating(reference, floating, {
		whileElementsMounted: autoUpdate,
		...other.options,
		middleware: [flip(), shift(), ...(other.options?.middleware ?? [])],
	})

	const hasTrigger = (is: FloatTrigger) =>
		!manual(other.trigger) &&
		(Array.isArray(other.trigger) ? other.trigger.includes(is) : other.trigger === is)

	const isCursorOverRefOrFloat = (ev: MouseEvent) =>
		floating()?.contains(ev.target as Node | null) || reference()?.contains(ev.target as Node | null)

	const setVisibility = (value: boolean) => {
		setVisible(value)
		if (value) {
			events.onShow?.()
		} else {
			events.onHide?.()
		}
	}

	let scheduledSetVisible: number | undefined

	const scheduleSetVisible = (value: boolean) => {
		clearTimeout(scheduledSetVisible)

		const delay = typeof other.delay === "number" ? other.delay : other.delay[value ? "in" : "out"] ?? 0
		scheduledSetVisible = setTimeout(() => setVisibility(value), delay)
	}

	const scheduleShow = () => scheduleSetVisible(true)
	const scheduleHide = () => scheduleSetVisible(false)
	const scheduleToggle = () => (visible() ? scheduleHide() : scheduleShow())

	const addInteractiveMouseMove = () => document.addEventListener("mousemove", onMouseMove)
	const removeInteractiveMouseMove = () => document.removeEventListener("mousemove", onMouseMove)

	const onMouseEnter = (ev: MouseEvent) => {
		removeInteractiveMouseMove()

		lastTriggerEvent = ev
		hovered = true

		if (!hasTrigger("hover")) {
			return
		}

		scheduleShow()
	}

	const onMouseLeave = (ev: MouseEvent) => {
		lastTriggerEvent = ev
		hovered = false

		if (!hasTrigger("hover")) {
			return
		}

		if (other.interactive) {
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

		if (isCursorOutsideInteractiveBorder(ev, other.interactiveBorder, position, f)) {
			scheduleHide()
		} else {
			scheduleShow()
		}
	}

	const onFocus = (ev: FocusEvent) => {
		lastTriggerEvent = ev

		if (!hasTrigger("focus")) {
			return
		}

		scheduleShow()
	}

	const onBlur = (ev: FocusEvent) => {
		lastTriggerEvent = ev

		if (!hasTrigger("focus")) {
			return
		}

		if (hasTrigger("hover") && hovered) {
			return
		}

		scheduleHide()
	}

	const onMouseUp = (ev: MouseEvent) => {
		lastTriggerEvent = ev

		if (other.hideOnClick && visible() && lastTriggerEvent?.type !== "focus") {
			scheduleHide()
			return
		}

		if (hasTrigger("click")) {
			scheduleShow()
		}
	}

	const onKeyUp = (ev: KeyboardEvent) => {
		if (other.triggerKeys?.includes(ev.key as Key)) {
			lastTriggerEvent = ev

			if (hasTrigger("click")) {
				scheduleToggle()
			}
		} else if (ev.key === Key.Escape) {
			lastTriggerEvent = ev
			setVisibility(false)
			ev.preventDefault()
		}
	}

	const onContextMenu = (ev: MouseEvent) => {
		lastTriggerEvent = ev

		if (hasTrigger("contextmenu")) {
			scheduleShow()
			ev.preventDefault()
		}
	}

	createEffect(() => {
		const ref = reference()

		if (manual(other.trigger) || !ref) {
			return
		}

		const addEventListener = <K extends keyof HTMLElementEventMap>(
			type: K,
			listener: (ev: HTMLElementEventMap[K]) => void,
		) => ref.addEventListener(type, (ev) => other.disabled || listener(ev))

		// leaky?
		addEventListener("mouseenter", onMouseEnter)
		addEventListener("mouseleave", onMouseLeave)
		addEventListener("focus", onFocus)
		addEventListener("blur", onBlur)
		addEventListener("mouseup", onMouseUp)
		addEventListener("keyup", onKeyUp)
		addEventListener("contextmenu", onContextMenu)
	})

	createRenderEffect(() => {
		if (manual(other.trigger)) {
			setVisible(other.trigger.visible)
		}
	})

	createEffect(() => {
		if (other.disabled) {
			removeInteractiveMouseMove()
			setVisible(false)
		}
	})

	const bodyClickHandler = (ev: MouseEvent) => {
		if (isCursorOverRefOrFloat(ev)) {
			return
		}

		scheduleHide()
		setVisibility(false)
		events.onClickOutside?.(ev)
	}

	createEffect(() => {
		if (manual(other.trigger)) {
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
			f.style.pointerEvents = other.interactive ? "auto" : "none"
			f.style.userSelect = other.interactive ? "auto" : "none"
			f.style.zIndex = other.zIndex.toString()
		}
	})

	createEffect(() => {
		if (manual(other.trigger)) {
			if (visible()) {
				events.onShow?.()
			} else {
				events.onHide?.()
			}
		}
	})

	onCleanup(() => {
		document.body.removeEventListener("click", bodyClickHandler)
		removeInteractiveMouseMove()
	})

	const onTransitionComplete = () => {
		if (visible()) {
			events.onShown?.()
		} else {
			events.onHidden?.()
		}
	}

	const provided: FloatRenderProvided = () => ({
		ref: setFloating,
		style: {
			position: position.strategy,
			top: `${position.y ?? 0}px`,
			left: `${position.x ?? 0}px`,
		},
		onMotionComplete: onTransitionComplete,
	})

	provided.class = other.class

	return (
		<>
			{other.children({ ref: setReference })}
			<Presence exitBeforeEnter>
				<Show when={visible()}>{other.render(provided)}</Show>
			</Presence>
		</>
	)
}
