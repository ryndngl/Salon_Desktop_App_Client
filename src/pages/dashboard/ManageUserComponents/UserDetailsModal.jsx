import { X, User, Mail, Phone, Calendar, Clock, Heart } from 'lucide-react';

const UserDetailsModal = ({ 
  showModal, 
  selectedUser, 
  onCloseModal 
}) => {
  if (!showModal || !selectedUser) return null;

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'text-green-800' 
      : 'text-red-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-900">User Profile Details</h2>
          <button 
            onClick={onCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* User Basic Info */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {selectedUser.avatar}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                <span className={`text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <User className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Phone className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              Booking History
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {selectedUser.bookingHistory && selectedUser.bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {selectedUser.bookingHistory.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                      <div>
                        <p className="font-medium text-gray-900">{booking.service}</p>
                        <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₱{booking.price.toLocaleString()}</p>
                        <span className="text-xs font-medium text-green-800">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No booking history available</p>
              )}
            </div>
          </div>

          {/* Favorite Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-gray-400" />
              Favorite Services
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {selectedUser.favoriteServices === 'None selected' ? (
                <p className="text-gray-500 italic">No favorite services selected yet</p>
              ) : (
                <p className="font-medium text-gray-900">{selectedUser.favoriteServices}</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg border-t border-gray-200">
          <button 
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;