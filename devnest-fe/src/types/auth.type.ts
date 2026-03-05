export interface FormState {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface FormErrors {
	fullname?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}
export interface IUser {
	id?: string;
	fullname: string;
	email: string;
	password: string;
}
