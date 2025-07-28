import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Robotics', icon: 'bi bi-robot' },
    { name: 'Aviation', icon: 'bi bi-airplane-engines' },
    { name: 'Coding', icon: 'bi bi-code-slash' },
    { name: 'Mathematics', icon: 'bi bi-calculator' },
    { name: 'Physics', icon: 'bi bi-tropical-storm' },
    { name: 'Chemistry', icon: 'bi bi-flask-fill' },
    { name: 'Biology', icon: 'bi bi-lungs-fill' },
  ];

  return (
    <div
      className={`text-white ${collapsed ? 'd-none' : 'd-block'}`}
      style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#2596be',
        position: 'fixed',
        top: '56px', // assumes a fixed-top navbar height
        left: 0,
        zIndex: 1000,
        overflowY: 'auto',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="p-4 pt-5">
        <h5 className="fw-bold mb-4">STEM Lab</h5>
        <ul className="nav flex-column">
          {subjects.map((subject, index) => (
            <li className="nav-item mb-2" key={index}>
              <button
                className="nav-link text-white btn btn-link text-start w-100 px-0"
                onClick={() => navigate(`/virtual-lab/${subject.name.toLowerCase()}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {subject.icon && <i className={`${subject.icon} me-2`}></i>}
                {subject.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
