import z from "zod";

export const categorySchema = z.object({
	name: z.string().trim().min(3, "Vui lòng nhập tên danh mục"),
	description: z.string().optional(),
});
