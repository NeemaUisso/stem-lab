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

  const spotlighted = ["Aviation", "Coding", "Robotics"];

  const subjects = [
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Aviation',
    'Coding',
    'Robotics',
  ];  


  return (
    <div style={backgroundStyle}>
      <div className="bg-white bg-opacity-75 p-5 rounded shadow" style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 className="text-custom-blue text-center mb-4" style={{ color: '#2596be' }}>Welcome to the STEM Virtual Lab</h2>
        <div className="container">
<div className="row g-3 justify-content-center">
            {subjects.map((subject, index) => {
              const isSpotlight = spotlighted.includes(subject);

              let bgColor = isSpotlight ? '#003366' : (index % 2 === 0 ? '#ffffff' : '#2596be');
              let textColor = isSpotlight
                ? '#ffffff'
                : (bgColor === '#ffffff' ? '#003366' : '#ffffff');

              return (
                <div className="col-6 col-md-4 col-lg-3" key={index}>
                  <Link to={`/virtual-lab/${subject}`} style={{ textDecoration: 'none' }}>
                  
                    <div
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                        padding: isSpotlight ? '1.2rem' : '1rem',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        boxShadow: isSpotlight
                          ? '0 0 15px rgba(0, 51, 102, 0.7)'
                          : '0 4px 8px rgba(0,0,0,0.2)',
                        transform: isSpotlight ? 'scale(1.05)' : 'scale(1)',
                        border: isSpotlight ? '2px solid #2596be' : 'none',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = isSpotlight ? 'scale(1.05)' : 'scale(1)')}
                    >
                      {subject}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
      
    </div>
    
  );
}

export default Home;
