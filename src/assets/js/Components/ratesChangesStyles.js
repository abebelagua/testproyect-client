const SideBarStyles = theme => ({
	sidePanel: {
		right: "0px",
		backgroundColor: "#fff",
		zIndex: "1200",
		position: "fixed",
		top: "64px",
		bottom: 0,
		height: "calc(var(--vh, 1vh) * 100)",
		transition: "right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99)",
		backfaceVisibility: "hidden",
		boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)"
	},
	toggle: {
		position: "absolute",
		top: "30%",
		width: "54px",
		height: "80px",
		textAlign: "center",
		lineHeight: "110px",
		cursor: "pointer",
		backgroundColor: "#fff",
		borderLeft: "3px solid #00519e",
		zIndex: 1,
		display: "block",
		boxShadow: "-3px 0 8px rgba(0, 0, 0, 0.1)",
		left: "-54px",
		borderRadius: "80px 0px 0px 80px"
	},
	card: {
		marginBottom: "40px",
		borderRadius: "0px",
		border: "none",
		width: "35vw",
		maxWidth: "35vw",
		backgroundColor: "transparent"
	},
	cardBody: {
		padding: "0px",
		margin: "5px"
	},
	cardHeader: {
		borderBottom: "0px",
		color: "#00519e",
		backgroundColor: "#27a3da"
	},

	cardFooter: {
		backgroundColor: "#00519e",
		color: "#fff"
	},

	cardGray: {
		backgroundColor: "#f8f8f8"
	},
	popper: {
		zIndex: 1000
	}
});

export default SideBarStyles;
