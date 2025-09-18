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
          <p><strong>Nombre:</strong> {medicine.name}</p>
          <p><strong>Dosis:</strong> {medicine.dose}</p>
          <p><strong>Frecuencia:</strong> {medicine.frequency}</p>
          <p>
            <strong>Próxima toma:</strong>{" "}
            {medicine.nextDose ? new Date(medicine.nextDose).toLocaleString() : "—"}
          </p>
          <p><strong>Estado:</strong> {medicine.status}</p>
          {medicine.instructions && (
            <p><strong>Indicaciones:</strong> {medicine.instructions}</p>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={() => onEdit(medicine.id)} className="btn-edit">
            Editar
          </button>
          <button onClick={() => onDelete(medicine.id)} className="btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
