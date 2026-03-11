
import { sectionApi } from "@/api/services/section.service";
import {  CreateSectionPayload, SectionResponse } from "@/types/section.type";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetSections = (
	options?: Omit<UseQueryOptions<SectionResponse[]>, "queryKey" | "queryFn">,
) => {
	return useQuery<SectionResponse[]>({
		...options,
		queryKey: ["sections"],
		queryFn: sectionApi.getSections,
	});
};
export const useGetSectionById = (
	id: string,
	options?: Omit<UseQueryOptions<SectionResponse>, "queryKey" | "queryFn">,
) => {
	return useQuery<SectionResponse>({
		...options,
		queryKey: ["section-by-id", id],
		queryFn: () => sectionApi.getSectionById(id),
		enabled: !!id,
	});
};
export const useCreateSection = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: CreateSectionPayload) => {
			return sectionApi.createSection(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});
};
export const useUpdateSection = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: sectionApi.updateSection,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["sections"],
			});
		},
	});
};
export const useDeleteSection = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return sectionApi.deleteSection(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});
};
