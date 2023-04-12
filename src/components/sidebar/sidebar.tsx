import { Component } from "solid-js"

const Sidebar: Component & { Item: Component } = () => "Sidebar"

Sidebar.Item = () => "Item"
