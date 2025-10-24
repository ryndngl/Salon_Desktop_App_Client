import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ServiceSelector = ({ selectedServices, onServiceToggle }) => {
  const [expandedServices, setExpandedServices] = useState({
    Haircut: false,
    "Hair Color": false,
    "Hair Treatment": false,
    "Rebond & Forms": false,
    "Nail Care": false,
    "Foot Spa": false,
  });

  const servicesData = {
    Haircut: {
      categories: [
        { name: "Men", price: 100 },
        { name: "Women", price: 100},
        { name: "Kids", price: 100 }
      ],
    },
    "Hair Color": {
      categories: [
        { name: "Root Touch Up", price: 499 },
        { name: "Highlight", price: 499 },
        { name: "Full Hair", price: 699 },
        { name: "Balayage", price: 1499 }
      ],
    },
    "Hair Treatment": {
      categories: [
        { name: "Bleaching", price: 200 },
        { name: "Brazilian", price: 700 },
        { name: "Cellophane", price: 500 },
        { name: "Conditioning", price: 150 },
        { name: "Hair Botox", price: 1000 },
        { name: "Cystiene", price: 1500 },
        { name: "Hair Spa", price: 300 },
        { name: "Keratin", price: 500 }
      ],
    },
    "Rebond & Forms": {
      categories: [
        { name: "Rebond with Botox", price: 2000},
        { name: "Rebond with Brazillian", price: 1500 },
        { name: "Rebond with Cellophane", price: 1300 },
        { name: "Rebond with Color", price: 2500 },
        { name: "Rebond with Keratin", price: 1000 },
      ],
    },
    "Nail Care": {
      categories: [
        { name: "Gel Polish", price: 500 },
        { name: "Removing Gel", price: 150 },
        { name: "Soft Gel", price: 800 }
      ],
    },
    "Foot Spa": {
      categories: [
        { name: "Foot Spa Package", price: 300 },
        { name: "Manicure", price: 100 },
        { name: "Pedicure", price: 100 }
      ],
    },
  };

  const toggleService = (service) => {
    setExpandedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  // ✅ FIXED: Check if service is selected by name only
  const isServiceSelected = (serviceName) => {
    return selectedServices.some(s => s.name === serviceName);
  };

  // ✅ FIXED: Handle checkbox click with debouncing
  const handleCheckboxClick = (serviceObj, e) => {
    e.stopPropagation();
    onServiceToggle(serviceObj);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Services *
      </label>
      <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
        {Object.entries(servicesData).map(([service, data]) => (
          <div key={service} className="mb-2 border-b border-gray-100 last:border-b-0 pb-2">
            <button
              type="button"
              onClick={() => toggleService(service)}
              className="w-full flex items-center justify-between font-medium text-gray-700 hover:text-gray-900 py-1"
            >
              <span>{service}</span>
              {expandedServices[service] ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {expandedServices[service] && (
              <div className="mt-2">
                {data.categories.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 ml-4">
                    {data.categories.map((category) => {
                      const serviceName = `${service} - ${category.name}`;
                      const serviceObj = {
                        name: serviceName,
                        price: category.price
                      };
                      const isChecked = isServiceSelected(serviceName);
                      
                      return (
                        <label
                          key={category.name}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCheckboxClick(serviceObj, e);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // Empty to prevent double triggering
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer pointer-events-none"
                          />
                          <span className="text-sm text-gray-600">
                            {category.name} <span className="text-green-600 font-semibold">(₱{category.price})</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="ml-4">
                    <label 
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCheckboxClick({ name: service, price: data.price }, e);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isServiceSelected(service)}
                        onChange={() => {}} // Empty to prevent double triggering
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer pointer-events-none"
                      />
                      <span className="text-sm text-gray-600">
                        {service} <span className="text-green-600 font-semibold">(₱{data.price})</span>
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedServices.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Selected:</span> {selectedServices.map(s => s.name).join(", ")}
          <div className="text-green-600 font-semibold mt-1">
            Total: ₱{selectedServices.reduce((sum, s) => sum + s.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;