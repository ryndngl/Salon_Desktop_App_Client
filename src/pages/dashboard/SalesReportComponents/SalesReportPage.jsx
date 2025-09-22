import React, { useState } from 'react';
import PeriodSelector from './PeriodSelector';
import WeeklySalesChart from './WeeklySalesChart';
import ServicePerformanceChart from './ServicePerformanceChart';
import TransactionTable from './TransactionTable';

const SalesReportPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data based on your salon services
  const mockDailySales = [
    { day: 'Mon', amount: 3500 },
    { day: 'Tue', amount: 4200 },
    { day: 'Wed', amount: 5100 },
    { day: 'Thu', amount: 3800 },
    { day: 'Fri', amount: 6500 },
    { day: 'Sat', amount: 8200 },
    { day: 'Sun', amount: 4900 }
  ];

  const mockServiceData = [
    { name: 'Hair Cut', value: 35, amount: 12250 },
    { name: 'Hair Color', value: 25, amount: 18750 },
    { name: 'Hair Treatment', value: 15, amount: 9000 },
    { name: 'Rebond & Perms', value: 12, amount: 14400 },
    { name: 'Nail Care', value: 8, amount: 3200 },
    { name: 'Foot Spa', value: 5, amount: 2000 }
  ];

  // Mock data for transactions
  const mockRecentTransactions = [
    { id: 1, client: 'Maria Santos', service: 'Hair Color', amount: 2500, payment: 'Online', date: '2024-09-22', status: 'Paid' },
    { id: 2, client: 'Jenny Cruz', service: 'Hair Cut', amount: 350, payment: 'Cash on Service', date: '2024-09-22', status: 'Completed' },
    { id: 3, client: 'Anna Reyes', service: 'Rebond & Perms', amount: 3500, payment: 'Online', date: '2024-09-22', status: 'Paid' },
    { id: 4, client: 'Lisa Garcia', service: 'Hair Treatment', amount: 1200, payment: 'Online', date: '2024-09-21', status: 'Paid' },
    { id: 5, client: 'Carmen Dela Cruz', service: 'Nail Care', amount: 800, payment: 'Cash on Service', date: '2024-09-21', status: 'Completed' },
    { id: 6, client: 'Rowena Cruz', service: 'Nail Care', amount: 800, payment: 'Cash on Service', date: '2024-09-21', status: 'Completed' },
    { id: 7, client: 'Lito Dela Joya', service: 'Nail Care', amount: 800, payment: 'Cash on Service', date: '2024-09-21', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <PeriodSelector 
            selectedPeriod={selectedPeriod} 
            onChange={setSelectedPeriod} 
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklySalesChart data={mockDailySales} />
        <ServicePerformanceChart data={mockServiceData} />
      </div>

      {/* Recent Transactions Table */}
      <TransactionTable 
        transactions={mockRecentTransactions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </div>
  );
};

export default SalesReportPage;