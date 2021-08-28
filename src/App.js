import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Wrapper from "./components/Wrapper";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./assets/css/index.css";

export default function App() {
	return (
		<Wrapper>
			<Provider store={store}>
				<Router history={createBrowserHistory()}>
					<Switch>
						<Route path="/home/:view" component={HomePage} />
						<Redirect exact from="/" to="/home/main" />
						<Redirect exact from="/home" to="/home/main" />
					</Switch>
				</Router>
			</Provider>
		</Wrapper>
	);
}
