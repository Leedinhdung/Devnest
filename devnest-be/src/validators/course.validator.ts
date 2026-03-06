import { z } from "zod";

export const courseSchema = z.object({
	title: z
		.string()
		.min(5, "Tiêu đề phải có ít nhất 5 ký tự")
		.max(200, "Tiêu đề không được quá 200 ký tự"),

	short_description: z
		.string()
		.min(10, "Mô tả ngắn ít nhất 10 ký tự")
		.max(300, "Mô tả ngắn tối đa 300 ký tự")
		.optional(),

	description: z.string().min(20, "Mô tả phải ít nhất 20 ký tự").optional(),

	thumbnail: z.string().url("Thumbnail phải là URL hợp lệ").optional(),

	intro_video: z.string().url("Video intro phải là URL hợp lệ").optional(),

	category_id: z
		.string()
		.regex(/^[0-9a-fA-F]{24}$/, "Category ID không hợp lệ"),

	created_by: z.string().regex(/^[0-9a-fA-F]{24}$/, "User ID không hợp lệ"),

	level: z.enum(["beginner", "intermediate", "advanced"]).optional(),

	price: z.number().min(0, "Giá không được nhỏ hơn 0").optional(),

	discount_price: z.number().min(0, "Giá giảm không hợp lệ").optional(),

	requirements: z.array(z.string()).optional(),

	learning_outcomes: z.array(z.string()).optional(),

	tags: z.array(z.string()).optional(),

	status: z.enum(["draft", "published"]).optional(),
});
