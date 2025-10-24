import React from 'react';

const WalkInStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Walk-ins</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Served Today</h3>
        <p className="text-2xl font-bold text-green-600">{stats.served}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Rescheduled</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.rescheduled}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
      </div>
    </div>
  );
};

export default WalkInStats;