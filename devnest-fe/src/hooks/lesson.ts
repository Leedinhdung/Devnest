import { lessonApi } from "@/api/services/lesson.service";
import { CreateLessonPayload, LessonResponse } from "@/types/lesson.type";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetLessons = (
	options?: Omit<UseQueryOptions<LessonResponse[]>, "queryKey" | "queryFn">,
) => {
	return useQuery<LessonResponse[]>({
		...options,
		queryKey: ["lessons"],
		queryFn: lessonApi.getLessons,
	});
};
export const useGetLessonBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<LessonResponse>, "queryKey" | "queryFn">,
) => {
	return useQuery<LessonResponse>({
		...options,
		queryKey: ["Lesson-by-slug", slug],
		queryFn: () => lessonApi.getLessonBySlug(slug),
		enabled: !!slug,
	});
};
export const useCreateLesson = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: CreateLessonPayload) => {
			return lessonApi.createLesson(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons"] });
			queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});
};
export const useUpdateLesson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: lessonApi.updateLesson,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["lessons"],
			});
			queryClient.invalidateQueries({
				queryKey: ["sections"],
			});
		},
	});
};
export const useDeleteLesson = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return lessonApi.deleteLesson(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lessons"] });
			queryClient.invalidateQueries({
				queryKey: ["sections"],
			});
		},
	});
};
export const useReorderLesson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: lessonApi.reorderLesson,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["sections"],
			});
		},
	});
};
