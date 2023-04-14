import { Component, JSX, Show, mergeProps, splitProps } from "solid-js"
import { IconComponent } from "../types/component"

export type ButtonVariant = "solid" | "outline" | "ghost"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant
	colorScheme: ColorScheme
	icon?: IconComponent
	text?: string
}

const sharedClass = "w-[fit-content] h-8 flex justify-center items-center gap-2 text-sm border-none rounded-1"

const classes: Record<ButtonVariant, string> = {
	solid: "bg-primary-500 color-white",
	outline:
		"bg-transparent color-primary-500 outline-width-2 outline-solid outline-primary-500 outline-offset--2",
	ghost: "",
}

// TODO: disabled
export const Button: Component<ButtonProps> = (_props) => {
	const props = mergeProps(_props, {
		type: "button" as ButtonProps["type"],
	})

	const [buttonProps, htmlProps] = splitProps(props, ["variant", "icon", "text"])

	const hasText = () => !!buttonProps.text

	return (
		<button
			class={`${sharedClass} ${classes[buttonProps.variant]} ${htmlProps.class}`}
			classList={{
				"rounded-1": hasText(),
				"rounded-[50%]": !hasText(),
				"px-3": hasText(),
				"min-w-20": hasText(),
				"w-[fit-content]": hasText(),
				"w-8": !hasText(),
			}}
			type={props.type}
		>
			{props.icon?.({ size: 16 })}
			{props.text}
		</button>
	)
}
