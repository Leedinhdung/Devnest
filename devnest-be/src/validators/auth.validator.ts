import { z } from "zod";
export const registerSchema = z
	.object({
		fullname: z.string().min(3, "Fullname must be at least 3 characters"),

		email: z.string().trim().email("Invalid email format"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
			.regex(/[a-z]/, "Must contain at least 1 lowercase letter")
			.regex(/[0-9]/, "Must contain at least 1 number")
			.regex(/[^A-Za-z0-9]/, "Must contain at least 1 special character"),
	})
	.strict();
export const loginSchema = z.object({
	email: z.string().trim().email("Invalid email"),
	password: z.string().min(6, "Password is required"),
});
