import { ObjectValues } from "../types/object"

export const ZIndex = {
	float: 100,
	menu: 101,
	tooltip: 102,
}

export type ZIndex = ObjectValues<typeof ZIndex>
