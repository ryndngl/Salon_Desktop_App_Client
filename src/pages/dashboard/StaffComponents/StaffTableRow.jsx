// src/pages/dashboard/StaffComponents/StaffTableRow.jsx
import { Eye, KeyRound, Trash2 } from "lucide-react";
import { useState } from "react";

const StaffTableRow = ({ staff, onResetPassword, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (username) => {
    if (!username) return "?";
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        {/* Staff Member */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {getInitials(staff.username)}
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {staff.username}
              </div>
              <div className="text-sm text-gray-500">ID: {staff._id?.slice(-6)}</div>
            </div>
          </div>
        </td>

        {/* Email */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{staff.email}</div>
        </td>

        {/* Role */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold text-blue-800">
            {staff.role || "staff"}
          </span>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold ${
              staff.isActive
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {staff.isActive ? "Active" : "Inactive"}
          </span>
        </td>

        {/* Last Login */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(staff.lastLogin)}
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {/* View Details */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-900 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>

            {/* Reset Password */}
            <button
              onClick={() => onResetPassword(staff)}
              className="text-orange-600 hover:text-orange-900 transition-colors"
              title="Reset Password"
            >
              <KeyRound size={18} />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(staff._id)}
              className="text-red-600 hover:text-red-900 transition-colors"
              title="Delete Staff"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>

      {/* Expandable Details Row */}
      {showDetails && (
        <tr className="bg-gray-50">
          <td colSpan="6" className="px-6 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Created:</span>{" "}
                <span className="text-gray-600">
                  {formatDate(staff.createdAt)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Updated:</span>{" "}
                <span className="text-gray-600">
                  {formatDate(staff.updatedAt)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Login Count:
                </span>{" "}
                <span className="text-gray-600">
                  {staff.loginHistory?.length || 0} times
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Created By:</span>{" "}
                <span className="text-gray-600">
                  {staff.createdBy?.slice(-6) || "System"}
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default StaffTableRow;