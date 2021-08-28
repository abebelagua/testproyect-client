import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/es";
import {
	setSelectedTab,
	deleteTab,
	setIsNewTab
} from "../../../redux/reducers/homeReducer";
import tabRoutes from "../../../routes/TabRoutes";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
import TabPanel from "./TabPanel";

// Styles
import styles from "../../../assets/js/Components/tabsStyle";

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`
	};
}

const MyTabs = withStyles({
	indicator: {
		backgroundColor: "#1D90CC"
	}
})(Tabs);

const useStyles = makeStyles(styles);

const ButtonInTabs = ({ className, onClick, children }) => (
	<Button className={className} onClick={onClick}>
		{children}
	</Button>
);

/**
 * Tabs
 *
 * @component
 * @category Componentes
 * @subcategory Tabs
 *
 * @param {Props} props
 * @returns Todas las rutas de los tabs
 *
 * @since 0.0.1
 * @version 0.0.3
 * @author Andy Bebelagua de la Cruz
 */
function TabsApp({ view }) {
	const classes = useStyles();
	const history = useHistory();
	const tabs = useSelector(state => state.home.tabs);
	const selectedTab = useSelector(state => state.home.selectedTab);
	const actualPath = useSelector(state => {
		if (view !== "main") {
			return state[view].actualPath;
		} else {
			return null;
		}
	});
	const dispatch = useDispatch();
	const heigth = window.innerHeight - 264;

	const intl = useIntl();
	moment.locale(intl.formatMessage({ id: "navbar.language" }));

	useEffect(() => {
		const index = tabs.findIndex(x => x.tabRouteName === view);
		dispatch(setSelectedTab(index));
	}, [view]);

	const handleChange = (event, newValue) => {
		dispatch(setIsNewTab(false));
		const routeName = tabs[newValue].tabRouteName;
		history.push(`/home/${routeName}`);
	};

	const handleHome = () => {
		dispatch(setSelectedTab(0));
		history.push(`/home/main`);
	};

	const onClickDeleteTab = async (e, i) => {
		e.stopPropagation();
		if (selectedTab === i) {
			const componentName = tabs[i - 1].tabRouteName;
			history.push(`/home/${componentName}`);
		}
		dispatch(setSelectedTab(i - 1));
		dispatch(deleteTab(i));
	};

	const renderTab = () => {
		const routes = tabRoutes[view];
		return routes.map(route => {
			if (route.path === actualPath) return route.component(view);
		});
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				color="default"
				className={clsx(classes.appBar, {})}
			>
				<MyTabs
					className={classes.myTab}
					value={selectedTab}
					onChange={handleChange}
					aria-label="simple tabs example"
					variant="scrollable"
					scrollButtons="auto"
				>
					<ButtonInTabs
						onClick={handleHome}
						className={classes.addButton}
					>
						<HomeIcon color="primary" />
					</ButtonInTabs>
					{tabs.map((tab, i) => {
						if (i !== 0) {
							return (
								<Tab
									className={classes.tab}
									key={tab.tabRouteName}
									style={
										selectedTab === i
											? {
													backgroundColor: "#1D90CC",
													color: "#FFF"
											  }
											: null
									}
									disableRipple
									label={
										<span>
											<FormattedMessage
												id={`${tab.tabName}`}
												defaultMessage={`${tab.tabName}`}
											/>
											<IconButton
												component="div"
												className={classes.iconButton}
												style={
													selectedTab === i
														? { color: "#FFF" }
														: null
												}
												size="small"
												onClick={e =>
													onClickDeleteTab(e, i)
												}
											>
												<CloseIcon />
											</IconButton>
										</span>
									}
									{...a11yProps(i)}
								/>
							);
						}
					})}
				</MyTabs>
			</AppBar>
			<Toolbar />
			{tabs.map((tab, i) => (
				<TabPanel key={tab.tabRouteName} value={selectedTab} index={i}>
					<Scrollbars
						autoHide
						autoHeight
						autoHeightMin={heigth}
						autoHeightMax={heigth}
					>
						{renderTab()}
					</Scrollbars>
				</TabPanel>
			))}
			<Toolbar style={{ minHeight: "5px" }} />
		</div>
	);
}

TabsApp.propTypes = {
	/** Ruta de la vista */
	view: PropTypes.string.isRequired
};

export default TabsApp;
