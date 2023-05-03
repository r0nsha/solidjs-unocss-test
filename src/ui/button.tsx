import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { Color } from "../types/color"
import classNames from "classnames"

export type ButtonVariant = "solid" | "outline" | "ghost"
export type ButtonSize = "sm" | "md"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant
	size?: ButtonSize
	color?: Color
	icon?: IconComponent
	text?: string
	disabled?: boolean
	selected?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
	solid:
		"bg-hue9 color-white outline-(width-0 transparent) hover:bg-hue10 active:bg-hue11 focus-visible:(outline-(width-3 solid hue10)) selected:bg-hue11",
	outline:
		"bg-hue1 color-hue10 outline-(width-2 solid hue6 offset--2) hover:(bg-hue2 color-hue11 outline-hue7) active:(bg-hue3 outline-hue8) focus-visible:(bg-hue2 outline-hue10) selected:(bg-hue3 outline-hue8)",
	ghost:
		"bg-transparent color-hue10 outline-(width-0 transparent offset--2) hover:(bg-hueA-4 color-hue11) active:bg-hueA-5 focus-visible:(bg-hueA-2 outline-(width-2 solid hue10)) selected:bg-hueA-5",
}

const variantClassNeutralOverrides: Record<ButtonVariant, string> = {
	solid: "bg-hue5! color-hue12! hover:bg-hue6! active:bg-hue7! focus-visible:bg-hue6!",
	outline: "color-hue11! hover:color-hue12!",
	ghost: "color-hue11!",
}

export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(
		{
			type: "button",
			size: "md",
			color: "neutral",
		} satisfies Partial<ButtonProps>,
		_props,
	)

	const [local, html] = splitProps(props, [
		"variant",
		"size",
		"color",
		"icon",
		"text",
		"disabled",
		"selected",
	])

	return (
		<button
			aria-label={local.text}
			{...html}
			disabled={local.disabled}
			class={classNames(
				"flex flex-shrink-0 truncate justify-center items-center gap-1.5 text-sm font-medium border-none select-none",
				`hue-${local.color}`,
				variantClasses[local.variant],
				local.color === "neutral" && variantClassNeutralOverrides[local.variant],
				html.class,
				local.text ? "w-[fit-content] min-w-20 px-3" : local.size === "sm" ? "w-7.5" : "w-8",
				local.size === "sm" ? "h-6 rounded-1" : "h-8 rounded-1.5",
				local.disabled && "opacity-50 pointer-events-none",
				local.selected && "selected",
			)}
		>
			{local.icon?.({ class: "flex-shrink-0", size: local.size === "sm" ? 18 : 20 })}
			<Show when={local.text}>
				<span>{local.text}</span>
			</Show>
		</button>
	)
}
