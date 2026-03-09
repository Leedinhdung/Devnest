import {
	getMe,
	login,
	logout,
	refresh,
	register,
	verifyEmail,
} from "@/controllers/auth.controller.js";
import { verifyAccessToken } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.js";
import { loginSchema, registerSchema } from "@/validators/auth.validator.js";
import express from "express";
const router = express.Router();
router.post("/register", validate(registerSchema), register);
router.post("/verify-email", verifyEmail);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyAccessToken, getMe);
export default router;
