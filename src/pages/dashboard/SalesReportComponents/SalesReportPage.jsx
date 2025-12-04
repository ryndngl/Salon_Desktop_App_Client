import React, { useState, useEffect } from "react";
import FilterTabs from "./FilterTabs";
import DailySalesForm from "./DailySalesForm";
import WeeklySalesForm from "./WeeklySalesForm";
import MonthlySalesForm from "./MonthlySalesForm";
import TransactionTable from "./TransactionTable";
import axios from "axios";

const SalesReportPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch real transactions from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ FIXED: Use the correct endpoint - /all
      const response = await axios.get(
        "https://salon-app-server-0akh.onrender.com/api/appointments/all"
      );

      if (response.data.success) {
        // ✅ Transform API data to match table format
        const formattedTransactions = response.data.data
          .filter(
            (apt) =>
              apt.status === "Completed" ||
              apt.status === "Confirmed" ||
              apt.status === "Pending"
          ) // ✅ Include Pending
          .map((apt) => ({
            id: apt._id,
            client: apt.clientName,
            email: apt.email,
            phone: apt.phone,
            service: apt.services?.[0]?.name || "N/A",
            amount: apt.services?.[0]?.price || 0,
            payment:
              apt.modeOfPayment === "GCash" ? "Online" : "Cash on Service",
            paymentProofUrl: apt.paymentProofUrl || null, // ✅ Include payment proof URL
            date: new Date(apt.date).toISOString().split("T")[0], // Format: YYYY-MM-DD
            time: apt.time,
            status: apt.status, // ✅ Use actual status
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

        setTransactions(formattedTransactions);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
      setTransactions([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh data when tab changes back to table view
  useEffect(() => {
    if (!activeTab) {
      fetchTransactions();
    }
  }, [activeTab]);

  // ✅ Render appropriate form based on active tab
  const renderSalesForm = () => {
    switch (activeTab) {
      case "daily":
        return <DailySalesForm />;
      case "weekly":
        return <WeeklySalesForm />;
      case "monthly":
        return <MonthlySalesForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Filter Tabs */}
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sales Form - Renders different component based on tab */}
      {activeTab && renderSalesForm()}

      {/* Recent Transactions Table - Only shows when no tab is selected */}
      {!activeTab && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center text-red-600">
                <p className="font-semibold">{error}</p>
                <button
                  onClick={fetchTransactions}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-gray-600">No transactions found</p>
            </div>
          ) : (
            <TransactionTable
              transactions={transactions}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SalesReportPage;
