import courseModel from "@/models/course.model.js";
import lessonModel from "@/models/lesson.model.js";
import sectionModel from "@/models/section.model.js";
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
	const course = await courseModel
		.findOne({
			slug,
			is_deleted: false,
		})
		.populate("category_id", "name");

	if (!course) throw new Error("Course not found");

	// lấy sections
	const sections = await sectionModel
		.find({
			course_id: course._id,
			is_deleted: false,
		})
		.sort({ order_index: 1 });

	const sectionIds = sections.map((s) => s._id);

	// lấy lessons
	const lessons = await lessonModel
		.find({
			section_id: { $in: sectionIds },
			is_deleted: false,
		})
		.sort({ order_index: 1 });

	// build curriculum
	const curriculum = sections.map((section) => ({
		...section.toObject(),
		lessons: lessons.filter(
			(lesson) => lesson.section_id.toString() === section._id.toString(),
		),
	}));

	// total
	const totalSections = sections.length;
	const totalLessons = lessons.length;

	return {
		...course.toObject(),
		totalSections,
		totalLessons,
		curriculum,
	};
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
		{ is_deleted: false, deleted_at: null },
		{ returnDocument: "after" },
	);
};
export const relatedCoursesService = async (slug: string) => {
	const course = await courseModel.findOne({ slug });

	if (!course) {
		throw new Error("Course not found");
	}

	const relatedCourses = await courseModel
		.find({
			category: course.category,
			_id: { $ne: course._id },
			is_deleted: false,
		})
		.select("title slug thumbnail price discount_price rating level")
		.populate("category_id", "name slug")
		.lean();

	return relatedCourses;
};
