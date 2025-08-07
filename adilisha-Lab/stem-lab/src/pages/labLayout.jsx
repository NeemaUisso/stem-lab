import React from 'react';
import Sidebar from '../components/sidebar';
import MainContent from '../components/MainContent';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/Auth';

const LabLayout = () => {
   const { user } = useAuth();

  // check authorization
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  // Get dynamic subject from URL
  const { subject } = useParams(); 

  return (
    <div className="container-fluid">
      <div className="row">
        

        <div >
          <Sidebar />
        </div>


        <div>
          <MainContent subject={subject} />
        </div>
      </div>
    </div>
  );
};

export default LabLayout;