import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		slug: {
			type: String,
			unique: true,
		},

		short_description: String,

		description: String,

		thumbnail: String,

		intro_video: String,

		category_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},

		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		level: {
			type: String,
			enum: ["beginner", "intermediate", "advanced"],
		},

		price: {
			type: Number,
			default: 0,
		},

		discount_price: Number,

		requirements: [String],

		learning_outcomes: [String],

		tags: [String],

		total_duration: {
			type: Number,
			default: 0,
		},

		total_lessons: {
			type: Number,
			default: 0,
		},

		total_students: {
			type: Number,
			default: 0,
		},

		rating_avg: {
			type: Number,
			default: 0,
		},

		rating_count: {
			type: Number,
			default: 0,
		},

		views: {
			type: Number,
			default: 0,
		},

		status: {
			type: String,
			enum: ["draft", "published"],
			default: "draft",
		},
	},
	{
		timestamps: true,
	},
);
courseSchema.index({ slug: 1 });
export default mongoose.model("Course", courseSchema);
