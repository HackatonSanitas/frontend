import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  test("renderiza la imagen de portada con alt 'Medicamentos'", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const image = screen.getByAltText(/medicamentos/i);
    expect(image).toBeInTheDocument();
  });

  test("muestra el título principal", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { name: /tu dosis, siempre a tiempo/i });
    expect(title).toBeInTheDocument();
  });

  test("contiene la descripción explicativa", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/organizar la dosificación de tus medicamentos/i)
    ).toBeInTheDocument();
  });

  test("el botón lleva a la página de recordatorios", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: /empieza ahora/i });
    expect(button).toHaveAttribute("href", "/recordatorios");
  });
});
