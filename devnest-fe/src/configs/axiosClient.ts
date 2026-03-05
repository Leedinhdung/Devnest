import { backendUrl } from "@/configs/baseUrl";
import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
	baseURL: backendUrl,
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
	(error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");

			window.location.href = "/dang-nhap";
		}

		return Promise.reject(error);
	},
);

export default axiosClient;
