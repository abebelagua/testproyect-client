import React, { useState } from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { ArrowForwardIos } from "@material-ui/icons";
import BfiTableCell from "./BfiTableCell";
import BfiTableRow from "./BfiTableRow";

function BfiGroupRow(props) {
	const { group, groupData, columns, actions, groupHeader } = props;

	const [expanded, setExpanded] = useState(true);

	const colSpan = columns.length;
	const hasAction = actions && actions.length > 0;

	const rotateIconStyle = isOpen => ({
		transform: isOpen ? "rotate(90deg)" : "none"
	});

	const groupIndex = columns.indexOf(group);
	const groupValue =
		groupData.length > 0 ? groupData[0].data[groupIndex] : "";

	/* eslint-disable indent */
	const details = expanded
		? groupData.map((data, index) => (
				<BfiTableRow
					actions={actions}
					columns={columns}
					rowData={data}
					key={index}
				/>
		  ))
		: undefined;
	/* eslint-enable indent */

	return (
		<>
			<TableRow>
				<BfiTableCell colSpan={hasAction ? colSpan + 1 : colSpan}>
					<IconButton
						style={{
							transition: "all ease 200ms",
							...rotateIconStyle(expanded)
						}}
						onClick={() => {
							setExpanded(pValue => !pValue);
						}}
					>
						<ArrowForwardIos />
					</IconButton>
					{typeof groupHeader === "function" ? (
						groupHeader(groupValue, groupData.length)
					) : (
						<b>
							{group.title}
							{` : `}
							{group.render
								? columns.render(groupValue)
								: groupValue}
							{` (${groupData.length})`}
						</b>
					)}
				</BfiTableCell>
			</TableRow>
			{details}
		</>
	);
}

BfiGroupRow.defaultProps = {
	actions: []
};

BfiGroupRow.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
				.isRequired,
			field: PropTypes.string.isRequired,
			render: PropTypes.func
		})
	).isRequired,
	groupData: PropTypes.array.isRequired,
	group: PropTypes.string.isRequired,
	groupHeader: PropTypes.func,
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func,
			isFreeAction: PropTypes.bool,
			disabled: PropTypes.bool
		})
	)
};

export default BfiGroupRow;
