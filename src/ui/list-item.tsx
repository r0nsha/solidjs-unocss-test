import { Component, JSX, JSXElement, Show, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import classNames from "classnames"

export type ListItemProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string
	prefixIcon?: IconComponent
	prefix?: JSXElement
	suffixIcon?: IconComponent
	suffix?: JSXElement
	disabled?: boolean
}

export const ListItem: Component<ListItemProps> = (props) => {
	const [itemProps, htmlProps] = splitProps(props, [
		"text",
		"prefixIcon",
		"prefix",
		"suffixIcon",
		"suffix",
		"disabled",
	])

	return (
		<button
			{...htmlProps}
			class={classNames(
				"h-[fit-content] px-2 py-1 bg-transparent border-none outline-transparent rounded-1 text-sm text-start font-bold flex items-center gap-2 select-none color-on-secondary transition-(colors opacity) duration-100",
				itemProps.disabled
					? "opacity-50"
					: "hover:(bg-surface-200 color-on-primary) active:bg-surface-300 focus-visible:bg-surface-100",
			)}
		>
			<Show when={itemProps.prefixIcon} fallback={itemProps.prefix}>
				{itemProps.prefixIcon?.({ size: 20 })}
			</Show>
			<span class="flex-1">{itemProps.text}</span>
			<Show when={itemProps.suffixIcon} fallback={itemProps.suffix}>
				{itemProps.suffixIcon?.({ size: 20 })}
			</Show>
		</button>
	)
}
