import React from 'react';

const WalkInFilters = ({ activeFilter, onFilterChange, stats }) => {
  const filters = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'served', label: 'Served', count: stats.served },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'rescheduled', label: 'Rescheduled', count: stats.rescheduled },
    { id: 'cancelled', label: 'Cancelled', count: stats.cancelled },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
            <span className="ml-2 font-bold">({filter.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalkInFilters;