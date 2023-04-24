import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'
import {Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CreatePost from './CreatePost'


const AllPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const [createPost, setCreatePost] = useState(false);
  const { token, postId, setPostId } = props;

  useEffect(() => {
   async function getPosts() {
    try {
      const results = await fetchPosts(token);
      if (results.success) {
        setPostResults(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
    getPosts()
  }, [postResults, token])

  useEffect(() => {
    console.log(postId)
  }, [postId])

  return (
    <Fragment>
      <Container fluid> 
        <br/>
        <Row className="createPostButton">
          <Col>
            {token && !createPost && (
            <Button id="newPostButton"size="lg" variant="warning" type="submit" onClick={()=> setCreatePost(true)}>Create New Post</Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            {token && createPost && (
              <CreatePost 
                token={token} 
                fetchPosts={fetchPosts} 
                setPostResults={setPostResults} 
                setCreatePost={setCreatePost}
              />
            )}
          </Col>
        </Row>
        <br />
        
        {postResults && postResults.map((post) => {
          return ( 
            <Fragment key={post._id}>
              <Row>
                <Col>            
                  {post.isAuthor
                  ? <Card bg="light" border="success" style={{ width: '100vh' }}>     
                      <Card.Body>
                        <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                        <Card.Text>{post.price}</Card.Text>
                        <LinkContainer to="/SinglePost">
                          <Button variant="success" className="float-end" onClick={() => setPostId(post._id)}>Go to Post</Button>
                        </LinkContainer>
                      </Card.Body>   
                    </Card>
                  : <Card bg="light" border="dark" style={{ width: '100vh' }}>
                      <Card.Body>
                        <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="dark" text="light">{post.author.username}</Badge></Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                        <Card.Text>{post.price}</Card.Text>
                      <LinkContainer to={"/SinglePost"}>
                        <Button variant="primary" className="float-end" onClick={() => setPostId(post._id)}>Go to Post</Button>
                      </LinkContainer>  
                      </Card.Body>
                  </Card>}
                </Col>
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

export default AllPosts;
