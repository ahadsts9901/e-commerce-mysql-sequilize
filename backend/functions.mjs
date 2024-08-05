import "dotenv/config"
import jwt from "jsonwebtoken"
import { initialSessionInDays } from "./core.mjs"
import multer, { diskStorage } from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const storageConfig = diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        console.log("mul-file: ", file);
        cb(null, `image-${new Date().getTime()}-${file.originalname}`)
    }
})

export const upload = multer({ storage: storageConfig })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {

    try {

        if (!localFilePath) {
            console.log("no file");
            return null
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        fs.unlink(localFilePath, (unlinkError) => {
            if (unlinkError) {
                console.error("Error removing local file:", unlinkError);
            }
        });

        return response?.url;

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export const issueLoginToken = async (user, res) => {

    const hart = jwt.sign(user, process.env.JWT_KEY, {
        expiresIn: `${initialSessionInDays}d`
    });

    res.cookie('hart', hart, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + initialSessionInDays * 24 * 60 * 60 * 1000)
    });

}