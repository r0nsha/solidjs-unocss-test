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
	const initialValue = storage.getItem(key) as V | null

	const [value, setValue] = createSignal<V | null>(initialValue)

	const listener = (ev: StorageEvent) => setValue((_) => ev.newValue as V | null)

	const setItem = (newValue: V) => {
		storage.setItem(key, newValue)
		setValue((_) => newValue)
	}

	const removeItem = () => {
		storage.removeItem(key)
		setValue((_) => options?.defaultValue ?? null)
	}

	onMount(() => {
		if (initialValue == null && options?.defaultValue != null) {
			setItem(options.defaultValue)
		}

		window.addEventListener("storage", listener)
	})

	onCleanup(() => {
		window.removeEventListener("storage", listener)
	})

	return [value, setItem, removeItem]
}
