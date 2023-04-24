import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts, deletePost, postMessage } from './ajax-requests/requests'
import { Container, Row, Col, Button, Card, Badge, Form, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Messages from './Messages';
import EditPost from './EditPost';


const SinglePost = (props) => {
  const [ editPost, setEditPost ] = useState(false);
  const [ singlePostResult, setSinglePostResult ] = useState([]);
  const [ sendMessage, setSendMessage ] = useState(false);
  const [ message, setMessage ] = useState('');
  const { token, postId, setPostId } = props;

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
  }, [singlePostResult, token]);

  return (
    <Fragment>
      <Container fluid>
        <br />
        <Row>
          <Col>

          {token && editPost && (
              <EditPost 
                token={token} 
                postId={postId}
                fetchPosts={fetchPosts} 
                setEditPost={setEditPost}
                editPost={editPost}
                setSinglePostResult={setSinglePostResult}
                singlePostResult={singlePostResult}
              />
            )}
  
          </Col>
        </Row>
        <br />

        {singlePostResult && singlePostResult.filter(post => post._id === postId).map((post) => {
          return ( 
            <Fragment key={post._id}>
            <Row>  
              <Col>  

                {post.isAuthor
                ? (<Fragment>
                    <Container fluid>
                      <Card bg="light" border="success" style={{ width: '100vh' }}>     
                        <Card.Body>

                          {post.willDeliver &&
                          <Alert style={{textAlign: "center"}} variant="success">
                            Willing to deliver!
                          </Alert>}

                          <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                          <Card.Text>{post.description}</Card.Text>
                          <Card.Text>{post.price}</Card.Text>
                          <Button 
                            variant="outline-primary" 
                            className="float-end"
                            onClick={() => {
                              return (
                                setEditPost(true),
                                setPostId(post._id)
                              )
                            }}
                          >
                            Edit Post
                          </Button>
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

                      {post.willDeliver &&
                      <Alert style={{textAlign: "center"}} variant="primary">
                        Willing to deliver!
                      </Alert>}
                      
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

              </Col>
            </Row>
            <br />

            {sendMessage && token &&
            <Row>
              <Col>
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12}>
                        <Form.Group 
                          className="mb-3" 
                          controlId="formText"
                          onChange={(event) => setMessage(event.target.value)}
                        >
                          <Form.Control type="text" placeholder="Enter message..." />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button variant="success" type="submit" className="float-">
                          Submit
                        </Button>
                      </Col>
                      <Col>
                        <Button 
                          variant="outline-danger"  
                          className="ms-2"
                          onClick={() => setSendMessage(false)}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </Col>
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
