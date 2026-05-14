import React, { useMemo } from 'react';
import MenuCard from '../menuCard/MenuCard.jsx';
import { useFirebase } from '../../firebase/FirebaseProvider.jsx';
import { useKobeMenus } from '../../utils/menuMapper.js';
import { USE_STATIC_MENU, STATIC_MENU_GROUPS } from '../../data/menu.js';
import './menuSlider.css';

const PRIORITY_TITLES = {
  day: ['Meriendas', 'Cafeteria'],
  bar: ['Omakase', 'Sushi Bar', 'Sake', 'Cocteleria', 'Cena']
};

const normalizeMenuTitle = (value = '') =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

export const MenuSlider = ({ onSelect, onSlideChange, mode = 'bar' }) => {
  const { menuSDK, isInitialized } = useFirebase();
  const { kobeMenus, loading, error } = useKobeMenus(menuSDK);

  // ── Modo estático ────────────────────────────────────────────────────────
  if (USE_STATIC_MENU) {
    return (
      <div className="menu-list-container">
        {Object.entries(STATIC_MENU_GROUPS).map(([key, group], index) => (
          <MenuCard
            key={key}
            type={key}
            index={index + 1}
            menuData={{ title: group.title, description: group.desc }}
            onMore={() => onSelect && onSelect(key)}
            isPriority={index === 0}
          />
        ))}
      </div>
    );
  }

  // ── Modo Firebase ────────────────────────────────────────────────────────
  const keys = Object.keys(kobeMenus);
  const priorityTitles = mode === 'day' ? PRIORITY_TITLES.day : PRIORITY_TITLES.bar;

  const orderedKeys = useMemo(() => {
    if (keys.length === 0) return [];
    const normalizedPriorities = priorityTitles.map(normalizeMenuTitle);
    const prioritized = [];
    const prioritizedSet = new Set();

    normalizedPriorities.forEach((normalizedPt) => {
      const matchedKey = keys.find((key) => {
        const menuTitle = kobeMenus[key]?.title || key;
        const normalizedTitle = normalizeMenuTitle(menuTitle);
        return normalizedTitle.includes(normalizedPt) || normalizedPt.includes(normalizedTitle);
      });
      if (matchedKey && !prioritizedSet.has(matchedKey)) {
        prioritized.push(matchedKey);
        prioritizedSet.add(matchedKey);
      }
    });

    const others = keys.filter((key) => !prioritizedSet.has(key));
    return [...prioritized, ...others];
  }, [keys, kobeMenus, priorityTitles]);

  if (!isInitialized || loading) {
    return <div className="menu-list-container"><div className="carousel-loading"><div className="simple-loader"></div></div></div>;
  }
  if (error) {
    return <div className="menu-list-container"><div className="carousel-error"><p>Error: {error}</p></div></div>;
  }
  if (orderedKeys.length === 0) return null;

  return (
    <div className="menu-list-container">
        {orderedKeys.map((key, index) => {
          const menuTitle = kobeMenus[key]?.title || key;
          const isPriority = priorityTitles.some((pt) => {
            const nt = normalizeMenuTitle(menuTitle);
            const npt = normalizeMenuTitle(pt);
            return nt.includes(npt) || npt.includes(nt);
          });

          return (
            <MenuCard
              key={key}
              type={key}
              index={index + 1}
              menuData={kobeMenus[key]}
              onMore={() => onSelect && onSelect(key)}
              isPriority={isPriority}
            />
          );
        })}
    </div>
  );
};
export default MenuSlider;
