import React from 'react';
import { Edit2, Trash2, CheckCircle, Clock, Phone, Calendar, XCircle } from 'lucide-react';

const AppointmentTable = ({ 
  appointments, 
  onEdit, 
  onDelete, 
  onConfirm,
  onReschedule,
  onCancel,
  onMarkAsCompleted,
  onCall
}) => {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Appointments List</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          Wala pang appointments na naka-schedule
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Completed':
        return 'text-blue-600 bg-blue-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      case 'Rescheduled':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Appointments List</h2>
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
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mode of Payment
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
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {appointment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.email || 'No email'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.phone || 'No phone'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {appointment.services}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(appointment.date).toLocaleDateString('en-PH')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.modeOfPayment || 'Not specified'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(appointment)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit Appointment"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Call Button */}
                    {appointment.phone && (
                      <button
                        onClick={() => onCall(appointment.phone)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Call Client"
                      >
                        <Phone size={16} />
                      </button>
                    )}

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