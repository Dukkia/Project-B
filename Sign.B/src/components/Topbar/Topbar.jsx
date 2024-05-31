import React, { useState } from 'react';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { Nightlight, WbSunny, NotificationsOutlined, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Link를 불러옵니다.
import './Topbar.css';
import Logo from './../../assets/images/Twitch-Logo.png';

function Topbar({ toggleDarkMode, darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // 여기에서 검색 기능을 구현하세요.
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="topbar">
      <div className="Header_menu">
        <IconButton color="primary">
          <MenuIcon />
        </IconButton>
      </div>

      <div className="Header_logo">
        <Link to={'/'}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="Header_search">
        <Paper component="form" className="searchInput">
          <Search />
          <InputBase
            placeholder="검색"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Paper>
        <button type="submit" aria-label="search" onClick={handleSearch}>
          <Search />
        </button>
      </div>

      <div className="Header_noticeicon">
        <IconButton color="primary">
          <NotificationsOutlined />
        </IconButton>
      </div>

      <div className="Header_ava">
        <Avatar />
      </div>

      <div className="Header_dark">
        <IconButton onClick={toggleDarkMode} color="primary">
          {darkMode ? <Nightlight /> : <WbSunny />}
        </IconButton>
      </div>
    </div>
  );
}

export default Topbar;
