import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'
import Button from 'react-bootstrap/Button';
import {Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CreatePost from './CreatePost'
import DeletePost from './DeletePost';


const AllPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const { token } = props;

  useEffect(() => {
  const getPosts = async (token) => {
    try {
      const results = await fetchPosts(token);
      console.log(results)
      console.log(token)
      if (results.success) {
        setPostResults(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
  getPosts(token);
  }, [token])

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
                <Card style={{ width: '100vh' }}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      {post.isAuthor &&
                      <DeletePost token={token} postId={post._id} />
                      } 
                    <Button variant="primary" className="float-end">Go to Post</Button>
                    </Card.Body>
                </Card>
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
