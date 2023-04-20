import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import AllPosts from './AllPosts'
import MyPosts from './MyPosts'


function App() {
  const [token, setToken] = useState('');

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
      <NavigationBar />

      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/register" element={<Register setToken={setToken}/>} />
        <Route path="/myposts" element={<MyPosts setToken={MyPosts}/>} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
