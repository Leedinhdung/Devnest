import { categoryApi } from "@/api/services/category.service";
import { CategoryPayload, CategoryResponse } from "@/types/category.type";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetCategories = (
	options?: Omit<UseQueryOptions<CategoryResponse[]>, "queryKey" | "queryFn">,
) => {
	return useQuery<CategoryResponse[]>({
		...options,
		queryKey: ["categories"],
		queryFn: categoryApi.getCategories,
	});
};
export const useGetCategoryBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<CategoryResponse>, "queryKey" | "queryFn">,
) => {
	return useQuery<CategoryResponse>({
		...options,
		queryKey: ["category-by-slug", slug],
		queryFn: () => categoryApi.getCategoryBySlug(slug),
		enabled: !!slug,
	});
};
export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: CategoryPayload) => {
			return categoryApi.createCategory(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			slug,
			...data
		}: { slug: string } & CategoryPayload) => {
			return categoryApi.updateCategory(slug, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return categoryApi.deleteCategory(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
