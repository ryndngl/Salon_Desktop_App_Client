import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ServicesStats from './ServicesStats';
import StyleCard from './StyleCard';
import AddServiceModal from './AddServiceModal';
import { servicesAPI } from '../../../../services/api.js';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchServices = async () => {
    try {
      const result = await servicesAPI.getAllServices();
      if (result.success) {
        setServices(result.services);
        // Auto-select first service and category
        if (result.services.length > 0) {
          setSelectedService(result.services[0]);
          if (result.services[0].categories.length > 0) {
            setSelectedCategory(result.services[0].categories[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    // Auto-select first category of new service
    if (service.categories.length > 0) {
      setSelectedCategory(service.categories[0]);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards - Stay at top */}
      <ServicesStats services={services} />

      {/* Main Service Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        
        {/* Service Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 border-b pb-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedService?.id === service.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {service.name}
            </button>
          ))}

          {/* Add Service Button - Blue */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2.5 rounded-full font-medium transition-all bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Category Sub-tabs (if service has categories) */}
        {selectedService && selectedService.categories.length > 0 && (
          <div className="flex gap-3 mb-6">
            {selectedService.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory?.name === category.name
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Style Cards Grid */}
        {selectedCategory && selectedCategory.styles && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedCategory.styles.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                serviceId={selectedService._id}
                categoryName={selectedCategory.name}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {(!selectedCategory || !selectedCategory.styles || selectedCategory.styles.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            No styles available in this category
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      <AddServiceModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onServiceAdded={() => {
          // Refresh services after adding
          fetchServices();
        }}
      />
    </div>
  );
};

export default ServicesPage;