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
import { Motion, Options, Variant } from "@motionone/solid"
import { ListItem, ListItemProps } from "../list-item"
import { basePlacement } from "./trigger"
import { UseFloatingResult } from "solid-floating-ui"

export type MenuCloseMode = "all" | "parent" | "none" | number
export type MenuAnimation = "fade" | "scale" | "shift"

export type MenuProps = Omit<FloatProps, "render" | "trigger"> & {
	closeMode?: MenuCloseMode
	animation?: MenuAnimation
	content?: JSXElement
}

export const Menu: Component<MenuProps> & { Item: Component<MenuItemProps> } = (props) => {
	const merged = mergeProps({ closeMode: "parent", animation: "shift" } satisfies Partial<MenuProps>, props)
	const [local, float] = splitProps(merged, ["closeMode", "animation", "content"])

	const { theme } = useTheme()

	return (
		<Float
			trigger="click"
			interactive
			interactiveBorder={4}
			zIndex={ZIndex.menu}
			{...float}
			options={{
				placement: "bottom-start",
				...(float.options ?? {}),
				middleware: [offset({ mainAxis: 4 }), ...(float.options?.middleware ?? [])],
			}}
			render={(provided) => {
				const parent = useContext(MenuContext)

				const show = () => provided.setVisibility(true)
				const hide = () => provided.setVisibility(false)

				return (
					<Motion.div
						{...provided.props()}
						class={classNames(
							"flex flex-col px-1 py-2 rounded-2 shadow-lg shadow-surface-active border-(1 solid surface-200) text-sm font-medium",
							theme() === "dark" ? "bg-surface-300" : "bg-surface-50",
							provided.class,
						)}
						{...menuAnimation(local.animation, provided.position)}
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

const menuAnimation = (animation: MenuAnimation, position: UseFloatingResult): Options => {
	const shiftAnimate: Variant = {}
	const shiftExit: Variant = {}

	switch (animation) {
		case "shift":
			const placement = basePlacement(position.placement)

			let shiftOffset: number

			switch (placement) {
				case "top":
				case "bottom":
					shiftOffset = position.middlewareData.offset?.y ?? 0
					break
				case "right":
				case "left":
					shiftOffset = position.middlewareData.offset?.x ?? 0
					break
			}

			shiftOffset *= 1

			switch (placement) {
				case "top":
					shiftAnimate.y = [shiftOffset, 0]
					shiftExit.y = shiftOffset
					break
				case "right":
					shiftAnimate.x = [-shiftOffset, 0]
					shiftExit.x = -shiftOffset
					break
				case "bottom":
					shiftAnimate.y = [-shiftOffset, 0]
					shiftExit.y = -shiftOffset
					break
				case "left":
					shiftAnimate.x = [shiftOffset, 0]
					shiftExit.x = shiftOffset
					break
			}
			break
		case "scale":
			shiftAnimate.scale = [0.95, 1]
			shiftAnimate.transformOrigin = "0"
			shiftExit.scale = 0.9
			shiftExit.transformOrigin = "0"
			break
	}

	return {
		animate: { ...shiftAnimate, opacity: [0, 1] },
		exit: { ...shiftExit, opacity: 0 },
		transition: { duration: 0.1 },
	}
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
	if (!value) throw new Error("useMenuContext must be used within a MenuContext")
	return value
}
