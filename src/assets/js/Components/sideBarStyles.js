import { boxShadow } from "../AppStyle";

const drawerWidth = "260px";

const SideBarStyles = theme => ({
	title: {
		padding: theme.spacing(2)
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap"
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(5) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(7) + 1
		}
	},
	drawerContainerOpen: {
		height: "100%",
		overflowX: "hidden",
		overflowY: "auto"
	},
	drawerContainerClose: {
		overflowX: "hidden",
		overflowY: "auto"
	},
	drawerPaper: {
		border: "none",
		position: "fixed",
		top: "0",
		bottom: "0",
		left: "0",
		zIndex: "1",
		...boxShadow
	},
	sidebarWrapper: {
		position: "relative",
		height: "calc(100vh - 75px)",
		overflow: "auto",
		width: "240px",
		zIndex: "4",
		overflowScrolling: "touch"
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: theme.spacing(0, 0.5),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	sidebarNavbarLinks: {
		marginTop: "10px",
		marginBottom: "10px",
		marginLeft: "8px"
	}
});

export default SideBarStyles;
