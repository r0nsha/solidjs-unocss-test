import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { ColorScheme } from "../types/color"
import classnames from "classnames"

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonExtraProps = {
	variant: ButtonVariant
	colorScheme?: ColorScheme
	icon?: IconComponent
	text?: string
	disabled?: boolean
}

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonExtraProps

const sharedClass =
	"h-8 flex truncate justify-center items-center gap-1.5 text-sm font-bold border-none transition-all duration-100 select-none"

const textClass = "w-[fit-content] min-w-20 px-3 rounded-2"
const iconClass = "w-8 rounded-[50%]"

const classes: Record<ButtonVariant, Record<ColorScheme, string>> = {
	solid: {
		primary:
			"bg-primary-500 color-white outline-(width-0 transparent) hover:bg-primary-600 active:bg-primary-500 focus-visible:(outline-(width-3 solid primary-200))",
		neutral:
			"bg-surface-200 color-on-primary outline-(width-0 transparent) hover:bg-surface-300 active:bg-surface-200 focus-visible:(outline-(width-3 solid surface-300))",
		success:
			"bg-success-500 color-white outline-(width-0 transparent) hover:bg-success-600 active:bg-success-500 focus-visible:(outline-(width-3 solid success-200))",
		warning:
			"bg-warning-500 color-white outline-(width-0 transparent) hover:bg-warning-600 active:bg-warning-500 focus-visible:(outline-(width-3 solid warning-200))",
		info: "bg-info-500 color-white outline-(width-0 transparent) hover:bg-info-600 active:bg-info-500 focus-visible:(outline-(width-3 solid info-200))",
		danger:
			"bg-danger-500 color-white outline-(width-0 transparent) hover:bg-danger-600 active:bg-danger-500 focus-visible:(outline-(width-3 solid danger-200))",
	},
	outline: {
		primary:
			"bg-transparent color-primary-500 outline-(width-2 solid primary-500 offset--2) hover:bg-primary-50 active:(bg-primary-100 color-primary-600 outline-primary-600) focus-visible:(bg-primary-50)",
		neutral:
			"bg-transparent color-on-secondary outline-(width-2 solid on-secondary offset--2) hover:bg-surface-100 active:(bg-surface-200 color-on-primary outline-on-primary) focus-visible:(bg-surface-200)",
		success:
			"bg-transparent color-success-500 outline-(width-2 solid success-500 offset--2) hover:bg-success-50 active:(bg-success-100 color-success-600 outline-success-600) focus-visible:(bg-success-50)",
		warning:
			"bg-transparent color-warning-500 outline-(width-2 solid warning-500 offset--2) hover:bg-warning-50 active:(bg-warning-100 color-warning-600 outline-warning-600) focus-visible:(bg-warning-50)",
		info: "bg-transparent color-info-500 outline-(width-2 solid info-500 offset--2) hover:bg-info-50 active:(bg-info-100 color-info-600 outline-info-600) focus-visible:(bg-info-50)",
		danger:
			"bg-transparent color-danger-500 outline-(width-2 solid danger-500 offset--2) hover:bg-danger-50 active:(bg-danger-100 color-danger-600 outline-danger-600) focus-visible:(bg-danger-50)",
	},
	ghost: {
		primary:
			"bg-transparent color-primary-500 outline-(width-0 transparent) hover:bg-primary-50 active:(bg-primary-100 color-primary-600) focus-visible:(bg-primary-50 outline-(width-2 solid primary-300))",
		neutral:
			"bg-transparent color-on-secondary outline-(width-0 transparent) hover:bg-surface-100 active:(bg-surface-200 color-on-primary) focus-visible:(bg-surface-100 outline-(width-2 solid surface-300))",
		success:
			"bg-transparent color-success-500 outline-(width-0 transparent) hover:bg-success-50 active:(bg-success-100 color-success-600) focus-visible:(bg-success-50 outline-(width-2 solid success-300))",
		warning:
			"bg-transparent color-warning-500 outline-(width-0 transparent) hover:bg-warning-50 active:(bg-warning-100 color-warning-600) focus-visible:(bg-warning-50 outline-(width-2 solid warning-300))",
		info: "bg-transparent color-info-500 outline-(width-0 transparent) hover:bg-info-50 active:(bg-info-100 color-info-600) focus-visible:(bg-info-50 outline-(width-2 solid info-300))",
		danger:
			"bg-transparent color-danger-500 outline-(width-0 transparent) hover:bg-danger-50 active:(bg-danger-100 color-danger-600) focus-visible:(bg-danger-50 outline-(width-2 solid danger-300))",
	},
}

// TODO: make all colors work with dark mode
// TODO: state (colorscheme): disabled
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(
		{
			type: "button",
			colorScheme: "primary",
		} satisfies Partial<ButtonProps>,
		_props,
	)

	const [buttonProps, htmlProps] = splitProps(props, ["variant", "colorScheme", "icon", "text", "disabled"])

	return (
		<button
			{...htmlProps}
			disabled={buttonProps.disabled}
			class={classnames(
				sharedClass,
				classes[buttonProps.variant][buttonProps.colorScheme],
				htmlProps.class,
				buttonProps.text ? textClass : iconClass,
				buttonProps.disabled && "opacity-50",
			)}
		>
			{props.icon?.({ class: "flex-shrink-0", size: 18 })}
			<Show when={buttonProps.text}>
				<span>{buttonProps.text}</span>
			</Show>
		</button>
	)
}
