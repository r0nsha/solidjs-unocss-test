import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { Divider } from "../../ui/divider"
import { IconFileDescription } from "@tabler/icons-solidjs"

export const Main: Component = () => {
	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<div class="flex-1 flex flex-col">
				<div class="h-10 px-3 flex items-center gap-3">
					<IconFileDescription size={20} />
					<span class="text-lg font-bold">Starting Strength</span>
				</div>
				<Divider />
				<div class="flex-1 px-[calc(0.75rem+6vw)] py-8 overflow-y-auto">
					<span class="color-on-secondary">Write something...</span>
				</div>
			</div>
		</div>
	)
}
