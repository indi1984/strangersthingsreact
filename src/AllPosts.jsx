import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts, deletePost } from './ajax-requests/requests'
import Button from 'react-bootstrap/Button';
import {Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CreatePost from './CreatePost'
import Badge from 'react-bootstrap/Badge';



const AllPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const { token } = props;

  useEffect(() => {
  const getPosts = async (token) => {
    try {
      const results = await fetchPosts(token);
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
    <>
      <Container fluid>
        <Row>
          {token && (
          <CreatePost token={token} fetchPosts={fetchPosts} setPostResults={setPostResults} />
          )}
        </Row>
        <br />
        <br />
          {postResults && postResults.map((post) => {
            return ( 
              <Fragment key={post._id}>
              <Row>            
                {post.isAuthor
                ? <Card bg="light" border="success" style={{ width: '100vh' }}>     
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                      <Button variant="danger" size="sm" className="float-start" onClick={()=> deletePost(post._id, token)}>Delete Post</Button>
                    <Button variant="primary" className="float-end">Go to Post</Button>
                    </Card.Body>
                </Card>
                : <Card bg="light" border="dark" style={{ width: '100vh' }}>
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" bg="dark" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                    <Button variant="primary" className="float-end">Go to Post</Button>
                    </Card.Body>
                </Card>}
              </Row>
              <br />
              </Fragment>
              )
            })
          }
      </Container>
    </>  
  ); 
};

export default AllPosts;
