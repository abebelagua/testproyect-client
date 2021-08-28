import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography as MuiTypography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export default function Typography({ textId, ...others }) {
	return (
		<>
			<MuiTypography {...others}>
				<FormattedMessage id={textId} />
			</MuiTypography>
		</>
	);
}

Typography.propTypes = {
	textId: PropTypes.string.isRequired
};

Typography.defaultProps = {};
