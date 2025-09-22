import React from 'react';

const FilterButtons = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'online', label: 'Online' },
    { key: 'cash', label: 'Cash' }
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button 
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-3 py-1 text-sm border rounded-md transition-colors ${
            selectedFilter === filter.key
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;