import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



function NavigationBar(props) {
  const {token, setToken} = props;
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Stranger's Things</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            {!token && (
            <LinkContainer to="/">
              <Nav.Link>
                Home
              </Nav.Link>
            </LinkContainer>
            )}

            {token && (
            <LinkContainer to="/allposts">
              <Nav.Link>All Posts</Nav.Link>
            </LinkContainer>
            )}

            {token && (
            <LinkContainer to="/myposts">
              <Nav.Link>My Posts</Nav.Link>
            </LinkContainer>
            )}
            
            {token && (
            <LinkContainer to="/mymessages">
              <Nav.Link>My Messages</Nav.Link>
            </LinkContainer>
            )}
          </Nav>

          <Nav>



            {!token && (
            <LinkContainer to="/login">
              <Nav.Link>
                Log In
              </Nav.Link>
            </LinkContainer>
            )}

            {token && (
            <LinkContainer to="/" onClick={() => {setToken(localStorage.clear())}}>
              <Nav.Link>
                Log Out
              </Nav.Link>
            </LinkContainer>
            )}
 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
