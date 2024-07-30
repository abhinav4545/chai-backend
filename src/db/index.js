import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB HOST: 
            ${connectionInstance.connection.host}`);
            //isko print karake dekhna kya kya hota hai isme
    } catch (error) {
        console.log("MONGODB connection error", error);
        //nodejs aapko acess deta hai process ka:
        // jo hamari curr. application chl rhi hai
        // vo ek nye process pe chl rhi hai, ye uska refrence hai 
        process.exit(1)
        //different no_codes for exit
    }
}
//ye hogya DB ka connection

export default connectDB