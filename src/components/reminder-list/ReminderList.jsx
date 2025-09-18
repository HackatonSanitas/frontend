import React, { useState } from 'react';
import ReminderItem from '../reminder-item/ReminderItem';
import './ReminderList.css';

const ReminderList = ({ reminders, onToggleStatus }) => {
    const [activeFilter, setActiveFilter] = useState('Hoy');

    const filterButtons = ['Hoy', 'Mañana', 'Semanal'];

    return (
    <div className="reminder-list">
        <h2 className="reminder-list__heading">Tus recordatorios de medicina</h2>
        <div className="reminder-list__filters">
        {filterButtons.map((filter) => (
            <button
            key={filter}
            className={`reminder-list__filter-button ${
                activeFilter === filter ? 'reminder-list__filter-button--active' : ''
            }`}
            onClick={() => setActiveFilter(filter)}
            >
            {filter}
            </button>
        ))}
        </div>
        <div className="reminder-list__items">
        {reminders.map((reminder) => (
            <ReminderItem
            key={reminder.id}
            reminder={reminder}
            onToggleStatus={onToggleStatus}
            />
        ))}
        </div>
    </div>
    );
};

export default ReminderList;