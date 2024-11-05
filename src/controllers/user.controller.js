import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "...utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async(userId) => {
    try {
       const user = await  User.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()

       user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})

       return {accessToken, refreshToken}
    
    } catch (error) {
        throw new ApiError(500, "Something went worng while generating refresh and access token") 
            
    }
}
const registerUser = asyncHandler( async (req,res) => {
    //  res.status(200).json({
    //     message: "ok" 
    // })

//Algorithm:
    //step1: get user detailsfrom frontend
    //step2: validation -not empty, sahi format
    //step3: check if user already exits: username, email se
    // check for images and avatar
    //upload them on cloudinary, avatar
    //create user object - create entry in db 
    //remove password & refreh token feild from response
     // check for user creation
     //return response

     const {fullname, email, username, password} = req.body
     console.log("email:", email); 

    //  if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    //  }
    //ye method hai ek ek krke check krne ka

    //direct tareeka
    if (
        [fullname, email, username, password].some((feild) => feild?.trim() === "")
        //some main check kr skte ho condition lgake: true, false return krega
    ) {
        throw new ApiError(400, "All feilds are required")
    } 

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exits")
    }
    //console.log((req.files));
    

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //isko print krake dekho ki kis trh se req.files ka obj aata hai, kya kya chije deta hai
    
    //const coverImageLocalPath = req.files.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    } 



    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    } 

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //corner cases, nhi to code fatega
        email,
        password,
        username: username.toLowerCase()
    })

    //agr user mil gya to create hua hai nhi to nhi hua 
   const createdUser = await User.findById(user._id).select(
    //ham yahan vo select krte hai jo nahi chahiye
    "-password -refreshToken"
    
   )

   if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered succesfully") 
   )

})

const loginUser = asyncHandler(async (req, res) => {
//todos:  req body -> data
//username or eamil
//find the user
//password check
//access and refresh token
//send cookie(secure)//
//resp. bhejdo: sucesfully login

const {email, username, password} = req.body

if(!username || !email) {
    throw new ApiError(400, "username or password is required")
}

const user = await User.findOne({
    $or: [{username}, {email}]
})

if(!user) {
    throw new ApiError(404, "User does not exist")
}

//User: mongoose ka ek obj hai: isme mongoose ke methods
// milte hain, for ex: findone ,updateeone
const isPasswordValid = await user.isPasswordCorrect(password)

if(!isPasswordValid) {
    throw new ApiError(404, "Invalid Password")
}


   const {accessToken, refreshToken} = await 
   generateAccessAndRefreshTokens(user._id)

   //optional step
   const loggedInUser = User.findById(user._id)
   select("-password -refreshToken")

   //cookies bhejni hai
   const options = {
    httpOnly: true,
    secure: true
    // ye cookies ab server se sirf modifiedable hai
   }

   return res
   .status(200)
   .cookie("accessToken", 
    accessToken, options)
    .cookie("refreshToken", refreshToken, options )
    .json(
        new ApiResponse(
            200,
            //ye niche data hai
            {
              user: loggedInUser, accessToken, 
              refreshToken  
            },
            "User logged in succesfully"
        )
    )


})

const logoutUser = asyncHandler(async(req, res) => {
    User.findById
})


export {
    registerUser,
    loginUser,
    logoutUser
}
