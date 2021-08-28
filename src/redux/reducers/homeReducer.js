import { createSlice } from "@reduxjs/toolkit";
import {
	setOpenSidebar,
	isOpenSidebar
} from "../../storage/sidebarLocalStorage";
import {
	setTabs as setTabStorage,
	getTabs
} from "../../storage/tabsSessionStorage";

const homeState = {
	isDrawerOpen: isOpenSidebar(),
	drawerMenu: [],
	tabs: [
		{
			tabName: "tab.main",
			tabRouteName: "main"
		},
		...getTabs()
	],
	selectedTab: 0,
	isNewTab: true
};

const homeSlice = createSlice({
	name: "home",
	initialState: homeState,
	reducers: {
		setDrawerOpen: (state, action) => {
			state.isDrawerOpen = action.payload;
			setOpenSidebar(action.payload);
		},
		setDrawerMenu: (state, action) => {
			let menu = [];
			action.payload.map(m => {
				menu.push({
					menu: m,
					isOpen: false
				});
			});
			state.drawerMenu = menu;
		},
		setMenuOpen: (state, action) => {
			state.drawerMenu[action.payload.index].isOpen =
				action.payload.value;
		},
		setSelectedTab: (state, action) => {
			state.selectedTab = action.payload;
		},
		setTabs: (state, action) => {
			state.tabs = [
				{
					tabName: "tab.main",
					tabRouteName: "main"
				},
				...action.payload
			];
		},
		addTab: (state, action) => {
			state.isNewTab = true;
			state.tabs.push({
				tabName: `tab.${action.payload.id}`,
				tabRouteName: action.payload.id
			});
			const [, ...othersTabs] = state.tabs;
			setTabStorage(othersTabs);
		},
		deleteTab: (state, action) => {
			state.tabs.splice(action.payload, 1);
			const [, ...othersTabs] = state.tabs;
			setTabStorage(othersTabs);
		},
		setIsNewTab: (state, action) => {
			state.isNewTab = action.payload;
		}
	}
});

export const {
	setDrawerOpen,
	setDrawerMenu,
	setMenuOpen,
	setSelectedTab,
	setTabs,
	addTab,
	deleteTab,
	setIsNewTab
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
