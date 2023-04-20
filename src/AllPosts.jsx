import React, { useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'


const AllPosts = (props) => {
 const [postResults, setPostResults] = useState([]);

  useEffect(() => {
  const getPosts = async () => {
    try {
      const results = await fetchPosts();
      if (results.success) {
        setPostResults(results.data.posts)
      }
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  };
  getPosts();
  }, [])

  return (
    <ul>
      {
        postResults && postResults.map((post, index) => {
          return (
          <li key={index}>{post.title}
            <ul>
              <li key={post.id}>{post.description}</li>
            </ul>
          </li>
          )
        })
      }
    </ul>
  ); 
};

export default AllPosts;
