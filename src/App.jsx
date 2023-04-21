import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import AllPosts from './AllPosts';
import MyPosts from './MyPosts';
import Login from './Login';


function App() {
  const [token, setToken] = useState(false);

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
        <Route path="/allposts" element={<AllPosts setToken={setToken} token={token} />} />
        <Route path="/register" element={<Register setToken={setToken}/>} />
        <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
        <Route path="*" element={<Navigate to="/allposts" />} />
      </Routes>
      )}

      {token && (
      <Routes>
        <Route path="/allposts" element={<AllPosts setToken={setToken} token={token} />} />
        <Route path="/myposts" element={<MyPosts setToken={setToken} token={token} />} />
        <Route path="*" element={<Navigate to="/myposts" />} />
      </Routes>
      )}
      <div id="gap"></div>
      <Footer />
    </div>
  );
};

export default App;
