import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { useI18n } from "../../locale/i18n.context"
import { Button } from "../../ui/button"
import { IconArrowLeft, IconArrowRight, IconDotsVertical } from "@tabler/icons-solidjs"
import { colors } from "../../types/color"

export const Main: Component = () => {
	const [t] = useI18n()

	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<div class="flex-1 flex flex-col lg:items-center">
				<div class="h-10 self-stretch flex justify-between items-center px-2">
					<div class="flex items-center">
						<Button variant="ghost" color="neutral" small icon={IconArrowLeft} />
						<Button variant="ghost" color="neutral" small icon={IconArrowRight} />
					</div>
					<span class="color-on-secondary text-sm select-none">Starting Strength</span>
					<Button variant="ghost" color="neutral" small icon={IconDotsVertical} />
				</div>
				<div class="w-2xl flex flex-wrap gap-4">
					{(["solid", "outline", "ghost"] as const).map((variant) =>
						colors.map((color) => (
							<Button variant={variant} color={color} text="Button" />
						)),
					)}
				</div>
				<div class="flex-1 flex flex-col min-w-0 max-w-full lg:w-192 p-6 overflow-y-auto">
					<div class="text-4xl font-bold mb-6">Starting Strength</div>
					<div class="color-on-secondary">{t.workout_placeholder()}</div>
				</div>
			</div>
		</div>
	)
}
