import React from "react";
import PropTypes from "prop-types";
import { IconButton as MuiIconButton, Tooltip, Zoom } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export default function IconButton({
	tooltipId,
	icon,
	onClick,
	color,
	...others
}) {
	return (
		<Tooltip
			title={<FormattedMessage id={tooltipId} />}
			arrow
			interactive
			TransitionComponent={Zoom}
		>
			<MuiIconButton onClick={onClick} color={color} {...others}>
				{icon}
			</MuiIconButton>
		</Tooltip>
	);
}

IconButton.propTypes = {
	tooltipId: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	color: PropTypes.string
};

IconButton.defaultProps = {
	color: "primary"
};
