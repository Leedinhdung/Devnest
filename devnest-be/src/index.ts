import connectDatabase from "@/configs/database.js";
import router from "@/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
await connectDatabase();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
