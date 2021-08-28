const TABS_KEY = "tabs";

const getTabs = () => {
	if (!JSON.parse(sessionStorage.getItem(TABS_KEY))) {
		sessionStorage.setItem(TABS_KEY, JSON.stringify([]));
	}

	return JSON.parse(sessionStorage.getItem(TABS_KEY));
};

const setTabs = tabs => {
	sessionStorage.setItem(TABS_KEY, JSON.stringify(tabs));
};

const clearTabs = () => {
	sessionStorage.removeItem(TABS_KEY);
};

export { getTabs, setTabs, clearTabs };
