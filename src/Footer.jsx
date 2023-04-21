import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


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
