//#region Imports
import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { FormattedMessage } from "react-intl";
import {
	AddBox,
	ArrowDownward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FirstPage,
	LastPage,
	Remove,
	Search,
	ViewColumn,
	PictureAsPdf
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";
//#endregion

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <PictureAsPdf {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => (
		<ArrowDownward {...props} ref={ref} />
	)),
	ThirdStateCheck: forwardRef((props, ref) => (
		<Remove {...props} ref={ref} />
	)),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function BELTable({
	title,
	columns,
	data,
	actions,
	options,
	...other
}) {
	return (
		<MaterialTable
			icons={tableIcons}
			columns={columns}
			data={data}
			title={title}
			actions={[...actions]}
			options={{
				headerStyle: {
					backgroundColor: "#00519e",
					fontFamily: "Lucida Sans",
					fontSize: "15px",
					color: "#ffffff"
				},
				actionsColumnIndex: -1,
				search: true,
				searchAutoFocus: true,
				filtering: true,
				grouping: false,
				draggable: false,
				pageSizeOptions: [10, 20, 30],
				pageSize: 10,
				...options
			}}
			localization={{
				body: {
					emptyDataSourceMessage: "No se encuentran resultados",
					filterRow: {
						filterPlaceHolder: "Filtrar",
						filterTooltip: (
							<FormattedMessage id="beltable.filterTooltip" />
						)
					}
				},
				pagination: {
					labelDisplayedRows: "{from}-{to} de {count}",
					labelRowsSelect: "elementos",
					labelRowsPerPage: "elementos por página:",
					firstAriaLabel: (
						<FormattedMessage id="beltable.firstTooltip" />
					),
					firstTooltip: (
						<FormattedMessage id="beltable.firstTooltip" />
					),
					previousAriaLabel: "Página Anterior",
					previousTooltip: (
						<FormattedMessage id="beltable.previousTooltip" />
					),
					nextAriaLabel: "Página Siguiente",
					nextTooltip: <FormattedMessage id="beltable.nextTooltip" />,
					lastAriaLabel: "Última Página",
					lastTooltip: <FormattedMessage id="beltable.lastTooltip" />
				},
				toolbar: {
					searchTooltip: (
						<FormattedMessage id="beltable.searchTooltip" />
					),
					searchPlaceholder: "Buscar..."
				},
				header: {
					actions: ""
				}
			}}
			{...other}
		/>
	);
}

BELTable.defaultProps = {
	options: {},
	data: {}
};

BELTable.propTypes = {
	title: PropTypes.string.isRequired,
	columns: PropTypes.array.isRequired,
	data: PropTypes.array,
	actions: PropTypes.array.isRequired,
	options: PropTypes.object
};
