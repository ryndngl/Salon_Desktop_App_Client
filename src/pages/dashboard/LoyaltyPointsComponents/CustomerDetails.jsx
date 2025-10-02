import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import CustomerInfo from './CustomerInfo';
import QuickActions from './QuickActions';

const CustomerDetails = ({ 
  customer, 
  onBack,
  recentActivity 
}) => {
  // Render modal using Portal - LABAS NA SA PARENT CONTAINER
  return ReactDOM.createPortal(
    <>
      {/* Transparent Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 9998, backdropFilter: 'blur(2px)' }}
        onClick={onBack}
      />
      
      {/* Centered Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
            <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <CustomerInfo customer={customer} />
            <QuickActions recentActivity={recentActivity} />
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default CustomerDetails;