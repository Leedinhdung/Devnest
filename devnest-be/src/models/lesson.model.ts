import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
	{
		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},

		section_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},

		title: {
			type: String,
			required: true,
		},

		slug: String,

		lesson_type: {
			type: String,
			enum: ["video", "article"],
		},

		video_url: String,

		content: String,

		duration: Number,

		is_preview: {
			type: Boolean,
			default: false,
		},

		order_index: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);
lessonSchema.index({ course_id: 1 });
lessonSchema.index({ section_id: 1 });
export default mongoose.model("Lesson", lessonSchema);
