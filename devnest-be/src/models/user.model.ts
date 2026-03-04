import { IUser } from "@/types/user.js";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>(
	{
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["admin", "instructor", "student"],
			default: "student",
		},
		refreshToken: { type: String, default: null },
		isVerified: {
			type: Boolean,
			default: false,
		},
		otp: String,
		otpExpire: Date,
	},
	{ timestamps: true },
);
export default mongoose.model<IUser>("User", userSchema);
