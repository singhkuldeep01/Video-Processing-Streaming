import { uploadIntentVideoController } from "@/controllers/video.controller";
import express from "express";
const router = express.Router();

// Define your API routes here
router.get("/" , (req, res) => {
  res.json({ message: "Welcome to the Video Processing API" });
});

router.post("/upload-intent",uploadIntentVideoController);

export default router;