import React, { useState } from 'react';
import './Sidebar.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import Sidepop from './Sidepop'; // Sidepopup 컴포넌트를 불러옵니다.
import { Link } from 'react-router-dom'; // React Router의 Link import

function Sidebar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-menu">
          <IconButton color="primary" onClick={togglePopup}>
            <MenuIcon />
          </IconButton>
        </div>

        <Link to="/" className="sidebar-button">
          <span className="icon"><HomeIcon /></span>
          <span className="icon-text">홈</span>
        </Link>

        <button className="sidebar-button">
          <span className="icon"><SubscriptionsIcon /></span>
          <span className="icon-text">구독</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VideoLibraryOutlinedIcon /></span>
          <span className="icon-text">나</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VerticalAlignBottomSharpIcon /></span>
          <span className="icon-text">다운로드</span>
        </button>
      </div>

      {isPopupOpen && <Sidepop isOpen={isPopupOpen} togglePopup={togglePopup} />}
    </div>
  );
}

export default Sidebar;
