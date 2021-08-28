/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage, useIntl } from "react-intl";
import {
	Grid,
	Typography,
	Card,
	CardHeader,
	CardContent
} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import Search from "@material-ui/icons/Search";
import { notifyError, notifyWarning } from "../../utils/notify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	setFormData,
	setTableData,
	setActualPath
} from "../../redux/reducers/groupReducer";
import { getAllMainTeachers, getGroups } from "../../services/GroupService";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%"
	},
	card: {
		flexGrow: 1,
		padding: "2em"
	},
	header: {
		color: "#FFFFFF",
		backgroundColor: "#00519E",
		textAlign: "center"
	},
	submit: {
		height: "45px",
		backgroundColor: "#00519E",
		color: "#FFFFFF"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "100%"
	},
	papel: {
		border: "solid",
		borderColor: "#00519E",
		borderTop: "none",
		borderWidth: "thin"
	},
	form: {
		width: "100%"
	}
}));

export default function GroupFormView({ view }) {
	const classes = useStyles();
	const history = useHistory();
	const intl = useIntl();
	const dispatch = useDispatch();
	const formData = useSelector(state => state[view].formData);
	const [mainTeachers, setMainTeachers] = useState([]);
	const formikRef = useRef();

	useEffect(() => {
		const fetchTeachers = async () => {
			const res = await getAllMainTeachers();
			if (!res.server_error) {
				if (res.length !== 0) {
					setMainTeachers(res);
				} else {
					notifyWarning(
						<FormattedMessage id="msg.warning.noDataFound" />
					);
				}
			} else {
				notifyError(<FormattedMessage id="msg.error.dataServer" />);
			}
		};
		fetchTeachers();
	}, []);

	const validationSchema = Yup.object({
		mainTeacher: Yup.string(
			intl.formatMessage({ id: "management.groups.mainTeacher" })
		)
	});

	const formik = useFormik({
		initialValues: formData,
		validationSchema,
		onSubmit: async values => {
			const find =
				values.mainTeacher === ""
					? {}
					: { mainTeacher: values.mainTeacher };
			const res = await getGroups(find);
			if (!res.server_error) {
				if (res.length !== 0) {
					await dispatch(setTableData(res));
					await dispatch(setActualPath("/table"));
					history.push(`/home/${view}/table`);
				} else {
					notifyWarning(
						<FormattedMessage id="msg.warning.noDataFound" />
					);
				}
			} else {
				notifyError(<FormattedMessage id="msg.error.dataServer" />);
			}
		},
		innerRef: formikRef
	});

	useEffect(() => {
		formikRef.current = formik.values;
	}, [formik.values]);

	useEffect(() => {
		return () => {
			dispatch(
				setFormData({
					mainTeacher: formikRef.current.mainTeacher
				})
			);
		};
	}, []);

	return (
		<div className={classes.root}>
			<div>
				<Card className={classes.card}>
					<CardHeader
						className={classes.header}
						title={
							<Typography variant="overline">
								<FormattedMessage id="management.groups.helperText" />
							</Typography>
						}
					/>
					<CardContent className={classes.papel}>
						<Grid container direction="row" justifyContent="center">
							<Grid item md={8} sm={12} xl={6}>
								<form
									onSubmit={formik.handleSubmit}
									className={classes.form}
								>
									<Grid
										container
										direction="row"
										alignItems="stretch"
										justifyContent="space-between"
										spacing={2}
									>
										<Grid item sm={12}>
											<FormControl
												variant="outlined"
												style={{ width: "100%" }}
											>
												<InputLabel id="mainTeacher-label">
													{intl.formatMessage({
														id: "management.groups.mainTeacher"
													})}
												</InputLabel>
												<Select
													autoFocus
													id="mainTeacher"
													name="mainTeacher"
													labelId="mainTeacher-label"
													label={intl.formatMessage({
														id: "management.groups.mainTeacher"
													})}
													onChange={
														formik.handleChange
													}
													error={
														formik.touched
															.mainTeacher &&
														Boolean(
															formik.errors
																.mainTeacher
														)
													}
													value={
														formik.values
															.mainTeacher
													}
												>
													<MenuItem value="">
														<em>None</em>
													</MenuItem>
													{mainTeachers.map(
														(t, i) => {
															return (
																<MenuItem
																	key={
																		t.mainTeacher +
																		i
																	}
																	value={
																		t.mainTeacher
																	}
																>
																	{
																		t.mainTeacher
																	}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<Controls.Button
												type="submit"
												fullWidth
												startIcon={<Search />}
												variant="contained"
												color="primary"
												className={classes.submit}
												textId="btn.find"
											>
												<FormattedMessage id="btn.find" />
											</Controls.Button>
										</Grid>
									</Grid>
								</form>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

GroupFormView.propTypes = {
	view: PropTypes.string.isRequired
};
