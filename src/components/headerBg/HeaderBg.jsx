import React from 'react';
import headerImg from '../../assets/img/header_kobe.webp';
import './headerBg.css';

// Simple decorative background image.
export const HeaderBg = () => {
  return (
    <div className="header-bg" aria-hidden="true">
      <img
        src={headerImg}
        alt=""
        className="bg-layer"
      />
      <div className="bg-overlay" />
    </div>
  );
};

export default HeaderBg;
