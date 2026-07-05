import express from "express";
const router = express.Router();
import videoRoutes from "./video.route";
import authRoutes from "./auth.route";

// Define your API routes here
router.use("/video", videoRoutes);
router.use("/auth", authRoutes);

export default router;
