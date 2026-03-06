import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},

		rating: {
			type: Number,
			min: 1,
			max: 5,
		},

		comment: String,
	},
	{
		timestamps: true,
	},
);
reviewSchema.index({ course_id: 1 });
export default mongoose.model("CourseReview", reviewSchema);
