/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State for showing success toast
  const [showErrorToast, setShowErrorToast] = useState(false); // State for showing error toast
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', data.token);

      // Navigate to respective dashboard based on role
      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Manager') navigate('/manager');
      else if (data.role === 'Employee') navigate('/employee');
    } catch (err) {
      // Show toast if there is a 400 error response
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data); // Set the error message from the server
        setShowErrorToast(true); // Show the error toast
      }
      console.error(err);
    }
  };

  return (
    <div>
      {/* Login Form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      {/* Toast for showing error messages */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Login Error</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>

        {/* Toast for showing success messages */}
        <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Successfully logged in!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Login;
