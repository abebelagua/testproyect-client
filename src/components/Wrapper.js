import React from "react";
import { IntlProvider } from "react-intl";
import SpanishES from "../lang/es-ES.json";
import EnglishUS from "../lang/en-US.json";
import {
	getAccessLanguage,
	setAccessLanguage
} from "../storage/languageLocalStorage";

export const Context = React.createContext();

const Wrapper = props => {
	const lang = getAccessLanguage();
	const message = selectMessage(lang);
	const [locale, setLocale] = React.useState(lang);
	const [messages, setMessages] = React.useState(message);

	function selectLanguage(language) {
		const newLocale = language;
		setLocale(newLocale);
		setAccessLanguage(newLocale);
		setMessages(selectMessage(newLocale));
	}

	function selectMessage(l) {
		switch (l.substring(0, 2)) {
			case "es": {
				return SpanishES;
			}
			case "en": {
				return EnglishUS;
			}
			default: {
				return SpanishES;
			}
		}
	}

	return (
		<Context.Provider value={{ locale, selectLanguage }}>
			<IntlProvider messages={messages} locale={locale}>
				{props.children}
			</IntlProvider>
		</Context.Provider>
	);
};

export default Wrapper;
