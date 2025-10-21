// src/dashboard/services/appointmentService.js

const API_BASE_URL = "http://192.168.100.6:5000/api";

// ✅ HELPER FUNCTION: Format services array
const formatServicesArray = (services) => {
  if (!services) return 'No service specified';
  
  // Handle string format (old data)
  if (typeof services === 'string') return services;
  
  // Handle array of objects or strings
  if (Array.isArray(services)) {
    return services.map(s => {
      // If service is a string, return as-is
      if (typeof s === 'string') return s;
      
      // If service is an object, format it
      const parts = [s.name || 'Unknown Service'];
      if (s.category) parts.push(s.category);
      if (s.style) parts.push(s.style);
      return parts.join(' - ');
    }).join(', ');
  }
  
  return 'Invalid service data';
};

// ✅ NEW: Helper function to format date consistently
const formatDateToYYYYMMDD = (dateValue) => {
  if (!dateValue) return null;
  
  try {
    let dateObj;
    
    // If it's already a Date object
    if (dateValue instanceof Date) {
      dateObj = dateValue;
    }
    // If it's a string (ISO format, etc.)
    else if (typeof dateValue === 'string') {
      // Split by 'T' first to remove time component if present
      const datePart = dateValue.split('T')[0];
      
      // If already in YYYY-MM-DD format without time
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        return datePart;
      }
      
      // Otherwise parse it
      dateObj = new Date(dateValue);
    }
    else {
      return null;
    }
    
    // Convert to YYYY-MM-DD format
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', dateValue, error);
    return null;
  }
};

export const appointmentService = {
  /**
   * Get all appointments
   */
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('Fetched appointments:', result);

      // Transform backend data to match frontend format
      const transformedData = (result.data || []).map(appointment => ({
        id: appointment._id,
        name: appointment.clientName,
        email: appointment.email,
        phone: appointment.phone,
        services: formatServicesArray(appointment.services), 
        date: formatDateToYYYYMMDD(appointment.date),
        time: appointment.time,
        modeOfPayment: appointment.modeOfPayment,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      }));

      console.log('Transformed appointments:', transformedData);

      return transformedData;

    } catch (error) {
      console.error('appointmentService.getAll error:', error);
      
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  /**
   * Get appointment by ID
   */
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Transform data
      const appointment = result.data;
      return {
        id: appointment._id,
        name: appointment.clientName,
        email: appointment.email,
        phone: appointment.phone,
        services: formatServicesArray(appointment.services), 
        date: formatDateToYYYYMMDD(appointment.date),
        time: appointment.time,
        modeOfPayment: appointment.modeOfPayment,
        status: appointment.status,
      };

    } catch (error) {
      console.error('appointmentService.getById error:', error);
      throw error;
    }
  },

  /**
   * Create new appointment (if needed from desktop)
   */
  create: async (appointmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        id: result.data._id,
        ...appointmentData,
        status: result.data.status
      };

    } catch (error) {
      console.error('appointmentService.create error:', error);
      throw error;
    }
  },

  /**
   * Update appointment status
   */
  updateStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/update-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('Status updated:', result);
      
      return {
        id,
        status: result.data.status
      };

    } catch (error) {
      console.error('appointmentService.updateStatus error:', error);
      throw error;
    }
  },

  /**
   * Delete appointment
   */
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('Appointment deleted:', result);
      
      return { success: true };

    } catch (error) {
      console.error('appointmentService.delete error:', error);
      throw error;
    }
  },

  /**
   * Get appointments by status
   */
  getByStatus: async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/status/${status}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Transform data
      const transformedData = (result.data || []).map(appointment => ({
        id: appointment._id,
        name: appointment.clientName,
        email: appointment.email,
        phone: appointment.phone,
        services: formatServicesArray(appointment.services), 
        date: formatDateToYYYYMMDD(appointment.date),
        time: appointment.time,
        modeOfPayment: appointment.modeOfPayment,
        status: appointment.status,
      }));

      return transformedData;

    } catch (error) {
      console.error('appointmentService.getByStatus error:', error);
      return [];
    }
  },

  /**
   * Get today's appointments
   */
  getToday: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/today`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Transform data
      const transformedData = (result.data || []).map(appointment => ({
        id: appointment._id,
        name: appointment.clientName,
        email: appointment.email,
        phone: appointment.phone,
        services: formatServicesArray(appointment.services), 
        date: formatDateToYYYYMMDD(appointment.date),
        time: appointment.time,
        modeOfPayment: appointment.modeOfPayment,
        status: appointment.status,
      }));

      return transformedData;

    } catch (error) {
      console.error('appointmentService.getToday error:', error);
      return [];
    }
  },

  /**
   * Get appointment statistics
   */
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return result.stats || {
        today: 0,
        pending: 0,
        completed: 0,
        cancelled: 0
      };

    } catch (error) {
      console.error('appointmentService.getStats error:', error);
      return {
        today: 0,
        pending: 0,
        completed: 0,
        cancelled: 0
      };
    }
  },
};