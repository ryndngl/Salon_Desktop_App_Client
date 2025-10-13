import React from 'react';

const WalkInStats = ({ clients }) => {
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

  // ✅ DEBUG: Log for testing
  console.log('=== WALKIN STATS DEBUG ===');
  console.log('Today date:', today);
  console.log('Total clients:', clients.length);

  const stats = {
    total: clients.length,
    served: clients.filter((c) => c.status === "Served").length,
    servedToday: clients.filter((c) => {
      const clientDate = normalizeDate(c.date);
      const isToday = clientDate === today;
      const isServed = c.status === "Served";
      
      // ✅ DEBUG: Log each served client check
      if (isServed) {
        console.log('Checking served client:', {
          name: c.name,
          originalDate: c.date,
          normalizedDate: clientDate,
          todayDate: today,
          isToday: isToday,
          willCountAsServedToday: isToday && isServed
        });
      }
      
      return isToday && isServed;
    }).length,
    pending: clients.filter((c) => c.status === "Pending").length,
    rescheduled: clients.filter((c) => c.status === "Rescheduled").length,
    cancelled: clients.filter((c) => c.status === "Cancelled").length,
  };

  console.log('Final walk-in stats:', stats);
  console.log('=== END DEBUG ===');

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
        <p className="text-2xl font-bold text-green-600">{stats.servedToday}</p>
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