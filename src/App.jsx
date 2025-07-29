import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import './App.css';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import FAQ from './components/FAQ';
import StemClub from './components/StemClub';
import Footer from './components/Footer';
import Ask from './components/Ask';
import SignIn from './components/signin';
import MainContent from './components/MainContent';
import Sidebar from './components/sidebar.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideSignIn, setHideSignIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <AppNavbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          hideSignIn={hideSignIn}
        />
        
        <Sidebar 
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<><Home /><FAQ /><StemClub /><Footer /></>} />
            <Route path="/stem-club" element={<StemClub />} />
            <Route path="/main-content" element={<MainContent />} />
            <Route path="/virtual-lab/:subject" element={<Sidebar />} />
            <Route path="/virtual-lab" element={<Sidebar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;