import React, { useState } from 'react';
import { Mail, Phone, Eye } from 'lucide-react';
import FilterButtons from './FilterButtons';

const TransactionTable = ({ transactions, selectedFilter, onFilterChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const getFilteredTransactions = () => {
    if (!transactions || !Array.isArray(transactions)) {
      return [];
    }
    
    switch (selectedFilter) {
      case 'online':
        return transactions.filter(t => t.payment === 'Online');
      case 'cash':
        return transactions.filter(t => t.payment === 'Cash on Service');
      default:
        return transactions;
    }
  };

  const handleViewPayment = (paymentProofUrl) => {
    setSelectedImage(paymentProofUrl);
    setShowImageModal(true);
  };

  return (
    <>
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
              <col className="w-[10%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[14%]" />
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
                <th className="pb-3 text-sm font-medium text-gray-600 px-2">Payment Proof</th>
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
                  <td className="py-4 px-2">
                    {transaction.payment === 'Online' && transaction.paymentProofUrl ? (
                      <button
                        onClick={() => handleViewPayment(transaction.paymentProofUrl)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    ) : transaction.payment === 'Online' ? (
                      <span className="text-xs text-gray-400">No proof</span>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ FIXED: Image modal - compact view, no scrollbar, buong image visible */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-8"
          onClick={() => setShowImageModal(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-50"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container - automatically fits to screen */}
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Payment Proof" 
              className="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionTable;