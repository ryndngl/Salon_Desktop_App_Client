import React from 'react';
import PointsGrid from './PointsGrid';

const CustomerInfo = ({ customer }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {customer.phone} • {customer.email}
          </p>
        </div>
        <span className="text-green-600 text-xs font-medium">
          {customer.membershipLevel}
        </span>
      </div>

      <PointsGrid customer={customer} />
    </div>
  );
};

export default CustomerInfo;