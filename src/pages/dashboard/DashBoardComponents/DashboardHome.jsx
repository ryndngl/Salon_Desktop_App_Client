import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import axios from 'axios';

const StatsCard = ({ title, value, color, trend, isLoading }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {isLoading ? (
          <p className="text-2xl font-bold text-gray-400">Loading...</p>
        ) : (
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        )}
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
  const [stats, setStats] = useState({
    todayAppointments: 0,
    walkInClients: 0,
    servicesCompleted: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('🔄 Fetching dashboard stats...');
      console.log('🔑 Token:', token ? 'Present' : 'Missing');

      // Fetch appointment stats
      console.log('📊 Fetching appointment stats...');
      const appointmentRes = await axios.get('http://localhost:5000/api/appointments/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Appointment Stats Response:', appointmentRes.data);

      // Fetch walk-in stats
      console.log('📊 Fetching walk-in stats...');
      const walkInRes = await axios.get('http://localhost:5000/api/walkin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Walk-in Stats Response:', walkInRes.data);

      // Update state
      const newStats = {
        todayAppointments: appointmentRes.data.stats?.today || 0,
        walkInClients: walkInRes.data.stats?.today || 0,
        servicesCompleted: appointmentRes.data.stats?.completed || 0,
      };

      console.log('📈 Setting new stats:', newStats);
      setStats(newStats);

    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('❌ Response error:', error.response.data);
        console.error('❌ Status code:', error.response.status);
      } else if (error.request) {
        console.error('❌ No response received:', error.request);
      } else {
        console.error('❌ Error message:', error.message);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    console.log('🚀 DashboardHome mounted - fetching initial stats...');
    fetchStats();
  }, []);

  // Refresh stats
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    setIsRefreshing(true);
    fetchStats();
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Bookings"
          value={stats.todayAppointments}
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Walk-in Clients"
          value={stats.walkInClients}
          color="black"
          isLoading={isLoading}
        />
        <StatsCard
          title="Daily Revenue"
          value="₱12,450"
          color="green"
          isLoading={isLoading}
        />
        <StatsCard
          title="Services Completed"
          value={stats.servicesCompleted}
          color="red"
          isLoading={isLoading}
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
            <div className="text-blue-600 font-medium">Bookings</div>
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