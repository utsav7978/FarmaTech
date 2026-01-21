import { validateEmail, validatePhone } from './helpers';
export const validateCropForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Crop name must be at least 2 characters long';
  }

  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  if (!formData.quantity || parseFloat(formData.quantity) < 0.1) {
    errors.quantity = 'Quantity must be at least 0.1 kg';
  }

  if (!formData.price || parseFloat(formData.price) < 0.01) {
    errors.price = 'Price must be at least ₹0.01 per kg';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.contact || !validatePhone(formData.contact)) {
    errors.contact = 'Please enter a valid contact number (10-15 digits)';
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (!formData.role) {
    errors.role = 'Please select a role';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};