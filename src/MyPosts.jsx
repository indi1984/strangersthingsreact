import React, { Fragment, useEffect, useState } from "react";
import { myData } from './ajax-requests/requests'
import {Container, Row, Button, Nav, Card, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const MyPosts = (props) => {
  const [myPostResults, setMyPostResults] = useState([]);
  const { token, setPostId } = props;
   
  useEffect(() => {
    async function getPosts() {
      try {
        const results = await myData(token);
        if (results.success) {
          setMyPostResults(results.data.posts);
        }
      } catch (error) {
        console.error(`An error has occurred: ${error}`);
      }
    };
    getPosts(token)
  }, [myPostResults, token])

  return (
    <Fragment>
      <Container fluid>
        <br />
        <br />
        {myPostResults && myPostResults.map((post) => {
          return ( 
            post.active &&
            <Fragment key={post._id}>             
            <Row>            
                <Card bg="light" border="success" style={{ width: '100vh' }}>     
                  <Card.Body>
                    <Card.Title className="pt-1">{post.title} - <Badge style={{fontSize: 12}} id="username-badge" pill="true" bg="danger" text="light">{post.messages.length} Message(s)</Badge></Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text>{post.price}</Card.Text>
                    <LinkContainer to={"/SinglePost"}>
                      <Button variant="success" className="float-end" onClick={() => setPostId(post._id)}>Go to Post</Button>
                    </LinkContainer>  
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
