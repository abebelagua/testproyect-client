import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export default function Checkbox({
	name,
	checked,
	onChange,
	labelPlacement,
	labelId,
	...others
}) {
	return (
		<FormControlLabel
			control={
				<MuiCheckbox
					checked={checked}
					onChange={onChange && onChange}
					name={name}
					color="primary"
					{...others}
				/>
			}
			label={<FormattedMessage id={labelId} />}
			labelPlacement={labelPlacement}
		/>
	);
}

Checkbox.propTypes = {
	checked: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	labelPlacement: PropTypes.oneOf(["bottom", "end", "start", "top"]),
	labelId: PropTypes.string.isRequired
};

Checkbox.defaultProps = {
	labelPlacement: "end",
	onChange: null
};
