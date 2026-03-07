import { courseUri } from "@/api/uris/course";
import axiosClient from "@/configs/axiosClient";
import {
	CoursePayload,
	CourseResponse,
	UpdateCoursePayload,
} from "@/types/course.type";

export const courseApi = {
	getCourses: async (): Promise<CourseResponse[]> => {
		return axiosClient.get(courseUri.GET_COURSE);
	},
	createCourse: async (data: CoursePayload): Promise<CoursePayload> => {
		return axiosClient.post(courseUri.CREATE, data);
	},
	getCourseBySlug: async (slug: string): Promise<CourseResponse> => {
		return axiosClient.get(courseUri.GET_COURSE_BY_SLUG(slug));
	},
	updateCourse: async ({
		slug,
		...data
	}: UpdateCoursePayload): Promise<CourseResponse> => {
		return axiosClient.put(courseUri.UPDATE(slug), data);
	},
	deleteCourse: async (slug: string): Promise<CourseResponse> => {
		return axiosClient.delete(courseUri.DELETE(slug));
	},
};
