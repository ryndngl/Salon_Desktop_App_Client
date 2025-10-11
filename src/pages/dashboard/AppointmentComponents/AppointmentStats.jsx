import React from 'react';

const AppointmentStats = ({ appointments }) => {
  const today = new Date().toISOString().split("T")[0];

  const stats = {
  todayAppointments: appointments.filter((a) => {
  return a.date === today && a.status !== "Cancelled";
}).length,

    pending: appointments.filter((a) => a.status === "Pending").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    rescheduled: appointments.filter((a) => a.status === "Rescheduled").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Today Appointments</h3>
        <p className="text-2xl font-bold text-black-600">{stats.todayAppointments}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Rescheduled</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.rescheduled}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
      </div>
    </div>
  );
};

export default AppointmentStats;