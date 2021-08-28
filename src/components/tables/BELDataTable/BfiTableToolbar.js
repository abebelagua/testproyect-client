import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FilterList } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SearchField from "./SearchFiled";
import BelPopover from "../../popover/BelPopover";
import BfiTableFilter from "./BfiTableFilter";

const useStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	title: {
		flex: "1 1 100%"
	}
}));

export default function BfiTableToolbar(props) {
	const classes = useStyles();
	const filterTable = "Filtros";
	const {
		actions,
		columns,
		title,
		search,
		searchText,
		onSearch,
		filter,
		filterList,
		onFilter,
		onFilterReset,
		textLabels,
		data
	} = props;

	const renderSearch = () =>
		search && (
			<SearchField
				onChange={onSearch}
				value={searchText}
				{...(textLabels && {
					placeholder: textLabels.toolbar.searchPlaceholder
				})}
			/>
		);

	const renderActions = () =>
		actions.map((value, index) => (
			<Tooltip title={value.tooltip} key={index}>
				<IconButton
					aria-label={value.tooltip}
					onClick={() => value.onClick(columns, data)}
				>
					{value.icon}
				</IconButton>
			</Tooltip>
		));

	const renderFilter = () =>
		filter && (
			<BelPopover title={filterTable} icon={<FilterList />}>
				<BfiTableFilter
					columns={columns}
					filterList={filterList}
					onFilterUpdate={onFilter}
					onFilterReset={onFilterReset}
					textLabels={textLabels.filters}
				/>
			</BelPopover>
		);

	const renderTitle = () => (
		<Typography
			className={classes.title}
			variant="h6"
			id="tableTitle"
			component="div"
		>
			{title}
		</Typography>
	);

	return (
		<Toolbar className={classes.root}>
			{renderTitle()}
			{renderFilter()}
			{renderSearch()}
			{renderActions()}
		</Toolbar>
	);
}

BfiTableToolbar.defaultProps = {
	actions: [],
	title: "",
	searchText: ""
};

BfiTableToolbar.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func
		})
	),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	searchText: PropTypes.string,
	onSearch: PropTypes.func.isRequired,
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
