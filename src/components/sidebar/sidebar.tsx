import { Component, JSX } from "solid-js"
import { useI18n } from "../../locale/i18n.context"
import { IconComponent } from "../../types/component"
import { IconChevronDown, IconSettings } from "@tabler/icons-solidjs"

export const Sidebar: Component = () => {
	const [t] = useI18n()

	return (
		<div class="w-60 bg-surface-100 border-e-(2 solid surface-100)">
			<Title />
			<div class="flex-1 flex flex-col mx-1">
				<Item icon={IconSettings} text={t.settings()} suffix={<IconChevronDown size={16} />} />
			</div>
		</div>
	)
}

const Title: Component = () => {
	return (
		<div class="h-11 flex items-center gap-2.5 px-3">
			<div class="w-5.5 h-5.5 bg-primary-200 rounded-1" />
			<span class="text-sm font-bold">Your name here...</span>
		</div>
	)
}

type ItemProps = {
	icon: IconComponent
	text: string
	suffix?: JSX.Element
}

const Item: Component<ItemProps> = (props) => {
	return (
		<div class="px-2 py-1 rounded-1 text-sm font-bold flex items-center gap-2.5 select-none color-on-secondary transition-colors duration-100 hover:bg-surface-200 active:bg-surface-300">
			{props.icon({ size: 22 })}
			<span class="flex-1">{props.text}</span>
			{props.suffix}
		</div>
	)
}
