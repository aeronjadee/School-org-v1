import React from 'react';
import { User } from 'lucide-react';

const RecentMembers = ({ members, localMembers = [] }) => {
  const allMembers = [...members, ...localMembers].slice(0, 5);

  if (allMembers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-gray-400" />
          Recent Members
        </h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No members found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-indigo-600" />
        Recent Members
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {allMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:from-indigo-50 hover:to-white border border-gray-100 hover:border-indigo-200 transition-all duration-200 group"
          >
            <div className="relative">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${member.first_name || member.firstName}+${member.last_name || member.lastName}&background=6366f1&color=fff`}
                alt={member.first_name || member.firstName}
                className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200 group-hover:border-indigo-400 transition-colors object-cover"
              />
              <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                {member.first_name || member.firstName} {member.last_name || member.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">{member.email}</p>
            </div>
            <div className="ml-2">
              <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                {member.role || 'Member'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMembers;

