import React, { useState, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import{ makePost } from './ajax-requests/requests'


function CreatePost(props) {
  const { token, fetchPosts, setPostResults, setCreatePost} = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState('');
  
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
        <input 
          type="text" 
          placeholder="Enter Title"
          value={title}
          onChange={(event)=> {setTitle(event.target.value)}}
        />
        <input 
          type="text" 
          placeholder="Enter Description"
          value={description}
          onChange={(event)=> {setDescription(event.target.value)}}
        />
        <input 
          type="text" 
          placeholder="Enter Price"
          value={price}
          onChange={(event)=> {setPrice(event.target.value)}}
        />
        <Button className="me-2 ms-3" type="submit" variant="success">Submit</Button>
        <Button variant="outline-danger"onClick={() => setCreatePost(false)}>Cancel</Button>
      </form>
    </Fragment>
  );
};

export default CreatePost;
