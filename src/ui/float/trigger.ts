const floatTriggers = ["hover", "focus", "click"] as const

export type FloatTrigger = typeof floatTriggers[number]

export type ManualFloatTrigger = { visible: boolean }
export type FloatTriggers = FloatTrigger | FloatTrigger[] | ManualFloatTrigger

export const manual = (trigger: FloatTriggers): trigger is ManualFloatTrigger =>
	typeof trigger === "object" && !Array.isArray(trigger)
