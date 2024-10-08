import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloud
       const response = await cloudinary.uploader.upload(localFilePath, {
           resource_type: "auto"
           //upload ke andar bhut chije de skte hain, 
        //like public_id, name: read on cloudinary website
        })
        //file has been uploaded succesfully
        console.log("File is uploaded on cloudinary",
         response.url);
         //file succesfully upload ho gyi to unlink kr do
         fs.unlinkSync(localFilePath)
         return response

    } 
    catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved 
        //temporary file as the upload operations got failed

        return null
        
    }
}

export {uploadOncloudinary}