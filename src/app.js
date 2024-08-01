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




export { app } 