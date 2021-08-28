import React from "react";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";

import BfiGroupRow from "./BfiGroupRow";
import BfiTableRow from "./BfiTableRow";
import BfiLoadingRow from "./BfiLoadingRow";

function BfiTableBody(props) {
	const {
		columns,
		data,
		actions,
		page,
		rowsPerPage,
		group,
		groupHeader,
		isLoading,
		textLabels
	} = props;

	const renderUnGroupRow = () => {
		const renderData = data
			.filter(x => x.data != null)
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
		return renderData.map((row, index) => (
			<BfiTableRow
				actions={actions}
				rowData={row}
				columns={columns}
				key={`${index}`}
			/>
		));
	};

	const renderGroupData = () => {
		const renderData = data
			.filter(x => x.data != null)
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

		const groups = [];
		renderData.forEach(x => {
			if (
				groups.length === 0 ||
				groups[groups.length - 1] !== x.dataObject[group.field]
			)
				groups.push(x.dataObject[group.field]);
		});

		return groups.map(e => {
			const groupData = renderData.filter(
				x => x.dataObject[group.field] === e
			);
			return (
				<BfiGroupRow
					group={group}
					groupData={groupData}
					columns={columns}
					actions={actions}
					key={`${e}`}
					groupHeader={groupHeader}
				/>
			);
		});
	};

	if (isLoading) {
		return (
			<BfiLoadingRow
				columns={columns}
				actions={actions}
				key="loadingRow"
				text={textLabels && textLabels.loading}
			/>
		);
	}
	if (data.length === 0) {
		return (
			<BfiTableRow columns={columns} actions={actions} key="emptyRow" />
		);
	}
	return (
		<TableBody>
			{group !== null ? renderGroupData() : renderUnGroupRow()}
		</TableBody>
	);
}

export default BfiTableBody;

BfiTableBody.defaultProps = {
	actions: [],
	columns: [],
	data: [],
	page: 0,
	rowsPerPage: 10,
	group: null
};

BfiTableBody.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func,
			isFreeAction: PropTypes.bool,
			disabled: PropTypes.bool
		})
	),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
				.isRequired,
			field: PropTypes.string.isRequired,
			render: PropTypes.func
		})
	),
	data: PropTypes.array,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	group: PropTypes.number
};
