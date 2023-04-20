import React, { useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'


const AllPosts = (props) => {
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
  // posts();
  },[]) 

  console.log(postResults);

  return (
    <h3>ALL POSTS</h3>
  ); 
};

export default AllPosts;
