import React from 'react';
import { Edit2, Trash2, DollarSign, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';

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
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Walk-in Clients</h2>
        </div>
        <div className="text-center text-gray-500">
        No walk-in clients recorded yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">List of Walk-in Clients</h2>
      </div>
      
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-32">Name</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-48">Contact</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-40">Services</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-24">Date</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-24">Amount</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-24">Payment</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-24">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-sm font-medium text-gray-900 px-2">
                  {client.name}
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {client.email || 'Not provided'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {client.phone || 'Not provided'}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-500 px-2">
                  {client.services}
                </td>
                <td className="py-4 text-sm text-gray-500 px-2">
                  <div>{new Date(client.date).toLocaleDateString('en-PH')}</div>
                  <div className="text-xs text-gray-500">{client.time || '10:00 AM'}</div>
                </td>
                <td className="py-4 text-sm text-gray-500 px-2">
                  ₱{client.amount ? parseFloat(client.amount).toLocaleString() : '0'}
                </td>
                <td className="py-4 text-sm font-medium px-2">
                  <span className={`${
                    client.paymentStatus === 'Paid' ? 'text-green-600' :
                    client.paymentStatus === 'Partial' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {client.paymentStatus}
                  </span>
                </td>
                <td className="py-4 text-sm font-medium px-2">
                  <span className={`${
                    client.status === 'Served' ? 'text-green-600' :
                    client.status === 'Pending' ? 'text-yellow-600' :
                    client.status === 'Rescheduled' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="py-4 text-sm font-medium px-2">
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
                        <XCircle size={16} />
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