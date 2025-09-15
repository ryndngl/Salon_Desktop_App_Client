import { Calendar, UserPlus, DollarSign, Scissors, TrendingUp } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        {trend && (
          <p className="text-xs text-green-500 flex items-center mt-1">
            <TrendingUp size={12} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon size={24} className={`text-${color}-600`} />
      </div>
    </div>
  </div>
);

const DashboardHome = () => (
  <div className="space-y-6">    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ml-auto">
      <StatsCard 
        title="Today's Appointments" 
        value="15" 
        icon={Calendar} 
        color="blue"
        trend="+12% from yesterday"
      />
      <StatsCard 
        title="Walk-in Clients" 
        value="8" 
        icon={UserPlus} 
        color="green"
        trend="+5% from yesterday"
      />
      <StatsCard 
        title="Daily Revenue" 
        value="₱12,450" 
        icon={DollarSign} 
        color="purple"
        trend="+18% from yesterday"
      />
      <StatsCard 
        title="Services Completed" 
        value="23" 
        icon={Scissors} 
        color="red"
        trend="+8% from yesterday"
      />
    </div>
  </div>
);

export default DashboardHome;