import api from './api';
import { API_CONFIG } from '../utils/constants';

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get(`${API_CONFIG.USERS}?page=1`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`${API_CONFIG.USERS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
};