import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SandstormIntro from './components/SandstormIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <SandstormIntro onComplete={handleIntroComplete} />}
      
      <Router>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Collections />
                <Story />
                <Contact />
              </>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;