import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';



function NavigationBar(props) {
  const {token, setToken} = props;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Stranger's Things</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token && (
            <LinkContainer to="/myposts">
              <Nav.Link>My Posts</Nav.Link>
            </LinkContainer>
            )}

            {!token && (
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            )}

            {token && (
            <LinkContainer to="/mymessages">
              <Nav.Link>My Messages</Nav.Link>
            </LinkContainer>
            )}

            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
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
            <LinkContainer to="/">
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