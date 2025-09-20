import { X, Trash2 } from 'lucide-react';

const UserDeleteModal = ({ 
  showModal, 
  deletingUser, 
  onCloseModal, 
  onConfirmDelete 
}) => {
  if (!showModal || !deletingUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Delete Modal Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-900">Delete User</h2>
          <button 
            onClick={onCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Delete Modal Content */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Are you sure?</h3>
              <p className="text-sm text-gray-500">You want to delete this user</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm mr-3">
                {deletingUser.avatar}
              </div>
              <div>
                <p className="font-medium text-gray-900">{deletingUser.name}</p>
                <p className="text-sm text-gray-500">{deletingUser.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Warning:</strong> This action cannot be undone. All user data including booking history will be permanently deleted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg border-t border-gray-200">
          <button 
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Yes, Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;