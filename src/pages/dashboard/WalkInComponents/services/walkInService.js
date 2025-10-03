// /src/services/walkInService.js

const API_BASE_URL = 'http://localhost:5000/api';

export const walkInService = {
  // Get all walk-ins
  getAll: async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch walk-ins');
      }

      return await response.json();
    } catch (error) {
      console.error('walkInService.getAll error:', error);
      throw error;
    }
  },

  // Create new walk-in
  create: async (walkInData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(walkInData)
      });

      if (!response.ok) {
        throw new Error('Failed to create walk-in');
      }

      return await response.json();
    } catch (error) {
      console.error('walkInService.create error:', error);
      throw error;
    }
  },

  // Update walk-in
  update: async (id, walkInData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(walkInData)
      });

      if (!response.ok) {
        throw new Error('Failed to update walk-in');
      }

      return await response.json();
    } catch (error) {
      console.error('walkInService.update error:', error);
      throw error;
    }
  },

  // Delete walk-in
  delete: async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete walk-in');
      }

      return await response.json();
    } catch (error) {
      console.error('walkInService.delete error:', error);
      throw error;
    }
  }
};