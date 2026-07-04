import express from "express";
const router = express.Router();

// Define your API routes here
router.get("/upload-intent", (req, res) => {
  res.json({ message: "This is upload intent route" });
});

export default router;