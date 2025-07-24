import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import FAQ from './components/FAQ';
import Stemclub from './components/Stemclub';
import Footer from './components/Footer';
import UploadPracticalForm from './instructorPanel/UploadPracticalForm'; 
// import MainContent from './components/maincontent'; // Your content page

import './App.css';
import Ask from './components/Ask';
import SignIn from './components/signin';
import Sidebar from './components/sidebar';
import ExperimentView from './components/ExperimentView'


function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes >
        {/* Home page with all components */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <FAQ />
              <Stemclub />
              <Footer />
            </>
          }
        />

        {/* Content page route */}
        <Route path='stem-club' element={<Stemclub />} />
        {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
        <Route path="/upload-practical" element={<UploadPracticalForm />} />

          <Route path="/ExperimentView" element={<ExperimentView />} />

        <Route path="/virtual-lab" element={<Sidebar />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/signin" element={<SignIn />} />

        


      </Routes>
    </BrowserRouter>
  )
}

export default App;
