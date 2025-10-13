import React from 'react';

const AppointmentStats = ({ appointments }) => {
  // ✅ Get today's date in YYYY-MM-DD format
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // ✅ Normalize date for comparison
  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    
    try {
      // Handle different date formats
      let date;
      
      // If it's already a Date object
      if (dateStr instanceof Date) {
        date = dateStr;
      }
      // If it's an ISO string or datetime string
      else if (typeof dateStr === 'string') {
        // Check if it already contains 'T' (ISO format with time)
        if (dateStr.includes('T')) {
          // Split by 'T' and take only the date part
          return dateStr.split('T')[0];
        }
        
        // If already in YYYY-MM-DD format
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          return dateStr;
        }
        
        // Otherwise, parse as Date
        date = new Date(dateStr);
      }
      
      // Return in YYYY-MM-DD format
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error normalizing date:', dateStr, error);
      return null;
    }
  };

  const today = getTodayDateString();

  // ✅ DEBUG: Log appointments data
  console.log('=== APPOINTMENT STATS DEBUG ===');
  console.log('Today date string:', today);
  console.log('Total appointments:', appointments.length);
  console.log('All appointments:', appointments);

  const stats = {
    todayAppointments: appointments.filter((a) => {
      const appointmentDate = normalizeDate(a.date);
      const isToday = appointmentDate === today;
      const isNotCancelled = a.status !== "Cancelled";
      
      // ✅ DEBUG: Log each appointment check
      console.log('Checking appointment:', {
        name: a.name,
        originalDate: a.date,
        normalizedDate: appointmentDate,
        todayDate: today,
        isToday: isToday,
        status: a.status,
        isNotCancelled: isNotCancelled,
        willCount: isToday && isNotCancelled
      });
      
      return isToday && isNotCancelled;
    }).length,

    pending: appointments.filter((a) => a.status === "Pending").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    rescheduled: appointments.filter((a) => a.status === "Rescheduled").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };

  // ✅ DEBUG: Log final stats
  console.log('Final stats:', stats);
  console.log('=== END DEBUG ===');

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Today Appointments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Today Appointments</h3>
        <p className="text-2xl font-bold text-black-600">{stats.todayAppointments}</p>
      </div>

      {/* Pending */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>

      {/* Completed */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      </div>

      {/* Rescheduled */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Rescheduled</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.rescheduled}</p>
      </div>

      {/* Cancelled */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
      </div>
    </div>
  );
};

export default AppointmentStats;