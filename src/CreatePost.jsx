import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import{ makePost } from './ajax-requests/requests'


function CreatePost(props) {
  const { token, fetchPosts } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
 async function handleSubmit(event) {
    event.preventDefault();
    const post = {title, description, price};
    const results = await makePost(post, token);
    if (results.success) {
      fetchPosts();
    }
  
  };

  return (
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
      <Button type="submit">Create Post</Button>
    </form>
    
  );
};

export default CreatePost;
