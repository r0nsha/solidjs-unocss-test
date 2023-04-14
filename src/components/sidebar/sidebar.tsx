import { Component } from "solid-js"
import { Button } from "../../ui/button"
import { IconCirclePlus, IconExternalLink, IconPlus, IconTrash } from "@tabler/icons-solidjs"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 h-full flex flex-col gap-4 p-40">
			<Button variant="solid" icon={IconPlus} text="Button" onClick={() => console.log("click")} />
			<Button variant="outline" icon={IconCirclePlus} text="Button" onClick={() => console.log("click")} />
			<Button
				variant="ghost"
				icon={IconExternalLink}
				text="Open in new tab"
				onClick={() => console.log("click")}
			/>
			<br />
			<Button variant="solid" icon={IconTrash} onClick={() => console.log("click")} />
			<Button variant="outline" icon={IconTrash} onClick={() => console.log("click")} />
			<Button variant="ghost" icon={IconTrash} onClick={() => console.log("click")} />
			Sidebar
		</div>
	)
}
