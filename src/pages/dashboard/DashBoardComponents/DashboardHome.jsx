import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Clock } from 'lucide-react';
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
    dailyRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching dashboard stats...');
      
      let appointmentStats = { today: 0, completed: 0 };
      let walkInStats = { today: 0 };
      let salesData = { totalSales: 0 };

      try {
        const appointmentRes = await axios.get('http://192.168.100.6:5000/api/appointments/stats');
        console.log('✅ Appointment Stats Response:', appointmentRes.data);
        appointmentStats = appointmentRes.data.stats;
      } catch (error) {
        console.error('❌ Appointment stats error:', error.response?.data || error.message);
      }

      try {
        const walkInRes = await axios.get('http://192.168.100.6:5000/api/walkin/stats');
        console.log('✅ Walk-in Stats Response:', walkInRes.data);
        walkInStats = walkInRes.data.stats;
      } catch (error) {
        console.error('❌ Walk-in stats error:', error.response?.data || error.message);
      }

      // ✅ NEW: Fetch daily sales report
      try {
        const salesRes = await axios.get('http://192.168.100.6:5000/api/appointments/sales-report?period=daily');
        console.log('✅ Sales Report Response:', salesRes.data);
        salesData = salesRes.data;
      } catch (error) {
        console.error('❌ Sales report error:', error.response?.data || error.message);
      }

      const newStats = {
        todayAppointments: appointmentStats?.today || 0,
        walkInClients: walkInStats?.today || 0,
        servicesCompleted: appointmentStats?.completed || 0,
        dailyRevenue: salesData?.totalSales || 0,
      };

      console.log('📈 Setting new stats:', newStats);
      setStats(newStats);

    } catch (error) {
      console.error('❌ Fatal error:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    console.log('🚀 DashboardHome mounted - fetching initial stats...');
    fetchStats();
  }, []);

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    setIsRefreshing(true);
    fetchStats();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Clock size={16} className="text-blue-600" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{formatDate(currentTime)}</span>
              <span className="text-lg font-bold text-blue-600">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

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
          value={`₱${stats.dailyRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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