import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	actualPath: "/form",
	formData: {
		username: "",
		startDate: null,
		endDate: null
	},
	tableData: [],
	tableOptions: {
		page: 0,
		filterList: null
	}
};

const groupSlice = createSlice({
	name: "groups",
	initialState: initialState,
	reducers: {
		setActualPath: (state, action) => {
			state.actualPath = action.payload;
		},
		setTableData: (state, action) => {
			state.tableData = [...action.payload];
		},
		setFormData: (state, action) => {
			state.formData = { ...action.payload };
		},
		setTableOptions: (state, action) => {
			state.tableOptions = { ...action.payload };
		}
	}
});

export const {
	setFormData,
	setTableData,
	setTableOptions,
	setActualPath,
	error,
	setVerifyEntitlement
} = groupSlice.actions;

export const groupReducer = groupSlice.reducer;
