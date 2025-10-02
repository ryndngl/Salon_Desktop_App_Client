import React from 'react';

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

      {/* Recent Activity - INLINE NA */}
      <div className="border-t pt-4">
        <h4 className="text-md font-semibold text-gray-800 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {recentActivity && recentActivity.map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.service}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
              <span className={`text-sm font-semibold ${
                activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.points > 0 ? '+' : ''}{activity.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;