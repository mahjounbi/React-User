import api from './api';

export const authenticate = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.token;
};
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};