import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:4000/api",
	withCredentials: true
});

// api.interceptors.request.use(
// 	config => {
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			config.headers["Authorization"] = `Token ${token}`;
// 		}
// 		return config;
// 	},
// 	error => Promise.reject(error)
// );

export default apiClient;
