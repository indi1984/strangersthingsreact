import React from 'react';
import Button from 'react-bootstrap/Button';
import{ deletePost } from './ajax-requests/requests'


function DeletePost(props) {

  const { token, postId } = props;

  const deletePosts = async (postId, token) => {
  try {
    const results = await deletePost(postId, token);
    console.log(results)
    console.log(token)
  } catch (error) {
    console.error(`An error has occurred: ${error}`);
  }
};


  return (
    <Button variant="warning" className="float-start" onClick={()=> {deletePosts(postId, token)}}>Delete Post</Button>
  );
};

export default DeletePost;
