//#region Imports
import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
//#endregion

//#region Component
/**
 * Caja de texto basada en material-ui
 *
 * @component
 * @category Componentes
 * @subcategory Controles
 *
 * @param {string} [size="small"]
 * @param {string} labelId
 * @param {string} name
 * @param {(string|number|Object)} [value=null]
 * @param {string} [variant="outlined"]
 * @param {string} [margin="normal"]
 * @param {Object} [errorId=null]
 * @param {*} [other]
 *
 * @returns TextField
 *
 * @example
 * return (
 * 	<Input labelId="general.appname" name="input-1"/>
 * )
 */
const Input = React.forwardRef(
	(
		{ size, labelId, name, value, variant, margin, errorId, ...other },
		ref
	) => (
		<TextField
			fullWidth
			size={size}
			label={<FormattedMessage id={labelId} />}
			name={name}
			variant={variant}
			margin={margin}
			ref={ref}
			{...(value && { value })}
			{...(errorId && {
				error: true,
				helperText: <FormattedMessage id={errorId} />
			})}
			{...other}
		/>
	)
);
//#endregion

//#region PropTypes
Input.defaultProps = {
	size: "small",
	value: null,
	variant: "outlined",
	margin: "normal",
	errorId: null
};

Input.propTypes = {
	size: PropTypes.oneOf(["large", "medium", "small"]),
	labelId: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.any,
	variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
	margin: PropTypes.oneOf(["dense", "none", "normal"]),
	errorId: PropTypes.node
};
//#endregion

export default Input;
