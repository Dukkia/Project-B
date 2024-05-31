import React from 'react';
import './Sidepopup.css'; // 팝업 메뉴의 스타일 파일을 불러옵니다.
import { IconButton } from '@mui/material'; // IconButton을 불러옵니다.
import MenuIcon from '@mui/icons-material/Menu'; // Menu 아이콘을 명시적으로 가져옵니다.
import Logo from './../../assets/images/Twitch-Logo.png';

function Sidepopup({ isOpen, togglePopup }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={togglePopup}></div>

      <div className="sidepopup-menu">
        <IconButton color="primary" onClick={togglePopup} className="menu-icon">
          <MenuIcon />
        </IconButton>

        <div className="sideHeader_logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default Sidepopup;
