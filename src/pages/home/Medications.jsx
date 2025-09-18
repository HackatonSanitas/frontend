import React, { useEffect, useState } from "react";
import { medicationApi } from "../../services/medicationApi.jsx";
import MedicineDetailModal from "../../components/MedicineDetailModal";


export default function MedicationsPage() {
  const [meds, setMeds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // cargar medicamentos desde backend
  useEffect(() => {
    medicationApi.getAll()
      .then((res) => setMeds(res.data))
      .catch((err) => console.error("Error cargando medicamentos:", err));
  }, []);

  const openModal = (med) => {
    setSelected(med);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return (
    <section style={{ padding: 20 }}>
      <h2>Lista de Medicamentos</h2>

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
            }}
          >
            <strong>{m.name}</strong> — {m.dose}
            <div style={{ fontSize: "13px", color: "#666" }}>
              {m.frequency} | Próxima toma: {m.nextDose}
            </div>
          </li>
        ))}
      </ul>

      <MedicineDetailModal
        isOpen={isOpen}
        onClose={closeModal}
        medicine={selected}
        onEdit={async (id) => {
          try {
            await medicationApi.markAsTaken(id);
            alert("✅ Medicamento marcado como tomado");
            closeModal();
          } catch (err) {
            console.error("Error al marcar como tomado:", err);
          }
        }}
        onDelete={async (id) => {
          try {
            await medicationApi.delete(id);
            setMeds(meds.filter((m) => m.id !== id));
            alert("🗑️ Medicamento eliminado");
            closeModal();
          } catch (err) {
            console.error("Error al eliminar:", err);
          }
        }}
      />
    </section>
  );
}
