import { X } from 'lucide-react';

const StylePreviewModal = ({ isOpen, onClose, onConfirm, styleData, serviceName, categoryName }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed bg-black bg-opacity-70 flex items-center justify-center z-[80] p-4"
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Preview Style Card</h2>
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
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-6 text-center">
              This is how your style will appear in the mobile app
            </p>

            {/* Mobile Card Preview - Centered */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg w-80">
              {/* Image */}
              <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                <img 
                  src={styleData.imagePreview} 
                  alt={styleData.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Name and Price Row */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {styleData.name}
                  </h4>
                  <span className="text-base font-bold text-red-600">
                    ₱{styleData.price}
                  </span>
                </div>

                {/* Description */}
                {styleData.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {styleData.description}
                  </p>
                )}

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

            {/* Info Box */}
            <div className="mt-6 w-full max-w-md">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Style Information</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Service:</strong> {serviceName}</p>
                  {categoryName && <p><strong>Category:</strong> {categoryName}</p>}
                  <p><strong>Style Name:</strong> {styleData.name}</p>
                  <p><strong>Price:</strong> ₱{styleData.price}</p>
                  {styleData.description && (
                    <p><strong>Description:</strong> {styleData.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylePreviewModal;