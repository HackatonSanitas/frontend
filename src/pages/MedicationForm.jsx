import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/medicationForm.css";
import { medicationApi } from "../services/medicationApi"; 

export default function MedicationForm() {
  const [id] = useState("Automático");
  const [medication, setName] = useState("");
  const [dose, setDose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("");
  const [schedule, setSchedule] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 
  const hasEmpty = (...vals) => vals.some((v) => String(v).trim() === "");

  // ESTE es el envío real (POST)
  const handleSubmit = async (e) => {
    e?.preventDefault?.();      // por si lo llamas desde <form onSubmit>
    setError("");
    setSuccess("");

    if (hasEmpty(medication, dose, startDate, days, schedule)) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // ADAPTA las claves a tu DTO de Spring si se llaman distinto
    const newMedication = {
      medication,                // nombre del medicamento
      dose,                // dosis (texto, p.ej. "200 mg")
      startDate,           // "YYYY-MM-DD"
      days: Number(days),  // número de días
      schedule             // "HH:mm"
    };

    try {
      setIsSubmitting(true);

      // ⬅️ Aquí llamas a TU POST real
      const { data } = await medicationApi.create(newMedication);

      setSuccess("✅ Medicamento guardado correctamente.");
      setName(""); setDose(""); setStartDate(""); setDays(""); setSchedule("");

      console.log("Respuesta del backend:", data);

      // Opcional: ir al listado para verlo creado
       setTimeout(() => navigate("/medications"), 800);

    } catch (err) {
      console.error(err);
      // Mensaje más informativo si viene error del backend:
      const apiMsg = err?.response?.data?.message || err?.message || "";
      setError(`❌ No se pudo guardar. ${apiMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <header className="card-header">
          <div className="brand">Sanitas</div>
          <div className="hello">¡Hola, Cliente!</div>
        </header>

        {/* Usa <form> para permitir Enter */}
        <form className="form" onSubmit={handleSubmit} noValidate>
         
          <div className="row">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ibuprofeno"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Dosis</label>
            <input
              type="text"
              placeholder="200 mg"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Días</label>
            <input
              type="number"
              min="1"
              placeholder="7"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Horario</label>
            <input
              type="time"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}

          <div className="actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>

        <footer className="card-footer">
          <span className="brand-mini">Sanitas</span>
          <div className="social-dots" aria-hidden="true" />
        </footer>
      </div>
    </div>
  );
}
