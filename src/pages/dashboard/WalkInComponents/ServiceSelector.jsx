import React from "react";

const ServiceSelector = ({ selectedServices, onServiceToggle }) => {
  const servicesData = {
    Haircut: {
      categories: ["Men", "Women", "Kids"],
    },
    "Hair Color": {
      categories: ["Root Touch Up", "Highlight", "Full Hair", "Balayage"],
    },
    "Hair Treatment": {
      categories: [],
    },
    "Rebond & Forms": {
      categories: [],
    },
    "Nail Care": {
      categories: [],
    },
    FootSpa: {
      categories: [],
    },
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Services *
      </label>
      <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
        {Object.entries(servicesData).map(([service, data]) => (
          <div key={service} className="mb-3">
            <div className="font-medium text-gray-700 mb-2">{service}</div>
            {data.categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 ml-4">
                {data.categories.map((category) => {
                  const serviceKey = `${service} - ${category}`;
                  return (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(serviceKey)}
                        onChange={() => onServiceToggle(service, category)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="ml-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => onServiceToggle(service)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">{service}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedServices.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {selectedServices.join(", ")}
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
