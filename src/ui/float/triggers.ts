const floatTriggers = ["hover", "focus", "focusin", "click"] as const
export type FloatTrigger = typeof floatTriggers[number]

export type FloatTriggerEventHandlers = (readonly [
	keyof HTMLElementEventMap,
	(this: HTMLElement, ev: Event) => void,
])[]

export const getFloatTriggerProps = (
	trigger: FloatTrigger,
	setShow: (show: boolean) => void,
): FloatTriggerEventHandlers => {
	const show = () => setShow(true)
	const hide = () => setShow(false)

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
