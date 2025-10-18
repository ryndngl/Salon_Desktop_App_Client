import { useState } from 'react';
import { X } from 'lucide-react';
import AddStyleModal from './AddStyleModal';

// Lahat ng available services
const availableServices = [
  {
    id: 'haircut',
    name: 'Hair Cut',
    categories: ['Men', 'Women', 'Kids']
  },
  {
    id: 'haircolor',
    name: 'Hair Color',
    categories: ['Root Touch Up', 'Full Hair', 'Highlight', 'Balayage']
  },
  {
    id: 'hairtreatment',
    name: 'Hair Treatment',
    categories: []
  },
  {
    id: 'rebond',
    name: 'Rebond & Forms',
    categories: []
  },
  {
    id: 'nailcare',
    name: 'Nail Care',
    categories: []
  },
  {
    id: 'footspa',
    name: 'Foot Spa',
    categories: []
  }
];

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, serviceName, categoryName }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4" 
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Add New Style
          </h3>
          <p className="text-gray-600 mb-6">
            Do you want to add a new style to{' '}
            <span className="font-semibold text-gray-900">
              {serviceName}
              {categoryName && ` - ${categoryName}`}
            </span>
            ?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddServiceModal = ({ isOpen, onClose, onServiceAdded }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAddStyleOpen, setIsAddStyleOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({ serviceName: '', categoryName: '' });

  if (!isOpen) return null;

  const handleCategoryClick = (service, category) => {
    setConfirmData({
      serviceName: service.name,
      categoryName: category
    });
    setIsConfirmOpen(true);
  };

  const handleServiceClick = (service) => {
    if (service.categories.length === 0) {
      setConfirmData({
        serviceName: service.name,
        categoryName: ''
      });
      setIsConfirmOpen(true);
    }
  };

  const handleConfirm = async () => {
    // Close confirmation modal
    setIsConfirmOpen(false);
    
    // Open Add Style Modal
    setIsAddStyleOpen(true);
  };

  return (
    <>
      <div 
        className="fixed bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" 
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
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-88px)]">
            <div className="space-y-3">
              {availableServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`border-2 border-gray-200 rounded-xl p-4 transition-all ${
                    service.categories.length === 0 
                      ? 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'
                      : ''
                  }`}
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    {service.name}
                  </h3>

                  {/* Categories as Buttons */}
                  {service.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.categories.map((category, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(service, category);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
                        >
                          Add {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        serviceName={confirmData.serviceName}
        categoryName={confirmData.categoryName}
      />

      {/* Add Style Modal */}
      <AddStyleModal
        isOpen={isAddStyleOpen}
        onClose={() => {
          setIsAddStyleOpen(false);
          onClose(); // Close main modal too
        }}
        serviceName={confirmData.serviceName}
        categoryName={confirmData.categoryName}
        onStyleAdded={() => {
          setIsAddStyleOpen(false);
          onClose();
          if (onServiceAdded) {
            onServiceAdded();
          }
        }}
      />
    </>
  );
};

export default AddServiceModal;