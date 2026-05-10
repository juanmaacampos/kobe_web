import React from 'react';
import './menuCard.css';

export const menus = {
  desayuno: { title: 'Omakase', desc: 'Experiencia guiada por nuestro Itamae.' },
  almuerzo: { title: 'Sushi Bar', desc: 'Cortes frescos, nigiris y sashimis.' },
  bebidas: { title: 'Sake & Coctelería', desc: 'Mixología de autor y sakes importados.' }
};

export const MenuCard = ({ type, menuData, onMore, isPriority = false, index = 1 }) => {
  let data;
  if (menuData) {
    data = { title: menuData.title || type, desc: menuData.description || 'Descubrí la propuesta' };
  } else if (menus[type]) {
    data = menus[type];
  } else {
    data = { title: type.charAt(0).toUpperCase() + type.slice(1), desc: 'Descubrí la propuesta' };
  }
  if (!data) return null;

  const formattedIndex = index < 10 ? `0${index}` : index;

  return (
    <div
      className="menu-list-item"
      role="button"
      tabIndex={0}
      onClick={() => onMore && onMore()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMore && onMore(); } }}
      aria-label={`Ver menú ${data.title}`}
    >
      <div className="menu-list-index">{formattedIndex}</div>
      <div className="menu-list-content">
        {isPriority && <span className="menu-list-priority" aria-hidden="true">Destacado</span>}
        <h2 className="menu-list-title">{data.title}</h2>
        <span className="menu-list-desc">{data.desc}</span>
      </div>
      <div className="menu-list-cta" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  );
};
export default MenuCard;
