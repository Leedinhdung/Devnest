import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
	},
     description: {
      type: String,
    },

    thumbnail: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },

    sale_price: {
      type: Number,
      default: 0,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    students: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
