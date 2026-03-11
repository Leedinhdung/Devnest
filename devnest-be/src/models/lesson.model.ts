import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
	{
		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},

		section_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
			required: true,
		},

		title: {
			type: String,
			required: true,
			trim: true,
		},

		slug: {
			type: String,
			unique: true,
		},
		description: String,

		lesson_type: {
			type: String,
			enum: ["video", "article"],
			required: true,
		},

		video_url: { type: String, default: "" },

		content: { type: String, default: "" },

		duration: {
			type: String,
			default: "",
		},

		is_preview: {
			type: Boolean,
			default: false,
		},

		order_index: {
			type: Number,
			default: 0,
		},
		is_deleted: {
			type: Boolean,
			default: false,
		},
		deleted_at: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

lessonSchema.index({ course_id: 1, section_id: 1 });
export default mongoose.model("Lesson", lessonSchema);
