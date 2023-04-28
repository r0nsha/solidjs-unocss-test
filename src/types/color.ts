export const colors = ["primary", "neutral", "success", "info", "warning", "danger"] as const
export type Color = typeof colors[number]
