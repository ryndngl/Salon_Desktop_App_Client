import { useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesGrid = ({ services }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardToggle = (serviceId) => {
    if (expandedCard === serviceId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(serviceId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedCard === service.id}
          onToggle={handleCardToggle}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;