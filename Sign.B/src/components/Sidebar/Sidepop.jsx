// Sidepop.jsx
import React, { useState } from 'react';
import './Sidepop.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './../../assets/images/Twitch-Logo.png';
import { useNavigate } from 'react-router-dom';

function Sidepop({ isOpen, togglePopup }) {
  const [showOverseasSubMenu, setShowOverseasSubMenu] = useState(false);
  const navigate = useNavigate();

  const handleOverseasClick = () => {
    setShowOverseasSubMenu(!showOverseasSubMenu);
  };

  const handleHomeButtonClick = () => {
    navigate('/'); // 홈 페이지로 이동
    togglePopup(); 
  };

  const handleScheduleButtonClick = () => {
    togglePopup();
  };

  const handleRankingButtonClick = () => {
    navigate('/quota'); // Quota 페이지로 이동
    togglePopup(); // 팝업 닫기
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={togglePopup}></div>

      <div className="sidepop-menu">
        <IconButton color="primary" onClick={togglePopup} className="menu-icon">
          <MenuIcon />
        </IconButton>

        <div className="sideHeader_logo">
          <img src={Logo} alt="Logo" />
        </div>

        <button className="sidepop-button" onClick={handleHomeButtonClick}>
          <span>홈</span>
        </button>

        <button className="sidepop-button" onClick={handleOverseasClick}>
          <span>번호 예측</span>
        </button>

        {showOverseasSubMenu && (
          <div className="sidepop-submenu">
            <button className="submenu-item" onClick={handleScheduleButtonClick}>
              <span className="sub-text">단순 랜덤 샘플링</span>
            </button>
            <button className="submenu-item" onClick={handleRankingButtonClick}>
              <span className="sub-text">당첨 번호 빈도수 기반 샘플링</span>
            </button>
            <button className="submenu-item">
              <span className="sub-text">...</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidepop;
