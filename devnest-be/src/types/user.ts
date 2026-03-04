export interface IUser {
	fullname: string;
	email: string;
	password: string;
	role: "admin" | "instructor" | "student";
	refreshToken?: string;
	isVerified?: boolean;
	otp?: string;
	otpExpire?: Date;
}
