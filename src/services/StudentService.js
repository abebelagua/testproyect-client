import apiClient from "./apiClient";

const getStudents = () =>
	apiClient
		.post(`/student/all`, {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const getGroup = index =>
	apiClient
		.get(`/student/${index}`, {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const createGroup = group =>
	apiClient
		.post(`/student/`, group)
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const updateGroup = group =>
	apiClient
		.put(`/student/${group._id}`, group)
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

const deleteGroup = index =>
	apiClient
		.delete(`/student/${index}`, {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

export { getStudents, getGroup, createGroup, updateGroup, deleteGroup };
