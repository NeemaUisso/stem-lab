import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import FAQ from './components/FAQ';
import StemClub from './components/Stemclub';
import Footer from './components/Footer';
import UploadPracticalForm from './instructorPanel/UploadPracticalForm';
import Ask from './components/Ask';
import SignIn from './components/signin';
import SignUp from './components/register';
import ExperimentView from './components/ExperimentView';
import LabLayout from './pages/labLayout';
import Sidebar from './components/sidebar';
import RoleBasedRoute from './routes/RoleBasedRoute';
import AdilishaCompetition from './pages/mashindano';
import ArchimedesSimulation from './components/AchimedesSimulation';

import './App.css';

const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isMainContent =
    location.pathname.startsWith('/virtual-lab') ||
    location.pathname.includes('/subject');

  const hideAsk =
   
    location.pathname === '/signin' ||
    location.pathname === '/sign-up';

  return (
    <>
      <AppNavbar toggleSidebar={toggleSidebar} />

      <div style={{ display: 'flex' }}>
        {isMainContent && <Sidebar open={sidebarOpen} />}

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ width: '100%' }}>
                  <Home />
                  <div
                    className="container"
                    style={{ paddingTop: '40px', paddingBottom: '40px' }}
                  >
                    <div id="faq">
                      <FAQ />
                    </div>
                    <div id="stem-club">
                      <StemClub />
                    </div>
                  </div>
                  <Footer />
                </div>
              }
            />

            {/* Auth routes */}
          
            <Route path="/signin" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/competition" element={<AdilishaCompetition />} />
          


            {/* Student access */}
            <Route element={<RoleBasedRoute minimumRole="student" />}>
              <Route path="/virtual-lab" element={<LabLayout />} />
              <Route path="/virtual-lab/:subject" element={<LabLayout />} />
              <Route
                path="/virtual-lab/practical/:id"
                element={<ExperimentView />}
              />
              <Route path="/physics" element={<ArchimedesSimulation />} />
            </Route>

            {/* Instructor access */}
            <Route element={<RoleBasedRoute minimumRole="instructor" />}>
              <Route path="/upload-practical" element={<UploadPracticalForm />} />
              
            </Route>
          </Routes>
        </div>
      </div>

      {!hideAsk && <Ask />}
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
