import { Component } from "solid-js"
import { Sidebar } from "./sidebar/sidebar"
import { useI18n } from "../../locale/i18n.context"
import { Button } from "../../ui/button"
import { IconArrowLeft, IconArrowRight, IconDotsVertical } from "@tabler/icons-solidjs"

// TODO: Tabs:
// TODO: - add
// TODO: - remove
// TODO: - persist
// TODO: - context menu:
// TODO: - * close
// TODO: - * close others
// TODO: - * pin/unpin
// TODO: Header:
// TODO: - move into header.tsx
// TODO: - title
// TODO: - backwards/forwards buttons
// TODO: - more button:
// TODO: - * close
// TODO: - * pin/unpin
// TODO: - * export as: markdown
// TODO: - * export as: markdown
export const Main: Component = () => {
	const [t] = useI18n()

	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<div class="flex-1 flex flex-col lg:items-center">
				<div class="h-10 self-stretch flex justify-between items-center px-2">
					<div class="flex items-center">
						<Button variant="ghost" colorScheme="neutral" small icon={IconArrowLeft} />
						<Button variant="ghost" colorScheme="neutral" small icon={IconArrowRight} />
					</div>
					<span class="color-on-secondary text-sm select-none">Starting Strength</span>
					<Button variant="ghost" colorScheme="neutral" small icon={IconDotsVertical} />
				</div>
				<div class="flex-1 flex flex-col min-w-0 max-w-full lg:w-192 p-6 overflow-y-auto">
					<div class="text-4xl font-bold mb-6">Starting Strength</div>
					<div class="color-on-secondary">{t.workout_placeholder()}</div>
				</div>
			</div>
		</div>
	)
}
