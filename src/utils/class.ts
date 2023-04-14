export const either = (
	predicate: () => boolean,
	truthy: string,
	falsey: string,
): Record<string, boolean | undefined> => ({
	[truthy]: predicate(),
	[falsey]: !predicate(),
})
