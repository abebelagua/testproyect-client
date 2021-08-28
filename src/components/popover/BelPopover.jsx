import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Tooltip, Popover } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	icon: {
		"&:hover": {
			color: "#00519e"
		}
	},
	iconActive: {
		color: "#00519e"
	}
}));

function BelPopover(props) {
	const classes = useStyles();

	const { title, icon, children } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const renderTarget = () => (
		<IconButton
			aria-label={title}
			classes={{
				root: open ? classes.iconActive : classes.icon
			}}
			onClick={handleClick}
		>
			<Tooltip title={title}>{icon}</Tooltip>
		</IconButton>
	);
	const renderContent = () => (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
		>
			{children}
		</Popover>
	);
	return (
		<div className={classes.root}>
			{renderTarget()}
			{renderContent()}
		</div>
	);
}

BelPopover.propTypes = {
	icon: PropTypes.element.isRequired,
	title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

export default BelPopover;
