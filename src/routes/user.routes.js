import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares.multer.middleware.js"

//method run kb ho: koi url hit ho tb run krna chahiye
const router = Router()

router.route("/register").post(
    //feilds accept array
    upload.feilds([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }

    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured route
//middleware bhi inject kar diya
router.route('/logout').post(verifyJWT, logoutUser)

export default router