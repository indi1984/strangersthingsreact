import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { registerUser } from './ajax-requests/requests';

function Register(props) {
  const { setToken } = props;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  async function handleSubmit(event) {
    event.preventDefault();
    const user = {username, password};
    const results = await registerUser(user);
    
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem("token", results.data.token) 
    } 
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
        
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

export default Register;
