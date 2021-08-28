import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import { Check } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";

function DetailsDialog(props) {
	const { onClose, open, listItems } = props;

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<Box color="#FFFFFF" bgcolor="#00519E" p={1}>
				<FormattedMessage id="dialog.details" />
			</Box>

			<List>
				{listItems.map(item => (
					<ListItem>
						<ListItemText
							primary={
								<Typography variant="overline">
									<b>{item.text}</b> : {item.value}
								</Typography>
							}
						/>
					</ListItem>
				))}
				<ListItem autoFocus button onClick={onClose}>
					<ListItemAvatar>
						<Avatar>
							<Check />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={<FormattedMessage id="dialog.actionOK" />}
					/>
				</ListItem>
			</List>
		</Dialog>
	);
}

export default DetailsDialog;

DetailsDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	listItems: PropTypes.array.isRequired
};
