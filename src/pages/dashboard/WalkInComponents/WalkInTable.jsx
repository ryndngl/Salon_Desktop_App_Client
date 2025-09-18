import React from 'react';
import { Edit2, Trash2, DollarSign, CheckCircle } from 'lucide-react';

const WalkInTable = ({ 
  clients, 
  onEdit, 
  onDelete, 
  onMarkAsPaid, 
  onMarkAsServed, 
  onMarkAsCancelled 
}) => {
  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Walk-in Clients List</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          Wala pang walk-in clients na naka-record
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Walk-in Clients List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.email || 'No email'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {client.services}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(client.date).toLocaleDateString('en-PH')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₱{client.amount ? parseFloat(client.amount).toLocaleString() : '0'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={`${
                    client.paymentStatus === 'Paid' ? 'text-green-600' :
                    client.paymentStatus === 'Partial' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {client.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={`${
                    client.status === 'Served' ? 'text-green-600' :
                    client.status === 'Pending' ? 'text-yellow-600' :
                    client.status === 'Rescheduled' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(client)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    {client.paymentStatus !== 'Paid' && (
                      <button
                        onClick={() => onMarkAsPaid(client.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Mark as Paid"
                      >
                        <DollarSign size={16} />
                      </button>
                    )}
                    {client.status === 'Pending' && (
                      <button
                        onClick={() => onMarkAsServed(client.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Mark as Served"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {client.status !== 'Cancelled' && (
                      <button
                        onClick={() => onMarkAsCancelled(client.id)}
                        className="text-orange-600 hover:text-orange-900 p-1"
                        title="Mark as Cancelled"
                      >
                        ❌
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(client.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalkInTable;