import React, { Fragment, useEffect, useState } from "react";
import { myData, deletePost } from './ajax-requests/requests'
import {Container, Row, Button, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';



const MyPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const { token } = props;

  useEffect(() => {
  const getPosts = async (token) => {
    try {
      const results = await myData(token);
      if (results.success) {
        setPostResults(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
  getPosts(token);
  }, [postResults, token])

  return (
    <Fragment>
      <Container fluid>
        <br />
        <br />
        {postResults.map((post) => {
          return ( 
            post.active &&
            <Fragment key={post._id}>             
            <Row>            
                <Card bg="light" border="success" style={{ width: '100vh' }}>     
                  <Card.Body>
                    <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text>{post.price}</Card.Text>
                    <Button variant="primary" className="float-end">Go to Post</Button>
                    <Button variant="outline-danger" size="sm" className="float-end me-4 mt-1" onClick={()=> deletePost(post._id, token)}>Delete Post</Button>                      
                  </Card.Body>

                  <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                      <Nav.Item>
                        <Nav.Link href="#first">Active</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#link">Link</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                          Disabled
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
              </Card>
            </Row>
            <br />
            </Fragment>
            )
          })
        }
      </Container>
    </Fragment>  
  ); 
};

export default MyPosts;