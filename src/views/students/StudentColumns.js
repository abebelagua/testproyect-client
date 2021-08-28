import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";

const studentColumns = [
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.name" />
			</Typography>
		),
		field: "name"
	},
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.mainTeacher" />
			</Typography>
		),
		field: "age"
	},
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.mainTeacher" />
			</Typography>
		),
		field: "genre"
	},
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.mainTeacher" />
			</Typography>
		),
		field: "email"
	},
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.mainTeacher" />
			</Typography>
		),
		field: "birthDate"
	},
	{
		id: "management.groups.deleted",
		title: (
			<Typography variant="overline">
				<FormattedMessage id="management.groups.mainTeacher" />
			</Typography>
		),
		field: "birthCity"
	}
];
export { studentColumns };
