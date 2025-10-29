import React, { useState, useEffect } from "react";
import { TrendingUp, RefreshCw, Clock } from "lucide-react";
import axios from "axios";

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
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchStats = async () => {
    try {
      // ✅ Use the dedicated dashboard stats endpoint
      const dashboardRes = await axios.get(
        "https://salon-app-server.onrender.com/api/appointments/dashboard-stats"
      );
      
      const dashboardStats = dashboardRes.data.stats;

      const newStats = {
        todayAppointments: dashboardStats?.todayBookings || 0,
        walkInClients: dashboardStats?.todayWalkIns || 0,
        servicesCompleted: dashboardStats?.servicesCompleted || 0,
        dailyRevenue: dashboardStats?.dailyRevenue || 0,
      };

      console.log("✅ Dashboard Stats:", newStats);
      setStats(newStats);
    } catch (error) {
      console.error("❌ Dashboard stats error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {formatDate(currentTime)}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:bg-gray-400"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
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
          value={`₱${stats.dailyRevenue.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`}
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
    </div>
  );
};

export default DashboardHome;