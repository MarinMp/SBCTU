import React from "react";
import { Navbar, Container } from "react-bootstrap";

function NavbarApp() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
          🏥 SBCTU — Sistema de Triage
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;