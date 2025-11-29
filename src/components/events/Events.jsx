import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', status: 'pending', description: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  };

  const saveEvents = (eventList) => {
    localStorage.setItem('events', JSON.stringify(eventList));
    setEvents(eventList);
  };

  const handleAddEdit = () => {
    if (editingEvent) {
      const updated = events.map(e => e.id === editingEvent.id ? { ...formData, id: editingEvent.id } : e);
      saveEvents(updated);
    } else {
      const newEvent = { ...formData, id: Date.now() };
      saveEvents([...events, newEvent]);
    }
    setShowModal(false);
    setEditingEvent(null);
    setFormData({ name: '', date: '', status: 'pending', description: '' });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <button
          onClick={() => {
            setEditingEvent(null);
            setFormData({ name: '', date: '', status: 'pending', description: '' });
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(event)} className="text-indigo-600 hover:text-indigo-700">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{event.date}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

              <button
                onClick={handleAddEdit}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
