import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  UserPlus, 
  Scissors, 
  BarChart3, 
  Star, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'walk-in-clients', label: 'Walk-in Clients', icon: UserPlus },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'sales-report', label: 'Sales Report', icon: BarChart3 },
    { id: 'loyalty-points', label: 'Loyalty Points', icon: Star },
    { id: 'manage-user', label: 'Manage User', icon: Users },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className={`relative ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-500 ease-in-out`}>
      <div className="flex h-full flex-col border-r border-gray-200 bg-white shadow-lg">
        {/* Header */}
        <div className="flex h-16 items-center border-b border-gray-200 px-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 flex-shrink-0">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <div className={`flex flex-col min-w-0 transition-all duration-500 ${
              sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <span className="text-base font-bold truncate">Van's Glow Up</span>
              <span className="text-xs text-gray-500 truncate">Beauty Salon</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-gray-100 ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium shadow-sm'
                      : 'text-gray-600'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className={`transition-all duration-500 ${
                    sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-all duration-200 hover:bg-red-50"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={`transition-all duration-500 ${
              sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 transition-all duration-200 hover:scale-110 z-10"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;