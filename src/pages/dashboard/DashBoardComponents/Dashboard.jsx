import { useState } from 'react';
import {DashboardLayout} from '../DashboardComponents';
import { DashboardHome } from '../DashboardComponents';
import { AppointmentsPage } from '../AppointmentComponents';
import { WalkInClientsPage } from '../WalkInComponents';
import { ServicesPage } from '../ServicesComponents';
import { SalesReportPage} from '../SalesReportComponents'; 
import { ManageUserPage } from '../ManageUserComponents';
import { ReviewsPage } from '../ReviewsComponents'; 

const Dashboard = ({ onLogout, currentUser }) => { // ✅ Receive currentUser prop
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout(); 
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'bookings':
        return <AppointmentsPage />;
      case 'walk-in-clients':
        return <WalkInClientsPage />;
      case 'services':
        return <ServicesPage />;
      case 'reviews': 
        return <ReviewsPage />;
      case 'sales-report':
        return <SalesReportPage />;
      case 'manage-user':
        return <ManageUserPage />;
      default:
        return <DashboardHome />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'bookings': 'Bookings',
      'walk-in-clients': 'Walk-in Clients',
      'services': 'Services',
      'reviews': 'Reviews',  
      'sales-report': 'Sales Report',
      'manage-user': 'Manage Users'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      pageTitle={getPageTitle()}
      currentUser={currentUser}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;