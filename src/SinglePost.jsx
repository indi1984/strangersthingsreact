import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts, deletePost } from './ajax-requests/requests'
import {Container, Row, Button, Card, Badge } from 'react-bootstrap';


const SinglePost = (props) => {
  const [singlePostResult, setSinglePostResult] = useState([]);
  const { token, postId } = props;
 
  useEffect(() => {
   async function getPosts() {
    try {
      const results = await fetchPosts(token);
      if (results.success) {
        setSinglePostResult(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
    getPosts(token)
  }, [singlePostResult, token])


  return (
    <Fragment>
      <div id="gap"></div>
      <Container fluid>
          {singlePostResult && singlePostResult.filter(post => post._id === postId).map((post) => {
            return ( 
              <Fragment key={post._id}>
              <Row>            
                {post.isAuthor
                ? <Card bg="light" border="success" style={{ width: '100vh' }}>     
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
    
                      <Button variant="outline-danger" size="sm" className="float-end me-4 mt-1" onClick={()=> deletePost(post._id, token)}>Delete Post</Button>
                    </Card.Body>   
                  </Card>
                : <Card bg="light" border="dark" style={{ width: '100vh' }}>
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="dark" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                    </Card.Body>
                </Card>}
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

export default SinglePost;