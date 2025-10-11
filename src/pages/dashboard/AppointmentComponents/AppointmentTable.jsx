import React from 'react';
import { Edit2, Trash2, CheckCircle, Calendar, XCircle, Mail, Phone } from 'lucide-react';

//  FIXED: Handle both array and string formats
const formatServices = (services) => {
  if (!services) return 'No service specified';
  
  //  Handle if services is a STRING (old data format)
  if (typeof services === 'string') {
    return services;
  }
  
  //  Handle if services is NOT an array
  if (!Array.isArray(services)) {
    return 'Invalid service data';
  }
  
  //  Handle if services is EMPTY array
  if (services.length === 0) return 'No service specified';
  
  //  Format array of service objects
  return services.map(service => {
    // Handle if service is a string (backward compatibility)
    if (typeof service === 'string') return service;
    
    // Handle service object
    const parts = [service.name || service];
    if (service.category) parts.push(service.category);
    if (service.style) parts.push(service.style);
    return parts.join(' - ');
  }).join(', ');
};

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
          No appointments scheduled yet
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-blue-700';
      case 'Pending':
        return 'text-yellow-700';
      case 'Completed':
        return 'text-green-700';
      case 'Cancelled':
        return 'text-red-700';
      case 'Rescheduled':
        return 'text-purple-700';
      default:
        return 'text-gray-700';
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Appointments List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-64">
                Client
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-64">
                Contact
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-40">
                Services
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-40">
                Schedule
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                Payment
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider w-40">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">

                {/* Client Column */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-10 rounded-full ${getRandomColor(index)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                    >
                      {getInitials(appointment.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {appointment.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        ID: {appointment.id.slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact Column */}
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{appointment.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-gray-400 flex-shrink-0" />
                      <span>{appointment.phone || 'N/A'}</span>
                    </div>
                  </div>
                </td>

                {/* Services Column - ✅ FIXED */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {formatServices(appointment.services)}
                  </div>
                </td>

                {/* Schedule Column */}
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {appointment.time || 'Time not specified'} 
                    </div>
                  </div>
                </td>

                {/* Payment Column */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {appointment.modeOfPayment || 'Not specified'}
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(appointment)}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-1.5 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Confirm Button */}
                    {appointment.status === 'Pending' && (
                      <button
                        onClick={() => onConfirm(appointment.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1.5 rounded transition-colors"
                        title="Confirm"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {/* Reschedule Button */}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                      <button
                        onClick={() => onReschedule(appointment)}
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-1.5 rounded transition-colors"
                        title="Reschedule"
                      >
                        <Calendar size={16} />
                      </button>
                    )}

                    {/* Complete Button */}
                    {appointment.status === 'Confirmed' && (
                      <button
                        onClick={() => onMarkAsCompleted(appointment.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1.5 rounded transition-colors"
                        title="Mark Complete"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {/* Cancel Button */}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                      <button
                        onClick={() => onCancel(appointment.id)}
                        className="text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-1.5 rounded transition-colors"
                        title="Cancel"
                      >
                        <XCircle size={16} />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(appointment.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded transition-colors"
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

export default AppointmentTable;