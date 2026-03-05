import { authUri } from "@/api/uris/auth";
import axiosClient from "@/configs/axiosClient";
import {
	IUser,
	LoginPayload,
	LoginResponse,
	RegisterPayload,
	VerifyEmailPayload,
} from "@/types/auth.type";

export const authApi = {
	register: async (data: RegisterPayload): Promise<IUser> => {
		return axiosClient.post(authUri.REGISTER, data);
	},
	verifyEmail: async (data: VerifyEmailPayload): Promise<void> => {
		return axiosClient.post(authUri.VERIFY_EMAIL, data);
	},
	login: async (data: LoginPayload): Promise<LoginResponse> => {
		return axiosClient.post(authUri.LOGIN, data);
	},
	logout: async (): Promise<void> => {
		return axiosClient.post(authUri.LOGOUT);
	},
	getMe: async (): Promise<IUser> => {
		return axiosClient.get(authUri.ME);
	},
};
