import { lessonUri } from "@/api/uris/lesson";
import axiosClient from "@/configs/axiosClient";
import {
	CreateLessonPayload,
	LessonResponse,
	UpdateLessonPayload,
} from "@/types/lesson.type";

export const lessonApi = {
	getLessons: async (): Promise<LessonResponse[]> => {
		return axiosClient.get(lessonUri.GET_LESSON);
	},
	createLesson: async (data: CreateLessonPayload): Promise<LessonResponse> => {
		return axiosClient.post(lessonUri.CREATE, data);
	},
	getLessonBySlug: async (slug: string): Promise<LessonResponse> => {
		return axiosClient.get(lessonUri.GET_LESSON_BY_SLUG(slug));
	},
	updateLesson: async ({
		slug,
		data,
	}: {
		slug: string;
		data: UpdateLessonPayload;
	}): Promise<LessonResponse> => {
		return axiosClient.put(lessonUri.UPDATE(slug), data);
	},
	deleteLesson: async (slug: string): Promise<LessonResponse> => {
		return axiosClient.delete(lessonUri.DELETE(slug));
	},
	reorderLesson: async (data: { id: string; order_index: number }[]) => {
		return axiosClient.patch(lessonUri.REORDER, data);
	},
};
