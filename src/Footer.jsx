import React from 'react';
import { Container, Navbar } from 'react-bootstrap';


function Footer() {
  return (
    <Navbar fixed="bottom" id="footer" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{fontSize: 12}}>By Kevin Harp - 2023</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
