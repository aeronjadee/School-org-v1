// Event Service - handles event operations with localStorage
export const eventService = {
  // Seed initial events if none exist
  seedEvents: () => {
    const existingEvents = localStorage.getItem('events');
    if (!existingEvents) {
      const initialEvents = [
        {
          id: 1,
          name: 'Welcome Meeting',
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          description: 'Welcome meeting for new members'
        },
        {
          id: 2,
          name: 'Team Building',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          description: 'Team building activity'
        },
        {
          id: 3,
          name: 'Monthly Review',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          description: 'Monthly review meeting'
        }
      ];
      localStorage.setItem('events', JSON.stringify(initialEvents));
    }
  },

  // Get all events
  getAllEvents: () => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  },

  // Get event by ID
  getEventById: (id) => {
    const events = this.getAllEvents();
    return events.find(event => event.id === id);
  },

  // Create a new event
  createEvent: (eventData) => {
    const events = this.getAllEvents();
    const newEvent = {
      ...eventData,
      id: Date.now()
    };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return newEvent;
  },

  // Update an event
  updateEvent: (id, eventData) => {
    const events = this.getAllEvents();
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...eventData };
      localStorage.setItem('events', JSON.stringify(events));
      return events[index];
    }
    return null;
  },

  // Delete an event
  deleteEvent: (id) => {
    const events = this.getAllEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    return true;
  }
};

