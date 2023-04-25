import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { useI18n } from "../../locale/i18n.context"

export const Main: Component = () => {
	const [t] = useI18n()
	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<div class="flex-1 flex lg:justify-center">
				<div class="flex flex-col min-w-0 max-w-full lg:w-192 px-6 pt-5 overflow-y-auto">
					<div class="mb-9">
						<span class="color-on-secondary">Status line | Buttons | Last modified</span>
					</div>
					<div class="text-4xl font-bold mb-6">Starting Strength</div>
					<div class="color-on-secondary">{t.workout_placeholder()}</div>
				</div>
			</div>
		</div>
	)
}
