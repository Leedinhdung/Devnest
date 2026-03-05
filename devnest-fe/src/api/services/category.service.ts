import { categoryUri } from "@/api/uris/category";
import axiosClient from "@/configs/axiosClient";
import { CategoryPayload, CategoryResponse } from "@/types/category.type";

export const categoryApi = {
	getCategories: async (): Promise<CategoryResponse[]> => {
		return axiosClient.get(categoryUri.GET_CATEGORIES);
	},
	createCategory: async (data: CategoryPayload): Promise<CategoryResponse> => {
		return axiosClient.post(categoryUri.CREATE, data);
	},
	getCategoryBySlug: async (slug: string): Promise<CategoryResponse> => {
		return axiosClient.get(categoryUri.GET_CATEGORY_BY_SLUG(slug));
	},
	updateCategory: async (
		slug: string,
		data: CategoryPayload,
	): Promise<CategoryResponse> => {
		return axiosClient.put(categoryUri.UPDATE(slug), data);
	},
	deleteCategory: async (slug: string): Promise<CategoryResponse> => {
		return axiosClient.delete(categoryUri.DELETE(slug));
	},
};
