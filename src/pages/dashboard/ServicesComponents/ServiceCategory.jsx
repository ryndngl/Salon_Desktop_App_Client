import { ChevronDown, ChevronUp } from 'lucide-react';
import ServiceStylesList from './ServiceStylesList';

const ServiceCategory = ({ category, serviceId, index, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-lg border">
      {/* Category Header - Clickable */}
      <div
        className="p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
        onClick={() => onToggle(index)}
      >
        <h4 className="font-medium text-gray-900">{category.name}</h4>
        <div className="text-gray-400">
          {isExpanded ? 
            <ChevronUp size={16} /> : 
            <ChevronDown size={16} />
          }
        </div>
      </div>

      {/* Category Details - Expandable */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t bg-gray-50">
          {category.styles ? (
            <ServiceStylesList 
              styles={category.styles} 
              serviceId={serviceId}
              categoryName={category.name}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2 text-sm pt-2">
              <div>
                <p className="font-medium text-green-600">{category.price}</p>
              </div>
              <div className="text-gray-400">
                {category.duration}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCategory;