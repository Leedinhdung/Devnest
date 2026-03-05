import { z } from "zod";

export const authSchema = z
	.object({
		fullname: z.string().min(3, "Tên tối thiểu 3 ký tự").optional(),
		email: z.string().email("Email không hợp lệ"),
		password: z
			.string()
			.min(8, "Tối thiểu 8 ký tự")
			.regex(/[A-Z]/, "Phải có chữ hoa")
			.regex(/[a-z]/, "Phải có chữ thường")
			.regex(/[0-9]/, "Phải có số")
			.regex(/[^A-Za-z0-9]/, "Phải có ký tự đặc biệt")
			.optional(),
		confirmPassword: z.string().optional(),
	})
	.refine(
		(data) => !data.confirmPassword || data.password === data.confirmPassword,
		{
			message: "Mật khẩu không khớp",
			path: ["confirmPassword"],
		},
	);

export type AuthFormType = z.infer<typeof authSchema>;
