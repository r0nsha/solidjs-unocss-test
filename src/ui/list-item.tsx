import { Component, JSX, JSXElement, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import classNames from "classnames"
import { Color } from "../types/color"

export type ListItemProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string
	color?: Color
	prefixIcon?: IconComponent
	prefix?: JSXElement
	suffixIcon?: IconComponent
	suffix?: JSXElement
	disabled?: boolean
	readonly?: boolean
	selected?: boolean
}

export const ListItem: Component<ListItemProps> = (_props) => {
	const props = mergeProps(
		{
			color: "neutral",
		} satisfies Partial<ListItemProps>,
		_props,
	)

	const [local, html] = splitProps(props, [
		"text",
		"color",
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
				"h-7 px-2 py-0 bg-transparent border-none outline-transparent rounded-1 text-(sm start) flex flex-shrink-0 items-center gap-1.5 select-none color-hue11",
				`hue-${local.color}`,
				local.disabled
					? "opacity-50 pointer-events-none"
					: local.readonly
						? ""
						: "hover:bg-hue4 active:(bg-hue5 color-hue12)",
				html.class,
			)}
		>
			<Show when={local.prefixIcon} fallback={local.prefix}>
				{local.prefixIcon?.({ size: 18 })}
			</Show>
			<span class="flex-1 font-normal truncate">{local.text}</span>
			<Show when={local.suffixIcon} fallback={local.suffix}>
				{local.suffixIcon?.({ size: 18 })}
			</Show>
		</button>
	)
}
