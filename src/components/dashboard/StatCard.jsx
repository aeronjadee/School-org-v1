import React from 'react';

const StatCard = ({ stat }) => {
  const gradientClasses = {
    'bg-blue-500': 'from-blue-500 to-blue-600',
    'bg-green-500': 'from-green-500 to-green-600',
    'bg-orange-500': 'from-orange-500 to-orange-600',
    'bg-purple-500': 'from-purple-500 to-purple-600',
    'bg-indigo-500': 'from-indigo-500 to-indigo-600',
  };

  const gradient = gradientClasses[stat.color] || 'from-gray-500 to-gray-600';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
              {stat.label}
            </p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
          <div className={`bg-gradient-to-br ${gradient} text-white rounded-xl p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>
        <div className={`h-1 bg-gradient-to-r ${gradient} rounded-full mt-4`}></div>
      </div>
    </div>
  );
};

export default StatCard;