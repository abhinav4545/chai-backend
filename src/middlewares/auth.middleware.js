import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async(req,rex, next) => {
    try {
        //manlo user mobile se req. bhej rha ho
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const dekodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(dekodedToken?._id).select("-password -refreshToken")
    
        if(!user) {
            //todo: discuss about frontend
            throw new ApiError(401, "Invalid access token")
        }
    
        //ab user hai to kya krenge
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message ||  "Invalid access token")
    }
})