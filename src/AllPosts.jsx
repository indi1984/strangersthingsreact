import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'
import { Container, Row, Col, Button, Card, Badge, Alert, Form, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CreatePost from './CreatePost'


const AllPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { token, setPostId } = props;

  const filteredPosts = postResults.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : postResults;
  

  function postMatches(post, searchTerm) {
    if (post.title === searchTerm) {
      return true;
    } else if (post.description === searchTerm) {
      return true;
    } else {
      return false;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault()
  };
  
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

  return (
    <Fragment>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col xs={7}>
                <Form.Group className="mb-4" controlId="formSearch">
                  <InputGroup>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter search term..."
                      onChange={(event) => setSearchTerm(event.target.value)}
                      value={searchTerm}
                    />
                    <Button 
                      variant="outline-danger"
                      onClick={() => setSearchTerm('')}
                    >
                      X
                    </Button>
                  </InputGroup> 
                <Form.Text className="text-muted">
                  Clear contents of search box to show all posts.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col xs={1}>
              <Button type="submit" variant="primary" className="ps-4 pe-4">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
       
      <Container fluid>      
        {postsToDisplay && postsToDisplay.map((post) => {
          return ( 
            <Fragment key={post._id}>
              <Row>
                <Col>            
                  {post.isAuthor
                  ? <Card bg="light" border="success" style={{ width: '100vh' }}>     
                      <Card.Body>

                        {post.willDeliver &&
                        <Alert style={{textAlign: "center"}} variant="primary">
                          Willing to deliver!
                        </Alert>}

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

                        {post.willDeliver &&
                        <Alert style={{textAlign: "center"}} variant="primary">
                          Willing to deliver!
                        </Alert>}

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
