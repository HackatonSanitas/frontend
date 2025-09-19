import React, { useEffect } from "react";
import "./MedicineDetailModal.css"; // Importamos los estilos CSS clásicos

export default function MedicineDetailModal({ isOpen, onClose, medicine, onEdit, onDelete }) {
  // Permitir cerrar con tecla ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !medicine) return null;

  const handleEdit = () => {
    if (onEdit && medicine.id) {
      onEdit(medicine.id);
    }
  };

  const handleDelete = () => {
    if (onDelete && medicine.id) {
      onDelete(medicine.id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalle-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="detalle-title">Detalle de Medicación</h2>
          <button onClick={onClose} className="close-btn" aria-label="Cerrar modal">
            ✖
          </button>
        </div>

        {/* Información del medicamento */}
        <div className="modal-body">
          <p><strong>Nombre:</strong> {medicine.medication || medicine.name || '—'}</p>
          <p><strong>Dosis:</strong> {medicine.dose || '—'}</p>
          <p><strong>Frecuencia:</strong> {medicine.frequency || 'Una vez'}</p>
          <p>
            <strong>Próxima toma:</strong>{" "}
            {medicine.intake || medicine.nextDose || 'No programada'}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: medicine.status === 'TOMADO' ? '#d4edda' : '#fff3cd',
              color: medicine.status === 'TOMADO' ? '#155724' : '#856404',
              fontSize: "12px"
            }}>
              {medicine.status || 'PENDIENTE'}
            </span>
          </p>
          {medicine.nextDate && (
            <p><strong>Fecha próxima:</strong> {medicine.nextDate}</p>
          )}
          {medicine.nextTime && (
            <p><strong>Hora próxima:</strong> {medicine.nextTime}</p>
          )}
          {medicine.instructions && (
            <p><strong>Indicaciones:</strong> {medicine.instructions}</p>
          )}
          {medicine.createdAt && (
            <p><strong>Fecha de creación:</strong> {new Date(medicine.createdAt).toLocaleString()}</p>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {medicine.status !== 'TOMADO' && (
            <button 
              onClick={handleEdit} 
              className="btn-edit"
              style={{
                padding: "10px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px"
              }}
            >
              Marcar como tomado
            </button>
          )}
          <button 
            onClick={handleDelete} 
            className="btn-delete"
            style={{
              padding: "10px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}