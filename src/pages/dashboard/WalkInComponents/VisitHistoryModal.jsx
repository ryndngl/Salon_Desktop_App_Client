import React, { useState, useEffect } from "react";
import { X, Calendar, DollarSign, History } from "lucide-react";

const VisitHistoryModal = ({ isOpen, onClose, clientId, clientName, API_BASE_URL }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    if (isOpen && clientId) {
      fetchHistory();
    }
  }, [isOpen, clientId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkin/${clientId}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch history');
      
      const data = await response.json();
      setHistory(data.visits || []);
      setClientInfo(data.client);
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('Failed to load visit history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Served': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Rescheduled': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visit History</h2>
            {clientInfo && (
              <p className="text-gray-600 mt-1">
                {clientInfo.name} • {clientInfo.phone}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        ) : history.length > 0 ? (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center text-blue-800">
                <History size={20} className="mr-2" />
                <span className="font-semibold">Total Visits: {history.length}</span>
              </div>
            </div>

            <div className="space-y-4">
              {history.map((visit, index) => (
                <div
                  key={visit.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-2" />
                      <span className="font-medium">{formatDate(visit.date)}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Services</p>
                      <p className="text-gray-900 font-medium">{visit.services}</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={18} className="mr-1" />
                      <span className="font-semibold">₱{visit.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No visit history found</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VisitHistoryModal;