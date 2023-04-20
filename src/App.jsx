import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import AllPosts from './AllPosts'


function App() {
  const [token, setToken] = useState('');

  function tokenCheck() {
      if (window.localStorage.getItem('token')) {
        setToken(window.localStorage.getItem('token'));
      }
    }
    
    useEffect(() => {
      tokenCheck();
    }, [])

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/register" element={<Register setToken={setToken}/>} />


      </Routes>
      <Footer />
    </div>
  );
}

export default App;
