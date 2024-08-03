import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//read documentation thoughly
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

})) 

//json accept krne ka method, pehle aap json easily nhi le pate, aapko 
//body parser use krna pdeta tha

//ye to form bhara tb data liya
app.use(express.json({limit: "16kb"}))

//jb url se data aaye
app.use(express.urlencoded({extended: true, limit:"16kb"}))

//static: kai baar ham kuch file/folder store krvana chashte hai: pdf file, image
app.use(express.static("public"))

//for cookies
app.use(cookieParser())


//routes import

import userRouter from './routes/user.routes.js'

//routes declaration:  pehle ham app.get se hi kaam chala rha the, yahin routes likhte the, yahin controllers
//pr ab chien seprate krdi hain toh , router ko ham alg niakl le gye hain
//to router ko laane ke liye middleware laana pdega
app.use("/api/v1/users", userRouter)
//jese hi koi /user type krega to ham control de denge userrouter ka

//ab url bn jaega : https://localhost:8000/api/v1/users/register
export { app } 