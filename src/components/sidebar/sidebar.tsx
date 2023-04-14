import { Component } from "solid-js"
import { Button } from "../../ui/button"
import { IconCirclePlus, IconExternalLink, IconPlus, IconTrash } from "@tabler/icons-solidjs"
import { colorSchemes } from "../../types/color"

export const Sidebar: Component = () => {
	return (
		<div class="w-60 h-full flex flex-col gap-16 py-40 px-20">
			{colorSchemes.map((colorScheme) => (
				<div class="flex flex-col gap-2">
					<Button
						disabled={false}
						variant="solid"
						colorScheme={colorScheme}
						icon={IconPlus}
						text="Button"
						onClick={() => console.log("click")}
					/>
					<Button
						disabled={false}
						variant="outline"
						colorScheme={colorScheme}
						icon={IconCirclePlus}
						text="Button"
						onClick={() => console.log("click")}
					/>
					<Button
						disabled={false}
						variant="ghost"
						colorScheme={colorScheme}
						icon={IconExternalLink}
						text="Open in new tab"
						onClick={() => console.log("click")}
					/>
					<br />
					<Button
						disabled={false}
						variant="solid"
						colorScheme={colorScheme}
						icon={IconTrash}
						onClick={() => console.log("click")}
					/>
					<Button
						disabled={false}
						variant="outline"
						colorScheme={colorScheme}
						icon={IconTrash}
						onClick={() => console.log("click")}
					/>
					<Button
						disabled={false}
						variant="ghost"
						colorScheme={colorScheme}
						icon={IconTrash}
						onClick={() => console.log("click")}
					/>
				</div>
			))}
			Sidebar
		</div>
	)
}
