import React, { useState, Fragment } from 'react';
import {Button, Container, Row, Col, Form } from 'react-bootstrap';
import{ makePost } from './ajax-requests/requests'


function CreatePost(props) {
  const { token, fetchPosts, setPostResults, setCreatePost} = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  
  async function handleSubmit(event) {
    event.preventDefault();
    const post = {title, description, price, willDeliver};
    const results = await makePost(post, token);
    if (results.success) {
      const newResults = await fetchPosts();
      setPostResults(newResults.data.posts);
      setCreatePost(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Container fluid>
          <Row>
            <Col>
              <input 
                type="text"
                className="mb-3" 
                placeholder="Enter Title"
                value={title}
                onChange={(event)=> {setTitle(event.target.value)}}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <input 
                type="text" 
                placeholder="Enter Description"
                value={description}
                onChange={(event)=> {setDescription(event.target.value)}}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <input 
                type="text"
                className="mt-3" 
                placeholder="Enter Price"
                value={price}
                onChange={(event)=> {setPrice(event.target.value)}}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mt-3" controlId="formBasicCheckbox">
                <Form.Check 
                  type="checkbox"
                  value={willDeliver} 
                  label="Willing to deliver?"
                  onChange={(event)=> {setWillDeliver(event.target.checked)}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="mt-3 me-2" type="submit" variant="success">Submit</Button>
              <Button className="mt-3 ms-2" variant="outline-danger"onClick={() => setCreatePost(false)}>Cancel</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </Fragment>
  );
};

export default CreatePost;
