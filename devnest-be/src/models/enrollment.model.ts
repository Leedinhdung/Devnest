import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},

		price_paid: Number,

		progress: {
			type: Number,
			default: 0,
		},

		completed_at: Date,
	},
	{
		timestamps: true,
	},
);
enrollmentSchema.index({ user_id: 1, course_id: 1 });
export default mongoose.model("Enrollment", enrollmentSchema);
