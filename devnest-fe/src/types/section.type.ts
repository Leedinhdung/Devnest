import { LessonResponse } from "@/types/lesson.type";

export interface SectionResponse {
	_id: string;
	course_id: string;
	title: string;
	order_index: number;
	lessons: LessonResponse[];
}
export interface CreateSectionPayload {
	course_id: string | undefined;
	title: string;
}
export interface UpdateSectionPayload {
	id: string;
	title: string;
}
