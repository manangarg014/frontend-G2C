import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaGooglePlus, FaLinkedinIn, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-4">
      <Container>
        <Row>
          <Col md={6} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold" style={{ color: '#4CAF50' }}>About <span className="text-muted">Us</span></h5>
            <hr className="mb-4" style={{ borderColor: '#4CAF50' }} />
            <p>
            Welcome to our platform! We're dedicated to revolutionizing the way you access fresh produce. Our website serves as a direct bridge between passionate growers and discerning customers like you. Say goodbye to intermediaries and hello to farm-fresh goodness delivered straight from village farms .
            </p>
          </Col>

          <Col md={6} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold" style={{ color: '#4CAF50' }}>Contact <span className="text-muted">Us</span></h5>
            <hr className="mb-4" style={{ borderColor: '#4CAF50' }} />
            <ListGroup className="list-unstyled">
              <ListGroupItem className="d-flex align-items-center">
                <FaHome className="mr-3 text-dark" />
                <span>Mansa, Punjab 151505</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex align-items-center">
                <FaEnvelope className="mr-3 text-dark" />
                <span>grower2consumer@gmail.com</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex align-items-center">
                <FaPhone className="mr-3 text-dark" />
                <span>+91 9923434343</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex align-items-center">
                <FaPrint className="mr-3 text-dark" />
                <span>+102 23434334</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-dark"><FaFacebook /></a>
              </li>
              <li className="list-inline-item">
                <a href="https://x.com/MananGarg410" className="text-dark"><FaTwitter /></a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-dark"><FaGooglePlus /></a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-dark"><FaLinkedinIn /></a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center p-1" width="100%">
          <div className="bg-dark w-100">
            <p className="text-light pt-2 text-center">
              &#169; Copyright 2024 All Rights Reserved By : 
              <a href="#" className="text-light"><strong> Manan Garg</strong></a>
            </p>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
