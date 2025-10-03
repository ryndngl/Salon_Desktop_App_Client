// EditServiceModal.jsx - UPDATED VERSION
import { X } from 'lucide-react';
import { useState } from 'react';

const EditServiceModal = ({ isOpen, onClose, service, onSave }) => {
  const [price, setPrice] = useState(service?.price || '');
  const [description, setDescription] = useState(service?.description || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...service,  // ← changed from style to service
      price,
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Style</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
                value={service?.name || ''}  // ← changed to service
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
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Sale! 50% off this month only"
              />
              <p className="text-xs text-gray-500 mt-1">
                {description?.length || 0}/200 characters
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;