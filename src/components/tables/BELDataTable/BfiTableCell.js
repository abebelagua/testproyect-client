import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const BfiTableCell = withStyles(() => ({
	head: {
		backgroundColor: "#00519e"
	},
	body: {
		fontSize: 12
	},
	sizeSmall: {
		padding: "0 16px"
	}
}))(TableCell);

export default BfiTableCell;
