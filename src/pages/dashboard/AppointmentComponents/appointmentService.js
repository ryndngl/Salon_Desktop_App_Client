// src/dashboard/services/appointmentService.js

const API_BASE_URL = 'http://localhost:5000/api';

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
        services: Array.isArray(appointment.services) 
          ? appointment.services.join(', ') 
          : appointment.services,
        date: new Date(appointment.date).toISOString().split('T')[0],
        time: appointment.time,
        modeOfPayment: appointment.modeOfPayment,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      }));

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
        services: Array.isArray(appointment.services) 
          ? appointment.services.join(', ') 
          : appointment.services,
        date: new Date(appointment.date).toISOString().split('T')[0],
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
        services: Array.isArray(appointment.services) 
          ? appointment.services.join(', ') 
          : appointment.services,
        date: new Date(appointment.date).toISOString().split('T')[0],
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
        services: Array.isArray(appointment.services) 
          ? appointment.services.join(', ') 
          : appointment.services,
        date: new Date(appointment.date).toISOString().split('T')[0],
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
        rescheduled: 0,
        cancelled: 0
      };

    } catch (error) {
      console.error('appointmentService.getStats error:', error);
      return {
        today: 0,
        pending: 0,
        completed: 0,
        rescheduled: 0,
        cancelled: 0
      };
    }
  },
};