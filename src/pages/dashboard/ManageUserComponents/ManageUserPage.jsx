import { useState, useEffect } from 'react';

// Import components
import UserSearchBar from './UserSearchBar';
import UserStatsCards from './UserStatsCard';
import UserTable from './UserTable';
import UserDetailsModal from './UserDetailsModal';
import UserEditModal from './UserEditModal';
import UserDeleteModal from './UserDeleteModal';

// TEMPORARY - userService code pasted directly here (for testing)
const API_BASE_URL = 'http://localhost:5000/api';

const userService = {
  getAll: async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('userService.getAll error:', error);
      throw error;
    }
  }
};

const ManageUserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // State for users - empty array initially
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await userService.getAll();
    const data = response.users || response; // FIX: access users array from response object
    
    console.log('API Response:', response);
    console.log('Users Array:', data);
    console.log('Is Array?', Array.isArray(data));
    
    // Check if data is actually an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from server');
    }
    
    // Transform MongoDB data to match your component structure
    const transformedUsers = data.map((user, index) => ({
      id: user._id,
      name: user.fullName,
      email: user.email,
      phone: 'Not provided',
      joinDate: new Date(user.createdAt).toLocaleDateString('en-US'),
      lastBooking: '',
      totalBookings: '',
      status: 'Active',
      avatar: user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      favoriteServices: user.favorites?.map(f => f.name).join(', ') || 'None selected',
      bookingHistory: []
    }));
    
    setUsers(transformedUsers);
    setError(null);
  } catch (err) {
    console.error('Error fetching users:', err);
    console.error('Error details:', err.message);
    setError('Failed to load users. Please try again.');
  } finally {
    setLoading(false);
  }
};

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  // Modal handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleSaveEdit = () => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === editingUser.id ? editingUser : user
      )
    );
    
    setShowEditModal(false);
    setEditingUser(null);
    alert('User updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setEditingUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers(prevUsers => 
      prevUsers.filter(user => user.id !== deletingUser.id)
    );
    
    setShowDeleteModal(false);
    setDeletingUser(null);
    alert('User deleted successfully!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchUsers}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Bar Component */}
        <UserSearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Stats Cards Component */}
        <UserStatsCards 
          users={users}
          filteredUsers={filteredUsers}
        />

        {/* Users Table Component */}
        <UserTable 
          filteredUsers={filteredUsers}
          users={users}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

        {/* User Details Modal Component */}
        <UserDetailsModal 
          showModal={showUserModal}
          selectedUser={selectedUser}
          onCloseModal={handleCloseUserModal}
        />

        {/* Edit User Modal Component */}
        <UserEditModal 
          showModal={showEditModal}
          editingUser={editingUser}
          onCloseModal={handleCloseEditModal}
          onSaveEdit={handleSaveEdit}
          onInputChange={handleInputChange}
        />

        {/* Delete User Modal Component */}
        <UserDeleteModal 
          showModal={showDeleteModal}
          deletingUser={deletingUser}
          onCloseModal={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />

      </div>
    </div>
  );
};

export default ManageUserPage;