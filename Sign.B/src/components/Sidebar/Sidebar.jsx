import React from 'react';
import './Sidebar.css'; // 스타일 파일을 불러옵니다.
import HomeIcon from '@mui/icons-material/Home'; // Home 아이콘을 명시적으로 가져옵니다.
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';

function Sidebar() {
  return (
    <div className="sidebar">
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
  );
}

export default Sidebar;
