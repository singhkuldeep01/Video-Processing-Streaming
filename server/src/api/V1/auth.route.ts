import express from "express";
const router = express.Router();
import { signup, signin, refresh, logout } from "../../controllers/auth.controller";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", refresh);
router.post("/logout", logout);
export default router;