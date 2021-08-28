import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/home/navbar/NavBar";
import Footer from "../components/home/footer/Footer";
import SideBar from "../components/home/sidebar/SideBar";
import MyTabs from "../components/home/tabPanel/Tabs";
import "react-toastify/dist/ReactToastify.css";

// Styles
import styles from "../assets/js/Pages/HomeStyles";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
	const classes = useStyles();
	const width = window.innerWidth;
	const { match } = props;
	const { params } = match;
	const { view } = params;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar />
			<SideBar isMobile={width <= 960} />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<MyTabs view={view} isMobile={width <= 960} />
			</main>
			<Footer isMobile={width <= 960} />
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

HomePage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			view: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};
