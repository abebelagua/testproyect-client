import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import { useDispatch, useSelector } from "react-redux";

// Images and Icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { FormattedMessage } from "react-intl";
import TreeItemStyled from "./TreeItemStyled";

import { addTab, setIsNewTab } from "../../../redux/reducers/homeReducer";

// Styles
import styles from "../../../assets/js/Components/treeViewStyles";

const useStyles = makeStyles(styles);

export default function MyTreeView({ tree, isMobile, handleDrawerToggle }) {
	const history = useHistory();
	const classes = useStyles();
	const tabs = useSelector(state => state.home.tabs);
	const dispatch = useDispatch();

	const createTab = item => {
		if (
			!tabs.some(
				({ tabName, tabRouteName }) =>
					tabName === `tab.${item.name}` && tabRouteName === item.id
			)
		) {
			dispatch(
				addTab({
					name: item.name,
					id: item.id
				})
			);
		} else {
			dispatch(setIsNewTab(false));
		}
		history.push(`/home/${item.id}`);
		if (isMobile) {
			handleDrawerToggle();
		}
	};

	let id = 0;
	const renderItems = items =>
		items.map(item => {
			id += 1;
			if (item.leaf === 1) {
				return (
					<TreeItemStyled
						key={item.id}
						nodeId={`${id}`}
						labelText={
							<FormattedMessage
								id={`tab.${item.id}`}
								defaultMessage={item.name}
							/>
						}
						onIconClick={() => {
							createTab(item);
						}}
						onLabelClick={() => {
							createTab(item);
						}}
					/>
				);
			}
			return (
				<TreeItemStyled
					key={item.id}
					nodeId={`${id}`}
					labelText={
						<FormattedMessage
							id={`sidebar.${item.id}`}
							defaultMessage={item.name}
						/>
					}
				>
					{renderItems(item.items)}
				</TreeItemStyled>
			);
		});

	return (
		<TreeView
			className={classes.root}
			defaultCollapseIcon={<ArrowDropDownIcon />}
			defaultExpandIcon={<ArrowRightIcon />}
			defaultEndIcon={<div style={{ width: 24 }} />}
		>
			{renderItems(tree)}
		</TreeView>
	);
}

MyTreeView.defaultProps = {
	tree: [],
	isMobile: false
};

MyTreeView.propTypes = {
	tree: PropTypes.array,
	isMobile: PropTypes.bool,
	handleDrawerToggle: PropTypes.func.isRequired
};
