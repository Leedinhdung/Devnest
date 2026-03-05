import { authApi } from "@/api/services/auth.service";
import { IUser } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = (options?: {
	onSuccess?: () => void;
	onError?: (error: any) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: IUser) => {
			return authApi.register(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			options?.onSuccess?.();
		},
		onError: (error) => {
			options?.onError?.(error);
		},
	});
};
export const useVerifyEmail = (options?: {
	onSuccess?: () => void;
	onError?: (error: any) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { email: string; otp: string }) => {
			return authApi.verifyEmail(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			options?.onSuccess?.();
		},
		onError: (error) => {
			options?.onError?.(error);
		},
	});
};
export const useLogin = (options?: {
	onSuccess?: () => void;
	onError?: (error: any) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			return authApi.login(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			options?.onSuccess?.();
		},
		onError: (error) => {
			options?.onError?.(error);
		},
	});
};
