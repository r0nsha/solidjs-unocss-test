import { Middleware } from "@floating-ui/dom"

export const sameWidth = (options?: { max: boolean }): Middleware => ({
	name: "sameWidth",
	options,
	fn: ({ elements, rects }) => {
		const refWidth = `${rects.reference.width}px`

		elements.floating.style.minWidth = refWidth

		if (options?.max) {
			elements.floating.style.maxWidth = refWidth
		}

		return {}
	},
})
