import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "../../../assets/js/Components/footerStyles";

const useStyles = makeStyles(styles);

export default function Footer({ isMobile }) {
	const classes = useStyles();

	return (
		<AppBar
			position="fixed"
			color="primary"
			className={clsx(classes.appBar, {})}
		>
			<Toolbar>
				<Typography
					variant="body1"
					color="inherit"
					style={
						isMobile ? { fontSize: "14px" } : { fontSize: "18px" }
					}
				>
					© 2021 Proyecto de Ejemplo React + Nest + MongoDB
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
