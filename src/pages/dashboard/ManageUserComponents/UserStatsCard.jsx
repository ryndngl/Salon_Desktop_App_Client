import { Eye, Calendar } from 'lucide-react';

const UserStatsCards = ({ users, filteredUsers }) => {
  const statsData = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Eye,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'Active').length,
      icon: Eye,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Total Bookings',
      value: users.reduce((sum, user) => sum + user.totalBookings, 0),
      icon: Calendar,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Showing Results',
      value: filteredUsers.length,
      icon: Eye,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-3 ${stat.bgColor} rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsCards;