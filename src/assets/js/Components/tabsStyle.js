import { whiteColor } from "../AppStyle";

const tabPanelStyles = theme => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		height: "64px"
	},
	appBar: {
		top: "auto",
		right: "auto",
		height: "64px",
		backgroundColor: whiteColor
	},
	addButton: {
		color: "white"
	},
	tab: {
		textTransform: "none",
		minWidth: "60px",
		maxWidth: "500px"
		// height: '64px'
	},
	myTab: {
		margin: "8px"
	},
	iconButton: {
		marginLeft: theme.spacing(1)
	}
});

export default tabPanelStyles;
