// services/cropService.js
import api from './api';

export const cropService = {
  // Farmer endpoints
  addCrop: async (cropData) => {
    const response = await api.post('/farmer/crops', cropData);
    return response.data;
  },

  getFarmerCrops: async () => {
    const response = await api.get('/farmer/crops');
    return response.data;
  },

  updateCrop: async (id, cropData) => {
    const response = await api.put(`/farmer/crops/${id}`, cropData);
    return response.data;
  },

  deleteCrop: async (id) => {
    const response = await api.delete(`/farmer/crops/${id}`);
    return response.data;
  },

  // Buyer endpoints
  getAllCrops: async () => {
    const response = await api.get('/buyer/crops');
    return response.data;
  },

  getCropById: async (id) => {
    const response = await api.get(`/buyer/crops/${id}`);
    return response.data;
  },

  // Public endpoints
  getPublicCrops: async () => {
    const response = await api.get('/public/crops');
    return response.data;
  },

  // Admin endpoints
  getAllCropsAdmin: async () => {
    const response = await api.get('/admin/crops');
    return response.data;
  },

  deleteCropAdmin: async (id) => {
    const response = await api.delete(`/admin/crops/${id}`);
    return response.data;
  }
};