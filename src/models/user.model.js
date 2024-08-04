import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //Database ki searching main ka jayega & optimised trika hai
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
            
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,

        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is requied"]
        },
        refreshToken: {
            type: String
        }

},
{
    timestamps: true
}
) 

//pehla hook
userSchema.pre("save", async function (next) {
    //modified nhi hua hai
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10) //10 rounds
    next()
})

//custom method
userSchema.methods.isPasswordCorrect = async function
(password){
    //check pass. logic
    return await bcrypt.compare(password, this.password)
    //ye apko true ya false deta hai
}

//access token generate krne ka method: dono hi jwt token hai
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        //payload: main info
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateFreshToken = function() {
    return jwt.sign(
        //payload: main info
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}
export const User = mongoose.model("User", userSchema)

