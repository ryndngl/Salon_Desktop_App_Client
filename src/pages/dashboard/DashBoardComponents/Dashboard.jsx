import { useState } from 'react';
import {DashboardLayout} from '../DashboardComponents';
import { DashboardHome } from '../DashboardComponents';
import { AppointmentsPage } from '../AppointmentComponents';
import { WalkInClientsPage } from '../WalkInComponents';
import { ServicesPage } from '../ServicesComponents';
import { SalesReportPage } from '../SalesReportComponents'; 
import { ManageUserPage } from '../ManageUserComponents';
import { LoyaltyPointsPage } from '../LoyaltyPointsComponents';
import { ReviewsPage } from '../ReviewsComponents'; // ADD THIS IMPORT

const Dashboard = ({ onLogout }) => {  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout(); 
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'walk-in-clients':
        return <WalkInClientsPage />;
      case 'services':
        return <ServicesPage />;
      case 'reviews': 
        return <ReviewsPage />;
      case 'sales-report':
        return <SalesReportPage />;
      case 'loyalty-points':
        return <LoyaltyPointsPage />;
      case 'manage-user':
        return <ManageUserPage />;
      default:
        return <DashboardHome />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'appointments': 'Appointments',
      'walk-in-clients': 'Walk-in Clients',
      'services': 'Services',
      'reviews': 'Reviews',  
      'sales-report': 'Sales Report',
      'loyalty-points': 'Loyalty Points',
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
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;