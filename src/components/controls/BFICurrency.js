import React from "react";
import PropTypes from "prop-types";

export default function BFICurrency({ value, fixed }) {
	const val = Number.parseFloat(value || "0");
	return (
		<span style={{ color: val < 0 ? "red" : "green" }}>
			{/* -- separando los miles por , --*/}
			${val.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
		</span>
	);
}

BFICurrency.defaultProps = {
	value: "0",
	fixed: 2
};

BFICurrency.propTypes = {
	value: PropTypes.string,
	fixed: PropTypes.number
};
/* ${val.toFixed(fixed)}*/