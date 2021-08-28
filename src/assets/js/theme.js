import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#3f51b5"
		},
		secondary: {
			main: "#7c4dff"
		}
	},
	shape: {
		borderRadius: 4
	},
	overrides: {
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: "#455a64",
				color: "#fff"
			}
		},
		MuiSwitch: {
			root: {
				width: 42,
				height: 26,
				padding: 0,
				margin: 8
			},
			switchBase: {
				padding: 1,
				"&$checked, &$colorPrimary&checked, &$colorSecondary&checked": {
					transform: "translateX(16px)",
					color: "#fff",
					"& + $track": {
						opacity: 1,
						border: "none"
					}
				}
			},
			thumb: {
				width: 24,
				height: 24
			},
			track: {
				borderRadius: 13,
				border: "1px solid #bdbdbd",
				backgroundColor: "#fafafa",
				opacity: 1,
				transition:
					"background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
			}
		}
	},
	props: {
		MuiAppBar: {
			color: "inherit"
		},
		MuiTooltip: {
			arrow: true
		}
	}
});

export default theme;
