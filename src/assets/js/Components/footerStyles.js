import { whiteColor, blueColor } from "../AppStyle";

const FooterStyle = theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		backgroundColor: blueColor[0],
		color: whiteColor,
		bottom: "0px",
		top: "auto",
		alignItems: "center",
		height: "36px",
		justifyContent: "center"
	},
	img: {
		height: "50px",
		width: "170px"
	}
});

export default FooterStyle;
