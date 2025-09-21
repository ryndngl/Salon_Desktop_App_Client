import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ServiceCategory from './ServiceCategory';

const ServiceCard = ({ service, isExpanded, onToggle }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleServiceToggle = () => {
    onToggle(service.id);
    setExpandedCategory(null); // Reset category when closing service
  };

  const handleCategoryToggle = (categoryIndex) => {
    if (expandedCategory === categoryIndex) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryIndex);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border w-full">
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={handleServiceToggle}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold ${
                service.status === 'active' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {service.status === 'active' ? 'Active' : 'Inactive'}
              </span>
              <span className="text-sm text-gray-500">
                {service.categories.length} {service.categories.length === 1 ? 'option' : 'options'}
              </span>
            </div>
          </div>
          
          <div className="text-gray-400">
            {isExpanded ? 
              <ChevronUp size={20} /> : 
              <ChevronDown size={20} />
            }
          </div>
        </div>
      </div>

      {/* Dropdown Content with scroll */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="border-t bg-gray-50">
          <div className="p-4 max-h-72 overflow-y-auto space-y-3">
            {service.categories.map((category, index) => (
              <ServiceCategory
                key={index}
                category={category}
                index={index}
                isExpanded={expandedCategory === index}
                onToggle={handleCategoryToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;