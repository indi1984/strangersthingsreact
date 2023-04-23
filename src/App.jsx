import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './Navbar';
import Footer from './Footer';
import Register from './Register';
import AllPosts from './AllPosts';
import MyPosts from './MyPosts';
import Login from './Login';
import SinglePost from './SinglePost';


function App() {
  const [token, setToken] = useState(false);  
  const [postId, setPostId] = useState("");

  function tokenCheck() {
    if (window.localStorage.getItem('token')) {
      setToken(window.localStorage.getItem('token'));
    }
  };
    
  useEffect(() => {
    tokenCheck();
  }, []);

  console.log('stateful token', token); 

  return (
    <div className="App">
      <NavigationBar token={token} setToken={setToken}/>
      
      {!token && (
      <Routes>
        <Route path="/allposts" element={
          <AllPosts 
            setToken={setToken} 
            setPostId={setPostId} 
            postId={postId}
          />} 
        />
        <Route path="/register" element={
          <Register 
            setToken={setToken}
          />} 
        />
        <Route path="/login" element={
          <Login 
            setToken={setToken}
          />}
        />
        <Route path="/SinglePost" element={
          <SinglePost 
            setToken={setToken} 
            setPostId={setPostId}  
            postId={postId}
          />} 
        />
        <Route path="*" element={<Navigate to="/allposts" />} />
      </Routes>
      )}

      {token && (
      <Routes>
        <Route path="/allposts" element={<AllPosts token={token} postId={postId} setPostId={setPostId}/>} />
        <Route path="/myposts" element={<MyPosts token={token} postId={postId}/>} />
        <Route path="/SinglePost" element={<SinglePost token={token} postId={postId}/>} />
        <Route path="*" element={<Navigate to="/myposts" />} />
      </Routes>
      )}
      <div id="gap"></div>
      <Footer />
    </div>
  );
};

export default App;
