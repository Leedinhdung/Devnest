import { z } from "zod";

export const courseSchema = z
	.object({
		title: z
			.string()
			.min(5, "Tiêu đề phải có ít nhất 5 ký tự")
			.max(200, "Tiêu đề tối đa 200 ký tự"),

		slug: z.string().optional(),

		short_description: z
			.string()
			.max(300, "Mô tả ngắn tối đa 300 ký tự")
			.optional(),

		description: z.string().optional(),

		thumbnail: z.string().url("Thumbnail phải là URL hợp lệ").optional(),

		intro_video: z.string().url("Video phải là URL hợp lệ").optional(),

		category_id: z.string().optional(),

		level: z.enum(["beginner", "intermediate", "advanced"]).optional(),

		price: z.number().min(0, "Giá không hợp lệ").default(0),

		discount_price: z.number().min(0).optional(),

		requirements: z.array(z.object({ value: z.string() })).optional(),

		learning_outcomes: z.array(z.object({ value: z.string() })).optional(),

		tags: z.array(z.string()).optional(),

		status: z.enum(["draft", "published"]).default("draft"),
		created_by: z.string().optional(),
	})
	.refine(
		(data) => {
			if (!data.discount_price) return true;
			return data.discount_price <= data.price;
		},
		{
			message: "Giá giảm phải nhỏ hơn hoặc bằng giá gốc",
			path: ["discount_price"],
		},
	);

