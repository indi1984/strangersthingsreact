import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" component={App} />
        <Route path="/navbar" component={Navbar} />


      </Routes>
      <Footer />
    </div>
  );
}

export default App;
