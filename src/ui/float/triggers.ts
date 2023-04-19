import { Key } from "../../utils/key"

const floatTriggers = ["hover", "focus", "focusin", "click"] as const

export type FloatTrigger = typeof floatTriggers[number]

export type ManualFloatTrigger = { visible: boolean }
export type FloatTriggers = FloatTrigger | FloatTrigger[] | ManualFloatTrigger

export const manual = (trigger: FloatTriggers): trigger is ManualFloatTrigger =>
	typeof trigger === "object" && !Array.isArray(trigger)

export type FloatTriggerEventHandlers = (readonly [
	keyof HTMLElementEventMap,
	(this: HTMLElement, ev: Event) => void,
])[]

export const getFloatTriggerProps = (
	trigger: FloatTrigger,
	setShow: (show: boolean) => void,
): FloatTriggerEventHandlers => {
	const set = (show: boolean) => (e: Event) => {
		e.stopPropagation()
		setShow(show)
	}

	const show = set(true)
	const hide = set(false)

	switch (trigger) {
		case "hover":
			return [
				["mouseenter", show],
				["mouseleave", hide],
			]
		case "focus":
			return [
				["focus", show],
				["blur", hide],
			]
		case "focusin":
			return [
				["focusin", show],
				["focusout", hide],
			]
		case "click":
			return [
				["mouseup", show],
				[
					"keypress",
					(e) => {
						if (isFloatTriggerKey((e as KeyboardEvent).key as Key)) {
							show(e)
						}
					},
				],
				["touchend", show],
			]
	}
}

export const isFloatTriggerKey = (key: Key): boolean => key === K
