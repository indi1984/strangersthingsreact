import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Badge } from 'react-bootstrap';
import { registeredUser } from './ajax-requests/requests';


function Login(props) {
  const { setToken } = props;
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();
    const user = {username, password};
    const results = await registeredUser(user);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem("token", results.data.token) 
    } 
  };
  
  return (
    <div id='container'>
      <div id="gap"></div>
      <div id="gap"></div>
      <div id="gap"></div>
      <div id="gap"></div>
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
        <Button size='md' variant="success" type="submit">
          Login
        </Button>
        <br />
        <Link className='cards__item__link' to="/register"><Badge pill="true" bg="primary">Click here to Register new account</Badge>{' '}</Link>
      </Form>
    </div>
  );
};

export default Login;
