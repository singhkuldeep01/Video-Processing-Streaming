import express from "express";
const router = express.Router();
import { signup, signin, refresh, logout, logoutAll } from "../../controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", refresh);
router.post("/logout", authenticate, logout);
router.post("/logout-all", authenticate, logoutAll);

export default router;