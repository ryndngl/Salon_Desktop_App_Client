// StyleCard.jsx
import { Edit, Power, Trash2, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import EditServiceModal from "./EditServiceModal";
import ToggleServiceModal from "./ToggleServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import { servicesAPI } from "../../../../services/api.js";

const StyleCard = ({ style, serviceId, categoryName, onUpdate }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(style.isActive !== false);
  const [isOnSale, setIsOnSale] = useState(style.isOnSale || false);
  const [loading, setLoading] = useState(false);

  const hasMultipleImages =
    Array.isArray(style.images) && style.images.length > 1;
  const imageUrl =
    Array.isArray(style.images) && style.images.length > 0
      ? style.images[0]
      : style.image;
  const allImages = hasMultipleImages ? style.images : [imageUrl];

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleToggleClick = () => {
    setToggleModalOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
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
        description: updatedStyle.description,
        isOnSale: updatedStyle.isOnSale,
      }
    );

    if (result.success) {
      setIsOnSale(updatedStyle.isOnSale);
      setSuccessMessage('Style updated successfully!');
      setSuccessModalOpen(true);
      setEditModalOpen(false);

      //
      setTimeout(() => {
        if (onUpdate) onUpdate();
      }, 1500);
    } else {
      alert("Failed to update style: " + result.message);
    }
  } catch (error) {
    console.error("Error updating style:", error);
    alert("Error updating style: " + error.message);
  } finally {
    setLoading(false);
  }
};

  const handleToggleConfirm = async () => {
    try {
      setLoading(true);
      const result = await servicesAPI.toggleStyle(
        serviceId,
        categoryName,
        style.id
      );

      if (result.success) {
        setIsActive(!isActive);
        setSuccessMessage(result.message);
        setSuccessModalOpen(true);
        setToggleModalOpen(false);

        if (onUpdate) onUpdate();
      } else {
        alert("Failed to toggle style: " + result.message);
      }
    } catch (error) {
      console.error("Error toggling style:", error);
      alert("Error toggling style: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
  try {
    setLoading(true);
    const result = await servicesAPI.deleteStyle(
      serviceId,
      categoryName,
      style.id
    );

    if (result.success) {
      setSuccessMessage('Style deleted successfully!');
      setSuccessModalOpen(true);
      setDeleteModalOpen(false);
      setTimeout(() => {
        if (onUpdate) onUpdate();
      }, 1500);
    } else {
      alert("Failed to delete style: " + result.message);
    }
  } catch (error) {
    console.error("Error deleting style:", error);
    alert("Error deleting style: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div
          className="relative w-full bg-gray-100 cursor-pointer hover:opacity-95 transition-opacity"
          style={{ paddingBottom: "100%" }}
          onClick={handleImageClick}
        >
          {hasMultipleImages ? (
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
            <img
              src={imageUrl}
              alt={style.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            {isOnSale && isActive && (
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                SALE
              </div>
            )}

            {!isActive && (
              <div className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Disabled
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-semibold text-gray-900 text-lg mb-1 truncate">
            {style.name}
          </h4>

          <div className="flex items-center gap-2 mb-2">
            <p
              className={`font-bold text-xl ${isOnSale ? "text-orange-600" : "text-green-600"}`}
            >
              {style.price}
            </p>
            {isOnSale && (
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                On Sale
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
            {style.description}
          </p>

          <div className="flex items-center gap-2 pt-3 border-t">
            <button
              onClick={handleEditClick}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={16} />
              <span className="font-medium text-sm">Edit</span>
            </button>

            <button
              onClick={handleToggleClick}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              <Power size={16} />
              <span className="font-medium text-sm">
                {isActive ? "Disable" : "Enable"}
              </span>
            </button>

            <button
              onClick={handleDeleteClick}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

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

      <DeleteServiceModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        service={style}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />

      {successModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
            <button
              onClick={() => setSuccessModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>

              <button
                onClick={() => setSuccessModalOpen(false)}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {imageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {hasMultipleImages ? (
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
              <img
                src={imageUrl}
                alt={style.name}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-xl">{style.name}</h3>
                {isOnSale && (
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    SALE
                  </span>
                )}
              </div>
              <p
                className={`font-bold text-lg ${isOnSale ? "text-orange-400" : "text-green-400"}`}
              >
                {style.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleCard;