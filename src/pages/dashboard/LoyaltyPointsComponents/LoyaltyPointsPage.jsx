import React, { useState } from 'react';
import { 
  SearchBar, 
  CustomerTable, 
  CustomerDetails 
} from '.';

const LoyaltyPointsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const loyalCustomers = [
    {
      id: 1,
      name: 'Maria Santos',
      phone: '+63 917 123 4567',
      email: 'maria.santos@gmail.com',
      currentPoints: 1250,
      totalEarned: 2100,
      totalRedeemed: 850,
      visits: 15,
      membershipLevel: 'VIP Member'
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      phone: '+63 998 765 4321',
      email: 'juan.delacruz@yahoo.com',
      currentPoints: 890,
      totalEarned: 1500,
      totalRedeemed: 610,
      visits: 12,
      membershipLevel: 'Gold Member'
    },
    {
      id: 3,
      name: 'Anna Rodriguez',
      phone: '+63 912 345 6789',
      email: 'anna.rodriguez@gmail.com',
      currentPoints: 650,
      totalEarned: 1200,
      totalRedeemed: 550,
      visits: 8,
      membershipLevel: 'Silver Member'
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      phone: '+63 923 456 7890',
      email: 'carlos.mendoza@outlook.com',
      currentPoints: 2100,
      totalEarned: 3500,
      totalRedeemed: 1400,
      visits: 22,
      membershipLevel: 'VIP Member'
    },
    {
      id: 5,
      name: 'Carlos Mendoza',
      phone: '+63 923 456 7890',
      email: 'carlos.mendoza@outlook.com',
      currentPoints: 0,
      totalEarned: 0,
      totalRedeemed: 0,
      visits: 1,
      membershipLevel: 'Regular Member'
    }
  ];

  const recentActivity = [
    { service: 'Haircut + Hair Treatment', date: 'Sep 23, 2025', points: 75, type: 'earned' },
    { service: 'Redeemed: 20% Discount', date: 'Sep 20, 2025', points: -100, type: 'redeemed' },
    { service: 'Manicure + Pedicure', date: 'Sep 15, 2025', points: 50, type: 'earned' },
    { service: 'Bonus Points (Birthday)', date: 'Sep 10, 2025', points: 200, type: 'earned' },
    { service: 'Hair Coloring', date: 'Sep 5, 2025', points: 125, type: 'earned' }
  ];

  const getFilteredCustomers = () => {
    if (!searchQuery.trim()) {
      return loyalCustomers;
    }
    
    return loyalCustomers.filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const filtered = getFilteredCustomers();
      if (filtered.length === 1) {
        setSelectedCustomer(filtered[0]);
      }
    }
  };

  const handleCloseDetails = () => {
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = getFilteredCustomers();

 return (
  <div className="space-y-6">
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onKeyPress={handleKeyPress}
    />

    {/* Conditional: Show either TABLE or DETAILS */}
    {selectedCustomer ? (
      <CustomerDetails
        customer={selectedCustomer}
        onBack={handleCloseDetails}
        recentActivity={recentActivity}
      />
    ) : (
      <CustomerTable
        customers={filteredCustomers}
        onSelectCustomer={handleSelectCustomer}
        searchQuery={searchQuery}
        totalCustomers={loyalCustomers.length}
      />
    )}
  </div>
);
};

export default LoyaltyPointsPage;