import React from 'react';

const PointsGrid = ({ customer }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-gray-900">{customer.currentPoints.toLocaleString()}</div>
        <div className="text-xs text-gray-600 uppercase tracking-wide mt-1">Current Points</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-gray-700">{customer.totalEarned.toLocaleString()}</div>
        <div className="text-xs text-gray-600 uppercase tracking-wide mt-1">Total Earned</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-gray-700">{customer.totalRedeemed.toLocaleString()}</div>
        <div className="text-xs text-gray-600 uppercase tracking-wide mt-1">Total Redeemed</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-gray-700">{customer.visits}</div>
        <div className="text-xs text-gray-600 uppercase tracking-wide mt-1">Visits This Year</div>
      </div>
    </div>
  );
};

export default PointsGrid;