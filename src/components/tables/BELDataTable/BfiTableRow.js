import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { TableRow } from "@material-ui/core";
import BfiTableCell from "./BfiTableCell";
import { isFunction } from "formik";

export default function BfiTableRow(props) {
	const { actions, rowData, columns } = props;

	const displayColumns = columns.filter(x => x.display === "true");
	const freeCell = columns.length - displayColumns.length;

	const renderRow = () => (
		<>
			{freeCell > 0 && (
				<BfiTableCell
					key="freeCell"
					colSpan={freeCell}
					padding="none"
				/>
			)}

			{rowData.data.map(
				(row, cIndex) =>
					columns[cIndex].display === "true" && (
						<BfiTableCell
							key={`bel-table-cell-${cIndex}`}
							align="left"
						>
							{row}
						</BfiTableCell>
					)
			)}
			{actions.length && (
				<BfiTableCell key="bel-table-cell-action" align="center">
					{actions.map((a, i) => (
						<Tooltip title={a.tooltip} key={i}>
							<span>
								<IconButton
									color="inherit"
									size="small"
									disabled={
										typeof a.disabled === "function"
											? a.disabled(rowData.dataObject)
											: a.disabled
									}
									onClick={e => {
										a.onClick(e, rowData.dataObject);
									}}
								>
									{a.icon}
								</IconButton>
							</span>
						</Tooltip>
					))}
				</BfiTableCell>
			)}
		</>
	);
	const renderEmptyRow = () => (
		<BfiTableCell
			key="freeCell"
			colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
			align="center"
		>
			No hay datos
		</BfiTableCell>
	);

	return (
		<TableRow hover tabIndex={-1}>
			{rowData.data && rowData.data.length > 0
				? renderRow()
				: renderEmptyRow()}
		</TableRow>
	);
}

BfiTableRow.defaultProps = {
	actions: [],
	rowData: {},
	columns: []
};

BfiTableRow.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func,
			isFreeAction: PropTypes.bool,
			disabled: PropTypes.bool
		})
	),
	rowData: PropTypes.object,
	columns: PropTypes.array
};
