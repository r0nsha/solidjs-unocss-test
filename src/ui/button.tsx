import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { ColorScheme } from "../types/color"
import classNames from "classnames"

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant
	colorScheme?: ColorScheme
	icon?: IconComponent
	text?: string
	disabled?: boolean
}
const sharedClass =
	"h-8 flex truncate justify-center items-center gap-1.5 text-sm font-bold border-none transition-all duration-100 select-none"

const textClass = "w-[fit-content] min-w-20 px-3 rounded-2"
const iconClass = "w-8 rounded-[50%]"

const variantClasses: Record<ButtonVariant, Record<ColorScheme | "disabled", string>> = {
	solid: {
		primary:
			"bg-primary-500 color-white outline-(width-0 transparent) hover:bg-primary-600 active:bg-primary-700 focus-visible:(outline-(width-3 solid primary-200))",
		neutral:
			"bg-surface-200 color-on-primary outline-(width-0 transparent) hover:bg-surface-300 active:bg-surface-400 focus-visible:(outline-(width-3 solid surface-300))",
		success:
			"bg-success-500 color-white outline-(width-0 transparent) hover:bg-success-600 active:bg-success-700 focus-visible:(outline-(width-3 solid success-200))",
		warning:
			"bg-warning-500 color-white outline-(width-0 transparent) hover:bg-warning-600 active:bg-warning-700 focus-visible:(outline-(width-3 solid warning-200))",
		info: "bg-info-500 color-white outline-(width-0 transparent) hover:bg-info-600 active:bg-info-700 focus-visible:(outline-(width-3 solid info-200))",
		danger:
			"bg-danger-500 color-white outline-(width-0 transparent) hover:bg-danger-600 active:bg-danger-700 focus-visible:(outline-(width-3 solid danger-200))",
		disabled: "bg-surface-200 color-surface-400 outline-(width-0 transparent)",
	},
	outline: {
		primary:
			"bg-transparent color-primary-500 outline-(width-2 solid primary-500 offset--2) hover:(bg-primary-50 color-primary-600 outline-primary-600) active:(bg-primary-100 color-primary-700 outline-primary-700) focus-visible:(bg-primary-50 color-primary-600 outline-primary-600)",
		neutral:
			"bg-transparent color-on-secondary outline-(width-2 solid on-secondary offset--2) hover:bg-surface-100 active:(bg-surface-200 color-on-primary outline-on-primary) focus-visible:(bg-surface-200 color-on-primary outline-on-primary)",
		success:
			"bg-transparent color-success-500 outline-(width-2 solid success-500 offset--2) hover:(bg-success-50 color-success-600 outline-success-600) active:(bg-success-100 color-success-700 outline-success-700) focus-visible:(bg-success-50 color-success-600 outline-success-600)",
		warning:
			"bg-transparent color-warning-500 outline-(width-2 solid warning-500 offset--2) hover:(bg-warning-50 color-warning-600 outline-warning-600) active:(bg-warning-100 color-warning-700 outline-warning-700) focus-visible:(bg-warning-50 color-warning-600 outline-warning-600)",
		info: "bg-transparent color-info-500 outline-(width-2 solid info-500 offset--2) hover:(bg-info-50 color-info-600 outline-info-600) active:(bg-info-100 color-info-700 outline-info-700) focus-visible:(bg-info-50 color-info-600 outline-info-600)",
		danger:
			"bg-transparent color-danger-500 outline-(width-2 solid danger-500 offset--2) hover:(bg-danger-50 color-danger-600 outline-danger-600) active:(bg-danger-100 color-danger-700 outline-danger-700) focus-visible:(bg-danger-50 color-danger-600 outline-danger-600)",
		disabled: "bg-transparent color-surface-300 outline-(width-2 solid surface-300 offset--2)",
	},
	ghost: {
		primary:
			"bg-transparent color-primary-500 outline-(width-0 transparent) hover:(bg-primary-50 color-primary-600) active:bg-primary-100 focus-visible:(bg-primary-50 outline-(width-2 solid primary-300))",
		neutral:
			"bg-transparent color-on-secondary outline-(width-0 transparent) hover:(bg-surface-100 color-on-primary) active:bg-surface-200 focus-visible:(bg-surface-100 outline-(width-2 solid surface-300))",
		success:
			"bg-transparent color-success-500 outline-(width-0 transparent) hover:(bg-success-50 color-success-600) active:bg-success-100 focus-visible:(bg-success-50 outline-(width-2 solid success-300))",
		warning:
			"bg-transparent color-warning-500 outline-(width-0 transparent) hover:(bg-warning-50 color-warning-600) active:bg-warning-100 focus-visible:(bg-warning-50 outline-(width-2 solid warning-300))",
		info: "bg-transparent color-info-500 outline-(width-0 transparent) hover:(bg-info-50 color-info-600) active:bg-info-100 focus-visible:(bg-info-50 outline-(width-2 solid info-300))",
		danger:
			"bg-transparent color-danger-500 outline-(width-0 transparent) hover:(bg-danger-50 color-danger-600) active:bg-danger-100 focus-visible:(bg-danger-50 outline-(width-2 solid danger-300))",
		disabled: "bg-transparent color-surface-300 outline-(width-0 transparent)",
	},
}

export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(
		{
			type: "button",
			colorScheme: "primary",
		} satisfies Partial<ButtonProps>,
		_props,
	)

	const [local, html] = splitProps(props, ["variant", "colorScheme", "icon", "text", "disabled"])

	return (
		<button
			{...html}
			disabled={local.disabled}
			class={classNames(
				sharedClass,
				variantClasses[local.variant][local.disabled ? "disabled" : local.colorScheme],
				html.class,
				local.text ? textClass : iconClass,
			)}
		>
			{props.icon?.({ class: "flex-shrink-0", size: 20 })}
			<Show when={local.text}>
				<span>{local.text}</span>
			</Show>
		</button>
	)
}
