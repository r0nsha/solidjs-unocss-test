import { Component } from "solid-js"
import { Sidebar } from "../sidebar/sidebar"
import { MainRouter } from "./main-router"

export const Main: Component = () => {
	return (
		<div class="w-full h-full flex">
			<Sidebar />
			<MainRouter />
		</div>
	)
}
