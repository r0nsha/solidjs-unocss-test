import { Component } from "solid-js"

export const Sidebar: Component & { Item: Component } = () => "Sidebar"

Sidebar.Item = () => "Item"
