// components/LabLayout.jsx
import React from 'react';
import Sidebar from './sidebar';
import MainContent from './MainContent';
import { useParams } from 'react-router-dom';

const LabLayout = () => {
  const { subject } = useParams(); // Get dynamic subject from URL

  return (
    <div  className="container-fluid">
      <div className="row">
        {/* Sidebar - fixed width */}
        <div className="col-md-3 bg-light min-vh-100">
          <Sidebar />
        </div>

        {/* Main Content - dynamic content */}
        <div className="col-md-9">
          <MainContent subject={subject} />
        </div>
      </div>
    </div>
  );
};

export default LabLayout;
