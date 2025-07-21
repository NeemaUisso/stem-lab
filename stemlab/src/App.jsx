import React, { useState } from 'react';
import Sidebar from './components/sidebar.jsx';
import MainContent from './components/maincontent.jsx';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex">
      <Sidebar collapsed={collapsed} />
      <MainContent toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;
