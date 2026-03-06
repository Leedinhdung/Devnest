import courseModel from "@/models/course.model.js";
import slugify from "slugify";

export const createCourseService = async (data) => {
	const slug = slugify(data.title, { lower: true, strict: true });
	const course = await courseModel.create({
		...data,
		slug,
	});
	return course;
};
export const getCoursesService = async () => {
	return courseModel
		.find({ is_deleted: false })
		.populate("category_id", "name")
		.populate("created_by", "name email");
};
export const getCourseBySlugService = async (slug: string) => {
	return courseModel.findOne({
		slug,
		is_deleted: false,
	});
};

export const updateCourseService = async (slug: string, data: any) => {
	if (data.title) {
		data.slug = slugify(data.title, { lower: true, strict: true });
	}

	return courseModel.findOneAndUpdate({ slug }, data, {
		returnDocument: "after",
	});
};

export const deleteCourseService = async (slug: string) => {
	return courseModel.findOneAndUpdate(
		{ slug },
		{ is_deleted: true },
		{ returnDocument: "after" },
	);
};
export const restoreCourseService = async (slug: string) => {
	return courseModel.findOneAndUpdate(
		{ slug },
		{ is_deleted: false },
		{ returnDocument: "after" },
	);
};
