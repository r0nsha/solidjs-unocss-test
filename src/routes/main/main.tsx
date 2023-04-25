import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { Divider } from "../../ui/divider"
import { IconFile } from "@tabler/icons-solidjs"

export const Main: Component = () => {
	return (
		<div class="w-full h-full flex flex-col">
			<div class="h-10 px-3 flex items-center gap-3">
				<IconFile size={20} />
				<span class="text-lg font-bold">Starting Strength</span>
			</div>
			<Divider />
			<div class="flex-1 flex">
				<Sidebar />
				<div class="flex-1 flex justify-center">
					<div class="flex flex-col min-w-0 w-full lg:w-[90%] xl:w-[75%] 2xl:w-[60%] px-6 lg:px-12 py-6 overflow-y-auto transition-width duration-300">
						<div class="mb-8">
							<span class="color-on-secondary">Status line | Buttons | Last modified</span>
						</div>
						<div class="text-4xl font-bold mb-8">Starting Strength</div>
						<div class="color-on-secondary">Write something...</div>
					</div>
				</div>
			</div>
		</div>
	)
}
