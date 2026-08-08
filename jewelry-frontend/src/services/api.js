import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authService = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: (userId) => api.get(`/users/${userId}`),
};

// Product APIs
export const productService = {
  getAll: () => api.get('/products/'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// Order APIs
export const orderService = {
  create: (data) => api.post('/orders/', data),
  getById: (id) => api.get(`/orders/${id}`),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  cancel: (id) => api.delete(`/orders/${id}/cancel`),
};

// Payment APIs
export const paymentService = {
  process: (data) => api.post('/payments/process', data),
  getStatus: (orderId) => api.get(`/payments/${orderId}`),
};

export default api;
