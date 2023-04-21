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
					ref={provided.ref}
					style={{
						position: provided.position.strategy,
						top: `${provided.position.y ?? 0}px`,
						left: `${provided.position.x ?? 0}px`,
					}}
					class={classNames(
						"flex flex-col max-w-sm break-words px-3 py-1 rounded-1 shadow-md text-sm font-medium",
						theme() === "dark" ? "bg-surface-300" : "bg-on-primary",
						provided.class,
					)}
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.85 }}
					transition={{ duration: 0.1 }}
					onMotionComplete={provided.onTransitionComplete}
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
