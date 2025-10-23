import React from "react";
import { X, UserPlus, Users } from "lucide-react";

const ClientTypeModal = ({ isOpen, onClose, onSelectType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Walk-in Client</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Is this a new client or a returning client?
        </p>

        <div className="space-y-4">
          {/* New Client Button */}
          <button
            onClick={() => onSelectType('new')}
            className="w-full bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-6 transition-all group"
          >
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-3 group-hover:bg-green-600 transition">
                <UserPlus className="text-white" size={28} />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">New Client</h3>
                <p className="text-sm text-gray-600">First time visit</p>
              </div>
            </div>
          </button>

          {/* Returning Client Button */}
          <button
            onClick={() => onSelectType('returning')}
            className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-6 transition-all group"
          >
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-3 group-hover:bg-blue-600 transition">
                <Users className="text-white" size={28} />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Returning Client</h3>
                <p className="text-sm text-gray-600">Has visited before</p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-gray-600 hover:text-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClientTypeModal;