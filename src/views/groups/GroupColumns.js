import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";

const groupColumns = [
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
		field: "mainTeacher"
	}
];
export { groupColumns };
