import Sidebar from '../../../components/layout/Sidebar';

const DashboardLayout = ({ children, activeTab, setActiveTab, onLogout, pageTitle, currentUser }) => {
  const isDashboard = activeTab === 'dashboard';
  
  // ✅ Get display name and role text
  const displayName = currentUser?.username || 'User';
  const roleText = currentUser?.role === 'staff' ? 'Staff' : 'Admin';
  
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout}
        currentUser={currentUser} // ✅ Pass to Sidebar
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Only show full header for Dashboard */}
        {isDashboard ? (
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between h-16">
            {/* Left side - Title and subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-sm text-gray-600">Welcome back, {displayName}</p>
            </div>
            
            {/* Right side - Role text only (NO ICONS) */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">{roleText}</span>
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