import React, { useEffect, useState } from 'react';
import KobeLogo from '../../assets/img/kobe_logo_white.webp';
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
          <img src={KobeLogo} alt="Kobe Sushi" className="logo" />
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

      <div className="scroll-cue">
        <span className="text">Reservas, horarios y más</span>
        <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="5 12 12 19 19 12" />
        </svg>
      </div>
    </header>
  );
};
export default Header;
