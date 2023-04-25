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
	readonly?: boolean
	selected?: boolean
}

export const ListItem: Component<ListItemProps> = (props) => {
	const [local, html] = splitProps(props, [
		"text",
		"prefixIcon",
		"prefix",
		"suffixIcon",
		"suffix",
		"disabled",
		"readonly",
		"selected",
	])

	return (
		<button
			{...html}
			disabled={local.disabled || local.readonly}
			class={classNames(
				"h-6 px-2 py-0 bg-transparent border-none outline-transparent rounded-1 text-(sm start) flex flex-shrink-0 items-center gap-2 select-none color-on-secondary transition-all duration-50",
				local.disabled
					? "opacity-50 pointer-events-none"
					: local.readonly
						? ""
						: "hover:(bg-surface-hover color-on-primary) active:bg-surface-active",
				html.class,
				local.selected && !local.disabled && "bg-surface-active! color-on-primary!",
			)}
		>
			<Show when={local.prefixIcon} fallback={local.prefix}>
				{local.prefixIcon?.({ size: 16 })}
			</Show>
			<span class="flex-1 font-normal truncate">{local.text}</span>
			<Show when={local.suffixIcon} fallback={local.suffix}>
				{local.suffixIcon?.({ size: 16 })}
			</Show>
		</button>
	)
}
