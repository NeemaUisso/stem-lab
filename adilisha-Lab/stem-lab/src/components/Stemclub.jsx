import React, { useState } from 'react';

const sampleGroups = [
  {
    name: 'RoboWarriors',
    description: 'A group of students building autonomous robots.',
    icon: 'robot',
  },
  {
    name: 'Math Minds',
    description: 'We tackle complex math problems and games.',
    icon: 'calculator',
  },
  {
    name: 'Aviation Explorers',
    description: 'Learning the basics of flight and making model planes.',
    icon: 'airplane-engines',
  },
];

export default function Stemclub() {
  const [groups, setGroups] = useState(sampleGroups);

  return (
    <div className='container-fluid pt-5 mt-5'>
      {/* Header */}
      <div style={{ backgroundColor: '#2596be', padding: '40px 20px', textAlign: 'center', marginTop: '40px'}}>
        <h1 style={{ color: '#003366' }}>Explore, join, or create your own STEM group. Let's innovate together!</h1>
      </div>

      {/* Action Buttons */}
      <div className="container my-4">
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-outline-primary">Join a Club</button>
          <button className="btn btn-primary" style={{ backgroundColor: '#2596be' }} >Start a New Club</button>
        </div>
      </div>

      {/* Group Cards with Icons */}
      <div className="container">
        <div className="row">
          {groups.map((group, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card h-100 shadow-sm text-center">
                <div
                  className="bg-darkblue d-flex align-items-center justify-content-center"
                  style={{ height: '200px' }}
                >
                  <i className={`bi bi-${group.icon}`} style={{ fontSize: '5rem', color: '#003366' }}></i>
                </div>
                <div className="card-body bg-white">
                  <h5 className="card-title text-darkblue">{group.name}</h5>
                  <p className="card-text">{group.description}</p>
                  <button className="btn btn-custom-blue text-white">Join Club</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
