//#region Imports
import React from "react";
import PropTypes from "prop-types";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	makeStyles,
	Typography
} from "@material-ui/core";
import { Info, Error, Help, Warning } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import Controls from "../controls/Controls";
import { Scrollbars } from "react-custom-scrollbars";
//#endregion

//#region Styles
const useStyles = makeStyles(theme => ({
	//#region Main
	dialog: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(6)
	},
	dialogTitle: {
		textAlign: "center"
	},
	dialogContent: {
		textAlign: "center"
	},
	dialogAction: {
		justifyContent: "center"
	},
	//#endregion

	//#region ConfirmDialog
	confirmDialogContent: {
		textAlign: "center"
	},
	confirmDialogAction: {
		justifyContent: "center"
	},
	confirmDialogTitleIcon: {
		backgroundColor: theme.palette.error.main,
		color: "#fff",
		"&:hover": {
			backgroundColor: theme.palette.error.main,
			color: "#fff"
		},
		"& .MuiSvgIcon-root": {
			fontSize: "2em"
		}
	},
	//#endregion

	//#region AlertDialog
	alertDialogContent: {
		textAlign: "center"
	},
	alertDialogAction: {
		justifyContent: "center"
	},
	// fix corregir bien los colores, sobre todo el de warning
	alertDialogTitleIconInfo: {
		backgroundColor: theme.palette.success.main,
		color: "#fff",
		"&:hover": {
			backgroundColor: theme.palette.success.main,
			color: "#fff"
		},
		"& .MuiSvgIcon-root": {
			fontSize: "2em"
		}
	},
	alertDialogTitleIconError: {
		backgroundColor: theme.palette.error.main,
		color: "#fff",
		"&:hover": {
			backgroundColor: theme.palette.error.main,
			color: "#fff"
		},
		"& .MuiSvgIcon-root": {
			fontSize: "2em"
		}
	},
	alertDialogTitleIconWarning: {
		backgroundColor: theme.palette.secondary.main,
		color: "#fff",
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
			color: "#fff"
		},
		"& .MuiSvgIcon-root": {
			fontSize: "2em"
		}
	}
	//#endregion
}));
//#endregion

//#region AlertDialog
function AlertDialog({ open, handleClose, titleId, messageId, type, noModal }) {
	const classes = useStyles();

	return (
		<>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={open}
				onClose={noModal && handleClose}
				classes={{ paper: classes.dialog }}
				aria-labelledby="max-width-alert-dialog-title"
			>
				<DialogTitle
					id="max-width-alert-dialog-title"
					className={classes.dialogTitle}
				>
					<IconButton
						disableRipple
						className={
							(type === "info" &&
								classes.alertDialogTitleIconInfo) ||
							(type === "error" &&
								classes.alertDialogTitleIconError) ||
							(type === "warning" &&
								classes.alertDialogTitleIconWarning)
						}
					>
						{(type === "info" && <Info />) ||
							(type === "error" && <Error />) ||
							(type === "warning" && <Warning />)}
					</IconButton>
				</DialogTitle>
				<DialogContent className={classes.alertDialogContent}>
					<Typography variant="h6">
						<FormattedMessage id={titleId} />
					</Typography>
					<DialogContentText>
						<FormattedMessage id={messageId} />
					</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.alertDialogAction}>
					<Controls.Button
						textId="dialog.actionOK"
						onClick={handleClose}
					/>
				</DialogActions>
			</Dialog>
		</>
	);
}

AlertDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	titleId: PropTypes.string.isRequired,
	messageId: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["error", "info", "warning"]),
	noModal: PropTypes.bool
};

AlertDialog.defaultProps = {
	type: "info",
	noModal: false
};
//#endregion

//#region ConfirmDialog
function ConfirmDialog({
	open,
	handleClose,
	titleId,
	subtitleId,
	onConfirm,
	noModal
}) {
	const classes = useStyles();

	const handleConfirm = () => {
		handleClose();
		onConfirm();
	};

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={open}
			onClose={noModal && handleClose}
			classes={{ paper: classes.dialog }}
			aria-labelledby="max-width-confirm-dialog-title"
		>
			<DialogTitle
				id="max-width-confirm-dialog-title"
				className={classes.dialogTitle}
			>
				<IconButton
					disableRipple
					className={classes.confirmDialogTitleIcon}
				>
					<Help />
				</IconButton>
			</DialogTitle>

			<DialogContent className={classes.confirmDialogContent}>
				<Typography variant="h6">
					<FormattedMessage id={titleId} />
				</Typography>
				<DialogContentText>
					<FormattedMessage id={subtitleId} />
				</DialogContentText>
			</DialogContent>

			<DialogActions className={classes.confirmDialogAction}>
				<Controls.Button
					textId="dialog.confirmYes"
					onClick={handleConfirm}
				/>
				<Controls.Button
					color="secondary"
					textId="dialog.confirmNo"
					onClick={handleClose}
				/>
			</DialogActions>
		</Dialog>
	);
}

ConfirmDialog.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	titleId: PropTypes.string.isRequired,
	subtitleId: PropTypes.string.isRequired,
	onConfirm: PropTypes.func.isRequired,
	noModal: PropTypes.bool
};

ConfirmDialog.defaultProps = {
	noModal: false
};
//#endregion

export { AlertDialog, ConfirmDialog };
