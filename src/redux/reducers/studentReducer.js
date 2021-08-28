import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	actualPath: "/table",
	verifyEntitlement: null,
	formData: {
		username: "",
		startDate: null,
		endDate: null
	},
	tableData: [],
	tableOptions: {
		page: 0,
		filterList: null
	},
	error: {}
};

const studentSlice = createSlice({
	name: "students",
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
		},
		error: (state, action) => {
			state.error = { ...action.payload };
		},

		setVerifyEntitlement: (state, action) => ({
			...initialState,
			verifyEntitlement: action.payload
		})
	}
});

export const {
	setFormData,
	setTableData,
	setTableOptions,
	setActualPath,
	error,
	setVerifyEntitlement
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
