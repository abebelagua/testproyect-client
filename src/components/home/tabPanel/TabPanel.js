import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

export default function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...other}
		>
			{value === index && (
				<Box style={{ padding: "0 16px" }}>{children}</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};
