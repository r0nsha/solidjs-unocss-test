import { JSX } from "solid-js/jsx-runtime"

const floatTriggers = ["hover", "focus", "focus-within", "click"] as const
export type FloatTrigger = typeof floatTriggers[number]

export const getFloatTriggerProps = (
	trigger: FloatTrigger,
): (readonly [keyof HTMLElementEventMap, (this: HTMLElement, ev: Event) => void])[] => {
	switch (trigger) {
		case "hover":
			return []
		case "focus":
			throw new Error("TODO: focus")
			// return []
		case "focus-within":
			throw new Error("TODO: focus-within")
			// return []
		case "click":
			throw new Error("TODO: click")
			// return []
	}
}
