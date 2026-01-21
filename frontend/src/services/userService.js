// services/userService.js
import api from './api';

export const userService = {
  // Admin endpoints
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  getUsersByRole: async (role) => {
    const response = await api.get(`/admin/users/role/${role}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};