import React, { Fragment, useEffect, useState } from "react";
import { fetchPosts, deletePost } from './ajax-requests/requests'
import {Container, Row, Button, Card, Badge } from 'react-bootstrap';
import CreatePost from './CreatePost'


const AllPosts = (props) => {
  const [postResults, setPostResults] = useState([]);
  const [createPost, setCreatePost] = useState(false);
  const [postId, setPostId] = useState("");
  const { token } = props;

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
      <Container fluid>
        <div id="gap"></div>
        <Row>
          {token && !createPost && (
          <Button type="submit" onClick={()=> setCreatePost(true)}>Create Post</Button>
          )}
          {token && createPost && (
          <CreatePost 
            token={token} 
            fetchPosts={fetchPosts} 
            setPostResults={setPostResults} 
            setCreatePost={setCreatePost}
          />
          )}
        </Row>
        <div id="gap"></div>
          {postResults && postResults.map((post) => {
            return ( 
              <Fragment key={post._id}>
              <Row>            
                {post.isAuthor
                ? <Card bg="light" border="success" style={{ width: '100vh' }}>     
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="success" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                      <Button variant="success" className="float-end" onClick={() => {return(setPostId(post._id), console.log(postId))}}>Go to Post</Button>
                      {/* <Button variant="outline-danger" size="sm" className="float-end me-4 mt-1" onClick={()=> deletePost(post._id, token)}>Delete Post</Button> */}
                    </Card.Body>   
                  </Card>
                : <Card bg="light" border="dark" style={{ width: '100vh' }}>
                    <Card.Body>
                      <Card.Title>{post.title} <Badge style={{fontSize: 12}} id="username-badge" pill="true" className="mb-3" bg="dark" text="light">{post.author.username}</Badge></Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>{post.price}</Card.Text>
                    <Button variant="primary" className="float-end" onClick={() => {return(setPostId(post._id), console.log(postId))}}>Go to Post</Button>
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

export default AllPosts;
