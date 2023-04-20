export type Rect = {
	x1: number
	x2: number
	y1: number
	y2: number
}

export namespace Rect {
	export const fromDOMRect = ({ left, right, top, bottom }: DOMRectReadOnly): Rect => ({
		x1: left,
		x2: right,
		y1: top,
		y2: bottom,
	})

	export const contains = (rect: Rect, x: number, y: number) =>
		x >= rect.x1 && x <= rect.x2 && y >= rect.y1 && y <= rect.y2
}
