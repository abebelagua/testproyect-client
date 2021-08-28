import apiClient from "./apiClient";

const getGroups = findQuery =>
	apiClient
		.post(`/group/all`, findQuery)
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const getGroup = index =>
	apiClient
		.get(`/group/${index}`, {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const createGroup = group =>
	apiClient
		.post(`/group/`, group)
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const updateGroup = group =>
	apiClient
		.put(`/group/${group._id}`, group)
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const deleteGroup = index =>
	apiClient
		.delete(`/group/${index}`, {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const getAllMainTeachers = () =>
	apiClient
		.get("/group/allMainTeachers", {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

export {
	getGroups,
	getGroup,
	createGroup,
	updateGroup,
	deleteGroup,
	getAllMainTeachers
};
