import React from 'react';
import { X } from 'lucide-react';
import CustomerInfo from './CustomerInfo';
import QuickActions from './QuickActions';

const CustomerDetails = ({ 
  customer, 
  onBack,
  recentActivity 
}) => {
  return (
    <>
      {/* Transparent Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onBack}
        style={{ backdropFilter: 'blur(2px)' }}
      />
      
      {/* Centered Modal - MAS RESPONSIVE */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-none">
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl z-10">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Customer Details</h2>
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <CustomerInfo customer={customer} />
            <QuickActions recentActivity={recentActivity} />
          </div>

        </div>
      </div>
    </>
  );
};

export default CustomerDetails;