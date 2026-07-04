import express from "express";
const router = express.Router();
import v1Routes from "./V1/index";

router.use("/v1", v1Routes);

export default router;