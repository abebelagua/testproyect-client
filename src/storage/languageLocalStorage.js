const LANGUAGE_KEY = "language";
const languages = ["es", "en"];
const languagesNames = {
	es: ["Español", "Inglés"],
	en: ["Spanish", "English"]
};

const getAccessLanguage = () => {
	const l = localStorage.getItem(LANGUAGE_KEY);
	return l || navigator.language;
};

const setAccessLanguage = language => {
	localStorage.setItem(LANGUAGE_KEY, language);
};

const clearAccessLanguage = () => {
	localStorage.removeItem(LANGUAGE_KEY);
};

export {
	languages,
	languagesNames,
	getAccessLanguage,
	setAccessLanguage,
	clearAccessLanguage
};
