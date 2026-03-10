import { courseApi } from "@/api/services/course.service";
import { CoursePayload, CourseResponse } from "@/types/course.type";

import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetCourses = (
	options?: Omit<UseQueryOptions<CourseResponse[]>, "queryKey" | "queryFn">,
) => {
	return useQuery<CourseResponse[]>({
		...options,
		queryKey: ["courses"],
		queryFn: courseApi.getCourses,
	});
};
export const useGetCourseBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<CourseResponse>, "queryKey" | "queryFn">,
) => {
	return useQuery<CourseResponse>({
		...options,
		queryKey: ["course-by-slug", slug],
		queryFn: () => courseApi.getCourseBySlug(slug),
		enabled: !!slug,
	});
};
export const useCreateCourse = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: CoursePayload) => {
			return courseApi.createCourse(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
	});
};
export const useUpdateCourse = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: courseApi.updateCourse,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["courses"],
			});
		},
	});
};
export const useDeleteCourse = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return courseApi.deleteCourse(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["courses"] });
		},
	});
};
