import React from "react";
import PropTypes from "prop-types";
import { Avatar, Chip } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export default function UserChip({ user, onClick, color, variant, ...others }) {
	const handleClick = event => {
		onClick(event, user);
	};

	return (
		<Chip
			avatar={
				<Avatar>
					<AccountCircle />
				</Avatar>
			}
			color={color}
			variant={variant}
			label={user}
			onClick={handleClick}
			{...others}
		/>
	);
}

UserChip.propTypes = {
	user: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	color: PropTypes.string,
	variant: PropTypes.string
};

UserChip.defaultProps = {
	color: "primary",
	variant: "outlined"
};
