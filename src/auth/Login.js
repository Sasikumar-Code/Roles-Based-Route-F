/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Toast, ToastContainer, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false); 
  const [showErrorToast, setShowErrorToast] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', data.token);

     
      if (data.role === 'Admin') navigate('/admin');
      else if (data.role === 'Manager') navigate('/manager');
      else if (data.role === 'Employee') navigate('/employee');
    } catch (err) {
      
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data); 
        setShowErrorToast(true); 
      }
      console.error(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          {/* Centered Form with Box Shadow */}
          <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '2rem', borderRadius: '8px', backgroundColor: '#fff' }}>
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

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Login
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>

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
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
