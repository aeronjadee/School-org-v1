import React, { useState, useEffect } from 'react';
import { Building2, Calendar, TrendingUp } from 'lucide-react';
import { userService } from '../../services/userService';
import { resourceService } from '../../services/resourceService';
import { eventService } from '../../services/eventService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatCard from './StatCard';
import RecentMembers from './RecentMembers';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localMembers] = useLocalStorage('localMembers', []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, resourcesData] = await Promise.all([
        userService.getAllUsers(),
        resourceService.getAllResources()
      ]);

      setMembers(usersData || []);
      setResources(resourcesData || []);
      
      // Get events from localStorage
      const allEvents = eventService.getAllEvents();
      setEvents(allEvents);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const pendingEvents = events.filter(e => e.status === 'pending').length;

  const stats = [
    {
      label: 'Total Members',
      value: members.length + localMembers.length,
      color: 'bg-blue-500',
      icon: '👥'
    },
    {
      label: 'Organizations',
      value: resources.length,
      color: 'bg-green-500',
      icon: '🏢'
    },
    {
      label: 'Pending Events',
      value: pendingEvents,
      color: 'bg-orange-500',
      icon: '📅'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-indigo-100">Here's what's happening with your organization today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <RecentMembers members={members} localMembers={localMembers} />

        {/* Organizations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
            Organizations
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {resources.slice(0, 5).map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:from-indigo-50 hover:to-white border border-gray-100 hover:border-indigo-200 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg mr-4 flex-shrink-0 shadow-md flex items-center justify-center"
                    style={{ backgroundColor: resource.color || '#6366f1' }}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {resource.name}
                    </p>
                    <p className="text-xs text-gray-500">Est. {resource.year}</p>
                  </div>
                </div>
              </div>
            ))}
            {resources.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No organizations found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Events</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <Calendar className="w-12 h-12 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium mb-1">Growth Rate</p>
              <p className="text-3xl font-bold">+12%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-teal-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;