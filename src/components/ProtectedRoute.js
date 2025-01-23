import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authentication.service';

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;