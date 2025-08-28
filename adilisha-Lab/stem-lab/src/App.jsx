import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


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
import LawOfFlotation from './pages/flotation';
import AcidBaseTitration from './components/AcidBaseTitration';
import ClubList from './components/stem-club';
import HardnessWater from './pages/hardnessWater';

import './App.css';


const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // detect mobile

  const isMainContent =
    location.pathname.startsWith('/virtual-lab') ||
    location.pathname.includes('/subject');

  const hideAsk =
    location.pathname === '/signin' ||
    location.pathname === '/sign-up';

  // Define pages where footer should be hidden
  const hideFooter = 
    location.pathname === '/signin' ||
    location.pathname === '/sign-up' ||
    location.pathname.startsWith('/virtual-lab') ||
    location.pathname.startsWith('/practicals') ||
    location.pathname.includes('/subject') ||
    location.pathname === '/upload-practical';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppNavbar toggleSidebar={toggleSidebar} isMobile={isMobile} />

      <div style={{ display: 'flex', flex: 1, width: '100%' }}>
        {isMainContent && <Sidebar open={sidebarOpen} />}

        <div style={{ 
          flexGrow: 1, 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMainContent ? 'flex-start' : 'center',
          alignItems: 'flex-start',
        }}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Home />
                  <div style={{ paddingTop: '40px', paddingBottom: '40px', flex: 1 }}>
                    <div id="faq">
                      <FAQ />
                    </div>
                    <div id="stem-club">
                      <StemClub />
                    </div>
                  </div>
                </div>
              }
            />

            {/* Auth routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/competition" element={<AdilishaCompetition />} />
            <Route path='/practicals/math-playground' element={<MathPlayground />} />
            <Route path="/mashindano-form" element={<MashindanoForm />} />
            <Route path="/physics/archimedes-principle" element={<ArchimedesSimulation />} />
            <Route path='/club-list' element={<ClubList/>}/>
            <Route path="/physics/static-electricity" element={<StaticElectricity />} />
            <Route path="/virtual-lab/robotics" element={<RoboticsProject />} />
            <Route path="/virtual-lab/physics" element={<PhysicsProjects />} />
            <Route path="/virtual-lab/chemistry" element={<ChemistryProjects />} />
            <Route path="/virtual-lab/biology" element={<BiologyProjects />} />
            <Route path="/virtual-lab/aviation" element={<AviationProjects />} />
            <Route path="/virtual-lab/mathematics" element={<MathematicsProjects />} />
            <Route path="/virtual-lab/coding" element={<CodingProjects />} />
            <Route path='/physics/law-of-flotation' element={<LawOfFlotation />} />
            <Route path='/practicals/AcidBaseTitration' element={<AcidBaseTitration />} />
            <Route path='/practicals/hardnessWater' element={<HardnessWater />} />


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
      
      {/* Conditionally render footer */}
      {!hideFooter && <Footer />}
    </div>
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