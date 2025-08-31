import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
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
  );
}

export default App;