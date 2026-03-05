import axios from "axios";
import { backendUrl } from "@/configs/baseUrl";

const axiosClient = axios.create({
	baseURL: backendUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log("Error in request interceptor:", error);
		return Promise.reject(error);
	},
);
axiosClient.interceptors.response.use(
	(res) => res.data.data,
	(err) => {
		console.log("Error in response interceptor: ", err);
		return Promise.reject(err);
	},
);
export default axiosClient;
