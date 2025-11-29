import api from './api';
import { API_CONFIG } from '../utils/constants';

export const resourceService = {
  getAllResources: async () => {
    try {
      const response = await api.get(`${API_CONFIG.RESOURCES}?page=1`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  getResourceById: async (id) => {
    try {
      const response = await api.get(`${API_CONFIG.RESOURCES}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource:', error);
      return null;
    }
  }
};