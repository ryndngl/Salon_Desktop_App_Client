// WalkInClientsPage.jsx - REPLACE EVERYTHING
import React, { useState, useEffect } from "react";
import { Plus, UserX, X, Search, Calendar } from "lucide-react";
import WalkInTable from "./WalkInTable";
import WalkInStats from "./WalkInStats";
import WalkInForm from "./WalkInForm";
import WalkInFilters from "./WalkInFilters";

const API_BASE_URL = "http://192.168.100.6:5000/api";

const WalkInClientsPage = () => { 
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [showClientTypeModal, setShowClientTypeModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showExistingClientModal, setShowExistingClientModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [clientType, setClientType] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [existingClientData, setExistingClientData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    amount: "",
    paymentStatus: "Unpaid",
    status: "Pending",
  });

  useEffect(() => {
    fetchWalkIns();
  }, []);

  const fetchWalkIns = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkin`, {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch walk-ins');
      const data = await response.json();
      
      const transformedClients = data.walkIns.map(walkIn => ({
        id: walkIn._id,
        name: walkIn.name,
        email: walkIn.email || "",
        phone: walkIn.phone || "",
        services: walkIn.services,
        date: walkIn.date,
        time: walkIn.time || "",
        amount: walkIn.amount,
        paymentStatus: walkIn.paymentStatus,
        status: walkIn.status,
        is_main_record: walkIn.is_main_record !== undefined ? walkIn.is_main_record : true,
        main_client_id: walkIn.main_client_id || null
      }));
      
      setClients(transformedClients);
    } catch (err) {
      console.error('Error fetching walk-ins:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkClientExists = (name, phone) => {
    return clients.find(c => 
      c.is_main_record && 
      (c.name.toLowerCase() === name.toLowerCase() || c.phone === phone)
    );
  };

  const handleAddWalkin = () => {
    setShowClientTypeModal(true);
  };

  const handleClientTypeSelect = (type) => {
    setClientType(type);
    setShowClientTypeModal(false);
    
    if (type === 'new') {
      setShowAddForm(true);
    } else if (type === 'returning') {
      setShowSearchModal(true);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkin/search?query=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSearchResults(data.clients || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectReturningClient = (client) => {
    setSelectedClient(client);
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
    
    setFormData({
      name: client.name,
      email: client.email || "",
      phone: client.phone || "",
      services: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      amount: "",
      paymentStatus: "Unpaid",
      status: "Pending",
    });
    setSelectedServices([]);
    setShowAddForm(true);
  };

  const handleViewHistory = async (clientId) => {
    try {
      setLoadingHistory(true);
      setShowHistoryModal(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkin/${clientId}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch history');
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error('History error:', error);
      alert('Failed to load history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const getStats = () => {
    const getTodayDateString = () => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    };

    const normalizeDate = (dateStr) => {
      if (!dateStr) return null;
      try {
        if (typeof dateStr === 'string') {
          if (dateStr.includes('T')) return dateStr.split('T')[0];
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        }
        return null;
      } catch (error) {
        return null;
      }
    };

    const today = getTodayDateString();

    return {
      total: clients.filter((c) => normalizeDate(c.date) === today).length,
      newClients: clients.filter((c) => c.is_main_record === true).length,
      returningClients: clients.filter((c) => c.is_main_record === false).length,
      served: clients.filter((c) => c.status === "Served").length,
      servedToday: clients.filter((c) => c.status === "Served" && normalizeDate(c.date) === today).length,
      pending: clients.filter((c) => c.status === "Pending").length,
      rescheduled: clients.filter((c) => c.status === "Rescheduled").length,
      cancelled: clients.filter((c) => c.status === "Cancelled").length,
    };
  };

  const getFilteredClients = () => {
    if (activeFilter === 'all') return clients;
    if (activeFilter === 'new') return clients.filter((c) => c.is_main_record === true);
    if (activeFilter === 'returning') return clients.filter((c) => c.is_main_record === false);
    
    const filterMap = {
      served: 'Served',
      pending: 'Pending',
      rescheduled: 'Rescheduled',
      cancelled: 'Cancelled',
    };
    
    return clients.filter((c) => c.status === filterMap[activeFilter]);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      services: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      amount: "",
      paymentStatus: "Unpaid",
      status: "Pending",
    });
    setSelectedServices([]);
    setEditingId(null);
    setShowAddForm(false);
    setClientType(null);
    setSelectedClient(null);
  };

  const handleServiceToggle = (service, category = null) => {
    const serviceKey = category ? `${service} - ${category}` : service;
    if (selectedServices.includes(serviceKey)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceKey));
    } else {
      setSelectedServices([...selectedServices, serviceKey]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    if (!formData.name || selectedServices.length === 0) {
      alert("Name and Services are required");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Session expired. Please login again.');
      return;
    }

    if (clientType === 'new' && !editingId) {
      const existing = checkClientExists(formData.name, formData.phone);
      if (existing) {
        setExistingClientData(existing);
        setShowExistingClientModal(true);
        return;
      }
    }

    const clientData = {
      ...formData,
      services: selectedServices.join(", "),
    };

    try {
      if (editingId) {
        const response = await fetch(`${API_BASE_URL}/walkin/${editingId}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error('Update failed');
        alert('Updated successfully!');
      } else if (clientType === 'new') {
        const response = await fetch(`${API_BASE_URL}/walkin/new-client`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error('Create failed');
        alert('New client added successfully!');
      } else if (clientType === 'returning' && selectedClient) {
        const response = await fetch(`${API_BASE_URL}/walkin/returning-client/${selectedClient.id}`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error('Add visit failed');
        alert('Visit added successfully!');
      }
      
      await fetchWalkIns();
      resetForm();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    }
  };

  const handleExistingClientAddVisit = () => {
    setShowExistingClientModal(false);
    setShowAddForm(false);
    setClientType('returning');
    setSelectedClient(existingClientData);
    
    setFormData({
      name: existingClientData.name,
      email: existingClientData.email,
      phone: existingClientData.phone,
      services: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      amount: "",
      paymentStatus: "Unpaid",
      status: "Pending",
    });
    setSelectedServices([]);
    setShowAddForm(true);
    setActiveFilter('returning');
  };

  const handleEditClient = (client) => {
    setEditingId(client.id);
    setClientType(null);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      date: client.date.split('T')[0],
      time: client.time,
      amount: client.amount,
      paymentStatus: client.paymentStatus,
      status: client.status
    });
    setSelectedServices(client.services.split(", "));
    setShowAddForm(true);
  };

  const handleDeleteClient = async (id) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_BASE_URL}/walkin/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('Deleted successfully!');
        await fetchWalkIns();
      } catch (error) {
        alert('Failed to delete.');
      }
    }
  };

  const handleMarkAsPaid = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const client = clients.find(c => c.id === id);
      await fetch(`${API_BASE_URL}/walkin/${id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...client, paymentStatus: "Paid" })
      });
      await fetchWalkIns();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMarkAsServed = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const client = clients.find(c => c.id === id);
      await fetch(`${API_BASE_URL}/walkin/${id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...client, status: "Served" })
      });
      await fetchWalkIns();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMarkAsCancelled = async (id) => {
    if (confirm("Mark as cancelled?")) {
      try {
        const token = localStorage.getItem('token');
        const client = clients.find(c => c.id === id);
        await fetch(`${API_BASE_URL}/walkin/${id}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...client, status: "Cancelled" })
        });
        await fetchWalkIns();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredClients = getFilteredClients();

  return (
    <div className="space-y-6">
      <WalkInStats clients={clients} />

      <WalkInFilters 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={getStats()}
      />

      <div className="flex justify-end">
        <button
          onClick={handleAddWalkin}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Walk-in
        </button>
      </div>

      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-6">
                <UserX className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeFilter === 'returning' ? 'No Returning Clients' : 'No Walk-in Clients Yet'}
            </h3>
          </div>
        </div>
      ) : (
        <WalkInTable
          clients={filteredClients}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
          onMarkAsPaid={handleMarkAsPaid}
          onMarkAsServed={handleMarkAsServed}
          onMarkAsCancelled={handleMarkAsCancelled}
          onViewHistory={handleViewHistory}
        />
      )}

      {showClientTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowClientTypeModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Walk-in Client</h2>
              <button onClick={() => setShowClientTypeModal(false)}><X size={24} /></button>
            </div>
            <p className="mb-6">Is this a new client or returning client?</p>
            <div className="space-y-4">
              <button onClick={() => handleClientTypeSelect('new')} className="w-full bg-green-50 hover:bg-green-100 border-2 border-green-400 rounded-lg p-4 text-left">
                <h3 className="font-semibold">New Client</h3>
                <p className="text-sm text-gray-600">First time visit</p>
              </button>
              <button onClick={() => handleClientTypeSelect('returning')} className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-left">
                <h3 className="font-semibold">Returning Client</h3>
                <p className="text-sm text-gray-600">Has visited before</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {showExistingClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Client Already Exists</h2>
            <p className="mb-6">This client already exists in the system. Would you like to add a visit for this returning client?</p>
            <div className="flex gap-3">
              <button onClick={handleExistingClientAddVisit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Add Visit
              </button>
              <button onClick={() => { setShowExistingClientModal(false); resetForm(); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Find Returning Client</h2>
              <button onClick={() => { setShowSearchModal(false); setSearchResults([]); setSearchQuery(""); }}><X size={24} /></button>
            </div>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <button onClick={handleSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="space-y-3">
                {searchResults.map((client) => (
                  <button key={client.id} onClick={() => handleSelectReturningClient(client)} className="w-full bg-gray-50 hover:bg-blue-50 border rounded-lg p-4 text-left">
                    <h4 className="font-semibold">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                    <p className="text-xs text-gray-500">Last visit: {client.lastVisit ? new Date(client.lastVisit).toLocaleDateString() : 'N/A'}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Visit History</h2>
                {historyData && <p className="text-gray-600">{historyData.client?.name} • {historyData.client?.phone}</p>}
              </div>
              <button onClick={() => { setShowHistoryModal(false); setHistoryData(null); }}><X size={24} /></button>
            </div>
            {loadingHistory ? (
              <p>Loading...</p>
            ) : historyData?.visits.length > 0 ? (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <span className="font-semibold text-blue-800">Total Visits: {historyData.totalVisits}</span>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {historyData.visits.map((visit) => (
                    <div key={visit.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">{new Date(visit.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          visit.status === 'Served' ? 'bg-green-100 text-green-800' :
                          visit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          visit.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>{visit.status}</span>
                      </div>
                      <p className="text-gray-900 font-medium">{visit.services}</p>
                      <p className="text-gray-600 font-semibold mt-1">₱{visit.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No visit history</p>
            )}
          </div>
        </div>
      )}

      <WalkInForm
        showForm={showAddForm}
        isEditing={!!editingId}
        clientType={clientType}
        selectedClient={selectedClient}
        formData={formData}
        selectedServices={selectedServices}
        onInputChange={handleInputChange}
        onServiceToggle={handleServiceToggle}
        onSubmit={handleFormSubmit}
        onCancel={resetForm}
      />
    </div>
  );
};

export default WalkInClientsPage;