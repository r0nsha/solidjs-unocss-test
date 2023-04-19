export type MaybePromise<T> = Promise<T> | T

export const isPromise = <T>(input: unknown): input is Promise<T> =>
	!!input && typeof input === "object" && "then" in input && typeof input.then === "function"
