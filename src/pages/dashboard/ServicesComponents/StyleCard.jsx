import { Edit, Power, X } from 'lucide-react';
import { useState } from 'react';
import EditServiceModal from './EditServiceModal';
import ToggleServiceModal from './ToggleServiceModal';
import { servicesAPI } from '../../../../services/api.js';

const StyleCard = ({ style, serviceId, categoryName }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(style.isActive !== false);
  const [loading, setLoading] = useState(false);

  // Handle multiple images (for Foot Spa Package) or single image
  const hasMultipleImages = Array.isArray(style.images) && style.images.length > 1;
  const imageUrl = (Array.isArray(style.images) && style.images.length > 0) 
    ? style.images[0] 
    : style.image;
  const allImages = hasMultipleImages ? style.images : [imageUrl];

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleToggleClick = () => {
    setToggleModalOpen(true);
  };

  const handleImageClick = () => {
    setImageModalOpen(true);
  };

  const handleSaveEdit = async (updatedStyle) => {
    try {
      setLoading(true);
      
      const result = await servicesAPI.updateStyle(
        serviceId,
        categoryName,
        updatedStyle.id,
        {
          price: updatedStyle.price,
          description: updatedStyle.description
        }
      );

      if (result.success) {
        console.log('Style updated:', result.data);
        alert('Style updated successfully!');
        setEditModalOpen(false);
      } else {
        alert('Failed to update style: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating style:', error);
      alert('Error updating style: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleConfirm = async () => {
    try {
      setLoading(true);
      const result = await servicesAPI.toggleStyle(serviceId, categoryName, style.id);

      if (result.success) {
        setIsActive(!isActive);
        console.log('Style toggled:', result.data);
        alert(result.message);
      } else {
        alert('Failed to toggle style: ' + result.message);
      }
    } catch (error) {
      console.error('Error toggling style:', error);
      alert('Error toggling style: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        {/* Image - Clickable */}
        <div 
          className="relative w-full bg-gray-100 cursor-pointer hover:opacity-95 transition-opacity"
          style={{ paddingBottom: '100%' }}
          onClick={handleImageClick}
        >
          {hasMultipleImages ? (
            // Multiple images grid (for Foot Spa Package)
            <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
              {style.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${style.name} ${idx + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              ))}
            </div>
          ) : (
            // Single image
            <img
              src={imageUrl}
              alt={style.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Status Badge */}
          {!isActive && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
              Disabled
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name */}
          <h4 className="font-semibold text-gray-900 text-lg mb-1 truncate">
            {style.name}
          </h4>

          {/* Price */}
          <p className="text-green-600 font-bold text-xl mb-2">
            {style.price}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
            {style.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t">
            <button
              onClick={handleEditClick}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={16} />
              <span className="font-medium">Edit</span>
            </button>
            
            <button
              onClick={handleToggleClick}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <Power size={16} />
              <span className="font-medium">{isActive ? 'Disable' : 'Enable'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditServiceModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        service={style}
        onSave={handleSaveEdit}
        loading={loading}
      />

      <ToggleServiceModal
        isOpen={toggleModalOpen}
        onClose={() => setToggleModalOpen(false)}
        service={{ ...style, isActive }}
        onConfirm={handleToggleConfirm}
        loading={loading}
      />

      {/* Image Fullscreen Modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X size={32} />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {hasMultipleImages ? (
              // Multiple images
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2">
                  {allImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${style.name} ${idx + 1}`}
                      className="w-full h-auto object-contain rounded"
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Single image
              <img
                src={imageUrl}
                alt={style.name}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            )}
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <h3 className="text-white font-bold text-xl">{style.name}</h3>
              <p className="text-green-400 font-bold text-lg">{style.price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleCard;