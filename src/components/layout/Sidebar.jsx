import { useState } from "react";
import {
  Home,
  Calendar,
  UserPlus,
  Scissors,
  BarChart3,
  Users,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  X,
} from "lucide-react";

// Logout Confirmation Modal Component
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <LogOut className="h-8 w-8 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Logout</h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to logout of your account?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // ✅ Get user role from localStorage
  const getUserRole = () => {
    const adminData = localStorage.getItem("salon_admin");
    const staffData = localStorage.getItem("salon_staff");

    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        return admin.type || "admin";
      } catch (e) {
        return "admin";
      }
    }

    if (staffData) {
      try {
        const staff = JSON.parse(staffData);
        return staff.type || "staff";
      } catch (e) {
        return "staff";
      }
    }

    return "admin"; // default
  };

  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  // ✅ Define all menu items with role access
  const allMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      roles: ["admin", "staff"],
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: Calendar,
      roles: ["admin", "staff"],
    },
    {
      id: "walk-in-clients",
      label: "Walk-in Clients",
      icon: UserPlus,
      roles: ["admin", "staff"],
    },
    {
      id: "services",
      label: "Services",
      icon: Scissors,
      roles: ["admin", "staff"],
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: MessageSquare,
      roles: ["admin", "staff"],
    },
    {
      id: "sales-report",
      label: "Sales Report",
      icon: BarChart3,
      roles: ["admin"],
    },
    { id: "manage-user", label: "Manage User", icon: Users, roles: ["admin"] },
  ];

  // ✅ Filter menu items based on user role
  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  return (
    <>
      <div
        className={`relative ${sidebarOpen ? "w-64" : "w-16"} transition-all duration-500 ease-in-out`}
      >
        <div className="flex h-full flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl border-r border-gray-700">
          {/* Header */}
          <div className="flex h-16 items-center border-b border-gray-700 px-4 bg-gray-900/50">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 bg-white overflow-hidden">
                <img
                  src="./vans-glow-up-salon.png"
                  alt="Van's Glow Up Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`flex flex-col min-w-0 transition-all duration-500 ${
                  sidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <span className="text-base font-bold truncate text-white">
                  Van's Glow Up
                </span>
                <span className="text-xs text-gray-400 truncate">
                  Beauty Salon
                </span>
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
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-red-600/90 text-white font-medium shadow-sm"
                        : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                    }`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span
                      className={`transition-all duration-500 ${
                        sidebarOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}

              {/* Staff Accounts Button - ADMIN ONLY - Navigate to page */}
              {isAdmin && (
                <div className="pt-2 mt-2 border-t border-gray-700">
                  <button
                    onClick={() => setActiveTab('staff-accounts')}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      activeTab === 'staff-accounts'
                        ? "bg-red-600/90 text-white font-medium shadow-sm"
                        : "text-blue-400 hover:bg-gray-700/50 hover:text-blue-300"
                    }`}
                    title={!sidebarOpen ? "Staff Accounts" : undefined}
                  >
                    <UserCog className="h-5 w-5 flex-shrink-0" />
                    <span
                      className={`transition-all duration-500 ${
                        sidebarOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    >
                      Staff Accounts
                    </span>
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700 p-3 bg-gray-900/50">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-all duration-200 hover:bg-gray-700/50 hover:text-red-300"
              title={!sidebarOpen ? "Logout" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span
                className={`transition-all duration-500 ${
                  sidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 border border-gray-600 shadow-md z-10"
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-3 w-3 text-gray-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-gray-400" />
          )}
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Sidebar;