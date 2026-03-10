import sectionModel from "@/models/section.model.js";
import {
	CreateSectionPayload,
	UpdateSectionPayload,
} from "@/types/section.type.js";

export const createSectionService = async (data: CreateSectionPayload) => {
	const lastSection = await sectionModel
		.findOne({
			course_id: data.course_id,
			deleted_at: null,
		})
		.sort({ order_index: -1 });

	const order_index = lastSection ? lastSection.order_index + 1 : 1;

	const section = await sectionModel.create({
		...data,
		order_index,
	});

	return section;
};

export const getSectionsService = async () => {
	const sections = await sectionModel
		.find({
			deleted_at: null,
		})
		.populate({
			path: "lessons",
			match: { is_deleted: false },
			options: { sort: { order_index: 1 } },
		})
		.sort({ order_index: 1 });

	return sections;
};
export const getSectionByIdService = async (sectionId: string) => {
	const section = await sectionModel.findOne({
		_id: sectionId,
		delete_at: null,
	});
	return section;
};
export const updateSectionService = async (
	sectionId: string,
	data: UpdateSectionPayload,
) => {
	const section = await sectionModel.findByIdAndUpdate(sectionId, data, {
		returnDocument: "after",
	});
	if (!section) {
		throw new Error("Section not found");
	}
	return section;
};
export const deleteSectionService = async (sectionId: string) => {
	return sectionModel.findByIdAndUpdate(
		sectionId,
		{ deleted_at: new Date(), is_deleted: true },
		{ returnDocument: "after" },
	);
};
export const restoreSectionService = async (sectionId: string) => {
	const section = await sectionModel.findByIdAndUpdate(
		sectionId,
		{ is_deleted: false, deleted_at: null },
		{ returnDocument: "after" },
	);

	if (!section) {
		throw new Error("Section not found");
	}

	return section;
};
export const reorderSectionsService = async (
	sections: { id: string; order_index: number }[],
) => {
	const bulkOps = sections.map((section) => ({
		updateOne: {
			filter: { _id: section.id },
			update: { order_index: section.order_index },
		},
	}));
	await sectionModel.bulkWrite(bulkOps);
};
