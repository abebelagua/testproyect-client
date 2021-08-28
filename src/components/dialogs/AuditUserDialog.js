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
import { AccountCircle } from "@material-ui/icons";
import Controls from "../controls/Controls";
//#endregion

//#region Styles
const useStyles = makeStyles(theme => ({
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
	dialogTitleIcon: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "#fff"
		},
		"& .MuiSvgIcon-root": {
			fontSize: "2em"
		}
	}
}));
//#endregion

export default function AuditUserDialog({ userDialog, setUserDialog }) {
	const classes = useStyles();

	const handleClose = () => {
		setUserDialog({ ...userDialog, isOpen: false });
	};

	return (
		<>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={userDialog.isOpen}
				classes={{ paper: classes.dialog }}
				aria-labelledby="max-width-audit-user-dialog-title"
			>
				<DialogTitle
					id="max-width-alert-dialog-title"
					className={classes.dialogTitle}
				>
					<IconButton
						disableRipple
						className={classes.dialogTitleIcon}
					>
						<AccountCircle />
					</IconButton>
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<Typography variant="h6">{userDialog.fullname}</Typography>
					<DialogContentText>{userDialog.username}</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.dialogAction}>
					<Controls.Button
						textId="dialog.actionOK"
						onClick={handleClose}
					/>
				</DialogActions>
			</Dialog>
		</>
	);
}

AuditUserDialog.propTypes = {
	setUserDialog: PropTypes.func.isRequired,
	userDialog: PropTypes.shape({
		isOpen: PropTypes.bool,
		fullname: PropTypes.string,
		username: PropTypes.string
	}).isRequired
};
