const SIDEBAR_OPEN_KEY = "sidebar_open";

const isOpenSidebar = () => {
	if (!JSON.parse(localStorage.getItem(SIDEBAR_OPEN_KEY))) {
		localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(true));
	}
	return JSON.parse(localStorage.getItem(SIDEBAR_OPEN_KEY));
};

const setOpenSidebar = open => {
	localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(open));
};

const clearOpenSidebar = () => {
	localStorage.removeItem(SIDEBAR_OPEN_KEY);
};

export { isOpenSidebar, setOpenSidebar, clearOpenSidebar };
