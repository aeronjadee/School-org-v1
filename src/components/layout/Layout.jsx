import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import Members from '../members/Members';
import Profile from '../profile/Profile';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('dashboard');

  const renderContent = () => {
    switch (active) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        active={active} 
        setActive={setActive} 
      />

      <div 
        className={`flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-0 ml-64' : 'ml-0'
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;