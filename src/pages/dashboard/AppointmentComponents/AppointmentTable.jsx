import React from 'react';
import { Edit2, Trash2, CheckCircle, Calendar, XCircle, Mail, Phone } from 'lucide-react';

const AppointmentTable = ({ 
  appointments, 
  onEdit, 
  onDelete, 
  onConfirm,
  onReschedule,
  onCancel,
  onMarkAsCompleted
}) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Appointments List</h2>
        </div>
        <div className="text-center text-gray-500">
          Wala pang appointments na naka-schedule
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Completed':
        return 'text-blue-600';
      case 'Cancelled':
        return 'text-red-600';
      case 'Rescheduled':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (index) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Appointments List</h2>
      </div>
      
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
            <col className="w-1/7" />
          </colgroup>
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Client</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Contact</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Services</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Schedule</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Mode of Payment</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Status</th>
              <th className="pb-3 text-sm font-medium text-gray-600 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${getRandomColor(index)} flex items-center justify-center text-white font-medium text-sm mr-3`}>
                      {getInitials(appointment.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {appointment.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={14} className="mr-2 text-gray-400" />
                      {appointment.email || 'Not provided'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-2 text-gray-400" />
                      {appointment.phone || 'Not provided'}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-600 px-2">
                  {appointment.services}
                </td>
                <td className="py-4 px-2">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('en-PH')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-600 px-2">
                  {appointment.modeOfPayment || 'Not specified'}
                </td>
                <td className="py-4 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="py-4 text-sm font-medium px-2">
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(appointment)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit Appointment"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Confirm Button - only for pending appointments */}
                    {appointment.status === 'Pending' && (
                      <button
                        onClick={() => onConfirm(appointment.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Confirm Appointment"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {/* Reschedule Button - only for pending/confirmed appointments */}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                      <button
                        onClick={() => onReschedule(appointment)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Reschedule Appointment"
                      >
                        <Calendar size={16} />
                      </button>
                    )}

                    {/* Mark as Completed - only for confirmed appointments */}
                    {appointment.status === 'Confirmed' && (
                      <button
                        onClick={() => onMarkAsCompleted(appointment.id)}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Mark as Completed"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {/* Cancel Button - only for pending/confirmed appointments */}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                      <button
                        onClick={() => onCancel(appointment.id)}
                        className="text-orange-600 hover:text-orange-900 p-1"
                        title="Cancel Appointment"
                      >
                        <XCircle size={16} />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(appointment.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete Appointment"
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

export default AppointmentTable;