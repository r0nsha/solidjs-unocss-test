import { Component } from "solid-js"
import { useI18n } from "../../locale/i18n.context"
import { IconComponent } from "../../types/component"
import { IconSettings } from "@tabler/icons-solidjs"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 flex flex-col border-e-(2 solid surface-100)">
			<Item icon={IconSettings} />
		</div>
	)
}

type ItemProps = {
	icon: IconComponent
	text: string
}

const Item: Component<ItemProps> = (props) => {
	return <div class="px-3 py-2">{props.icon({ size: 22 })}</div>
}
