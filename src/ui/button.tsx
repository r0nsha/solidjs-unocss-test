import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { Color } from "../types/color"
import classNames from "classnames"

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant
	small?: boolean
	color?: Color
	icon?: IconComponent
	text?: string
	disabled?: boolean
}

type VariantScheme = "default" | "neutral"

const variantClasses: Record<ButtonVariant, Record<VariantScheme, string>> = {
	solid: {
		default:
			"bg-hue9 color-white outline-(width-0 transparent) hover:bg-hue10 active:bg-hue11 focus-visible:(outline-(width-3 solid hue7))",
		neutral:
			"bg-hue4 color-hue12 outline-(width-0 transparent) hover:bg-hue5 active:bg-hue6 focus-visible:(outline-(width-3 solid hue7))",
	},
	outline: {
		default:
			"bg-hue1 color-hue10 outline-(width-2 solid hue6 offset--2) hover:(bg-hue2 color-hue11 outline-hue7) active:outline-hue8 focus-visible:(bg-hue2 outline-hue7)",
		neutral:
			"bg-hue1 color-hue12 outline-(width-2 solid hue6 offset--2) hover:(bg-hue3 outline-hue7) active:outline-hue8 focus-visible:(bg-hue2 outline-hue7)",
	},
	ghost: {
		default:
			"bg-transparent color-hue10 outline-(width-0 transparent) hover:(bg-hue3 color-hue11) active:bg-hue4 focus-visible:(bg-hue3 outline-(width-2 solid hue7))",
		neutral:
			"bg-transparent color-hue12 outline-(width-0 transparent) hover:bg-hue3 active:bg-hue4 focus-visible:(bg-hue3 outline-(width-2 solid hue7))",
	},
}

// TODO: neutral special case
// TODO: disabled state
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(
		{
			type: "button",
			color: "neutral",
		} satisfies Partial<ButtonProps>,
		_props,
	)

	const [local, html] = splitProps(props, ["variant", "small", "color", "icon", "text", "disabled"])

	const variantScheme = () => (local.color === "neutral" ? "neutral" : "default")

	return (
		<button
			aria-label={local.text}
			{...html}
			disabled={local.disabled}
			class={classNames(
				"flex flex-shrink-0 truncate justify-center items-center gap-1.5 text-sm font-medium border-none select-none",
				`hue-${local.color}`,
				variantClasses[local.variant][variantScheme()],
				html.class,
				local.text ? "w-[fit-content] min-w-20 px-3" : local.small ? "w-6" : "w-8",
				local.small ? "h-6 rounded-1" : "h-8 rounded-1.5",
				local.disabled && "opacity-50 pointer-events-none",
			)}
		>
			{local.icon?.({ class: "flex-shrink-0", size: local.small ? 16 : 20 })}
			<Show when={local.text}>
				<span>{local.text}</span>
			</Show>
		</button>
	)
}
