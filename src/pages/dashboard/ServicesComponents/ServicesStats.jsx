const ServicesStats = ({ services }) => {
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      <div className="bg-white w-32 h-32 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center p-3">
        <p className="text-2xl font-bold text-blue-600">{services.length}</p>
        <p className="text-sm font-bold text-gray-600">Total Services</p>
      </div>
      <div className="bg-white w-32 h-32 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center p-3">
        <p className="text-2xl font-bold text-green-600">
          {services.filter(s => s.status === 'active').length}
        </p>
        <p className="text-sm font-bold text-gray-600">Active Services</p>
      </div>
      <div className="bg-white w-32 h-32 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center p-3">
        <p className="text-2xl font-bold text-red-600">
          {services.filter(s => s.status === 'inactive').length}
        </p>
        <p className="text-sm font-bold text-gray-600">Inactive Services</p>
      </div>
    </div>
  );
};

export default ServicesStats;