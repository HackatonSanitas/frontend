import React, { useEffect, useState } from "react";
import { medicationApi } from "../../services/medicationApi.jsx";
import MedicineDetailModal from "../../components/MedicineDetailModal";
import Sidebar from "../../layout/sidebar/Sidebar";

export default function MedicationsPage() {
  const [meds, setMeds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // cargar medicamentos desde backend
  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      setLoading(true);
      const response = await medicationApi.getAll();
      console.log("Backend response:", response.data);
      setMeds(response.data);
      setError(null);
    } catch (err) {
      console.error("Error cargando medicamentos:", err);
      setError("Error al cargar los medicamentos");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (med) => {
    setSelected(med);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelected(null);
    setIsOpen(false);
  };

  const handleMarkAsTaken = async (id) => {
    try {
      await medicationApi.markAsTaken(id);
      alert("✅ Medicamento marcado como tomado");
      closeModal();
      // Reload medications to get updated data
      loadMedications();
    } catch (err) {
      console.error("Error al marcar como tomado:", err);
      alert("❌ Error al marcar como tomado");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este medicamento?")) {
      try {
        await medicationApi.delete(id);
        setMeds(meds.filter((m) => m.id !== id));
        alert("🗑️ Medicamento eliminado");
        closeModal();
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("❌ Error al eliminar el medicamento");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <section style={{ padding: 20, flex: 1 }}>
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Cargando medicamentos...
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <section style={{ padding: 20, flex: 1 }}>
          <div style={{ 
            padding: '16px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '8px' 
          }}>
            {error}
            <button 
              onClick={loadMedications}
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
        </section>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <section style={{ padding: 20, flex: 1 }}>
        <h2>Lista de Medicamentos</h2>

        {meds.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No hay medicamentos registrados.
          </div>
        ) : (
          <ul style={{ display: "grid", gap: "12px", padding: 0, listStyle: "none" }}>
            {meds.map((m) => (
              <li
                key={m.id}
                onClick={() => openModal(m)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  background: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "box-shadow 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <strong>{m.medication}</strong> — {m.dose}
                <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                  Frecuencia: {m.frequency || 'Una vez'}
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  Próxima toma: {m.intake || 'No programada'}
                </div>
                <div style={{ 
                  fontSize: "12px", 
                  marginTop: "8px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  backgroundColor: m.status === 'TOMADO' ? '#d4edda' : '#fff3cd',
                  color: m.status === 'TOMADO' ? '#155724' : '#856404'
                }}>
                  {m.status || 'PENDIENTE'}
                </div>
              </li>
            ))}
          </ul>
        )}

        <MedicineDetailModal
          isOpen={isOpen}
          onClose={closeModal}
          medicine={selected}
          onEdit={handleMarkAsTaken}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}