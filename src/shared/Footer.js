/** @format */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-2 mt-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
          
            <a href="https://www.facebook.com" className="text-light mx-2" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" className="text-light mx-2" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" className="text-light mx-2" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
