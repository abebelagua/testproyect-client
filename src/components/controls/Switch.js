import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch as MuiSwitch } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	switchBase: {
		color: theme.palette.primary.main,
		"&$checked": {
			color: theme.palette.primary.main
		},
		"&$checked + $track": {
			backgroundColor: theme.palette.primary.main,
			opacity: 0.8
		}
	},
	checked: {},
	track: {}
}));

export default function Switch({
	name,
	checked,
	onChange,
	labelPlacement,
	labelId,
	...others
}) {
	const classes = useStyles();

	return (
		<FormControlLabel
			control={
				<MuiSwitch
					color="primary"
					checked={checked}
					onChange={onChange}
					name={name}
					classes={{ ...classes }}
					{...others}
				/>
			}
			label={<FormattedMessage id={labelId} />}
			labelPlacement={labelPlacement}
		/>
	);
}

Switch.propTypes = {
	checked: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	labelPlacement: PropTypes.oneOf(["bottom", "end", "start", "top"]),
	labelId: PropTypes.string.isRequired
};

Switch.defaultProps = {
	labelPlacement: "end"
};
