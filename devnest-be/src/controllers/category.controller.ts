import categoryModel from "@/models/category.model.js";
import { Request, Response } from "express";
import slugify from "slugify";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const exist = await categoryModel.findOne({ name });
		if (exist) {
			return res.status(400).json({
				message: "Category already exists",
			});
		}
		const category = await categoryModel.create({
			name,
			slug: slugify(name, { lower: true, strict: true }),
			description,
		});
		res.status(201).json(category);
	} catch (error) {
		res.status(500).json({
			message: "Create category failed",
		});
	}
};
export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories = await categoryModel
			.find({ isDeleted: false })
			.sort({ createdAt: -1 });
		res.json(categories);
	} catch (error) {
		res.status(500).json({
			message: "Get categories failed",
		});
	}
};
export const getCategoryBySlug = async (req: Request, res: Response) => {
	try {
		const category = await categoryModel.findOne({
			slug: req.params.slug,
		});
		if (!category) {
			return res.status(404).json({
				message: "Category not found",
			});
		}
		res.json(category);
	} catch (error) {
		res.status(500).json({
			message: "Get category failed",
		});
	}
};
export const updateCategory = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const { slug } = req.params;

		const category = await categoryModel.findOneAndUpdate(
			{ slug },
			{
				name,
				slug: slugify(name, { lower: true }),
				description,
			},
			{ new: true },
		);

		if (!category) {
			return res.status(404).json({
				message: "Category not found",
			});
		}

		res.json(category);
	} catch (error) {
		res.status(500).json({
			message: "Update category failed",
		});
	}
};
export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug;
		const category = await categoryModel.findOneAndUpdate({ slug });

		if (!category) {
			return res.status(404).json({
				message: "Category not found",
			});
		}

		category.isDeleted = true;
		category.deletedAt = new Date();

		await category.save();

		res.json({
			message: "Category deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Delete category failed",
		});
	}
};
export const restoreCategory = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug;
		const category = await categoryModel.findOneAndUpdate({ slug });

		if (!category) {
			return res.status(404).json({
				message: "Category not found",
			});
		}

		category.isDeleted = false;
		category.deletedAt = null;

		await category.save();

		res.json({
			message: "Category restored successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Restore category failed",
		});
	}
};
