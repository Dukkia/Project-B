import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Topbar/Topbar.jsx';
import Sidebar from './components/Sidebar/Sidebar';
import Quota from './pages/Quota.jsx'
import EyeAnimation from './pages/EyeAnimation';

import './assets/styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevDarkMode) => !prevDarkMode);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <BrowserRouter>
        <Sidebar />
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<EyeAnimation />}/>
          <Route path="/quota" element={<Quota />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
