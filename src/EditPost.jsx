import React, { useState, Fragment, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { updatePost } from './ajax-requests/requests'


function EditPost(props) {

  const { token, fetchPosts, setSinglePostResult, setEditPost, postId, singlePostResult } = props;
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ willDeliver, setWillDeliver ] = useState(false);
  const [ singlePost, setSinglePost ] = useState([]);
  
  async function handleSubmit(event) {
    event.preventDefault();
    const post = {title, description, price, willDeliver};
    const results = await updatePost(postId, token, post);
    if (results.success) {
      const newResults = await fetchPosts();
      setSinglePostResult(newResults.data.posts);
      setEditPost(false);
    }
  };
 
 function getSinglePost() {
  singlePostResult.filter(post => post._id === postId).map((post) => setSinglePost(post));
  console.log(singlePost)
 };
 
  useEffect(() => {
    getSinglePost()
 }, []);
  

    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <Col>
                <input 
                  type="text"
                  className="mb-3" 
                  placeholder={singlePost.title}
                  value={title}
                  onChange={(event)=> {setTitle(event.target.value)}}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <input 
                  type="text" 
                  placeholder={singlePost.description}
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
                  placeholder={singlePost.price}
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
                    placeholder={singlePost.willDeliver}
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
                <Button className="mt-3 ms-2" variant="outline-danger"onClick={() => setEditPost(false)}>Cancel</Button>
              </Col>
            </Row>
          </Container>
        </form>
      </Fragment>
    )
};

export default EditPost;
