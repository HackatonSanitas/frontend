import React from "react";
import "./Footer.css";
import logo from "../../assets/sanitas-logo.png";
import facebookIcon from "../../assets/Facebook (1).png";
import whatsappIcon from "../../assets/whatsapp.png";
import instagramIcon from "../../assets/Instagram.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <img src={logo} alt="Sanitas logo" className="footer__logo" />

      {/* Redes sociales */}
      <div className="footer__socials">
        <a href="#" aria-label="Facebook">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a href="#" aria-label="WhatsApp">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
