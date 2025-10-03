// /src/services/userService.js

// Base URL ng server mo - CHANGE THIS to your actual server URL
const API_BASE_URL = 'http://localhost:5000/api'; // or your server port

export const userService = {
  // Get all users
  getAll: async () => {
    try {
      const token = localStorage.getItem('token'); // kunin yung auth token
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // for authentication middleware
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
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('userService.getById error:', error);
      throw error;
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('userService.update error:', error);
      throw error;
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      return await response.json();
    } catch (error) {
      console.error('userService.delete error:', error);
      throw error;
    }
  }
};