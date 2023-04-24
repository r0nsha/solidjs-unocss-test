import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { Divider } from "../../ui/divider"
import { IconFileDescription } from "@tabler/icons-solidjs"

export const Main: Component = () => {
	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<div class="flex-1 flex flex-col">
				<div class="h-10 px-4 flex items-center gap-4">
					<IconFileDescription size={20} />
					<span class="text-lg font-bold">My Workout</span>
				</div>
				<Divider />
				<div class="px-14 py-8 overflow-y-auto flex-1">Write something...</div>
			</div>
		</div>
	)
}
