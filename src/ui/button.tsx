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

const variantClassesNEW: Record<ButtonVariant, string> = {
	solid:
		"bg-hue9 color-whiteA-12 outline-(width-0 transparent) hover:bg-hue10 active:bg-hue11 focus-visible:(outline-(width-3 solid hue7))",
	outline:
		"bg-hue1 color-hue10 outline-(width-2 solid hue6 offset--2) hover:(bg-hue2 color-hue11 outline-hue7) active:outline-hue8 focus-visible:(bg-hue2 outline-hue7)",
	ghost:
		"bg-transparent color-hue10 outline-(width-0 transparent) hover:(bg-hue3 color-hue11) active:bg-hue4 focus-visible:(bg-hue3 outline-(width-2 solid hue7))",
}

// const variantClasses: Record<ButtonVariant, Record<Color | "disabled", string>> = {
// 	solid: {
// 		primary:
// 			"bg-primary-500 color-white outline-(width-0 transparent) hover:bg-primary-600 active:bg-primary-700 focus-visible:(outline-(width-3 solid primary-300))",
// 		neutral:
// 			"bg-neutral-200 color-on-primary outline-(width-0 transparent) hover:bg-neutral-300 active:bg-neutral-400 focus-visible:(outline-(width-3 solid neutral-300))",
// 		success:
// 			"bg-success-500 color-white outline-(width-0 transparent) hover:bg-success-600 active:bg-success-700 focus-visible:(outline-(width-3 solid success-300))",
// 		warning:
// 			"bg-warning-500 color-white outline-(width-0 transparent) hover:bg-warning-600 active:bg-warning-700 focus-visible:(outline-(width-3 solid warning-300))",
// 		info: "bg-info-500 color-white outline-(width-0 transparent) hover:bg-info-600 active:bg-info-700 focus-visible:(outline-(width-3 solid info-300))",
// 		danger:
// 			"bg-danger-500 color-white outline-(width-0 transparent) hover:bg-danger-600 active:bg-danger-700 focus-visible:(outline-(width-3 solid danger-300))",
// 		disabled: "bg-neutral-200 color-neutral-400 outline-(width-0 transparent)",
// 	},
// 	outline: {
// 		primary:
// 			"bg-transparent color-primary-500 outline-(width-2 solid primary-500 offset--2) hover:(bg-primary-hover color-primary-600 outline-primary-600) active:(bg-primary-active color-primary-700 outline-primary-700) focus-visible:(bg-primary-hover color-primary-600 outline-primary-600)",
// 		neutral:
// 			"bg-transparent color-on-secondary outline-(width-2 solid on-secondary offset--2) hover:(bg-neutral-hover color-on-primary outline-on-primary) active:bg-neutral-active focus-visible:(bg-neutral-200 color-on-primary outline-on-primary)",
// 		success:
// 			"bg-transparent color-success-500 outline-(width-2 solid success-500 offset--2) hover:(bg-success-hover color-success-600 outline-success-600) active:(bg-success-active color-success-700 outline-success-700) focus-visible:(bg-success-hover color-success-600 outline-success-600)",
// 		warning:
// 			"bg-transparent color-warning-500 outline-(width-2 solid warning-500 offset--2) hover:(bg-warning-hover color-warning-600 outline-warning-600) active:(bg-warning-active color-warning-700 outline-warning-700) focus-visible:(bg-warning-hover color-warning-600 outline-warning-600)",
// 		info: "bg-transparent color-info-500 outline-(width-2 solid info-500 offset--2) hover:(bg-info-hover color-info-600 outline-info-600) active:(bg-info-active color-info-700 outline-info-700) focus-visible:(bg-info-hover color-info-600 outline-info-600)",
// 		danger:
// 			"bg-transparent color-danger-500 outline-(width-2 solid danger-500 offset--2) hover:(bg-danger-hover color-danger-600 outline-danger-600) active:(bg-danger-active color-danger-700 outline-danger-700) focus-visible:(bg-danger-hover color-danger-600 outline-danger-600)",
// 		disabled: "bg-transparent color-neutral-300 outline-(width-2 solid neutral-300 offset--2)",
// 	},
// 	ghost: {
// 		primary:
// 			"bg-transparent color-primary-500 outline-(width-0 transparent) hover:(bg-primary-hover color-primary-600) active:bg-primary-active focus-visible:(bg-primary-hover outline-(width-2 solid primary-500))",
// 		neutral:
// 			"bg-transparent color-on-secondary outline-(width-0 transparent) hover:(bg-neutral-hover color-on-primary) active:bg-neutral-active focus-visible:(bg-neutral-hover outline-(width-2 solid on-secondary))",
// 		success:
// 			"bg-transparent color-success-500 outline-(width-0 transparent) hover:(bg-success-hover color-success-600) active:bg-success-active focus-visible:(bg-success-hover outline-(width-2 solid success-500))",
// 		warning:
// 			"bg-transparent color-warning-500 outline-(width-0 transparent) hover:(bg-warning-hover color-warning-600) active:bg-warning-active focus-visible:(bg-warning-hover outline-(width-2 solid warning-500))",
// 		info: "bg-transparent color-info-500 outline-(width-0 transparent) hover:(bg-info-hover color-info-600) active:bg-info-active focus-visible:(bg-info-hover outline-(width-2 solid info-500))",
// 		danger:
// 			"bg-transparent color-danger-500 outline-(width-0 transparent) hover:(bg-danger-hover color-danger-600) active:bg-danger-active focus-visible:(bg-danger-hover outline-(width-2 solid danger-500))",
// 		disabled: "bg-transparent color-neutral-300 outline-(width-0 transparent)",
// 	},
// }

// TODO: dynamic color
// TODO: remove old variantClasses
// TODO: remove disabled state
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(
		{
			type: "button",
			color: "neutral",
		} satisfies Partial<ButtonProps>,
		_props,
	)

	const [local, html] = splitProps(props, ["variant", "small", "color", "icon", "text", "disabled"])

	return (
		<button
			aria-label={local.text}
			{...html}
			disabled={local.disabled}
			class={classNames(
				"flex flex-shrink-0 truncate justify-center items-center gap-1.5 text-sm font-medium border-none select-none",
				"hue-primary",
				variantClassesNEW[local.variant],
				html.class,
				local.text ? "w-[fit-content] min-w-20 px-3" : local.small ? "w-6" : "w-8",
				local.small ? "h-6 rounded-1" : "h-8 rounded-1.5",
			)}
		>
			{local.icon?.({ class: "flex-shrink-0", size: local.small ? 16 : 20 })}
			<Show when={local.text}>
				<span>{local.text}</span>
			</Show>
		</button>
	)
}
