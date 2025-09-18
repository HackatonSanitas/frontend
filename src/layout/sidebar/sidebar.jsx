import React from 'react';
import './Sidebar.css';
import { FaPills, FaHistory, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    return (
    <div className="sidebar">
        <div className="sidebar__logo">Sanitas</div>
        <ul className="sidebar__list">
        <li className="sidebar__item sidebar__item--active">
            <FaPills className="sidebar__icon" />
            <span className="sidebar__text">Recordatorio de medicina</span>
        </li>
        <li className="sidebar__item">
            <FaHistory className="sidebar__icon" />
            <span className="sidebar__text">Historial</span>
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