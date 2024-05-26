import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

function SecondaryNav() {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home" className="text-success">
          <img src="/images/logo.jpg" width="30%" alt="G2C Logo" />
          G2C
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Button onClick={() => navigate(-1)} variant="outline-success" className="ml-auto">
            Back
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default SecondaryNav;
