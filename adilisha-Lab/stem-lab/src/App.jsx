import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import FAQ from './components/FAQ';
import StemClub from './components/StemClub';
import Footer from './components/Footer';
import UploadPracticalForm from './instructorPanel/UploadPracticalForm';
import Ask from './components/Ask';
import SignIn from './components/signin';
import ExperimentView from './components/ExperimentView';
import LabLayout from './components/labLayout';
import Sidebar from './components/sidebar';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isMainContent =
    location.pathname.startsWith('/virtual-lab') ||
    location.pathname.includes('/subject');

  return (
    <>
      <AppNavbar toggleSidebar={toggleSidebar} />
      <div  style={{ display: 'flex' }}>
        {isMainContent && <Sidebar open={sidebarOpen} />}
        {/* <div style={{ flexGrow: 1, marginTop: '70px', padding: '20px' }}> */}
          <Routes>
            <Route
              path="/"
  element={
    <div style={{ width: '100%' }}>
      <Home />
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <FAQ />
        <StemClub />
        </div>
        <Footer />
      
    </div>
  }
/>
            <Route path="/stem-club" element={<StemClub />} />
            <Route path="/upload-practical" element={<UploadPracticalForm />} />
            <Route path="/virtual-lab" element={<LabLayout />} />
            <Route path="/virtual-lab/:subject" element={<LabLayout />} />
            <Route path="/virtual-lab/practical/:id" element={<ExperimentView />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      {/* </div> */}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
