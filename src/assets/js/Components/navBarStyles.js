import { whiteColor, blueColor } from "../AppStyle";

const NavbarStyle = theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		backgroundColor: blueColor[0],
		color: whiteColor
	},
	grow: {
		flexGrow: 1
	},
	button: {
		backgroundColor: blueColor[0],
		color: whiteColor,
		fontWeight: "bold",
		marginLeft: "8px"
	},
	buttonLanguageMobile: {
		backgroundColor: whiteColor,
		color: blueColor[0],
		fontWeight: "bold",
		marginLeft: "8px"
	},
	iconButton: {
		marginLeft: "8px"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	img: {
		height: "50px",
		width: "200px"
	},
	imgMobile: {
		height: "50px",
		width: "200px",
		marginLeft: "10px"
	},
	iconPoper: {
		color: blueColor[0]
	},
	avatar: {
		marginLeft: theme.spacing(2)
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	}
});

export default NavbarStyle;
