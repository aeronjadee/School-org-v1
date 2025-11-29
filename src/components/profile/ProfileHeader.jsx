import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={user?.avatar}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-indigo-100 text-lg mb-1">{user?.email}</p>
          <span className="inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full text-sm font-medium">
            {user?.role || 'Officer'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

