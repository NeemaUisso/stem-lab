import React from 'react';
import Sidebar from './sidebar';
import MainContent from './maincontent';
import { useParams } from 'react-router-dom';

const LabLayout = () => {
  // Get dynamic subject from URL
  const { subject } = useParams(); 

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - fixed width on the left */}

        <div >
          <Sidebar />
        </div>

        {/* Main Content - takes remaining space */}
        <div>
          <MainContent subject={subject} />
        </div>
      </div>
    </div>
  );
};

export default LabLayout;