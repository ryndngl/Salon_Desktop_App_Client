import React from 'react';
import { Edit2, Trash2, DollarSign, CheckCircle, XCircle, Mail, Phone, History } from 'lucide-react';

// Helper function to convert 24-hour to 12-hour format
const formatTime = (time) => {
  if (!time) return '10:00 AM';
  
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes} ${period}`;
};

const WalkInTable = ({ 
  clients, 
  onEdit, 
  onDelete, 
  onMarkAsPaid, 
  onMarkAsServed, 
  onMarkAsCancelled,
  onViewHistory
}) => {
  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center text-gray-500">
          No walk-in clients recorded yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left">
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Services</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Schedule</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Payment</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="py-4 px-4">
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
                <td className="py-4 px-4 text-sm text-gray-900">
                  {client.services}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <div className="font-medium text-gray-900">
                    {new Date(client.date).toLocaleDateString('en-US', { 
                      month: '2-digit', 
                      day: '2-digit', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="text-xs text-gray-500">{formatTime(client.time)}</div>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                  ₱{client.amount ? parseFloat(client.amount).toLocaleString() : '0'}
                </td>
                <td className="py-4 px-4 text-sm font-medium">
                  <span className={`${
                    client.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {client.paymentStatus}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium">
                  <span className={`${
                    client.status === 'Served' ? 'text-green-600' :
                    client.status === 'Pending' ? 'text-yellow-600' :
                    client.status === 'Rescheduled' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(client)}
                      className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    {client.paymentStatus !== 'Paid' && (
                      <button
                        onClick={() => onMarkAsPaid(client.id)}
                        className="text-green-600 hover:text-green-700 transition-colors p-1"
                        title="Mark as Paid"
                      >
                        <DollarSign size={18} />
                      </button>
                    )}
                    {client.status === 'Pending' && (
                      <button
                        onClick={() => onMarkAsServed(client.id)}
                        className="text-green-600 hover:text-green-700 transition-colors p-1"
                        title="Mark as Served"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {client.status !== 'Cancelled' && (
                      <button
                        onClick={() => onMarkAsCancelled(client.id)}
                        className="text-orange-600 hover:text-orange-700 transition-colors p-1"
                        title="Mark as Cancelled"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                    {onViewHistory && (
                      <button
                        onClick={() => onViewHistory(client.id)}
                        className="text-blue-600 hover:text-blue-700 transition-colors p-1"
                        title="View History"
                      >
                        <History size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(client.id)}
                      className="text-red-600 hover:text-red-700 transition-colors p-1"
                      title="Delete"
                    >
                      <Trash2 size={18} />
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