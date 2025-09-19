import React from 'react';
import './Sidebar.css';
import { FaPills, FaList, FaCog } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Sanitas</div>
      <ul className="sidebar__list">
        <li 
          className={`sidebar__item ${isActive('/recordatorios') ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigation('/recordatorios')}
          style={{ cursor: 'pointer' }}
        >
          <FaPills className="sidebar__icon" />
          <span className="sidebar__text">Recordatorio de medicina</span>
        </li>
        <li 
          className={`sidebar__item ${isActive('/medications') ? 'sidebar__item--active' : ''}`}
          onClick={() => handleNavigation('/medications')}
          style={{ cursor: 'pointer' }}
        >
          <FaList className="sidebar__icon" />
          <span className="sidebar__text">Lista de Medicamentos</span>
        </li>
        <li className="sidebar__item">
          <FaCog className="sidebar__icon" />
          <span className="sidebar__text">Configuración</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;