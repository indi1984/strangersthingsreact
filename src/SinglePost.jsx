import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts, deletePost, postMessage } from './ajax-requests/requests'
import {Container, Row, Button, Card, Badge, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Messages from './Messages';


const SinglePost = (props) => {
  const [singlePostResult, setSinglePostResult] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  const [message, setMessage] = useState('');
  const { token, postId } = props;

  async function handleSubmit(event) {
    event.preventDefault();
    await postMessage(postId, token, message);
    console.log(postMessage);
    setSendMessage(false);
  };

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
                ? (<Fragment>
                    <Container fluid>
                      <Card bg="light" border="success" style={{ width: '100vh' }}>     
                        <Card.Body>
                          <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                          <Card.Text>{post.description}</Card.Text>
                          <Card.Text>{post.price}</Card.Text>
                          <Button variant="outline-primary" className="float-end">Edit Post</Button>
                          <LinkContainer to="/myposts">
                            <Button variant="outline-danger" size="sm" className="float-end me-4 mt-1" onClick={()=> deletePost(post._id, token)}>Delete Post</Button>
                          </LinkContainer>
                          <LinkContainer to="/myposts">
                            <Button variant="link" className="float-start pt-3" size="sm">Back to My Posts</Button>
                          </LinkContainer>
                        </Card.Body>   
                      </Card>

                      {post.messages.length > 0 
                      ? <Messages post={post} />
                      : null}

                    </Container>
                  </Fragment>)
                : (<Card bg="light" border="dark" style={{ width: '100vh' }}>
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="dark" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                      {token &&
                        <Button variant="primary" size="sm" className="float-end me-4 mt-1" onClick={() => setSendMessage(true)}>Send Message</Button>
                      }
                      <LinkContainer to="/allposts">
                        <Button variant="link" className="float-start pt-3" size="sm">Back to All Posts</Button>
                      </LinkContainer>
                    </Card.Body>
                  </Card>                               
                )}
              </Row>
              <br />
              {sendMessage && token &&
              <Row>
                <Container fluid>
                  <Form onSubmit={handleSubmit}>
                      <Row>
                        <Form.Group 
                          className="mb-3" 
                          controlId="formText"
                          onChange={(event) => setMessage(event.target.value)}
                        >
                          <Form.Control type="text" placeholder="Enter message..." />
                        </Form.Group>
                      </Row>

                    <div className="text-center">
                      <Button variant="primary" type="submit" className="float-">
                        Submit
                      </Button>
                      <Button 
                        variant="outline-danger"  
                        className="ms-2"
                        onClick={() => setSendMessage(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Row>}
              </Fragment>
              )
            })
          }
      </Container>
    </Fragment>  
  ); 
};

export default SinglePost;
