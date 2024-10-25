/** @format */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './dashboards/AdminDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

function App() {
  const location = useLocation();

  const showNavbar = () => {
    const dashboardRoutes = ['/admin', '/manager', '/employee'];
    return dashboardRoutes.includes(location.pathname);
  };

  const showFooter = () => {
    const dashboardRoutes = ['/admin', '/manager', '/employee'];
    return dashboardRoutes.includes(location.pathname);
  };

  return (
    <>
      {showNavbar() && <Navbar />}

      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={<ProtectedRoute role="Admin" Component={AdminDashboard} />}
          />
          <Route
            path="/manager"
            element={
              <ProtectedRoute role="Manager" Component={ManagerDashboard} />
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute role="Employee" Component={EmployeeDashboard} />
            }
          />
        </Routes>
      </Container>

      {showFooter() && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
