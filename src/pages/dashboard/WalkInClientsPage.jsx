// Sa WalkInClientsPage.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import WalkInTable from "./WalkInComponents/WalkInTable";
import WalkInStats from "./WalkInComponents/WalkInStats";
import WalkInForm  from "./WalkInComponents/WalkInForm";
const WalkInClientsPage = () => { 
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      phone: "09123456789",
      services: "Haircut - Women, Hair Color - Full Hair",
      date: "2025-09-16",
      amount: 800,
      paymentStatus: "Paid",
      status: "Served",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      email: "juan.delacruz@yahoo.com",
      phone: "09987654321",
      services: "Haircut - Men, Hair Treatment",
      date: "2025-09-16",
      amount: 500,
      paymentStatus: "Unpaid",
      status: "Served",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    paymentStatus: "Unpaid",
    status: "Pending",
  });

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      services: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      paymentStatus: "Unpaid",
      status: "Pending",
    });
    setSelectedServices([]);
    setEditingId(null);
    setShowAddForm(false);
  };

  // Handle service selection toggle
  const handleServiceToggle = (service, category = null) => {
    const serviceKey = category ? `${service} - ${category}` : service;

    if (selectedServices.includes(serviceKey)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceKey));
    } else {
      setSelectedServices([...selectedServices, serviceKey]);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (!formData.name || selectedServices.length === 0) {
      alert("Name at Services ay required");
      return;
    }

    const clientData = {
      ...formData,
      services: selectedServices.join(", "),
    };

    if (editingId) {
      // Update existing client
      setClients(
        clients.map((client) =>
          client.id === editingId ? { ...clientData, id: editingId } : client
        )
      );
    } else {
      // Add new client
      const newClient = {
        id: Date.now(),
        ...clientData,
      };
      setClients([...clients, newClient]);
    }

    resetForm();
  };

  // Handle edit client
  const handleEditClient = (client) => {
    setEditingId(client.id);
    setFormData(client);
    setSelectedServices(client.services.split(", "));
    setShowAddForm(true);
  };

  // Handle delete client
  const handleDeleteClient = (id) => {
    if (confirm("Sure ka ba na gusto mo i-delete ang client na ito?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  // Handle quick actions
  const handleMarkAsPaid = (id) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, paymentStatus: "Paid" } : client
      )
    );
  };

  const handleMarkAsServed = (id) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, status: "Served" } : client
      )
    );
  };

  const handleMarkAsCancelled = (id) => {
    if (confirm("Mark this client as cancelled?")) {
      setClients(
        clients.map((client) =>
          client.id === id ? { ...client, status: "Cancelled" } : client
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <WalkInStats clients={clients} />

      {/* Add Walk-in Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Walk-in
        </button>
      </div>

      {/* Add/Edit Form */}
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

      {/* Clients Data Table */}
      <WalkInTable
        clients={clients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        onMarkAsPaid={handleMarkAsPaid}
        onMarkAsServed={handleMarkAsServed}
        onMarkAsCancelled={handleMarkAsCancelled}
      />
    </div>
  );
};

export default WalkInClientsPage;
