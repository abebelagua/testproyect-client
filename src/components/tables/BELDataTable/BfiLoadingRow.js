import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { FormattedMessage } from "react-intl";
import { makeStyles, TableRow, Typography } from "@material-ui/core";
import BfiTableCell from "./BfiTableCell";

const useStyles = makeStyles(theme => ({
	loadingCenter: {
		marginLeft: "auto",
		marginRight: "auto"
	}
}));
export default function BfiLoadingRow(props) {
	const { actions, columns, text } = props;
	const classes = useStyles();
	return (
		<TableRow tabIndex={-1}>
			<BfiTableCell
				align="center"
				key="freeCell"
				colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
			>
				<Typography paragraph>
					<ReactLoading
						className={classes.loadingCenter}
						height={50}
						width={50}
						color="#00519e"
						type="spinningBubbles"
					/>
					{text}
				</Typography>
			</BfiTableCell>
		</TableRow>
	);
}

BfiLoadingRow.defaultProps = {
	actions: [],
	columns: []
};

BfiLoadingRow.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			onClick: PropTypes.func,
			isFreeAction: PropTypes.bool,
			disabled: PropTypes.bool
		})
	),
	columns: PropTypes.array
};
