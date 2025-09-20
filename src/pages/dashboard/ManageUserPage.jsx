import { useState } from 'react';

// Import components
import UserSearchBar from './ManageUserComponents/UserSearchBar';
import UserStatsCards from './ManageUserComponents/UserStatsCard';
import UserTable from './ManageUserComponents/UserTable';
import UserDetailsModal from './ManageUserComponents/UserDetailsModal';
import UserEditModal from './ManageUserComponents/UserEditModal';
import UserDeleteModal from './ManageUserComponents/UserDeleteModal';

const ManageUserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Sample user data - replace with actual data from your API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+63 912 345 6789',
      joinDate: '2024-01-15',
      lastBooking: '2024-09-18',
      totalBookings: 12,
      status: 'Active',
      avatar: 'MS',
      favoriteServices: 'Haircut, Hair Color, Nail Art',
      bookingHistory: [
        { id: 1, date: '2024-09-18', service: 'Haircut & Color', price: 2500, status: 'Completed' },
        { id: 2, date: '2024-08-30', service: 'Manicure & Pedicure', price: 1200, status: 'Completed' },
        { id: 3, date: '2024-07-15', service: 'Hair Treatment', price: 1800, status: 'Completed' },
        { id: 4, date: '2024-06-20', service: 'Facial', price: 1500, status: 'Completed' }
      ]
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      phone: 'Not provided',
      joinDate: '2024-02-20',
      lastBooking: '2024-09-15',
      totalBookings: 8,
      status: 'Active',
      avatar: 'JD',
      favoriteServices: 'Haircut, Beard Trim',
      bookingHistory: [
        { id: 1, date: '2024-09-15', service: 'Haircut & Beard Trim', price: 800, status: 'Completed' },
        { id: 2, date: '2024-08-15', service: 'Haircut', price: 500, status: 'Completed' },
        { id: 3, date: '2024-07-15', service: 'Haircut & Beard Trim', price: 800, status: 'Completed' }
      ]
    },
    {
      id: 3,
      name: 'Anna Reyes',
      email: 'anna.reyes@email.com',
      phone: '+63 905 123 4567',
      joinDate: '2024-03-10',
      lastBooking: '2024-08-30',
      totalBookings: 15,
      status: 'Inactive',
      avatar: 'AR',
      favoriteServices: 'Hair Rebond, Nail Art, Facial',
      bookingHistory: [
        { id: 1, date: '2024-08-30', service: 'Hair Rebond', price: 4500, status: 'Completed' },
        { id: 2, date: '2024-07-20', service: 'Nail Art', price: 1800, status: 'Completed' },
        { id: 3, date: '2024-06-15', service: 'Hair Color', price: 3200, status: 'Completed' }
      ]
    },
    {
      id: 4,
      name: 'Carlos Garcia',
      email: 'carlos.garcia@email.com',
      phone: 'Not provided',
      joinDate: '2024-04-05',
      lastBooking: '2024-09-20',
      totalBookings: 6,
      status: 'Active',
      avatar: 'CG',
      favoriteServices: 'None selected',
      bookingHistory: [
        { id: 1, date: '2024-09-20', service: 'Quick Trim', price: 300, status: 'Completed' },
        { id: 2, date: '2024-08-05', service: 'Haircut', price: 500, status: 'Completed' }
      ]
    },
    {
      id: 5,
      name: 'Lisa Fernandez',
      email: 'lisa.fernandez@email.com',
      phone: '+63 918 246 8135',
      joinDate: '2024-05-12',
      lastBooking: '2024-09-19',
      totalBookings: 10,
      status: 'Active',
      avatar: 'LF',
      favoriteServices: 'Hair Spa, Manicure',
      bookingHistory: [
        { id: 1, date: '2024-09-19', service: 'Hair Spa', price: 2200, status: 'Completed' },
        { id: 2, date: '2024-08-25', service: 'Manicure', price: 800, status: 'Completed' },
        { id: 3, date: '2024-07-30', service: 'Hair Treatment', price: 1800, status: 'Completed' }
      ]
    }
  ]);

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