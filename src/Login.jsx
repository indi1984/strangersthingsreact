import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { registeredUser } from './ajax-requests/requests';
import Register from './Register';

function Login(props) {
  const { token } = props;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  async function handleSubmit(event) {
    event.preventDefault();
    const user = {username, password};
    const result = registeredUser(user);
    console.log(result)
  };
  
  return (
    <div id='container'>
      <Form onSubmit={handleSubmit} id="register-form">
        <Form.Group 
          className="mb-4" 
          controlId="text" 
          onChange={(event) => setUsername(event.target.value)}
        >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username..." />
        </Form.Group>

        <Form.Group 
          className="mb-4" 
          controlId="formBasicPassword"
          onChange={(event) => setPassword(event.target.value)}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password..." />
        </Form.Group>
        
        <Button size='lg' variant="primary" type="submit">
          Login
        </Button>
        <Link className='cards__item__link' to="/register"><Badge pill="true" bg="info">Register</Badge>{' '}</Link>


      </Form>
    </div>
  )
}

export default Login;
