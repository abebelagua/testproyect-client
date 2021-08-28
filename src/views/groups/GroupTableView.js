import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { groupColumns } from "./GroupColumns";
import DataTable from "../../components/tables/BELDataTable/BfiDataTable";
import { useDispatch, useSelector } from "react-redux";
import {
	setActualPath,
	setTableOptions
} from "../../redux/reducers/groupReducer";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: "100%"
	},
	stepper: {
		width: "60%"
	},
	button: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	table: {
		minWidth: 650
	},
	root2: {
		width: "100%"
	},
	container: {
		width: "100%"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	title: {
		marginLeft: theme.spacing(1)
	}
}));

export default function GroupTableView({ view }) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const tableData = useSelector(state => state[view].tableData);
	const tableOptions = useSelector(state => state[view].tableOptions);

	const actionsTable = [
		{
			tooltip: <FormattedMessage id="btn.goBack" />,
			icon: <ArrowBack />,
			isFreeAction: true,
			onClick: () => {
				dispatch(setActualPath("/form"));
				history.push(`/home/${view}/form`);
			}
		}
	];

	return (
		<div className={classes.root}>
			<div>
				<div className={classes.root2}>
					<Grid
						spacing={1}
						container
						direction="column"
						alignItems="stretch"
						justifyContent="flex-start"
						className={classes.container}
					>
						<Grid item md={12} xs={12}>
							<DataTable
								title=""
								columns={groupColumns}
								data={tableData}
								actions={actionsTable}
								options={{
									page: tableOptions.page ?? 0,
									filterList: tableOptions.filterList
								}}
								onChange={data =>
									dispatch(setTableOptions(data))
								}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
}

GroupTableView.propTypes = {
	view: PropTypes.string.isRequired
};
