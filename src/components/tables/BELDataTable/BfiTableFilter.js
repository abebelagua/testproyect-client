import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	Grid,
	Input,
	InputLabel
} from "@material-ui/core";

const defaultFilterStyles = makeStyles(theme => ({
	root: {
		width: "450px"
	},
	title: {
		display: "inline-block",
		marginLeft: "7px",
		fontSize: "14px",
		fontWeight: 500
	},

	resetLink: {
		color: "#00519e",
		marginLeft: "24px",
		fontSize: "15px",
		backgroundColor: "#FF	F",
		cursor: "pointer",
		border: "none",
		"&:hover": {
			color: "#FF0000"
		}
	},

	filtersSelected: {
		alignSelf: "right"
	},
	selectFormControl: {
		minWidth: 70
	}
}));

export default function BfiTableFilter(props) {
	const {
		columns,
		filterList,
		onFilterUpdate,
		onFilterReset,
		textLabels
	} = props;
	const classes = defaultFilterStyles();

	const handleChange = (event, column) => {
		onFilterUpdate(event.target.value, column);
	};

	const handleDropdownChange = (event, column) => {
		const value = event.target.value === "All" ? "" : event.target.value;
		onFilterUpdate(value, column);
	};

	const renderFilters = c => (
		<Grid container spacing={1}>
			{c.map((column, index) => (
				<Grid item md={6}>
					<FormControl
						key={column.field}
						className={classes.selectFormControl}
					>
						<InputLabel htmlFor={column.field}>
							{column.title}
						</InputLabel>
						<Input
							value={filterList[index]}
							onChange={e => {
								handleChange(e, index);
							}}
						/>
					</FormControl>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Card className={classes.root}>
			<CardHeader
				title={
					<>
						{textLabels.title}
						<Button
							className={classes.resetLink}
							onClick={onFilterReset}
						>
							{textLabels.btnRestart}
						</Button>
					</>
				}
			/>
			<CardContent>{renderFilters(columns)}</CardContent>
		</Card>
	);
}

BfiTableFilter.propTypes = {
	filterList: PropTypes.array.isRequired,
	onFilterUpdate: PropTypes.func.isRequired,
	onFilterReset: PropTypes.func.isRequired,
	textLabels: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
				.isRequired,
			field: PropTypes.string.isRequired,
			render: PropTypes.func,
			filterType: PropTypes.oneOf(["text", "select", "date"])
		})
	).isRequired
};
