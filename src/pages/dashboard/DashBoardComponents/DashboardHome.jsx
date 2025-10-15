import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({ title, value, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        {trend && (
          <p className="text-xs text-green-500 flex items-center mt-1">
            <TrendingUp size={12} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Bookings"
          value="15"
          color="blue"
        />
        <StatsCard
          title="Walk-in Clients"
          value="8"
          color="black"
        />
        <StatsCard
          title="Daily Revenue"
          value="₱12,450"
          color="green"
        />
        <StatsCard
          title="Services Completed"
          value="23"
          color="red"
        />
      </div>

    {/* Additional Dashboard Content */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Recent Appointments */}
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
    
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3">
        <div>
          <p className="font-medium">Maria Santos</p>
          <p className="text-sm text-gray-600">Hair Cut & Color</p>
        </div>
        <span className="text-blue-600 font-medium">10:00 AM</span>
      </div>
      
      <div className="flex justify-between items-center p-3">
        <div>
          <p className="font-medium">Juan Dela Cruz</p>
          <p className="text-sm text-gray-600">Massage</p>
        </div>
        <span className="text-green-600 font-medium">2:00 PM</span>
      </div>
      
      <div className="flex justify-between items-center p-3">
        <div>
          <p className="font-medium">Ana Garcia</p>
          <p className="text-sm text-gray-600">Manicure & Pedicure</p>
        </div>
        <span className="text-yellow-600 font-medium">4:00 PM</span>
      </div>
    </div>
  </div>


        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Services Today</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Hair Cut & Style</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Manicure</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Facial Treatment</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-sm font-medium">6</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Hair Color</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-sm font-medium">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <div className="text-blue-600 font-medium"> Bookings</div>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <div className="text-green-600 font-medium">Add Walk-in</div>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <div className="text-purple-600 font-medium">View Reports</div>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <div className="text-orange-600 font-medium">Manage Services</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;