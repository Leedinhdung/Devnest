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
sectionSchema.virtual("lessons", {
	ref: "Lesson",
	localField: "_id",
	foreignField: "section_id",
	justOne: false,
});
sectionSchema.set("toObject", { virtuals: true });
sectionSchema.set("toJSON", { virtuals: true });
sectionSchema.index({ course_id: 1 });
export default mongoose.model("Section", sectionSchema);
