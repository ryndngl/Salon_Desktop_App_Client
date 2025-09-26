import React from 'react';
import RecentActivity from './RecentActivity';

const QuickActions = ({ recentActivity }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="flex gap-3 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Redeem Points
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Add Bonus
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          View History
        </button>
      </div>

      <RecentActivity activities={recentActivity} />
    </div>
  );
};

export default QuickActions;