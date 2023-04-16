import { Accessor, onCleanup } from "solid-js"

export const clickOutside = <E extends HTMLElement>(el: E, accessor: Accessor<() => void>) => {
	const onClick = (ev: MouseEvent) => !el.contains(ev.target as Node | null) && accessor()?.()
	document.body.addEventListener("click", onClick)

	onCleanup(() => document.body.removeEventListener("click", onClick))
}
