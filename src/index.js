//require('dotenv').config({path: './env'})
import dotenv from "dotenv" 
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()








/*
import express from 'express'
const app = express()

;( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error", () => {
        console.log("ERROR ", error);
        throw error
       })

       app.listen(process.env.port, () => {
        console.log(`App is listenig on Port ${process.env.PORT}`);
       })
    } catch (error) {
        console.error("ERROR", error)
        throw error
    }
}) () 
*/
//semicolon is for cleaning purpose

