import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import Hidden from "@material-ui/core/Hidden";

// Images and icons
import { Menu } from "@material-ui/icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LanguageSelector from "../navbar/LanguageSelector";
import TreeView from "../treeView/TreeView";
import { useSelector, useDispatch } from "react-redux";
import {
	setDrawerMenu,
	setMenuOpen,
	setDrawerOpen
} from "../../../redux/reducers/homeReducer";
import { getSideBarMenu } from "../../../services/HomeService";
import { notifyError } from "../../../utils/notify";

// Styles
import styles from "../../../assets/js/Components/sideBarStyles";

const useStyles = makeStyles(styles);

export default function SideBar(props) {
	const classes = useStyles();
	const drawerMenu = useSelector(state => state.home.drawerMenu);
	const isDrawerOpen = useSelector(state => state.home.isDrawerOpen);
	const dispatch = useDispatch();

	const handleClick = i => {
		dispatch(setMenuOpen({ index: i, value: !drawerMenu[i].isOpen }));
	};

	const handleDrawerToggle = () => {
		dispatch(setDrawerOpen(!isDrawerOpen));
	};

	useEffect(() => {
		// TODO Pedir menu al backend
		// const fetchMenu = async () => {
		// 	const res = await getSideBarMenu();
		// 	if (!res.server_error && res.success) {
		// 		dispatch(setDrawerMenu(res.data));
		// 	} else {
		// 		notifyError(<FormattedMessage id="msg.error.dataServer" />);
		// 	}
		// };
		// fetchMenu();

		const menu = [
			{
				name: "Management",
				id: "management",
				items: [
					{
						name: "Groups",
						id: "groups",
						items: [],
						leaf: 1
					},
					{
						name: "Students",
						id: "students",
						items: [],
						leaf: 1
					}
				]
			}
		];
		dispatch(setDrawerMenu(menu));
	}, []);

	const renderMenu = (
		<List>
			{drawerMenu.map((dm, i) => (
				<React.Fragment key={dm.menu.name + "_frag"}>
					<>
						<ListItem
							button
							key={dm.menu.name}
							onClick={() => handleClick(i)}
						>
							<ListItemText
								primary={
									<FormattedMessage
										id={`sidebar.${dm.menu.id}`}
										defaultMessage={dm.menu.name}
									/>
								}
							/>
							{drawerMenu[i].isOpen ? (
								<ExpandLess color="primary" />
							) : (
								<ExpandMore color="primary" />
							)}
						</ListItem>
						<Collapse
							in={drawerMenu[i].isOpen}
							timeout="auto"
							unmountOnExit
						>
							<TreeView
								tree={dm.menu.items}
								isMobile={props.isMobile}
								handleDrawerToggle={handleDrawerToggle}
							/>
						</Collapse>
					</>
				</React.Fragment>
			))}
		</List>
	);

	return (
		<>
			<Hidden smDown>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: true
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: true
						})
					}}
					PaperProps={{ id: "drawer-paper" }}
				>
					<Toolbar />
					<div className={classes.drawerContainerOpen}>
						<div className={classes.toolbar}>
							<Typography variant="h6" className={classes.title}>
								<FormattedMessage
									id="sidebar.menu"
									defaultMessage="Menu principal"
								/>
							</Typography>
						</div>
						<Divider />
						{renderMenu}
					</div>
					<Toolbar style={{ minHeight: "36px" }} />
				</Drawer>
			</Hidden>
			<Hidden mdUp>
				<Drawer
					variant="temporary"
					anchor="left"
					open={isDrawerOpen}
					classes={{
						paper: classNames(classes.drawerPaper)
					}}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
				>
					<div className={classes.sidebarWrapper}>
						<Typography variant="h6" className={classes.title}>
							<FormattedMessage
								id="sidebar.menu"
								defaultMessage="Menu principal"
							/>
						</Typography>
						<Divider variant="middle" />
						<div className={classes.sidebarNavbarLinks}>
							<LanguageSelector />
						</div>
						<Divider variant="middle" />
						{renderMenu}
					</div>
				</Drawer>
			</Hidden>
		</>
	);
}

SideBar.propTypes = {
	isMobile: PropTypes.bool.isRequired
};
