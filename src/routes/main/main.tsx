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
				<div class="flex-1 py-8 flex justify-center overflow-y-auto">
					<div class="w-full px-3 lg:(w-auto min-w-lg px-[5vw]) bg-surface-100 flex-shrink-1">
						Write something...
					</div>
				</div>
			</div>
		</div>
	)
}
