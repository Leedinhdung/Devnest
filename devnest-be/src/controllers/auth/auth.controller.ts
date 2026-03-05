import userModel from "@/models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt.js";
import { sendOTPEmail } from "@/utils/sendMail.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};
export const register = async (req: Request, res: Response) => {
	const { fullname, email, password } = req.body;
	const exist = await userModel.findOne({ email });
	if (exist) {
		// Nếu đã verify → chặn
		if (exist.isVerified) {
			return res.status(400).json({
				message: "Email đã được sử dụng",
			});
		}

		// Nếu chưa verify → tạo OTP mới
		const otp = generateOTP();

		exist.otp = await bcrypt.hash(otp, 10);
		exist.otpExpire = new Date(Date.now() + 5 * 60 * 1000);

		await exist.save();
		await sendOTPEmail(email, otp);

		return res.status(200).json({
			message: "OTP đã được gửi lại",
		});
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const otp = generateOTP();
	const user = await userModel.create({
		fullname,
		email,
		password: hashPassword,
		otp: await bcrypt.hash(otp, 10),
		otpExpire: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
		isVerified: false,
	});
	await sendOTPEmail(email, otp);
	return res.status(201).json({ message: "User created successfully", user });
};
export const verifyEmail = async (req: Request, res: Response) => {
	const { email, otp } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) {
		return res.status(400).json({ message: "Invalid email or OTP" });
	}
	if (user.isVerified) {
		return res.status(400).json({ message: "Email already verified" });
	}
	if (!user.otp || !user.otpExpire) {
		return res.status(400).json({ message: "OTP not found" });
	}

	if (user.otpExpire < new Date()) {
		return res.status(400).json({ message: "OTP expired" });
	}

	const isMatch = await bcrypt.compare(otp, user.otp);
	if (!isMatch) {
		return res.status(400).json({ message: "Invalid OTP" });
	}

	user.isVerified = true;
	user.otp = undefined;
	user.otpExpire = undefined;

	await user.save();

	res.json({ message: "Email verified successfully" });
};
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		if (!user.isVerified) {
			return res
				.status(403)
				.json({ message: "Please verify your email first" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const accessToken = generateAccessToken(user._id.toString(), user.role);
		const refreshToken = generateRefreshToken(user._id.toString());

		user.refreshToken = await bcrypt.hash(refreshToken, 10);
		await user.save();

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.json({
			accessToken,
			user: {
				id: user._id,
				name: user.fullname,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
export const refresh = async (req: Request, res: Response) => {
	const token = req.cookies.refreshToken;
	if (!token) return res.sendStatus(401);
	const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
		userId: string;
	};
	const user = await userModel.findById(decoded.userId);
	if (!user || !user.refreshToken) return res.sendStatus(403);
	const isMatch = await bcrypt.compare(token, user.refreshToken);
	if (!isMatch) return res.sendStatus(403);
	const newAccessToken = generateAccessToken(user._id.toString(), user.role);
	res.json({ accessToken: newAccessToken });
};
export const logout = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.refreshToken;
		if (token) {
			const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
				userId: string;
			};
			const user = await userModel.findById(decoded.userId);
			if (user) {
				user.refreshToken = undefined;
				await user.save();
			}
		}
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: false,
			sameSite: "strict",
		});

		res.json({ message: "Logged out successfully" });
	} catch (err) {
		res.status(500).json({ message: "Logout failed" });
	}
};
export const getMe = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.userId;

		const user = await userModel
			.findById(userId)
			.select("-password -refreshToken -otp -otpExpire");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({
			id: user._id,
			name: user.fullname,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
