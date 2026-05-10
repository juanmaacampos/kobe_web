import React, { useEffect, useState } from 'react';
import GrooveLogo from '../../assets/img/kobe_logo_white.webp';
import HeaderBg from '../../components/headerBg/HeaderBg.jsx';
import MenuSlider from '../../components/menuSlider/MenuSlider.jsx';
import './header.css';

export const Header = ({ onSelect, onSlideChange }) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header className="site-header" data-entered={entered ? 'true' : 'false'}>
      <HeaderBg />
      
      <div className="header-inner">
        <div className="logo-wrapper">
          <img src={GrooveLogo} alt="Kobe Sushi" className="logo" />
        </div>

        <h2 className="header-subtitle">
          Nuestro Menú
          <svg className="header-subtitle-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </h2>

        <div className="header-content-area">
          <MenuSlider onSelect={onSelect} onSlideChange={onSlideChange} />
        </div>
      </div>

    </header>
  );
};
export default Header;
