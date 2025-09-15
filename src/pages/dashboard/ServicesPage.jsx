import { Plus } from 'lucide-react';

const ServicesPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center ml-auto">
        <Plus size={18} className="mr-2" />
        Add Service
      </button>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">Services management functionality will be implemented here.</p>
    </div>
  </div>
);

export default ServicesPage;