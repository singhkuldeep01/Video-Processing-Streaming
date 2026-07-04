import express from "express";
const router = express.Router();
import videoRoutes from "./video.route";

// Define your API routes here
router.use("/video", videoRoutes);

export default router;
