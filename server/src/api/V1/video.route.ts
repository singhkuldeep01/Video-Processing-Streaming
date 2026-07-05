import { uploadIntentVideoController } from "@/controllers/video.controller";
import { authenticate } from "@/middleware/auth.middleware";
import express from "express";
const router = express.Router();

// Define your API routes here
router.get("/" , (req, res) => {
  res.json({ message: "Welcome to the Video Processing API" });
});

router.use(authenticate);

router.post("/upload-intent", uploadIntentVideoController);

export default router;