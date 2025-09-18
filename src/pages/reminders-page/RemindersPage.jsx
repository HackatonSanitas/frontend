import React, { useState } from 'react';
import './RemindersPage.css';
import ReminderList from '../../components/reminder-list/ReminderList';
import Sidebar from '../../layout/sidebar/Sidebar';
import { Link } from 'react-router-dom';


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

    // return (
    //     <div className="reminders-page">
    //     <Sidebar />
    //     <div className="reminders-page__content">
    //     <ReminderList reminders={reminders} onToggleStatus={handleToggleStatus} />
    //     </div>
    // </div>
    
    // );
    return (
    <div className="reminders-page">
      <Sidebar />

      <div className="reminders-page__content">
        {/* Cabecera de la sección con título y botón para crear nuevo medicamento */}
        <div className="reminders-header">
          <h2 className="reminders-title">Recordatorios</h2>

          {/* Link actúa como <a> pero usa React Router para navegación SPA */}
          <Link to="/medications/new" className="btn btn--primary add-med-btn" aria-label="Añadir medicamento">
            + Añadir medicamento
          </Link>
        </div>

        {/* Lista de recordatorios (componente existente) */}
        <ReminderList reminders={reminders} onToggleStatus={handleToggleStatus} />
      </div>
    </div>
  );

};

export default RemindersPage;