import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

//method run kb ho: koi url hit ho tb run krna chahiye
const router = Router()

router.route("/register").post(registerUser)

export default router