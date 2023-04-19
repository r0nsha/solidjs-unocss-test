const floatTriggers = ["hover", "focus", "focusin", "click"] as const

export type FloatTrigger = typeof floatTriggers[number]

export type ManualFloatTrigger = { visible: boolean }
export type FloatTriggers = FloatTrigger | FloatTrigger[] | ManualFloatTrigger

export const manual = (trigger: FloatTriggers): trigger is ManualFloatTrigger =>
	typeof trigger === "object" && !Array.isArray(trigger)

export const triggerIs = (trigger: FloatTriggers, is: FloatTrigger) =>
	!manual(trigger) && (Array.isArray(trigger) ? trigger.includes(is) : trigger === is)

export type FloatTriggerEventHandlers = (readonly [
	keyof HTMLElementEventMap,
	(this: HTMLElement, ev: Event) => void,
])[]

export const getFloatTriggerProps = (
	trigger: FloatTrigger,
	setShow: (show: boolean) => void,
): FloatTriggerEventHandlers => {
	const show = (e: Event) => {
		e.stopPropagation()
		setShow(true)
	}
	const hide = (e: Event) => {
		console.log("wut")
		e.stopPropagation()
		setShow(false)
	}

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
				["click", show],
				["keypress", show],
			]
	}
}
