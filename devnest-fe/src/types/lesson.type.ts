export type LessonType = "video" | "article";
export interface LessonResponse {
	_id: string;
	slug: string;
	course_id: string;
	section_id: string;
	title: string;
	content: string;
	description: string;
	lesson_type: LessonType;
	video_url?: string;
	duration?: string;
	is_preview: boolean;
	created_at: string;
	updated_at: string;
}

export interface CreateLessonPayload {
	course_id: string;
	section_id: string;
	title: string;
	lesson_type: LessonType;
	video_url?: string;
	duration?: string;
	is_preview: boolean;
}
export interface UpdateLessonPayload {
	slug: string;
	title?: string;
	lesson_type?: LessonType;
	video_url?: string;
	duration?: string;
	is_preview?: boolean;
	description?: string;
	content?: string;
}
export interface LessonFormValues {
	title: string;
	content: string;
	lesson_type: LessonType;
	video_url?: string;
	duration?: string;
	is_preview: boolean;
	description?: string;
}
