import { Component, JSXElement, splitProps } from "solid-js"
import { Float, FloatProps } from "./float"
import { offset } from "@floating-ui/dom"
import { useTheme } from "../../contexts/theme.context"
import classNames from "classnames"
import { ZIndex } from "../../utils/z-index"
import { Motion } from "@motionone/solid"
import { sameWidth } from "./middleware"
import { ListItem, ListItemProps } from "../list-item"

export type MenuCloseMode = "all" | "parent" | "none" | number

export type MenuProps = Omit<FloatProps, "render"> & {
	// TODO: closeMode
	close?: MenuCloseMode
	content?: JSXElement
}

export const Menu: Component<MenuProps> & { Item: Component<MenuItemProps> } = (props) => {
	const [local, float] = splitProps(props, ["content"])

	const { theme } = useTheme()

	return (
		<Float
			trigger="click"
			interactive
			interactiveBorder={4}
			zIndex={ZIndex.menu}
			{...float}
			options={{
				middleware: [offset({ mainAxis: 4 }), sameWidth()],
				...(float.options ?? {}),
			}}
			render={(provided) => (
				<Motion.div
					{...provided()}
					class={classNames(
						"flex flex-col p-1 rounded-1 drop-shadow text-sm font-medium",
						theme() === "dark" ? "bg-surface-200" : "bg-surface-50",
						provided.class,
					)}
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.85 }}
					transition={{ duration: 0.1 }}
				>
					{local.content}
				</Motion.div>
			)}
		/>
	)
}

export type MenuItemProps = ListItemProps & {
	// TODO: closeMode
	close?: MenuCloseMode
}

Menu.Item = (props: MenuItemProps) => {
	const [local, other] = splitProps(props, ["close"])

	return <ListItem {...other} />
}
