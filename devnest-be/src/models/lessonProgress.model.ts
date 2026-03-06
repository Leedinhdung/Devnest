import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		lesson_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Lesson",
		},

		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},

		is_completed: {
			type: Boolean,
			default: false,
		},

		watched_seconds: Number,
	},
	{
		timestamps: true,
	},
);
lessonProgressSchema.index({ user_id: 1, lesson_id: 1 });
export default mongoose.model("LessonProgress", lessonProgressSchema);
