import { authUri } from "@/api/uris/auth";
import axiosClient from "@/configs/axiosClient";
import { IUser } from "@/types/auth.type";

export const authApi = {
	register: async (data: IUser): Promise<IUser> => {
		return axiosClient.post(authUri.REGISTER, data);
	},
	verifyEmail: async (data: { email: string; otp: string }): Promise<void> => {
		return axiosClient.post(authUri.VERIFY_EMAIL, data);
	},
	login: async (data: { email: string; password: string }): Promise<void> => {
		return axiosClient.post(authUri.LOGIN, data);
	},
};
