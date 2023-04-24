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
	const [local, html] = splitProps(props, [
		"text",
		"prefixIcon",
		"prefix",
		"suffixIcon",
		"suffix",
		"disabled",
	])

	return (
		<button
			{...html}
			class={classNames(
				"h-7 px-2 py-0 bg-transparent border-none outline-transparent rounded-1 text-(sm start) flex flex-shrink-0 items-center gap-2 select-none color-on-secondary transition-(colors opacity) duration-100",
				local.disabled
					? "opacity-50"
					: "hover:(bg-surface-hover color-on-primary) active:bg-surface-active focus-visible:bg-surface-hover",
				html.class
			)}
		>
			<Show when={local.prefixIcon} fallback={local.prefix}>
				{local.prefixIcon?.({ size: 20 })}
			</Show>
			<span class="flex-1 font-medium">{local.text}</span>
			<Show when={local.suffixIcon} fallback={local.suffix}>
				{local.suffixIcon?.({ size: 20 })}
			</Show>
		</button>
	)
}
