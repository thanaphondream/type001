import cloudinary from '../config/cloudinary'; 

const CloudUpload = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url; 
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default CloudUpload;
