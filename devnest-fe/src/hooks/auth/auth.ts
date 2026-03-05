import { authApi } from "@/api/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { LoginPayload, RegisterPayload } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = (options?: {
	onSuccess?: () => void;
	onError?: (error: any) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: RegisterPayload) => {
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
	const { login } = useAuth();
	return useMutation({
		mutationFn: async (data: LoginPayload) => {
			return authApi.login(data);
		},
		onSuccess: (res) => {
			login(res.accessToken, res.user);
			queryClient.invalidateQueries({ queryKey: ["users"] });
			options?.onSuccess?.();
		},
		onError: (error) => {
			options?.onError?.(error);
		},
	});
};
export const useLogout = () => {
	const { logout } = useAuth();
	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			logout();
		},
	});
};
