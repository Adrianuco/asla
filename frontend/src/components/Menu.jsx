import React from 'react';
import {
  IconoInicio,
  IconoProductoras,
  IconoFavoritos,
  IconoPerfil,
} from '../iconos';

export const NAV_ITEMS = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: (isActive) => (
      <IconoInicio
        className="nav-svg-icon"
        size={24}
        color={isActive ? '#000000' : '#FFFFFF'}
      />
    ),
  },
  {
    id: 'productoras',
    label: 'Productoras',
    icon: (isActive) => (
      <IconoProductoras
        className="nav-svg-icon"
        size={24}
        color={isActive ? '#000000' : '#FFFFFF'}
      />
    ),
  },
  {
    id: 'favoritos',
    label: 'Favoritos',
    icon: (isActive) => (
      <IconoFavoritos
        className="nav-svg-icon"
        size={24}
        color={isActive ? '#000000' : '#FFFFFF'}
      />
    ),
  },
  {
    id: 'perfil',
    label: 'Perfil',
    icon: (isActive) => (
      <IconoPerfil
        className="nav-svg-icon"
        size={24}
        color={isActive ? '#000000' : '#FFFFFF'}
      />
    ),
  },
];

const Menu = ({ activeTab = 'inicio', onTabChange = () => {} }) => {
  return (
    <nav className="bottom-nav-container" aria-label="Menú principal de navegación">
      <div className="bottom-nav-pill">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-pill-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
              aria-label={item.label}
            >
              <div className="nav-icon-box">
                {item.icon(isActive)}
              </div>
              {isActive && (
                <span className="nav-item-label">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Menu;
