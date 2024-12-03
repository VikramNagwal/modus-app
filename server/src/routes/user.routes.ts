import { Router } from "express";
import { signupUser } from "../controllers/users.controller";

const router = Router();

router.route("/signup")
.post(signupUser)

export default router;