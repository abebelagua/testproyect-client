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

const useStyles = makeStyles(theme => ({
	dialog: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(6)
	},
	dialogTitle: {
		textAlign: "left"
	},
	dialogContent: {
		textAlign: "center"
	},
	dialogAction: {
		justifyContent: "center"
	}
}));

/**
 * Diálogo personalizable.
 *
 * @component
 * @category Componentes
 * @subcategory Dialogos
 *
 * @param {boolean} open
 * @param {function} handleClose
 * @param {string} titleId
 * @param {string} [subtitleId=""]
 * @param {boolean} [noModal=false]
 * @param {node} children
 *
 * @returns Un CustomDialog
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 *
 * @requires useDialog
 */
function CustomDialog({
	open,
	handleClose,
	titleId,
	subtitleId,
	noModal,
	children
}) {
	const classes = useStyles();

	return (
		<>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={open}
				onClose={noModal && handleClose}
				classes={{ paper: classes.dialog }}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle
					id="max-width-dialog-title"
					className={classes.dialogTitle}
				>
					<Typography variant="h6">
						<FormattedMessage id={titleId} />
					</Typography>
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					{subtitleId && (
						<DialogContentText>
							<FormattedMessage id={subtitleId} />
						</DialogContentText>
					)}
					<Scrollbars
						autoHeight
						autoHeightMin={200}
						autoHeightMax={400} // TODO: definir el alto del scrollbar y el padding en vista móvil
					>
						{children}
					</Scrollbars>
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

CustomDialog.propTypes = {
	/** Indica si está visible o no */
	open: PropTypes.bool.isRequired,
	/** Funci */
	handleClose: PropTypes.func.isRequired,
	/** Identif */
	titleId: PropTypes.string.isRequired,
	/** */
	subtitleId: PropTypes.string,
	/** Indica */
	noModal: PropTypes.bool,
	/** */
	children: PropTypes.element.isRequired
};

CustomDialog.defaultProps = {
	noModal: false,
	subtitleId: ""
};

export default CustomDialog;
