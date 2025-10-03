import { useState, useEffect } from 'react';
import ServicesStats from './ServicesStats';
import ServicesGrid from './ServicesGrid';
import { servicesAPI } from '../../../../services/api.js';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await servicesAPI.getAllServices();
        if (result.success) {
          setServices(result.services);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <ServicesStats services={services} />
      <ServicesGrid services={services} />
    </div>
  );
};

export default ServicesPage;