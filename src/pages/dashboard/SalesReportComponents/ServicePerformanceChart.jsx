import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f'];

const ServicePerformanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Performance</h3>
      <div className="flex flex-col lg:flex-row justify-center lg:gap-12">
        <div className="flex justify-center items-center">
          <div style={{ width: 200, height: 200 }}>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`pie-cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center h-[200px]">
          <div className="space-y-3">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center min-w-[180px]">
                <div 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700 flex-1">{entry.name}</span>
                <span className="text-sm font-medium">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePerformanceChart;