import { useState } from 'react';
import ServicesStats from './ServicesStats';
import ServicesGrid from './ServicesGrid';
import { servicesData } from '../data/servicesData';

const ServicesPage = () => {
  const [services] = useState(servicesData);
  
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <ServicesStats services={services} />
      
      {/* Services Grid */}
      <ServicesGrid services={services} />
    </div>
  );
};

export default ServicesPage;