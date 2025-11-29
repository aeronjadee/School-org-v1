import React from 'react';
import { LogOut, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const Sidebar = ({ isOpen, setIsOpen, active, setActive }) => {
  const { user, logout } = useAuth();

  const handleNavClick = (itemId) => {
    setActive(itemId);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-50 md:z-auto flex flex-col overflow-y-auto flex-shrink-0`}
        aria-label="Sidebar navigation"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📚 School Org</h2>
            <p className="text-gray-400 text-sm mt-1">Management System</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6 space-y-4">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                active === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center mb-4 bg-gray-800 p-3 rounded-lg">
            <img
              src={user?.avatar}
              alt={user?.firstName}
              className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500"
            />
            <div className="text-sm">
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-gray-400 text-xs">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center text-sm font-medium transition duration-200"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;