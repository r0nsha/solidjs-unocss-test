export const colorSchemes = ["primary", "neutral", "success", "info", "warning", "danger"] as const
export type ColorScheme = typeof colorSchemes[number]
