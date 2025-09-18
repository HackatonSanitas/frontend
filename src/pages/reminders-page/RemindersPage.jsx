import React, { useState } from 'react';
import './RemindersPage.css';
import ReminderList from '../../components/reminder-list/ReminderList';
//import Sidebar from '../layout/Sidebar';


const MOCK_REMINDERS = [
    {
    id: 1,
    name: 'Paracetamol',
    dosage: '500 mg',
    frequency: 'Cada 8 horas',
    time: '8:00',
    status: 'pending',
    },
    {
    id: 2,
    name: 'Ibuprofeno',
    dosage: '600 mg',
    frequency: 'Cada 12 horas',
    time: '14:00',
    status: 'taken',
    },
    {
    id: 3,
    name: 'Vitamina C',
    dosage: '1000 mg',
    frequency: 'Diario',
    time: '10:00',
    status: 'pending',
    },
];

const RemindersPage = () => {
const [reminders, setReminders] = useState(MOCK_REMINDERS);


const handleToggleStatus = (id) => {
    setReminders(
    reminders.map((reminder) =>
        reminder.id === id
        ? { ...reminder, status: reminder.status === 'pending' ? 'taken' : 'pending' }
        : reminder
    )
    );
};

    return (
        <div className="reminders-page">
        {/* La barra lateral se agregará aquí cuando el componente esté listo.
        <Sidebar />
      */}
        <div className="reminders-page__content">
        <ReminderList reminders={reminders} onToggleStatus={handleToggleStatus} />
        </div>
    </div>
    /*<div className="reminders-page">
        <div className="reminders-page__sidebar">
        
        <div className="sidebar">
            <ul className="sidebar__list">
            <li className="sidebar__item sidebar__item--active">
                <span className="sidebar__icon"></span>
                <span className="sidebar__text">Recordatorio de medicina</span>
            </li>
            <li className="sidebar__item">
                <span className="sidebar__icon"></span>
                <span className="sidebar__text">Historial</span>
            </li>
            <li className="sidebar__item">
                <span className="sidebar__icon"></span>
                <span className="sidebar__text">Configuración</span>
            </li>
            </ul>
        </div>
        </div>
        <div className="reminders-page__content">
        <ReminderList reminders={reminders} onToggleStatus={handleToggleStatus} />
        </div>
    </div>*/
    );
};

export default RemindersPage;