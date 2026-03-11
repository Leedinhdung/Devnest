import {
	createSectionService,
	deleteSectionService,
	getSectionByIdService,
	getSectionsService,
	reorderSectionsService,
	restoreSectionService,
	updateSectionService,
} from "@/services/section.service.js";
import { Request, Response } from "express";

export const createSection = async (req: Request, res: Response) => {
	try {
		const section = await createSectionService(req.body);

		res.json({
			message: "Section created",
			data: section,
		});
	} catch (error) {
		res.status(500).json({ message: "Create section failed" });
	}
};
export const getSections = async (req: Request, res: Response) => {
	try {
		const sections = await getSectionsService();

		res.json(sections);
	} catch (error) {
		res.status(500).json({ message: "Get sections failed" });
	}
};
export const getSectionById = async (req: Request, res: Response) => {
	try {
		const sectionId = req.params.id as string;
		const section = await getSectionByIdService(sectionId);
		res.json(section);
	} catch (error) {
		res.status(500).json({ message: "Get sections detail failed" });
	}
};
export const updateSection = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const section = await updateSectionService(id, req.body);

		res.json({
			message: "Section updated",
			data: section,
		});
	} catch (error) {
		res.status(500).json({ message: "Update failed" });
	}
};
export const deleteSection = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		const section = await deleteSectionService(id);

		res.json({
			message: "Section deleted",
			data: section,
		});
	} catch (error) {
		res.status(500).json({ message: "Delete failed" });
	}
};
export const restoreSection = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as string;
		await restoreSectionService(id);
		res.json({
			message: "Section restore success",
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
export const reorderSections = async (req: Request, res: Response) => {
	try {
		const sections = req.body;
		await reorderSectionsService(sections);
		res.json({
			message: "Sections reordered successfully",
		});
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		});
	}
};
