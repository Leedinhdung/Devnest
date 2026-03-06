import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		course_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Wishlist", wishlistSchema);
