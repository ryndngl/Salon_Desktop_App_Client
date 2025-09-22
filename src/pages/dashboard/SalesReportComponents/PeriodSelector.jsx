import React from 'react';

const PeriodSelector = ({ selectedPeriod, onChange }) => {
  return (
    <select 
      value={selectedPeriod} 
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-400 bg-white text-gray-700 hover:border-gray-400 transition-colors"
    >
      <option value="today">Today</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
    </select>
  );
};

export default PeriodSelector;