import React, { useState, useEffect } from 'react';
import AppointmentTable from './AppointmentTable';
import AppointmentStats from './AppointmentStats';
import { appointmentService } from './appointmentService';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch all appointments from backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await appointmentService.getAll();
      setAppointments(data);
      
      console.log('Appointments loaded:', data.length);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh appointments manually
  const handleRefresh = () => {
    fetchAppointments();
  };

  const handleEdit = (appointment) => {
    console.log('Edit appointment:', appointment);
    // TODO: Implement edit modal/form
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await appointmentService.delete(appointmentId);
        
        // Remove from local state
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
        
        console.log('Booking deleted successfully');
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete booking. Please try again.');
      }
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await appointmentService.updateStatus(appointmentId, 'Confirmed');
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'Confirmed' }
            : apt
        )
      );
      
      console.log('Booking confirmed');
    } catch (err) {
      console.error('Confirm error:', err);
      alert('Failed to confirm booking. Please try again.');
    }
  };

  const handleReschedule = async (appointment) => {
    try {
      await appointmentService.updateStatus(appointment.id, 'Rescheduled');
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointment.id 
            ? { ...apt, status: 'Rescheduled' }
            : apt
        )
      );
      
      console.log('Appointment rescheduled');
    } catch (err) {
      console.error('Reschedule error:', err);
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  // ✅ CHANGED: handleCancel → handleDecline
  const handleDecline = async (appointmentId) => {
    if (window.confirm('Are you sure you want to decline this appointment?')) {
      try {
        await appointmentService.updateStatus(appointmentId, 'Declined');
        
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: 'Declined' }
              : apt
          )
        );
        
        console.log('Booking declined');
      } catch (err) {
        console.error('Decline error:', err);
        alert('Failed to decline booking. Please try again.');
      }
    }
  };

  const handleMarkAsCompleted = async (appointmentId) => {
    try {
      await appointmentService.updateStatus(appointmentId, 'Completed');
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'Completed' }
            : apt
        )
      );
      
      console.log('Booking marked as completed');
    } catch (err) {
      console.error('Mark completed error:', err);
      alert('Failed to mark booking as completed. Please try again.');
    }
  };

  const handleCall = (phoneNumber) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
      alert(`Phone number ${phoneNumber} copied to clipboard!`);
    } else {
      alert(`Call: ${phoneNumber}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

 return (
    <div className="space-y-6">
      {/* Stats - MOVED TO TOP */}
      <AppointmentStats appointments={appointments} />

      {/* Refresh button - MOVED BELOW STATS */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
              clipRule="evenodd" 
            />
          </svg>
          Refresh
        </button>
      </div>
      
      {/* Table */}
      {appointments.length > 0 ? (
        <AppointmentTable
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onConfirm={handleConfirm}
          onReschedule={handleReschedule}
          onDecline={handleDecline}
          onMarkAsCompleted={handleMarkAsCompleted}
          onCall={handleCall}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
          <p className="mt-1 text-sm text-gray-500">
            No bookings have been created yet. They will appear here when clients book through the mobile app.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;