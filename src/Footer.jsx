import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Footer() {
  return (
    <Navbar fixed="bottom" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Stranger's Things</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
