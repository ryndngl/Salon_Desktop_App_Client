// /src/services/walkInService.js

const API_BASE_URL = "http://192.168.100.6:5000";

// ✅ Helper function to format date consistently
const formatDateToYYYYMMDD = (dateValue) => {
  if (!dateValue) return null;
  
  try {
    let dateObj;
    
    if (dateValue instanceof Date) {
      dateObj = dateValue;
    } else if (typeof dateValue === 'string') {
      const datePart = dateValue.split('T')[0];
      
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        return datePart;
      }
      
      dateObj = new Date(dateValue);
    } else {
      return null;
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', dateValue, error);
    return null;
  }
};

export const walkInService = {
  // Get all walk-ins
  getAll: async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkin`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch walk-ins');
      }

      const result = await response.json();
      
      //  Transform data and format dates
      const transformedData = {
        ...result,
        walkIns: (result.walkIns || []).map(walkIn => ({
          ...walkIn,
          date: formatDateToYYYYMMDD(walkIn.date)
        }))
      };
      
      return transformedData;
    } catch (error) {
      console.error('walkInService.getAll error:', error);
      throw error;
    }
  },

  // Create new walk-in
  create: async (walkInData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/walkin`, {  
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
      
      const response = await fetch(`${API_BASE_URL}/walkin/${id}`, {  
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
      
      const response = await fetch(`${API_BASE_URL}/walkin/${id}`, {  
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