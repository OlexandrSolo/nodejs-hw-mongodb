import cloudinary from 'cloudinary';

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.v2.config({
    secure: true,
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.v2.upload(file.path)
    await fs.unlink(file.path);
    return response.secure_url;
}