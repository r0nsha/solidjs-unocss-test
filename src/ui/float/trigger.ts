import { Side } from "@floating-ui/dom"
import { UseFloatingResult } from "solid-floating-ui"
import { Rect } from "../../utils/rect"

const floatTriggers = ["hover", "focus", "click", "context"] as const

export type FloatTrigger = typeof floatTriggers[number]

export type ManualFloatTrigger = { visible: boolean }
export type FloatTriggers = FloatTrigger | FloatTrigger[] | ManualFloatTrigger

export const manual = (trigger: FloatTriggers): trigger is ManualFloatTrigger =>
	typeof trigger === "object" && !Array.isArray(trigger)

export const isCursorOutsideInteractiveBorder = (
	ev: MouseEvent,
	interactiveBorder: number,
	position: UseFloatingResult,
	floating: HTMLElement,
): boolean => {
	const offset = position.middlewareData.offset

	if (!offset) {
		return true
	}

	const { clientX, clientY } = ev

	const floatingRect = Rect.fromDOMRect(floating.getBoundingClientRect())
	const side = position.placement.split("-")[0] as Side

	switch (side) {
		case "top":
			floatingRect.y2 += interactiveBorder
		case "right":
			floatingRect.x2 += interactiveBorder
		case "bottom":
			floatingRect.y1 -= interactiveBorder
		case "left":
			floatingRect.x1 -= interactiveBorder
	}

	return !Rect.contains(floatingRect, clientX, clientY)
}
