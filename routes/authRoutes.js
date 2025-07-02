import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ Add this route
router.get("/profile", protect, (req, res) => {
  res.json(req.user); // will return { _id, name, email, ... }
});

export default router;
