import express from "express";
import { createTour, getMyTours, deleteTour } from "../controllers/tourcontroller.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js"; // Assuming you use auth

const router = express.Router();

router.post("/", auth, upload.single("image"), createTour); // ✅ Fix here
router.get("/my-tours", auth, getMyTours);
router.delete("/:id", auth, deleteTour);

export default router;
