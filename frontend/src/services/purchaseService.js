// services/purchaseService.js
import api from './api';

export const purchaseService = {
  // Buyer endpoints
  createPurchase: async (purchaseData) => {
    const response = await api.post('/buyer/purchase', purchaseData);
    return response.data;
  },

  getBuyerPurchases: async () => {
    const response = await api.get('/buyer/purchases');
    return response.data;
  },

  // Farmer endpoints
  getFarmerSales: async () => {
    const response = await api.get('/farmer/sales');
    return response.data;
  },

  // Admin endpoints
  getAllPurchases: async () => {
    const response = await api.get('/admin/purchases');
    return response.data;
  }
};