//#region Imports
import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

//#endregion

//#region Styles
const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(0.5)
	},
	label: {
		textTransform: "none"
	}
}));
//#endregion

//#region Component
export default function ButtonWithoutId({
	size,
	color,
	variant,
	onClick,
	...other
}) {
	const classes = useStyles();

	return (
		<MuiButton
			variant={variant}
			size={size}
			color={color}
			onClick={onClick}
			{...other}
			classes={{ root: classes.root, label: classes.label }}
		/>
	);
}
//#endregion

//#region PropTypes
ButtonWithoutId.propTypes = {
	size: PropTypes.oneOf(["large", "medium", "small"]),
	color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
	variant: PropTypes.oneOf(["contained", "outlined", "text"]),
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

ButtonWithoutId.defaultProps = {
	size: "small",
	color: "primary",
	variant: "contained",
	disabled: false
};
//#endregion
