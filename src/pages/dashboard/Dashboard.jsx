import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardHome from './DashboardHome';
import AppointmentsPage from './AppointmentsPage';
import WalkInClientsPage from './WalkInClientsPage';
import ServicesPage from './ServicesPage';
import SalesReportPage from './SalesReportPage';
import LoyaltyPointsPage from './LoyaltyPointsPage';
import ManageUserPage from './ManageUserPage';

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