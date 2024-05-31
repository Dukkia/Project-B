import React, { useState } from 'react';
import './Sidebar.css'; // 스타일 파일을 불러옵니다.
import { IconButton } from '@mui/material'; // IconButton을 불러옵니다.
import MenuIcon from '@mui/icons-material/Menu'; // Menu 아이콘을 명시적으로 가져옵니다.
import HomeIcon from '@mui/icons-material/Home'; // Home 아이콘을 명시적으로 가져옵니다.
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import Sidepopup from './Sidepopup'; // Sidepopup 컴포넌트를 불러옵니다.

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

        <button className="sidebar-button">
          <span className="icon"><HomeIcon /></span>
          <span className="text">홈</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><SubscriptionsIcon /></span>
          <span className="text">구독</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VideoLibraryOutlinedIcon /></span>
          <span className="text">나</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VerticalAlignBottomSharpIcon /></span>
          <span className="text">다운로드</span>
        </button>
      </div>

      {isPopupOpen && <Sidepopup isOpen={isPopupOpen} togglePopup={togglePopup} />}
    </div>
  );
}

export default Sidebar;
