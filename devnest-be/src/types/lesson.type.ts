import { Types } from "mongoose";

export type LessonType = "video" | "article";

export interface Lesson {
	_id: Types.ObjectId;

	course_id: Types.ObjectId;

	section_id: Types.ObjectId;

	title: string;

	slug: string;

	lesson_type: LessonType;

	video_url?: string;

	content?: string;

	duration: number;

	is_preview: boolean;

	order_index: number;

	createdAt: Date;

	updatedAt: Date;
}
export interface CreateLessonPayload {
	course_id: string;
	section_id: string;
	title: string;
	description: string;
	lesson_type: LessonType;
	video_url?: string;
	content?: string;
	duration?: string;
	is_preview?: boolean;
}
export type UpdateLessonPayload = Partial<{
	title: string;
	lesson_type: LessonType;
	video_url: string;
	content: string;
	duration?: string;
	is_preview: boolean;
}>;
