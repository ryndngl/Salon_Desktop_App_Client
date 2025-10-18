import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import StylePreviewModal from './StylePreviewModal';
import { uploadToCloudinary, validateImage } from '../ServicesComponents/cloudinaryUpload';

const AddStyleModal = ({ isOpen, onClose, serviceName, categoryName, onStyleAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image first
      const validation = validateImage(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.image || !formData.name || !formData.price) {
      alert('Please fill in all required fields (Image, Name, Price)');
      return;
    }

    // Open preview modal instead of direct save
    setIsPreviewOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsLoading(true);
    try {
      console.log('Starting upload process...');
      
      // Step 1: Upload image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(formData.image);
      console.log('Image uploaded successfully:', cloudinaryUrl);

      // Step 2: Save style with Cloudinary URL
      // TODO: API call to save style to database
      const styleData = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image: cloudinaryUrl, // ← Cloudinary URL
        serviceName,
        categoryName
      };
      
      console.log('Style data to save:', styleData);
      // await servicesAPI.addStyle(styleData);

      alert('Style added successfully! Image uploaded to Cloudinary.');

      // Call callback
      if (onStyleAdded) {
        onStyleAdded();
      }

      // Reset and close
      setFormData({ name: '', price: '', description: '', image: null });
      setImagePreview(null);
      setIsPreviewOpen(false);
      onClose();
    } catch (error) {
      console.error('Error adding style:', error);
      alert('Failed to add style: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed bg-black bg-opacity-70 flex items-center justify-center z-[70] p-4"
      style={{ 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Style</h2>
            <p className="text-sm text-gray-600 mt-1">
              {serviceName} {categoryName && `- ${categoryName}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Side - Form Inputs */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Details</h3>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style Image <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Style Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Buzz Cut, High Fade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">₱</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the style..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Side - Card Preview (Mobile App Style) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Preview</h3>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
                {/* Image Preview */}
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-gray-300" />
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Name and Price Row */}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {formData.name || 'Style Name'}
                    </h4>
                    <span className="text-base font-bold text-red-600">
                      ₱{formData.price || '100'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 min-h-[40px] line-clamp-2">
                    {formData.description || 'Style description will appear here...'}
                  </p>

                  {/* Bottom Row - Heart and Book Now */}
                  <div className="flex items-center justify-center gap-3 mt-3">
                    {/* Heart Icon */}
                    <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                      <svg 
                        className="w-6 h-6 text-gray-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </button>

                    {/* Book Now Button */}
                    <button className="flex-1 bg-green-700 text-white font-bold py-2.5 px-6 rounded-full text-sm uppercase tracking-wide hover:bg-green-800 transition-colors">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> This preview shows how the card will appear in the mobile app. The heart icon is for favorites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.image || !formData.name || !formData.price || isLoading}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              formData.image && formData.name && formData.price && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add Style'}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <StylePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onConfirm={handleConfirmSave}
        styleData={{
          ...formData,
          imagePreview
        }}
        serviceName={serviceName}
        categoryName={categoryName}
      />
    </div>
  );
};

export default AddStyleModal;