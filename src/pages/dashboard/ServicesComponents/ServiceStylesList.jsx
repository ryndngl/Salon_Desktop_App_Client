import { Edit, Power } from 'lucide-react';

const ServiceStylesList = ({ styles }) => {
  return (
    <div className="max-h-48 overflow-y-auto space-y-2 pt-2">
      {styles.map((style) => (
        <div key={style.id} className="bg-white rounded-lg p-3 flex items-center justify-between border">
          <div className="flex-1">
            <h5 className="font-medium text-gray-900">{style.name}</h5>
            <p className="text-sm font-medium text-green-600">{style.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-blue-600">
              <Edit size={16} />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-600">
              <Power size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceStylesList;