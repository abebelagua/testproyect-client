/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import GroupFormView from "../views/groups/GroupFormView";
import GroupTableView from "../views/groups/GroupTableView";
import StudentTableView from "../views/students/StudentTableView";

const tabRoutes = {
	main: [],
	groups: [
		{
			name: "Trace Form",
			path: "/form",
			component: view => <GroupFormView view={view} />
		},
		{
			name: "Trace Table",
			path: "/table",
			component: view => <GroupTableView view={view} />
		}
	],
	students: [
		{
			name: "Trace Table",
			path: "/table",
			component: view => <StudentTableView view={view} />
		}
	]
};

export default tabRoutes;
