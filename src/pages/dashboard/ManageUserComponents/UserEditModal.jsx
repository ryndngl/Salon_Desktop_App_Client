import { X } from 'lucide-react';

const UserEditModal = ({ 
  showModal, 
  editingUser, 
  onCloseModal, 
  onSaveEdit, 
  onInputChange 
}) => {
  if (!showModal || !editingUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Edit Modal Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
          <button 
            onClick={onCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Edit Modal Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={editingUser.phone === 'Not provided' ? '' : editingUser.phone}
                onChange={(e) => onInputChange('phone', e.target.value || 'Not provided')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Edit Modal Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg border-t border-gray-200">
          <button 
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSaveEdit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;