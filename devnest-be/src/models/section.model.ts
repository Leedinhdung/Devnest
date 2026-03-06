import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
	{
		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},

		title: {
			type: String,
			required: true,
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
sectionSchema.index({ course_id: 1 });
export default mongoose.model("Section", sectionSchema);
