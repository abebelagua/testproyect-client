import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import { Menu } from "@material-ui/icons";
import LanguageSelector from "./LanguageSelector";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setDrawerOpen } from "../../../redux/reducers/homeReducer";
import "moment/locale/es";

// Styles
import styles from "../../../assets/js/Components/navBarStyles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Navbar() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const intl = useIntl();
	const isDrawerOpen = useSelector(state => state.home.isDrawerOpen);
	moment.locale(intl.formatMessage({ id: "navbar.language" }));

	const handleDrawerToggle = () => {
		dispatch(setDrawerOpen(!isDrawerOpen));
	};

	return (
		<>
			<AppBar position="fixed" className={clsx(classes.appBar, {})}>
				<Toolbar>
					<div>
						<Hidden mdUp>
							<IconButton
								style={{ marginLeft: "-8px" }}
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
							>
								<Menu />
							</IconButton>
						</Hidden>
					</div>
					<div style={{ marginLeft: 10 }}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end"
							}}
						>
							<Typography variant="h6" className={classes.title}>
								<FormattedMessage
									id="navbar.welcome"
									defaultMessage="Administración de la Universidad"
								/>
							</Typography>
						</div>
					</div>
					<div className={classes.grow} />
					<Hidden smDown>
						<LanguageSelector />
					</Hidden>
				</Toolbar>
			</AppBar>
		</>
	);
}
