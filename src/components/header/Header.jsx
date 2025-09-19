import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/sanitas-logo.png";

const Header = () => {
  return (
    <header className="header">
      {}
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Sanitas logo" className="header__logo" />
      </Link>

      <h1 className="header__greeting">¡Hola Juan!</h1>
    </header>
  );
};

export default Header;
