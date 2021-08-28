import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableSortLabel } from "@material-ui/core";
import BfiTableCell from "./BfiTableCell";

const useStyles = makeStyles(theme => ({
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	}
}));
const BfiTableSortLabel = withStyles(theme => ({
	root: {
		fontFamily: "Lucida Sans",
		fontSize: "15px",
		color: "#ffffff",
		"&:hover": {
			color: "#ffffff",
			textDecoration: "underline",
			"& $icon": {
				color: "#ffffff"
			}
		},
		"&$active": {
			color: "#ffffff"
		}
	},

	active: {},
	icon: {
		color: "inherit !important"
	}
}))(TableSortLabel);

export default function BelTableHead(props) {
	const {
		sortColumnDirection,
		sortColumnIndex,
		columns,
		onRequestSort,
		actions,
		textLabels
	} = props;

	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	const classes = useStyles();
	const displayColumns = columns.filter(x => x.display === "true");
	const freeCell = columns.length - displayColumns.length;

	return (
		<TableHead>
			<TableRow>
				{freeCell > 0 && (
					<BfiTableCell key="freeHeadCell" colSpan={freeCell} />
				)}
				{columns.map((column, i) => {
					const sortLabelProps = {
						active: sortColumnIndex === i,
						...(column.sortDirection
							? { direction: column.sortDirection }
							: {})
					};
					return (
						column.display === "true" && (
							<BfiTableCell
								key={column.field}
								align="left"
								padding={
									column.disablePadding ? "none" : "default"
								}
								sortDirection={
									sortColumnIndex === i
										? sortColumnDirection
										: false
								}
							>
								<BfiTableSortLabel
									{...sortLabelProps}
									onClick={createSortHandler(i)}
								>
									{column.title}
									{sortColumnIndex === i ? (
										<span
											className={classes.visuallyHidden}
										>
											{sortColumnDirection === "desc"
												? "sorted descending"
												: "sorted ascending"}
										</span>
									) : null}
								</BfiTableSortLabel>
							</BfiTableCell>
						)
					);
				})}
				{actions && <BfiTableCell key="action_cell" align="center" />}
			</TableRow>
		</TableHead>
	);
}

BelTableHead.defaultProps = {
	actions: false,
	columns: [],
	sortColumnOrder: null,
	sortColumnIndex: null
};

BelTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	sortColumnOrder: PropTypes.oneOf(["asc", "desc"]),
	sortColumnIndex: PropTypes.number,
	columns: PropTypes.array.isRequired,
	actions: PropTypes.bool
};
