import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { homeReducer } from "./reducers/homeReducer";
import { groupReducer } from "./reducers/groupReducer";
import { studentReducer } from "./reducers/studentReducer";

const middleware = [
	...getDefaultMiddleware()
	/* YOUR CUSTOM MIDDLEWARES HERE */
];

export const store = configureStore({
	reducer: {
		home: homeReducer,
		groups: groupReducer,
		students: studentReducer
	},
	middleware
});
