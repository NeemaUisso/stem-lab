import React from 'react';

const Sidebar = ({ collapsed }) => {

  return (
    < div style={{ 
      width: '200px',
      height:'100vh',
      backgroundColor:'#2600ffff',
      position:'fixed',
      top:'56px',
      marginTop:'50px',
      left:0,
      zIndex:1000,

    }}>
    <div
      className={`text-white sticky-top  p-4 ${collapsed ? 'd-none' : 'd-block'}`}
      style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#2596be',
        position: 'sticky',
        top: 0,
      }}
    >
      <div className= "pt-5">
        <h5 className="fw-bold">Stem Lab</h5>
      <ul className="nav flex-column">
        <li className="nav-item"><a className="nav-link text-white" href="#">Robotics</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Aviation</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Coding</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#"><i class="bi bi-calculator"></i><span className="ms-2">Mathematics</span></a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#"><i class="bi bi-tropical-storm"></i><span className="ms-2">Physics</span></a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#"><i class="bi bi-flask-fill"></i><span className="ms-2">Chemistry</span></a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#"><i class="bi bi-lungs-fill"></i><span className="ms-2">Biology</span></a></li>
      </ul>
      </div>

  
    </div>

  </div>

  );
};

export default Sidebar;
