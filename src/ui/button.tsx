import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { ColorScheme } from "../types/colorscheme"
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

const classes: Record<ButtonVariant, string> = {
	solid:
		"bg-primary-500 color-white outline-(width-0 transparent) hover:bg-primary-600 active:bg-primary-500 focus-visible:(outline-(width-4 solid primary-200))",
	outline:
		"bg-transparent color-primary-500 outline-(width-2 solid primary-500 offset--2) hover:bg-primary-50 active:(bg-primary-100 color-primary-600 outline-primary-600) focus-visible:(bg-primary-50)",
	ghost:
		"bg-transparent color-primary-500 outline-(width-0 transparent) hover:focus-visible:bg-primary-50 active:(bg-primary-100 color-primary-600) focus-visible:(bg-primary-50 outline-(width-2 solid primary-200))",
}

// TODO: colorschemes
// TODO: state (colorscheme): disabled
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(_props, {
		type: "button",
		colorScheme: "neutral",
	} satisfies Partial<ButtonProps>)

	const [buttonProps, htmlProps] = splitProps(props, ["variant", "colorScheme", "icon", "text", "disabled"])

	return (
		<button
			{...htmlProps}
			disabled={buttonProps.disabled}
			class={classnames(
				sharedClass,
				classes[buttonProps.variant],
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
