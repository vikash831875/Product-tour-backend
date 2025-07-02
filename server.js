import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import path from "path";
import fs from "fs"; // ✅ NEW
import { fileURLToPath } from "url";

// Setup filename and dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // ✅ Load .env
connectDB();     // ✅ Connect to MongoDB

const app = express(); // ✅ MUST come before any app.use()

app.use(cors());
app.use(express.json());

// ✅ Automatically create uploads folder if missing
const uploadsDir = path.join(__dirname, "/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("📁 Created missing uploads folder");
}

// ✅ Serve static files from uploads folder
app.use("/uploads", express.static(uploadsDir));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
