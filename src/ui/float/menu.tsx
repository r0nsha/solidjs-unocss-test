// import { Component, JSXElement, Show, splitProps } from "solid-js"
// import { Float, FloatProps } from "./float"
// import { offset } from "@floating-ui/dom"
// import { useTheme } from "../../contexts/theme.context"
// import classNames from "classnames"
// import { ZIndex } from "../../utils/z-index"
// import { Motion } from "@motionone/solid"
//
// export type MenuProps = Omit<FloatProps, "render"> & {
// 	content?: JSXElement
// }
//
// export const Menu: Component<MenuProps> = (props) => {
// 	const [local, float] = splitProps(props, ["content"])
//
// 	const { theme } = useTheme()
//
// 	return (
// 		<Float
// 			trigger={["hover", "focus"]}
// 			interactive={false}
// 			interactiveBorder={4}
// 			delay={{ in: 300, out: 100 }}
// 			zIndex={ZIndex.tooltip}
// 			{...float}
// 			options={{
// 				middleware: [offset({ mainAxis: 4 })],
// 				...(float.options ?? {}),
// 			}}
// 			render={(provided) => (
// 				<Motion.div
// 					ref={provided.ref}
// 					style={{
// 						position: provided.position.strategy,
// 						top: `${provided.position.y ?? 0}px`,
// 						left: `${provided.position.x ?? 0}px`,
// 					}}
// 					class={classNames(
// 						"flex flex-col max-w-sm break-words px-3 py-1 rounded-1 shadow-md text-sm font-medium",
// 						theme() === "dark" ? "bg-surface-200" : "bg-surface-50",
// 						provided.class,
// 					)}
// 					initial={{ opacity: 0, scale: 0.85 }}
// 					animate={{ opacity: 1, scale: 1 }}
// 					exit={{ opacity: 0, scale: 0.85 }}
// 					transition={{ duration: 0.1 }}
// 					onMotionComplete={provided.onMotionComplete}
// 				>
// 					{props.content}
// 				</Motion.div>
// 			)}
// 		/>
// 	)
// }
