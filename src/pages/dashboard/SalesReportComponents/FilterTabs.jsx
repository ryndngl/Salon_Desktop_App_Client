import React from 'react';

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex gap-2.5 items-center">
        {/* Back Button - shows only when a tab is active */}
        {activeTab && (
          <button
            onClick={() => setActiveTab(null)}
            className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
        )}
        
        {/* Tab Buttons */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              px-8 py-3 text-[15px] font-medium rounded-md transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
            `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;