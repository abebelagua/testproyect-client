import ReactDOMServer from "react-dom/server";
import React, { useEffect, useState } from "react";
import innerText from "react-innertext";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import BfiTableToolbar from "./BfiTableToolbar";
import BelTableHead from "./BfiTableHead";
import BfiTableBody from "./BfiTableBody";
import BfiTablePaginationActions from "./BfiTablePaginationActions";
import Wrapper from "../../Wrapper";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		width: "100%"
	},
	table: {
		minWidth: 750
	}
}));

export default function BfiDataTable(props) {
	const classes = useStyles();
	const { actions, onChange } = props;
	const [states, setStates] = useState({});

	const initializeTable = p => {
		setTableData(p);
	};

	const getDefaultOptions = () => {
		const defaultOptions = {
			pagination: true,
			page: 0,
			rowsPerPage: 10,
			rowsPerPageOptions: [10, 20, 30],
			textLabels: {
				pagination: {
					labelRowsPerPage: (
						<FormattedMessage id="beltable.labelRowsPerPage" />
					)
				},
				filters: {
					title: <FormattedMessage id="beltable.filters" />,
					btnRestart: (
						<FormattedMessage id="beltable.restartFiltersBtn" />
					)
				},
				loading: <FormattedMessage id="beltable.loading" />,
				toolbar: {
					searchPlaceholder: "beltable.searchTooltip"
				}
			},
			// serverSide: false,
			filter: true,
			sort: true,
			sortColumnIndex: null,
			sortColumnDirection: null,
			search: true,
			searchText: "",
			groupIndex: null,
			groupDirection: "asc",
			title: "",
			caseSensitive: false
		};
		return { ...defaultOptions };
	};

	const setTableData = p => {
		const { data, columns, title } = p;
		let options = getDefaultOptions();
		mergeDeep(options, p.options);
		mergeDeep(options, { title });
		const columnData = [];
		const tableData = [];
		let filterList = [];

		columns.forEach((column, colIndex) => {
			let columnOptions = {
				display: colIndex === options.groupIndex ? "false" : "true",
				filter: true,
				sort: true,
				sortDirection: null,
				width: null,
				renderedTitle: extractContent(
					ReactDOMServer.renderToString(
						<Wrapper>{column.title}</Wrapper>
					)
				)
			};

			if (typeof column === "object") {
				if (column.options && column.options.display !== undefined) {
					column.options.display = column.options.display.toString();
				}
				if (
					column.options &&
					column.options.sortDirection !== undefined
				) {
					column.options.sortDirection =
						column.options.sortDirection.toString();
				}

				columnOptions = {
					title: column.title,
					field: column.field,
					render: column.render,
					type: column.type,
					...columnOptions,
					...(column.options ? column.options : {})
				};
			} else {
				columnOptions = { ...columnOptions, name: column };
			}
			columnData.push(columnOptions);
			filterList[colIndex] = "";
		});

		for (let rowIndex = 0; rowIndex < data.length; rowIndex += 1) {
			if (typeof tableData[rowIndex] === "undefined") {
				tableData.push({
					index: rowIndex,
					data: data[rowIndex]
				});
			}
		}

		if (options.filterList) filterList = options.filterList;

		if (filterList.length !== columns.length) {
			throw new Error(
				"Provided options.filterList does not match the column length"
			);
		}

		const displayData = getDisplayData(columnData, tableData, options);

		options = {
			...options,
			filterList,
			columns: columnData,
			data: tableData,
			displayData
		};

		setStates(options);
	};

	const isObject = item =>
		item && typeof item === "object" && !Array.isArray(item);

	const mergeDeep = (target, source) => {
		if (isObject(target) && isObject(source)) {
			for (const key in source) {
				if (isObject(source[key])) {
					if (!target[key]) Object.assign(target, { [key]: {} });
					mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}
	};

	const getDisplayData = (columns, data, options) => {
		const {
			searchText,
			sortColumnIndex,
			sortColumnDirection,
			filterList,
			caseSensitive
		} = options;

		const newRows = [];
		for (let index = 0; index < data.length; index += 1) {
			const value = data[index].data;
			const { displayRow, renderedRow } = computeDisplayRow(
				columns,
				value,
				filterList,
				searchText,
				caseSensitive
			);

			if (displayRow) {
				newRows.push({
					data: displayRow,
					renderedData: renderedRow,
					dataObject: value,
					dataIndex:
						data[index].dataIndex !== undefined
							? data[index].dataIndex
							: index
				});
			}
		}
		if (sortColumnIndex != null && sortColumnDirection != null)
			return sortData(
				newRows,
				columns[sortColumnIndex],
				sortColumnDirection,
				options.groupIndex != null ? columns[options.groupIndex] : null,
				options.groupDirection
			);
		return newRows;
	};

	const computeDisplayRow = (
		columns,
		rowObjectData,
		filterList,
		searchText,
		caseSensitive
	) => {
		let isFiltered = false;
		let isSearchFound = false;
		const displayRow = [];
		const renderedRow = [];
		// go through all record columns -> need to change to go thru column definition
		for (let index = 0; index < columns.length; index += 1) {
			let columnDisplay = "";
			let columnValue = "";
			if (columns[index].render) {
				const funcResult = columns[index].render(rowObjectData);
				columnDisplay = funcResult;
				columnValue = extractContent(
					ReactDOMServer.renderToString(columnDisplay)
				);
			} else {
				columnDisplay = rowObjectData[columns[index].field];
				columnValue = rowObjectData[columns[index].field];

				if (columnValue === undefined || columnDisplay === undefined) {
					const display = `Wrong column name ${columns[index].field}`;
					columnDisplay = display;
					columnValue = display;
				}
			}
			displayRow.push(columnDisplay);
			renderedRow.push(columnValue);

			if (filterList != null && filterList[index].length > 0) {
				let filter = filterList[index].toString();
				let value = columnValue === null ? "" : columnValue.toString();
				if (!caseSensitive) {
					filter = filter.toLowerCase();
					value = value.toLowerCase();
				}
				isFiltered = value.indexOf(filter) < 0 || isFiltered;
			}

			if (searchText) {
				let searchNeedle = searchText.toString();
				let searchStack =
					columnValue === null ? "" : columnValue.toString();

				if (!caseSensitive) {
					searchNeedle = searchNeedle.toLowerCase();
					searchStack = searchStack.toLowerCase();
				}

				if (searchStack.indexOf(searchNeedle) >= 0) {
					isSearchFound = true;
				}
			}
		}

		if (isFiltered || (searchText && !isSearchFound)) {
			return { displayRow: null, renderedRow: null };
		}
		return { displayRow, renderedRow };
	};

	const extractContent = s => {
		var span = document.createElement("span");
		span.innerHTML = s;
		return span.textContent || span.innerText;
	};

	const sortData = (
		data,
		column,
		sortDirection,
		groupColumn,
		groupDirection
	) => {
		const dataClone = [...data];

		const comparator = sortCompare(sortDirection, column);

		dataClone.sort((a, b) => {
			const order = comparator(a.dataObject, b.dataObject);
			if (order !== 0) return order;
			return a.dataIndex - b.dataIndex;
		});

		if (groupColumn != null) {
			const groupComparator = sortCompare(groupDirection, groupColumn);
			dataClone.sort((a, b) => {
				const groupOrder = groupComparator(a.dataObject, b.dataObject);
				return groupOrder;
			});
		}
		return dataClone;
	};

	const sortCompare = (order, column) => (a, b) => {
		let x;
		let y;
		if (a === null) x = "";
		else x = a[column.field];

		if (b === null) y = "";
		else y = b[column.field];

		if (typeof column.customSort === "function") {
			return column.customSort(a, b) * (order === "desc" ? -1 : 1);
		}
		if (column.type === "number") {
			return (x - y) * (order === "desc" ? -1 : 1);
		}
		return (x > y ? 1 : x < y ? -1 : 0) * (order === "desc" ? -1 : 1);
	};

	useEffect(() => {
		initializeTable(props);
	}, [props]);

	const handleRequestSort = (_event, index) => {
		const { columns } = states;
		let order;
		if (index === states.sortColumnIndex) {
			order = columns[index].sortDirection === "desc" ? "asc" : "desc";
		} else {
			order =
				columns[index].sortDirection === null
					? "asc"
					: columns[index].sortDirection;
		}

		const newColumns = [...states.columns];
		newColumns[index].sortDirection = order;

		const newState = {
			...states,
			displayData: sortData(
				states.displayData,
				columns[index],
				order,
				states.groupIndex != null ? columns[states.groupIndex] : null,
				states.groupDirection
			),
			columns: newColumns,
			sortColumnDirection: order,
			sortColumnIndex: index
		};
		setStates(newState);
	};

	const handleChangePage = (_event, newPage) => {
		if (onChange) {
			onChange({
				page: newPage,
				filterList: states.filterList
			});
		}
		setStates({
			...states,
			page: newPage
		});
	};

	const handleChangeRowsPerPage = event => {
		setStates({
			...states,
			rowsPerPage: parseInt(event.target.value, 10)
		});
	};

	const onSearchChange = value => {
		const newStates = {
			...states,
			searchText: value
		};
		const newDisplayData = getDisplayData(
			newStates.columns,
			newStates.data,
			newStates
		);

		setStates({
			...newStates,
			displayData: newDisplayData
		});
	};

	const onFilterChange = (value, index) => {
		const filterClone = [...states.filterList];
		filterClone[index] = value;
		const newStates = {
			...states,
			filterList: filterClone
		};
		const newDisplayData = getDisplayData(
			newStates.columns,
			newStates.data,
			newStates
		);

		if (onChange) {
			onChange({
				page: states.page,
				filterList: filterClone
			});
		}

		setStates({
			...newStates,
			displayData: newDisplayData,
			page: 0
		});
	};

	const onFilterReset = (value, index) => {
		const filterClone = [];
		states.filterList.forEach(() => {
			filterClone.push("");
		});
		const newStates = {
			...states,
			filterList: filterClone
		};
		const newDisplayData = getDisplayData(
			newStates.columns,
			newStates.data,
			newStates
		);

		// if (onChange) {
		// 	onChange({
		// 		page: states.page,
		// 		filterList: filterClone
		// 	});
		// }

		setStates({
			...newStates,
			displayData: newDisplayData,
			page: 0
		});
	};

	const freeActions = actions.filter(x => x.isFreeAction);

	const tableActions = actions.filter(x => !x.isFreeAction);

	const renderToolBar = () =>
		states.filter !== undefined && (
			<BfiTableToolbar
				actions={freeActions}
				columns={states.columns}
				title={states.title}
				searchText={states.searchText}
				search={states.search}
				filterList={states.filterList}
				filter={states.filter}
				onSearch={onSearchChange}
				onFilter={onFilterChange}
				onFilterReset={onFilterReset}
				textLabels={states.textLabels}
				data={states.displayData}
			/>
		);

	const renderPagination = () =>
		!!states.rowsPerPage && (
			<TablePagination
				component="div"
				count={
					states.displayData != null ? states.displayData.length : 0
				}
				rowsPerPageOptions={states.rowsPerPageOptions}
				rowsPerPage={states.rowsPerPage}
				labelRowsPerPage={states.textLabels.pagination.labelRowsPerPage}
				page={states.page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				ActionsComponent={BfiTablePaginationActions}
			/>
		);

	const renderTable = () => (
		<TableContainer>
			<Table
				className={classes.table}
				aria-labelledby="tableTitle"
				size="small"
				aria-label="enhanced table"
			>
				<BelTableHead
					onRequestSort={handleRequestSort}
					actions={!!tableActions.length}
					columns={states.columns}
					sortColumnIndex={states.sortColumnIndex}
					sortColumnDirection={states.sortColumnDirection}
					textLabels={states.textLabels}
				/>
				<BfiTableBody
					actions={tableActions}
					columns={states.columns}
					data={states.displayData}
					page={states.page}
					rowsPerPage={states.rowsPerPage}
					isLoading={props.isLoading}
					group={
						states.columns != null
							? states.columns[states.groupIndex]
							: null
					}
					groupHeader={states.groupHeader}
					textLabels={states.textLabels}
				/>
			</Table>
		</TableContainer>
	);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				{renderToolBar()}
				{renderTable()}
				{renderPagination()}
			</Paper>
		</div>
	);
}

BfiDataTable.defaultProps = {
	actions: [],
	options: {},
	isLoading: false,
	onChange: null
};

BfiDataTable.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func,
			isFreeAction: PropTypes.bool,
			disabled: PropTypes.bool
		})
	),
	title: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
				.isRequired,
			field: PropTypes.string.isRequired,
			render: PropTypes.func
		})
	).isRequired,
	onChange: PropTypes.func,
	data: PropTypes.array.isRequired,
	options: PropTypes.shape({
		page: PropTypes.number,
		groupIndex: PropTypes.number,
		groupHeader: PropTypes.func
	}),
	isLoading: PropTypes.bool
};
