import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

// Styles
import styles from "../../../assets/js/Components/treeItemStyledStyles";

const useTreeItemStyles = makeStyles(styles);

export default function StyledTreeItem(props) {
	const classes = useTreeItemStyles();
	const { labelText, labelInfo, color, bgColor, ...other } = props;
	return (
		<TreeItem
			label={
				<div className={classes.labelRoot}>
					<Typography variant="body2" className={classes.labelText}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</div>
			}
			style={{
				"--tree-view-color": color,
				"--tree-view-bg-color": bgColor
			}}
			classes={{
				root: classes.root,
				content: classes.content,
				expanded: classes.expanded,
				selected: classes.selected,
				group: classes.group,
				label: classes.label
			}}
			{...other}
		/>
	);
}

StyledTreeItem.defaultProps = {
	bgColor: null,
	color: null,
	labelInfo: null
};
StyledTreeItem.propTypes = {
	bgColor: PropTypes.string,
	color: PropTypes.string,
	labelInfo: PropTypes.string,
	labelText: PropTypes.object.isRequired
};
