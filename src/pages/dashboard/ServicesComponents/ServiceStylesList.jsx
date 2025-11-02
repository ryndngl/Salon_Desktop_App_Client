// ServiceStylesList.jsx
import { Edit, Power, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import EditServiceModal from './EditServiceModal';
import ToggleServiceModal from './ToggleServiceModal';
import { servicesAPI } from "../../../../services/api.js";

const ServiceStylesList = ({ styles, serviceId, categoryName }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [stylesStatus, setStylesStatus] = useState(() => {
    const initialStatus = {};
    styles.forEach(style => {
      initialStatus[style.id] = style.isActive !== false;
    });
    return initialStatus;
  });
  const [loading, setLoading] = useState(false);

  const handleEditClick = (style) => {
    setSelectedStyle(style);
    setEditModalOpen(true);
  };

  const handleToggleClick = (style) => {
    setSelectedStyle({
      ...style,
      isActive: stylesStatus[style.id]
    });
    setToggleModalOpen(true);
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
        setSuccessMessage('Style updated successfully!');
        setSuccessModalOpen(true);
        setEditModalOpen(false);
      } else {
        alert('Failed to update style: ' + result.message);
      }
    } catch (error) {
      console.error(' Error updating style:', error);
      alert('Error updating style: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleConfirm = async (style) => {
    try {
      setLoading(true);
      const result = await servicesAPI.toggleStyle(serviceId, categoryName, style.id);

      if (result.success) {
        setStylesStatus(prev => ({
          ...prev,
          [style.id]: !prev[style.id]
        }));
        setSuccessMessage(result.message);
        setSuccessModalOpen(true);
        setToggleModalOpen(false);
      } else {
        alert('Failed to toggle style: ' + result.message);
      }
    } catch (error) {
      console.error(' Error toggling style:', error);
      alert('Error toggling style: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-h-48 overflow-y-auto space-y-2 pt-2">
        {styles.map((style) => {
          const isActive = stylesStatus[style.id];
          
          return (
            <div key={style.id} className="bg-white rounded-lg p-3 flex items-center justify-between border">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{style.name}</h5>
                <p className="text-sm font-medium text-green-600">{style.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditClick(style)}
                  disabled={loading}
                  className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleToggleClick(style)}
                  disabled={loading}
                  className={`p-1 transition-colors disabled:opacity-50 ${
                    isActive 
                      ? 'text-gray-400 hover:text-red-600' 
                      : 'text-red-600 hover:text-red-700'
                  }`}
                >
                  <Power size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EditServiceModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        service={selectedStyle}
        onSave={handleSaveEdit}
        loading={loading}
      />

      <ToggleServiceModal
        isOpen={toggleModalOpen}
        onClose={() => setToggleModalOpen(false)}
        service={selectedStyle}
        onConfirm={handleToggleConfirm}
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
    </>
  );
};

export default ServiceStylesList;