import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Map from './Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    })
  }, []);

  return (
    <Router> 
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/*" element={<Map />} />
          </Routes>
          <p>The current time is {currentTime}.</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
