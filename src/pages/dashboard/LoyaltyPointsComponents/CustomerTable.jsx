import React from 'react';
import { Mail, Phone } from 'lucide-react';

const CustomerTable = ({ 
  customers = [], 
  onSelectCustomer = () => {}, 
  searchQuery = '', 
  totalCustomers = 0 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Loyal Customers</h2>
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full min-w-full table-fixed">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/5">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/5">Contact</th>
              <th className="py-3 px-4 font-medium text-gray-700 w-1/5" style={{textAlign: 'center', paddingLeft: '8px'}}>Points</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/5">Membership</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{customer.phone}</span>
                  </div>
                </td>
                <td className="py-3 px-4 w-1/5" style={{textAlign: 'center', paddingLeft: '8px'}}>
                  <div className="font-semibold text-gray-900">{customer.currentPoints.toLocaleString()}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-600 text-sm font-medium">{customer.membershipLevel}</span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onSelectCustomer(customer)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && searchQuery.trim() && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No customers found</h3>
            <p>Try adjusting your search terms or check back later.</p>
          </div>
        </div>
      )}

      {customers.length > 0 && searchQuery.trim() && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {customers.length} of {totalCustomers} customers
        </div>
      )}
    </div>
  );
};

export default CustomerTable;