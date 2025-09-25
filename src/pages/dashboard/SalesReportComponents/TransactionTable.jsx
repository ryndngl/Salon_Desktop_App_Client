import React from 'react';
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
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/6" />
          </colgroup>
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Customer</th>
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
                <td className="py-4 text-sm text-gray-600 px-2">{transaction.date}</td>
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