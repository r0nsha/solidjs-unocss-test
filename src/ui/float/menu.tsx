import {
	Accessor,
	Component,
	JSX,
	JSXElement,
	createContext,
	mergeProps,
	splitProps,
	useContext,
} from "solid-js"
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
	closeMode?: MenuCloseMode
	content?: JSXElement
}

export const Menu: Component<MenuProps> & { Item: Component<MenuItemProps> } = (props) => {
	const merged = mergeProps({ closeMode: "parent" } satisfies Partial<MenuProps>, props)
	const [local, float] = splitProps(merged, ["closeMode", "content"])

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
			render={(provided) => {
				const parent = useContext(MenuContext)

				const show = () => provided.setVisibility(true)
				const hide = () => provided.setVisibility(false)

				return (
					<Motion.div
						{...provided()}
						id="wut"
						class={classNames(
							"flex flex-col p-1 rounded-1 drop-shadow-xl text-sm font-medium",
							theme() === "dark" ? "bg-surface-300" : "bg-surface-50",
							provided.class,
						)}
						animate={{ opacity: [0, 1], scale: [0.85, 1] }}
						exit={{ opacity: 0, scale: 0.85 }}
						transition={{ duration: 0.1 }}
						onClick={(ev) => {
							ev.stopPropagation()
						}}
					>
						<MenuContext.Provider
							value={{
								parent,
								visible: provided.visible,
								show,
								hide,
								close: (mode = local.closeMode) => {
									if (mode === "all") {
										let current = parent

										while (current) {
											current.hide()
											current = current.parent
										}
									} else if (mode === "parent") {
										hide()
									} else if (mode === "none") {
										// ignore
									} else if (mode > 0) {
										hide()
										parent?.close(mode - 1)
									}
								},
							}}
						>
							{local.content}
						</MenuContext.Provider>
					</Motion.div>
				)
			}}
		/>
	)
}

export type MenuItemProps = ListItemProps & {
	closeMode?: MenuCloseMode
}

Menu.Item = (props: MenuItemProps) => {
	const [local, other] = splitProps(props, ["closeMode"])

	const menu = useMenuContext()

	return (
		<ListItem
			{...other}
			onClick={(ev) => {
				menu.close(local.closeMode)
				const onClick = other.onClick as JSX.EventHandler<HTMLButtonElement, MouseEvent> | undefined
				onClick?.(ev)
			}}
		/>
	)
}

type MenuContextValue = {
	parent: MenuContextValue | undefined
	visible: Accessor<boolean>
	show: () => void
	hide: () => void
	close: (mode?: MenuCloseMode) => void
}

const MenuContext = createContext<MenuContextValue>()

export const useMenuContext = () => {
	const value = useContext(MenuContext)
	if (!value) throw new Error("useTheme must be used within a ThemeProvider")
	return value
}
