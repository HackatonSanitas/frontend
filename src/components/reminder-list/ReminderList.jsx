import React, { useState, useEffect } from 'react';
import ReminderItem from '../reminder-item/ReminderItem';
import './ReminderList.css';
import { medicationApi } from '../../services/medicationApi';

const ReminderList = ({ reminders, onToggleStatus, onRefresh }) => {
  const [activeFilter, setActiveFilter] = useState('Hoy');
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterButtons = ['Hoy', 'Mañana', 'Semanal'];

  // Update filtered reminders when filter changes or reminders change
  useEffect(() => {
    if (activeFilter === 'Hoy') {
      setFilteredReminders(reminders);
    } else {
      filterReminders(activeFilter);
    }
  }, [activeFilter, reminders]);

  const filterReminders = async (filter) => {
    setLoading(true);
    try {
      let apiReminders = [];
      
      switch (filter) {
        case 'Hoy':
          // Use the reminders already loaded
          setFilteredReminders(reminders);
          setLoading(false);
          return;
        case 'Mañana':
          const tomorrowResponse = await medicationApi.getTomorrow();
          apiReminders = tomorrowResponse.data;
          break;
        case 'Semanal':
          const weekResponse = await medicationApi.getWeek();
          apiReminders = weekResponse.data;
          break;
        default:
          setFilteredReminders(reminders);
          setLoading(false);
          return;
      }

      // Transform API data to match frontend format
      const transformedReminders = apiReminders.map(medication => ({
        id: medication.id || Math.random(),
        name: medication.medication,
        dosage: medication.dose,
        frequency: medication.frequency || 'Una vez',
        time: medication.intake ? medication.intake.split(' ')[1] || '08:00' : '08:00',
        status: medication.status === 'TOMADO' ? 'taken' : 'pending',
        originalData: medication
      }));

      setFilteredReminders(transformedReminders);
    } catch (error) {
      console.error('Error filtering reminders:', error);
      // Fallback to showing all reminders if API fails
      setFilteredReminders(reminders);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

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
            onClick={() => handleFilterChange(filter)}
            disabled={loading}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Cargando medicamentos...
        </div>
      )}

      <div className="reminder-list__items">
        {!loading && filteredReminders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No hay medicamentos para mostrar en esta categoría.
          </div>
        )}
        
        {!loading && filteredReminders.map((reminder) => (
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