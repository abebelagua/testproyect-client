//#region Imports
import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
//#endregion

//#region Styles
const useStyles = makeStyles(theme => ({
	label: {
		textTransform: "none"
	}
}));
//#endregion

//#region Component
function Button({ textId, size, color, variant, onClick, ...other }) {
	const classes = useStyles();

	return (
		<MuiButton
			variant={variant}
			size={size}
			color={color}
			onClick={onClick}
			{...other}
			classes={{ root: classes.root, label: classes.label }}
		>
			<FormattedMessage id={textId} />
		</MuiButton>
	);
}
//#endregion

//#region PropTypes
Button.propTypes = {
	textId: PropTypes.string.isRequired,
	size: PropTypes.oneOf(["large", "medium", "small"]),
	color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
	variant: PropTypes.oneOf(["contained", "outlined", "text"]),
	onClick: PropTypes.func,
	disabled: PropTypes.bool
};

Button.defaultProps = {
	size: "medium",
	color: "primary",
	variant: "contained",
	disabled: false,
	onClick: () => null
};
//#endregion

export default Button;
