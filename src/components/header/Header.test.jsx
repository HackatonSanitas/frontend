import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  test("renderiza el logo con el alt correcto", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/sanitas logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("el logo es un enlace a la ruta /", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /sanitas logo/i });
    expect(link).toHaveAttribute("href", "/");
  });

  test("muestra el saludo con el nombre", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/¡hola juan!/i)).toBeInTheDocument();
  });
});
