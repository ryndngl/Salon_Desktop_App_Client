import { X, Power, AlertCircle } from 'lucide-react';

const ToggleServiceModal = ({ isOpen, onClose, service, onConfirm }) => {
  if (!isOpen) return null;

  const isActive = service?.isActive !== false; // default true if undefined
  const action = isActive ? 'disable' : 'enable';
  const actionWord = isActive ? 'Disable' : 'Enable';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {actionWord} Service
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className={`flex items-start gap-3 p-4 border rounded-lg mb-4 ${
            isActive 
              ? 'bg-red-50 border-red-200' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <AlertCircle 
              className={isActive ? 'text-red-600' : 'text-amber-600'} 
              size={20} 
            />
            <div className="text-sm">
              {isActive ? (
                <>
                  <p className="font-medium mb-1 text-red-800">
                    This service will be unavailable for booking
                  </p>
                  <p className="text-red-700">
                    Customers won't be able to book <strong>{service?.name}</strong> until you enable it again.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium mb-1 text-amber-800">
                    This service will be available for booking
                  </p>
                  <p className="text-amber-700">
                    Customers will be able to book <strong>{service?.name}</strong> again.
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Are you sure you want to {action} <strong>{service?.name}</strong>?
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(service);
              onClose();
            }}
            className={`flex-1 px-4 py-2 rounded-md text-white flex items-center justify-center gap-2 ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Power size={16} />
            {actionWord}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleServiceModal;