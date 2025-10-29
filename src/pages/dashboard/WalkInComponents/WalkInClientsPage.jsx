// WalkInClientsPage.jsx - FIXED VERSION
import React, { useState, useEffect } from "react";
import { Plus, UserX, X, Search, Calendar } from "lucide-react";
import WalkInTable from "./WalkInTable";
import WalkInStats from "./WalkInStats";
import WalkInForm from "./WalkInForm";
import WalkInFilters from "./WalkInFilters";

const API_BASE_URL = "https://salon-app-server.onrender.com/api";

const WalkInClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("new");

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [clientType, setClientType] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [existingClientData, setExistingClientData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [showExistingClientModal, setShowExistingClientModal] = useState(false);
  const [existingClientName, setExistingClientName] = useState("");

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
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/walkin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch walk-ins");
      const data = await response.json();

      const transformedClients = data.walkIns.map((walkIn) => ({
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
        is_main_record:
          walkIn.is_main_record !== undefined ? walkIn.is_main_record : true,
        main_client_id: walkIn.main_client_id || null,
        visitHistory: walkIn.visitHistory || [], // ✅ Include visit history
      }));

      setClients(transformedClients);
    } catch (err) {
      console.error("Error fetching walk-ins:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkClientExists = (name, phone) => {
    return clients.find(
      (c) =>
        c.is_main_record &&
        (c.name.toLowerCase() === name.toLowerCase() || c.phone === phone)
    );
  };

  const handleAddWalkin = () => {
    setClientType("new");
    setSelectedClient(null);
    setShowAddForm(true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setIsSearching(true);
      setShowSearchResults(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/walkin/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data.clients || []);
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectReturningClient = (client) => {
    setSelectedClient(client);
    setClientType("returning");
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);

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

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/walkin/${clientId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error("History error:", error);
      alert("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  // ✅ FIXED: Helper function para sa date comparison
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      if (typeof dateStr === "string") {
        if (dateStr.includes("T")) return dateStr.split("T")[0];
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        if (dateStr.includes("/")) {
          const [month, day, year] = dateStr.split(" ")[0].split("/");
          return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // ✅ SIMPLIFIED: Stats computation based on visit history
  const getStats = () => {
    const today = getTodayDateString();
    const todayClients = clients.filter((c) => normalizeDate(c.date) === today);

    // Count NEW clients (no visit history)
    const newClientsCount = todayClients.filter(
      (c) => !c.visitHistory || c.visitHistory.length === 0
    ).length;

    // Count RETURNING clients (has visit history)
    const returningClientsCount = todayClients.filter(
      (c) => c.visitHistory && c.visitHistory.length > 0
    ).length;

    return {
      total: todayClients.length,
      newClients: newClientsCount,
      returningClients: returningClientsCount,
      served: todayClients.filter((c) => c.status === "Served").length,
      servedToday: todayClients.filter((c) => c.status === "Served").length,
      pending: todayClients.filter((c) => c.status === "Pending").length,
      rescheduled: todayClients.filter((c) => c.status === "Rescheduled")
        .length,
      cancelled: todayClients.filter((c) => c.status === "Cancelled").length,
    };
  };

  // ✅ SIMPLIFIED: Filter clients based on visit history
  const getFilteredClients = () => {
    const today = getTodayDateString();
    const todayClients = clients.filter((c) => normalizeDate(c.date) === today);

    switch (activeFilter) {
      case "new":
        // NEW CLIENT: Has NO visit history (first time client)
        return todayClients.filter(
          (c) => !c.visitHistory || c.visitHistory.length === 0
        );

      case "returning":
        // RETURNING CLIENT: Has visit history (came back)
        return todayClients.filter(
          (c) => c.visitHistory && c.visitHistory.length > 0
        );

      case "served":
        return todayClients.filter((c) => c.status === "Served");
      case "pending":
        return todayClients.filter((c) => c.status === "Pending");
      case "rescheduled":
        return todayClients.filter((c) => c.status === "Rescheduled");
      case "cancelled":
        return todayClients.filter((c) => c.status === "Cancelled");
      default:
        return todayClients;
    }
  };

  const filteredClients = getFilteredClients();

  // ✅ FIXED: Handle service toggle with object (name + price)
  const handleServiceToggle = (serviceObj) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.name === serviceObj.name);
      if (exists) {
        // Remove service
        return prev.filter((s) => s.name !== serviceObj.name);
      } else {
        // Add service
        return [...prev, serviceObj];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setClientType(null);
    setSelectedClient(null);
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
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // ✅ FIXED: Build services string from selected services array
    const servicesString =
      selectedServices.length > 0
        ? selectedServices.map((s) => s.name).join(", ")
        : formData.services;

    // ✅ FIXED: Validation
    if (!servicesString) {
      alert("Please select at least one service");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        // Update existing walk-in
        const response = await fetch(`${API_BASE_URL}/walkin/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            services: servicesString,
            amount: parseFloat(formData.amount),
          }),
        });

        if (!response.ok) throw new Error("Failed to update");
        alert("Walk-in updated successfully!");
      } else {
        // Create new walk-in
        if (clientType === "new") {
          // ✅ NEW: Check if client already exists
          const existingClient = clients.find(
            (c) =>
              c.name.toLowerCase() === formData.name.toLowerCase() ||
              (formData.phone && c.phone === formData.phone)
          );

          if (existingClient) {
            setExistingClientName(formData.name);
            setShowExistingClientModal(true);
            resetForm();
            return;
          }

          // New client - create main record
          const response = await fetch(`${API_BASE_URL}/walkin/new-client`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              services: servicesString,
              date: formData.date,
              time: formData.time,
              amount: parseFloat(formData.amount),
              paymentStatus: formData.paymentStatus,
              status: formData.status,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create new client");
          }
          alert("New client added successfully!");
        } else if (clientType === "returning" && selectedClient) {
          // Returning client - update main record
          const response = await fetch(
            `${API_BASE_URL}/walkin/returning-client/${selectedClient.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                services: servicesString,
                date: formData.date,
                time: formData.time,
                amount: parseFloat(formData.amount),
                paymentStatus: formData.paymentStatus,
                status: formData.status,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add visit");
          }
          alert("Visit added successfully!");
        }
      }

      await fetchWalkIns();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || "Failed to save walk-in");
    }
  };

  const handleEditClient = (client) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      services: client.services,
      date: client.date,
      time: client.time,
      amount: client.amount,
      paymentStatus: client.paymentStatus,
      status: client.status,
    });

    // ✅ FIXED: Parse services string back to array for editing
    // Note: When editing, we don't have the original prices, so we'll just show the services string
    // User will need to re-select services if they want to change them
    setSelectedServices([]);
    setShowAddForm(true);
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this walk-in?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/walkin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete");

      alert("Walk-in deleted successfully!");
      await fetchWalkIns();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete walk-in");
    }
  };

  const handleMarkAsPaid = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/walkin/mark-paid/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to mark as paid");

      await fetchWalkIns();
    } catch (error) {
      console.error("Mark as paid error:", error);
      alert("Failed to mark as paid");
    }
  };

  const handleMarkAsServed = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/walkin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Served" }),
      });

      if (!response.ok) throw new Error("Failed to mark as served");

      await fetchWalkIns();
    } catch (error) {
      console.error("Mark as served error:", error);
      alert("Failed to mark as served");
    }
  };

  const handleMarkAsCancelled = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this walk-in?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/walkin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!response.ok) throw new Error("Failed to cancel");

      await fetchWalkIns();
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel walk-in");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading walk-ins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalkInStats stats={getStats()} />

      <WalkInFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={getStats()}
      />

      {/* SEARCH BAR - SA NEW CLIENT TAB NA */}
      {activeFilter === "new" && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search existing clients by name or phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value.trim()) {
                    setShowSearchResults(false);
                    setSearchResults([]);
                  }
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      )}

      {/* ADD WALK-IN BUTTON - FOR BRAND NEW CLIENTS ONLY */}
      {activeFilter === "new" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddWalkin}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add New Client
          </button>
        </div>
      )}

      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-6">
                <UserX className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeFilter === "returning"
                ? "No Returning Clients Today"
                : "No Walk-in Clients Yet"}
            </h3>
          </div>
        </div>
      ) : (
        <div>
          {/* ✅ Dynamic Table Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {activeFilter === "returning"
              ? "List of Returning Walk-in Clients"
              : "List of Walk-in Clients"}
          </h2>
          <WalkInTable
            clients={filteredClients}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
            onMarkAsPaid={handleMarkAsPaid}
            onMarkAsServed={handleMarkAsServed}
            onMarkAsCancelled={handleMarkAsCancelled}
            onViewHistory={handleViewHistory}
          />
        </div>
      )}

      {/* SEARCH RESULTS MODAL */}
      {showSearchResults && searchQuery.trim() && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            setShowSearchResults(false);
            setSearchResults([]);
          }}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <button
                onClick={() => {
                  setShowSearchResults(false);
                  setSearchResults([]);
                  setSearchQuery("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {isSearching ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((client) => (
                  <div
                    key={client.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {client.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {client.phone}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSelectReturningClient(client)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Add New Visit
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm font-medium">
                          Last Visit:
                        </span>
                        <span className="font-medium text-gray-900">
                          {client.lastVisit
                            ? new Date(client.lastVisit).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      {client.lastTime && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">Time:</span>
                          <span className="font-medium text-gray-900">
                            {formatTime(client.lastTime)}
                          </span>
                        </div>
                      )}

                      {client.lastServices && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">
                            Services:
                          </span>
                          <span className="font-medium text-gray-900">
                            {client.lastServices}
                          </span>
                        </div>
                      )}

                      {client.lastAmount && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">Amount:</span>
                          <span className="font-semibold text-green-600">
                            ₱{client.lastAmount}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => handleViewHistory(client.id)}
                        className="w-full mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium py-1"
                      >
                        View Full Visit History →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No clients found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HISTORY MODAL */}
      {showHistoryModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            setShowHistoryModal(false);
            setHistoryData(null);
          }}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
              <div>
                <h2 className="text-2xl font-bold">Visit History</h2>
                {historyData && (
                  <p className="text-gray-600">
                    {historyData.client?.name} • {historyData.client?.phone}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  setHistoryData(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            {loadingHistory ? (
              <p className="text-center py-8">Loading...</p>
            ) : historyData?.visits.length > 0 ? (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <span className="font-semibold text-blue-800">
                    Total Visits: {historyData.totalVisits}
                  </span>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {historyData.visits.map((visit) => (
                    <div key={visit.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">
                            {new Date(visit.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            visit.status === "Served"
                              ? "bg-green-100 text-green-800"
                              : visit.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : visit.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {visit.status}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium">
                        {visit.services}
                      </p>
                      <p className="text-gray-600 font-semibold mt-1">
                        ₱{visit.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No visit history</p>
            )}
          </div>
        </div>
      )}

      {/* EXISTING CLIENT MODAL */}
      {showExistingClientModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowExistingClientModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Client Already Exists!
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Client{" "}
              <span className="font-semibold text-gray-900">
                "{existingClientName}"
              </span>{" "}
              is already in the system.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 text-center">
                Please use the <span className="font-semibold">Search Bar</span>{" "}
                to find this client and add a new visit instead.
              </p>
            </div>

            <button
              onClick={() => setShowExistingClientModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              OK, Got it!
            </button>
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
