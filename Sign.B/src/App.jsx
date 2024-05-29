import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Topbar/Topbar.jsx';
import './assets/styles/App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;