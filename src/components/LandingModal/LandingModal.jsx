import React, { useEffect } from 'react';
import { MdOutlineRestaurantMenu, MdOutlineNotifications, MdOutlineStarBorder, MdOutlineCalendarToday, MdOutlineInfo } from 'react-icons/md';
import GrooveLogo from '../../assets/img/kobe_logo_white.webp';
import HeaderBg from '../headerBg/HeaderBg.jsx';
import './landingModal.css';

const NAV_ITEMS = [
  { label: 'El Menú',            target: null,         icon: <MdOutlineRestaurantMenu /> },
  { label: 'Novedades',          target: '#nosotros',  icon: <MdOutlineNotifications /> },
  { label: 'Reservaciones',      target: '#reservas',  icon: <MdOutlineCalendarToday /> },
  { label: 'Sobre Nosotros',     target: '#info',      icon: <MdOutlineInfo /> },
];

const LandingModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleClick = (target) => {
    onClose();
    if (!target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    requestAnimationFrame(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <div className="landing-modal" role="dialog" aria-modal="true" aria-label="Menú de inicio">
      <HeaderBg />
      <div className="landing-modal__inner">
        <img src={GrooveLogo} alt="Kobe Sushi" className="landing-modal__logo" />
        
        <nav className="landing-modal__nav" aria-label="Secciones principales">
          {NAV_ITEMS.map(({ label, target, icon }) => (
            <button
              key={label}
              className="landing-list-item"
              onClick={() => handleClick(target)}
              type="button"
            >
              <span className="landing-list-icon">{icon}</span>
              <span className="landing-list-title">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default LandingModal;
