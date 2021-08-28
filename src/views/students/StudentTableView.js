import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import { Grid } from "@material-ui/core";
import { studentColumns } from "./StudentColumns";
import DataTable from "../../components/tables/BELDataTable/BfiDataTable";
import { useDispatch, useSelector } from "react-redux";
import {
	setTableData,
	setTableOptions
} from "../../redux/reducers/studentReducer";
import { notifyError, notifyWarning } from "../../utils/notify";
import { getStudents } from "../../services/StudentService";

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

export default function TraceTableView({ view }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const tableData = useSelector(state => state[view].tableData);
	const tableOptions = useSelector(state => state[view].tableOptions);

	const actionsTable = [];

	useEffect(() => {
		const fetchEstudents = async () => {
			const res = await getStudents();
			if (!res.server_error) {
				if (res.length !== 0) {
					dispatch(setTableData(res));
				} else {
					notifyWarning(
						<FormattedMessage id="msg.warning.noDataFound" />
					);
				}
			} else {
				notifyError(<FormattedMessage id="msg.error.dataServer" />);
			}
		};
		fetchEstudents();
	}, []);

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
								columns={studentColumns}
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

TraceTableView.propTypes = {
	view: PropTypes.string.isRequired
};
