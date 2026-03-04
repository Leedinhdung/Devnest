import cors from "cors";
import express from "express";
import router from "@/routes/index.js";
import dotenv from "dotenv";
import connectDatabase from "@/configs/database.js";
import { authorize, protect } from "@/middlewares/auth.midleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/api", router);
await connectDatabase();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
