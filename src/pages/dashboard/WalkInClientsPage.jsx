import { Plus } from 'lucide-react';

const WalkInClientsPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center ml-auto">
        <Plus size={18} className="mr-2" />
        Add Walk-in
      </button>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">Walk-in client management functionality will be implemented here.</p>
    </div>
  </div>
);

export default WalkInClientsPage;