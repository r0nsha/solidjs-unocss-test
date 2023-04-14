import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"
import { ColorScheme } from "../types/colorscheme"
import classnames from "classnames"

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant
	colorScheme?: ColorScheme
	icon?: IconComponent
	text?: string
}

const sharedClass =
	"h-8 flex justify-center items-center gap-2 text-sm border-none transition-all duration-150"

const textClass = "w-[fit-content] min-w-20 px-3 rounded-1"
const iconClass = "w-8 rounded-[50%]"

const classes: Record<ButtonVariant, string> = {
	solid: "bg-primary-500 color-white",
	outline: "bg-transparent color-primary-500 outline-(width-2 solid primary-500 offset--2)",
	ghost: "bg-transparent color-primary-500",
}

// TODO: state: idle
// TODO: state: hover
// TODO: state: active
// TODO: state: focus
// TODO: state: disabled
// TODO: colorschemes
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(_props, {
		type: "button",
		colorScheme: "neutral",
	} satisfies Partial<ButtonProps>)

	const [buttonProps, htmlProps] = splitProps(props, ["variant", "icon", "text"])

	return (
		<button
			{...htmlProps}
			class={classnames(
				sharedClass,
				classes[buttonProps.variant],
				htmlProps.class,
				buttonProps.text ? textClass : iconClass,
			)}
			type={props.type}
		>
			{props.icon?.({ size: 16 })}
			{props.text}
		</button>
	)
}
