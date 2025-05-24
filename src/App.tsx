import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  // Add effect to log when the app mounts to help with debugging
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <Router>
      <div className="app">
        <ParticlesBackground />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
