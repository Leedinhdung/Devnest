import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectDatabase = async () => {
	const MONGO_DB = process.env.MONGO_URI;
	if (!MONGO_DB) {
		throw new Error("MONGO_URI is not defined");
	}
	try {
		await mongoose.connect(MONGO_DB);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
	}
};
export default connectDatabase;
