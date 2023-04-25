import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { Divider } from "../../ui/divider"
import { IconFile } from "@tabler/icons-solidjs"
import { useI18n } from "../../locale/i18n.context"

export const Main: Component = () => {
	const [t] = useI18n()
	return (
		<div class="w-full h-full flex flex-col">
			{/* <div class="h-10 px-3 flex items-center gap-3"> */}
			{/* 	<IconFile size={20} /> */}
			{/* 	<span class="text-lg font-bold">Starting Strength</span> */}
			{/* </div> */}
			<Divider />
			<div class="flex-1 flex">
				<Sidebar />
				<div class="flex-1 flex lg:justify-center">
					<div class="flex flex-col min-w-0 max-w-full lg:w-192 p-6 overflow-y-auto">
						<div class="mb-8">
							<span class="color-on-secondary">Status line | Buttons | Last modified</span>
						</div>
						<div class="text-4xl font-bold mb-8">Starting Strength</div>
						<div class="color-on-secondary">{t.workout_placeholder()}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
