import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  UserPlus, 
  Scissors, 
  BarChart3, 
  Star, 
  Users, 
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

// Staff Account Creation Modal Component
const CreateStaffModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Creating staff account:', {
        username: formData.username,
        email: formData.email
      });
      
      // ✅ ACTUAL API CALL (uncommented and fixed)
      const response = await fetch('http://192.168.100.6:5000/api/staff/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'staff'
          // ✅ NOTE: confirmPassword is NOT sent to backend (only for frontend validation)
        })
      });
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (response.ok && result.isSuccess) {
        alert('Staff account created successfully!');
        
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        onClose();
      } else {
        alert(`Failed to create staff: ${result.message || 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Failed to create staff account. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create Staff Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="staff@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password (min 6 characters)"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Main Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  // ✅ Get user role from localStorage
  const getUserRole = () => {
    const adminData = localStorage.getItem('salon_admin');
    const staffData = localStorage.getItem('salon_staff');
    
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        return admin.type || 'admin';
      } catch (e) {
        return 'admin';
      }
    }
    
    if (staffData) {
      try {
        const staff = JSON.parse(staffData);
        return staff.type || 'staff';
      } catch (e) {
        return 'staff';
      }
    }
    
    return 'admin'; // default
  };

  const userRole = getUserRole();
  const isAdmin = userRole === 'admin';
  const isStaff = userRole === 'staff';

  // ✅ Define all menu items with role access
  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'staff'] },
    { id: 'bookings', label: 'Bookings', icon: Calendar, roles: ['admin', 'staff'] },
    { id: 'walk-in-clients', label: 'Walk-in Clients', icon: UserPlus, roles: ['admin', 'staff'] },
    { id: 'services', label: 'Services', icon: Scissors, roles: ['admin', 'staff'] },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, roles: ['admin', 'staff'] },
    { id: 'sales-report', label: 'Sales Report', icon: BarChart3, roles: ['admin'] },
    { id: 'loyalty-points', label: 'Loyalty Points', icon: Star, roles: ['admin'] },
    { id: 'manage-user', label: 'Manage User', icon: Users, roles: ['admin'] },
  ];

  // ✅ Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <>
      <div className={`relative ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-500 ease-in-out`}>
        <div className="flex h-full flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl border-r border-gray-700">
          {/* Header */}
          <div className="flex h-16 items-center border-b border-gray-700 px-4 bg-gray-900/50">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 bg-white overflow-hidden">
                <img 
                  src="/vans-glow-up-salon.png" 
                  alt="Van's Glow Up Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className={`flex flex-col min-w-0 transition-all duration-500 ${
                sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <span className="text-base font-bold truncate text-white">Van's Glow Up</span>
                <span className="text-xs text-gray-400 truncate">Beauty Salon</span>
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
                        ? 'bg-red-600/90 text-white font-medium shadow-sm'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
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

              {/* Staff Accounts Button - ADMIN ONLY */}
              {isAdmin && (
                <div className="pt-2 mt-2 border-t border-gray-700">
                  <button
                    onClick={() => setIsStaffModalOpen(true)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-400 hover:bg-gray-700/50 hover:text-blue-300 transition-all duration-200"
                    title={!sidebarOpen ? 'Staff Accounts' : undefined}
                  >
                    <UserCog className="h-5 w-5 flex-shrink-0" />
                    <span className={`transition-all duration-500 ${
                      sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
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
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 border border-gray-600 shadow-md z-10"
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-3 w-3 text-gray-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-gray-400" />
          )}
        </button>
      </div>

      {/* Staff Account Modal */}
      <CreateStaffModal 
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;