import React from 'react';
import SearchBar from './SearchBar';
import CustomerInfo from './CustomerInfo';
import QuickActions from './QuickActions';

const CustomerDetails = ({ 
  customer, 
  searchQuery, 
  onSearchChange, 
  onKeyPress, 
  onBack,
  recentActivity 
}) => {
  return (
    <div className="space-y-6">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onKeyPress={onKeyPress}
        onBack={onBack}
        showBackButton={true}
      />

      <CustomerInfo customer={customer} />

      <QuickActions recentActivity={recentActivity} />
    </div>
  );
};

export default CustomerDetails;