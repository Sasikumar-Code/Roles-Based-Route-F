/** @format */

import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogOut, FiHome } from 'react-icons/fi'; // Import icons from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CustomNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Navbar bg="secondary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand>
          <FiHome className="me-2" />
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                {/* Conditional Dropdown based on role */}
                {role === 'Admin' && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin-dashboard">
                      Admin Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {role === 'Employee' && (
                  <NavDropdown title="Employee" id="employee-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/employee-dashboard">
                      Employee Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {role === 'Manager' && (
                  <NavDropdown title="Manager" id="manager-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/manager-dashboard">
                      Manager Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>
                )}


                {/* Logout Button */}
                <Button
                  variant="outline-light"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  <FiLogOut className="me-2" /> Logout
                </Button>
              </>
            ) : (
              <>
                {/* Links for users not logged in */}
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
