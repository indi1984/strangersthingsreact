import React, { useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'


const MyPosts = (props) => {
  const [postResults, setPostResults] = useState({});


 useEffect(() => {
  const posts = async () => {
    try {
      const results = await fetchPosts();
      setPostResults(results);
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
  posts();
  },[]) 

  return (
    <h3>MY POSTS</h3>
  ); 
};

export default MyPosts;