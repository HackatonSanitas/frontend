import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/medicationForm.css";
import { medicationApi } from "../services/medicationApi";

export default function MedicationForm() {
  const [id] = useState("Automático");

  const [medication, setMedication] = useState("");
  const [dose, setDose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("");
  const [schedule, setSchedule] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const hasEmpty = (...vals) => vals.some((v) => String(v).trim() === "");

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError("");
    setSuccess("");

    if (hasEmpty(medication, dose, startDate, days, schedule)) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const newMedication = {
      medication,           // nombre del medicamento
      dose,
      startDate,            // "YYYY-MM-DD"
      days: Number(days),   // número de días
      schedule              // "HH:mm"
    };

    try {
      setIsSubmitting(true);
      const { data } = await medicationApi.create(newMedication);

      setSuccess("✅ Medicamento guardado correctamente.");

      // limpiamos el formulario
      setMedication("");
      setDose("");
      setStartDate("");
      setDays("");
      setSchedule("");

      console.log("Respuesta del backend:", data);

      // navegar al listado tras guardar pero funcionara cuando el backend guarde en db
      setTimeout(() => navigate("/recordatorios"), 800);

    } catch (err) {
      console.error(err);
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
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="row">
            <label>Medicamento</label>
            <input
              type="text"
              placeholder="Ibuprofeno"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
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

            <button
              type="button"
              onClick={() => navigate("/")}
              style={{ marginLeft: "10px" }}
            >
              Home
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
