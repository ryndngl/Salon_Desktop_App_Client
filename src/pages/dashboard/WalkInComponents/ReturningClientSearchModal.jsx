import React, { useState } from "react";
import { X, Search, Calendar } from "lucide-react";

const ReturningClientSearchModal = ({ isOpen, onClose, onSelectClient, onSearch, searchResults, isSearching }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No visits yet";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Find Returning Client</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Found {searchResults.length} client{searchResults.length !== 1 ? 's' : ''}
            </h3>
            <div className="space-y-3">
              {searchResults.map((client) => (
                <button
                  key={client.id}
                  onClick={() => onSelectClient(client)}
                  className="w-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all text-left group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {client.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{client.phone}</p>
                      {client.email && (
                        <p className="text-sm text-gray-500 mt-1">{client.email}</p>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>Last visit: {formatDate(client.lastVisit)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No clients found matching "{searchQuery}"</p>
            <p className="text-sm text-gray-400 mt-2">Try searching with a different name or phone number</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Enter a name or phone number to search</p>
          </div>
        )}

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

export default ReturningClientSearchModal;