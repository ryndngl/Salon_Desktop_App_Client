import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const EditServiceModal = ({ isOpen, onClose, service, onSave, loading }) => {
  const [price, setPrice] = useState(service?.price || '');
  const [description, setDescription] = useState(service?.description || '');
  const [isOnSale, setIsOnSale] = useState(service?.isOnSale || false);

  // Reset state when modal opens with new service
  useEffect(() => {
    if (isOpen && service) {
      setPrice(service.price || '');
      setDescription(service.description || '');
      setIsOnSale(service.isOnSale || false);
      console.log('🔍 Modal opened with service:', service);
      console.log('🔍 Initial isOnSale:', service.isOnSale);
    }
  }, [isOpen, service]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      ...service,
      price,
      description,
      isOnSale
    };
    
    console.log('🚀 Submitting data:', updatedData);
    console.log('✅ isOnSale value:', isOnSale);
    
    onSave(updatedData);
  };

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    console.log('📦 Checkbox changed to:', newValue);
    setIsOnSale(newValue);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Style</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Style Name - READ ONLY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style Name
              </label>
              <input
                type="text"
                value={service?.name || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Style name cannot be changed</p>
            </div>

            {/* Price - EDITABLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₱</span>
                <input
                  type="number"
                  value={price.replace('₱', '')}
                  onChange={(e) => setPrice(`₱${e.target.value}`)}
                  required
                  disabled={loading}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Description - EDITABLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description / Promo Notes
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={200}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="e.g., Sale! 50% off this month only"
              />
              <p className="text-xs text-gray-500 mt-1">
                {description?.length || 0}/200 characters
              </p>
            </div>

            {/* Mark as Sale - CHECKBOX */}
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <input
                type="checkbox"
                id="isOnSale"
                checked={isOnSale}
                onChange={handleCheckboxChange}
                disabled={loading}
                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
              />
              <div className="flex-1">
                <label 
                  htmlFor="isOnSale" 
                  className="block text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Mark as Sale {isOnSale && '✓'}
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Display a "SALE" badge on this style in both desktop and mobile app
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;