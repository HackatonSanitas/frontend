import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MedicationForm from "./MedicationForm";

describe("MedicationForm", () => {
  test("renderiza el campo de nombre del medicamento", () => {
    render(
      <MemoryRouter>
        <MedicationForm />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/ibuprofeno/i);
    expect(input).toBeInTheDocument();
  });

  test("muestra error si se intenta enviar vacío", () => {
    render(
      <MemoryRouter>
        <MedicationForm />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(button);

    expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
  });
});
