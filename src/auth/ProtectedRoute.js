/** @format */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ Component, role }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return <Navigate to="/" />;
  }

  if (decodedToken.role !== role) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
