import { sectionUri } from "@/api/uris/section";
import axiosClient from "@/configs/axiosClient";
import { CreateSectionPayload, SectionResponse } from "@/types/section.type";

export const sectionApi = {
	getSections: async (): Promise<SectionResponse[]> => {
		return axiosClient.get(sectionUri.GET_SECTION);
	},
	createSection: async (
		data: CreateSectionPayload,
	): Promise<SectionResponse> => {
		return axiosClient.post(sectionUri.CREATE, data);
	},
	getSectionById: async (id: string): Promise<SectionResponse> => {
		return axiosClient.get(sectionUri.GET_SECTION_BY_ID(id));
	},
	updateSection: async ({
		id,
		title,
	}: {
		id: string;
		title: string;
	}): Promise<SectionResponse> => {
		return axiosClient.put(sectionUri.UPDATE(id), { title });
	},
	deleteSection: async (id: string): Promise<SectionResponse> => {
		return axiosClient.delete(sectionUri.DELETE(id));
	},
	reorderSection: async (data: { id: string; order_index: number }[]) => {
		return axiosClient.patch(sectionUri.REORDER, data);
	},
};
