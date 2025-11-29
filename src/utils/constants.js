export const API_CONFIG = {
  USERS: 'https://reqres.in/api/users',
  RESOURCES: 'https://reqres.in/api/unknown',
  HEADERS: { 'x-api-key': 'reqres-free-v1' }
};

export const STORAGE_KEYS = {
  AUTH_USER: 'authUser',
  LOCAL_MEMBERS: 'localMembers',
  ORG_PROFILE: 'orgProfile',
  EVENTS: 'events'
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'members', label: 'Members', icon: '👥' },
  { id: 'profile', label: 'Organization Profile', icon: '🏢' }
];