import React from 'react';
import './ReminderItem.css';

const ReminderItem = ({ reminder, onToggleStatus }) => {
    return (
    <div className="reminder-item">
        <div className="reminder-item__info">
        <div className="reminder-item__pill-icon">
        
        </div>
        <div>
            <h3 className="reminder-item__name">
            {reminder.name}{' '}
            <span className="reminder-item__dosage">{reminder.dosage}</span>
            </h3>
            <p className="reminder-item__details">
            <span className="reminder-item__frequency">{reminder.frequency}</span> •{' '}
            {reminder.time}
            </p>
        </div>
        </div>
        <div className="reminder-item__actions">
        <button
            className={`reminder-item__action-button reminder-item__action-button--${reminder.status}`}
            onClick={() => onToggleStatus(reminder.id)}
        >
            {reminder.status === 'pending' ? 'Pendiente' : 'Tomado'}
        </button>
        <span className="reminder-item__edit-icon">

        </span>
        </div>
    </div>
    );
};

export default ReminderItem;