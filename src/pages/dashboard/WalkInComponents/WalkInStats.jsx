import React from 'react';

const WalkInStats = ({ clients }) => {
  // Get today's date in YYYY-MM-DD format
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Normalize date for comparison
  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    
    try {
      if (dateStr instanceof Date) {
        const year = dateStr.getFullYear();
        const month = String(dateStr.getMonth() + 1).padStart(2, '0');
        const day = String(dateStr.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
      if (typeof dateStr === 'string') {
        if (dateStr.includes('T')) {
          return dateStr.split('T')[0];
        }
        
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          return dateStr;
        }
        
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      
      return null;
    } catch (error) {
      console.error('Error normalizing date:', dateStr, error);
      return null;
    }
  };

  const today = getTodayDateString();

  const stats = {
    // Total Walk-ins - TODAY ONLY ✅
    total: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      return clientDate === today;
    }).length,

    // Served - TODAY ONLY ✅
    served: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      const isToday = clientDate === today;
      const isServed = c.status === "Served";
      return isToday && isServed;
    }).length,

    // Pending - TODAY ONLY ✅
    pending: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      const isToday = clientDate === today;
      const isPending = c.status === "Pending";
      return isToday && isPending;
    }).length,

    // Rescheduled - TODAY ONLY ✅
    rescheduled: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      const isToday = clientDate === today;
      const isRescheduled = c.status === "Rescheduled";
      return isToday && isRescheduled;
    }).length,

    // Cancelled - TODAY ONLY ✅
    cancelled: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      const isToday = clientDate === today;
      const isCancelled = c.status === "Cancelled";
      return isToday && isCancelled;
    }).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Total Walk-ins */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Walk-ins</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>

      {/* Served Today */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Served Today</h3>
        <p className="text-2xl font-bold text-green-600">{stats.served}</p>
      </div>

      {/* Pending */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>

      {/* Rescheduled */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Rescheduled</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.rescheduled}</p>
      </div>

      {/* Cancelled */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
      </div>
    </div>
  );
};

export default WalkInStats;