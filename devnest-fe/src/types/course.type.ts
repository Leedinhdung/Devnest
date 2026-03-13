import { SectionResponse } from "@/types/section.type";
import { courseSchema } from "@/validators/course.validate";
import z from "zod";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseStatus = "draft" | "published";
type Curriculum = SectionResponse[];
export interface Course {
	_id: string;

	title: string;
	slug: string;

	short_description?: string;
	description?: string;

	thumbnail?: string;
	intro_video?: string;

	category_id?: string;
	created_by?: string;

	level?: CourseLevel;

	price?: number;
	discount_price?: number;

	requirements?: string[];
	learning_outcomes?: string[];
	tags?: string[];

	total_duration: number;
	total_lessons: number;
	total_students: number;

	rating_avg: number;
	rating_count: number;

	views: number;

	status: CourseStatus;

	createdAt: string;
	updatedAt: string;
}

export interface CourseResponse {
	_id: string;
	title: string;
	slug: string;
	short_description?: string;
	description?: string;
	thumbnail?: string;
	intro_video?: string;
	category_id?: {
		name: string;
	};
	created_by: string;
	level?: "beginner" | "intermediate" | "advanced";
	price: number;
	discount_price?: number;
	requirements: string[];
	learning_outcomes: string[];
	tags: string[];
	curriculum: Curriculum;
	total_duration: number;
	totalSections: number;
	totalLessons: number;
	total_lessons: number;
	total_students: number;
	rating_avg: number;
	rating_count: number;
	views: number;
	status: "draft" | "published";
	updatedAt: string;
}
export type CourseFormPayload = z.infer<typeof courseSchema>;
export type CoursePayload = Omit<
	CourseFormPayload,
	"requirements" | "learning_outcomes"
> & {
	requirements?: string[];
	learning_outcomes?: string[];
};
export type CreateCoursePayload = CoursePayload;
export type UpdateCoursePayload = {
	slug: string;
} & Omit<CoursePayload, "slug"> &
	CoursePayload;
