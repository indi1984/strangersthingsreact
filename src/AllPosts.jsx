import React, { useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'
import Button from 'react-bootstrap/Button';
import {Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CreatePost from './CreatePost'


const AllPosts = (props) => {
 const [postResults, setPostResults] = useState([]);
 const { token } = props;

  useEffect(() => {
  const getPosts = async () => {
    try {
      const results = await fetchPosts();
      if (results.success) {
        setPostResults(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
  getPosts();
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          {token && (
          <CreatePost token={token} fetchPosts={fetchPosts} setPostResults={setPostResults} />
          )}
        </Row>
        <br />
        <br />
        <Row>
          {postResults && postResults.map((post, index) => {
            return ( 
              <Col>            
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                        {post.description}
                      </Card.Text>
                    <Button variant="primary">Go to Post</Button>
                    </Card.Body>
                </Card>
              </Col>
              )
            })
          }
        </Row>
      </Container>
    </>  
  ); 
};

export default AllPosts;
