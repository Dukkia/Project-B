import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyle } from "./../../utils/Theme.js";  
import { Avatar, IconButton } from "@mui/material";
import { Nightlight, WbSunny, NotificationsOutlined } from "@mui/icons-material";
import "./Topbar.css";

const twitchLogoSrc =
  "https://www.pngplay.com/wp-content/uploads/12/Twitch-Logo-Transparent-Image.png";

function Topbar() {
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
    <div className="topbar">
      <div className="Header_logo">
        <img src={twitchLogoSrc} alt="" />
      </div>

      <div className="Header_followtext">
        <h4>팔로잉</h4>
      </div>

      <div className="Header_findtext">
        <h4>탐색</h4>
      </div>

      <div className="Header_noticeicon">
        <IconButton color="primary">
          <NotificationsOutlined />
        </IconButton>
      </div>

      <div className="Header_ava">
        <Avatar />
      </div>

      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <div className="Header_dark">
          <IconButton onClick={toggleDarkMode} color="primary">
            {darkMode ? <Nightlight /> : <WbSunny />}
          </IconButton>
        </div>
      </ThemeProvider>

    </div>
  );
}

export default Topbar;
