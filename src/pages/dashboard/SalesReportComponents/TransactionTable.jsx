import React from 'react';
import { Mail, Phone } from 'lucide-react';
import FilterButtons from './FilterButtons';

const TransactionTable = ({ transactions, selectedFilter, onFilterChange }) => {
  const getFilteredTransactions = () => {
    switch (selectedFilter) {
      case 'online':
        return transactions.filter(t => t.payment === 'Online');
      case 'cash':
        return transactions.filter(t => t.payment === 'Cash on Service');
      default:
        return transactions;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        <FilterButtons 
          selectedFilter={selectedFilter} 
          onFilterChange={onFilterChange} 
        />
      </div>
      
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-1/7" />
            <col className="w-2/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
          </colgroup>
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Customer</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Contact</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Service</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Amount</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Payment Method</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Date</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTransactions().map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-sm text-gray-900 px-2">{transaction.client}</td>
                <td className="py-4 px-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {transaction.email || 'maria.santos@gmail.com'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {transaction.phone || '+63 917 123 4567'}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-600 px-2">{transaction.service}</td>
                <td className="py-4 text-sm font-semibold text-gray-900 px-2">₱{transaction.amount.toLocaleString()}</td>
                <td className="py-4 text-sm px-2">
                  <span className={`text-sm font-medium ${
                    transaction.payment === 'Online' 
                      ? 'text-blue-600' 
                      : 'text-green-600'
                  }`}>
                    {transaction.payment}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-600 px-2">
                  <div>{transaction.date}</div>
                  <div className="text-xs text-gray-500">{transaction.time || '10:00 AM'}</div>
                </td>
                <td className="py-4 text-sm px-2">
                  <span className={`text-sm font-medium ${
                    transaction.status === 'Paid' || transaction.status === 'Completed'
                      ? 'text-green-600' 
                      : 'text-yellow-600'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;