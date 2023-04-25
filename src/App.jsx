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
import Messages from './Messages';
import AllMessages from './AllMessages'


function App() {
  const [ token, setToken ] = useState(false);  
  const [ postId, setPostId ] = useState("");
  const [ myPostResults, setMyPostResults ] = useState([]);
  const [ username, setUsername ] = useState('');

  function tokenCheck() {
    if (window.localStorage.getItem('token')) {
      setToken(window.localStorage.getItem('token'));
    }
  };
    
  useEffect(() => {
    tokenCheck();
  }, []);

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
            setUsername={setUsername}
            username={username}
          />}
        />
        <Route path="/SinglePost" element={
          <SinglePost 
            setToken={setToken} 
            setPostId={setPostId}  
            postId={postId}
          />} 
        />
        <Route path="/" element={<Navigate to="/allposts" />} />
        <Route path="*" element={<Navigate to="/allposts" />} />
      </Routes>
      )}

      {token && (
      <Routes>
        <Route path="/allposts" element={
          <AllPosts token={token} 
            postId={postId} 
            setPostId={setPostId}
            setUsername={setUsername}
          />} 
        />
        <Route path="/myposts" element={
          <MyPosts 
            token={token} 
            postId={postId} 
            setPostId={setPostId}
            username={username}
            myPostResults={myPostResults}
            setMyPostResults={setMyPostResults}
          />} 
        />
        <Route path="/SinglePost" element={
          <SinglePost 
            token={token} 
            postId={postId}
            setPostId={setPostId}
          />} 
        />
        <Route path="/messages" element={
          <Messages 
            token={token}
            postId={postId}
            setPostId={setPostId}
          />}
        /> 
        <Route path="/allmessages" element={
          <AllMessages 
            token={token}
            postId={postId}
            setPostId={setPostId}
            myPostResults={myPostResults}
          />}
        /> 
        <Route path="*" element={<Navigate to="/myposts" />} />
      </Routes>
      )}
      <div id="gap"></div>
      <Footer />
    </div>
  );
};

export default App;
