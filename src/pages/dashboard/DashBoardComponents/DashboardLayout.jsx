import { Bell, User } from 'lucide-react';
import Sidebar from '../../../components/layout/Sidebar';

const DashboardLayout = ({ children, activeTab, setActiveTab, onLogout, pageTitle }) => {
  const isDashboard = activeTab === 'dashboard';
  
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Only show full header for Dashboard */}
        {isDashboard ? (
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between h-16">
            {/* Left side - Title and subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-sm text-gray-600">Welcome back, Admin</p>
            </div>
            
            {/* Right side - Notifications and user info */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </header>
        ) : (
          // Simple header for other pages
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;