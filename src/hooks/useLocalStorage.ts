import { Accessor, createSignal, onCleanup, onMount } from "solid-js"

type UseLocalStorageOptions<V extends string> = {
	defaultValue?: V
}

type UseLocalStorageReturn<V extends string> = [Accessor<V | null>, (newValue: V) => void, () => void]

export const useLocalStorage = <V extends string>(
	key: string,
	options?: UseLocalStorageOptions<V>,
): UseLocalStorageReturn<V> => useStorage(localStorage, key, options)

export const useStorage = <V extends string>(
	storage: Storage,
	key: string,
	options?: UseLocalStorageOptions<V>,
): UseLocalStorageReturn<V> => {
	const [value, setValue] = createSignal<V | null>(storage.getItem(key) as V | null)

	if (value == null && options?.defaultValue != null) {
		storage.setItem(key, options.defaultValue)
	}

	const listener = (e: StorageEvent) => setValue((_) => e.newValue as V | null)

	onMount(() => window.addEventListener("storage", listener))
	onCleanup(() => window.removeEventListener("storage", listener))

	return [
		value,
		(newValue) => {
			storage.setItem(key, newValue)
			setValue((_) => newValue as V)
		},
		() => {
			storage.removeItem(key)
			setValue(null)
		},
	]
}
