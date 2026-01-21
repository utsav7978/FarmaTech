export const ROLES = {
  FARMER: 'FARMER',
  GOVERNMENT_OFFICIAL: 'GOVERNMENT_OFFICIAL',
  INDUSTRIALIST: 'INDUSTRIALIST',
  ADMIN: 'ADMIN'
};

export const ROLE_LABELS = {
  [ROLES.FARMER]: 'Farmer',
  [ROLES.GOVERNMENT_OFFICIAL]: 'Government Official',
  [ROLES.INDUSTRIALIST]: 'Industrialist',
  [ROLES.ADMIN]: 'Admin'
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  
  // Farmer
  FARMER_CROPS: '/farmer/crops',
  FARMER_SALES: '/farmer/sales',
  
  // Buyer
  BUYER_CROPS: '/buyer/crops',
  BUYER_PURCHASE: '/buyer/purchase',
  BUYER_PURCHASES: '/buyer/purchases',
  
  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_CROPS: '/admin/crops',
  ADMIN_PURCHASES: '/admin/purchases',
  
  // Public
  PUBLIC_CROPS: '/public/crops',
  PUBLIC_HEALTH: '/public/health'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};