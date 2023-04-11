export type PluralKey = number | "other"

export const plural = (count: number, map: Record<PluralKey, string>) => map[count] ?? map["other"]
