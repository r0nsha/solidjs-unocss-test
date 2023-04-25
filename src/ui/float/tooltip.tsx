import { Component, Show, splitProps } from "solid-js"
import { Float, FloatProps } from "./float"
import { offset } from "@floating-ui/dom"
import { useTheme } from "../../contexts/theme.context"
import classNames from "classnames"
import { ZIndex } from "../../utils/z-index"
import { Motion } from "@motionone/solid"

export type TooltipProps = Omit<FloatProps, "render"> & {
	text: string
	subtext?: string
}

export const Tooltip: Component<TooltipProps> = (props) => {
	const [local, float] = splitProps(props, ["text", "subtext"])

	const { theme } = useTheme()

	return (
		<Float
			trigger={["hover", "focus"]}
			interactive={false}
			interactiveBorder={4}
			delay={{ in: 300, out: 100 }}
			zIndex={ZIndex.tooltip}
			{...float}
			options={{
				middleware: [offset({ mainAxis: 4 })],
				...(float.options ?? {}),
			}}
			render={(provided) => (
				<Motion.div
					{...provided.props()}
					class={classNames(
						"flex flex-col max-w-sm break-words px-3 py-1 rounded-1 shadow-md text-sm font-medium",
						theme() === "dark" ? "bg-surface-300" : "bg-on-primary",
						provided.class,
					)}
					animate={{ opacity: [0, 1], scale: [0.9, 1] }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.1 }}
				>
					<Show when={local.text}>
						<div>
							<span class={classNames(theme() === "dark" ? "color-on-primary" : "color-surface-200")}>
								{local.text}
							</span>
						</div>
					</Show>
					<Show when={local.subtext}>
						<span class={classNames(theme() === "dark" ? "color-on-secondary" : "color-surface-400")}>
							{local.subtext}
						</span>
					</Show>
				</Motion.div>
			)}
		/>
	)
}
