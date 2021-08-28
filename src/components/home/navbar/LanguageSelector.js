import React, { useContext } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { Language, ArrowDropDown } from "@material-ui/icons";
import { Context } from "../../Wrapper";

import {
	languages,
	languagesNames
} from "../../../storage/languageLocalStorage";

// Images and icons

// Styles
import styles from "../../../assets/js/Components/navBarStyles";
import { Tooltip } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(styles);

export default function LanguageSelector() {
	const context = useContext(Context);
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [language, setLanguage] = React.useState(context.locale);

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const handleToggle = () => {
		setOpen(x => !x);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const itemClick = (e, i) => {
		setLanguage(languages[i]);
		context.selectLanguage(languages[i]);
		handleClose(e);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	return (
		<>
			<Hidden smDown>
				<Tooltip
					title={<FormattedMessage id="navbar.languageTooltip" />}
				>
					<Button
						ref={anchorRef}
						aria-controls={open ? "menu-list-grow" : undefined}
						aria-haspopup="true"
						color="primary"
						variant="outlined"
						className={classes.button}
						startIcon={<Language />}
						endIcon={<ArrowDropDown />}
						onClick={handleToggle}
					>
						{language.substring(0, 2)}
					</Button>
				</Tooltip>
			</Hidden>
			<Hidden mdUp>
				<Tooltip
					title={<FormattedMessage id="navbar.languageTooltip" />}
				>
					<Button
						ref={anchorRef}
						aria-controls={open ? "menu-list-grow" : undefined}
						aria-haspopup="true"
						color="primary"
						variant="outlined"
						className={classes.buttonLanguageMobile}
						startIcon={<Language />}
						endIcon={<ArrowDropDown />}
						onClick={handleToggle}
					>
						{language.substring(0, 2)}
					</Button>
				</Tooltip>
			</Hidden>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{ zIndex: "1033" }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom"
									? "center top"
									: "center bottom"
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="menu-list-grow"
									onKeyDown={handleListKeyDown}
								>
									{
										/* eslint-disable indent */
										languagesNames[
											language.substring(0, 2)
										].map((lang, i) =>
											languages[i] ===
											language.substring(0, 2) ? (
												<MenuItem
													key="0"
													onClick={e =>
														itemClick(e, i)
													}
													selected
												>
													{lang}
												</MenuItem>
											) : (
												<MenuItem
													key="1"
													onClick={e =>
														itemClick(e, i)
													}
												>
													{lang}
												</MenuItem>
											)
										)
										/* eslint-enable indent */
									}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}
