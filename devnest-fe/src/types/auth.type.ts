export interface IUser {
	_id?: string;
	fullname: string;
	email: string;
	role?: string;
}
//Payloads
export interface RegisterPayload {
	fullname: string;
	email: string;
	password: string;
}
export interface LoginPayload {
	email: string;
	password: string;
}
export interface VerifyEmailPayload {
	email: string;
	otp: string;
}

//Responses
export interface LoginResponse {
	accessToken: string;
	user: IUser;
}
export interface AuthContextType {
	user: IUser | null;
	token: string | null;
	login: (token: string, user: IUser) => void;
	logout: () => void;
	isAuthenticated: boolean;
}
