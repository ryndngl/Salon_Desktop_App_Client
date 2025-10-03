import React, { useState, useEffect } from "react";
import { Plus, UserX } from "lucide-react";
import WalkInTable from "./WalkInTable";
import WalkInStats from "./WalkInStats";
import WalkInForm from "./WalkInForm";


// TEMPORARY - walkInService code pasted directly here
const API_BASE_URL = 'http://localhost:5000/api';

const walkInService = {
  getAll: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch walk-ins');
      return await response.json();
    } catch (error) {
      console.error('walkInService.getAll error:', error);
      throw error;
    }
  },

  create: async (walkInData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(walkInData)
      });
      if (!response.ok) throw new Error('Failed to create walk-in');
      return await response.json();
    } catch (error) {
      console.error('walkInService.create error:', error);
      throw error;
    }
  },

  update: async (id, walkInData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(walkInData)
      });
      if (!response.ok) throw new Error('Failed to update walk-in');
      return await response.json();
    } catch (error) {
      console.error('walkInService.update error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/walkins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete walk-in');
      return await response.json();
    } catch (error) {
      console.error('walkInService.delete error:', error);
      throw error;
    }
  }
};

const WalkInClientsPage = () => { 
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
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

  // Fetch walk-ins from API on mount
  useEffect(() => {
    fetchWalkIns();
  }, []);

  const fetchWalkIns = async () => {
    try {
      setLoading(true);
      const response = await walkInService.getAll();
      
      // Transform data from API
      const transformedClients = response.walkIns.map(walkIn => ({
        id: walkIn._id,
        name: walkIn.name,
        email: walkIn.email || "",
        phone: walkIn.phone || "",
        services: walkIn.services,
        date: walkIn.date,
        time: walkIn.time || "",
        amount: walkIn.amount,
        paymentStatus: walkIn.paymentStatus,
        status: walkIn.status
      }));
      
      setClients(transformedClients);
      setError(null);
    } catch (err) {
      console.error('Error fetching walk-ins:', err);
      setError('Failed to load walk-in clients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
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
  };

  // Handle service toggle
  const handleServiceToggle = (service, category = null) => {
    const serviceKey = category ? `${service} - ${category}` : service;

    if (selectedServices.includes(serviceKey)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceKey));
    } else {
      setSelectedServices([...selectedServices, serviceKey]);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleFormSubmit = async () => {
    if (!formData.name || selectedServices.length === 0) {
      alert("Name and Services are required");
      return;
    }

    const clientData = {
      ...formData,
      services: selectedServices.join(", "),
    };

    try {
      if (editingId) {
        // Update existing
        await walkInService.update(editingId, clientData);
        alert('Walk-in client updated successfully!');
      } else {
        // Create new
        await walkInService.create(clientData);
        alert('Walk-in client added successfully!');
      }
      
      // Refresh list
      await fetchWalkIns();
      resetForm();
    } catch (error) {
      console.error('Error saving walk-in:', error);
      alert('Failed to save walk-in client. Please try again.');
    }
  };

  // Handle edit
  const handleEditClient = (client) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      date: client.date.split('T')[0], // Format date
      time: client.time,
      amount: client.amount,
      paymentStatus: client.paymentStatus,
      status: client.status
    });
    setSelectedServices(client.services.split(", "));
    setShowAddForm(true);
  };

  // Handle delete
  const handleDeleteClient = async (id) => {
    if (confirm("Sure ka ba na gusto mo i-delete ang client na ito?")) {
      try {
        await walkInService.delete(id);
        alert('Walk-in client deleted successfully!');
        await fetchWalkIns();
      } catch (error) {
        console.error('Error deleting walk-in:', error);
        alert('Failed to delete walk-in client.');
      }
    }
  };

  // Quick actions
  const handleMarkAsPaid = async (id) => {
    try {
      const client = clients.find(c => c.id === id);
      await walkInService.update(id, { ...client, paymentStatus: "Paid" });
      await fetchWalkIns();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleMarkAsServed = async (id) => {
    try {
      const client = clients.find(c => c.id === id);
      await walkInService.update(id, { ...client, status: "Served" });
      await fetchWalkIns();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleMarkAsCancelled = async (id) => {
    if (confirm("Mark this client as cancelled?")) {
      try {
        const client = clients.find(c => c.id === id);
        await walkInService.update(id, { ...client, status: "Cancelled" });
        await fetchWalkIns();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading walk-in clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalkInStats clients={clients} />

      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Walk-in
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-6">
                <UserX className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Walk-in Clients Yet
            </h3>
            <p className="text-gray-500">
              Start by adding your first walk-in client to keep track of their visits and services.
            </p>
          </div>
        </div>
      ) : (
        <WalkInTable
          clients={clients}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
          onMarkAsPaid={handleMarkAsPaid}
          onMarkAsServed={handleMarkAsServed}
          onMarkAsCancelled={handleMarkAsCancelled}
        />
      )}

      <WalkInForm
        showForm={showAddForm || editingId}
        isEditing={!!editingId}
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