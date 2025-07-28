import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import FAQ from './components/FAQ';
import Stemclub from './components/Stemclub';
import Footer from './components/Footer';
import UploadPracticalForm from './instructorPanel/UploadPracticalForm';
import './App.css';
import Ask from './components/Ask';
import SignIn from './components/signin';
import ExperimentView from './components/ExperimentView';
import LabLayout from './components/labLayout'; 

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
        {/* Home page */}
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

        <Route path="/stem-club" element={<Stemclub />} />
        <Route path="/upload-practical" element={<UploadPracticalForm />} />
        <Route path="/virtual-lab/practical/:id" element={<ExperimentView />} />
        
        {/* Virtual lab routes */}
        <Route path="/virtual-lab" element={<LabLayout />} />
        <Route path="/virtual-lab/:subject" element={<LabLayout />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
