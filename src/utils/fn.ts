export const skip = <R,>(f: () => R, times: number): (() => R | null) => {
	let count = times

	return () => {
		if (count === 0) {
			return f()
		} else {
			count -= 1
			return null
		}
	}
}
