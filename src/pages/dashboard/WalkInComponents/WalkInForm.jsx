import React from "react";
import ReactDOM from "react-dom";
import { X, Save } from "lucide-react";
import ServiceSelector from "./ServiceSelector";

const WalkInForm = ({
  showForm,
  isEditing,
  clientType,
  selectedClient,
  formData,
  selectedServices,
  onInputChange,
  onServiceToggle,
  onSubmit,
  onCancel,
}) => {
  if (!showForm) return null;

  const handleSubmit = () => {
    onSubmit();
  };

  // 🆕 Check if returning client (readonly fields)
  const isReturningClient = clientType === 'returning' && selectedClient;

  // Render modal using Portal
  return ReactDOM.createPortal(
    <>
      {/* Transparent Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 9998, backdropFilter: 'blur(2px)' }}
        onClick={onCancel}
      />
      
      {/* Centered Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing 
                  ? "Edit Walk-in Client" 
                  : isReturningClient 
                    ? "Add Visit - Returning Client"
                    : "Add New Walk-in Client"}
              </h2>
              {/* 🆕 Show client name if returning */}
              {isReturningClient && (
                <p className="text-sm text-blue-600 mt-1">
                  Client: <span className="font-semibold">{selectedClient.name}</span>
                </p>
              )}
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name - 🆕 Readonly if returning client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  disabled={isReturningClient}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isReturningClient ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Client name"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Served">Served</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Email - 🆕 Readonly if returning client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  disabled={isReturningClient}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isReturningClient ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="client@email.com"
                />
              </div>

              {/* Phone - 🆕 Readonly if returning client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onInputChange}
                  disabled={isReturningClient}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isReturningClient ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="+63 912 345 6789"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₱)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="100"
                  min="100"
                  step="50"
                />
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Services */}
              <div className="col-span-2">
                <ServiceSelector
                  selectedServices={selectedServices}
                  onServiceToggle={onServiceToggle}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center"
              >
                <Save size={16} className="mr-2" />
                {isEditing ? "Update" : isReturningClient ? "Add Visit" : "Save"}
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default WalkInForm;