import apiClient from "./apiClient";

const getSideBarMenu = () =>
	apiClient
		.post("/getMenu", {})
		.then(res => res.data)
		.catch(error => ({ server_error: true, error }));

export { getSideBarMenu };
