import React from 'react';

const Sidebar = ({ collapsed }) => {
  return (
    <div
      className={`text-white sticky-top p-4 ${collapsed ? 'd-none' : 'd-block'}`}
      style={{
        width: '200px',
        minHeight: '100vh',
        backgroundColor: '#2600ffff',
      }}
    >
      <h5 className="fw-bold">Stem Lab</h5>
      <ul className="nav flex-column">
        <li className="nav-item"><a className="nav-link text-white" href="#">Robotics</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Aviation</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Coding</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Mathematics</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Physics</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Chemistry</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Biology</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
