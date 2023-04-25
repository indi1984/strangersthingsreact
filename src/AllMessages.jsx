import React, { Fragment } from "react";
import { Button, Card, Badge, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const AllMessages = (props) => {
  const { myPostResults, setPostId } = props;

  return (
      <Container fluid>
        
        {myPostResults.filter(post => post.messages.length > 0 & post.active).map((post) => {
          return ( 
            <Fragment key={post._id}>
              <div id="gap"></div>
              <Row>  
                <Col>
                  <Card bg="light" border="success" style={{ width: '100vh' }}>     
                      <Card.Body>
                        <Card.Title className="mb-4">{post.title} 
                          <LinkContainer to="/SinglePost">
                            <Button variant="link" className="float-end me-2" onClick={() => setPostId(post._id)}>Go to Post</Button>
                          </LinkContainer>
                          <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge>
                        </Card.Title>

                        {post.messages.map((message, index) => {
                          return (
                            <Card.Body key={message._id}>
                              <Fragment>
                                <Card.Text className="mb-3">
                                  <Badge style={{fontSize: 12}} id="username-badge" pill="true" bg="dark" text="light">Message # {index + 1}</Badge>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{message.content}
                                  <span>
                                    <Button variant="primary" size="sm" className="float-end me-1 mt-1">Reply to Message</Button>
                                  </span>
                                </Card.Text> 
                              </Fragment>
                            </Card.Body>
                          )}
                        )}  

                      </Card.Body>   
                    </Card>
                </Col>
              </Row>
              <br />
            </Fragment>
            )
          })
        }
      </Container>  
  ); 
};

export default AllMessages;
