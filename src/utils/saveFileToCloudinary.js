import cloudinary from 'cloudinary';
import { unlink } from 'node:fs/promises';

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.v2.config({
    secure: true,
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.v2.uploader.upload(file.path)
    await unlink(file.path);
    return response.secure_url;
}