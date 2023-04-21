import React, { useEffect, useState } from "react";
import { fetchPosts } from './ajax-requests/requests'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
    <>
      {
        postResults && postResults.map((post, index) => {
          return (
          // <li key={index}>{post.title}
          //   <ul>
          //     <li key={post.id}>{post.description}</li>
          //   </ul>
          // </li>
          // 
            <Card key={index} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.description}
                  </Card.Text>
                <Button variant="primary">Go to Post</Button>
                </Card.Body>
            </Card>
          )
        })
      }
    </>  
  ); 
};

export default AllPosts;
