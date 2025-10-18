import axios from 'axios';

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'dyw0qxjzn';
const CLOUDINARY_UPLOAD_PRESET = 'salon_styles';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Upload image to Cloudinary
 */
export const uploadToCloudinary = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'salon-services');

    console.log('Uploading image to Cloudinary...');
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });

    const imageUrl = response.data.secure_url;
    console.log('Upload successful! Image URL:', imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    
    if (error.response) {
      console.error('Cloudinary error:', error.response.data);
      throw new Error(`Upload failed: ${error.response.data.error.message}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach Cloudinary');
    } else {
      throw new Error('Upload failed: ' + error.message);
    }
  }
};

/**
 * Validate image file before upload
 */
export const validateImage = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG, JPEG, and PNG files are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true, error: null };
};

export default {
  uploadToCloudinary,
  validateImage
};