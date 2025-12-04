// src/pages/dashboard/StaffComponents/StaffPage.jsx
import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import StaffTable from "./StaffTable";
import CreateStaffModal from "./CreateStaffModal";
import ResetPasswordModal from "./ResetPasswordModal";

const StaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fetch all staff
  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://salon-app-server-0akh.onrender.com/api/staff"
      );
      const result = await response.json();

      if (result.isSuccess) {
        setStaffList(result.staff || []);
        setFilteredStaff(result.staff || []);
      } else {
        console.error("Failed to fetch staff:", result.message);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStaff(staffList);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = staffList.filter(
      (staff) =>
        staff.username?.toLowerCase().includes(query) ||
        staff.email?.toLowerCase().includes(query)
    );
    setFilteredStaff(filtered);
  }, [searchQuery, staffList]);

  // Handle staff creation success
  const handleStaffCreated = () => {
    fetchStaff(); // Refresh list
  };

  // Handle reset password
  const handleResetPassword = (staff) => {
    setSelectedStaff(staff);
    setIsResetPasswordModalOpen(true);
  };

  // Handle reset password success
  const handleResetPasswordSuccess = () => {
    setIsResetPasswordModalOpen(false);
    setSelectedStaff(null);
  };

  // Handle delete staff
  const handleDeleteStaff = async (staffId) => {
    if (!confirm("Are you sure you want to delete this staff account?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://salon-app-server-0akh.onrender.com/api/staff/${staffId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.isSuccess) {
        alert("Staff deleted successfully");
        fetchStaff(); // Refresh list
      } else {
        alert(`Failed to delete staff: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff account");
    }
  };

  return (
    <div className="p-6">
      {/* Search Bar and Add Button */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add New Staff Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          <UserPlus size={20} />
          Add New Staff
        </button>
      </div>

      {/* Staff Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading staff...</div>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-gray-400 text-lg mb-2">
            No staff accounts found
          </div>
          {searchQuery && (
            <div className="text-gray-500 text-sm">
              Try adjusting your search query
            </div>
          )}
        </div>
      ) : (
        <StaffTable
          staffList={filteredStaff}
          onResetPassword={handleResetPassword}
          onDelete={handleDeleteStaff}
        />
      )}

      {/* Create Staff Modal */}
      <CreateStaffModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleStaffCreated}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => {
          setIsResetPasswordModalOpen(false);
          setSelectedStaff(null);
        }}
        staff={selectedStaff}
        onSuccess={handleResetPasswordSuccess}
      />
    </div>
  );
};

export default StaffPage;
