const floatTriggers = ["hover", "focus", "focus-within", "click"] as const
export type FloatTrigger = typeof floatTriggers[number]
