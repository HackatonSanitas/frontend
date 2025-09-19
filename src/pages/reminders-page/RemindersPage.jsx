import React, { useState, useEffect } from 'react';
import './RemindersPage.css';
import ReminderList from '../../components/reminder-list/ReminderList';
import Sidebar from '../../layout/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { medicationApi } from '../../services/medicationApi';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all medications on component mount
  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const response = await medicationApi.getAll();
      
      // Transform backend data to match frontend format
      const transformedReminders = response.data.map(medication => ({
        id: medication.id || Math.random(),
        name: medication.medication,
        dosage: medication.dose,
        frequency: medication.frequency || 'Una vez',
        time: medication.intake ? medication.intake.split(' ')[1] || '08:00' : '08:00',
        status: medication.status === 'TOMADO' ? 'taken' : 'pending',
        originalData: medication
      }));
      
      setReminders(transformedReminders);
      setError(null);
    } catch (err) {
      console.error('Error loading reminders:', err);
      setError('Error al cargar los recordatorios');
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const reminder = reminders.find(r => r.id === id);
      if (!reminder) return;

      // Only allow marking as taken if it's currently pending
      if (reminder.status === 'pending') {
        await medicationApi.markAsTaken(id);
        
        // Update local state
        setReminders(
          reminders.map((reminder) =>
            reminder.id === id
              ? { ...reminder, status: 'taken' }
              : reminder
          )
        );
      }
    } catch (err) {
      console.error('Error updating reminder status:', err);
      setError('Error al actualizar el estado del recordatorio');
    }
  };

  if (loading) {
    return (
      <div className="reminders-page">
        <Sidebar />
        <div className="reminders-page__content">
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Cargando recordatorios...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reminders-page">
      <Sidebar />

      <div className="reminders-page__content">
        {/* Cabecera de la sección con título y botón para crear nuevo medicamento */}
        <div className="reminders-header">
          <h2 className="reminders-title">Recordatorios</h2>

          <Link to="/medications/new" className="btn btn--primary add-med-btn" aria-label="Añadir medicamento">
            + Añadir medicamento
          </Link>
        </div>

        {error && (
          <div style={{ 
            padding: '16px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '8px', 
            margin: '20px 0' 
          }}>
            {error}
            <button 
              onClick={loadReminders}
              style={{
                marginLeft: '10px',
                padding: '8px 12px',
                backgroundColor: '#721c24',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Lista de recordatorios (componente existente) */}
        <ReminderList 
          reminders={reminders} 
          onToggleStatus={handleToggleStatus}
          onRefresh={loadReminders}
        />
      </div>
    </div>
  );
};

export default RemindersPage;