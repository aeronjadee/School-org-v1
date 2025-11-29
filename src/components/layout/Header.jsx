import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

