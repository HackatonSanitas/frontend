import React from "react";
import logo from "../assets/sanitas-logo.png"; 
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Sanitas logo" className="header__logo" />
      <h1 className="header__greeting">¡Hola Juan!</h1>
    </header>
  );
};

export default Header;
