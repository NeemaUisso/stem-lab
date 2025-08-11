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
import SignUp from './components/register';
import ExperimentView from './components/ExperimentView';
import LabLayout from './pages/labLayout';
import Sidebar from './components/sidebar';
import RoleBasedRoute from './routes/RoleBasedRoute';
import AdilishaCompetition from './pages/mashindano';
import MathPlayground from './pages/MathPlayground';
import MashindanoForm from './components/mashindanoForm';
import ArchimedesSimulation from './components/AchimedesSimulation';
import StaticElectricity from './components/StaticElectricity';
import RoboticsProject from './components/RoboticsProject';
import PhysicsProjects from './components/PhysicsProjects';
import ChemistryProjects from './components/ChemistryProjects';
import BiologyProjects from './components/BiologyProjects';
import AviationProjects from './components/AviationProjects';
import MathematicsProjects from './components/MathematicsProjects';
import CodingProjects from './components/CodingProjects';
import ClubRegistrationStep from './components/clubForm'

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
            <Route path='/math-playground' element={<MathPlayground />} />
            <Route path="/mashindano-form" element={<MashindanoForm />} />
            <Route path="/physics/archimedes-principle" element={<ArchimedesSimulation />} />
            <Route path="/physics/static-electricity" element={<StaticElectricity />} />
            <Route path="/virtual-lab/robotics" element={<RoboticsProject />} />
            <Route path="/virtual-lab/physics" element={<PhysicsProjects />} />
            <Route path="/virtual-lab/chemistry" element={<ChemistryProjects />} />
            <Route path="/virtual-lab/biology" element={<BiologyProjects />} />
            <Route path="/virtual-lab/aviation" element={<AviationProjects />} />
            <Route path="/virtual-lab/mathematics" element={<MathematicsProjects />} />
            <Route path="/virtual-lab/coding" element={<CodingProjects />} />
            <Route path='/club-form' element={<ClubRegistrationStep/>}/>

            {/* Student access */}
            <Route element={<RoleBasedRoute minimumRole="student" />}>
              <Route path="/virtual-lab" element={<LabLayout />} />
              <Route path="/virtual-lab/:subject" element={<LabLayout />} />
              <Route
                path="/virtual-lab/practical/:id"
                element={<ExperimentView />}
              /> 
              
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
