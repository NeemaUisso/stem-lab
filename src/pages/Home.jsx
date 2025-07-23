import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/biosampleV.JPG';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };


  return (
    <div style={backgroundStyle}>
      <div className="bg-white bg-opacity-75 p-5 rounded shadow" style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 className="text-custom-blue text-center mb-4" style={{ color: '#2596be' }}>Welcome to the STEM Virtual Lab</h2>
        <div className="container">


          <p className="text-center mb-4">
           The STEM Virtual Lab is an innovative, interactive platform designed to bring hands-on experimentation, exploration, and discovery into the digital world. Whether you're a student, educator, or curious learner, our virtual lab allows you to simulate real-world experiments, test scientific principles, and build critical thinking skills anytime, anywhere.</p>
          
        </div>
      </div>
      
    </div>
    
  );
}

export default Home;
